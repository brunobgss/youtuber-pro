# 📥 Como Instalar FFmpeg no Windows - Passo a Passo Detalhado

## Método 1: Download Manual (Recomendado)

### Passo 1: Baixar o FFmpeg

1. **Abra seu navegador** (Chrome, Edge, Firefox, etc.)
2. Acesse este link: https://www.gyan.dev/ffmpeg/builds/
3. Você verá várias opções. **Clique em:**
   - **ffmpeg-release-essentials.zip** (é a primeira opção verde)

### Passo 2: Extrair o arquivo

1. Após o download terminar, **vá até sua pasta de Downloads**
2. Você verá o arquivo: `ffmpeg-release-essentials.zip`
3. **Clique com o botão direito** → **Extrair tudo...**
4. Escolha onde extrair (sugestão: `C:\ffmpeg`)
5. Clique em **Extrair**

### Passo 3: Adicionar ao PATH (Muito Importante!)

O PATH é uma lista de pastas que o Windows procura quando você digita um comando.

#### Passo 3.1: Abrir Variáveis de Ambiente

1. Pressione `Windows + R` (tecla Windows + letra R)
2. Digite: `sysdm.cpl`
3. Pressione **Enter**
4. Uma janela vai abrir: **Propriedades do Sistema**

#### Passo 3.2: Acessar Variáveis de Ambiente

1. Na janela aberta, clique na aba **Avançado**
2. Clique no botão **Variáveis de Ambiente** (no canto inferior direito)

#### Passo 3.3: Editar a variável PATH

1. Na seção **Variáveis do sistema** (metade de baixo)
2. Procure por uma variável chamada **Path** (ou **PATH**)
3. **Clique nela** para selecionar
4. Clique no botão **Editar...**

#### Passo 3.4: Adicionar pasta do FFmpeg

1. Na nova janela que abriu, clique em **Novo**
2. Digite o caminho onde você extraiu o FFmpeg:
   - Se extraiu em `C:\ffmpeg`, digite: `C:\ffmpeg\bin`
   - Se extraiu em outro lugar, digite: `[pasta_onde_extraiu]\bin`
3. Clique em **OK**

#### Passo 3.5: Confirmar tudo

1. Clique em **OK** na janela de edição do PATH
2. Clique em **OK** na janela de Variáveis de Ambiente
3. Clique em **OK** na janela de Propriedades do Sistema

### Passo 4: Fechar e reabrir o terminal

⚠️ **MUITO IMPORTANTE:** O PATH só funciona em terminais **NOVOS**

1. **Feche TODOS os terminais** (PowerShell, CMD, etc.)
2. **Abra um novo terminal** (PowerShell)
3. Navegue até seu projeto:
   ```powershell
   cd D:\PROJETOS\youtuber
   ```

### Passo 5: Testar se funcionou

Execute este comando:

```powershell
ffmpeg -version
```

#### ✅ Se aparecer algo assim, funcionou!
```
ffmpeg version 2024-...
Copyright (c) 2000-2024...
...
```

#### ❌ Se aparecer erro "ffmpeg não é reconhecido"

**Solução:**
1. Verifique se adicionou `\bin` no final do caminho (não só `C:\ffmpeg`, mas `C:\ffmpeg\bin`)
2. Feche **TODOS** os terminais e abra um novo
3. Se ainda não funcionar, tente reiniciar o computador

---

## Método Alternativo: Chocolatey (Se tiver instalado)

Se você tem o Chocolatey instalado, pode usar:

```powershell
choco install ffmpeg
```

Mas **NÃO se preocupe** se não tiver - o método manual funciona perfeitamente!

---

## 💡 Dica Extra

Se você não souber onde extraiu o FFmpeg:

1. Abra o **Explorador de Arquivos** (pasta amarela na barra de tarefas)
2. Digite na barra de endereço: `C:\` e pressione Enter
3. Procure por uma pasta chamada `ffmpeg`
4. Entre nela → Entre na pasta `bin`
5. Se vir arquivos `ffmpeg.exe`, `ffprobe.exe`, etc., você está no lugar certo!
6. Copie o caminho completo da pasta `bin` (barra de endereço no topo)
7. Use esse caminho quando adicionar ao PATH

---

## ❓ Ainda com dúvidas?

Avise qual passo você está travado que eu te ajudo! 🚀

