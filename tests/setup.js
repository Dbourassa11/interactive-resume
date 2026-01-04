// Jest setup file
require('@testing-library/jest-dom');

// Mock window.alert
global.alert = jest.fn();

// Mock window.print
global.print = jest.fn();

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  
  observe(target) {
    // Simulate immediate intersection for testing
    this.callback([{
      target,
      isIntersecting: true,
      intersectionRatio: 1
    }], this);
  }
  
  unobserve() {}
  disconnect() {}
};