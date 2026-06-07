#!/usr/bin/env bash
# Compress the gallery/showreel clips for low-bandwidth mobile.
# Uses macOS's built-in avconvert (no install needed) with the Cellular preset —
# H.264 + AAC, web fast-start, optimized for mobile data. Originals are in git history.
# The source clips are 360p, so this is mostly a bitrate reduction (~70% smaller).
set -e
cd "$(dirname "$0")/assets/video"
mkdir -p _compressed
for f in vso-clip-0*.mp4; do
  n="${f%.mp4}"
  before=$(du -h "$f" | cut -f1)
  # avconvert needs an .m4v/.mov output extension; the container is MP4-compatible.
  avconvert -s "$f" -p PresetAppleM4VCellular -o "_compressed/$n.m4v" --replace >/dev/null 2>&1
  mv "_compressed/$n.m4v" "_compressed/$f"
  after=$(du -h "_compressed/$f" | cut -f1)
  echo "  $f: $before -> $after"
done
echo "Replacing originals with compressed versions…"
for f in _compressed/vso-clip-0*.mp4; do mv "$f" "$(basename "$f")"; done
rmdir _compressed
echo "Done. New total:"; du -sh . | cut -f1
