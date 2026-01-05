// Setup file for Jest tests
require('@testing-library/jest-dom');

// Mock window.alert
global.alert = jest.fn();

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.elements = [];
  }

  observe(element) {
    this.elements.push(element);
    // Simulate immediate intersection
    this.callback([{
      target: element,
      isIntersecting: true,
      intersectionRatio: 1
    }], this);
  }

  unobserve(element) {
    this.elements = this.elements.filter(el => el !== element);
  }

  disconnect() {
    this.elements = [];
  }
};

// Mock console methods for cleaner test output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};