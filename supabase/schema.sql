-- Channels table
create table if not exists public.channels (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  account_email text, -- E-mail da conta do Google
  authenticator_email text, -- Email onde está o Google Authenticator
  recovery_email text, -- Email de recuperação cadastrado
  password text, -- Senha do canal (armazenada como texto, criptografar em produção)
  status text check (status in ('pending','authorized','done','needs_reauth','quota_exceeded','banido','ativo','ativo_com_video')) default 'pending',
  token jsonb,
  last_uploaded_video_id text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);

-- Videos table
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  filename text,
  hash text,
  source text check (source in ('folder','generate')),
  processed boolean default false,
  processed_at timestamp with time zone,
  output_path text,
  used_by_channel text,
  title text,
  description text,
  tags text[],
  created_at timestamp with time zone default now()
);

-- Uploads table
create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid references public.channels(id) on delete cascade,
  video_id text,
  status text check (status in ('queued','processing','success','fail')) default 'queued',
  error text,
  attempts int default 0,
  created_at timestamp with time zone default now(),
  finished_at timestamp with time zone
);

-- Helpful indexes
create index if not exists idx_videos_hash on public.videos(hash);
create index if not exists idx_uploads_channel on public.uploads(channel_id);
create index if not exists idx_uploads_status on public.uploads(status);

-- Storage buckets (create via Supabase UI or SQL)
-- select storage.create_bucket('input_videos');
-- select storage.create_bucket('outputs');
-- select storage.create_bucket('thumbnails');




