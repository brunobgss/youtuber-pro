'use client';

import { useState } from 'react';
import StatusBadge from '@/components/StatusBadge';

type Props = {
  id: string;
  name: string;
  email?: string;
  status: 'authorized' | 'pending' | 'needs_reauth' | 'quota_exceeded' | 'banido' | 'ativo' | 'ativo_com_video' | string;
  lastUpload?: string | null;
  createdAt?: string;
  onAuthorize?: () => void;
  onReupload?: () => void;
  onUpdate?: () => void;
  onStatusChange?: (status: string) => void;
};

export default function ChannelCard({ 
  id, 
  name, 
  email, 
  status, 
  lastUpload, 
  createdAt,
  onAuthorize, 
  onReupload, 
  onUpdate,
  onStatusChange 
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

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

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return;

    setIsChangingStatus(true);
    try {
      const res = await fetch(`/api/channels/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();
      if (data.ok) {
        if (onStatusChange) onStatusChange(newStatus);
        if (onUpdate) onUpdate();
      } else {
        alert('Erro ao atualizar status: ' + data.error);
      }
    } catch (error) {
      alert('Erro ao atualizar status do canal');
    } finally {
      setIsChangingStatus(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return '-';
    }
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
                className="flex-1 rounded-lg border border-gray-600 bg-gray-800/90 px-3 py-2 text-sm font-medium text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
              />
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-lg bg-gradient-to-b from-green-600 to-green-700 px-3 py-2 text-xs font-semibold text-white shadow-[0_2px_0_0_#047857] hover:shadow-[0_1px_0_0_#047857] hover:translate-y-0.5 disabled:opacity-50"
              >
                {isSaving ? 'Salvando...' : '✓'}
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 px-3 py-2 text-xs font-semibold text-gray-200 shadow-[0_2px_0_0_#1f2937] hover:shadow-[0_1px_0_0_#1f2937] hover:translate-y-0.5"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h3 className="font-semibold text-white truncate">{name}</h3>
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
          {email && <p className="text-xs text-gray-400 mt-1 truncate">{email}</p>}
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-xs text-gray-400">Status:</span>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isChangingStatus}
              className="rounded-lg border border-gray-600 bg-gray-800/90 px-3 py-1.5 text-xs font-medium text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
            >
              <option value="banido">Banido</option>
              <option value="ativo">Ativo</option>
              <option value="ativo_com_video">Ativo com Vídeo</option>
              <option value="pending">Pending</option>
              <option value="authorized">Authorized</option>
              <option value="needs_reauth">Needs Reauth</option>
              <option value="quota_exceeded">Quota Exceeded</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-xs text-gray-400">Data de adição:</span>
            <span className="text-xs font-medium text-gray-300">{formatDate(createdAt)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-xs text-gray-400">Último upload:</span>
            <span className="text-xs font-medium text-gray-300">{lastUpload || '-'}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button 
            onClick={onAuthorize} 
            className="flex-1 rounded-lg bg-gradient-to-b from-brand to-brand-hover px-3 py-2 text-xs font-semibold text-white shadow-[0_3px_0_0_#CC0000,0_2px_6px_rgba(255,0,0,0.3)] transition-all hover:shadow-[0_2px_0_0_#CC0000,0_1px_3px_rgba(255,0,0,0.4)] hover:translate-y-0.5 active:shadow-[0_1px_0_0_#CC0000] active:translate-y-1"
          >
            Autorizar
          </button>
          <button 
            onClick={onReupload} 
            className="flex-1 rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 px-3 py-2 text-xs font-semibold text-gray-200 shadow-[0_3px_0_0_#1f2937] transition-all hover:shadow-[0_2px_0_0_#1f2937] hover:translate-y-0.5 hover:from-gray-600 hover:to-gray-700 active:shadow-[0_1px_0_0_#1f2937] active:translate-y-1"
          >
            Reupload
          </button>
        </div>
      </div>
    </div>
  );
}


