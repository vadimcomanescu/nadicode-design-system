import { tokens as configTokens } from './lib/tokens.config';

export interface TokenColors {
  background: string;
  surface: {
    DEFAULT: string;
    hover: string;
    active: string;
  };
  border: {
    DEFAULT: string;
    hover: string;
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
  muted: {
    DEFAULT: string;
    foreground: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
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

export const tokens = configTokens as unknown as DesignTokens;
