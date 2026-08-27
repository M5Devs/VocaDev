import chalk from 'chalk';
import type { CharacterPalette } from '@vocadev/core/palettes';
import type { EditorType } from '../types.js';

export function getAsciiHeader(): string {
  const c1 = chalk.hex('#39C5BB');
  const c2 = chalk.hex('#86CECB');
  const c3 = chalk.hex('#39FF14');

  return `
${c1('  ██╗   ██╗██████╗  ██████╗ █████╗ ██████╗ ██')}
${c1('  ██║   ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██║')}
${c2('  ██║   ██║██║  ██║██║     ███████║██║  ██║██║')}
${c2('  ╚██╗ ██╔╝██║  ██║██║     ██╔══██║██║  ██║╚═╝')}
${c3('   ╚████╔╝ ██████╔╝╚██████╗██║  ██║██████╔╝██╗')}
${c3('    ╚═══╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═════╝ ╚═╝')}
${chalk.bold.cyan('  🎵 Vocaloid Developer Customization Toolkit 🎵')}
`;
}

export function formatEditorBadge(editor: EditorType, installed: boolean): string {
  if (installed) {
    return chalk.green(`[${editor}✓]`);
  }
  return chalk.dim(`[${editor}✗]`);
}

export function renderPalettePreview(palette: CharacterPalette): string {
  const { colors, name } = palette;

  const colorBlock = (hex: string) => chalk.hex(hex)('████████');

  const rows = [
    { label: 'Primary', hex: colors.primary, name: 'Cyan' },
    { label: 'Secondary', hex: colors.secondary, name: 'Light Cyan' },
    { label: 'Accent', hex: colors.accent, name: 'Neon Green' },
    { label: 'Background', hex: colors.background, name: 'Deep Navy' },
    { label: 'Foreground', hex: colors.foreground, name: 'Light Gray' },
  ];

  let output = `🎨 ${chalk.bold(name)} Palette\n\n`;

  for (const row of rows) {
    const labelPadded = row.label.padEnd(11, ' ');
    const hexPadded = row.hex.padEnd(8, ' ');
    output += `${chalk.bold(labelPadded)} ${hexPadded}  ${colorBlock(row.hex)}  ${chalk.dim(row.name)}\n`;
  }

  output += `\n💻 ${chalk.bold('Syntax Highlighting Preview:')}\n\n`;

  const kw = chalk.hex(colors.syntax.keyword);
  const fn = chalk.hex(colors.syntax.function);
  const str = chalk.hex(colors.syntax.string);
  const cm = chalk.hex(colors.syntax.comment);
  const typ = chalk.hex(colors.syntax.type);
  const vr = chalk.hex(colors.syntax.variable);
  const num = chalk.hex(colors.syntax.constant);

  output += `${cm('// VocaDev Syntax Preview')}\n`;
  output += `${kw('import')} { ${vr('Vocaloid')} } ${kw('from')} ${str("'@vocadev/core'")};\n\n`;
  output += `${kw('async function')} ${fn('sing')}(${vr('song')}: ${typ('string')}, ${vr('tempo')}: ${typ('number')} = ${num('120')}): ${typ('Promise')}<${typ('void')}> {\n`;
  output += `  ${kw('const')} ${vr('status')} = ${str('`Singing ${song} at ${tempo} BPM`')};\n`;
  output += `  ${fn('console')}.${fn('log')}(${vr('status')});\n`;
  output += `}\n`;

  return output;
}
