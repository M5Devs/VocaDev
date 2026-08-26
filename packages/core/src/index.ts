import { mikuPalette } from './palettes/index.js';
import type { CharacterPalette } from './palettes/miku.js';

export * from './palettes/index.js';

export function toCssVariables(palette: CharacterPalette): string {
  return `:root {
  --vocadev-primary: ${palette.colors.primary};
  --vocadev-secondary: ${palette.colors.secondary};
  --vocadev-accent: ${palette.colors.accent};
  --vocadev-dark: ${palette.colors.dark};
  --vocadev-background: ${palette.colors.background};
  --vocadev-foreground: ${palette.colors.foreground};
  --vocadev-dark-darker: ${palette.colors.darkVariants.darker};
  --vocadev-dark-lighter: ${palette.colors.darkVariants.lighter};
  --vocadev-dark-selection: ${palette.colors.darkVariants.selection};
  --vocadev-syntax-keyword: ${palette.colors.syntax.keyword};
  --vocadev-syntax-string: ${palette.colors.syntax.string};
  --vocadev-syntax-comment: ${palette.colors.syntax.comment};
  --vocadev-syntax-function: ${palette.colors.syntax.function};
  --vocadev-syntax-variable: ${palette.colors.syntax.variable};
  --vocadev-syntax-constant: ${palette.colors.syntax.constant};
  --vocadev-syntax-type: ${palette.colors.syntax.type};
}
`;
}

export function toJson(palette: CharacterPalette): string {
  return JSON.stringify(palette, null, 2);
}

export { mikuPalette };
