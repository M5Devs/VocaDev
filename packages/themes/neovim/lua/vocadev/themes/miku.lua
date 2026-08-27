local M = {}

M.config = {
  transparent = false,
  terminal_colors = true,
  styles = {
    comments = { italic = true },
    keywords = { bold = true },
    functions = {},
    variables = {},
  },
}

M.palette = {
  bg = "#0F0F23",
  fg = "#E0E0E0",
  primary = "#39C5BB",
  secondary = "#86CECB",
  accent = "#39FF14",
  dark = "#1A1A2E",
  darker = "#0A0A18",
  lighter = "#24243D",
  selection = "#2A2D4A",
  comment = "#6B7280",
  error = "#EF4444",
  warning = "#F59E0B",
  info = "#3B82F6",
  hint = "#39C5BB",
}

function M.setup(options)
  M.config = vim.tbl_deep_extend("force", M.config, options or {})
end

function M.load()
  if vim.g.colors_name then
    vim.cmd("highlight clear")
  end

  vim.g.colors_name = "vocadev-miku"
  vim.o.termguicolors = true

  local p = M.palette
  local cfg = M.config

  local highlights = {
    -- Basic editor highlights
    Normal = { fg = p.fg, bg = cfg.transparent and "NONE" or p.bg },
    NormalFloat = { fg = p.fg, bg = p.darker },
    NormalNC = { fg = p.fg, bg = cfg.transparent and "NONE" or p.bg },
    Cursor = { fg = p.bg, bg = p.primary },
    CursorLine = { bg = p.lighter },
    CursorColumn = { bg = p.lighter },
    ColorColumn = { bg = p.lighter },
    LineNr = { fg = p.comment },
    CursorLineNr = { fg = p.primary, bold = true },
    VertSplit = { fg = p.dark, bg = "NONE" },
    WinSeparator = { fg = p.dark, bg = "NONE" },
    StatusLine = { fg = p.fg, bg = p.darker },
    StatusLineNC = { fg = p.comment, bg = p.darker },
    Visual = { bg = p.selection },
    VisualNOS = { bg = p.selection },
    Pmenu = { fg = p.fg, bg = p.darker },
    PmenuSel = { fg = "#FFFFFF", bg = p.selection },
    PmenuSbar = { bg = p.lighter },
    PmenuThumb = { bg = p.primary },
    Folded = { fg = p.comment, bg = p.darker },
    FoldColumn = { fg = p.comment, bg = p.bg },
    Search = { fg = p.bg, bg = p.secondary },
    IncSearch = { fg = p.bg, bg = p.accent },
    MatchParen = { fg = p.accent, bold = true },

    -- Standard syntax groups
    Keyword = vim.tbl_extend("force", { fg = p.primary }, cfg.styles.keywords),
    Statement = { fg = p.primary },
    Conditional = { fg = p.primary },
    Repeat = { fg = p.primary },
    Label = { fg = p.primary },
    Operator = { fg = p.secondary },
    Exception = { fg = p.error },

    String = { fg = p.secondary },
    Character = { fg = p.secondary },
    Number = { fg = p.accent },
    Boolean = { fg = p.accent },
    Float = { fg = p.accent },

    Function = vim.tbl_extend("force", { fg = p.accent }, cfg.styles.functions),
    Identifier = vim.tbl_extend("force", { fg = p.fg }, cfg.styles.variables),

    Type = { fg = p.primary },
    StorageClass = { fg = p.primary },
    Structure = { fg = p.primary },
    Typedef = { fg = p.primary },

    Constant = { fg = p.accent },
    PreProc = { fg = p.secondary },
    Include = { fg = p.primary },
    Define = { fg = p.primary },
    Macro = { fg = p.secondary },

    Comment = vim.tbl_extend("force", { fg = p.comment }, cfg.styles.comments),
    Special = { fg = p.secondary },
    SpecialComment = { fg = p.comment },
    Todo = { fg = p.bg, bg = p.accent, bold = true },
    Error = { fg = p.error },
    Underlined = { underline = true },

    -- Treesitter groups
    ["@keyword"] = vim.tbl_extend("force", { fg = p.primary }, cfg.styles.keywords),
    ["@string"] = { fg = p.secondary },
    ["@function"] = vim.tbl_extend("force", { fg = p.accent }, cfg.styles.functions),
    ["@function.call"] = { fg = p.accent },
    ["@comment"] = vim.tbl_extend("force", { fg = p.comment }, cfg.styles.comments),
    ["@variable"] = vim.tbl_extend("force", { fg = p.fg }, cfg.styles.variables),
    ["@constant"] = { fg = p.accent },
    ["@type"] = { fg = p.primary },
    ["@operator"] = { fg = p.secondary },
    ["@punctuation"] = { fg = p.fg },

    -- LSP Diagnostics
    DiagnosticError = { fg = p.error },
    DiagnosticWarn = { fg = p.warning },
    DiagnosticInfo = { fg = p.info },
    DiagnosticHint = { fg = p.hint },
    DiagnosticUnderlineError = { undercurl = true, sp = p.error },
    DiagnosticUnderlineWarn = { undercurl = true, sp = p.warning },
    DiagnosticUnderlineInfo = { undercurl = true, sp = p.info },
    DiagnosticUnderlineHint = { undercurl = true, sp = p.hint },

    -- GitSigns
    GitSignsAdd = { fg = p.accent },
    GitSignsChange = { fg = p.warning },
    GitSignsDelete = { fg = p.error },

    -- Telescope
    TelescopeBorder = { fg = p.primary, bg = p.bg },
    TelescopePromptBorder = { fg = p.accent, bg = p.bg },
    TelescopePromptTitle = { fg = p.bg, bg = p.accent },
    TelescopePreviewTitle = { fg = p.bg, bg = p.primary },
    TelescopeSelection = { bg = p.selection },

    -- NvimTree
    NvimTreeRootFolder = { fg = p.primary, bold = true },
    NvimTreeFolderIcon = { fg = p.primary },
    NvimTreeFolderName = { fg = p.fg },
    NvimTreeOpenedFolderName = { fg = p.secondary, bold = true },
    NvimTreeEmptyFolderName = { fg = p.comment },
    NvimTreeNormal = { fg = p.fg, bg = p.darker },

    -- BufferLine
    BufferLineFill = { bg = p.darker },
    BufferLineBackground = { fg = p.comment, bg = p.darker },
    BufferLineSelected = { fg = p.fg, bg = p.bg, bold = true },

    -- WhichKey
    WhichKey = { fg = p.primary },
    WhichKeyGroup = { fg = p.secondary },
    WhichKeyDesc = { fg = p.fg },

    -- Lualine support colors reference
    LualineNormal = { fg = p.bg, bg = p.primary },
    LualineInsert = { fg = p.bg, bg = p.accent },
    LualineVisual = { fg = p.bg, bg = p.secondary },
    LualineReplace = { fg = p.bg, bg = p.error },
  }

  for group, val in pairs(highlights) do
    vim.api.nvim_set_hl(0, group, val)
  end
end

return M
