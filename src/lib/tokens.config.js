// Arctic Glow — 12-step Radix-style color scales
// Steps 1-2: app bg · 3-5: component bg · 6-8: borders · 9-10: solid · 11-12: text
export const colorScales = {
  dark: {
    gray: {
      1:  '#0F1114',
      2:  '#151719',
      3:  '#1C1F23',
      4:  '#232730',
      5:  '#2B2F37',
      6:  '#33383F',
      7:  '#3E4550',
      8:  '#505A68',
      9:  '#6B7A8A',
      10: '#8494A7',
      11: '#A0AEBB',
      12: '#E1E7ED',
    },
    grayAlpha: {
      1:  'rgba(200, 220, 240, 0.02)',
      2:  'rgba(200, 220, 240, 0.04)',
      3:  'rgba(200, 220, 240, 0.06)',
      4:  'rgba(200, 220, 240, 0.09)',
      5:  'rgba(200, 220, 240, 0.12)',
      6:  'rgba(200, 220, 240, 0.16)',
      7:  'rgba(200, 220, 240, 0.22)',
      8:  'rgba(200, 220, 240, 0.32)',
      9:  'rgba(200, 220, 240, 0.45)',
      10: 'rgba(200, 220, 240, 0.58)',
      11: 'rgba(200, 220, 240, 0.72)',
      12: 'rgba(200, 220, 240, 0.93)',
    },
    teal: {
      1:  '#0B1615',
      2:  '#0F1F1E',
      3:  '#122B29',
      4:  '#163834',
      5:  '#1B4542',
      6:  '#21554F',
      7:  '#2A6D66',
      8:  '#35917F',
      9:  '#38BDB8',
      10: '#4ECEC8',
      11: '#7EDCD6',
      12: '#C2F0ED',
    },
    red: {
      1:  '#191113',
      2:  '#201316',
      3:  '#3B1219',
      4:  '#50141D',
      5:  '#661823',
      6:  '#7E1F2D',
      7:  '#9E2B3A',
      8:  '#C73A4B',
      9:  '#E5484D',
      10: '#EB5E5E',
      11: '#F39090',
      12: '#FAD1D4',
    },
    green: {
      1:  '#0D1512',
      2:  '#111C17',
      3:  '#13291F',
      4:  '#163727',
      5:  '#1A4530',
      6:  '#1F563A',
      7:  '#266E48',
      8:  '#2F8E5A',
      9:  '#3DD68C',
      10: '#5CE4A0',
      11: '#8CEDB8',
      12: '#C8F5DD',
    },
    amber: {
      1:  '#16120B',
      2:  '#1D1710',
      3:  '#2C2011',
      4:  '#3D2B10',
      5:  '#4F370F',
      6:  '#63440E',
      7:  '#7E5711',
      8:  '#A87318',
      9:  '#F5C742',
      10: '#FFDB5C',
      11: '#FFE588',
      12: '#FFF3CC',
    },
    blue: {
      1:  '#0F1520',
      2:  '#131B2E',
      3:  '#15243B',
      4:  '#192E4C',
      5:  '#1D3A5E',
      6:  '#224973',
      7:  '#2A5E92',
      8:  '#347AB8',
      9:  '#3E96F4',
      10: '#5EAAF7',
      11: '#8EC3FA',
      12: '#CEE1FC',
    },
    violet: {
      1:  '#14111F',
      2:  '#1B1528',
      3:  '#241C38',
      4:  '#2E224A',
      5:  '#38295E',
      6:  '#443375',
      7:  '#553F94',
      8:  '#6B54B5',
      9:  '#8B5CF6',
      10: '#9E77F8',
      11: '#BAA0FA',
      12: '#E2D5FD',
    },
  },
  light: {
    gray: {
      1:  '#FBFCFD',
      2:  '#F5F7F9',
      3:  '#EDF0F3',
      4:  '#E4E8EC',
      5:  '#D9DFE5',
      6:  '#CDD4DC',
      7:  '#B5BECA',
      8:  '#97A3B2',
      9:  '#6B7A8A',
      10: '#566878',
      11: '#3E4F60',
      12: '#1A2230',
    },
    grayAlpha: {
      1:  'rgba(0, 30, 60, 0.02)',
      2:  'rgba(0, 30, 60, 0.04)',
      3:  'rgba(0, 30, 60, 0.07)',
      4:  'rgba(0, 30, 60, 0.11)',
      5:  'rgba(0, 30, 60, 0.15)',
      6:  'rgba(0, 30, 60, 0.20)',
      7:  'rgba(0, 30, 60, 0.29)',
      8:  'rgba(0, 30, 60, 0.41)',
      9:  'rgba(0, 30, 60, 0.58)',
      10: 'rgba(0, 30, 60, 0.66)',
      11: 'rgba(0, 30, 60, 0.76)',
      12: 'rgba(0, 30, 60, 0.90)',
    },
    teal: {
      1:  '#F0FDFC',
      2:  '#E3FAF8',
      3:  '#C8F3EF',
      4:  '#A8E9E2',
      5:  '#85DBD4',
      6:  '#5DC9C0',
      7:  '#35B2A8',
      8:  '#22958D',
      9:  '#1A8F88',
      10: '#147A73',
      11: '#0F6660',
      12: '#08403D',
    },
    red: {
      1:  '#FFF5F5',
      2:  '#FFE8E8',
      3:  '#FECDD4',
      4:  '#FDAFB7',
      5:  '#FA8F9A',
      6:  '#F16C78',
      7:  '#E34D5B',
      8:  '#CE3644',
      9:  '#CE2C3B',
      10: '#B82535',
      11: '#9C1E2E',
      12: '#5C111A',
    },
    green: {
      1:  '#F2FDF6',
      2:  '#E3FAEC',
      3:  '#C2F2D6',
      4:  '#9DE8BC',
      5:  '#76D9A0',
      6:  '#4EC785',
      7:  '#30B26B',
      8:  '#1D9B55',
      9:  '#1B9450',
      10: '#147C42',
      11: '#0F6636',
      12: '#08401F',
    },
    amber: {
      1:  '#FEFCF0',
      2:  '#FDF8E0',
      3:  '#FCEFC0',
      4:  '#FAE39A',
      5:  '#F5D46E',
      6:  '#E8C044',
      7:  '#D4A825',
      8:  '#B88E15',
      9:  '#D09E10',
      10: '#B08510',
      11: '#866510',
      12: '#4A380A',
    },
    blue: {
      1:  '#F3F8FE',
      2:  '#E6F0FD',
      3:  '#C8DFFB',
      4:  '#A6CBF7',
      5:  '#80B4F3',
      6:  '#5999EC',
      7:  '#377FE2',
      8:  '#2068D0',
      9:  '#2E78E5',
      10: '#2362C7',
      11: '#1B4FA5',
      12: '#0F3060',
    },
    violet: {
      1:  '#F9F6FE',
      2:  '#F1EBFD',
      3:  '#E3D4FC',
      4:  '#D2B9FA',
      5:  '#BF9CF7',
      6:  '#A87CF2',
      7:  '#9060EA',
      8:  '#7A4ADD',
      9:  '#7C3AED',
      10: '#6A2ED2',
      11: '#5624B3',
      12: '#351468',
    },
  },
};

