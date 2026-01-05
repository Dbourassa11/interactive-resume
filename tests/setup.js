// Setup file for Jest tests
require('@testing-library/jest-dom');

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Mock window.requestAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => {
  callback();
  return 1;
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe(target) {
    // Simulate immediate intersection
    this.callback([{
      target,
      isIntersecting: true,
      intersectionRatio: 1
    }], this);
  }

  unobserve() {}
  disconnect() {}
};

// Mock setTimeout and clearTimeout for better test control
jest.useFakeTimers();

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});