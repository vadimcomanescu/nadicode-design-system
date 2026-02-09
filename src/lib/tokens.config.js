// Color tokens for both themes
export const colorTokens = {
  dark: {
    background: '#050505',
    surface: {
      DEFAULT: '#0F0F0F',
      hover: '#141414',
      active: '#1A1A1A',
    },
    border: {
      DEFAULT: '#272727',
      hover: '#3F3F3F',
      subtle: 'rgba(255, 255, 255, 0.05)',
      'subtle-hover': 'rgba(255, 255, 255, 0.1)',
    },
    primary: {
      DEFAULT: '#FFFFFF',
      foreground: '#000000',
    },
    secondary: {
      DEFAULT: '#272727',
      foreground: '#FFFFFF',
    },
    accent: {
      DEFAULT: '#3B82F6',
      foreground: '#FFFFFF',
    },
    destructive: {
      DEFAULT: '#EF4444',
      foreground: '#FFFFFF',
    },
    success: {
      DEFAULT: '#10B981',
      foreground: '#FFFFFF',
    },
    warning: {
      DEFAULT: '#F59E0B',
      foreground: '#000000',
    },
    info: {
      DEFAULT: '#3B82F6',
      foreground: '#FFFFFF',
    },
    muted: {
      DEFAULT: '#272727',
      foreground: '#A1A1A1',
    },
    overlay: '#000000',
    text: {
      primary: '#F2F2F2',
      secondary: '#A1A1A1',
      tertiary: '#525252',
    },
  },
  light: {
    background: '#FAFAFA',
    surface: {
      DEFAULT: '#FFFFFF',
      hover: '#F5F5F5',
      active: '#E8E8E8',
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
      DEFAULT: '#3B82F6',
      foreground: '#FFFFFF',
    },
    destructive: {
      DEFAULT: '#DC2626',
      foreground: '#FFFFFF',
    },
    success: {
      DEFAULT: '#059669',
      foreground: '#FFFFFF',
    },
    warning: {
      DEFAULT: '#D97706',
      foreground: '#000000',
    },
    info: {
      DEFAULT: '#2563EB',
      foreground: '#FFFFFF',
    },
    muted: {
      DEFAULT: '#F5F5F5',
      foreground: '#737373',
    },
    overlay: '#000000',
    text: {
      primary: '#0A0A0A',
      secondary: '#737373',
      tertiary: '#A3A3A3',
    },
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
    'glow-accent': '0 0 20px -5px rgba(59, 130, 246, 0.3)',
  }
};
