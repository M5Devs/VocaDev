import { mikuPalette } from '@vocadev/core/palettes/miku';
import type { CharacterInfo, ThemeRegistryEntry, EditorType } from '../types.js';

export const THEME_REGISTRY: Record<string, ThemeRegistryEntry> = {
  miku: {
    id: 'miku',
    name: 'Hatsune Miku',
    version: '0.1.0',
    releases: {
      vscode: 'https://github.com/vocadev/vocadev/releases/download/v0.1.0/vocadev-vscode-theme-0.1.0.vsix',
      jetbrains: 'https://github.com/vocadev/vocadev/releases/download/v0.1.0/vocadev-jetbrains-theme-0.1.0.zip',
      neovim: 'https://github.com/vocadev/vocadev/releases/download/v0.1.0/vocadev-neovim-theme-0.1.0.tar.gz',
      zed: 'https://github.com/vocadev/vocadev/releases/download/v0.1.0/miku.json',
    },
    rawFallback: {
      vscode: 'https://raw.githubusercontent.com/vocadev/vocadev/main/packages/themes/vscode/themes/miku-color-theme.json',
      jetbrains: 'https://raw.githubusercontent.com/vocadev/vocadev/main/packages/themes/jetbrains/src/main/resources/miku.theme.json',
      neovim: 'https://raw.githubusercontent.com/vocadev/vocadev/main/packages/themes/neovim/colors/vocadev-miku.vim',
      zed: 'https://raw.githubusercontent.com/vocadev/vocadev/main/packages/themes/zed/themes/miku.json',
    },
  },
};

export const CHARACTERS: CharacterInfo[] = [
  {
    id: 'miku',
    name: 'Hatsune Miku',
    emoji: '💙',
    status: 'available',
    palette: mikuPalette,
  },
  {
    id: 'teto',
    name: 'Kasane Teto',
    emoji: '🧡',
    status: 'coming_soon',
  },
  {
    id: 'neru',
    name: 'Akita Neru',
    emoji: '💛',
    status: 'coming_soon',
  },
];

export function getCharacter(id: string): CharacterInfo | undefined {
  return CHARACTERS.find((c) => c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase() === id.toLowerCase());
}

export function getAllCharacters(): CharacterInfo[] {
  return CHARACTERS;
}

export function getDownloadUrl(characterId: string, editor: EditorType): { releaseUrl: string; fallbackUrl: string } | undefined {
  const entry = THEME_REGISTRY[characterId.toLowerCase()];
  if (!entry) return undefined;
  return {
    releaseUrl: entry.releases[editor],
    fallbackUrl: entry.rawFallback[editor],
  };
}
