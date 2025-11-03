'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';

type Props = {
  open: boolean;
  videoId: string;
  initialTitle?: string;
  initialDescription?: string;
  initialTags?: string[];
  onClose: () => void;
  onSave: (title: string, description: string, tags: string[]) => Promise<void>;
};

export default function MetadataEditorModal({
  open,
  videoId,
  initialTitle,
  initialDescription,
  initialTags,
  onClose,
  onSave
}: Props) {
  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [tags, setTags] = useState((initialTags || []).join(', '));
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(initialTitle || '');
      setDescription(initialDescription || '');
      setTags((initialTags || []).join(', '));
    }
  }, [open, initialTitle, initialDescription, initialTags]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/generate_metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_id: videoId })
      });

      const data = await res.json();
      if (data.ok) {
        setTitle(data.data.title);
        setDescription(data.data.description);
        setTags(data.data.tags.join(', '));
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (error) {
      alert('Erro ao gerar metadata');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
      await onSave(title, description, tagsArray);
      onClose();
    } catch (error) {
      alert('Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} title="Editar Metadata" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-300">Título</label>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="text-xs font-medium text-brand hover:text-brand-light transition-colors"
            >
              {generating ? 'Gerando...' : '✨ Gerar Automaticamente'}
            </button>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Tags (separadas por vírgula)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
          <button type="button" onClick={onClose} className="btn-secondary px-6 py-2.5">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn px-6 py-2.5">
            {loading ? 'Salvando...' : 'Salvar e Confirmar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
