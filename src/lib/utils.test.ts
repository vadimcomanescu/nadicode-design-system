import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('c-1', 'c-2')).toBe('c-1 c-2');
    });

    it('handles conditional classes', () => {
      const isTrue = true;
      const isFalse = false;
      expect(cn('c-1', isTrue && 'c-2', isFalse && 'c-3')).toBe('c-1 c-2');
    });

    it('merges tailwind classes', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    });
  });
});
