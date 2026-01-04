# Testing Documentation

## Overview

This document describes the comprehensive test suite for the Interactive Resume project. The tests ensure quality, accessibility, and functionality across all components.

## Test Structure

### Test Files

1. **`__tests__/script.test.js`** - Unit tests for JavaScript functionality
2. **`__tests__/html.validation.test.js`** - HTML structure and validation tests
3. **`__tests__/css.validation.test.js`** - CSS quality and responsive design tests
4. **`__tests__/integration.test.js`** - End-to-end integration tests

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
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

## Test Coverage

### JavaScript Functionality (`script.test.js`)

#### Smooth Scrolling Navigation
- ✅ Prevents default behavior on anchor link clicks
- ✅ Calls scrollIntoView with smooth behavior
- ✅ Sets tabindex and focus for accessibility
- ✅ Handles empty anchor links gracefully
- ✅ Handles non-existent target elements
- ✅ Attaches click listeners to all anchor links

#### Active Navigation State Management
- ✅ Adds active class to corresponding navigation link
- ✅ Removes active class from other navigation links
- ✅ Handles scroll events when no sections match
- ✅ Updates active state multiple times during scroll

#### Form Validation
- ✅ Prevents submission when name field is empty
- ✅ Prevents submission when email field is empty
- ✅ Prevents submission when message field is empty
- ✅ Trims whitespace from form fields
- ✅ Rejects invalid email formats (missing @, domain, TLD)
- ✅ Rejects emails with spaces
- ✅ Accepts valid email formats
- ✅ Allows submission when all validations pass
- ✅ Handles missing contact form gracefully

#### Intersection Observer - Animation on Scroll
- ✅ Observes all sections on page load
- ✅ Adds fade-in-visible class when section intersects
- ✅ Does not add class when section doesn't intersect
- ✅ Uses correct observer options
- ✅ Handles multiple sections intersecting

#### Keyboard Navigation
- ✅ Blurs active element when Escape key is pressed
- ✅ Handles Escape when no element is focused
- ✅ Does not affect other keys
- ✅ Handles multiple Escape key presses

#### Print Resume Functionality
- ✅ Defines printResume function
- ✅ Calls window.print when invoked
- ✅ Handles multiple print calls

#### Edge Cases and Error Handling
- ✅ Handles missing navigation elements
- ✅ Handles missing sections
- ✅ Handles scroll events with no sections
- ✅ Handles multiple DOMContentLoaded events
- ✅ Handles rapid scroll events
- ✅ Handles form with special characters
- ✅ Handles very long input values
- ✅ Handles null or undefined activeElement

#### Accessibility Features
- ✅ Sets tabindex -1 on target sections
- ✅ Maintains focus for screen reader navigation
- ✅ Provides clear error messages for validation

#### Performance and Optimization
- ✅ Attaches event listeners only once
- ✅ Handles rapid navigation clicks efficiently
- ✅ Efficiently handles intersection observer callbacks

#### Integration Tests
- ✅ Handles complete user navigation flow
- ✅ Handles complete form submission flow with validation
- ✅ Handles keyboard navigation and form interaction

### HTML Validation (`html.validation.test.js`)

#### Document Structure
- ✅ Proper DOCTYPE declaration
- ✅ HTML element with lang attribute
- ✅ Required meta tags in head
- ✅ Title element present
- ✅ Links to external CSS and JavaScript

#### SEO Optimization
- ✅ Meta description (50-160 characters)
- ✅ Meta keywords and author
- ✅ Open Graph meta tags
- ✅ Twitter Card meta tags
- ✅ Proper heading hierarchy

#### Accessibility Features
- ✅ Skip to content link
- ✅ Main element with ID for skip link
- ✅ ARIA labels on navigation
- ✅ ARIA labels on external links
- ✅ ARIA-required on required form fields
- ✅ Proper form labels
- ✅ Alt text or aria-hidden on SVG icons
- ✅ Semantic HTML5 elements

#### Favicon Configuration
- ✅ Standard favicon link
- ✅ PNG favicons in multiple sizes

#### Content Structure
- ✅ Navigation with links
- ✅ Hero, About, Experience, Skills, Contact sections
- ✅ Footer with copyright

#### Contact Form Structure
- ✅ Form with proper action attribute
- ✅ Name, email, and message fields
- ✅ Required attributes on inputs
- ✅ Submit button
- ✅ Proper form field grouping

#### Link Validation
- ✅ Valid email links
- ✅ Valid telephone links
- ✅ External links with proper attributes
- ✅ Internal anchor links

#### Contact Information
- ✅ Email address display
- ✅ Phone number display
- ✅ Location display
- ✅ GitHub and LinkedIn links

#### HTML Syntax Validation
- ✅ Matching opening and closing tags
- ✅ Properly closed self-closing tags
- ✅ No duplicate IDs
- ✅ Properly quoted attributes

