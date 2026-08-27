import * as path from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { getCharacter, getDownloadUrl } from '../utils/themes.js';
import { detectEditors, getEditorThemeTarget, isThemeInstalled } from '../utils/editors.js';
import { downloadFile, ensureDir, writeTextFile } from '../utils/files.js';
import type { InstallOptions, EditorType } from '../types.js';

export async function installCommand(characterArg = 'miku', options: InstallOptions = {}, customHome?: string): Promise<void> {
  const char = getCharacter(characterArg);

  if (!char) {
    console.error(chalk.red(`\n❌ Error: Character '${characterArg}' not found.`));
    console.log(chalk.yellow(`Available characters: miku`));
    return;
  }

  if (char.status === 'coming_soon' || !char.palette) {
    console.log(chalk.yellow(`\n${char.emoji} Character '${char.name}' is coming soon!`));
    return;
  }

  let targetEditors: EditorType[] = [];
  if (options.vscode) targetEditors.push('vscode');
  if (options.jetbrains) targetEditors.push('jetbrains');
  if (options.neovim) targetEditors.push('neovim');
  if (options.zed) targetEditors.push('zed');

  if (targetEditors.length === 0 || options.all) {
    const detected = detectEditors(char.id, customHome);
    const installedList = detected.filter((e) => e.installed).map((e) => e.type);
    targetEditors = installedList.length > 0 ? installedList : ['vscode', 'jetbrains', 'neovim', 'zed'];
  }

  console.log(`\n🎵 ${chalk.bold(`Installing ${char.name} Theme`)} for ${targetEditors.join(', ')}...\n`);

  for (const editor of targetEditors) {
    const spinner = ora(`Installing for ${editor}...`).start();

    const exists = isThemeInstalled(editor, char.id, customHome);
    if (exists && !options.force && !options.confirm) {
      spinner.stop();
      if (process.env.NODE_ENV !== 'test' && process.stdout.isTTY) {
        try {
          const ans = await inquirer.prompt<{ overwrite: boolean }>([
            {
              type: 'confirm',
              name: 'overwrite',
              message: `Theme for ${editor} already exists. Overwrite?`,
              default: true,
            },
          ]);
          if (!ans.overwrite) {
            console.log(chalk.dim(`Skipping ${editor}`));
            continue;
          }
        } catch {
          // default to overwrite if prompt fails
        }
      }
      spinner.start(`Installing for ${editor}...`);
    }

    const downloadInfo = getDownloadUrl(char.id, editor);
    const { targetPath, isDirectory } = getEditorThemeTarget(editor, char.id, customHome);

    ensureDir(isDirectory ? targetPath : path.dirname(targetPath));

    let fallbackContent = '';
    if (char.palette) {
      if (editor === 'zed') {
        fallbackContent = JSON.stringify({
          $schema: 'https://zed.dev/schema/themes/v0.1.0.json',
          name: `VocaDev ${char.name}`,
          author: 'VocaDev',
          themes: [{ name: `VocaDev ${char.name} Dark`, appearance: 'dark', style: { colors: char.palette.colors } }],
        }, null, 2);
      } else if (editor === 'vscode') {
        fallbackContent = JSON.stringify({
          name: `VocaDev ${char.name} Dark`,
          colors: {
            'editor.background': char.palette.colors.background,
            'editor.foreground': char.palette.colors.foreground,
          },
        }, null, 2);
      } else if (editor === 'neovim') {
        fallbackContent = `" VocaDev ${char.name} Dark\nhighlight Normal guifg=${char.palette.colors.foreground} guibg=${char.palette.colors.background}\n`;
      } else if (editor === 'jetbrains') {
        fallbackContent = JSON.stringify({ name: `VocaDev ${char.name} Dark`, dark: true }, null, 2);
      }
    }

    const destFile = isDirectory ? path.join(targetPath, editor === 'vscode' ? 'package.json' : editor === 'jetbrains' ? 'theme.json' : 'theme.vim') : targetPath;

    let success = false;
    if (downloadInfo) {
      success = await downloadFile(downloadInfo.releaseUrl, destFile, downloadInfo.fallbackUrl, fallbackContent);
    } else {
      writeTextFile(destFile, fallbackContent);
      success = true;
    }

    if (success) {
      spinner.succeed(chalk.green(`Installed ${char.name} theme for ${editor}`));
    } else {
      spinner.fail(chalk.red(`Failed to download/install theme for ${editor}`));
    }
  }

  console.log(`\n✨ ${chalk.green('Installation process finished!')}\n`);
}
