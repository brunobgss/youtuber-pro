'use client';

import { useState } from 'react';
import Modal from './Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function AddChannelModal({ open, onClose, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [authenticatorEmail, setAuthenticatorEmail] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !accountEmail.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          account_email: accountEmail,
          authenticator_email: authenticatorEmail || null,
          recovery_email: recoveryEmail || null,
          password: password || null,
          status: 'ativo'
        })
      });

      const data = await res.json();
      if (data.ok) {
        onSuccess?.();
        onClose();
        setName('');
        setAccountEmail('');
        setAuthenticatorEmail('');
        setRecoveryEmail('');
        setPassword('');
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (error) {
      alert('Erro ao criar canal');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setAccountEmail('');
    setAuthenticatorEmail('');
    setRecoveryEmail('');
    setPassword('');
    onClose();
  };

  return (
    <Modal open={open} title="Adicionar Novo Canal" onClose={handleClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Canal <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            placeholder="Ex: Meu Canal Principal"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail da Conta (Google) <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={accountEmail}
            onChange={(e) => setAccountEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            placeholder="exemplo@gmail.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Authenticator (E-mail da conta)
          </label>
          <input
            type="email"
            value={authenticatorEmail}
            onChange={(e) => setAuthenticatorEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            placeholder="exemplo@email.com (onde está o código do authenticator)"
          />
          <p className="mt-1 text-xs text-gray-500">E-mail onde está configurado o Google Authenticator</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mail de Recuperação
          </label>
          <input
            type="email"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            placeholder="recuperacao@email.com"
          />
          <p className="mt-1 text-xs text-gray-500">E-mail de recuperação cadastrado neste canal</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha do Canal
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              placeholder="Senha da conta Google"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m13.42 13.42l-3.29-3.29M3 3l13.42 13.42" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-yellow-600">⚠️ A senha será armazenada como texto. Use apenas em ambiente seguro.</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button 
            type="button" 
            onClick={handleClose} 
            className="btn-secondary px-6 py-2.5"
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading || !name.trim() || !accountEmail.trim()} 
            className="btn px-6 py-2.5"
          >
            {loading ? 'Criando...' : 'Criar Canal'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

