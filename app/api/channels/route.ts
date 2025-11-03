import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('channels')
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
    const body = await req.json();
    const { 
      name, 
      account_email, 
      authenticator_email, 
      recovery_email, 
      password,
      status = 'ativo'
    } = body;

    if (!name || !account_email) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Nome do canal e e-mail da conta são obrigatórios' 
      }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('channels')
      .insert({ 
        name, 
        account_email,
        authenticator_email: authenticator_email || null,
        recovery_email: recovery_email || null,
        password: password || null,
        email: account_email, // Mantém compatibilidade
        status 
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}


