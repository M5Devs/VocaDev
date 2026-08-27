import * as path from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { getCharacter } from '../utils/themes.js';
import { getEditorThemeTarget, isThemeInstalled } from '../utils/editors.js';
import { removeDirOrFile, cleanEmptyDirs } from '../utils/files.js';
import type { InstallOptions, EditorType } from '../types.js';

export function uninstallCommand(characterArg = 'miku', options: InstallOptions = {}, customHome?: string): void {
  const char = getCharacter(characterArg);

  if (!char) {
    console.error(chalk.red(`\n❌ Error: Character '${characterArg}' not found.`));
    console.log(chalk.yellow(`Available characters: miku`));
    return;
  }

  let targetEditors: EditorType[] = [];
  if (options.vscode) targetEditors.push('vscode');
  if (options.jetbrains) targetEditors.push('jetbrains');
  if (options.neovim) targetEditors.push('neovim');
  if (options.zed) targetEditors.push('zed');

  if (targetEditors.length === 0 || options.all) {
    targetEditors = ['vscode', 'jetbrains', 'neovim', 'zed'];
  }

  console.log(`\n🗑️  ${chalk.bold(`Uninstalling ${char.name} Theme`)} from ${targetEditors.join(', ')}...\n`);

  for (const editor of targetEditors) {
    const spinner = ora(`Uninstalling from ${editor}...`).start();

    if (!isThemeInstalled(editor, char.id, customHome)) {
      spinner.info(chalk.dim(`Theme not installed for ${editor}`));
      continue;
    }

    const { targetPath } = getEditorThemeTarget(editor, char.id, customHome);
    const parentDir = path.dirname(targetPath);

    removeDirOrFile(targetPath);
    cleanEmptyDirs(parentDir);

    spinner.succeed(chalk.green(`Removed ${char.name} theme from ${editor}`));
  }

  console.log(`\n✨ ${chalk.green('Uninstall complete!')}\n`);
}
