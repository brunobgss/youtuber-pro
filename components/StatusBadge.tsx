type Props = { status: 'authorized' | 'pending' | 'needs_reauth' | 'quota_exceeded' | 'banido' | 'ativo' | 'ativo_com_video' | string };

export default function StatusBadge({ status }: Props) {
  const map: Record<string, { bg: string; text: string; border: string; label: string }> = {
    authorized: { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-500/30', label: 'Authorized' },
    pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-500/30', label: 'Pending' },
    needs_reauth: { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-500/30', label: 'Needs Reauth' },
    quota_exceeded: { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/30', label: 'Quota Exceeded' },
    banido: { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-500/30', label: 'Banido' },
    ativo: { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-500/30', label: 'Ativo' },
    ativo_com_video: { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/30', label: 'Ativo com Vídeo' },
  };
  const c = map[status] || { bg: 'bg-gray-700/50', text: 'text-gray-400', border: 'border-gray-600/50', label: status };
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}>{c.label}</span>
  );
}