#### Responsive Design Meta Tags
- ✅ Viewport meta tag with proper settings

#### Performance Optimization
- ✅ CSS loaded in head
- ✅ JavaScript loaded at end of body

#### Content Quality
- ✅ Meaningful text content
- ✅ Professional title and company name
- ✅ Skills listed

#### Security Best Practices
- ✅ rel="noopener noreferrer" on external links
- ✅ HTTPS for all external resources

### CSS Validation (`css.validation.test.js`)

#### CSS Syntax and Structure
- ✅ Valid CSS syntax with balanced braces
- ✅ Proper CSS property syntax
- ✅ No syntax errors in selectors
- ✅ Properly formatted CSS comments

#### CSS Variables and Theming
- ✅ Custom properties defined in :root
- ✅ CSS variables for colors
- ✅ var() function usage

#### Responsive Design
- ✅ Media queries present
- ✅ Mobile-first or desktop-first breakpoints
- ✅ Common breakpoint values
- ✅ Relative units for typography
- ✅ Width constraints for containers

#### Layout and Positioning
- ✅ Modern layout techniques (Flexbox/Grid)
- ✅ box-sizing: border-box
- ✅ Appropriate positioning

#### Typography
- ✅ Font families defined
- ✅ Web-safe font stack with fallbacks
- ✅ Line-height for readability
- ✅ Appropriate font sizes

#### Colors and Contrast
- ✅ Color values defined
- ✅ Background colors defined
- ✅ Consistent color format

#### Interactive Elements
- ✅ Hover states for interactive elements
- ✅ Focus styles for accessibility
- ✅ Active states for buttons/links
- ✅ Form element styles

#### Animations and Transitions
- ✅ Transitions for smooth interactions
- ✅ Animation keyframes if animations exist
- ✅ Appropriate timing functions

#### Accessibility Features
- ✅ Skip-to-content link styles
- ✅ Visible focus indicators
- ✅ Outline not removed without replacement

#### Performance Optimizations
- ✅ Shorthand properties usage
- ✅ Minimal use of universal selector
- ✅ Efficient selectors

#### CSS Best Practices
- ✅ Limited !important usage
- ✅ Semantic class names
- ✅ Consistent spacing and formatting

### Integration Tests (`integration.test.js`)

#### Complete User Journeys
- ✅ Portfolio visitor flow
- ✅ Recruiter workflow
- ✅ Screen reader user accessibility
- ✅ Mobile user experience

#### SEO and Social Sharing
- ✅ Social media crawler compatibility
- ✅ Search engine indexing

#### Error Recovery
- ✅ Missing form handling
- ✅ Missing navigation handling
- ✅ Rapid user interactions
- ✅ Form submission spam prevention

#### Performance Under Load
- ✅ Multiple simultaneous scroll events
- ✅ Multiple form validations

## Test Coverage Goals

- **Lines**: > 80%
- **Functions**: > 80%
- **Branches**: > 80%
- **Statements**: > 80%

## Continuous Integration

Tests should be run:
- Before every commit
- In pull request checks
- Before deployment

## Adding New Tests

When adding new features:

1. Write unit tests for individual functions
2. Add integration tests for user workflows
3. Update validation tests if HTML/CSS changes
4. Maintain test coverage above 80%

## Test Philosophy

- **Comprehensive**: Cover happy paths, edge cases, and error conditions
- **Maintainable**: Clear test names and structure
- **Fast**: Tests should run quickly for rapid feedback
- **Isolated**: Each test should be independent
- **Realistic**: Test real user scenarios

## Common Test Patterns

### Testing Event Handlers

```javascript
test('should handle click event', () => {
  const element = document.querySelector('.button');
  const event = new Event('click', { bubbles: true, cancelable: true });
  element.dispatchEvent(event);
  expect(/* assertion */).toBe(/* expected */);
});
```

### Testing Form Validation

```javascript
test('should validate email format', () => {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email');
  emailInput.value = 'invalid-email';
  const event = new Event('submit', { bubbles: true, cancelable: true });
  form.dispatchEvent(event);
  expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');
});
```

### Testing Accessibility

```javascript
test('should have proper ARIA attributes', () => {
  const element = document.querySelector('[aria-label]');
  expect(element.getAttribute('aria-label')).toBeTruthy();
});
```

## Troubleshooting

### Tests Failing Locally

1. Ensure Node.js and npm are installed
2. Run `npm install` to install dependencies
3. Clear cache with `npm cache clean --force`
4. Re-run tests

### Coverage Issues

- Check for uncovered branches in conditional statements
- Add tests for error handling paths
- Test edge cases and boundary conditions

## Resources

- [Jest Documentation](https://jestjs.io/)
- [jsdom Documentation](https://github.com/jsdom/jsdom)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [HTML Validation](https://validator.w3.org/)
- [CSS Validation](https://jigsaw.w3.org/css-validator/)

## Maintainers

For questions about the test suite, please contact the project maintainers.