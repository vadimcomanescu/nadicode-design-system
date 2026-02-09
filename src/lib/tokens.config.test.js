import { describe, it, expect } from 'vitest';
import { tokens, colorTokens } from './tokens.config.js';

describe('Token Configuration', () => {
  it('should define color tokens', () => {
    expect(tokens.colors).toBeDefined();
    expect(tokens.colors.background).toBe('#050505');
    expect(tokens.colors.primary.DEFAULT).toBe('#FFFFFF');
    expect(tokens.colors.accent.DEFAULT).toBe('#FB7185');
  });

  it('should define semantic status tokens in dark theme', () => {
    expect(colorTokens.dark.success.DEFAULT).toBe('#34D399');
    expect(colorTokens.dark.warning.DEFAULT).toBe('#FBBF24');
    expect(colorTokens.dark.info.DEFAULT).toBe('#2DD4BF');
    expect(colorTokens.dark.overlay).toBe('#000000');
  });

  it('should define semantic status tokens in light theme', () => {
    expect(colorTokens.light.success.DEFAULT).toBe('#16A34A');
    expect(colorTokens.light.warning.DEFAULT).toBe('#D97706');
    expect(colorTokens.light.info.DEFAULT).toBe('#0D9488');
    expect(colorTokens.light.overlay).toBe('#000000');
  });

  it('should define new interactive tokens', () => {
    expect(colorTokens.dark.focusRing).toBe('#FB7185');
    expect(colorTokens.dark.link).toBe('#FB7185');
    expect(colorTokens.dark.disabled).toBe('#404040');
    expect(colorTokens.light.focusRing).toBe('#E11D48');
    expect(colorTokens.light.link).toBe('#E11D48');
  });

  it('should define surface.raised token', () => {
    expect(colorTokens.dark.surface.raised).toBe('#222222');
    expect(colorTokens.light.surface.raised).toBe('#FFFFFF');
  });

  it('should define typography tokens', () => {
    expect(tokens.typography).toBeDefined();
    expect(tokens.typography.fontFamily.sans).toContain('Satoshi');
    expect(tokens.typography.sizes.base).toBe('16px');
  });

  it('should define radius tokens', () => {
    expect(tokens.radius).toBeDefined();
    expect(tokens.radius.md).toBe('8px');
  });

  it('should define spacing tokens', () => {
    expect(tokens.spacing).toBeDefined();
    expect(tokens.spacing['4.5']).toBe('1.125rem');
  });

  it('should define shadow tokens', () => {
    expect(tokens.shadows).toBeDefined();
    expect(tokens.shadows['glow']).toBeDefined();
    expect(tokens.shadows['glow-accent']).toContain('251, 113, 133');
  });
});
