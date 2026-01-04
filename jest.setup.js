// Jest setup file for custom matchers and global test utilities
require('@testing-library/jest-dom');

// Mock window.alert for tests
global.alert = jest.fn();

// Mock window.print for tests
global.print = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  observe(target) {
    // Simulate intersection immediately for testing
    this.callback([{ target, isIntersecting: true }]);
  }
  unobserve() {}
  disconnect() {}
};

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();