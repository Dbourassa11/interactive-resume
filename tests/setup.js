// Setup file for Jest tests
// This file runs before each test file

// Mock console methods to reduce noise in test output
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock requestAnimationFrame for tests
global.requestAnimationFrame = (cb) => {
  return setTimeout(cb, 0);
};

// Mock cancelAnimationFrame
global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observedElements = [];
  }

  observe(element) {
    this.observedElements.push(element);
    // Immediately trigger callback for testing
    this.callback([{
      target: element,
      isIntersecting: true,
      intersectionRatio: 1
    }], this);
  }

  unobserve(element) {
    this.observedElements = this.observedElements.filter(el => el !== element);
  }

  disconnect() {
    this.observedElements = [];
  }
};

// Setup DOM helper
global.createDOM = (htmlString) => {
  document.body.innerHTML = htmlString;
};

// Cleanup helper
afterEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
});