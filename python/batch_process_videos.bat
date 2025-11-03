@echo off
REM Script Windows para processar vídeos com ffmpeg

set INPUT_FILE=%~1
set OUTPUT_FILE=%~2
set THUMBNAIL_FILE=%~3
set WATERMARK_PATH=%~4
set APPLY_TTS=%~5

REM Criar diretórios se não existirem
if not exist "%~dp2" mkdir "%~dp2"
if not exist "%~dp3" mkdir "%~dp3"

REM Preparar filtros ffmpeg
set FILTERS=scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=black

if not "%WATERMARK_PATH%"=="" (
    set WM_INPUT=-i "%WATERMARK_PATH%"
    set FILTERS=%FILTERS%,overlay=10:10
) else (
    set WM_INPUT=
)

REM Processar vídeo (remove áudio original)
ffmpeg -y -i "%INPUT_FILE%" %WM_INPUT% -filter_complex "%FILTERS%" -an -c:v libx264 -preset veryfast -crf 23 "%OUTPUT_FILE%"

REM Gerar thumbnail no segundo 1
ffmpeg -y -i "%OUTPUT_FILE%" -ss 00:00:01 -vframes 1 "%THUMBNAIL_FILE%"

REM Retornar JSON (para Node.js consumir)
echo {"output_path": "%OUTPUT_FILE%", "thumbnail_path": "%THUMBNAIL_FILE%"}

