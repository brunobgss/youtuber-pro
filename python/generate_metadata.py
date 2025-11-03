import argparse
import json
import os

def llama_generate(prompt, model_path=None):
    try:
        from llama_cpp import Llama
        if model_path is None:
            model_path = os.environ.get("LLAMA_MODEL", "./models/llama-2-7b-chat.gguf")
        llm = Llama(model_path=model_path, n_threads=6)
        response = llm(prompt, max_tokens=256, stop=["\n"])
        txt = response["choices"][0]["text"].strip()
        return txt
    except Exception as e:
        print(f"[WARN] Falha na IA local: {e}. Usando geração simples.", flush=True)
        return None

def generate_title(theme: str) -> str:
    prompt = f"Você é um especialista em YouTube. Crie um título curto, impactante e chamativo para um vídeo sobre: {theme}"
    r = llama_generate(prompt)
    return r or f"{theme}: 7 Dicas Rápidas que Você Precisa Saber!"

def generate_description(theme: str) -> str:
    prompt = f"Escreva uma descrição completa (100 a 250 palavras) para um vídeo de YouTube sobre: {theme}.\nCapítulos: \n00:00 Introdução, 02:00 Dicas principais, 10:00 Conclusão.\nInclua call to action!"
    r = llama_generate(prompt)
    if r:
        return r
    return (
        f"Neste vídeo sobre {theme}, você vai aprender estratégias práticas, exemplos reais e atalhos para acelerar seus resultados.\n"
        f"Capítulos:\n"
        f"00:00 Introdução\n02:00 Conceitos-chave\n05:00 Exemplos práticos\n10:00 Conclusões\n\n"
        f"Inscreva-se e ative as notificações!"
    )

def generate_tags(theme: str):
    prompt = f"Sugira entre 5 e 10 tags de YouTube (palavras separadas por vírgula) para este tema: {theme}"
    r = llama_generate(prompt)
    if r:
        tags = [t.strip() for t in r.split(",") if t.strip()]
        if tags: return tags
    base = theme.lower().replace(' ', '-')
    return [theme, base, 'tutorial', 'guia', 'passo-a-passo', 'youtuber']

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--theme', required=True)
    parser.add_argument('--script_text')
    parser.add_argument('--model_path', required=False)
    args = parser.parse_args()

    title = generate_title(args.theme)
    description = generate_description(args.theme)
    tags = generate_tags(args.theme)

    print(json.dumps({
        'title': title,
        'description': description,
        'tags': tags
    }))

if __name__ == '__main__':
    main()



