import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('@vocadev/neovim-theme structure', () => {
  it('contains lua modules and vim entry file', () => {
    const root = path.resolve(__dirname, '..');
    expect(fs.existsSync(path.join(root, 'lua/vocadev/themes/miku.lua'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'lua/vocadev/themes/init.lua'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'colors/vocadev-miku.vim'))).toBe(true);
  });

  it('validates lua colorscheme palette values', () => {
    const mikuLua = fs.readFileSync(
      path.resolve(__dirname, '../lua/vocadev/themes/miku.lua'),
      'utf-8'
    );
    expect(mikuLua).toContain('bg = "#0F0F23"');
    expect(mikuLua).toContain('fg = "#E0E0E0"');
    expect(mikuLua).toContain('primary = "#39C5BB"');
    expect(mikuLua).toContain('accent = "#39FF14"');
  });

  it('validates integrations in lua file', () => {
    const mikuLua = fs.readFileSync(
      path.resolve(__dirname, '../lua/vocadev/themes/miku.lua'),
      'utf-8'
    );
    expect(mikuLua).toContain('TelescopeBorder');
    expect(mikuLua).toContain('NvimTreeRootFolder');
    expect(mikuLua).toContain('BufferLineBackground');
    expect(mikuLua).toContain('WhichKey');
    expect(mikuLua).toContain('GitSignsAdd');
    expect(mikuLua).toContain('DiagnosticError');
  });
});
