'use client';

import { useState } from 'react';
import Modal from './Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function UploadVideoModal({ open, onClose, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [applyTTS, setApplyTTS] = useState(false);
  const [watermarkPath, setWatermarkPath] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('source', 'folder');

      const res = await fetch('/api/videos', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.ok) {
        onSuccess?.();
        onClose();
        setFile(null);
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (error) {
      alert('Erro ao fazer upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} title="Adicionar Vídeo" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Arquivo de Vídeo</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="apply_tts"
            checked={applyTTS}
            onChange={(e) => setApplyTTS(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="apply_tts" className="text-sm">Aplicar TTS</label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Watermark (caminho)</label>
          <input
            type="text"
            value={watermarkPath}
            onChange={(e) => setWatermarkPath(e.target.value)}
            placeholder="/watermarks/logo.png"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="btn bg-gray-500 hover:bg-gray-600">
            Cancelar
          </button>
          <button type="submit" disabled={loading || !file} className="btn">
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
