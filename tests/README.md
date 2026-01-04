# Test Suite for Interactive Resume

This directory contains comprehensive unit and validation tests for the interactive resume project.

## Test Files

### 1. `script.test.js` (813 lines)
Comprehensive unit tests for `script.js` covering:
- **Smooth Scrolling**: Navigation link behavior, scroll-to-section functionality
- **Active Navigation State**: Dynamic highlighting based on scroll position
- **Form Validation**: Empty field detection, email format validation, whitespace handling
- **Intersection Observer**: Section animation triggers
- **Keyboard Navigation**: Escape key to blur elements
- **Print Functionality**: Resume printing capability
- **Edge Cases**: Missing elements, rapid events, special characters, long inputs
- **Integration Tests**: Complete user flows

**Total Tests**: 60+ test cases

### 2. `html.validation.test.js` (520+ lines)
HTML structure and validation tests covering:
- **Document Structure**: DOCTYPE, html, head, body, meta tags
- **SEO Meta Tags**: Title, description, keywords, author
- **Open Graph Tags**: Social media sharing optimization
- **Twitter Card Tags**: Twitter-specific metadata
- **Favicon Configuration**: Multiple favicon formats
- **Accessibility**: Skip links, ARIA labels, semantic HTML, keyboard navigation
- **Semantic HTML**: Proper use of section, nav, main, footer elements
- **Content Sections**: Hero, about, experience, skills, contact
- **Contact Information**: Email, phone, location links
- **Social Media**: GitHub, LinkedIn with proper attributes
- **Contact Form**: Proper form structure, labels, inputs
- **Footer**: Copyright and legal information

**Total Tests**: 80+ test cases

### 3. `css.validation.test.js` (630+ lines)
CSS structure and validation tests covering:
- **CSS Variables**: Theme colors and design tokens
- **Global Styles**: Reset, box-sizing, typography
- **Accessibility**: Focus indicators, skip-to-content, high contrast
- **Navigation**: Sticky positioning, hover/focus states
- **Hero Section**: Gradient backgrounds, animations
- **Sections**: Consistent styling, shadows, spacing
- **Forms**: Input styles, focus states, validation feedback
- **Skills Layout**: CSS Grid implementation
- **Animations**: Keyframes for fade-in effects
- **Responsive Design**: Mobile breakpoints, flexible layouts
- **Print Styles**: Optimized for printing
- **Social Links**: Flexbox layout, hover effects
- **Experience Section**: Timeline styling
- **Footer**: Centered layout
- **Color Consistency**: Proper use of CSS variables
- **Layout**: Max-width, centering, spacing
- **Best Practices**: Minimal !important, relative units, performance
- **Syntax**: Balanced braces, semicolons, no empty rulesets

**Total Tests**: 90+ test cases

### 4. `setup.js`
Jest configuration and mocks:
- `@testing-library/jest-dom` matchers
- `window.alert` mock
- `window.print` mock
- `scrollIntoView` mock
- `IntersectionObserver` mock

## Running Tests

### Prerequisites
Install dependencies:
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Specific Test File
```bash
npm test -- tests/script.test.js
npm test -- tests/html.validation.test.js
npm test -- tests/css.validation.test.js
```

### Run Tests Matching a Pattern
```bash
npm test -- --testNamePattern="form validation"
npm test -- --testNamePattern="accessibility"
```

## Test Coverage Goals

The test suite aims for:
- **Functions**: 80%+ coverage
- **Lines**: 80%+ coverage
- **Branches**: 80%+ coverage
- **Statements**: 80%+ coverage

## Test Structure

Each test file follows a consistent structure:
```javascript
describe('Feature Category', () => {
  beforeEach(() => {
    // Setup code
  });
  
  describe('Specific Feature', () => {
    test('should behave in expected way', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Mocking Strategy

### DOM Mocking
Tests use `jsdom` to simulate browser environment:
- Full DOM API support
- Event simulation
- Element manipulation

### Browser API Mocks
Custom mocks for browser-specific APIs:
- `window.alert` - Tracked with Jest mock
- `window.print` - Tracked with Jest mock
- `Element.scrollIntoView` - Jest function
- `IntersectionObserver` - Custom class implementation

## Debugging Tests

### Run Single Test
```bash
npm test -- --testNamePattern="specific test name"
```

### Enable Verbose Output
```bash
npm test -- --verbose
```

### Debug in Node
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Best Practices

1. **Isolation**: Each test is independent and doesn't affect others
2. **Descriptive Names**: Test names clearly describe what is being tested
3. **Arrange-Act-Assert**: Tests follow AAA pattern
4. **Mock External Dependencies**: Network calls, timers, browser APIs
5. **Test Behavior, Not Implementation**: Focus on what the code does, not how
6. **Edge Cases**: Tests cover happy paths, edge cases, and error conditions

## Continuous Integration

Tests are designed to run in CI/CD pipelines:
- No external dependencies required
- Fast execution (< 10 seconds)
- Clear pass/fail output
- Exit codes for automation

## Adding New Tests

When adding new functionality:

1. Create test file or add to existing file
2. Follow naming convention: `*.test.js`
3. Import necessary dependencies
4. Set up test environment in `beforeEach`
5. Write descriptive test cases
6. Clean up in `afterEach` if needed
7. Run tests to verify they pass
8. Check coverage report

## Common Test Patterns

### Testing Event Listeners
```javascript
const element = document.querySelector('#myElement');
const event = new Event('click');
element.dispatchEvent(event);
expect(mockFunction).toHaveBeenCalled();
```

### Testing Async Code
```javascript
test('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBe(expectedValue);
});
```

### Testing DOM Manipulation
```javascript
const element = document.querySelector('#myElement');
myFunction();
expect(element.classList.contains('active')).toBe(true);
```

### Testing Form Validation
```javascript
const form = document.querySelector('form');
const submitEvent = new Event('submit', { cancelable: true });
form.dispatchEvent(submitEvent);
expect(global.alert).toHaveBeenCalledWith('Error message');
```

## Troubleshooting

### Tests Failing Due to Module Not Found
```bash
npm install
```

### Tests Failing Due to DOM Not Loading
Check that `jsdom` environment is configured in `jest.config.js`:
```javascript
testEnvironment: 'jsdom'
```

### Mocks Not Working
Ensure `setup.js` is configured in `jest.config.js`:
```javascript
setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [DOM Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Test Statistics

- **Total Test Files**: 4 (3 test files + 1 setup)
- **Total Test Cases**: 230+
- **Total Lines of Test Code**: 2,000+
- **Estimated Execution Time**: < 10 seconds
- **Coverage Target**: 80%+

## Maintenance

Tests should be updated when:
- New features are added
- Existing features are modified
- Bugs are discovered and fixed
- Accessibility requirements change
- Browser APIs are updated