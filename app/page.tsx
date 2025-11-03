'use client';

import { useState, useEffect } from 'react';
import ChannelListItem from '@/components/ChannelListItem';
import UploadHistoryTable from '@/components/UploadHistoryTable';
import UploadVideoModal from '@/components/UploadVideoModal';
import GenerateVideoModal from '@/components/GenerateVideoModal';
import MetadataEditorModal from '@/components/MetadataEditorModal';
import AddChannelModal from '@/components/AddChannelModal';

interface Channel {
  id: string;
  name: string | null;
  email: string | null;
  account_email: string | null;
  authenticator_email: string | null;
  recovery_email: string | null;
  password: string | null;
  status: string | null;
  last_uploaded_video_id: string | null;
  created_at: string | null;
}

interface Upload {
  id: string;
  channel_id: string;
  video_id: string | null;
  status: string | null;
  created_at: string;
  finished_at: string | null;
  channels?: { name: string | null; email: string | null };
}

export default function Page() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [metadataModalOpen, setMetadataModalOpen] = useState(false);
  const [addChannelModalOpen, setAddChannelModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [channelsRes, uploadsRes] = await Promise.all([
        fetch('/api/channels'),
        fetch('/api/uploads')
      ]);

      const channelsData = await channelsRes.json();
      const uploadsData = await uploadsRes.json();

      if (channelsData.ok) setChannels(channelsData.data || []);
      if (uploadsData.ok) setUploads(uploadsData.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorize = (channelId: string) => {
    window.location.href = `/api/oauth2/authorize?channel_id=${channelId}`;
  };

  const handleUpload = async (videoId: string, channelId: string) => {
    try {
      const res = await fetch('/api/upload_video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_id: videoId, channel_id: channelId })
      });

      const data = await res.json();
      if (data.ok) {
        alert('Upload iniciado com sucesso!');
        loadData();
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (error) {
      alert('Erro ao iniciar upload');
    }
  };

  const handleSaveMetadata = async (title: string, description: string, tags: string[]) => {
    try {
      const res = await fetch(`/api/videos/${selectedVideoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, tags })
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      loadData();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand border-r-transparent mb-3"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div className="mb-8 card-youtube">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Meus Canais</h2>
            <p className="text-gray-400 text-sm mt-1">Gerencie seus canais do YouTube</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setAddChannelModalOpen(true)} 
              className="btn-green text-sm"
            >
              + Canal
            </button>
            <button 
              onClick={() => setUploadModalOpen(true)} 
              className="btn-secondary text-sm"
            >
              Adicionar Vídeo
            </button>
            <button 
              onClick={() => setGenerateModalOpen(true)} 
              className="btn text-sm"
            >
              Gerar Vídeo
            </button>
          </div>
        </div>
      </div>

      <section className="mb-8">
        {channels.length === 0 ? (
          <div className="card-youtube text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-white font-semibold mb-2">Nenhum canal cadastrado</p>
            <p className="text-gray-400 text-sm mb-4">Adicione seu primeiro canal para começar</p>
            <button 
              onClick={() => setAddChannelModalOpen(true)}
              className="btn"
            >
              + Adicionar Canal
            </button>
          </div>
        ) : (
          <div className="card-youtube overflow-hidden">
            <div className="divide-y divide-gray-700/50">
              {channels.map((channel) => (
                <ChannelListItem
                  key={channel.id}
                  id={channel.id}
                  name={channel.name || 'Sem nome'}
                  email={channel.account_email || channel.email || undefined}
                  status={channel.status || 'pending'}
                  lastUpload={channel.last_uploaded_video_id || undefined}
                  createdAt={channel.created_at || undefined}
                  onAuthorize={() => handleAuthorize(channel.id)}
                  onReupload={() => {/* TODO: implementar reupload */}}
                  onUpdate={loadData}
                  onStatusChange={() => loadData()}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="card-youtube mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Histórico de Uploads</h3>
            <p className="text-sm text-gray-400 mt-1">Acompanhe o status dos seus vídeos</p>
          </div>
          <select className="rounded-lg border border-gray-600 bg-gray-800/90 px-3 py-2 text-sm font-medium text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
            <option>Todos</option>
            <option>Authorized</option>
            <option>Pending</option>
            <option>Needs Reauth</option>
            <option>Quota Exceeded</option>
          </select>
        </div>
        <UploadHistoryTable
          rows={uploads.map(u => ({
            video: u.video_id || '-',
            channel: u.channels?.name || '-',
            status: (u.status || 'queued') as 'queued' | 'processing' | 'success' | 'fail',
            date: new Date(u.created_at).toLocaleDateString('pt-BR'),
            videoId: u.video_id || undefined,
            title: '-'
          }))}
        />
      </section>

      <section className="card-youtube">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white">Configurações</h3>
          <p className="text-sm text-gray-400 mt-1">Personalize o comportamento do sistema</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm">
            <span className="font-medium text-gray-300">Template de Título</span>
            <input
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              placeholder="{tema} | {benefício} em {tempo}"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-gray-300">Idioma TTS</span>
            <select className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
              <option>pt</option>
              <option>en</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="font-medium text-gray-300">Watermark padrão</span>
            <input
              className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white placeholder-gray-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              placeholder="/watermarks/logo.png"
            />
          </label>
          <label className="text-sm">
            <span className="font-medium text-gray-300">Privacidade padrão</span>
            <select className="mt-2 w-full rounded-lg border border-gray-600 bg-gray-800/90 px-4 py-2.5 text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
              <option>public</option>
              <option>unlisted</option>
              <option>private</option>
            </select>
          </label>
        </div>
      </section>

      <UploadVideoModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSuccess={loadData}
      />

      <GenerateVideoModal
        open={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        onSuccess={loadData}
      />

      <MetadataEditorModal
        open={metadataModalOpen}
        videoId={selectedVideoId}
        onClose={() => {
          setMetadataModalOpen(false);
          setSelectedVideoId('');
        }}
        onSave={handleSaveMetadata}
      />

      <AddChannelModal
        open={addChannelModalOpen}
        onClose={() => setAddChannelModalOpen(false)}
        onSuccess={loadData}
      />
    </main>
  );
}