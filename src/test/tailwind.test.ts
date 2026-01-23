
import { describe, it, expect } from 'vitest';
import tailwindConfig from '../../tailwind.config.js';
import { tokens } from '../lib/tokens.config';

describe('Tailwind Configuration', () => {
  it('should extend colors with tokens', () => {
    expect(tailwindConfig.theme?.extend?.colors).toEqual(tokens.colors);
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
