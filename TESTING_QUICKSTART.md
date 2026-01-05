# Testing Quick Start Guide

## ⚡ Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
npm test
```

### 3. View Coverage
```bash
npm run test:coverage
```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode (auto-rerun on changes) |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:verbose` | Run with detailed output |

## 🎯 What's Being Tested

- ✅ Mobile navigation & hamburger menu
- ✅ Smooth scrolling
- ✅ Form validation
- ✅ Animations & transitions
- ✅ Responsive design
- ✅ Accessibility features
- ✅ HTML structure
- ✅ CSS styling

## 📊 Test Stats

- **Total Tests**: 270+
- **Test Files**: 4
- **Coverage Target**: 80%+
- **Run Time**: < 15 seconds

## 🔍 Running Specific Tests

```bash
# JavaScript tests only
npm test -- script.test.js

# HTML validation only
npm test -- html.validation.test.js

# CSS validation only
npm test -- css.validation.test.js

# Tests matching "navigation"
npm test -- --testNamePattern="navigation"
```

## 📚 Documentation

For detailed documentation, see:
- `TEST_GUIDE.md` - Comprehensive testing guide
- `tests/README.md` - Test suite documentation

## ✅ Success Criteria

Tests pass when:
- ✅ All test cases pass
- ✅ Coverage is above 80%
- ✅ No console errors
- ✅ All assertions succeed

## 🐛 Troubleshooting

**Tests failing?**
1. Ensure all dependencies are installed: `npm install`
2. Check Node.js version: `node --version` (requires Node 14+)
3. Clear cache: `npm test -- --clearCache`

**Coverage too low?**
1. Run: `npm run test:coverage`
2. Open: `coverage/lcov-report/index.html`
3. Review uncovered lines
4. Add tests for missing coverage

## 🎉 You're Ready!

The test suite is fully configured and ready to use. Just run `npm test` to get started!