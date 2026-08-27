import * as fs from 'node:fs';
import * as path from 'node:path';

export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function removeDirOrFile(targetPath: string): void {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

export function cleanEmptyDirs(dirPath: string): void {
  if (!fs.existsSync(dirPath)) return;
  const stat = fs.statSync(dirPath);
  if (!stat.isDirectory()) return;

  let files = fs.readdirSync(dirPath);
  if (files.length > 0) {
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      cleanEmptyDirs(fullPath);
    }
    files = fs.readdirSync(dirPath);
  }

  if (files.length === 0) {
    try {
      fs.rmdirSync(dirPath);
    } catch {
      // ignore
    }
  }
}

export async function downloadFile(
  url: string,
  destPath: string,
  fallbackUrl?: string,
  fallbackContent?: string
): Promise<boolean> {
  ensureDir(path.dirname(destPath));

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      return true;
    }
  } catch {
    // try fallbackUrl if provided
  }

  if (fallbackUrl) {
    try {
      const res = await fetch(fallbackUrl, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(destPath, buffer);
        return true;
      }
    } catch {
      // ignore
    }
  }

  if (fallbackContent !== undefined) {
    fs.writeFileSync(destPath, fallbackContent, 'utf-8');
    return true;
  }

  return false;
}

export function writeJsonFile(filepath: string, data: unknown): void {
  ensureDir(path.dirname(filepath));
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

export function writeTextFile(filepath: string, content: string): void {
  ensureDir(path.dirname(filepath));
  fs.writeFileSync(filepath, content, 'utf-8');
}
