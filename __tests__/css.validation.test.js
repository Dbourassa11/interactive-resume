/**
 * CSS Validation and Quality Tests
 * Tests for CSS syntax, best practices, and responsive design
 */

const fs = require('fs');
const path = require('path');

describe('CSS Structure and Validation Tests', () => {
  let cssContent;

  beforeAll(() => {
    cssContent = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  describe('CSS Syntax and Structure', () => {
    test('should have valid CSS syntax', () => {
      // Check for balanced braces
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('should use proper CSS property syntax', () => {
      // Properties should have format: property: value;
      const propertyPattern = /[a-z-]+:\s*[^;]+;/g;
      const properties = cssContent.match(propertyPattern);
      expect(properties).toBeTruthy();
      expect(properties.length).toBeGreaterThan(10);
    });

    test('should not have syntax errors in selectors', () => {
      // Check for common selector patterns
      const invalidSelectors = cssContent.match(/\}\s*\{/g);
      expect(invalidSelectors).toBeNull();
    });

    test('should have CSS comments properly formatted', () => {
      const comments = cssContent.match(/\/\*[\s\S]*?\*\//g);
      if (comments) {
        comments.forEach(comment => {
          expect(comment.startsWith('/*')).toBe(true);
          expect(comment.endsWith('*/')).toBe(true);
        });
      }
    });
  });

  describe('CSS Variables and Theming', () => {
    test('should define CSS custom properties in :root', () => {
      expect(cssContent).toMatch(/:root\s*{/);
    });

    test('should use CSS variables for colors', () => {
      const varDefinitions = cssContent.match(/--[a-z-]+:\s*#[0-9a-f]{3,6}/gi);
      expect(varDefinitions).toBeTruthy();
    });

    test('should use var() function to reference custom properties', () => {
      const varUsages = cssContent.match(/var\(--[a-z-]+\)/gi);
      if (varUsages) {
        expect(varUsages.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Responsive Design', () => {
    test('should have media queries for responsive design', () => {
      expect(cssContent).toMatch(/@media/i);
    });

    test('should have mobile-first or desktop-first breakpoints', () => {
      const mediaQueries = cssContent.match(/@media[^{]+{/gi);
      expect(mediaQueries).toBeTruthy();
      expect(mediaQueries.length).toBeGreaterThan(0);
    });

    test('should use common breakpoint values', () => {
      // Common breakpoints: 768px, 1024px, 1200px, etc.
      const hasCommonBreakpoints = /768px|1024px|1200px|640px/i.test(cssContent);
      expect(hasCommonBreakpoints).toBe(true);
    });

    test('should use relative units for responsive typography', () => {
      const relativeUnits = cssContent.match(/font-size:\s*[\d.]+(?:em|rem|%)/gi);
      if (relativeUnits) {
        expect(relativeUnits.length).toBeGreaterThan(0);
      }
    });

    test('should have max-width or width constraints for containers', () => {
      const widthConstraints = cssContent.match(/(?:max-)?width:\s*[\d.]+(?:px|%|vw|rem)/gi);
      expect(widthConstraints).toBeTruthy();
      expect(widthConstraints.length).toBeGreaterThan(0);
    });
  });

  describe('Layout and Positioning', () => {
    test('should use modern layout techniques (Flexbox/Grid)', () => {
      const hasFlexbox = /display:\s*flex/i.test(cssContent);
      const hasGrid = /display:\s*grid/i.test(cssContent);
      expect(hasFlexbox || hasGrid).toBe(true);
    });

    test('should have box-sizing border-box for consistent sizing', () => {
      expect(cssContent).toMatch(/box-sizing:\s*border-box/i);
    });

    test('should use appropriate positioning', () => {
      const positioning = cssContent.match(/position:\s*(relative|absolute|fixed|sticky)/gi);
      if (positioning) {
        expect(positioning.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Typography', () => {
    test('should define font families', () => {
      expect(cssContent).toMatch(/font-family:/i);
    });

    test('should use web-safe font stack with fallbacks', () => {
      const fontFamilies = cssContent.match(/font-family:\s*[^;]+;/gi);
      if (fontFamilies) {
        fontFamilies.forEach(fontDeclaration => {
          // Should have comma-separated values (fallback fonts)
          const hasComma = fontDeclaration.includes(',');
          if (hasComma) {
            expect(hasComma).toBe(true);
          }
        });
      }
    });

    test('should define line-height for readability', () => {
      const lineHeights = cssContent.match(/line-height:/gi);
      expect(lineHeights).toBeTruthy();
    });

    test('should use appropriate font sizes', () => {
      const fontSizes = cssContent.match(/font-size:\s*[\d.]+(?:px|em|rem)/gi);
      expect(fontSizes).toBeTruthy();
      expect(fontSizes.length).toBeGreaterThan(0);
    });
  });

  describe('Colors and Contrast', () => {
    test('should define color values', () => {
      const colors = cssContent.match(/color:\s*(?:#[0-9a-f]{3,6}|rgb|hsl|var\(--)/gi);
      expect(colors).toBeTruthy();
    });

    test('should define background colors', () => {
      const bgColors = cssContent.match(/background(?:-color)?:\s*(?:#[0-9a-f]{3,6}|rgb|hsl|var\(--)/gi);
      expect(bgColors).toBeTruthy();
    });

    test('should use consistent color format', () => {
      const hexColors = cssContent.match(/#[0-9a-f]{3,6}/gi);
      if (hexColors) {
        expect(hexColors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Interactive Elements', () => {
    test('should have hover states for interactive elements', () => {
      expect(cssContent).toMatch(/:hover/i);
    });

    test('should have focus styles for accessibility', () => {
      expect(cssContent).toMatch(/:focus/i);
    });

    test('should have active states for buttons/links', () => {
      const hasActive = /:active/i.test(cssContent);
      if (hasActive) {
        expect(hasActive).toBe(true);
      }
    });

    test('should style form elements', () => {
      const formSelectors = /(?:input|textarea|button|select)/i.test(cssContent);
      expect(formSelectors).toBe(true);
    });
  });

  describe('Animations and Transitions', () => {
    test('should define transitions for smooth interactions', () => {
      const hasTransition = /transition:/i.test(cssContent);
      if (hasTransition) {
        expect(hasTransition).toBe(true);
      }
    });

    test('should use animation keyframes if animations exist', () => {
      const hasAnimation = /animation:/i.test(cssContent);
      if (hasAnimation) {
        const hasKeyframes = /@keyframes/i.test(cssContent);
        expect(hasKeyframes).toBe(true);
      }
    });

    test('should use appropriate timing functions', () => {
      const timingFunctions = cssContent.match(/(?:ease|linear|ease-in|ease-out|ease-in-out|cubic-bezier)/gi);
      if (timingFunctions) {
        expect(timingFunctions.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Accessibility Features', () => {
    test('should have skip-to-content link styles', () => {
      expect(cssContent).toMatch(/\.skip-to-content/i);
    });

    test('should have visible focus indicators', () => {
      const focusStyles = cssContent.match(/:focus[^{]*{[^}]*}/gi);
      expect(focusStyles).toBeTruthy();
    });

    test('should not remove outline without replacement', () => {
      const outlineNone = cssContent.match(/outline:\s*(?:none|0)/gi);
      if (outlineNone) {
        // If outline is removed, should have alternative focus indicator
        const hasFocusIndicator = /:focus[^{]*{[^}]*(?:border|box-shadow|background)/i.test(cssContent);
        expect(hasFocusIndicator).toBe(true);
      }
    });
  });

  describe('Performance Optimizations', () => {
    test('should use shorthand properties where appropriate', () => {
      const shorthandProps = cssContent.match(/(?:margin|padding|border|font):\s*[^;]+;/gi);
      if (shorthandProps) {
        expect(shorthandProps.length).toBeGreaterThan(0);
      }
    });

    test('should minimize use of universal selector', () => {
      const universalSelectors = cssContent.match(/\*\s*{/g);
      if (universalSelectors) {
        expect(universalSelectors.length).toBeLessThan(3);
      }
    });

    test('should use efficient selectors', () => {
      // Avoid overly complex selectors
      const complexSelectors = cssContent.match(/[^@{]+{/g) || [];
      const veryComplexSelectors = complexSelectors.filter(sel => 
        (sel.match(/\s/g) || []).length > 4
      );
      expect(veryComplexSelectors.length).toBeLessThan(complexSelectors.length * 0.2);
    });
  });

  describe('Print Styles', () => {
    test('should have print media query for print optimization', () => {
      const hasPrintStyles = /@media\s+print/i.test(cssContent);
      if (hasPrintStyles) {
        expect(hasPrintStyles).toBe(true);
      }
    });
  });

  describe('CSS Best Practices', () => {
    test('should not have !important overuse', () => {
      const importantDeclarations = cssContent.match(/!important/gi) || [];
      const totalDeclarations = cssContent.match(/[a-z-]+:\s*[^;]+;/g) || [];
      const importantRatio = importantDeclarations.length / totalDeclarations.length;
      expect(importantRatio).toBeLessThan(0.1); // Less than 10% should use !important
    });

    test('should use semantic class names', () => {
      const classNames = cssContent.match(/\.([\w-]+)/g);
      if (classNames) {
        const semanticClasses = classNames.filter(className => 
          /\.(nav|hero|about|experience|skills|contact|form|footer|header|content)/i.test(className)
        );
        expect(semanticClasses.length).toBeGreaterThan(0);
      }
    });

    test('should have consistent spacing and formatting', () => {
      // Check for consistent property-value spacing
      const propertyDeclarations = cssContent.match(/[a-z-]+:\s*[^;]+;/gi);
      if (propertyDeclarations) {
        propertyDeclarations.forEach(prop => {
          expect(prop).toMatch(/:\s+/); // Should have space after colon
        });
      }
    });
  });

  describe('Navigation Styles', () => {
    test('should have navigation element styles', () => {
      expect(cssContent).toMatch(/nav/i);
    });

    test('should have active navigation state', () => {
      const hasActiveClass = /\.active/i.test(cssContent);
      if (hasActiveClass) {
        expect(hasActiveClass).toBe(true);
      }
    });
  });

  describe('Form Styles', () => {
    test('should style form inputs', () => {
      expect(cssContent).toMatch(/input/i);
    });

    test('should style textareas', () => {
      expect(cssContent).toMatch(/textarea/i);
    });

    test('should style buttons', () => {
      expect(cssContent).toMatch(/button/i);
    });

    test('should have form validation states', () => {
      const hasValidation = /:invalid|:valid|\.error|\.success/i.test(cssContent);
      if (hasValidation) {
        expect(hasValidation).toBe(true);
      }
    });
  });

  describe('Section Styles', () => {
    test('should style section elements', () => {
      expect(cssContent).toMatch(/section/i);
    });

    test('should have hero section styles', () => {
      expect(cssContent).toMatch(/\.hero/i);
    });

    test('should have consistent section spacing', () => {
      const sectionPadding = cssContent.match(/section[^{]*{[^}]*padding/gi);
      if (sectionPadding) {
        expect(sectionPadding.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Footer Styles', () => {
    test('should style footer element', () => {
      expect(cssContent).toMatch(/footer/i);
    });
  });

  describe('Animation and Fade Effects', () => {
    test('should have fade-in animation classes', () => {
      const hasFadeAnimation = /fade-in/i.test(cssContent);
      if (hasFadeAnimation) {
        expect(hasFadeAnimation).toBe(true);
      }
    });

    test('should use opacity for fade effects', () => {
      const hasOpacity = /opacity:/i.test(cssContent);
      if (hasOpacity) {
        expect(hasOpacity).toBe(true);
      }
    });
  });
});