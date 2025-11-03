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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium">Título</label>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="text-xs text-brand hover:underline"
            >
              {generating ? 'Gerando...' : 'Gerar Automaticamente'}
            </button>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (separadas por vírgula)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="btn bg-gray-500 hover:bg-gray-600">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn">
            {loading ? 'Salvando...' : 'Salvar e Confirmar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
