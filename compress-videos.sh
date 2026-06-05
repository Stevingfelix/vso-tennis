#!/usr/bin/env bash
# One-off: compress the gallery/showreel clips for low-bandwidth mobile.
# Caps the long edge to 1280px, H.264 + faststart, AAC 96k. Originals are in git history.
set -e
cd "$(dirname "$0")/assets/video"
mkdir -p _compressed
for f in vso-clip-0*.mp4; do
  echo "→ $f"
  ffmpeg -y -loglevel error -i "$f" \
    -vf "scale='min(1280,iw)':-2" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 27 -preset veryfast \
    -movflags +faststart \
    -c:a aac -b:a 96k \
    "_compressed/$f"
  before=$(du -h "$f" | cut -f1)
  after=$(du -h "_compressed/$f" | cut -f1)
  echo "   $before → $after"
done
echo "Replacing originals with compressed versions…"
for f in _compressed/vso-clip-0*.mp4; do mv "$f" "$(basename "$f")"; done
rmdir _compressed
echo "Done. New total:"; du -sh . | cut -f1
