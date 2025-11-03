#!/usr/bin/env python3
"""
Script para testar se todas as dependências Python estão instaladas corretamente.
Execute: python test_installation.py
"""

import sys

errors = []
warnings = []

def test_import(module, package=None):
    try:
        __import__(module)
        print(f"✅ {package or module}")
        return True
    except ImportError as e:
        errors.append(f"❌ {package or module}: {e}")
        return False

print("=" * 60)
print("TESTE DE INSTALAÇÃO - DEPENDÊNCIAS PYTHON")
print("=" * 60)
print()

# Dependências básicas
print("📦 Dependências Básicas:")
test_import("numpy", "numpy")
test_import("PIL", "Pillow")
test_import("gtts", "gTTS")
test_import("moviepy", "moviepy")
print()

# Google APIs
print("📦 Google APIs:")
test_import("googleapiclient", "google-api-python-client")
test_import("google_auth_oauthlib", "google-auth-oauthlib")
print()

# IA Local - Texto
print("📦 IA Local - Texto (llama.cpp):")
if test_import("llama_cpp", "llama-cpp-python"):
    print("  ℹ️  Configure LLAMA_MODEL no .env.local para usar")
else:
    warnings.append("llama-cpp-python não instalado (opcional para IA texto)")
print()

# IA Local - Imagem
print("📦 IA Local - Imagem (Stable Diffusion):")
if test_import("torch", "torch"):
    import torch
    cuda_ok = torch.cuda.is_available()
    if cuda_ok:
        print(f"  ✅ CUDA disponível: {torch.cuda.get_device_name(0)}")
    else:
        warnings.append("CUDA não disponível - usar CPU é mais lento")
    
    if test_import("transformers", "transformers"):
        if test_import("diffusers", "diffusers"):
            print("  ℹ️  Configure SD_MODEL no .env.local para usar")
else:
    warnings.append("torch não instalado (opcional para IA imagem)")
print()

# IA Local - Voz
print("📦 IA Local - Voz (Coqui TTS):")
if test_import("TTS", "TTS (Coqui)"):
    print("  ℹ️  Opcional: use para TTS 100% offline")
else:
    warnings.append("Coqui TTS não instalado (opcional)")
print()

# Resultado final
print("=" * 60)
if errors:
    print("❌ ERROS ENCONTRADOS:")
    for e in errors:
        print(f"  {e}")
    print()
    print("💡 Execute: pip install -r python/requirements.txt")
else:
    print("✅ Todas as dependências principais instaladas!")

if warnings:
    print()
    print("⚠️  AVISOS (opcionais):")
    for w in warnings:
        print(f"  {w}")

print("=" * 60)

