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
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Arquivo de Vídeo</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-hover transition-colors"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="apply_tts"
            checked={applyTTS}
            onChange={(e) => setApplyTTS(e.target.checked)}
            className="mr-3 h-4 w-4 rounded border-gray-600 bg-gray-800 text-brand focus:ring-2 focus:ring-brand/20"
          />
          <label htmlFor="apply_tts" className="text-sm font-medium text-gray-300 cursor-pointer">Aplicar TTS</label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Watermark (caminho)</label>
          <input
            type="text"
            value={watermarkPath}
            onChange={(e) => setWatermarkPath(e.target.value)}
            placeholder="/watermarks/logo.png"
            className="w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
          <button type="button" onClick={onClose} className="btn-secondary px-6 py-2.5">
            Cancelar
          </button>
          <button type="submit" disabled={loading || !file} className="btn px-6 py-2.5">
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
