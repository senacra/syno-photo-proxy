import asyncio
import hashlib
import json
import os
from pathlib import Path
import tempfile
import threading


class ImageCache:
    def __init__(self, directory: str, max_size_bytes: int, max_entry_bytes: int = 2 * 1024 * 1024):
        self.directory = Path(directory)
        self.max_size_bytes = max_size_bytes
        self.max_entry_bytes = min(max_entry_bytes, max_size_bytes)
        self._locks: dict[str, asyncio.Lock] = {}
        self._prune_lock = threading.Lock()

    def _paths(self, key: str) -> tuple[Path, Path]:
        filename = hashlib.sha256(key.encode("utf-8")).hexdigest()
        return self.directory / f"{filename}.bin", self.directory / f"{filename}.json"

    async def lock_for(self, key: str) -> asyncio.Lock:
        return self._locks.setdefault(key, asyncio.Lock())

    async def get(self, key: str) -> tuple[Path, str] | None:
        return await asyncio.to_thread(self._get, key)

    def _get(self, key: str) -> tuple[Path, str] | None:
        content_path, metadata_path = self._paths(key)
        try:
            metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
            content_type = metadata.get("content_type")
            if not content_path.is_file() or not isinstance(content_type, str) or not content_type.lower().startswith("image/"):
                return None
            os.utime(content_path, None)
            os.utime(metadata_path, None)
            return content_path, content_type
        except (OSError, ValueError, KeyError, TypeError):
            return None

    async def store(self, key: str, content: bytearray, content_type: str) -> None:
        if not content or len(content) > self.max_entry_bytes or not content_type.lower().startswith("image/"):
            return
        await asyncio.to_thread(self._store, key, bytes(content), content_type)

    def _store(self, key: str, content: bytes, content_type: str) -> None:
        self.directory.mkdir(mode=0o700, parents=True, exist_ok=True)
        os.chmod(self.directory, 0o700)
        content_path, metadata_path = self._paths(key)
        temporary_paths = []
        try:
            for destination, data in (
                (metadata_path, json.dumps({"content_type": content_type}).encode("utf-8")),
                (content_path, content),
            ):
                with tempfile.NamedTemporaryFile(dir=self.directory, delete=False) as temporary:
                    temporary_paths.append(Path(temporary.name))
                    os.chmod(temporary.name, 0o600)
                    temporary.write(data)
                os.replace(temporary.name, destination)
            with self._prune_lock:
                self._prune()
        finally:
            for temporary_path in temporary_paths:
                temporary_path.unlink(missing_ok=True)

    def _prune(self) -> None:
        entries = []
        total_size = 0
        for content_path in self.directory.glob("*.bin"):
            try:
                stat = content_path.stat()
            except OSError:
                continue
            total_size += stat.st_size
            entries.append((stat.st_mtime_ns, stat.st_size, content_path))

        for _, size, content_path in sorted(entries):
            if total_size <= self.max_size_bytes:
                break
            metadata_path = content_path.with_suffix(".json")
            content_path.unlink(missing_ok=True)
            metadata_path.unlink(missing_ok=True)
            total_size -= size
