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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Roteiro/Texto</label>
          <textarea
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            rows={8}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Digite o texto que será narrado..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Idioma TTS</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
          </select>
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
          <button type="submit" disabled={loading || !scriptText.trim()} className="btn">
            {loading ? 'Gerando...' : 'Gerar Vídeo'}
          </button>
        </div>
      </form>
    </Modal>
  );
}


