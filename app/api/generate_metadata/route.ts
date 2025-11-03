import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseClient';
import { runPythonScript } from '@/lib/pythonRunner';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { video_id, script_text, theme } = body;

    if (!video_id && !theme) {
      return NextResponse.json({ ok: false, error: 'video_id ou theme é obrigatório' }, { status: 400 });
    }

    // Usar tema do body ou buscar do vídeo
    let tema = theme;
    if (!tema && video_id) {
      const supabase = getSupabaseServer();
      const { data: video } = await supabase
        .from('videos')
        .select('filename, description, title')
        .eq('id', video_id)
        .single();
      tema = video?.title || video?.filename || 'vídeo';
    }

    const modelPath = process.env.LLAMA_MODEL || '';

    // Executar script Python (usa IA local se disponível)
    const result = await runPythonScript('generate_metadata.py', {
      theme: tema || 'vídeo',
      script_text: script_text || '',
      model_path: modelPath
    });

    const parsed = JSON.parse(result.stdout);
    const { title, description, tags } = parsed;

    // Atualizar vídeo no DB se video_id fornecido
    if (video_id) {
      const supabase = getSupabaseServer();
      await supabase
        .from('videos')
        .update({ title, description, tags })
        .eq('id', video_id);
    }

    return NextResponse.json({
      ok: true,
      data: { title, description, tags }
    });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}