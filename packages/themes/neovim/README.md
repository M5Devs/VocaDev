# @M5Devs/vocadev-neovim-theme

Pure Lua Miku Dark colorscheme for Neovim inspired by Hatsune Miku (初音ミク).

## Palette Highlights
- **Background**: `#0F0F23`
- **Foreground**: `#E0E0E0`
- **Keyword**: `#39C5BB` (Miku Cyan)
- **String**: `#86CECB` (Light Cyan)
- **Function**: `#39FF14` (Neon Green)
- **Comment**: `#6B7280` (Gray)
- **Error**: `#EF4444` (Red)
- **Warning**: `#F59E0B` (Orange)
- **Info**: `#3B82F6` (Blue)
- **Hint**: `#39C5BB` (Cyan)

## Features & Plugin Integration
Supports Treesitter, LSP diagnostics, GitSigns, Telescope, NvimTree, Lualine, Bufferline, and Which-Key out of the box.

## Installation

### lazy.nvim
```lua
{
  "M5Devs/VocaDev",
  config = function()
    require("vocadev.themes.miku").setup({ transparent = false })
    vim.cmd.colorscheme("vocadev-miku")
  end,
}
```

### packer.nvim
```lua
use {
  "M5Devs/VocaDev",
  config = function()
    require("vocadev.themes.miku").setup()
    vim.cmd([[colorscheme vocadev-miku]])
  end
}
```

### vim-plug
```vim
Plug 'M5Devs/VocaDev'

" In your init.vim / init.lua
colorscheme vocadev-miku
```

## Configuration

```lua
require("vocadev.themes.miku").setup({
  transparent = false, -- Enable transparent background
  terminal_colors = true,
  styles = {
    comments = { italic = true },
    keywords = { bold = true },
    functions = {},
    variables = {},
  },
})
```
