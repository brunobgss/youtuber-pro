# 🚀 Guia Completo: Deploy no GitHub + Vercel

Este guia vai te levar por **TODOS** os passos para fazer deploy no GitHub e Vercel.

---

## 📋 Checklist

- [ ] 1. Criar repositório no GitHub
- [ ] 2. Fazer commit e push do código
- [ ] 3. Criar projeto na Vercel
- [ ] 4. Configurar variáveis de ambiente na Vercel
- [ ] 5. Configurar Google OAuth com URL da Vercel
- [ ] 6. Fazer deploy
- [ ] 7. Testar o aplicativo online

---

## 1️⃣ CRIAR REPOSITÓRIO NO GITHUB

### Passo a Passo:

1. **Acesse o GitHub:**
   - Vá em: https://github.com
   - Faça login ou crie uma conta

2. **Criar novo repositório:**
   - Clique no botão **"+"** no canto superior direito
   - Selecione **"New repository"**

3. **Configurar repositório:**
   - **Repository name:** `youtuber` (ou o nome que preferir)
   - **Description:** "Aplicativo de automação de upload para YouTube"
   - **Visibilidade:** 
     - ✅ **Private** (recomendado - seu código fica privado)
     - Ou **Public** (se quiser código aberto)
   - **NÃO marque** "Initialize this repository with a README"
   - Clique em **"Create repository"**

4. **Copiar a URL do repositório:**
   - Após criar, você verá uma página com instruções
   - **Copie a URL** do repositório (exemplo: `https://github.com/seu-usuario/youtuber.git`)
   - Você vai precisar dela no próximo passo!

---

## 2️⃣ FAZER COMMIT E PUSH DO CÓDIGO

### Passo a Passo:

1. **Adicionar todos os arquivos:**
   ```powershell
   git add .
   ```

2. **Fazer commit:**
   ```powershell
   git commit -m "Initial commit: Youtuber app"
   ```

3. **Renomear branch para main (se necessário):**
   ```powershell
   git branch -M main
   ```

4. **Adicionar remote do GitHub:**
   ```powershell
   git remote add origin https://github.com/SEU-USUARIO/youtuber.git
   ```
   ⚠️ **Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub!**

5. **Fazer push:**
   ```powershell
   git push -u origin main
   ```

6. **Autenticar:**
   - Se pedir autenticação, use:
     - **Username:** seu usuário do GitHub
     - **Password:** use um **Personal Access Token** (não sua senha normal)
     - Para criar token: https://github.com/settings/tokens → **Generate new token (classic)** → Selecione permissões `repo`

---

## 3️⃣ CRIAR PROJETO NA VERCEL

### Passo a Passo:

1. **Acesse a Vercel:**
   - Vá em: https://vercel.com
   - Faça login com sua conta GitHub

2. **Criar novo projeto:**
   - Clique em **"Add New..."** → **"Project"**
   - Você verá seus repositórios do GitHub
   - **Encontre** `youtuber` (ou o nome do seu repositório)
   - Clique em **"Import"**

3. **Configurar projeto:**
   - **Project Name:** `youtuber` (ou deixe o padrão)
   - **Framework Preset:** Já detecta **Next.js** automaticamente ✅
   - **Root Directory:** Deixe `.` (padrão)
   - **Build Command:** Deixe `npm run build` (padrão)
   - **Output Directory:** Deixe `.next` (padrão)
   - **Install Command:** Deixe `npm install` (padrão)

4. **⚠️ IMPORTANTE: NÃO fazer deploy ainda!**
   - Primeiro vamos configurar as variáveis de ambiente
   - Clique em **"Cancel"** por enquanto (ou deixe a página aberta)

---

## 4️⃣ CONFIGURAR VARIÁVEIS DE AMBIENTE NA VERCEL

### Passo a Passo:

1. **Acessar configurações do projeto:**
   - Na página do projeto (ou antes de fazer deploy)
   - Vá em **Settings** → **Environment Variables**

2. **Adicionar variáveis (uma por uma):**

   **A. Supabase:**
   ```
   NEXT_PUBLIC_SUPABASE_URL
   Valor: https://khbijubfllefqklwsqnb.supabase.co
   
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmlqdWJmbGxlZnFrbHdzcW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzQ1MzAsImV4cCI6MjA3NzQxMDUzMH0.1o63Fk1Pa04lmozDLx_EalflcO22cNIj8wovpMmjEjI
   
   SUPABASE_SERVICE_ROLE_KEY
   Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmlqdWJmbGxlZnFrbHdzcW5iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTgzNDUzMCwiZXhwIjoyMDc3NDEwNTMwfQ.JJYdYjJzspLPv29psXO6HllTnv97ZDvgFaDtZ1A557s
   ```

   **B. Google OAuth (vamos ajustar depois com a URL da Vercel):**
   ```
   GOOGLE_CLIENT_ID
   Valor: 910520191655-df75keb4vmlntv564gs2bt40pb3571h.apps.googleusercontent.com
   
   GOOGLE_CLIENT_SECRET
   Valor: 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
   
   GOOGLE_REDIRECT_URI
   Valor: https://SEU-PROJETO.vercel.app/api/oauth2/callback
   ```
   ⚠️ **Substitua `SEU-PROJETO` pelo nome do seu projeto na Vercel!**

   **C. Processamento:**
   ```
   FFMPEG_PATH
   Valor: ffmpeg
   
   PYTHON_PATH
   Valor: python
   ```
   ⚠️ **Nota:** A Vercel não tem Python/FFmpeg nativamente. Você pode usar serviços externos ou ignorar se não for processar na Vercel.

   **D. IA Local (Opcional):**
   ```
   LLAMA_MODEL
   Valor: (deixe vazio se não usar)
   
   SD_MODEL
   Valor: (deixe vazio se não usar)
   
   OPENAI_API_KEY
   Valor: (deixe vazio se não usar)
   
   ANTHROPIC_API_KEY
   Valor: (deixe vazio se não usar)
   ```

