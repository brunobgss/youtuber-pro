# 🎯 Próximos Passos - Configurar Vercel e Testar Aplicativo

Agora que o deploy funcionou, vamos configurar tudo para o aplicativo funcionar online!

---

## 1️⃣ CONFIGURAR VARIÁVEIS DE AMBIENTE NA VERCEL

### Passo a Passo:

1. **Acesse a Vercel:**
   - Vá em: https://vercel.com
   - Faça login e abra seu projeto

2. **Ir para Environment Variables:**
   - Clique em **Settings** (Configurações)
   - No menu lateral, clique em **Environment Variables**

3. **Adicionar cada variável (uma por uma):**

   **A. Supabase (obrigatório):**
   
   Clique em **Add New** e adicione:
   ```
   Nome: NEXT_PUBLIC_SUPABASE_URL
   Valor: https://khbijubfllefqklwsqnb.supabase.co
   ```
   - Marque: **Production**, **Preview**, **Development**
   - Clique em **Save**

   Clique em **Add New** novamente:
   ```
   Nome: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmlqdWJmbGxlZnFrbHdzcW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzQ1MzAsImV4cCI6MjA3NzQxMDUzMH0.1o63Fk1Pa04lmozDLx_EalflcO22cNIj8wovpMmjEjI
   ```
   - Marque: **Production**, **Preview**, **Development**
   - Clique em **Save**

   Clique em **Add New** novamente:
   ```
   Nome: SUPABASE_SERVICE_ROLE_KEY
   Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmlqdWJmbGxlZnFrbHdzcW5iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTgzNDUzMCwiZXhwIjoyMDc3NDEwNTMwfQ.JJYdYjJzspLPv29psXO6HllTnv97ZDvgFaDtZ1A557s
   ```
   - Marque: **Production**, **Preview**, **Development**
   - Clique em **Save**

   **B. Google OAuth (obrigatório):**

   Clique em **Add New**:
   ```
   Nome: GOOGLE_CLIENT_ID
   Valor: 910520191655-df75keb4vmlntv564gs2bt40pb3571h.apps.googleusercontent.com
   ```
   - Marque: **Production**, **Preview**, **Development**
   - Clique em **Save**

   Clique em **Add New**:
   ```
   Nome: GOOGLE_CLIENT_SECRET
   Valor: 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
   ```
   - Marque: **Production**, **Preview**, **Development**
   - Clique em **Save**

   ⚠️ **IMPORTANTE:** Para `GOOGLE_REDIRECT_URI`, primeiro você precisa saber a URL do seu projeto na Vercel!

   - Na página do projeto Vercel, você verá a URL: `https://seu-projeto.vercel.app`
   - **Copie essa URL completa!**

   Clique em **Add New**:
   ```
   Nome: GOOGLE_REDIRECT_URI
   Valor: https://SEU-PROJETO.vercel.app/api/oauth2/callback
   ```
   - Substitua `SEU-PROJETO` pela URL real da Vercel
   - Marque: **Production**, **Preview**, **Development**
   - Clique em **Save**

   **C. Processamento (opcional, mas recomendado):**

   Clique em **Add New**:
   ```
   Nome: FFMPEG_PATH
   Valor: ffmpeg
   ```
   - Marque: **Production**, **Preview**, **Development**
   - Clique em **Save**

   Clique em **Add New**:
   ```
   Nome: PYTHON_PATH
   Valor: python
   ```
   - Marque: **Production**, **Preview**, **Development**
   - Clique em **Save**

   **D. IA Local (opcional):**

   Se você tiver modelos locais configurados:
   ```
   Nome: LLAMA_MODEL
   Valor: (deixe vazio ou seu caminho)
   ```

   ```
   Nome: SD_MODEL
   Valor: (deixe vazio ou seu modelo)
   ```

---

## 2️⃣ ATUALIZAR GOOGLE OAUTH COM URL DA VERCEL

### Passo a Passo:

1. **Copiar URL da Vercel:**
   - Na Vercel, na página do projeto
   - Veja a URL no topo: `https://seu-projeto.vercel.app`
   - **Copie essa URL!**

