import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { getCharacter, getAllCharacters, getDownloadUrl, THEME_REGISTRY } from '../src/utils/themes.js';
import { detectEditors, getEditorBasePaths, getEditorThemeTarget, isThemeInstalled } from '../src/utils/editors.js';
import { getAsciiHeader, renderPalettePreview, formatEditorBadge } from '../src/utils/colors.js';
import { ensureDir, removeDirOrFile, cleanEmptyDirs } from '../src/utils/files.js';
import { installCommand } from '../src/commands/install.js';
import { uninstallCommand } from '../src/commands/uninstall.js';
import { listCommand } from '../src/commands/list.js';
import { previewCommand } from '../src/commands/preview.js';
import { applyCommand, detectProjectType } from '../src/commands/apply.js';
import { updateCommand } from '../src/commands/update.js';
import { doctorCommand } from '../src/commands/doctor.js';
import { createProgram } from '../src/index.js';

describe('VocaDev CLI Suite', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vocadev-test-'));
  });

  afterEach(() => {
    removeDirOrFile(tempDir);
  });

  describe('Theme Registry & Characters', () => {
    it('should retrieve character by id or name', () => {
      const miku = getCharacter('miku');
      expect(miku).toBeDefined();
      expect(miku?.name).toBe('Hatsune Miku');
      expect(miku?.status).toBe('available');
      expect(miku?.palette).toBeDefined();

      const teto = getCharacter('teto');
      expect(teto?.status).toBe('coming_soon');

      const unknown = getCharacter('nonexistent');
      expect(unknown).toBeUndefined();
    });

    it('should list all characters', () => {
      const chars = getAllCharacters();
      expect(chars.length).toBeGreaterThanOrEqual(3);
      expect(chars.map((c) => c.id)).toContain('miku');
      expect(chars.map((c) => c.id)).toContain('teto');
      expect(chars.map((c) => c.id)).toContain('neru');
    });

    it('should return download URLs for valid character and editor', () => {
      const urls = getDownloadUrl('miku', 'vscode');
      expect(urls).toBeDefined();
      expect(urls?.releaseUrl).toContain('releases/download');
      expect(urls?.fallbackUrl).toContain('raw.githubusercontent.com');
    });
  });

  describe('Editor Detection', () => {
    it('should return editor paths for different operating systems', () => {
      const macPaths = getEditorBasePaths(tempDir, 'darwin');
      expect(macPaths.vscode).toBe(path.join(tempDir, '.vscode'));
      expect(macPaths.jetbrains).toBe(path.join(tempDir, 'Library', 'Application Support', 'JetBrains'));

      const linuxPaths = getEditorBasePaths(tempDir, 'linux');
      expect(linuxPaths.jetbrains).toBe(path.join(tempDir, '.config', 'JetBrains'));

      const winPaths = getEditorBasePaths(tempDir, 'win32');
      expect(winPaths.vscode).toBe(path.join(tempDir, '.vscode'));
    });

    it('should detect editor installation status correctly', () => {
      const editorsBefore = detectEditors('miku', tempDir, 'linux');
      expect(editorsBefore.every((e) => !e.installed)).toBe(true);

      // Simulate VS Code and Zed presence
      ensureDir(path.join(tempDir, '.vscode'));
      ensureDir(path.join(tempDir, '.config', 'zed'));

      const editorsAfter = detectEditors('miku', tempDir, 'linux');
      const vscode = editorsAfter.find((e) => e.type === 'vscode');
      const zed = editorsAfter.find((e) => e.type === 'zed');
      const nvim = editorsAfter.find((e) => e.type === 'neovim');

      expect(vscode?.installed).toBe(true);
      expect(zed?.installed).toBe(true);
      expect(nvim?.installed).toBe(false);
    });
  });

  describe('Color Formatting & Previews', () => {
    it('should generate ASCII art header', () => {
      const header = getAsciiHeader();
      expect(header).toContain('Vocaloid Developer Customization Toolkit');
    });

    it('should format editor badges', () => {
      const installedBadge = formatEditorBadge('vscode', true);
      const uninstalledBadge = formatEditorBadge('vscode', false);
      expect(installedBadge).toContain('vscode✓');
      expect(uninstalledBadge).toContain('vscode✗');
    });

    it('should render palette preview and code sample', () => {
      const char = getCharacter('miku');
      expect(char?.palette).toBeDefined();
      if (char?.palette) {
        const preview = renderPalettePreview(char.palette);
        expect(preview).toContain('Hatsune Miku Palette');
        expect(preview).toContain('#39C5BB');
        expect(preview).toContain('Syntax Highlighting Preview:');
      }
    });
  });

  describe('Commands Execution', () => {
    it('should handle list command without errors', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      listCommand(tempDir);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle preview command for valid and invalid character', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      previewCommand('miku');
      expect(logSpy).toHaveBeenCalled();

      previewCommand('invalid_char');
      expect(errSpy).toHaveBeenCalled();

      logSpy.mockRestore();
      errSpy.mockRestore();
    });

    it('should install and uninstall theme files correctly', async () => {
      // Simulate VS Code and Neovim editor directories
      ensureDir(path.join(tempDir, '.vscode'));
      ensureDir(path.join(tempDir, '.config', 'nvim'));

      // Install miku theme
      await installCommand('miku', { vscode: true, neovim: true, force: true }, tempDir);

      const vsCodeTarget = getEditorThemeTarget('vscode', 'miku', tempDir, 'linux');
      const nvimTarget = getEditorThemeTarget('neovim', 'miku', tempDir, 'linux');

      expect(fs.existsSync(vsCodeTarget.targetPath)).toBe(true);
      expect(fs.existsSync(nvimTarget.targetPath)).toBe(true);

      // Verify installed status
      expect(isThemeInstalled('vscode', 'miku', tempDir, 'linux')).toBe(true);

      // Uninstall miku theme
      uninstallCommand('miku', { vscode: true, neovim: true }, tempDir);

      expect(fs.existsSync(vsCodeTarget.targetPath)).toBe(false);
      expect(fs.existsSync(nvimTarget.targetPath)).toBe(false);
      expect(isThemeInstalled('vscode', 'miku', tempDir, 'linux')).toBe(false);
    });

    it('should apply project configuration files (tailwind, css, scss)', () => {
      const outDir = path.join(tempDir, 'vocadev');

      applyCommand('miku', { output: outDir }, tempDir);

      const presetPath = path.join(outDir, 'vocadev-preset.js');
      const cssPath = path.join(outDir, 'vocadev-colors.css');
      const scssPath = path.join(outDir, 'vocadev-colors.scss');

      expect(fs.existsSync(presetPath)).toBe(true);
      expect(fs.existsSync(cssPath)).toBe(true);
      expect(fs.existsSync(scssPath)).toBe(true);

      const cssContent = fs.readFileSync(cssPath, 'utf-8');
      expect(cssContent).toContain('--vocadev-primary: #39C5BB');

      const presetContent = fs.readFileSync(presetPath, 'utf-8');
      expect(presetContent).toContain("primary: '#39C5BB'");
    });

    it('should run doctor diagnostics', () => {
      const results = doctorCommand(tempDir);
      expect(results.length).toBeGreaterThan(0);
      const editorCheck = results.find((r) => r.category === 'Editors');
      expect(editorCheck).toBeDefined();
    });

    it('should update installed themes', async () => {
      ensureDir(path.join(tempDir, '.vscode'));
      await installCommand('miku', { vscode: true, force: true }, tempDir);

      await updateCommand(tempDir);
      expect(isThemeInstalled('vscode', 'miku', tempDir, 'linux')).toBe(true);
    });

    it('should construct Commander CLI program and parse arguments', async () => {
      const program = createProgram();
      expect(program.name()).toBe('vocadev');
      const commands = program.commands.map((c) => c.name());
      expect(commands).toContain('install');
      expect(commands).toContain('uninstall');
      expect(commands).toContain('list');
      expect(commands).toContain('preview');
      expect(commands).toContain('apply');
      expect(commands).toContain('update');
      expect(commands).toContain('doctor');
    });
  });
});
