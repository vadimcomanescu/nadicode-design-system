import { describe, it, expect } from 'vitest';
import {
  spring,
  springBloom,
  motionDistance,
  motionScale,
  motionBlur,
} from '../lib/animation.tokens';

describe('Animation Coherence', () => {
  describe('Spring validity (arctic)', () => {
    for (const [name, config] of Object.entries(spring)) {
      describe(`spring.${name}`, () => {
        it('has type "spring"', () => {
          expect(config.type).toBe('spring');
        });

        it('stiffness is positive and <= 1000', () => {
          expect(config.stiffness).toBeGreaterThan(0);
          expect(config.stiffness).toBeLessThanOrEqual(1000);
        });

        it('damping is positive and <= 100', () => {
          expect(config.damping).toBeGreaterThan(0);
          expect(config.damping).toBeLessThanOrEqual(100);
        });

        it('mass is positive and <= 5', () => {
          expect(config.mass).toBeGreaterThan(0);
          expect(config.mass).toBeLessThanOrEqual(5);
        });
      });
    }
  });

  describe('Spring validity (bloom)', () => {
    for (const [name, config] of Object.entries(springBloom)) {
      describe(`springBloom.${name}`, () => {
        it('has type "spring"', () => {
          expect(config.type).toBe('spring');
        });

        it('stiffness is positive and <= 1000', () => {
          expect(config.stiffness).toBeGreaterThan(0);
          expect(config.stiffness).toBeLessThanOrEqual(1000);
        });

        it('damping is positive and <= 100', () => {
          expect(config.damping).toBeGreaterThan(0);
          expect(config.damping).toBeLessThanOrEqual(100);
        });

        it('mass is positive and <= 5', () => {
          expect(config.mass).toBeGreaterThan(0);
          expect(config.mass).toBeLessThanOrEqual(5);
        });
      });
    }
  });

  describe('Spring bloom covers arctic keys', () => {
    it('springBloom has all keys from spring', () => {
      const arcticKeys = Object.keys(spring).sort();
      const bloomKeys = Object.keys(springBloom);
      for (const key of arcticKeys) {
        expect(bloomKeys, `springBloom missing key: ${key}`).toContain(key);
      }
    });
  });

  describe('Motion distance parity', () => {
    it('arctic and bloom have matching keys', () => {
      expect(Object.keys(motionDistance.bloom).sort()).toEqual(
        Object.keys(motionDistance.arctic).sort()
      );
    });

    it('all distances are > 0 and <= 200', () => {
      for (const [style, distances] of Object.entries(motionDistance)) {
        for (const [key, val] of Object.entries(distances)) {
          expect(val, `${style}.${key}`).toBeGreaterThan(0);
          expect(val, `${style}.${key}`).toBeLessThanOrEqual(200);
        }
      }
    });
  });

  describe('Motion scale parity', () => {
    it('arctic and bloom have matching keys', () => {
      expect(Object.keys(motionScale.bloom).sort()).toEqual(
        Object.keys(motionScale.arctic).sort()
      );
    });

    it('all scales are > 0 and < 1', () => {
      for (const [style, scales] of Object.entries(motionScale)) {
        for (const [key, val] of Object.entries(scales)) {
          expect(val, `${style}.${key}`).toBeGreaterThan(0);
          expect(val, `${style}.${key}`).toBeLessThan(1);
        }
      }
    });
  });

  describe('Motion blur parity', () => {
    it('arctic and bloom have matching keys', () => {
      expect(Object.keys(motionBlur.bloom).sort()).toEqual(
        Object.keys(motionBlur.arctic).sort()
      );
    });

    it('all blurs are >= 0 and <= 50', () => {
      for (const [style, blurs] of Object.entries(motionBlur)) {
        for (const [key, val] of Object.entries(blurs)) {
          expect(val, `${style}.${key}`).toBeGreaterThanOrEqual(0);
          expect(val, `${style}.${key}`).toBeLessThanOrEqual(50);
        }
      }
    });
  });
});
