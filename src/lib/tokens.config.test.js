import { describe, it, expect } from 'vitest';
import { tokens } from './tokens.config.js';

describe('Token Configuration', () => {
  it('should define color tokens', () => {
    expect(tokens.colors).toBeDefined();
    expect(tokens.colors.background).toBe('#050505');
    expect(tokens.colors.primary.DEFAULT).toBe('#FFFFFF');
    expect(tokens.colors.accent.DEFAULT).toBe('#3B82F6');
  });

  it('should define typography tokens', () => {
    expect(tokens.typography).toBeDefined();
    expect(tokens.typography.fontFamily.sans).toContain('Inter');
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
