import { getSupabaseServer } from './supabaseClient';

export async function uploadFileToStorage(
  bucket: string,
  file: File | Buffer,
  path: string,
  contentType?: string
): Promise<{ path: string; error: null } | { path: null; error: string }> {
  try {
    const supabase = getSupabaseServer();
    const fileBuffer = file instanceof File ? await file.arrayBuffer() : file;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType: contentType || 'application/octet-stream',
        upsert: true
      });

    if (error) {
      return { path: null, error: error.message };
    }

    return { path: data.path, error: null };
  } catch (error: any) {
    return { path: null, error: error.message || 'Erro desconhecido' };
  }
}

export async function getFileUrl(bucket: string, path: string): Promise<string | null> {
  try {
    const supabase = getSupabaseServer();
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch {
    return null;
  }
}

export async function deleteFileFromStorage(bucket: string, path: string): Promise<boolean> {
  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase.storage.from(bucket).remove([path]);
    return !error;
  } catch {
    return false;
  }
}
