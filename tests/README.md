# Test Suite Documentation

This directory contains comprehensive unit tests for the Interactive Resume project.

## Overview

The test suite includes **250+ test cases** covering all aspects of the interactive resume:
- JavaScript functionality (script.js)
- HTML structure and validation (index.html)
- CSS styling and best practices (styles.css)

## Test Files

### 1. `script.test.js` (95+ tests)
Tests all JavaScript functionality including:
- Mobile navigation (hamburger menu, menu toggling)
- Smooth scrolling for navigation links
- Scroll effects (navbar styling, parallax, active states)
- Animated counters for statistics
- Intersection Observer animations
- Contact form validation and submission
- Notification system
- Lazy loading for images
- Edge cases and error handling
- Performance optimizations
- Accessibility features

### 2. `html.validation.test.js` (95+ tests)
Validates HTML structure including:
- Document structure (DOCTYPE, meta tags, proper nesting)
- Meta tags and SEO optimization
- Navigation structure and links
- All section structures (hero, about, skills, experience, education, projects, contact)
- Contact form structure and validation
- Footer content
- Accessibility features (ARIA labels, semantic HTML)
- Social media integration
- HTML validation (no duplicate IDs, proper closing tags)
- Performance and best practices

### 3. `css.validation.test.js` (90+ tests)
Validates CSS styling including:
- CSS variables and theming
- Global styles and resets
- Typography
- Navigation styles
- All section-specific styles
- Form styles
- Animations and transitions
- Responsive design (mobile, tablet breakpoints)
- Accessibility features (focus states)
- Layout and spacing (flexbox, grid)
- Color usage and consistency
- CSS best practices
- Performance considerations
- Syntax validation
- Modern CSS features

### 4. `setup.js`
Jest configuration and browser API mocks:
- IntersectionObserver mock
- requestAnimationFrame mock
- window.scrollTo mock
- Element.scrollIntoView mock
- Global cleanup after each test

## Installation

Install the testing dependencies:

```bash
npm install
```

This installs:
- Jest (v29.7.0) - Testing framework
- @testing-library/dom (v9.3.3) - DOM utilities
- @testing-library/jest-dom (v6.1.5) - Custom matchers
- jest-environment-jsdom (v29.7.0) - Browser environment simulation

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (auto-rerun on file changes)
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run tests with verbose output
```bash
npm run test:verbose
```

### Run specific test file
```bash
npm run test:script      # JavaScript tests only
npm run test:html        # HTML validation tests only
npm run test:css         # CSS validation tests only
```

### Run tests matching a pattern
```bash
npm test -- --testNamePattern="form validation"
npm test -- --testNamePattern="navigation"
```

## Test Coverage

The test suite targets **80%+ coverage** across:
- Functions
- Lines
- Branches
- Statements

Coverage thresholds are enforced in `jest.config.js`.

### View Coverage Report

After running `npm run test:coverage`, open the HTML report:

```bash
# Linux/Mac
open coverage/lcov-report/index.html

# Windows
start coverage/lcov-report/index.html
```

## Test Structure

All tests follow the **Arrange-Act-Assert (AAA)** pattern:

```javascript
test('should do something', () => {
  // Arrange: Set up test data
  const element = document.querySelector('#myElement');
  
  // Act: Perform the action
  element.click();
  
  // Assert: Verify the result
  expect(element.classList.contains('active')).toBe(true);
});
```

## Writing New Tests

When adding new functionality, follow these steps:

1. **Identify the test file**: Add to script.test.js (JS), html.validation.test.js (HTML), or css.validation.test.js (CSS)

2. **Create a describe block** (or add to existing):
```javascript
describe('New Feature', () => {
  test('should handle feature correctly', () => {
    // Test implementation
  });
});
```

3. **Write comprehensive tests**:
   - Happy path (normal usage)
   - Edge cases (boundary conditions)
   - Error cases (invalid input, missing elements)
   - Accessibility (keyboard navigation, ARIA)

4. **Run tests to verify**:
```bash
npm test
```

