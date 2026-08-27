import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';
import { getCharacter } from '../utils/themes.js';
import { ensureDir, writeTextFile } from '../utils/files.js';
import type { ApplyOptions } from '../types.js';

export function detectProjectType(cwd = process.cwd()): string {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return 'Vanilla JS / HTML';
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    if (deps.react || deps['next']) return 'React';
    if (deps.vue || deps.nuxt) return 'Vue';
    if (deps.svelte) return 'Svelte';
    if (deps['@angular/core']) return 'Angular';
  } catch {
    // ignore
  }

  return 'Vanilla';
}

export function applyCommand(characterArg = 'miku', options: ApplyOptions = {}, cwd = process.cwd()): void {
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

  const projectType = detectProjectType(cwd);
  const outDir = path.resolve(cwd, options.output || './vocadev');
  ensureDir(outDir);

  const colors = char.palette.colors;
  const generateAll = !options.tailwind && !options.css && !options.scss;

  console.log(`\n🎨 ${chalk.bold(`Applying ${char.name} Colors to ${projectType} Project`)}`);
  console.log(chalk.dim(`Target Directory: ${outDir}\n`));

  // Tailwind preset
  if (generateAll || options.tailwind) {
    const tailwindPreset = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        vocadev: {
          primary: '${colors.primary}',
          secondary: '${colors.secondary}',
          accent: '${colors.accent}',
          dark: '${colors.dark}',
          background: '${colors.background}',
          foreground: '${colors.foreground}',
        },
      },
    },
  },
};
`;
    const presetPath = path.join(outDir, 'vocadev-preset.js');
    writeTextFile(presetPath, tailwindPreset);
    console.log(chalk.green(`  ✓ Created Tailwind preset: ${path.relative(cwd, presetPath)}`));
  }

  // CSS Variables
  if (generateAll || options.css) {
    const cssVars = `:root {
  --vocadev-primary: ${colors.primary};
  --vocadev-secondary: ${colors.secondary};
  --vocadev-accent: ${colors.accent};
  --vocadev-dark: ${colors.dark};
  --vocadev-background: ${colors.background};
  --vocadev-foreground: ${colors.foreground};
}
`;
    const cssPath = path.join(outDir, 'vocadev-colors.css');
    writeTextFile(cssPath, cssVars);
    console.log(chalk.green(`  ✓ Created CSS variables: ${path.relative(cwd, cssPath)}`));
  }

  // SCSS Variables
  if (generateAll || options.scss) {
    const scssVars = `$vocadev-primary: ${colors.primary};
$vocadev-secondary: ${colors.secondary};
$vocadev-accent: ${colors.accent};
$vocadev-dark: ${colors.dark};
$vocadev-background: ${colors.background};
$vocadev-foreground: ${colors.foreground};
`;
    const scssPath = path.join(outDir, 'vocadev-colors.scss');
    writeTextFile(scssPath, scssVars);
    console.log(chalk.green(`  ✓ Created SCSS variables: ${path.relative(cwd, scssPath)}`));
  }

  // Show import instructions
  console.log(`\n💡 ${chalk.bold('Import Instructions:')}`);
  if (generateAll || options.tailwind) {
    console.log(chalk.cyan(`  Tailwind: Add presets: [require('${path.relative(cwd, path.join(outDir, 'vocadev-preset.js'))}')] in tailwind.config.js`));
  }
  if (generateAll || options.css) {
    console.log(chalk.cyan(`  CSS: Add @import '${path.relative(cwd, path.join(outDir, 'vocadev-colors.css'))}'; to main CSS file`));
  }
  if (generateAll || options.scss) {
    console.log(chalk.cyan(`  SCSS: Add @use '${path.relative(cwd, path.join(outDir, 'vocadev-colors.scss'))}'; to main SCSS file`));
  }
  console.log('');
}
