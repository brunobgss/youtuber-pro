import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseClient';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      const baseUrl = req.nextUrl.origin;
      return NextResponse.redirect(new URL('/?error=oauth_failed', baseUrl));
    }

    const { channelId } = JSON.parse(decodeURIComponent(state));
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/oauth2/callback';

    // Trocar code por token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    if (!tokenResponse.ok) {
      throw new Error('Falha ao obter token');
    }

    const tokens = await tokenResponse.json();

    // Buscar email do usuário
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    const userInfo = await userResponse.json();

    // Salvar token no Supabase
    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('channels')
      .update({
        token: tokens,
        email: userInfo.email,
        status: 'authorized',
        updated_at: new Date().toISOString()
      })
      .eq('id', channelId);

    if (error) throw error;

    // Redirecionar para a URL base (funciona tanto localhost quanto Vercel)
    const baseUrl = req.nextUrl.origin;
    return NextResponse.redirect(new URL('/?oauth=success', baseUrl));
  } catch (error: any) {
    const baseUrl = req.nextUrl.origin;
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(error.message)}`, baseUrl));
  }
}


