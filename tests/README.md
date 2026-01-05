# Test Suite Documentation

This directory contains comprehensive unit tests for the Interactive Resume project.

## Overview

The test suite provides thorough coverage of all JavaScript functionality, HTML structure validation, and CSS quality checks. Tests are written using Jest with jsdom for DOM manipulation testing.

## Test Files

### 1. `script.test.js`
Comprehensive unit tests for `script.js` covering:
- **Mobile Navigation**: Hamburger menu toggle, menu closing on link click
- **Smooth Scrolling**: Navigation link behavior, offset calculations
- **Scroll Handler**: Navbar styling changes, parallax effects, active link highlighting
- **Animated Counters**: Counter animations, timing, multiple counter handling
- **Intersection Observer**: Element animations, stats triggering, skill bar animations
- **Contact Form**: Validation, email format checking, form submission, notification system
- **Notification System**: Display, timing, styling, auto-removal
- **Image Lazy Loading**: IntersectionObserver setup, image loading
- **Hero Typing Effect**: Text preservation, opacity handling
- **Edge Cases**: Missing elements, error handling, empty DOM scenarios

### 2. `html.validation.test.js`
HTML structure and validation tests covering:
- **Document Structure**: DOCTYPE, html/head/body tags, proper nesting
- **Meta Tags**: Charset, viewport, description, title
- **Stylesheet Links**: CSS files, Font Awesome CDN
- **Navigation**: Nav element, links, hamburger menu, list structure
- **Sections**: Hero, about, skills, experience, education, projects, contact
- **Semantic HTML**: Proper heading hierarchy, section tags, footer
- **Accessibility**: ARIA labels, alt attributes, keyboard navigation, focus management
- **Form Structure**: Input fields, labels, validation attributes
- **Links**: External links, internal anchors, security attributes
- **Content Structure**: Containers, grids, cards, timelines
- **Data Attributes**: Counter targets, progress bar widths
- **Icons**: Font Awesome usage
- **Best Practices**: Lowercase tags, proper indentation, tag closing
- **SEO**: Title, meta description, heading hierarchy
- **Responsive Design**: Viewport meta, container classes, grid layouts
- **Performance**: Script positioning, CDN usage

### 3. `css.validation.test.js`
CSS quality and validation tests covering:
- **CSS Reset**: Universal selector, box-sizing
- **Custom Properties**: Color variables, transition variables, shadow variables
- **Layout**: Container styles, max-width, centering
- **Smooth Scrolling**: HTML scroll-behavior
- **Navigation**: Navbar positioning, z-index, flexbox, hover effects
- **Hero Section**: Min-height, flexbox, gradients, parallax setup
- **Sections**: Padding, background colors, section titles
- **Buttons**: Primary/secondary styles, hover effects, transforms
- **Statistics**: Stats grid, counter styles
- **Skills**: Skills grid, progress bars, animations
- **Timeline**: Timeline structure, dots, content
- **Project Cards**: Grid layout, image overlays, tags, shadows
- **Education**: Grid layout, card styles, icons
- **Contact**: Form styles, input styling, focus states
- **Footer**: Footer layout, links
- **Animations**: Transitions, keyframes, transforms
- **Media Queries**: Responsive breakpoints, mobile navigation
- **Flexbox**: Display, direction, justify, align
- **Grid**: Grid templates, columns, gaps
- **Typography**: Font sizes, weights, alignment
- **Colors**: Gradients, rgba, gradient text
- **Shadows**: Box-shadow, depth effects
- **Positioning**: Fixed, relative, absolute
- **Best Practices**: !important usage, lowercase properties, shorthand
- **Accessibility**: Focus styles, contrast
- **Vendor Prefixes**: Webkit prefixes

