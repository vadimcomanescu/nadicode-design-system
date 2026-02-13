import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VantaWrapper } from './VantaWrapper';

describe('VantaWrapper', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('initializes Vanta effect with defaults and custom config', async () => {
    vi.useFakeTimers();

    const destroy = vi.fn();
    const effectFactory = vi.fn(() => ({ destroy }));
    const effectImporter = vi.fn(async () => ({ default: effectFactory }));

    const { container } = render(
      <VantaWrapper
        effectImporter={effectImporter}
        config={{ color: 0x38bdb8 }}
        className="custom-wrapper"
      >
        <div>Vanta content</div>
      </VantaWrapper>
    );

    await vi.runAllTimersAsync();

    expect(screen.getByText('Vanta content')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('custom-wrapper');
    expect(effectImporter).toHaveBeenCalledTimes(1);
    expect(effectFactory).toHaveBeenCalledTimes(1);
    expect(effectFactory).toHaveBeenCalledWith(
      expect.objectContaining({
        el: expect.any(HTMLElement),
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color: 0x38bdb8,
      })
    );
    expect((window as unknown as Record<string, unknown>).THREE).toBeDefined();
  });

  it('destroys existing Vanta instance on unmount', async () => {
    vi.useFakeTimers();

    const destroy = vi.fn();
    const effectFactory = vi.fn(() => ({ destroy }));
    const effectImporter = vi.fn(async () => ({ default: effectFactory }));

    const { unmount } = render(
      <VantaWrapper effectImporter={effectImporter}>
        <div>Child</div>
      </VantaWrapper>
    );

    await vi.runAllTimersAsync();
    unmount();

    expect(destroy).toHaveBeenCalledTimes(1);
  });
});
