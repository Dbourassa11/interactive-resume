# Interactive Resume - Test Suite Documentation

## Overview

This comprehensive test suite provides thorough unit and validation testing for the interactive resume project. The tests cover JavaScript functionality, HTML structure validation, and CSS rule verification.

## Test Files

### 1. `script.test.js` (JavaScript Unit Tests)
**Lines of Code:** ~700+  
**Test Count:** 70+ tests

Comprehensive testing of all JavaScript functionality including:

#### Smooth Scrolling
- Anchor link click handling
- ScrollIntoView behavior
- Accessibility focus management
- Edge cases for invalid targets

#### Navigation State Management
- Active class toggling on scroll
- Scroll offset calculations (150px threshold)
- Multiple section handling
- Edge cases for missing elements

#### Form Validation
- Empty field detection
- Email regex validation
- Whitespace trimming
- Multiple email format tests
- Valid submission handling

#### Intersection Observer
- Animation triggering
- Section observation
- Fade-in effects
- Multiple intersection handling

#### Keyboard Navigation
- Escape key functionality
- Element blur behavior
- Multiple key press handling

#### Integration Tests
- Complete user workflows
- Accessibility flows
- Error handling scenarios

### 2. `html.validation.test.js` (HTML Structure Tests)
**Lines of Code:** ~500+  
**Test Count:** 60+ tests

Validates HTML structure, semantics, and accessibility:

#### Document Structure
- DOCTYPE and HTML5 compliance
- Meta tags (charset, viewport)
- Title and description
- External resource links

#### SEO Optimization
- Meta description
- Keywords
- Author information
- Open Graph tags
- Twitter Card tags

#### Accessibility
- Skip-to-content link
- ARIA labels and roles
- Semantic HTML elements
- Form labels and associations
- Keyboard navigation support

#### Content Validation
- Proper heading hierarchy
- Navigation structure
- Contact information
- Form structure
- Link security attributes

### 3. `css.validation.test.js` (CSS Rule Tests)
**Lines of Code:** ~600+  
**Test Count:** 80+ tests

Validates CSS rules, variables, and responsive design:

#### CSS Variables
- Color scheme variables
- Typography variables
- Transition variables

#### Layout & Components
- Navigation styling
- Hero section
- Content sections
- Skills grid
- Contact form
- Footer

#### Animations
- Keyframe definitions
- Animation applications
- Transform effects

#### Responsive Design
- Mobile breakpoints (768px)
- Grid adjustments
- Font size scaling
- Navigation adaptation

#### Print Styles
- Hidden elements
- Background adjustments
- Page break control

#### Accessibility
- Focus states
- Color contrast
- Skip-to-content visibility

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Or if you prefer yarn
yarn install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage Goals

The test suite aims for:
- **Branches:** 80%+
- **Functions:** 80%+
- **Lines:** 80%+
- **Statements:** 80%+

## Test Structure

Each test file follows this structure:

```javascript
describe('Feature/Component', () => {
  beforeEach(() => {
    // Setup code
  });
  
  afterEach(() => {
    // Cleanup code
  });
  
  describe('Sub-feature', () => {
    test('should do something specific', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Mocking Strategy

The test suite uses Jest's mocking capabilities for:

- **window.alert**: Prevents actual alerts during testing
- **window.print**: Prevents print dialog
- **IntersectionObserver**: Simulates intersection events
- **scrollIntoView**: Prevents actual scrolling

## Key Testing Patterns

### 1. DOM Manipulation Tests
```javascript
// Load actual HTML
const html = fs.readFileSync('./index.html', 'utf8');
document.documentElement.innerHTML = html;

// Test interactions
const button = document.querySelector('button');
button.click();
expect(/* assertion */);
```

### 2. Event Handler Tests
```javascript
// Trigger event
const event = new Event('DOMContentLoaded');
document.dispatchEvent(event);

// Verify behavior
expect(/* assertion */);
```

### 3. Validation Tests
```javascript
// Test form validation
form.dispatchEvent(new Event('submit'));
expect(global.alert).toHaveBeenCalledWith('error message');
```

## Continuous Integration

These tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions configuration
- name: Run Tests
  run: npm test
  
- name: Upload Coverage
  run: npm run test:coverage
```

## Troubleshooting

### Common Issues

1. **Tests failing due to missing HTML/CSS/JS files**
   - Ensure all source files are in the repository root
   - Check file paths in test files

2. **IntersectionObserver errors**
   - Mock is defined in `jest.setup.js`
   - Ensure setup file is loaded

3. **DOM not available**
   - Check `testEnvironment: 'jsdom'` in jest config
   - Verify jest-environment-jsdom is installed

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure tests cover:
   - Happy path
   - Edge cases
   - Error conditions
3. Maintain or improve coverage percentages
4. Use descriptive test names

## Test Naming Conventions

- **describe()**: Name the feature or component
- **test()**: Start with "should" + specific behavior
- Be specific and descriptive

Examples:
```javascript
describe('Form Validation', () => {
  test('should prevent submission when email is invalid', () => {
    // ...
  });
  
  test('should trim whitespace from input fields', () => {
    // ...
  });
});
```

## Maintenance

- Review tests when modifying source code
- Update mocks if browser APIs change
- Keep test dependencies up to date
- Run full test suite before committing

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [JSDOM](https://github.com/jsdom/jsdom)
- [Web Accessibility](https://www.w3.org/WAI/)

## License

Tests are part of the interactive resume project and follow the same license.