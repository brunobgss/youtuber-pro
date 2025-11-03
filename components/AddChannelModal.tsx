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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      const data = await res.json();
      if (data.ok) {
        onSuccess?.();
        onClose();
        setName('');
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (error) {
      alert('Erro ao criar canal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} title="Adicionar Canal" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome do Canal</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Ex: Meu Canal Principal"
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="btn bg-gray-500 hover:bg-gray-600">
            Cancelar
          </button>
          <button type="submit" disabled={loading || !name.trim()} className="btn">
            {loading ? 'Criando...' : 'Criar Canal'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

