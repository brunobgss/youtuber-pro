import argparse
import os


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--text', required=True)
    parser.add_argument('--output', required=True, help='Arquivo de saída .wav ou .mp3')
    parser.add_argument('--model', default='tts_models/pt/cv/vits', help='Modelo Coqui TTS (ex: tts_models/pt/cv/vits)')
    parser.add_argument('--speaker', default=None)
    args = parser.parse_args()

    # Lazy import para iniciar rápido
    from TTS.api import TTS

    tts = TTS(args.model)
    # Gera WAV (Coqui salva wav por padrão). Se usuário passou .mp3, salvamos wav e deixamos conversão externa para ffmpeg
    out_path = args.output
    os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)

    if args.speaker:
        tts.tts_to_file(text=args.text, file_path=out_path, speaker=args.speaker)
    else:
        tts.tts_to_file(text=args.text, file_path=out_path)

    print(f"[OK] Áudio salvo em {out_path}")


if __name__ == '__main__':
    main()

