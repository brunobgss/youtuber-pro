// Função auxiliar para calcular SHA256 (pode ser usado no servidor ou chamar Python)
export async function computeSHA256(file: File | Buffer): Promise<string> {
  if (typeof window !== 'undefined') {
    // Browser: usar Web Crypto API
    let arrayBuffer: ArrayBuffer;
    if (file instanceof File) {
      arrayBuffer = await file.arrayBuffer();
    } else {
      // Se for Buffer (Node.js), converter para ArrayBuffer
      const buffer = file as Buffer;
      // Criar um novo ArrayBuffer a partir dos dados do Buffer
      arrayBuffer = new Uint8Array(buffer).buffer;
    }
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } else {
    // Node: usar crypto nativo
    const crypto = require('crypto');
    const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }
}


