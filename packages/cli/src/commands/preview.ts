import chalk from 'chalk';
import { getCharacter } from '../utils/themes.js';
import { renderPalettePreview } from '../utils/colors.js';

export function previewCommand(characterArg = 'miku'): void {
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

  console.log('\n' + renderPalettePreview(char.palette));
}
