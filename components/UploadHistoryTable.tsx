type Row = {
  video: string;
  channel: string;
  status: 'queued' | 'processing' | 'success' | 'fail';
  date: string;
  videoId?: string;
  title?: string;
};

type StatusType = 'queued' | 'processing' | 'success' | 'fail';

const statusClass: Record<StatusType, string> = {
  queued: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  processing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  success: 'bg-green-500/20 text-green-300 border-green-500/30',
  fail: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function UploadHistoryTable({ rows = [] as Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="text-left text-gray-300 border-b border-gray-700/50">
            <th className="p-3 font-semibold">Vídeo</th>
            <th className="p-3 font-semibold">Canal</th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 font-semibold">Data</th>
            <th className="p-3 font-semibold">Vídeo ID</th>
            <th className="p-3 font-semibold">Título</th>
            <th className="p-3 font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {(rows.length ? rows : [{ video: '-', channel: '-', status: 'queued' as const, date: '-', videoId: '-', title: '-' }]).map((r, i) => (
            <tr key={i} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors">
              <td className="p-3 text-gray-300">{r.video}</td>
              <td className="p-3 text-gray-300">{r.channel}</td>
              <td className="p-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium border ${statusClass[r.status as StatusType] || 'bg-gray-700/50 text-gray-400 border-gray-600/50'}`}>{r.status}</span>
              </td>
              <td className="p-3 text-gray-300">{r.date}</td>
              <td className="p-3 text-gray-300">{r.videoId || '-'}</td>
              <td className="p-3 text-gray-300">{r.title || '-'}</td>
              <td className="p-3 space-x-2">
                <button className="btn px-3 py-1.5 text-xs">Reprocessar</button>
                <button className="btn px-3 py-1.5 text-xs">Reupload</button>
                <button className="btn px-3 py-1.5 text-xs">Editar Metadata</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




