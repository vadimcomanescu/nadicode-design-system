// Color tokens for both themes
export const colorTokens = {
  dark: {
    background: '#050505',
    surface: {
      DEFAULT: '#0C0C0C',
      hover: '#121212',
      active: '#1A1A1A',
      raised: '#222222',
    },
    border: {
      DEFAULT: '#262626',
      hover: '#3A3A3A',
      subtle: 'rgba(255, 255, 255, 0.05)',
      'subtle-hover': 'rgba(255, 255, 255, 0.1)',
    },
    primary: {
      DEFAULT: '#FFFFFF',
      foreground: '#000000',
    },
    secondary: {
      DEFAULT: '#262626',
      foreground: '#FFFFFF',
    },
    accent: {
      DEFAULT: '#FB7185',
      foreground: '#FFFFFF',
    },
    destructive: {
      DEFAULT: '#EF4444',
      foreground: '#FFFFFF',
    },
    success: {
      DEFAULT: '#34D399',
      foreground: '#050505',
    },
    warning: {
      DEFAULT: '#FBBF24',
      foreground: '#050505',
    },
    info: {
      DEFAULT: '#2DD4BF',
      foreground: '#050505',
    },
    muted: {
      DEFAULT: '#262626',
      foreground: '#A3A3A3',
    },
    overlay: '#000000',
    text: {
      primary: '#FAFAFA',
      secondary: '#A3A3A3',
      tertiary: '#737373',
    },
    focusRing: '#FB7185',
    link: '#FB7185',
    input: '#262626',
    disabled: '#404040',
    disabledForeground: '#737373',
  },
  light: {
    background: '#FAFAFA',
    surface: {
      DEFAULT: '#FFFFFF',
      hover: '#F5F5F5',
      active: '#E8E8E8',
      raised: '#FFFFFF',
    },
    border: {
      DEFAULT: '#E5E5E5',
      hover: '#D4D4D4',
      subtle: 'rgba(0, 0, 0, 0.05)',
      'subtle-hover': 'rgba(0, 0, 0, 0.1)',
    },
    primary: {
      DEFAULT: '#0A0A0A',
      foreground: '#FFFFFF',
    },
    secondary: {
      DEFAULT: '#F5F5F5',
      foreground: '#0A0A0A',
    },
    accent: {
      DEFAULT: '#E11D48',
      foreground: '#FFFFFF',
    },
    destructive: {
      DEFAULT: '#DC2626',
      foreground: '#FFFFFF',
    },
    success: {
      DEFAULT: '#16A34A',
      foreground: '#FFFFFF',
    },
    warning: {
      DEFAULT: '#D97706',
      foreground: '#050505',
    },
    info: {
      DEFAULT: '#0D9488',
      foreground: '#FFFFFF',
    },
    muted: {
      DEFAULT: '#F5F5F5',
      foreground: '#737373',
    },
    overlay: '#000000',
    text: {
      primary: '#0A0A0A',
      secondary: '#525252',
      tertiary: '#737373',
    },
    focusRing: '#E11D48',
    link: '#E11D48',
    input: '#F5F5F5',
    disabled: '#D4D4D4',
    disabledForeground: '#A3A3A3',
  },
};

// Non-color tokens (theme-independent)
export const tokens = {
  // Keep colors for backward compatibility (using dark as default)
  colors: colorTokens.dark,
  typography: {
    fontFamily: {
      sans: ['Satoshi', 'sans-serif'],
      pixel: ['GeistPixel', 'monospace'],
      'pixel-grid': ['GeistPixelGrid', 'monospace'],
      'pixel-line': ['GeistPixelLine', 'monospace'],
    },
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '48px',
      '4xl': '64px',
    }
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  spacing: {
    base: 4,
    '4.5': '1.125rem',
  },
  shadows: {
    'glow': '0 0 20px -5px rgba(255, 255, 255, 0.1)',
    'glow-accent': '0 0 20px -5px rgba(251, 113, 133, 0.3)',
  }
};
