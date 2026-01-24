
import { describe, it, expect } from 'vitest';
import tailwindConfig from '../../tailwind.config.js';
import { tokens } from '../lib/tokens.config';

// Type for the colors object in our tailwind config
interface ColorConfig {
  background: string;
  surface: { DEFAULT: string; hover: string; active: string };
  border: { DEFAULT: string; hover: string; subtle: string; 'subtle-hover': string };
  primary: { DEFAULT: string; foreground: string };
  secondary: { DEFAULT: string; foreground: string };
  accent: { DEFAULT: string; foreground: string };
  destructive: { DEFAULT: string; foreground: string };
  muted: { DEFAULT: string; foreground: string };
  text: { primary: string; secondary: string; tertiary: string };
}

describe('Tailwind Configuration', () => {
  it('should have darkMode set to class', () => {
    expect(tailwindConfig.darkMode).toBe('class');
  });

  it('should extend colors with CSS variable-based values', () => {
    const colors = tailwindConfig.theme?.extend?.colors as ColorConfig | undefined;
    expect(colors).toBeDefined();

    // Check that colors use CSS variables
    expect(colors?.background).toContain('var(--color-background)');
    expect(colors?.surface?.DEFAULT).toContain('var(--color-surface)');
    expect(colors?.border?.DEFAULT).toContain('var(--color-border)');
    expect(colors?.primary?.DEFAULT).toContain('var(--color-primary)');
    expect(colors?.text?.primary).toContain('var(--color-text-primary)');
  });

  it('should extend fontFamily with tokens', () => {
    expect(tailwindConfig.theme?.extend?.fontFamily).toEqual(tokens.typography.fontFamily);
  });

  it('should extend fontSize with tokens', () => {
    expect(tailwindConfig.theme?.extend?.fontSize).toEqual(tokens.typography.sizes);
  });

  it('should extend borderRadius with tokens', () => {
    expect(tailwindConfig.theme?.extend?.borderRadius).toEqual(tokens.radius);
  });

  it('should extend spacing with tokens', () => {
    expect(tailwindConfig.theme?.extend?.spacing).toEqual(tokens.spacing);
  });

  it('should extend boxShadow with tokens', () => {
    expect(tailwindConfig.theme?.extend?.boxShadow).toEqual(tokens.shadows);
  });
});
