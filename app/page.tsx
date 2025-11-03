'use client';

import { useState, useEffect } from 'react';
import ChannelCard from '@/components/ChannelCard';
import UploadHistoryTable from '@/components/UploadHistoryTable';
import UploadVideoModal from '@/components/UploadVideoModal';
import GenerateVideoModal from '@/components/GenerateVideoModal';
import MetadataEditorModal from '@/components/MetadataEditorModal';
import AddChannelModal from '@/components/AddChannelModal';

interface Channel {
  id: string;
  name: string | null;
  email: string | null;
  status: string | null;
  last_uploaded_video_id: string | null;
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
        <p className="text-gray-500">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium">Dashboard</h2>
          <p className="text-gray-500 text-sm">Automatize a criação e upload de vídeos</p>
        </div>
        <div className="space-x-2">
          <button onClick={() => setAddChannelModalOpen(true)} className="btn bg-green-600 hover:bg-green-700">
            + Canal
          </button>
          <button onClick={() => setUploadModalOpen(true)} className="btn">
            Adicionar Vídeo
          </button>
          <button onClick={() => setGenerateModalOpen(true)} className="btn">
            Gerar Vídeo
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {channels.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhum canal cadastrado. Adicione um canal.</p>
        ) : (
          channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              name={channel.name || 'Sem nome'}
              email={channel.email || undefined}
              status={channel.status || 'pending'}
              lastUpload={channel.last_uploaded_video_id || undefined}
              onAuthorize={() => handleAuthorize(channel.id)}
              onReupload={() => {/* TODO: implementar reupload */}}
            />
          ))
        )}
      </section>

      <section className="card">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-medium">Histórico de Uploads</h3>
          <select className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm">
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

      <section className="card">
        <h3 className="mb-2 font-medium">Configurações</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="text-sm">
            Template de Título
            <input
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              placeholder="{tema} | {benefício} em {tempo}"
            />
          </label>
          <label className="text-sm">
            Idioma TTS
            <select className="mt-1 w-full rounded-md border border-gray-300 p-2">
              <option>pt</option>
              <option>en</option>
            </select>
          </label>
          <label className="text-sm">
            Watermark padrão
            <input
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              placeholder="/watermarks/logo.png"
            />
          </label>
          <label className="text-sm">
            Privacidade padrão
            <select className="mt-1 w-full rounded-md border border-gray-300 p-2">
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