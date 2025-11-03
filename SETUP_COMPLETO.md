# 🚀 Guia Completo de Configuração - Youtuber

Este guia vai te levar por **TODOS** os passos necessários para deixar o aplicativo funcionando.

---

## 📋 Checklist

- [ ] 1. Instalar FFmpeg
- [ ] 2. Criar Tabelas no Supabase
- [ ] 3. Criar Buckets de Storage no Supabase
- [ ] 4. Configurar Google OAuth (porta 3000)
- [ ] 5. Testar Servidor Next.js

---

## 1️⃣ INSTALAR FFMPEG

### Opção A: Via Winget (Recomendado - Mais Fácil)

1. Abra o **PowerShell** como **Administrador**
2. Execute:
   ```powershell
   winget install FFmpeg
   ```
3. Feche e reabra o terminal
4. Teste:
   ```powershell
   ffmpeg -version
   ```
   Se mostrar a versão, está funcionando! ✅

### Opção B: Download Manual

1. Acesse: https://www.gyan.dev/ffmpeg/builds/
2. Baixe: **ffmpeg-release-essentials.zip**
3. Extraia em: `C:\ffmpeg`
4. Adicione ao PATH:
   - Pressione `Win + R`, digite `sysdm.cpl`, Enter
   - Aba **Avançado** → **Variáveis de Ambiente**
   - Em **Variáveis do Sistema**, encontre **Path**, clique em **Editar**
   - Clique em **Novo** → Adicione: `C:\ffmpeg\bin`
   - Clique em **OK** em todas as janelas
5. Feche e reabra o terminal
6. Teste: `ffmpeg -version`

---

## 2️⃣ CRIAR TABELAS NO SUPABASE

### Passo a Passo:

1. **Acesse o Supabase:**
   - Vá em: https://supabase.com/dashboard
   - Faça login e selecione seu projeto

2. **Abra o SQL Editor:**
   - No menu lateral, clique em **SQL Editor**
   - Clique em **New Query**

3. **Copie e cole este SQL:**
   ```sql
   -- Channels table
   create table if not exists public.channels (
     id uuid primary key default gen_random_uuid(),
     name text,
     email text,
     status text check (status in ('pending','authorized','done','needs_reauth','quota_exceeded')) default 'pending',
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
   ```

4. **Execute o SQL:**
   - Clique no botão **Run** (ou pressione `Ctrl + Enter`)
   - Deve aparecer: "Success. No rows returned" ✅

5. **Verificar se funcionou:**
   - Vá em **Table Editor** no menu lateral
   - Deve aparecer 3 tabelas: `channels`, `videos`, `uploads` ✅

---

## 3️⃣ CRIAR BUCKETS DE STORAGE NO SUPABASE

### Passo a Passo:

1. **Acesse Storage:**
   - No menu lateral do Supabase, clique em **Storage**

2. **Criar Bucket 1: `input_videos`**
   - Clique em **New bucket**
   - **Name:** `input_videos`
   - **Public bucket:** Deixar **desmarcado** (privado)
   - Clique em **Create bucket** ✅

3. **Criar Bucket 2: `outputs`**
   - Clique em **New bucket**
   - **Name:** `outputs`
   - **Public bucket:** Deixar **desmarcado** (privado)
   - Clique em **Create bucket** ✅

4. **Criar Bucket 3: `thumbnails`**
   - Clique em **New bucket**
   - **Name:** `thumbnails`
   - **Public bucket:** Deixar **marcado** (público - para acesso direto às imagens)
   - Clique em **Create bucket** ✅

5. **Configurar Políticas de Acesso (Opcional mas Recomendado):**
   - Para cada bucket, clique nos **3 pontinhos** → **Policies**
   - Adicione políticas conforme necessário (ou deixe as padrões por enquanto)

### OU via SQL (Alternativa):

1. No **SQL Editor**, execute:
   ```sql
   select storage.create_bucket('input_videos');
   select storage.create_bucket('outputs');
   select storage.create_bucket('thumbnails');
   ```

2. Para tornar `thumbnails` público:
   ```sql
   update storage.buckets set public = true where id = 'thumbnails';
   ```

---

## 4️⃣ CONFIGURAR GOOGLE OAUTH (PORTA 3000)

### Passo a Passo:

1. **Acesse Google Cloud Console:**
   - Vá em: https://console.cloud.google.com
   - Faça login e selecione seu projeto

2. **Navegar até Credenciais:**
   - No menu lateral, vá em **APIs & Services** → **Credentials**

3. **Editar OAuth 2.0 Client ID:**
   - Encontre seu **OAuth 2.0 Client ID** (o que tem o Client ID que está no `.env.local`)
   - Clique nele para editar

4. **Configurar Redirect URIs:**
   - Role até **Authorized redirect URIs**
   - Verifique se existe: `http://localhost:8080/api/oauth2/callback`
   - **REMOVA** a porta 8080 se existir
   - **ADICIONE** (se não existir): `http://localhost:3000/api/oauth2/callback`
   - Clique em **Save** ✅

5. **Verificar configurações:**
   - **Authorized JavaScript origins** deve ter: `http://localhost:3000`
   - **Authorized redirect URIs** deve ter: `http://localhost:3000/api/oauth2/callback`

---

## 5️⃣ TESTAR SERVIDOR NEXT.JS

### Passo a Passo:

1. **Certifique-se de que:**
   - ✅ FFmpeg está instalado
   - ✅ Tabelas criadas no Supabase
   - ✅ Buckets criados no Supabase
   - ✅ Google OAuth configurado para porta 3000

2. **Iniciar o servidor:**
   ```powershell
   npm run dev
   ```

3. **Acessar o aplicativo:**
   - Abra o navegador em: **http://localhost:3000**
   - Deve carregar o dashboard ✅

4. **Testar funcionalidades básicas:**
   - Clique em **"Adicionar Canal"**
   - Preencha um nome e clique em **"Autorizar"**
   - Deve redirecionar para Google Login ✅

5. **Se houver erros:**
   - Verifique o console do terminal
   - Verifique o console do navegador (F12)
   - Confirme que todas as variáveis do `.env.local` estão corretas

---

## ✅ TESTE FINAL - Verificação Completa

Execute estes comandos para verificar tudo:

```powershell
# 1. Verificar FFmpeg
ffmpeg -version

# 2. Verificar Python e dependências
.\.venv\Scripts\python.exe -c "import torch; print('PyTorch:', torch.__version__); print('CUDA:', torch.cuda.is_available())"

# 3. Verificar Node.js
node --version
npm --version

# 4. Iniciar servidor
npm run dev
```

---

## 🆘 Problemas Comuns

### Erro: "FFmpeg não encontrado"
- **Solução:** Instale FFmpeg e adicione ao PATH (veja passo 1)

### Erro: "Tabela não existe"
- **Solução:** Execute o SQL no Supabase (veja passo 2)

### Erro: "Bucket não existe"
- **Solução:** Crie os buckets no Storage (veja passo 3)

### Erro: "OAuth redirect_uri_mismatch"
- **Solução:** Configure a porta 3000 no Google Cloud Console (veja passo 4)

### Erro: "Python não encontrado"
- **Solução:** Verifique se o `.env.local` tem `PYTHON_PATH=.\.venv\Scripts\python.exe`

---

## 🎉 Próximos Passos Após Configuração

1. Adicionar seu primeiro canal YouTube
2. Fazer upload de um vídeo de teste
3. Processar o vídeo (adicionar TTS, watermark, etc.)
4. Gerar metadados (título, descrição, tags)
5. Fazer upload para o YouTube

---

**Boa sorte! 🚀**

