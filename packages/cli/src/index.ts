import { Command } from 'commander';
import chalk from 'chalk';
import { getAsciiHeader } from './utils/colors.js';
import { installCommand } from './commands/install.js';
import { uninstallCommand } from './commands/uninstall.js';
import { listCommand } from './commands/list.js';
import { previewCommand } from './commands/preview.js';
import { applyCommand } from './commands/apply.js';
import { updateCommand } from './commands/update.js';
import { doctorCommand } from './commands/doctor.js';

export function createProgram(): Command {
  const program = new Command();

  program
    .name('vocadev')
    .description('🎵 VocaDev CLI toolkit for Vocaloid developer themes')
    .version('0.1.0')
    .addHelpText('before', getAsciiHeader());

  program
    .command('install [character]')
    .description('Install character theme to code editors (default: miku)')
    .option('-v, --vscode', 'Install VS Code theme only')
    .option('-j, --jetbrains', 'Install JetBrains theme only')
    .option('-n, --neovim', 'Install Neovim theme only')
    .option('-z, --zed', 'Install Zed theme only')
    .option('-a, --all', 'Install all themes (default)')
    .action(async (character = 'miku', options) => {
      try {
        await installCommand(character, options);
      } catch (err) {
        console.error(chalk.red(`\n❌ Failed to install theme: ${(err as Error).message}`));
        console.log(chalk.yellow('💡 Suggestion: Check network connection or run `vocadev doctor` to diagnose issues.'));
      }
    });

  program
    .command('uninstall [character]')
    .description('Remove character theme from code editors (default: miku)')
    .option('-v, --vscode', 'Remove VS Code theme only')
    .option('-j, --jetbrains', 'Remove JetBrains theme only')
    .option('-n, --neovim', 'Remove Neovim theme only')
    .option('-z, --zed', 'Remove Zed theme only')
    .option('-a, --all', 'Remove all themes (default)')
    .action((character = 'miku', options) => {
      try {
        uninstallCommand(character, options);
      } catch (err) {
        console.error(chalk.red(`\n❌ Failed to uninstall theme: ${(err as Error).message}`));
      }
    });

  program
    .command('list')
    .description('List all characters and editor theme installation status')
    .action(() => {
      listCommand();
    });

  program
    .command('preview [character]')
    .description('Preview character color palette and simulated syntax highlighting (default: miku)')
    .action((character = 'miku') => {
      previewCommand(character);
    });

  program
    .command('apply [character]')
    .description('Generate Tailwind CSS preset, CSS variables, or SCSS variables for projects')
    .option('--tailwind', 'Generate Tailwind CSS preset file')
    .option('--css', 'Generate CSS variables file')
    .option('--scss', 'Generate SCSS variables file')
    .option('-o, --output <directory>', 'Output directory', './vocadev')
    .action((character = 'miku', options) => {
      try {
        applyCommand(character, options);
      } catch (err) {
        console.error(chalk.red(`\n❌ Failed to generate configuration: ${(err as Error).message}`));
      }
    });

  program
    .command('update')
    .description('Check for and install updates for all installed VocaDev themes')
    .action(async () => {
      try {
        await updateCommand();
      } catch (err) {
        console.error(chalk.red(`\n❌ Failed to update themes: ${(err as Error).message}`));
      }
    });

  program
    .command('doctor')
    .description('Check editor installations and theme health diagnostics')
    .action(() => {
      try {
        doctorCommand();
      } catch (err) {
        console.error(chalk.red(`\n❌ Doctor check failed: ${(err as Error).message}`));
      }
    });

  return program;
}

export async function run(args: string[] = process.argv): Promise<void> {
  const program = createProgram();
  await program.parseAsync(args);
}

if (process.env.NODE_ENV !== 'test' && import.meta.url === `file://${process.argv[1]}`) {
  run();
}
