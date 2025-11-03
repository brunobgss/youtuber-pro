import hashlib
import os
import time
from contextlib import contextmanager


def compute_sha256(file_path: str) -> str:
    sha256 = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            sha256.update(chunk)
    return sha256.hexdigest()


@contextmanager
def acquire_lock(lock_name: str, timeout_seconds: int = 60):
    path = f"/tmp/{lock_name}.lock"
    start = time.time()
    while os.path.exists(path):
        if time.time() - start > timeout_seconds:
            raise TimeoutError("Could not acquire lock in time")
        time.sleep(0.1)
    try:
        open(path, 'w').close()
        yield
    finally:
        if os.path.exists(path):
            os.remove(path)


def db_connect():
    # Placeholder: connect via Supabase REST/RPC from Node side ideally.
    # In production, prefer passing data back to Node for DB updates.
    return None


def mark_video_used(video_id: str, channel_id: str):
    # Placeholder for DB update
    print(f"[stub] mark video {video_id} used by channel {channel_id}")


def list_available_videos():
    # Placeholder for DB query
    return []