3. **Para cada variável:**
   - Coloque o **nome** da variável
   - Cole o **valor**
   - Marque os ambientes: **Production**, **Preview**, **Development**
   - Clique em **"Save"**

---

## 5️⃣ CONFIGURAR GOOGLE OAUTH COM URL DA VERCEL

### Passo a Passo:

1. **Aguardar primeiro deploy:**
   - Faça o primeiro deploy na Vercel (mesmo sem todas as variáveis)
   - Isso vai gerar uma URL como: `https://youtuber-abc123.vercel.app`
   - **Copie essa URL completa!**

2. **Acessar Google Cloud Console:**
   - Vá em: https://console.cloud.google.com
   - Seu projeto → **APIs & Services** → **Credentials**

3. **Editar OAuth 2.0 Client:**
   - Clique no seu **OAuth 2.0 Client ID**

4. **Adicionar URLs da Vercel:**
   - Em **Authorized JavaScript origins:**
     - Adicione: `https://seu-projeto.vercel.app`
     - Adicione: `https://*.vercel.app` (para previews)
   
   - Em **Authorized redirect URIs:**
     - Adicione: `https://seu-projeto.vercel.app/api/oauth2/callback`
     - Adicione: `https://*.vercel.app/api/oauth2/callback` (para previews)
     - **Mantenha** `http://localhost:3000/api/oauth2/callback` (para desenvolvimento local)

5. **Salvar:**
   - Clique em **"Save"**
   - Aguarde alguns segundos para propagar

6. **Atualizar variável na Vercel:**
   - Volte na Vercel → **Settings** → **Environment Variables**
   - Edite `GOOGLE_REDIRECT_URI`
   - Coloque: `https://seu-projeto.vercel.app/api/oauth2/callback`
   - Salve

---

## 6️⃣ FAZER DEPLOY

### Passo a Passo:

1. **No painel da Vercel:**
   - Vá em **"Deployments"**
   - Clique em **"Redeploy"** no último deployment
   - Ou faça um novo commit no GitHub (a Vercel faz deploy automaticamente)

2. **Aguardar build:**
   - A Vercel vai:
     - Instalar dependências (`npm install`)
     - Fazer build (`npm run build`)
     - Fazer deploy

3. **Verificar se funcionou:**
   - Quando terminar, você verá: **"Ready"** ✅
   - Clique no link do deployment
   - Deve abrir seu aplicativo!

---

## 7️⃣ TESTAR APLICATIVO ONLINE

### Passo a Passo:

1. **Acessar o aplicativo:**
   - URL será algo como: `https://seu-projeto.vercel.app`

2. **Testar funcionalidades:**
   - Dashboard carrega? ✅
   - Consegue adicionar canal? ✅
   - OAuth redireciona corretamente? ✅
   - Consegue fazer upload de vídeo? ✅

3. **Se houver erros:**
   - Verifique **Logs** na Vercel (botão "Logs" no deployment)
   - Verifique **Console** do navegador (F12)
   - Verifique se todas as variáveis de ambiente estão configuradas

---

## ⚠️ OBSERVAÇÕES IMPORTANTES

### Processamento de Vídeo na Vercel:

A Vercel **NÃO** tem Python ou FFmpeg instalados por padrão. Você tem 2 opções:

1. **Opção A: Usar API Routes apenas para coordenação**
   - As API routes chamam serviços externos (ex: AWS Lambda, Railway, etc.)
   - Processamento acontece em outro lugar

2. **Opção B: Desabilitar processamento na Vercel**
   - Fazer upload apenas dos arquivos
   - Processar em outro serviço (Railway, Render, etc.)

### Arquivos Grandes:

- A Vercel tem limite de 50MB por arquivo
- Para vídeos grandes, use upload direto para Supabase Storage

---

## 🔄 DEPLOY AUTOMÁTICO

A Vercel faz deploy **automaticamente** a cada push no GitHub:

1. Você faz commit: `git commit -m "mensagem"`
2. Você faz push: `git push`
3. A Vercel detecta automaticamente
4. Faz build e deploy automaticamente
5. Você recebe um link com preview!

---

## 🎉 Pronto!

Seu aplicativo está online! Agora você pode:
- Acessar de qualquer lugar
- Compartilhar com outras pessoas
- Não precisa mais configurar localhost

---

**Boa sorte com o deploy! 🚀**

