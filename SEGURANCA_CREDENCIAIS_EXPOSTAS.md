# 🚨 AÇÃO URGENTE: Credenciais Expostas

## ⚠️ O QUE ACONTECEU

Suas credenciais do Google OAuth e Supabase foram commitadas no GitHub e estão expostas no histórico do repositório.

## 🔒 AÇÕES IMEDIATAS NECESSÁRIAS

### 1️⃣ REVOGAR CHAVES GOOGLE OAUTH (URGENTE!)

As chaves foram expostas e devem ser **revogadas imediatamente**:

1. **Acesse Google Cloud Console:**
   - Vá em: https://console.cloud.google.com
   - Seu projeto → **APIs & Services** → **Credentials**

2. **Revogar OAuth 2.0 Client:**
   - Encontre: `910520191655-df75keb4vmlntv564gs2bt40pb3571h.apps.googleusercontent.com`
   - Clique nos **3 pontinhos** → **Delete** OU **Edit** e regenere o secret
   - **Regenere o Client Secret:**
     - Clique em **Edit** → Role até **Client secret**
     - Clique em **Reset Secret** ou **Generate new secret**
     - **COPIE o novo secret** (aparece só uma vez!)

3. **Criar novas credenciais (opcional):**
   - Se preferir, crie um **novo OAuth 2.0 Client ID** completamente novo
   - Configure os redirect URIs novamente

### 2️⃣ REVOGAR CHAVES SUPABASE (RECOMENDADO)

1. **Acesse Supabase Dashboard:**
   - Vá em: https://supabase.com/dashboard
   - Seu projeto → **Settings** → **API**

2. **Rotacionar Service Role Key:**
   - Vá em **Settings** → **API** → **Service role key**
   - Clique em **Reset service role key** ou crie uma nova
   - **⚠️ CUIDADO:** Isso vai invalidar todas as conexões ativas

3. **Rotacionar Anon Key (Opcional):**
   - Geralmente não é necessário (é pública por design)
   - Mas se quiser, pode regenerar também

### 3️⃣ REMOVER CREDENCIAIS DO HISTÓRICO DO GIT

As credenciais ainda estão no histórico do Git. Precisa removê-las:

**⚠️ AVISO:** Isso vai reescrever o histórico do Git. Se outras pessoas têm acesso ao repositório, avise antes!

#### Opção A: Usando git-filter-repo (Recomendado)

```powershell
# Instalar git-filter-repo (se não tiver)
pip install git-filter-repo

# Remover credenciais do histórico
git filter-repo --path DEPLOY_GITHUB_VERCEL.md --invert-paths
```

#### Opção B: Usando BFG Repo-Cleaner (Mais fácil)

1. **Baixe BFG:**
   - https://rtyley.github.io/bfg-repo-cleaner/
   - Baixe `bfg.jar`

2. **Execute:**
   ```powershell
   java -jar bfg.jar --replace-text replacements.txt
   ```

   Crie arquivo `replacements.txt`:
   ```
   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==>GOCSPX-SECRET-REMOVIDO
   910520191655-df75keb4vmlntv564gs2bt40pb3571h==>SEU-CLIENT-ID-AQUI
   ```

#### Opção C: Force Push após Limpar (Mais Simples)

```powershell
# Remover o arquivo problemático do histórico
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch DEPLOY_GITHUB_VERCEL.md" --prune-empty --tag-name-filter cat -- --all

# Forçar push (vai reescrever o histórico)
git push origin --force --all
```

**⚠️ CUIDADO:** Force push vai reescrever o histórico. Avise colaboradores se houver!

### 4️⃣ ATUALIZAR VARIÁVEIS DE AMBIENTE

Depois de regenerar as chaves:

1. **Atualizar `.env.local` local:**
   - Cole as novas chaves do Google OAuth
   - Cole as novas chaves do Supabase

2. **Atualizar Vercel:**
   - Vá em **Settings** → **Environment Variables**
   - Atualize todas as chaves expostas com os novos valores

### 5️⃣ VERIFICAR OUTRAS EXPOSIÇÕES

Execute este comando para verificar se há outras credenciais expostas:

```powershell
# Verificar histórico por padrões suspeitos
git log --all --full-history -p | Select-String -Pattern "password|secret|key|token|credential" -CaseSensitive
```

## ✅ DEPOIS DE TUDO

1. **Teste o aplicativo localmente** com as novas chaves
2. **Atualize a Vercel** com as novas variáveis de ambiente
3. **Verifique se tudo funciona** na produção
4. **Monitore** o Google Cloud Console por uso suspeito das chaves antigas

## 🛡️ PREVENÇÃO FUTURA

1. **Sempre use `.gitignore`** para arquivos sensíveis
2. **Use variáveis de ambiente** nunca hardcode
3. **Use `.env.example`** para documentação (sem valores reais)
4. **Revise commits** antes de fazer push
5. **Use ferramentas** como `git-secrets` ou `truffleHog` para detectar credenciais

## 📋 CHECKLIST DE RECUPERAÇÃO

- [ ] Revogar Client Secret do Google OAuth
- [ ] Criar/Regenerar novas credenciais Google OAuth
- [ ] Rotacionar Service Role Key do Supabase
- [ ] Remover credenciais do histórico do Git
- [ ] Atualizar `.env.local` local
- [ ] Atualizar variáveis de ambiente na Vercel
- [ ] Testar aplicativo localmente
- [ ] Testar aplicativo em produção
- [ ] Verificar logs por uso suspeito

---

**Importante:** Quanto mais rápido você revogar as chaves, menor o risco de uso malicioso!

