
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

  it('should extend borderRadius with CSS variable-based values', () => {
    const radius = tailwindConfig.theme?.extend?.borderRadius as Record<string, string>;
    expect(radius.sm).toContain('var(--radius-sm');
    expect(radius.md).toContain('var(--radius-md');
    expect(radius.lg).toContain('var(--radius-lg');
    expect(radius.full).toBe(tokens.radius.full);
  });

  it('should extend spacing with tokens', () => {
    expect(tailwindConfig.theme?.extend?.spacing).toEqual(tokens.spacing);
  });

  it('should extend boxShadow with token shadows and bloom shadows', () => {
    const shadows = tailwindConfig.theme?.extend?.boxShadow as Record<string, string>;
    expect(shadows.glow).toBe(tokens.shadows.glow);
    expect(shadows['glow-accent']).toBe(tokens.shadows['glow-accent']);
    expect(shadows['bloom-soft']).toBeDefined();
    expect(shadows['bloom-lifted']).toBeDefined();
  });
});
