import '@testing-library/jest-dom';

// Needed for Radix UI Select to work in JSDOM.
// https://github.com/radix-ui/primitives/issues/1220#issuecomment-1126785647
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit = {}) {
    super(type, props);
    this.button = props.button ?? 0;
    this.ctrlKey = props.ctrlKey ?? false;
    this.pointerType = props.pointerType ?? 'mouse';
  }
}

if (typeof window !== 'undefined') {
  // Mock matchMedia for useReducedMotion and similar hooks
  if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  }

  if (!window.PointerEvent) {
    window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
  }

  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }

  if (!window.HTMLElement.prototype.releasePointerCapture) {
    window.HTMLElement.prototype.releasePointerCapture = () => {};
  }

  if (!window.HTMLElement.prototype.hasPointerCapture) {
    window.HTMLElement.prototype.hasPointerCapture = () => false;
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] { return []; }
    } as unknown as typeof window.IntersectionObserver;
  }

  if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof window.ResizeObserver;
  }
}

// Mock localStorage for theme tests
const localStorageMock: Storage = (() => {
  const store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key])
    },
    key: (index: number) => {
      return Object.keys(store)[index] ?? null
    },
    get length() {
      return Object.keys(store).length
    },
  } as Storage
})()

if (typeof window !== "undefined") {
  // Avoid touching jsdom's localStorage directly so we don't trigger
  // internal warnings about missing --localstorage-file support.
  try {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
      configurable: true,
    })
  } catch {
    // Fallback for environments where localStorage is non-configurable.
    (window as unknown as { localStorage: Storage }).localStorage = localStorageMock
  }
}

if (typeof window !== "undefined") {
  const originalGetBoundingClientRect = window.Element.prototype.getBoundingClientRect

  Object.defineProperty(window.Element.prototype, "getBoundingClientRect", {
    configurable: true,
    value(): DOMRect {
      const rect = originalGetBoundingClientRect.call(this)
      const element = this as Element
      const isChartElement = element.closest?.("[data-chart]") !== null

      if (isChartElement && rect.width === 0 && rect.height === 0) {
        return {
          ...rect,
          width: 1024,
          height: 300,
          top: 0,
          right: 1024,
          bottom: 300,
          left: 0,
          x: 0,
          y: 0,
          toJSON() {
            return {
              x: 0,
              y: 0,
              width: 1024,
              height: 300,
              top: 0,
              right: 1024,
              bottom: 300,
              left: 0,
            }
          },
        }
      }

      return rect
    },
  })
}
