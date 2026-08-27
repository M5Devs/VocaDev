# @vocadev/cli

> VocaDev CLI toolkit for installing, previewing, and applying Vocaloid developer themes across text editors and project configurations.

## Installation

```bash
npm install -g @vocadev/cli
# or
pnpm add -g @vocadev/cli
```

## Usage

```bash
vocadev --help
```

### Commands

- `vocadev install <character>` - Install theme files into detected code editors (VS Code, JetBrains IDEs, Neovim, Zed)
- `vocadev uninstall <character>` - Uninstall theme files from code editors
- `vocadev list` - View available character palettes and editor installation status
- `vocadev preview <character>` - View color palette hex codes, color blocks, and syntax highlighting preview in terminal
- `vocadev apply <character>` - Generate Tailwind CSS presets, CSS variables, or SCSS variables for projects
- `vocadev update` - Check and update installed themes to the latest versions
- `vocadev doctor` - Run system diagnostics for installed editors and themes
