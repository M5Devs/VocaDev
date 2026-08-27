# @vocadev/zed-theme

VocaDev Miku Dark theme extension for Zed Editor.

## 🎵 Overview

`@vocadev/zed-theme` brings the signature Hatsune Miku color palette to Zed Editor:
- **Background**: `#0F0F23` (Dark Navy)
- **Primary / Accent**: `#39C5BB` (Miku Cyan)
- **Secondary**: `#86CECB` (Light Cyan)
- **Success / Function**: `#39FF14` (Neon Green)
- **Error**: `#EF4444`
- **Warning**: `#F59E0B`
- **Info**: `#3B82F6`

## 💻 Installation

### Option 1: Development Extension

1. Clone or open the VocaDev monorepo.
2. Build or test the package:
   ```bash
   pnpm --filter @vocadev/zed-theme zed:package
   ```
3. Open Zed Editor, open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`), and run **`zed: install dev extension`**.
4. Select the `packages/themes/zed` directory.

### Option 2: Local Themes Directory

Copy `themes/miku.json` to your Zed themes directory:

- Linux / macOS: `~/.config/zed/themes/miku.json`
- Windows: `%LOCALAPPDATA%\Zed\themes\miku.json`

Then select **VocaDev Miku Dark** in your Zed theme settings.

## 📄 License

GPL-3.0
