export const tokens = {
  colors: {
    background: '#050505',
    surface: {
      DEFAULT: '#0F0F0F',
      hover: '#141414',
      active: '#1A1A1A',
    },
    border: {
      DEFAULT: '#272727',
      hover: '#3F3F3F',
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
      DEFAULT: '#3B82F6', // Electric Blue
      foreground: '#FFFFFF',
    },
    destructive: {
      DEFAULT: '#EF4444',
      foreground: '#FFFFFF',
    },
    muted: {
      DEFAULT: '#272727',
      foreground: '#A1A1A1',
    },
    text: {
      primary: '#F2F2F2',
      secondary: '#A1A1A1',
      tertiary: '#525252',
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
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
    '4.5': '1.125rem', // 18px
  },
  shadows: {
    'glow': '0 0 20px -5px rgba(255, 255, 255, 0.1)',
    'glow-accent': '0 0 20px -5px rgba(59, 130, 246, 0.3)',
  }
};
