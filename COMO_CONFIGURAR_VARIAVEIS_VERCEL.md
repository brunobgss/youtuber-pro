# 📝 Como Configurar Variáveis de Ambiente na Vercel - Passo a Passo Visual

Guia detalhado com screenshots (mentais) de onde clicar!

---

## 1️⃣ ACESSAR A VERCEL

1. **Abra seu navegador**
2. **Acesse:** https://vercel.com
3. **Faça login** (se ainda não estiver logado)
4. **Encontre seu projeto:**
   - Você verá uma lista de projetos
   - Procure por **"youtuber"** ou o nome do seu projeto
   - **Clique no projeto** para abrir

---

## 2️⃣ IR PARA CONFIGURAÇÕES (SETTINGS)

1. **No topo da página do projeto, você verá um menu:**
   - **Overview** (Visão Geral)
   - **Deployments** (Deployments)
   - **Settings** (Configurações) ← **CLIQUE AQUI**
   - **Insights** (Métricas)

2. **Clique em "Settings"** (ou "Configurações")

---

## 3️⃣ ABRIR ENVIRONMENT VARIABLES

1. **No menu lateral ESQUERDO, você verá:**
   - General
   - **Environment Variables** ← **CLIQUE AQUI**
   - Git
   - Domains
   - Integrations
   - etc.

2. **Clique em "Environment Variables"** (ou "Variáveis de Ambiente")

---

## 4️⃣ ADICIONAR VARIÁVEL 1: GOOGLE_CLIENT_ID

1. **Na página de Environment Variables, você verá:**
   - Uma lista de variáveis (pode estar vazia)
   - Um botão grande: **"Add New"** (ou "Adicionar Novo")

2. **Clique em "Add New"**

3. **Uma janela/formulário vai aparecer com 2 campos:**

   **Campo 1: "Key" ou "Nome"**
   - Digite: `GOOGLE_CLIENT_ID`
   - (Sem aspas, exatamente assim)

   **Campo 2: "Value" ou "Valor"**
   - Digite: `910520191655-df75keb4vmlntv564gs2bt40pb3571h.apps.googleusercontent.com`
   - (Cole exatamente como está)

4. **Abaixo dos campos, você verá 3 checkboxes:**
   - ☐ **Production** ← **MARQUE**
   - ☐ **Preview** ← **MARQUE**
   - ☐ **Development** ← **MARQUE**

5. **Marque TODAS as 3 opções** (Production, Preview, Development)

6. **Clique no botão "Save"** (ou "Salvar") no final do formulário

✅ **Primeira variável adicionada!**

---

## 5️⃣ ADICIONAR VARIÁVEL 2: GOOGLE_CLIENT_SECRET

1. **Novamente, clique em "Add New"** (botão grande)

2. **Preencha o formulário:**

   **Key/Nome:**
   - Digite: `GOOGLE_CLIENT_SECRET`

   **Value/Valor:**
   - Digite: `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`

3. **Marque TODAS as 3 opções:**
   - ☑ Production
   - ☑ Preview
   - ☑ Development

4. **Clique em "Save"**

✅ **Segunda variável adicionada!**

---

## 6️⃣ ADICIONAR VARIÁVEL 3: GOOGLE_REDIRECT_URI

⚠️ **IMPORTANTE:** Primeiro você precisa saber a URL do seu projeto na Vercel!

### 6.1 - Descobrir a URL da Vercel:

1. **Na Vercel, ainda na página do seu projeto**
2. **Veja o TOPO da página** - você verá algo como:
   ```
   Production Deployment
   https://youtuber-pro-abc123.vercel.app
   ```
   Ou:
   ```
   https://youtuber.vercel.app
   ```
   
3. **COPIE essa URL completa!** (exemplo: `https://youtuber-pro-abc123.vercel.app`)

### 6.2 - Adicionar a variável:

1. **Clique em "Add New"**

