# Test Suite Documentation

This directory contains comprehensive unit tests for the Interactive Resume project.

## Overview

The test suite includes over 280 test cases covering:
- JavaScript functionality (script.js)
- HTML structure and validation (index.html)
- CSS styling and best practices (styles.css)

## Test Files

### 1. `script.test.js` (817 lines)
Comprehensive tests for all JavaScript functionality including:
- Mobile navigation toggle
- Smooth scrolling
- Navbar scroll effects
- Parallax animations
- Active navigation highlighting
- Animated counters
- Skill bar animations
- Contact form validation
- Notification system
- Intersection Observer
- Image lazy loading
- Edge cases and error handling

### 2. `html.validation.test.js` (696 lines)
Tests for HTML structure, semantics, and accessibility:
- Document structure validation
- Meta tags and SEO
- CSS and JavaScript resources
- Navigation structure
- All content sections (Hero, About, Skills, Experience, Education, Projects, Contact)
- Footer
- Accessibility features
- HTML syntax validation
- Performance best practices

### 3. `css.validation.test.js` (859 lines)
Tests for CSS styling, responsiveness, and best practices:
- CSS variables and theming
- Global styles and reset
- Navigation styles
- Hero section styles
- Section styles
- Skills section styles
- Timeline styles
- Project cards
- Form styles
- Statistics/counters
- Education cards
- Footer styles
- Animations and transitions
- Responsive design
- Accessibility features
- Typography
- Layout and spacing
- Performance considerations
- Best practices and code quality

### 4. `setup.js` (31 lines)
Jest configuration and browser API mocks:
- Mock for window.scrollTo
- Mock for requestAnimationFrame
- Mock for IntersectionObserver
- Fake timers setup

## Running Tests

### Prerequisites
```bash
npm install
```

### Available Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with verbose output
npm run test:verbose

# Run specific test file
npm run test:script      # JavaScript tests
npm run test:html        # HTML validation tests
npm run test:css         # CSS validation tests

# Run tests matching a pattern
npm test -- --testNamePattern="form validation"
```

### Coverage Report

After running `npm run test:coverage`, view the report:
```bash
# Terminal summary is displayed automatically

# Open HTML report in browser
open coverage/lcov-report/index.html  # macOS
xdg-open coverage/lcov-report/index.html  # Linux
start coverage/lcov-report/index.html  # Windows
```

## Test Structure

All tests follow the Arrange-Act-Assert (AAA) pattern:

```javascript
test('should do something specific', () => {
  // Arrange: Set up test data and conditions
  const element = document.querySelector('#myElement');
  
  // Act: Perform the action being tested
  element.click();
  
  // Assert: Verify the expected outcome
  expect(element.classList.contains('active')).toBe(true);
});
```

## Coverage Goals

All tests target **80%+ coverage** across:
- Functions
- Lines
- Branches
- Statements

Current thresholds are enforced in `jest.config.js`.

## Adding New Tests

When adding new functionality:

1. Determine the appropriate test file based on the code location
2. Add tests following the existing patterns
3. Use descriptive test names that explain what is being tested
4. Test both happy paths and edge cases
5. Mock external dependencies appropriately
6. Run tests to verify: `npm test`
7. Check coverage: `npm run test:coverage`

Example:
```javascript
describe('New Feature', () => {
  test('should handle the main use case', () => {
    // Test implementation
  });

  test('should handle edge case with invalid input', () => {
    // Test implementation
  });

  test('should handle missing elements gracefully', () => {
    // Test implementation
  });
});
```

## Mocking Strategy

### Browser APIs
- `window.scrollTo` - Mocked to prevent actual scrolling
- `requestAnimationFrame` - Mocked for synchronous execution
- `IntersectionObserver` - Mocked to simulate element visibility

### Timers
- Jest fake timers are used for testing time-dependent code
- Use `jest.runAllTimers()` or `jest.advanceTimersByTime(ms)` in tests

### DOM
- jsdom provides a simulated browser environment
- Full HTML is loaded before each test suite
- DOM is reset between individual tests

## Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Clarity**: Test names should clearly describe what is being tested
3. **Completeness**: Test both success and failure scenarios
4. **Performance**: Keep tests fast by avoiding unnecessary delays
5. **Maintainability**: Update tests when functionality changes

## Troubleshooting

### Common Issues

**Tests fail with "Cannot find module"**
```bash
Solution: npm install
```

**DOM elements not found**
```bash
Solution: Verify jsdom is configured correctly in jest.config.js
```

**Mocks not working**
```bash
Solution: Check setup.js is loaded in jest.config.js setupFilesAfterEnv
```

**Timeout errors**
```bash
Solution: Tests using timers may need jest.runAllTimers()
```

**Coverage below threshold**
```bash
Solution: Add more test cases or adjust thresholds in jest.config.js
```

## Continuous Integration

The test suite is designed for CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
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

## Technologies

- **Jest** (v29.7.0) - Testing framework
- **jsdom** - DOM simulation
- **@testing-library/jest-dom** (v6.1.5) - Custom DOM matchers
- **@testing-library/dom** (v9.3.3) - DOM testing utilities

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [jsdom Documentation](https://github.com/jsdom/jsdom)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## Test Statistics

- **Total Test Cases**: 280+
- **Total Lines of Test Code**: 2,400+
- **Test Files**: 3
- **Coverage Target**: 80%+
- **Estimated Execution Time**: < 15 seconds

## Maintenance

Tests should be updated when:
- New features are added
- Existing features are modified
- Bugs are fixed (add regression tests)
- Accessibility requirements change
- Browser APIs are updated
- Dependencies are upgraded

---

For more information about the project, see the main [README.md](../README.md).