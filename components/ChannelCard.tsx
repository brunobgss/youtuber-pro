'use client';

import { useState } from 'react';
import StatusBadge from '@/components/StatusBadge';

type Props = {
  id: string;
  name: string;
  email?: string;
  status: 'authorized' | 'pending' | 'needs_reauth' | 'quota_exceeded' | string;
  lastUpload?: string | null;
  onAuthorize?: () => void;
  onReupload?: () => void;
  onUpdate?: () => void;
};

export default function ChannelCard({ id, name, email, status, lastUpload, onAuthorize, onReupload, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editName.trim() === name) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/channels/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName.trim() })
      });

      const data = await res.json();
      if (data.ok) {
        setIsEditing(false);
        if (onUpdate) onUpdate();
      } else {
        alert('Erro ao atualizar: ' + data.error);
        setEditName(name);
      }
    } catch (error) {
      alert('Erro ao atualizar nome do canal');
      setEditName(name);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditName(name);
    setIsEditing(false);
  };

  return (
    <div className="card-youtube">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
              />
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
              >
                {isSaving ? 'Salvando...' : '✓'}
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg bg-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-300"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-brand"
                title="Editar nome"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          )}
          {email && <p className="text-xs text-gray-500 mt-1 truncate">{email}</p>}
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="text-xs">Último upload:</span>
          <span className="font-medium">{lastUpload || '-'}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onAuthorize} 
            className="flex-1 rounded-lg bg-brand px-3 py-2 text-xs font-medium text-white transition-all hover:bg-brand-hover hover:shadow-md"
          >
            Autorizar
          </button>
          <button 
            onClick={onReupload} 
            className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 transition-all hover:bg-gray-200 hover:shadow-md"
          >
            Reupload
          </button>
        </div>
      </div>
    </div>
  );
}


