export type ChannelStatus = 'pending' | 'authorized' | 'done' | 'needs_reauth' | 'quota_exceeded';

export interface ChannelRow {
  id: string;
  name: string | null;
  email: string | null;
  status: ChannelStatus | null;
  token: Record<string, unknown> | null;
  last_uploaded_video_id: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface VideoRow {
  id: string;
  filename: string | null;
  hash: string | null;
  source: 'folder' | 'generate' | null;
  processed: boolean | null;
  processed_at: string | null;
  output_path: string | null;
  used_by_channel: string | null;
  title: string | null;
  description: string | null;
  tags: string[] | null;
  created_at: string;
}

export type UploadStatus = 'queued' | 'processing' | 'success' | 'fail';

export interface UploadRow {
  id: string;
  channel_id: string;
  video_id: string | null; // YouTube videoId after upload
  status: UploadStatus | null;
  error: string | null;
  attempts: number | null;
  created_at: string;
  finished_at: string | null;
}




