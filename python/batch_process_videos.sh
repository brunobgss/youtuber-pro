#!/usr/bin/env bash
set -euo pipefail

INPUT_FILE="$1"          # path to input video
OUTPUT_FILE="$2"         # path to output mp4
THUMBNAIL_FILE="$3"      # path to thumbnail jpg
WATERMARK_PATH="${4:-}"
APPLY_TTS="${5:-false}"

mkdir -p "$(dirname "$OUTPUT_FILE")" "$(dirname "$THUMBNAIL_FILE")"

FILTERS="scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=black"

if [ -n "$WATERMARK_PATH" ]; then
  FILTERS="$FILTERS,overlay=10:10"
  WM_INPUT="-i $WATERMARK_PATH"
else
  WM_INPUT=""
fi

# Remove original audio
ffmpeg -y -i "$INPUT_FILE" $WM_INPUT -filter_complex "$FILTERS" -an -c:v libx264 -preset veryfast -crf 23 "$OUTPUT_FILE"

# Thumbnail at 00:00:01
ffmpeg -y -i "$OUTPUT_FILE" -ss 00:00:01 -vframes 1 "$THUMBNAIL_FILE"

echo "{\"output_path\": \"$OUTPUT_FILE\", \"thumbnail_path\": \"$THUMBNAIL_FILE\"}"




