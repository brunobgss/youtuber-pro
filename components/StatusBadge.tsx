type Props = { status: 'authorized' | 'pending' | 'needs_reauth' | 'quota_exceeded' | string };

export default function StatusBadge({ status }: Props) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    authorized: { bg: 'bg-green-100', text: 'text-green-700', label: 'Authorized' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
    needs_reauth: { bg: 'bg-red-100', text: 'text-red-700', label: 'Needs Reauth' },
    quota_exceeded: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Quota Exceeded' },
  };
  const c = map[status] || { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${c.bg} ${c.text}`}>{c.label}</span>
  );
}




