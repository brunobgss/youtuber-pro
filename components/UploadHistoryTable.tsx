type Row = {
  video: string;
  channel: string;
  status: 'queued' | 'processing' | 'success' | 'fail';
  date: string;
  videoId?: string;
  title?: string;
};

const statusClass: Record<Row['status'], string> = {
  queued: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  fail: 'bg-red-100 text-red-700',
};

export default function UploadHistoryTable({ rows = [] as Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="p-2">Vídeo</th>
            <th className="p-2">Canal</th>
            <th className="p-2">Status</th>
            <th className="p-2">Data</th>
            <th className="p-2">Vídeo ID</th>
            <th className="p-2">Título</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {(rows.length ? rows : [{ video: '-', channel: '-', status: 'queued', date: '-', videoId: '-', title: '-' }]).map((r, i) => (
            <tr key={i} className="odd:bg-gray-50">
              <td className="p-2">{r.video}</td>
              <td className="p-2">{r.channel}</td>
              <td className="p-2">
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass[r.status]}`}>{r.status}</span>
              </td>
              <td className="p-2">{r.date}</td>
              <td className="p-2">{r.videoId || '-'}</td>
              <td className="p-2">{r.title || '-'}</td>
              <td className="p-2 space-x-2">
                <button className="btn px-3 py-1 text-xs">Reprocessar</button>
                <button className="btn px-3 py-1 text-xs">Reupload</button>
                <button className="btn px-3 py-1 text-xs">Editar Metadata</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




