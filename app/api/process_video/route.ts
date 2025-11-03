import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseClient';
import { runShellScript } from '@/lib/pythonRunner';
import { uploadFileToStorage } from '@/lib/storage';
import { computeSHA256 } from '@/lib/utils';
import { readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { video_id, channel_id, start_offset, duration, apply_tts, watermark_path } = body;

    if (!video_id) {
      return NextResponse.json({ ok: false, error: 'video_id é obrigatório' }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    
    // Buscar vídeo
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .select('*')
      .eq('id', video_id)
      .single();

    if (videoError || !video) {
      return NextResponse.json({ ok: false, error: 'Vídeo não encontrado' }, { status: 404 });
    }

    // Preparar caminhos
    const outputDir = path.join(process.cwd(), 'outputs');
    const thumbnailDir = path.join(process.cwd(), 'thumbnails');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.mkdirSync(thumbnailDir, { recursive: true });

    const outputPath = path.join(outputDir, `${video_id}.mp4`);
    const thumbnailPath = path.join(thumbnailDir, `${video_id}.jpg`);

    // Baixar vídeo do Supabase Storage (simulado - em produção usar storage.download)
    const inputVideoPath = path.join(process.cwd(), 'temp', video.filename || 'input.mp4');
    
    // Executar script shell (usa .bat no Windows, .sh no Linux)
    await runShellScript('batch_process_videos', [
      inputVideoPath,
      outputPath,
      thumbnailPath,
      watermark_path || '',
      apply_tts ? 'true' : 'false'
    ]);

    // Ler arquivos processados e fazer upload para storage
    const outputBuffer = await readFile(outputPath);
    const thumbnailBuffer = await readFile(thumbnailPath);

    const outputUpload = await uploadFileToStorage('outputs', Buffer.from(outputBuffer), `${video_id}.mp4`);
    const thumbnailUpload = await uploadFileToStorage('thumbnails', Buffer.from(thumbnailBuffer), `${video_id}.jpg`);

    if (outputUpload.error || thumbnailUpload.error) {
      return NextResponse.json({ ok: false, error: 'Erro ao fazer upload dos arquivos processados' }, { status: 500 });
    }

    // Calcular SHA256
    const sha256 = await computeSHA256(Buffer.from(outputBuffer));

    // Atualizar vídeo no DB
    const { data: updatedVideo, error: updateError } = await supabase
      .from('videos')
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
        output_path: outputUpload.path,
        hash: sha256,
        used_by_channel: channel_id || null
      })
      .eq('id', video_id)
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ 
      ok: true, 
      data: {
        processed_video: outputUpload.path,
        thumbnail: thumbnailUpload.path,
        sha256,
        video: updatedVideo
      }
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}