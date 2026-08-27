import type { CharacterPalette } from '@M5Devs/vocadev-core/palettes';

export type EditorType = 'vscode' | 'jetbrains' | 'neovim' | 'zed';

export type CharacterStatus = 'available' | 'coming_soon';

export interface EditorInfo {
  type: EditorType;
  name: string;
  installed: boolean;
  path: string | null;
  themeInstalled?: boolean;
}

export type CharacterColors = CharacterPalette['colors'];

export interface CharacterInfo {
  id: string;
  name: string;
  emoji: string;
  status: CharacterStatus;
  palette?: CharacterPalette;
}

export interface ThemeRegistryEntry {
  id: string;
  name: string;
  version: string;
  releases: Record<EditorType, string>;
  rawFallback: Record<EditorType, string>;
}

export interface InstallOptions {
  vscode?: boolean;
  jetbrains?: boolean;
  neovim?: boolean;
  zed?: boolean;
  all?: boolean;
  confirm?: boolean;
  force?: boolean;
}

export interface ApplyOptions {
  tailwind?: boolean;
  css?: boolean;
  scss?: boolean;
  output?: string;
}

export interface DoctorCheckResult {
  category: string;
  check: string;
  status: 'ok' | 'warning' | 'error';
  message: string;
  fix?: string;
}

export interface UpdateInfo {
  character: string;
  editor: EditorType;
  version: string;
  status: 'updated' | 'already_up_to_date' | 'not_installed';
}
