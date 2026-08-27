import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('@vocadev/zed-theme structure and definitions', () => {
  const root = path.resolve(__dirname, '..');

  it('contains extension.toml and theme definition file', () => {
    expect(fs.existsSync(path.join(root, 'extension.toml'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'themes/miku.json'))).toBe(true);
  });

  it('validates extension.toml metadata', () => {
    const tomlContent = fs.readFileSync(path.join(root, 'extension.toml'), 'utf-8');
    expect(tomlContent).toContain('id = "vocadev-miku-dark"');
    expect(tomlContent).toContain('name = "VocaDev Miku Dark"');
  });

  it('validates miku.json schema, colors, UI, editor and terminal mappings', () => {
    const jsonString = fs.readFileSync(path.join(root, 'themes/miku.json'), 'utf-8');
    const themeJson = JSON.parse(jsonString);

    expect(themeJson.$schema).toBe('https://zed.dev/schema/themes/v0.2.0.json');
    expect(themeJson.name).toBe('VocaDev Miku Dark');
    expect(themeJson.themes).toHaveLength(1);

    const theme = themeJson.themes[0];
    expect(theme.name).toBe('VocaDev Miku Dark');
    expect(theme.appearance).toBe('dark');

    const style = theme.style;

    // Color mappings
    expect(style.background).toBe('#0F0F23');
    expect(style['editor.background']).toBe('#0F0F23');
    expect(style.text).toBe('#E0E0E0');
    expect(style.border).toBe('#2D2D44');

    // Editor & UI specs
    expect(style['editor.active_line.background']).toBe('#1A1A2E');
    expect(style['editor.line_number']).toBe('#6B7280');
    expect(style['toolbar.background']).toBe('#0F0F23');
    expect(style['status_bar.background']).toBe('#0F0F23');
    expect(style['tab.active_background']).toBe('#1A1A2E');
    expect(style['tab.inactive_background']).toBe('#0F0F23');
    expect(style['panel.background']).toBe('#1A1A2E');

    // Selection & Cursor
    expect(style.players[0].cursor).toBe('#39C5BB');
    expect(style.players[0].selection).toBe('#39C5BB4D');

    // Git
    expect(style.created).toBe('#39FF14');
    expect(style.deleted).toBe('#EF4444');
    expect(style.modified).toBe('#39C5BB');

    // Terminal
    expect(style['terminal.background']).toBe('#0F0F23');
    expect(style['terminal.foreground']).toBe('#E0E0E0');
    expect(style['terminal.ansi.green']).toBe('#39FF14');
    expect(style['terminal.ansi.cyan']).toBe('#39C5BB');
    expect(style['terminal.ansi.bright_cyan']).toBe('#86CECB');

    // Syntax
    expect(style.syntax.keyword.color).toBe('#FF007F');
    expect(style.syntax.string.color).toBe('#86CECB');
    expect(style.syntax.comment.color).toBe('#5C6370');
    expect(style.syntax.function.color).toBe('#39FF14');
    expect(style.syntax.type.color).toBe('#FFD700');
    expect(style.syntax.variable.color).toBe('#E0E0E0');
  });
});