### 4. `setup.js`
Test configuration and utilities:
- Mock console methods to reduce test noise
- Mock requestAnimationFrame for animation testing
- Mock IntersectionObserver for scroll animations
- DOM setup and cleanup helpers
- Test isolation between runs

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test:watch
```

### Run Tests with Coverage
```bash
npm test:coverage
```

### Run Specific Test File
```bash
npm test script.test.js
npm test html.validation.test.js
npm test css.validation.test.js
```

## Test Coverage Goals

The test suite aims for:
- **Branches**: 70%+
- **Functions**: 70%+
- **Lines**: 70%+
- **Statements**: 70%+

## Test Structure

Each test file follows this structure:

```javascript
describe('Feature Group', () => {
  beforeAll(() => {
    // Setup that runs once before all tests
  });

  beforeEach(() => {
    // Setup that runs before each test
  });

  describe('Specific Feature', () => {
    test('should do something specific', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Key Testing Patterns

### DOM Testing
```javascript
// Create DOM structure
document.body.innerHTML = `<div class="test">Content</div>`;

// Trigger events
element.click();
window.dispatchEvent(new Event('scroll'));

// Assert changes
expect(element.classList.contains('active')).toBe(true);
```

### Async Testing
```javascript
test('should animate counter', (done) => {
  // Setup
  triggerAnimation();
  
  // Wait for animation
  setTimeout(() => {
    expect(counter.textContent).toBe('100');
    done();
  }, 2500);
});
```

### Mock Testing
```javascript
const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
// Trigger scroll
expect(scrollToSpy).toHaveBeenCalledWith({
  top: 930,
  behavior: 'smooth'
});
scrollToSpy.mockRestore();
```

## Writing New Tests

When adding new features:

1. **Add tests first** (TDD approach) or immediately after
2. **Follow existing patterns** for consistency
3. **Test happy paths and edge cases**
4. **Mock external dependencies**
5. **Use descriptive test names**
6. **Group related tests** in describe blocks
7. **Clean up after tests** to prevent pollution

## Common Test Scenarios

### Testing User Interactions
```javascript
test('should toggle menu on click', () => {
  const button = document.querySelector('.hamburger');
  button.click();
  expect(menu.classList.contains('active')).toBe(true);
});
```

### Testing Form Validation
```javascript
test('should validate email format', () => {
  emailInput.value = 'invalid-email';
  form.dispatchEvent(new Event('submit'));
  expect(notification).toContain('valid email');
});
```

### Testing Animations
```javascript
test('should apply parallax effect', () => {
  Object.defineProperty(window, 'pageYOffset', { value: 200 });
  window.dispatchEvent(new Event('scroll'));
  expect(heroContent.style.transform).toBe('translateY(100px)');
});
```

## Continuous Integration

Tests are designed to run in CI/CD pipelines:
- Fast execution (< 10 seconds typical)
- No external dependencies
- Deterministic results
- Clear failure messages

## Troubleshooting

### Tests Failing Locally
1. Ensure all dependencies are installed: `npm install`
2. Clear Jest cache: `npx jest --clearCache`
3. Check Node version (14+ recommended)

### Timeout Issues
Increase Jest timeout in specific tests:
```javascript
test('long running test', (done) => {
  // test code
}, 10000); // 10 second timeout
```

### Mock Not Working
Ensure mocks are restored:
```javascript
afterEach(() => {
  jest.restoreAllMocks();
});
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how
2. **Keep Tests Independent**: Each test should run in isolation
3. **Use Meaningful Assertions**: Make it clear what's being tested
4. **Avoid Test Duplication**: Use helper functions for repeated setup
5. **Test Edge Cases**: Empty inputs, missing elements, error conditions
6. **Keep Tests Fast**: Mock expensive operations
7. **Write Maintainable Tests**: Clear, readable, well-organized

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

## Contributing

When contributing tests:
1. Ensure all tests pass: `npm test`
2. Maintain or improve coverage: `npm test:coverage`
3. Follow existing naming conventions
4. Add documentation for complex test scenarios
5. Review test output for clarity