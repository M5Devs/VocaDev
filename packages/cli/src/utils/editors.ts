import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import type { EditorType, EditorInfo } from '../types.js';

export function getHomeDir(customHome?: string): string {
  return customHome || os.homedir();
}

export function getEditorBasePaths(customHome?: string, platform = process.platform): Record<EditorType, string> {
  const home = getHomeDir(customHome);

  let vscodePath = path.join(home, '.vscode');
  let jetbrainsPath = path.join(home, '.config', 'JetBrains');
  let nvimPath = path.join(home, '.config', 'nvim');
  let zedPath = path.join(home, '.config', 'zed');

  if (platform === 'darwin') {
    jetbrainsPath = path.join(home, 'Library', 'Application Support', 'JetBrains');
  } else if (platform === 'win32') {
    const appData = process.env.APPDATA || path.join(home, 'AppData', 'Roaming');
    const localAppData = process.env.LOCALAPPDATA || path.join(home, 'AppData', 'Local');
    jetbrainsPath = path.join(appData, 'JetBrains');
    nvimPath = path.join(localAppData, 'nvim');
    zedPath = path.join(localAppData, 'zed');
  }

  return {
    vscode: vscodePath,
    jetbrains: jetbrainsPath,
    neovim: nvimPath,
    zed: zedPath,
  };
}

export function getEditorThemeTarget(editor: EditorType, characterId: string, customHome?: string, platform = process.platform): { targetPath: string; isDirectory: boolean } {
  const basePaths = getEditorBasePaths(customHome, platform);
  const home = getHomeDir(customHome);

  switch (editor) {
    case 'vscode':
      return {
        targetPath: path.join(home, '.vscode', 'extensions', `vocadev.vocadev-${characterId}-theme-0.1.0`),
        isDirectory: true,
      };
    case 'jetbrains':
      return {
        targetPath: path.join(basePaths.jetbrains, 'plugins', `vocadev-${characterId}-theme`),
        isDirectory: true,
      };
    case 'neovim':
      return {
        targetPath: path.join(basePaths.neovim, 'pack', 'vocadev', 'start', `vocadev-${characterId}`),
        isDirectory: true,
      };
    case 'zed':
      return {
        targetPath: path.join(basePaths.zed, 'themes', `${characterId}.json`),
        isDirectory: false,
      };
  }
}

export function isThemeInstalled(editor: EditorType, characterId: string, customHome?: string, platform = process.platform): boolean {
  const { targetPath } = getEditorThemeTarget(editor, characterId, customHome, platform);
  return fs.existsSync(targetPath);
}

export function detectEditors(characterId = 'miku', customHome?: string, platform = process.platform): EditorInfo[] {
  const basePaths = getEditorBasePaths(customHome, platform);

  const editors: { type: EditorType; name: string }[] = [
    { type: 'vscode', name: 'VS Code' },
    { type: 'jetbrains', name: 'JetBrains IDEs' },
    { type: 'neovim', name: 'Neovim' },
    { type: 'zed', name: 'Zed' },
  ];

  return editors.map(({ type, name }) => {
    const basePath = basePaths[type];
    const installed = fs.existsSync(basePath);
    const themeInstalled = isThemeInstalled(type, characterId, customHome, platform);

    return {
      type,
      name,
      installed,
      path: installed ? basePath : null,
      themeInstalled,
    };
  });
}
