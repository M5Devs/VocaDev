import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('@M5Devs/vocadev-jetbrains-theme structure', () => {
  it('contains theme definition and metadata files', () => {
    const root = path.resolve(__dirname, '..');
    expect(fs.existsSync(path.join(root, 'resources/themes/Miku_Dark.theme.json'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'Miku_Dark.xml'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'src/main/resources/META-INF/plugin.xml'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'build.gradle.kts'))).toBe(true);
  });

  it('validates plugin metadata', () => {
    const pluginXml = fs.readFileSync(
      path.resolve(__dirname, '../src/main/resources/META-INF/plugin.xml'),
      'utf-8'
    );
    expect(pluginXml).toContain('<id>dev.voca.jetbrains.miku</id>');
    expect(pluginXml).toContain('<name>VocaDev Miku Dark</name>');
  });

  it('validates theme colors in theme JSON', () => {
    const themeJsonRaw = fs.readFileSync(
      path.resolve(__dirname, '../resources/themes/Miku_Dark.theme.json'),
      'utf-8'
    );
    const themeJson = JSON.parse(themeJsonRaw);
    expect(themeJson.colors.Primary).toBe('#39C5BB');
    expect(themeJson.colors.Background).toBe('#0F0F23');
    expect(themeJson.colors.Foreground).toBe('#E0E0E0');
  });
});
