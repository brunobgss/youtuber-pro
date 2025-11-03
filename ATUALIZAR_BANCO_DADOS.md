# 📊 Como Atualizar o Banco de Dados - Novos Campos de Canal

Para adicionar os novos campos (e-mail, authenticator, recuperação, senha) e status personalizados, você precisa executar uma migração no Supabase.

---

## 🔄 Opção 1: Migração SQL (Recomendado - Para tabela já existente)

Se você já tem a tabela `channels` criada, execute apenas a **migração**:

1. **Acesse o Supabase:**
   - Vá em: https://supabase.com/dashboard
   - Seu projeto → **SQL Editor**

2. **Execute este SQL:**

   Copie e cole o conteúdo do arquivo: `supabase/migration_add_channel_fields.sql`

   Ou cole diretamente:

   ```sql
   -- Adicionar novos campos se não existirem
   ALTER TABLE public.channels 
   ADD COLUMN IF NOT EXISTS account_email text,
   ADD COLUMN IF NOT EXISTS authenticator_email text,
   ADD COLUMN IF NOT EXISTS recovery_email text,
   ADD COLUMN IF NOT EXISTS password text;

   -- Atualizar constraint de status para incluir novos valores
   ALTER TABLE public.channels 
   DROP CONSTRAINT IF EXISTS channels_status_check;

   ALTER TABLE public.channels 
   ADD CONSTRAINT channels_status_check 
   CHECK (status IN (
     'pending',
     'authorized',
     'done',
     'needs_reauth',
     'quota_exceeded',
     'banido',
     'ativo',
     'ativo_com_video'
   ));
   ```

3. **Execute:** Clique em **Run** (ou `Ctrl + Enter`)

4. **Verificar:** Deve aparecer "Success. No rows returned" ✅

---

## 🔄 Opção 2: Recriar Tabela (Se não tiver dados importantes)

Se você ainda não tem dados na tabela `channels` e quer começar do zero:

1. **Acesse o Supabase:**
   - Vá em: **SQL Editor**

2. **Execute primeiro (apagar tabela):**
   ```sql
   DROP TABLE IF EXISTS public.channels CASCADE;
   ```

3. **Depois execute o novo schema:**
   - Copie todo o conteúdo de `supabase/schema.sql`
   - Cole e execute

---

## ✅ Verificar se Funcionou

1. **Vá em Table Editor** → `channels`
2. **Clique em uma linha** para ver os campos
3. **Deve aparecer:**
   - `account_email`
   - `authenticator_email`
   - `recovery_email`
   - `password`
   - `status` (com novos valores)

---

## 🎯 Após Atualizar o Banco

1. **Faça commit das mudanças:**
   ```powershell
   git add .
   git commit -m "Adicionar campos extras ao canal e seletor de status"
   git push
   ```

2. **Aguarde o deploy na Vercel**

3. **Teste:**
   - Adicionar um novo canal com todos os campos
   - Editar nome do canal
   - Mudar status do canal

---

**Pronto! 🚀**

