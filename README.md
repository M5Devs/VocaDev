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

## 📦 Project Structure

```
vocadev/
├── packages/
│   ├── core/                  # Color definitions & exported formats (TS, JSON, CSS)
│   │   └── palettes/
│   │       ├── miku.ts
│   │       └── index.ts
│   ├── themes/
│   │   └── vscode/            # VS Code Miku Dark Theme package
│   │       ├── themes/
│   │       │   └── miku-color-theme.json
│   │       ├── package.json
│   │       └── README.md
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

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 22.0.0
- [pnpm](https://pnpm.io/) >= 10.0.0

### Local Development Setup

1. **Clone repository:**
   ```bash
   git clone https://github.com/vocadev/vocadev.git
   cd vocadev
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

## 🛠️ VS Code Extension Packaging

To package the VS Code theme extension locally:

```bash
pnpm --filter vocadev-vscode-theme build
```

This will produce a `.vsix` file ready for local installation in VS Code (`code --install-extension vocadev-vscode-theme-0.1.0.vsix`).

---

## 🤝 Contributing

Contributions are very welcome! Please follow these guidelines:

1. **Conventional Commits**: Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (e.g., `feat: add Teto palette`, `fix: adjust status bar contrast`).
2. **Pull Requests**: Submit PRs against the `main` branch. Ensure `pnpm lint` and `pnpm test` pass before creating a PR.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
