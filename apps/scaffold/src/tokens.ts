import {
  tokens as configTokens,
  colorTokens as configColorTokens,
  colorScales as configColorScales,
  bloomScales as configBloomScales,
  styleTokens as configStyleTokens,
} from './lib/tokens.config';

export interface TokenColors {
  background: string;
  surface: {
    DEFAULT: string;
    hover: string;
    active: string;
    raised: string;
  };
  border: {
    DEFAULT: string;
    hover: string;
    subtle: string;
    'subtle-hover': string;
  };
  primary: {
    DEFAULT: string;
    foreground: string;
  };
  secondary: {
    DEFAULT: string;
    foreground: string;
  };
  accent: {
    DEFAULT: string;
    foreground: string;
  };
  destructive: {
    DEFAULT: string;
    foreground: string;
  };
  success: {
    DEFAULT: string;
    foreground: string;
  };
  warning: {
    DEFAULT: string;
    foreground: string;
  };
  info: {
    DEFAULT: string;
    foreground: string;
  };
  muted: {
    DEFAULT: string;
    foreground: string;
  };
  overlay: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  focusRing: string;
  link: string;
  input: string;
  disabled: string;
  disabledForeground: string;
}

export interface TokenTypography {
  fontFamily: {
    sans: string[];
  };
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
}

export interface TokenRadius {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface TokenSpacing {
  base: number;
  '4.5': string;
}

export interface TokenShadows {
  'glow': string;
  'glow-accent': string;
}

export interface DesignTokens {
  colors: TokenColors;
  typography: TokenTypography;
  radius: TokenRadius;
  spacing: TokenSpacing;
  shadows: TokenShadows;
}

export interface ColorTokens {
  dark: TokenColors;
  light: TokenColors;
  bloom: TokenColors;
}

/** 12-step Radix-style color scale */
export interface ColorScale {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
}

export interface ArcticGlowScales {
  gray: ColorScale;
  grayAlpha: ColorScale;
  teal: ColorScale;
  red: ColorScale;
  green: ColorScale;
  amber: ColorScale;
  blue: ColorScale;
  violet: ColorScale;
}

export interface BloomScales {
  sand: ColorScale;
  coral: ColorScale;
  lavender: ColorScale;
  mint: ColorScale;
  peach: ColorScale;
  rose: ColorScale;
  sky: ColorScale;
}

export interface ColorScales {
  dark: ArcticGlowScales;
  light: ArcticGlowScales;
}

export type Style = 'arctic' | 'bloom';

export interface StyleTokenSet {
  radius: { sm: string; md: string; lg: string };
  shadows: Record<string, string>;
}

export interface StyleTokens {
  arctic: StyleTokenSet;
  bloom: StyleTokenSet;
}

export const tokens = configTokens as unknown as DesignTokens;
export const colorTokens = configColorTokens as unknown as ColorTokens;
export const colorScales = configColorScales as unknown as ColorScales;
export const bloomScales = configBloomScales as unknown as BloomScales;
export const styleTokens = configStyleTokens as unknown as StyleTokens;
