<div align="center">
  <!-- Logo Placeholder -->
  <h1>🎵 VocaDev 🎵</h1>
  <p><strong>A developer customization toolkit for Vocaloid characters.</strong></p>
</div>

---

## 🌟 Overview

**VocaDev** is an open-source monorepo containing developer tools, color palettes, and themes tailored around iconic Vocaloid characters.

The initial release focuses on **Hatsune Miku (初音ミク)**, bringing her vibrant signature cyan (`#39C5BB`), neon green accents (`#39FF14`), and deep navy background (`#0F0F23`) directly into your code editor and developer tools.

Designed with extensibility in mind for future characters (e.g., Kasane Teto, Akita Neru).

---

## 📦 Supported Editors & Packages

| Editor / Tool | Package | Status |
| --- | --- | --- |
| **CLI Toolkit** | `@M5Devs/vocadev-cli` | Supported |
| **VS Code** | `vocadev-vscode-theme` (`@M5Devs/vocadev-vscode-theme`) | Supported |
| **JetBrains IDEs** (IntelliJ, PyCharm, WebStorm, Android Studio) | `@M5Devs/vocadev-jetbrains-theme` | Supported |
| **Neovim** | `@M5Devs/vocadev-neovim-theme` | Supported |
| **Zed** | `@M5Devs/vocadev-zed-theme` | Supported |
| **Core Palette** | `@M5Devs/vocadev-core` | Supported |

---

## 📦 Installation from GitHub Packages

```bash
npm install @M5Devs/vocadev-core --registry=https://npm.pkg.github.com
# or
echo "@M5Devs:registry=https://npm.pkg.github.com" >> .npmrc
npm install @M5Devs/vocadev-core
```

---

## 📦 Project Structure

```
vocadev/
├── packages/
│   ├── cli/                   # VocaDev CLI toolkit (commands: install, list, preview, apply, doctor, update)
│   ├── core/                  # Color definitions & exported formats (TS, JSON, CSS)
│   │   └── palettes/
│   │       ├── miku.ts
│   │       └── index.ts
│   ├── themes/
│   │   ├── vscode/            # VS Code Miku Dark Theme package
│   │   ├── jetbrains/         # JetBrains IDEs Miku Dark Theme plugin
│   │   ├── neovim/            # Neovim Lua Miku Dark Theme package
│   │   └── zed/               # Zed Miku Dark Theme package
│   └── ui/                    # UI components (Placeholder for Phase 3)
├── turbo.json
├── package.json
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── publish.yml
└── README.md
```

---

## 🛠️ VocaDev CLI (`@M5Devs/vocadev-cli`)

Install the VocaDev CLI globally or use it via pnpm / npx:

```bash
npm install -g @M5Devs/vocadev-cli
# or run directly
pnpm dlx @M5Devs/vocadev-cli --help
```

### CLI Commands & Usage

```bash
# List all characters and installation status
vocadev list

# Terminal color preview & syntax highlighting preview
vocadev preview miku

# Install theme files to detected code editors
vocadev install miku
vocadev install miku --vscode --jetbrains

# Uninstall theme files from code editors
vocadev uninstall miku --all

# Generate Tailwind CSS preset, CSS variables, or SCSS variables for projects
vocadev apply miku --tailwind --css --scss -o ./vocadev

# Run health diagnostics on installed editors and themes
vocadev doctor

# Check for and update installed themes to latest version
vocadev update
```

---

### Zed Editor

To install the Zed extension locally:

```bash
pnpm --filter @M5Devs/vocadev-zed-theme zed:package
```

1. Open Zed Editor.
2. Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and search for **`zed: install dev extension`**.
3. Select the `packages/themes/zed` directory.

Alternatively, copy `packages/themes/zed/themes/miku.json` to your Zed themes directory (`~/.config/zed/themes/miku.json`).

---

## 🎨 Color Palette (Miku)

| Token | Color Code | Description |
| --- | --- | --- |
| **Primary** | `#39C5BB` | Miku Cyan |
| **Secondary** | `#86CECB` | Light Cyan |
| **Accent** | `#39FF14` | Neon Green |
| **Dark** | `#1A1A2E` | Deep Navy |
| **Background** | `#0F0F23` | Dark Background |
| **Foreground** | `#E0E0E0` | Light Text |

---

## 📸 Preview / Screenshots

<!-- Screenshot Placeholder -->
> *VS Code Theme Preview: Miku Dark Theme with custom syntax highlighting and terminal styling.*

<!-- JetBrains Screenshot Placeholder -->
> *JetBrains IDEs Preview: VocaDev Miku Dark plugin on IntelliJ IDEA / PyCharm / WebStorm.*

<!-- Neovim Screenshot Placeholder -->
> *Neovim Preview: VocaDev Miku Dark colorscheme with Treesitter and LSP diagnostics.*

---

## 💻 Editor Installation Instructions

### VS Code

To package and install the VS Code theme extension locally:

```bash
pnpm --filter vocadev-vscode-theme build
```

Install the resulting `.vsix` file: `code --install-extension vocadev-vscode-theme-0.1.0.vsix`.

---

### JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, Android Studio)

Build the plugin zip package locally:

```bash
pnpm --filter @M5Devs/vocadev-jetbrains-theme build
# or: pnpm jetbrains:gradle-build
```

1. Open **Settings / Preferences** in your JetBrains IDE.
2. Navigate to **Plugins**, click the gear icon ⚙️, and select **Install Plugin from Disk...**.
3. Select `packages/themes/jetbrains/build/distributions/vocadev-jetbrains-theme-0.1.0.zip`.
4. Restart the IDE.

---

### Neovim

Add to your plugin manager:

#### lazy.nvim
```lua
{
  "M5Devs/VocaDev",
  config = function()
    require("vocadev.themes.miku").setup()
    vim.cmd.colorscheme("vocadev-miku")
  end,
}
```

#### packer.nvim
```lua
use {
  "M5Devs/VocaDev",
  config = function()
    require("vocadev.themes.miku").setup()
    vim.cmd([[colorscheme vocadev-miku]])
  end
}
```

#### vim-plug
```vim
Plug 'M5Devs/VocaDev'

colorscheme vocadev-miku
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 22.0.0
- [pnpm](https://pnpm.io/) >= 10.0.0
- Java JDK >= 17 & Gradle (for building JetBrains plugin)

### Local Development Setup

1. **Clone repository:**
   ```bash
   git clone https://github.com/M5Devs/VocaDev.git
   cd VocaDev
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run build across all packages:**
   ```bash
   pnpm build
   ```

4. **Run tests across all packages:**
   ```bash
   pnpm test
   ```

5. **Start development mode:**
   ```bash
   pnpm dev
   ```

---

## 🤝 Contributing

Contributions are very welcome! Please follow these guidelines:

1. **Conventional Commits**: Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (e.g., `feat: add Teto palette`, `fix: adjust status bar contrast`).
2. **Pull Requests**: Submit PRs against the `main` branch. Ensure `pnpm lint` and `pnpm test` pass before creating a PR.

---

## 📄 License

This project is open-source and available under the [GPL-v3 License](LICENSE).
