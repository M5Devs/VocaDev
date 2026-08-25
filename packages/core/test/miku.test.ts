import { describe, it, expect } from 'vitest';
import { mikuPalette, toCssVariables, toJson } from '../src/index';

describe('mikuPalette', () => {
  it('should contain correct Hatsune Miku colors', () => {
    expect(mikuPalette.name).toBe('Hatsune Miku');
    expect(mikuPalette.colors.primary).toBe('#39C5BB');
    expect(mikuPalette.colors.secondary).toBe('#86CECB');
    expect(mikuPalette.colors.accent).toBe('#39FF14');
    expect(mikuPalette.colors.dark).toBe('#1A1A2E');
    expect(mikuPalette.colors.background).toBe('#0F0F23');
    expect(mikuPalette.colors.foreground).toBe('#E0E0E0');
  });

  it('should generate valid CSS variables', () => {
    const css = toCssVariables(mikuPalette);
    expect(css).toContain('--vocadev-primary: #39C5BB');
    expect(css).toContain('--vocadev-accent: #39FF14');
    expect(css).toContain('--vocadev-background: #0F0F23');
  });

  it('should generate valid JSON format', () => {
    const jsonStr = toJson(mikuPalette);
    const parsed = JSON.parse(jsonStr);
    expect(parsed.id).toBe('miku');
    expect(parsed.colors.primary).toBe('#39C5BB');
  });
});
