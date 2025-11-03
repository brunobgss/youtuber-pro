import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);
const PYTHON_PATH = process.env.PYTHON_PATH || 'python';
const PYTHON_DIR = path.join(process.cwd(), 'python');

export async function runPythonScript(
  scriptName: string,
  args: Record<string, string | boolean | number>
): Promise<{ stdout: string; stderr: string }> {
  const argsString = Object.entries(args)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? `--${key}` : '';
      }
      return `--${key} "${String(value).replace(/"/g, '\\"')}"`;
    })
    .filter(s => s.trim())
    .join(' ');

  const command = `${PYTHON_PATH} ${path.join(PYTHON_DIR, scriptName)} ${argsString}`;
  
  try {
    const { stdout, stderr } = await execAsync(command);
    return { stdout, stderr };
  } catch (error: any) {
    throw new Error(`Erro ao executar script Python: ${error.message}`);
  }
}

export async function runShellScript(
  scriptPath: string,
  args: string[]
): Promise<{ stdout: string; stderr: string }> {
  // Detecta Windows vs Linux/Mac
  const isWindows = process.platform === 'win32';
  const ext = isWindows ? '.bat' : '.sh';
  const scriptName = scriptPath.endsWith('.sh') || scriptPath.endsWith('.bat') 
    ? scriptPath 
    : scriptPath + ext;
  
  const scriptFullPath = path.join(PYTHON_DIR, scriptName);
  const command = isWindows 
    ? `"${scriptFullPath}" ${args.map(a => `"${a}"`).join(' ')}`
    : `bash "${scriptFullPath}" ${args.map(a => `"${a}"`).join(' ')}`;
  
  try {
    const { stdout, stderr } = await execAsync(command);
    return { stdout, stderr };
  } catch (error: any) {
    throw new Error(`Erro ao executar script: ${error.message}`);
  }
}
