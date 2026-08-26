export interface CharacterPalette {
  name: string;
  id: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    background: string;
    foreground: string;
    darkVariants: {
      darker: string;
      lighter: string;
      selection: string;
    };
    syntax: {
      keyword: string;
      string: string;
      comment: string;
      function: string;
      variable: string;
      constant: string;
      type: string;
    };
  };
}

export const mikuPalette: CharacterPalette = {
  name: 'Hatsune Miku',
  id: 'miku',
  colors: {
    primary: '#39C5BB',
    secondary: '#86CECB',
    accent: '#39FF14',
    dark: '#1A1A2E',
    background: '#0F0F23',
    foreground: '#E0E0E0',
    darkVariants: {
      darker: '#0A0A18',
      lighter: '#24243D',
      selection: '#2A2D4A',
    },
    syntax: {
      keyword: '#FF007F',
      string: '#86CECB',
      comment: '#5C6370',
      function: '#39C5BB',
      variable: '#E0E0E0',
      constant: '#39FF14',
      type: '#FFD700',
    },
  },
};
