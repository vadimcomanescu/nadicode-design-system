import { describe, it, expect } from 'vitest';
import { tokens, colorTokens, colorScales } from './tokens.config.js';

describe('Token Configuration', () => {
  it('should define color tokens', () => {
    expect(tokens.colors).toBeDefined();
    expect(tokens.colors.background).toBe('#0F1114');
    expect(tokens.colors.primary.DEFAULT).toBe('#E1E7ED');
    expect(tokens.colors.accent.DEFAULT).toBe('#38BDB8');
  });

  it('should define semantic status tokens in dark theme', () => {
    expect(colorTokens.dark.success.DEFAULT).toBe('#3DD68C');
    expect(colorTokens.dark.warning.DEFAULT).toBe('#F5C742');
    expect(colorTokens.dark.info.DEFAULT).toBe('#3E96F4');
    expect(colorTokens.dark.overlay).toBe('#000000');
  });

  it('should define semantic status tokens in light theme', () => {
    expect(colorTokens.light.success.DEFAULT).toBe('#1B9450');
    expect(colorTokens.light.warning.DEFAULT).toBe('#D09E10');
    expect(colorTokens.light.info.DEFAULT).toBe('#2E78E5');
    expect(colorTokens.light.overlay).toBe('#000000');
  });

  it('should define new interactive tokens', () => {
    expect(colorTokens.dark.focusRing).toBe('#38BDB8');
    expect(colorTokens.dark.link).toBe('#4ECEC8');
    expect(colorTokens.dark.disabled).toBe('#3E4550');
    expect(colorTokens.light.focusRing).toBe('#1A8F88');
    expect(colorTokens.light.link).toBe('#0F6660');
  });

  it('should define surface.raised token', () => {
    expect(colorTokens.dark.surface.raised).toBe('#2B2F37');
    expect(colorTokens.light.surface.raised).toBe('#F5F7F9');
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
    expect(tokens.shadows['glow-accent']).toContain('56, 189, 184');
  });

  it('should define 12-step color scales', () => {
    expect(colorScales).toBeDefined();
    expect(colorScales.dark.gray[1]).toBe('#0F1114');
    expect(colorScales.dark.gray[12]).toBe('#E1E7ED');
    expect(colorScales.dark.teal[9]).toBe('#38BDB8');
    expect(colorScales.light.gray[1]).toBe('#FBFCFD');
    expect(colorScales.light.teal[9]).toBe('#1A8F88');
  });

  it('should define all 8 scale ramps', () => {
    for (const theme of ['dark', 'light']) {
      for (const scale of ['gray', 'grayAlpha', 'teal', 'red', 'green', 'amber', 'blue', 'violet']) {
        expect(colorScales[theme][scale]).toBeDefined();
        for (let step = 1; step <= 12; step++) {
          expect(colorScales[theme][scale][step]).toBeDefined();
        }
      }
    }
  });
});
