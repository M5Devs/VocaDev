import chalk from 'chalk';
import ora from 'ora';
import { detectEditors } from '../utils/editors.js';
import { THEME_REGISTRY } from '../utils/themes.js';
import { installCommand } from './install.js';
import type { EditorType } from '../types.js';

export async function updateCommand(customHome?: string): Promise<void> {
  console.log(`\n🔄 ${chalk.bold('Checking for VocaDev Theme Updates...')}\n`);

  const spinner = ora('Checking installed themes...').start();
  const installedEditors: { editor: EditorType; character: string }[] = [];

  for (const characterId of Object.keys(THEME_REGISTRY)) {
    const editors = detectEditors(characterId, customHome);
    for (const ed of editors) {
      if (ed.themeInstalled) {
        installedEditors.push({ editor: ed.type, character: characterId });
      }
    }
  }

  if (installedEditors.length === 0) {
    spinner.info(chalk.yellow('No installed VocaDev themes found. Run `vocadev install <character>` to install themes.'));
    return;
  }

  spinner.succeed(chalk.green(`Found ${installedEditors.length} theme installation(s).`));

  for (const item of installedEditors) {
    const reg = THEME_REGISTRY[item.character];
    const version = reg ? reg.version : '0.1.0';
    console.log(`\n📦 Updating ${chalk.bold(reg.name)} for ${item.editor} (v${version})...`);
    await installCommand(item.character, { [item.editor]: true, confirm: true, force: true }, customHome);
  }

  console.log(`\n📋 ${chalk.bold('Changelog Summary (v0.1.0):')}`);
  console.log(chalk.cyan('  - Hatsune Miku Dark Theme initial release across VS Code, JetBrains, Neovim, and Zed'));
  console.log(chalk.cyan('  - Added palette customization, Tailwind presets, and CLI doctor diagnostics'));
  console.log(`\n✨ ${chalk.green('All themes are up to date!')}\n`);
}
