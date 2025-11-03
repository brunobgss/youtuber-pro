import argparse
import torch
from diffusers import StableDiffusionPipeline


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--prompt', required=True, help="Prompt para a IA gerar thumbnail")
    parser.add_argument('--output', required=True, help="Caminho de saída da thumbnail gerada (jpg)")
    parser.add_argument('--width', type=int, default=720)
    parser.add_argument('--height', type=int, default=405)
    parser.add_argument('--model', default='CompVis/stable-diffusion-v1-4')
    args = parser.parse_args()

    device = "cuda" if torch.cuda.is_available() else "cpu"
    pipe = StableDiffusionPipeline.from_pretrained(
        args.model,
        torch_dtype=torch.float16 if device == "cuda" else torch.float32
    )
    pipe = pipe.to(device)

    prompt = args.prompt
    print(f"[INFO] Gerando imagem com o prompt: {prompt}")
    image = pipe(prompt, width=args.width, height=args.height, num_inference_steps=30).images[0]
    image.save(args.output, quality=92)
    print(f"[OK] Thumbnail salva em {args.output}")

if __name__ == '__main__':
    main()

