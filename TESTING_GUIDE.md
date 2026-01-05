# Quick Start Testing Guide

## Installation

```bash
npm install
```

## Run Tests

```bash
# All tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Specific file
npm run test:script
npm run test:html
npm run test:css
```

## What Gets Tested

### JavaScript (script.js)
- ✅ Mobile navigation
- ✅ Smooth scrolling
- ✅ Form validation
- ✅ Animations
- ✅ Event handlers

### HTML (index.html)
- ✅ Document structure
- ✅ SEO meta tags
- ✅ Accessibility
- ✅ All sections
- ✅ Valid markup

### CSS (styles.css)
- ✅ Responsive design
- ✅ Component styles
- ✅ Animations
- ✅ Accessibility
- ✅ Best practices

## Coverage Target

**80%+** on all metrics (branches, functions, lines, statements)

## More Info

- Detailed docs: [tests/README.md](tests/README.md)
- Summary: [TEST_SUMMARY.md](TEST_SUMMARY.md)
- Main README: [README.md](README.md)

## Need Help?

Check the troubleshooting section in `tests/README.md`