# Interactive Resume

A modern, responsive, and interactive personal resume website hosted on GitHub Pages.

## Features

- 🎨 Modern and professional design
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- 🎯 Interactive navigation
- 📊 Animated statistics and skill bars
- 💼 Project showcase with hover effects
- 📧 Contact form with validation
- 🌐 Hosted on GitHub Pages

## Sections

- **Home/Hero**: Eye-catching introduction with call-to-action buttons
- **About**: Personal introduction with animated statistics
- **Skills**: Technical skills organized by category with progress bars
- **Experience**: Timeline of work experience
- **Education**: Academic background and certifications
- **Projects**: Portfolio of featured projects
- **Contact**: Contact information and form

## Customization

To personalize this resume for yourself:

1. **Personal Information**: Edit `index.html` and replace:
   - Your Name (in hero section and title)
   - Professional Title
   - Social media links (GitHub, LinkedIn, Twitter, Email)
   - Contact information (email, phone, location)

2. **About Section**: Update the about text and statistics in `index.html`

3. **Skills**: Modify skill categories and proficiency levels in `index.html`

4. **Experience**: Add/edit your work experience in the timeline section

5. **Education**: Update educational background and certifications

6. **Projects**: Replace placeholder projects with your actual projects
   - Update project images (replace placeholder URLs)
   - Add GitHub/demo links
   - Update project descriptions and technologies

7. **Colors**: Customize the color scheme in `styles.css` by modifying CSS variables in `:root`

## Deployment to GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select the branch (usually `main` or `master`)
4. Select `/root` as the folder
5. Click "Save"
6. Your site will be available at: `https://[username].github.io/interactive-resume/`

## Local Development

To view the website locally:

1. Clone this repository
2. Open `index.html` in your web browser
3. No build process required - it's pure HTML, CSS, and JavaScript!

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- System fonts (for performance)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Credits

Created with ❤️ using modern web technologies.

## Testing

This project includes a comprehensive test suite with 280+ test cases covering all aspects of the interactive resume.

### Test Coverage

The test suite validates:

1. **JavaScript Functionality** (`tests/script.test.js` - 817 lines, 100+ tests)
   - Mobile navigation toggle and menu closing
   - Smooth scrolling to sections
   - Navbar scroll effects and styling
   - Parallax animations in hero section
   - Active navigation link highlighting
   - Animated statistics counters
   - Skill bar progress animations
   - Contact form validation (required fields, email format)
   - Notification system (success/error messages)
   - Intersection Observer for scroll animations
   - Image lazy loading
   - Edge cases and error handling

2. **HTML Structure** (`tests/html.validation.test.js` - 696 lines, 110+ tests)
   - Valid DOCTYPE and document structure
   - SEO meta tags and Open Graph
   - Semantic HTML5 elements
   - All content sections (Hero, About, Skills, Experience, Education, Projects, Contact)
   - Navigation structure and links
   - Form elements and accessibility
   - Proper heading hierarchy
   - Image alt attributes
   - ARIA labels and roles
   - No duplicate IDs

3. **CSS Styling** (`tests/css.validation.test.js` - 859 lines, 130+ tests)
   - CSS custom properties (variables)
   - Global reset and typography
   - Navigation and mobile menu styles
   - Hero section animations
   - All section layouts
   - Skill bars and progress indicators
   - Timeline styles for experience
   - Project cards and overlays
   - Form styling and focus states
   - Responsive design (media queries)
   - Animations and transitions
   - Accessibility (focus indicators, color contrast)
   - Performance optimizations
   - Best practices (minimal !important, proper syntax)

### Running Tests

#### Installation
```bash
npm install
```

#### Available Commands
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
npm run test:script    # JavaScript functionality tests
npm run test:html      # HTML structure tests
npm run test:css       # CSS styling tests

# Run tests matching a pattern
npm test -- --testNamePattern="form validation"
```

#### Coverage Report

After running `npm run test:coverage`, open the HTML report:

```bash
# The coverage summary is shown in the terminal
# Detailed HTML report is available at:
open coverage/lcov-report/index.html
```

### Coverage Goals

All tests target **80%+ coverage** across:
- Functions
- Lines
- Branches
- Statements

These thresholds are enforced in `jest.config.js`.

### Test Technologies

- **Jest** (v29.7.0) - Testing framework
- **jsdom** - DOM simulation for browser environment
- **@testing-library/jest-dom** (v6.1.5) - Custom DOM matchers
- **@testing-library/dom** (v9.3.3) - DOM testing utilities

### Continuous Integration

The test suite is designed for CI/CD pipelines. Example GitHub Actions workflow:

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

### Test Structure

All tests follow the **Arrange-Act-Assert (AAA)** pattern:

```javascript
test('should validate email format', () => {
  // Arrange: Set up test data
  const form = document.getElementById('contactForm');
  document.getElementById('email').value = 'invalid-email';
  
  // Act: Perform the action
  form.dispatchEvent(new Event('submit'));
  
  // Assert: Verify the result
  const notification = document.querySelector('.notification');
  expect(notification.textContent).toContain('valid email address');
});
```

### Adding New Tests

When adding new features:

1. Determine the appropriate test file (script, HTML, or CSS)
2. Add tests following existing patterns
3. Use descriptive test names
4. Test both happy paths and edge cases
5. Run tests: `npm test`
6. Check coverage: `npm run test:coverage`

For detailed testing documentation, see [tests/README.md](tests/README.md).

### Test Statistics

- **Total Test Cases**: 280+
- **Lines of Test Code**: 2,400+
- **Test Files**: 3 (+ 1 setup file)
- **Coverage Target**: 80%+
- **Estimated Execution Time**: < 15 seconds

