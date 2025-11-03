import argparse
import json
import os
import tempfile
from gtts import gTTS
from moviepy.editor import AudioFileClip, ImageClip, concatenate_videoclips
from PIL import Image, ImageDraw, ImageFont
from util import compute_sha256


def text_to_speech(text: str, lang: str, out_path: str):
    tts = gTTS(text=text, lang=lang)
    tts.save(out_path)


def create_slide(text: str, size=(1280, 720)) -> str:
    img = Image.new('RGB', size, color=(20, 20, 20))
    draw = ImageDraw.Draw(img)
    font = ImageFont.load_default()
    w, h = draw.textsize(text, font=font)
    draw.text(((size[0]-w)//2, (size[1]-h)//2), text, font=font, fill=(240, 240, 240))
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
    img.save(tmp.name, format='JPEG', quality=90)
    return tmp.name


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--script_text', required=True)
    parser.add_argument('--lang', default='pt')
    parser.add_argument('--watermark_path')
    parser.add_argument('--output', required=True)
    parser.add_argument('--thumbnail', required=True)
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    os.makedirs(os.path.dirname(args.thumbnail), exist_ok=True)

    # TTS
    tts_path = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3').name
    text_to_speech(args.script_text, args.lang, tts_path)

    # Slides (simple one-slide stub)
    slide_path = create_slide(args.script_text[:120] + ('...' if len(args.script_text) > 120 else ''))
    clip = ImageClip(slide_path).set_duration(10)
    clip = clip.set_audio(AudioFileClip(tts_path).volumex(1.0))

    # Export
    clip.write_videofile(args.output, fps=24, codec='libx264', audio_codec='aac')

    # Thumbnail
    Image.open(slide_path).save(args.thumbnail, format='JPEG', quality=90)

    sha256 = compute_sha256(args.output)
    print(json.dumps({
        'output_path': args.output,
        'thumbnail_path': args.thumbnail,
        'sha256': sha256
    }))


if __name__ == '__main__':
    main()




