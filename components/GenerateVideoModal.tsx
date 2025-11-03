'use client';

import { useState } from 'react';
import Modal from './Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function GenerateVideoModal({ open, onClose, onSuccess }: Props) {
  const [scriptText, setScriptText] = useState('');
  const [lang, setLang] = useState('pt');
  const [watermarkPath, setWatermarkPath] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scriptText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/generate_video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script_text: scriptText,
          lang,
          watermark_path: watermarkPath
        })
      });

      const data = await res.json();
      if (data.ok) {
        onSuccess?.();
        onClose();
        setScriptText('');
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (error) {
      alert('Erro ao gerar vídeo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} title="Gerar Vídeo" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Roteiro/Texto</label>
          <textarea
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            rows={8}
            className="w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
            placeholder="Digite o texto que será narrado..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Idioma TTS</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
          </select>
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
          <button type="submit" disabled={loading || !scriptText.trim()} className="btn px-6 py-2.5">
            {loading ? 'Gerando...' : 'Gerar Vídeo'}
          </button>
        </div>
      </form>
    </Modal>
  );
}


