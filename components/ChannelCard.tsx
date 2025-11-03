import StatusBadge from '@/components/StatusBadge';

type Props = {
  name: string;
  email?: string;
  status: 'authorized' | 'pending' | 'needs_reauth' | 'quota_exceeded' | string;
  lastUpload?: string | null;
};

export default function ChannelCard({ name, email, status, lastUpload, onAuthorize, onReupload }: Props & { onAuthorize?: () => void; onReupload?: () => void }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{name}</h3>
          {email && <p className="text-xs text-gray-500">{email}</p>}
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
        <span>Último upload: {lastUpload || '-'}</span>
        <div className="space-x-2">
          <button onClick={onAuthorize} className="btn px-3 py-1 text-xs">Autorizar</button>
          <button onClick={onReupload} className="btn px-3 py-1 text-xs">Reupload</button>
        </div>
      </div>
    </div>
  );
}