2. **Preencha:**

   **Key/Nome:**
   - Digite: `GOOGLE_REDIRECT_URI`

   **Value/Valor:**
   - Digite: `https://SUA-URL-AQUI/api/oauth2/callback`
   - **Substitua "SUA-URL-AQUI" pela URL que você copiou!**
   
   **Exemplo:**
   - Se sua URL é: `https://youtuber-pro-abc123.vercel.app`
   - O valor será: `https://youtuber-pro-abc123.vercel.app/api/oauth2/callback`

3. **Marque TODAS as 3 opções:**
   - ☑ Production
   - ☑ Preview
   - ☑ Development

4. **Clique em "Save"**

✅ **Terceira variável adicionada!**

---

## 7️⃣ ADICIONAR VARIÁVEIS DO SUPABASE

Siga o mesmo processo para cada uma:

### Variável 4: NEXT_PUBLIC_SUPABASE_URL

1. **Clique em "Add New"**
2. **Key:** `NEXT_PUBLIC_SUPABASE_URL`
3. **Value:** `https://khbijubfllefqklwsqnb.supabase.co`
4. **Marque:** Production, Preview, Development
5. **Save**

### Variável 5: NEXT_PUBLIC_SUPABASE_ANON_KEY

1. **Clique em "Add New"**
2. **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmlqdWJmbGxlZnFrbHdzcW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzQ1MzAsImV4cCI6MjA3NzQxMDUzMH0.1o63Fk1Pa04lmozDLx_EalflcO22cNIj8wovpMmjEjI`
4. **Marque:** Production, Preview, Development
5. **Save**

### Variável 6: SUPABASE_SERVICE_ROLE_KEY

1. **Clique em "Add New"**
2. **Key:** `SUPABASE_SERVICE_ROLE_KEY`
3. **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYmlqdWJmbGxlZnFrbHdzcW5iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTgzNDUzMCwiZXhwIjoyMDc3NDEwNTMwfQ.JJYdYjJzspLPv29psXO6HllTnv97ZDvgFaDtZ1A557s`
4. **Marque:** Production, Preview, Development
5. **Save**

---

## ✅ VERIFICAR SE TUDO ESTÁ CONFIGURADO

Após adicionar todas as variáveis, você deve ver uma lista assim:

```
GOOGLE_CLIENT_ID           Production, Preview, Development
GOOGLE_CLIENT_SECRET       Production, Preview, Development
GOOGLE_REDIRECT_URI        Production, Preview, Development
NEXT_PUBLIC_SUPABASE_URL   Production, Preview, Development
NEXT_PUBLIC_SUPABASE_ANON_KEY  Production, Preview, Development
SUPABASE_SERVICE_ROLE_KEY  Production, Preview, Development
```

---

## 🔄 FAZER REDEPLOY

Após adicionar todas as variáveis:

1. **Vá em "Deployments"** (no menu superior)
2. **Encontre o último deployment**
3. **Clique nos 3 pontinhos (...) ao lado**
4. **Clique em "Redeploy"** (ou aguarde - a Vercel pode detectar automaticamente)

---

## 📍 RESUMO RÁPIDO - ONDE CLICAR

```
Vercel.com
  ↓
Seu Projeto (clique)
  ↓
Settings (menu superior)
  ↓
Environment Variables (menu lateral esquerdo)
  ↓
Add New (botão grande)
  ↓
Preencher Key e Value
  ↓
Marcar Production, Preview, Development
  ↓
Save
```

**Repita para cada variável!**

---

## 🆘 DÚVIDAS COMUNS

### "Não vejo o botão Add New"
- Você precisa estar na página **Settings → Environment Variables**
- O botão está no canto superior direito da lista de variáveis

### "Onde fica Settings?"
- No menu superior da página do projeto
- Entre "Overview" e "Deployments"

### "Como sei a URL do meu projeto?"
- Olhe o topo da página na Vercel
- Está escrito logo abaixo do nome do projeto
- Formato: `https://seu-projeto.vercel.app`

---

**É só isso! Se tiver dúvida em algum passo, me avise! 🚀**

