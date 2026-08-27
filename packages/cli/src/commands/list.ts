import chalk from 'chalk';
import { getAllCharacters } from '../utils/themes.js';
import { isThemeInstalled } from '../utils/editors.js';
import { formatEditorBadge } from '../utils/colors.js';
import type { EditorType } from '../types.js';

export function listCommand(customHome?: string): void {
  const characters = getAllCharacters();
  const editorTypes: EditorType[] = ['vscode', 'jetbrains', 'neovim', 'zed'];

  console.log(`\n🎵 ${chalk.bold('VocaDev Characters & Theme Installation Status')}\n`);

  for (const char of characters) {
    const emoji = char.emoji;
    const namePadded = char.id.padEnd(8, ' ');

    if (char.status === 'coming_soon') {
      console.log(`${emoji} ${chalk.bold(namePadded)} ${chalk.yellow('[coming soon]')}`);
      continue;
    }

    const badges = editorTypes
      .map((ed) => formatEditorBadge(ed, isThemeInstalled(ed, char.id, customHome)))
      .join(' ');

    const colorBlock = char.palette
      ? chalk.hex(char.palette.colors.primary)('██') + chalk.hex(char.palette.colors.accent)('██')
      : '';

    console.log(`${emoji} ${chalk.bold(namePadded)} ${badges}  ${colorBlock}`);
  }

  console.log('');
}
