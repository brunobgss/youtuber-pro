import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseClient';
import { runPythonScript } from '@/lib/pythonRunner';
import { getFileUrl } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { video_id, channel_id, privacyStatus } = body;

    if (!video_id || !channel_id) {
      return NextResponse.json({ ok: false, error: 'video_id e channel_id são obrigatórios' }, { status: 400 });
    }

    const supabase = getSupabaseServer();

    // Buscar vídeo e canal
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .select('*')
      .eq('id', video_id)
      .single();

    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select('*')
      .eq('id', channel_id)
      .single();

    if (videoError || !video || channelError || !channel) {
      return NextResponse.json({ ok: false, error: 'Vídeo ou canal não encontrado' }, { status: 404 });
    }

    if (!video.title || !video.description) {
      return NextResponse.json({ ok: false, error: 'Vídeo precisa ter título e descrição antes do upload' }, { status: 400 });
    }

    if (channel.status !== 'authorized') {
      return NextResponse.json({ ok: false, error: 'Canal não está autorizado' }, { status: 400 });
    }

    // Obter URL do vídeo
    const videoUrl = video.output_path ? await getFileUrl('outputs', video.output_path) : null;
    if (!videoUrl) {
      return NextResponse.json({ ok: false, error: 'Arquivo de vídeo não encontrado' }, { status: 404 });
    }

    // Criar registro de upload
    const { data: upload, error: uploadError } = await supabase
      .from('uploads')
      .insert({
        channel_id,
        video_id: video_id,
        status: 'processing',
        attempts: 1
      })
      .select()
      .single();

    if (uploadError) throw uploadError;

    // Upload para YouTube (simulado - em produção usar token real)
    try {
      const result = await runPythonScript('upload_youtube.py', {
        video_path: videoUrl,
        title: video.title,
        description: video.description,
        tags: (video.tags || []).join(','),
        privacy_status: privacyStatus || 'unlisted'
      });

      const parsed = JSON.parse(result.stdout);
      const youtubeVideoId = parsed.videoId;

      // Atualizar upload como sucesso
      await supabase
        .from('uploads')
        .update({
          status: 'success',
          video_id: youtubeVideoId,
          finished_at: new Date().toISOString()
        })
        .eq('id', upload.id);

      // Atualizar canal
      await supabase
        .from('channels')
        .update({
          last_uploaded_video_id: youtubeVideoId
        })
        .eq('id', channel_id);

      return NextResponse.json({
        ok: true,
        data: {
          youtubeVideoId,
          status: 'success',
          uploadId: upload.id
        }
      });
    } catch (uploadError: any) {
      // Marcar upload como falha
      await supabase
        .from('uploads')
        .update({
          status: 'fail',
          error: uploadError.message,
          finished_at: new Date().toISOString()
        })
        .eq('id', upload.id);

      // Verificar se é erro de token expirado
      if (uploadError.message?.includes('token') || uploadError.message?.includes('401')) {
        await supabase
          .from('channels')
          .update({ status: 'needs_reauth' })
          .eq('id', channel_id);
      }

      throw uploadError;
    }
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}