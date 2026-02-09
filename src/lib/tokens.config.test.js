import { describe, it, expect } from 'vitest';
import { tokens, colorTokens } from './tokens.config.js';

describe('Token Configuration', () => {
  it('should define color tokens', () => {
    expect(tokens.colors).toBeDefined();
    expect(tokens.colors.background).toBe('#050505');
    expect(tokens.colors.primary.DEFAULT).toBe('#FFFFFF');
    expect(tokens.colors.accent.DEFAULT).toBe('#3B82F6');
  });

  it('should define semantic status tokens in dark theme', () => {
    expect(colorTokens.dark.success.DEFAULT).toBe('#10B981');
    expect(colorTokens.dark.warning.DEFAULT).toBe('#F59E0B');
    expect(colorTokens.dark.info.DEFAULT).toBe('#3B82F6');
    expect(colorTokens.dark.overlay).toBe('#000000');
  });

  it('should define semantic status tokens in light theme', () => {
    expect(colorTokens.light.success.DEFAULT).toBe('#059669');
    expect(colorTokens.light.warning.DEFAULT).toBe('#D97706');
    expect(colorTokens.light.info.DEFAULT).toBe('#2563EB');
    expect(colorTokens.light.overlay).toBe('#000000');
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
  });
});
