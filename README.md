# Youtuber - Aplicativo de Automação de Upload para YouTube

Aplicativo web completo para automatizar criação, edição e upload de vídeos para o YouTube.

## 🚀 Funcionalidades

- ✅ **Processamento de Vídeos**: Edita vídeos enviados (remove áudio, adiciona TTS, watermark, overlay)
- ✅ **Geração de Vídeos**: Cria vídeos do zero a partir de roteiros (TTS + slides + overlay)
- ✅ **Geração Automática de Metadata**: IA gera título, descrição e tags automaticamente
- ✅ **Upload Automático**: Envio direto para YouTube com metadados
- ✅ **Múltiplos Canais**: Suporte a vários canais com OAuth individual
- ✅ **Dashboard Completo**: Interface moderna e responsiva

## 📋 Requisitos

- Node.js >= 18
- Python 3.10+
- ffmpeg instalado e no PATH
- Conta Supabase (Postgres + Storage)
- Google Cloud Project com YouTube Data API v3 habilitado

## 🛠️ Instalação

### 1. Instalar dependências

```bash
npm install
pip install -r python/requirements.txt
```

### 2. Configurar Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o SQL em `supabase/schema.sql` no SQL Editor
3. Crie os buckets de storage:
   - `input_videos`
   - `outputs`
   - `thumbnails`

### 3. Configurar Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um projeto ou selecione existente
3. Ative a **YouTube Data API v3**
4. Vá em **Credenciais** → **Criar credenciais** → **ID do cliente OAuth 2.0**
5. Configure:
   - Tipo: Aplicativo Web
   - URIs de redirecionamento: `http://localhost:3000/api/oauth2/callback` (e produção)

### 4. Variáveis de Ambiente

Crie `.env.local` na raiz:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# Google OAuth
GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/oauth2/callback

# Opcional: IA para metadados
OPENAI_API_KEY=opcional
ANTHROPIC_API_KEY=opcional

# Processamento
FFMPEG_PATH=ffmpeg
PYTHON_PATH=python
```

## ▶️ Como Usar

### Iniciar servidor

```bash
npm run dev
```

Acesse `http://localhost:3000`

### Fluxo de Trabalho

1. **Adicionar Canal**
   - Clique em "Adicionar Canal"
   - Digite o nome e clique em "Autorizar"
   - Faça login no Google e autorize o acesso ao YouTube

2. **Adicionar Vídeo (Modo Folder)**
   - Clique em "Adicionar Vídeo"
   - Selecione arquivo de vídeo
 criado opções: watermark, TTS, etc.
   - Clique em "Processar"

3. **Gerar Vídeo (Modo Generate)**
   - Clique em "Gerar Vídeo"
   - Digite o roteiro/texto
   - Configure idioma TTS, overlay, etc.
   - Clique em "Gerar"

4. **Gerar Metadata**
   - Após processar/gerar, o sistema gera automaticamente título, descrição e tags
   - Você pode editar manualmente antes do upload

5. **Upload para YouTube**
   - Clique em "Upload" no vídeo processado
   - Escolha privacidade (public/unlisted/private)
   - O vídeo será enviado automaticamente

## 📁 Estrutura do Projeto

```
youtuber/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── channels/      # CRUD canais
│   │   ├── videos/        # CRUD vídeos
│   │   ├── uploads/       # CRUD uploads
│   │   ├── process_video/ # Processar vídeo
│   │   ├── generate_video/# Gerar vídeo
│   │   ├── generate_metadata/ # Gerar metadata
│   │   ├── upload_video/  # Upload YouTube
│   │   └── oauth2/        # OAuth Google
│   └── page.tsx           # Dashboard
├── components/            # Componentes React
├── lib/                   # Utilitários
├── python/                # Scripts Python
│   ├── batch_process_videos.sh
│   ├── generate_video_from_script.py
│   ├── generate_metadata.py
│   ├── upload_youtube.py
│   └── util.py
└── supabase/
    └── schema.sql         # Schema do banco
```

## 🔧 Troubleshooting

### Tokens OAuth Expirados
- Status do canal muda para `needs_reauth`
- Clique em "Autorizar" novamente no canal

### Quota Excedida
- Status muda para `quota_exceeded`
- Aguarde reset diário ou use outro projeto Google

### Erros ffmpeg
- Verifique se ffmpeg está instalado: `ffmpeg -version`
- Confira logs no console do servidor

### Vídeo Duplicado
- Sistema verifica SHA256 antes de processar
- Vídeos já processados não são reprocessados

## 📝 Runbook Diário

1. Verificar status dos canais
2. Autorizar novos can月度 ou reautorizar expirados
3. Adicionar vídeos ou gerar novos
4. Verificar e editar metadados
5. Iniciar uploads
6. Monitorar dashboard e logs
7. Reprocessar falhas se necessário
8. Limpar storage (opcional)

## 📄 Licença

MIT

## 🤝 Contribuições

Contribuições são bem-vindas! Abra uma issue ou pull request.



