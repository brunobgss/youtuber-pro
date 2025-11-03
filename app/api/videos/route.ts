import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseClient';
import { uploadFileToStorage } from '@/lib/storage';
import { computeSHA256 } from '@/lib/utils';

export async function GET() {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ ok: true, data: data || [] });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const source = formData.get('source') as string || 'folder';

    if (!file) {
      return NextResponse.json({ ok: false, error: 'Arquivo é obrigatório' }, { status: 400 });
    }

    // Upload para Supabase Storage
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const uploadResult = await uploadFileToStorage('input_videos', file, filename, file.type);

    if (uploadResult.error) {
      return NextResponse.json({ ok: false, error: uploadResult.error }, { status: 500 });
    }

    // Calcular hash (simulado - em produção, calcular do arquivo real)
    const hash = `sha256-${timestamp}`; // TODO: computeSHA256(file)

    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('videos')
      .insert({
        filename: file.name,
        hash,
        source: source as 'folder' | 'generate',
        processed: false
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}


