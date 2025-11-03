import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseClient';
import { runPythonScript } from '@/lib/pythonRunner';
import { uploadFileToStorage } from '@/lib/storage';
import { computeSHA256 } from '@/lib/utils';
import { readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { script_text, channel_id, lang, watermark_path, ai_thumbnail } = body;

    if (!script_text) {
      return NextResponse.json({ ok: false, error: 'script_text é obrigatório' }, { status: 400 });
    }

    const outputDir = path.join(process.cwd(), 'outputs');
    const thumbnailDir = path.join(process.cwd(), 'thumbnails');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.mkdirSync(thumbnailDir, { recursive: true });

    const videoId = `generated-${Date.now()}`;
    const outputPath = path.join(outputDir, `${videoId}.mp4`);
    let thumbnailPath = path.join(thumbnailDir, `${videoId}.jpg`);

    // Executar script Python (gera vídeo e thumb básica)
    await runPythonScript('generate_video_from_script.py', {
      script_text: script_text,
      lang: lang || 'pt',
      watermark_path: watermark_path || '',
      output: outputPath,
      thumbnail: thumbnailPath
    });

    // Opcional: substituir a thumbnail por uma IA (Stable Diffusion)
    const sdModel = process.env.SD_MODEL;
    if (ai_thumbnail || sdModel) {
      const prompt = `Thumbnail de YouTube chamativa: ${script_text.slice(0, 140)}`;
      await runPythonScript('generate_thumbnail_ai.py', {
        prompt,
        output: thumbnailPath,
        model: sdModel || 'CompVis/stable-diffusion-v1-4',
        width: 1280,
        height: 720
      });
    }

    // Upload para storage
    const outputBuffer = await readFile(outputPath);
    const thumbnailBuffer = await readFile(thumbnailPath);

    const outputUpload = await uploadFileToStorage('outputs', Buffer.from(outputBuffer), `${videoId}.mp4`);
    const thumbnailUpload = await uploadFileToStorage('thumbnails', Buffer.from(thumbnailBuffer), `${videoId}.jpg`);

    if (outputUpload.error || thumbnailUpload.error) {
      return NextResponse.json({ ok: false, error: 'Erro ao fazer upload' }, { status: 500 });
    }

    // Calcular SHA256
    const sha256 = await computeSHA256(Buffer.from(outputBuffer));

    // Salvar no DB
    const supabase = getSupabaseServer();
    const { data: video, error: dbError } = await supabase
      .from('videos')
      .insert({
        filename: `${videoId}.mp4`,
        hash: sha256,
        source: 'generate',
        processed: true,
        processed_at: new Date().toISOString(),
        output_path: outputUpload.path,
        used_by_channel: channel_id || null
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json({
      ok: true,
      data: {
        processed_video: outputUpload.path,
        thumbnail: thumbnailUpload.path,
        sha256,
        video
      }
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}