import { defineConfig } from 'tsup';
import { mikuPalette, toCssVariables, toJson } from './src/index';
import * as fs from 'node:fs';
import * as path from 'node:path';

export default defineConfig({
  entry: ['src/index.ts', 'src/palettes/index.ts', 'src/palettes/miku.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  async onSuccess() {
    const distDir = path.resolve(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distDir, 'miku.json'), toJson(mikuPalette));
    fs.writeFileSync(path.join(distDir, 'miku.css'), toCssVariables(mikuPalette));
  },
});
