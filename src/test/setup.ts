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
}

// Mock localStorage for theme tests
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

if (typeof window !== 'undefined' && !window.localStorage) {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
}

// Ensure localStorage methods exist (even if localStorage exists but methods are stubbed)
if (typeof window !== 'undefined' && window.localStorage) {
  const originalLocalStorage = window.localStorage;
  if (typeof originalLocalStorage.clear !== 'function') {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  }
}