// Semantic color tokens mapped from scales
export const colorTokens = {
  dark: {
    background: '#0F1114',       // gray.1
    surface: {
      DEFAULT: '#151719',        // gray.2
      hover: '#1C1F23',          // gray.3
      active: '#232730',         // gray.4
      raised: '#2B2F37',         // gray.5
    },
    border: {
      DEFAULT: '#33383F',        // gray.6
      hover: '#3E4550',          // gray.7
      subtle: 'rgba(200, 220, 240, 0.06)',  // grayAlpha.3
      'subtle-hover': 'rgba(200, 220, 240, 0.12)', // grayAlpha.5
    },
    primary: {
      DEFAULT: '#E1E7ED',        // gray.12
      foreground: '#0F1114',     // gray.1
    },
    secondary: {
      DEFAULT: '#232730',        // gray.4
      foreground: '#E1E7ED',     // gray.12
    },
    accent: {
      DEFAULT: '#38BDB8',        // teal.9
      foreground: '#0F1114',     // gray.1
    },
    destructive: {
      DEFAULT: '#E5484D',        // red.9
      foreground: '#FFFFFF',
    },
    success: {
      DEFAULT: '#3DD68C',        // green.9
      foreground: '#0D1512',     // green.1
    },
    warning: {
      DEFAULT: '#F5C742',        // amber.9
      foreground: '#16120B',     // amber.1
    },
    info: {
      DEFAULT: '#3E96F4',        // blue.9
      foreground: '#0F1520',     // blue.1
    },
    muted: {
      DEFAULT: '#232730',        // gray.4
      foreground: '#A0AEBB',     // gray.11
    },
    overlay: '#000000',
    text: {
      primary: '#E1E7ED',        // gray.12
      secondary: '#A0AEBB',      // gray.11
      tertiary: '#6B7A8A',       // gray.9
    },
    focusRing: '#38BDB8',        // teal.9
    link: '#4ECEC8',             // teal.10
    input: '#232730',            // gray.4
    disabled: '#3E4550',         // gray.7
    disabledForeground: '#6B7A8A', // gray.9
  },
  light: {
    background: '#FBFCFD',       // gray.1
    surface: {
      DEFAULT: '#F5F7F9',        // gray.2
      hover: '#EDF0F3',          // gray.3
      active: '#E4E8EC',         // gray.4
      raised: '#F5F7F9',         // gray.2
    },
    border: {
      DEFAULT: '#CDD4DC',        // gray.6
      hover: '#B5BECA',          // gray.7
      subtle: 'rgba(0, 30, 60, 0.07)',    // grayAlpha.3
      'subtle-hover': 'rgba(0, 30, 60, 0.15)', // grayAlpha.5
    },
    primary: {
      DEFAULT: '#1A2230',        // gray.12
      foreground: '#FBFCFD',     // gray.1
    },
    secondary: {
      DEFAULT: '#EDF0F3',        // gray.3
      foreground: '#1A2230',     // gray.12
    },
    accent: {
      DEFAULT: '#1A8F88',        // teal.9
      foreground: '#FFFFFF',
    },
    destructive: {
      DEFAULT: '#CE2C3B',        // red.9
      foreground: '#FFFFFF',
    },
    success: {
      DEFAULT: '#1B9450',        // green.9
      foreground: '#FFFFFF',
    },
    warning: {
      DEFAULT: '#D09E10',        // amber.9
      foreground: '#16120B',
    },
    info: {
      DEFAULT: '#2E78E5',        // blue.9
      foreground: '#FFFFFF',
    },
    muted: {
      DEFAULT: '#EDF0F3',        // gray.3
      foreground: '#3E4F60',     // gray.11
    },
    overlay: '#000000',
    text: {
      primary: '#1A2230',        // gray.12
      secondary: '#3E4F60',      // gray.11
      tertiary: '#6B7A8A',       // gray.9
    },
    focusRing: '#1A8F88',        // teal.9
    link: '#0F6660',             // teal.11
    input: '#EDF0F3',            // gray.3
    disabled: '#CDD4DC',         // gray.6
    disabledForeground: '#97A3B2', // gray.8
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
    'glow-accent': '0 0 20px -5px rgba(56, 189, 184, 0.15)',
  }
};