2. **Acessar Google Cloud Console:**
   - Vá em: https://console.cloud.google.com
   - Seu projeto → **APIs & Services** → **Credentials**

3. **Editar OAuth 2.0 Client:**
   - Encontre seu **OAuth 2.0 Client ID**
   - Clique nele para editar

4. **Adicionar URLs da Vercel:**

   **Authorized JavaScript origins:**
   - Clique em **"Add URI"**
   - Adicione: `https://seu-projeto.vercel.app`
   - Adicione: `https://*.vercel.app` (para previews/branches)
   - **Mantenha:** `http://localhost:3000` (para desenvolvimento local)

   **Authorized redirect URIs:**
   - Clique em **"Add URI"**
   - Adicione: `https://seu-projeto.vercel.app/api/oauth2/callback`
   - Adicione: `https://*.vercel.app/api/oauth2/callback` (para previews)
   - **Mantenha:** `http://localhost:3000/api/oauth2/callback` (para desenvolvimento)

5. **Salvar:**
   - Clique em **Save**
   - Aguarde alguns segundos para propagar

---

## 3️⃣ FAZER REDEPLOY NA VERCEL

### Passo a Passo:

1. **Na Vercel, vá em Deployments:**
   - Clique em **Deployments** no menu lateral
   - Encontre o último deployment
   - Clique nos **3 pontinhos** → **Redeploy**
   - Ou simplesmente aguarde - a Vercel pode detectar mudanças nas variáveis

2. **Aguardar build:**
   - O build vai iniciar automaticamente
   - Aguarde até ver **"Ready"** ✅

---

## 4️⃣ TESTAR APLICATIVO ONLINE

### Passo a Passo:

1. **Acessar o aplicativo:**
   - Clique no link do deployment (exemplo: `https://seu-projeto.vercel.app`)
   - O dashboard deve abrir!

2. **Testar funcionalidades:**

   ✅ **Dashboard carrega?**
   - Deve mostrar a interface do aplicativo

   ✅ **Adicionar Canal:**
   - Clique em **"Adicionar Canal"**
   - Digite um nome
   - Clique em **"Autorizar"**
   - Deve redirecionar para Google Login
   - Faça login e autorize
   - Deve voltar para o dashboard com sucesso ✅

   ✅ **Verificar se canal foi adicionado:**
   - Deve aparecer um card com o canal
   - Status deve ser "Authorized" ✅

3. **Se houver erros:**
   - Verifique o **Console do navegador** (F12 → Console)
   - Verifique os **Logs na Vercel** (Deployments → clique no deployment → Logs)
   - Verifique se todas as variáveis de ambiente estão configuradas

---

## ✅ CHECKLIST FINAL

- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Google OAuth atualizado com URL da Vercel
- [ ] Redeploy feito na Vercel
- [ ] Aplicativo acessível online
- [ ] Dashboard carrega corretamente
- [ ] Consegue adicionar canal
- [ ] OAuth funciona (login Google)

---

## 🆘 Problemas Comuns

### Erro: "Supabase env vars are not set"
- **Solução:** Verifique se todas as variáveis do Supabase estão configuradas na Vercel

### Erro: "OAuth redirect_uri_mismatch"
- **Solução:** Verifique se adicionou a URL da Vercel no Google Cloud Console

### Dashboard não carrega dados
- **Solução:** Verifique se as tabelas foram criadas no Supabase
- **Solução:** Verifique se os buckets de storage foram criados

### Erro 500 nas APIs
- **Solução:** Verifique os logs na Vercel (Deployments → Logs)
- **Solução:** Verifique se todas as variáveis de ambiente estão corretas

---

## 🎉 Próximos Passos Após Configuração

Depois que tudo estiver funcionando:

1. **Adicionar seu primeiro canal YouTube**
2. **Fazer upload de um vídeo de teste**
3. **Processar o vídeo (adicionar TTS, watermark, etc.)**
4. **Gerar metadados (título, descrição, tags)**
5. **Fazer upload para o YouTube**

---

**Boa sorte! 🚀**

Se tiver algum problema, me avise!