5. **Check coverage**:
```bash
npm run test:coverage
```

## Common Test Patterns

### Testing DOM Manipulation
```javascript
test('should add class on click', () => {
  const button = document.querySelector('#myButton');
  button.click();
  expect(button.classList.contains('active')).toBe(true);
});
```

### Testing Event Listeners
```javascript
test('should handle click events', () => {
  const element = document.querySelector('#myElement');
  const clickEvent = new MouseEvent('click', { bubbles: true });
  element.dispatchEvent(clickEvent);
  expect(mockFunction).toHaveBeenCalled();
});
```

### Testing Form Validation
```javascript
test('should validate email format', () => {
  const form = document.getElementById('contactForm');
  document.getElementById('email').value = 'invalid-email';
  form.dispatchEvent(new Event('submit', { cancelable: true }));
  // Assert validation failed
});
```

### Testing Scroll Effects
```javascript
test('should change navbar on scroll', () => {
  Object.defineProperty(window, 'pageYOffset', { value: 200 });
  window.dispatchEvent(new Event('scroll'));
  const navbar = document.querySelector('.navbar');
  expect(navbar.style.background).toBeTruthy();
});
```

### Testing Animations
```javascript
test('should animate counter to target value', (done) => {
  const stat = document.querySelector('.stat-number');
  setTimeout(() => {
    const target = parseInt(stat.getAttribute('data-target'));
    expect(parseInt(stat.textContent)).toBe(target);
    done();
  }, 2500);
});
```

### Testing HTML Structure
```javascript
test('should have proper document structure', () => {
  expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
  expect(htmlContent).toMatch(/<html[^>]+lang=/i);
});
```

### Testing CSS Properties
```javascript
test('should use CSS Grid for layout', () => {
  const gridStyles = cssContent.match(/\.my-grid\s*{[^}]*}/s);
  expect(gridStyles[0]).toMatch(/display:\s*grid/i);
});
```

## Debugging Tests

### Run a single test
```bash
npm test -- --testNamePattern="should validate email"
```

### Run tests in a specific file
```bash
npm test script.test.js
```

### Enable verbose output
```bash
npm run test:verbose
```

### Debug with Node inspector
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Continuous Integration

These tests are designed for CI/CD pipelines. Example GitHub Actions workflow:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## Troubleshooting

### Tests fail with "Cannot find module"
```bash
npm install
```

### DOM elements not found
- Verify jsdom is configured in `jest.config.js`
- Check that HTML is loaded correctly in `beforeEach`

### Mocks not working
- Check that `setup.js` is loaded in `jest.config.js`
- Verify mock is called before the code that uses it

### Coverage below threshold
- Add more test cases for uncovered code
- Or adjust thresholds in `jest.config.js`

### Tests timeout
- Increase timeout: `jest.setTimeout(10000)`
- Or use `done()` callback properly in async tests

## Best Practices

1. **Keep tests isolated**: Each test should be independent
2. **Use descriptive names**: Test names should clearly state what they test
3. **Test one thing**: Each test should verify one specific behavior
4. **Mock external dependencies**: Don't rely on network, file system, etc.
5. **Clean up**: Use `afterEach` to reset state between tests
6. **Avoid implementation details**: Test behavior, not internal structure
7. **Write tests first**: Consider TDD for new features
8. **Maintain tests**: Update tests when functionality changes

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [jsdom Documentation](https://github.com/jsdom/jsdom)
- [Testing Best Practices](https://testingjavascript.com/)

## Test Statistics

- **Total Test Files**: 3
- **Total Test Cases**: 250+
- **Lines of Test Code**: 2,500+
- **Coverage Target**: 80%+
- **Execution Time**: < 15 seconds

## Support

For issues or questions about the test suite:
1. Check this documentation
2. Review test output for specific failures
3. Examine the test file for examples
4. Consult Jest documentation

---

**Last Updated**: 2025-01-04
**Jest Version**: 29.7.0
**Status**: ✅ All tests passing