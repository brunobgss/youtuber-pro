import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseClient';
import { deleteFileFromStorage } from '@/lib/storage';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const supabase = getSupabaseServer();

    const { data, error } = await supabase
      .from('videos')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ ok: true, data });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseServer();
    
    // Buscar vídeo para deletar arquivo do storage
    const { data: video } = await supabase
      .from('videos')
      .select('output_path')
      .eq('id', params.id)
      .single();

    if (video?.output_path) {
      await deleteFileFromStorage('outputs', video.output_path);
    }

    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', params.id);

    if (error) throw error;
    return NextResponse.json({ ok: true, message: 'Vídeo deletado com sucesso' });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}


