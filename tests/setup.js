// tests/setup.js - Jest setup file for browser environment mocks

// Import jest-dom for custom matchers
require('@testing-library/jest-dom');

// Mock browser APIs that aren't available in jsdom

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Mock window.alert
global.alert = jest.fn();

// Mock Element.prototype.scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.elements = new Set();
  }
  
  observe(target) {
    this.elements.add(target);
    // Simulate immediate intersection
    this.callback([{
      target,
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRect: target.getBoundingClientRect(),
      rootBounds: null,
      time: Date.now()
    }], this);
  }
  
  unobserve(target) {
    this.elements.delete(target);
  }
  
  disconnect() {
    this.elements.clear();
  }
};

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 16); // ~60fps
  return 1;
});

// Mock cancelAnimationFrame
global.cancelAnimationFrame = jest.fn();

// Set up a mock window.innerHeight
Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768
});

// Mock pageYOffset
Object.defineProperty(window, 'pageYOffset', {
  writable: true,
  configurable: true,
  value: 0
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});