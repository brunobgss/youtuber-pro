-- Migração: Adicionar novos campos e status na tabela channels
-- Execute este SQL no Supabase SQL Editor se a tabela já existe

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

-- Comentários para documentação
COMMENT ON COLUMN public.channels.account_email IS 'E-mail da conta do Google';
COMMENT ON COLUMN public.channels.authenticator_email IS 'E-mail onde está configurado o Google Authenticator';
COMMENT ON COLUMN public.channels.recovery_email IS 'E-mail de recuperação cadastrado no canal';
COMMENT ON COLUMN public.channels.password IS 'Senha do canal (armazenada como texto - usar com cuidado)';

