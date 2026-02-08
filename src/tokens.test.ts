import { describe, it, expect } from 'vitest';
import { tokens } from './tokens';

describe('Tokens', () => {
  it('has correct color structure', () => {
    expect(tokens.colors).toHaveProperty('background');
    expect(tokens.colors.background).toBe('#050505');
    expect(tokens.colors).toHaveProperty('primary');
  });

  it('has spacing base', () => {
    expect(tokens.spacing.base).toBe(4);
  });

  it('has typography defined', () => {
    expect(tokens.typography.fontFamily.sans).toContain('Satoshi');
    expect(tokens.typography.sizes).toHaveProperty('base');
  });

  it('has detailed color tokens', () => {
    expect(tokens.colors.surface.hover).toBeDefined();
    expect(tokens.colors.surface.active).toBeDefined();
    expect(tokens.colors.border.hover).toBeDefined();
    expect(tokens.colors.text.tertiary).toBeDefined();
  });

  it('has shadow tokens', () => {
    expect(tokens.shadows.glow).toBeDefined();
    expect(tokens.shadows['glow-accent']).toBeDefined();
  });
});
