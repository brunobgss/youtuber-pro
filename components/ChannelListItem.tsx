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

export default function ChannelListItem({ 
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
  const [showDetails, setShowDetails] = useState(false);

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
    <div className="group hover:bg-gray-800/30 transition-colors">
      <div className="flex items-center gap-4 p-4">
        {/* Avatar/Icon */}
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center text-white font-bold text-lg shadow-[0_2px_4px_rgba(255,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1 rounded-lg border border-gray-600 bg-gray-800/90 px-3 py-1.5 text-sm font-semibold text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
              />
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-lg bg-gradient-to-b from-green-600 to-green-700 px-2 py-1.5 text-xs font-semibold text-white shadow-[0_2px_0_0_#047857] hover:shadow-[0_1px_0_0_#047857] hover:translate-y-0.5 disabled:opacity-50"
              >
                {isSaving ? '...' : '✓'}
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 px-2 py-1.5 text-xs font-semibold text-gray-200 shadow-[0_2px_0_0_#1f2937] hover:shadow-[0_1px_0_0_#1f2937] hover:translate-y-0.5"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group/name">
              <h3 className="font-semibold text-white text-base truncate">{name}</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover/name:opacity-100 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-brand p-1"
                title="Editar nome"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          )}
          {email && (
            <p className="text-xs text-gray-400 mt-0.5 truncate">{email}</p>
          )}
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs text-gray-500">Adicionado em {formatDate(createdAt)}</span>
            {lastUpload && (
              <>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500">Último upload: {lastUpload}</span>
              </>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="flex-shrink-0">
          <StatusBadge status={status} />
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isChangingStatus}
            className="rounded-lg border border-gray-600 bg-gray-800/90 px-2.5 py-1.5 text-xs font-medium text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
          >
            <option value="banido">Banido</option>
            <option value="ativo">Ativo</option>
            <option value="ativo_com_video">Ativo com Vídeo</option>
            <option value="pending">Pending</option>
            <option value="authorized">Authorized</option>
            <option value="needs_reauth">Needs Reauth</option>
            <option value="quota_exceeded">Quota Exceeded</option>
          </select>

          <button 
            onClick={onAuthorize} 
            className="rounded-lg bg-gradient-to-b from-brand to-brand-hover px-3 py-1.5 text-xs font-semibold text-white shadow-[0_2px_0_0_#CC0000,0_1px_4px_rgba(255,0,0,0.3)] transition-all hover:shadow-[0_1px_0_0_#CC0000,0_1px_3px_rgba(255,0,0,0.4)] hover:translate-y-0.5 active:shadow-[0_1px_0_0_#CC0000] active:translate-y-1"
          >
            Autorizar
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-200 shadow-[0_2px_0_0_#1f2937] transition-all hover:shadow-[0_1px_0_0_#1f2937] hover:translate-y-0.5 hover:from-gray-600 hover:to-gray-700 active:shadow-[0_1px_0_0_#1f2937] active:translate-y-1"
          >
            {showDetails ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <div className="px-4 pb-4 pl-20 border-t border-gray-700/30 bg-gray-900/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div>
              <span className="text-xs text-gray-400 block mb-1">Status Atual</span>
              <StatusBadge status={status} />
            </div>
            <div>
              <span className="text-xs text-gray-400 block mb-1">Data de Adição</span>
              <span className="text-sm font-medium text-gray-300">{formatDate(createdAt)}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block mb-1">Último Upload</span>
              <span className="text-sm font-medium text-gray-300">{lastUpload || '-'}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block mb-1">Ações</span>
              <div className="flex gap-2 mt-1">
                <button 
                  onClick={onReupload} 
                  className="rounded-lg bg-gradient-to-b from-gray-700 to-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-200 shadow-[0_2px_0_0_#1f2937] transition-all hover:shadow-[0_1px_0_0_#1f2937] hover:translate-y-0.5"
                >
                  Reupload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

