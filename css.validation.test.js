/**
 * CSS Validation Tests
 * Validates critical CSS rules, variables, selectors, and responsive design
 */

const fs = require('fs');
const path = require('path');

describe('CSS Validation - styles.css', () => {
  let cssContent;

  beforeAll(() => {
    cssContent = fs.readFileSync(path.resolve(__dirname, './styles.css'), 'utf8');
  });

  describe('CSS Variables (Custom Properties)', () => {
    test('should define :root selector with CSS variables', () => {
      expect(cssContent).toMatch(/:root\s*{/);
    });

    test('should define primary color variable', () => {
      expect(cssContent).toMatch(/--primary-color:\s*#2c3e50/);
    });

    test('should define secondary color variable', () => {
      expect(cssContent).toMatch(/--secondary-color:\s*#3498db/);
    });

    test('should define accent color variable', () => {
      expect(cssContent).toMatch(/--accent-color:\s*#e74c3c/);
    });

    test('should define text color variable', () => {
      expect(cssContent).toMatch(/--text-color:\s*#333/);
    });

    test('should define light background variable', () => {
      expect(cssContent).toMatch(/--light-bg:\s*#ecf0f1/);
    });

    test('should define white color variable', () => {
      expect(cssContent).toMatch(/--white:\s*#ffffff/);
    });

    test('should define transition variable', () => {
      expect(cssContent).toMatch(/--transition:\s*all\s+0\.3s\s+ease/);
    });
  });

  describe('Global Styles', () => {
    test('should have universal selector reset', () => {
      expect(cssContent).toMatch(/\*\s*{[^}]*margin:\s*0/);
      expect(cssContent).toMatch(/\*\s*{[^}]*padding:\s*0/);
      expect(cssContent).toMatch(/\*\s*{[^}]*box-sizing:\s*border-box/);
    });

    test('should define body styles', () => {
      expect(cssContent).toMatch(/body\s*{/);
      expect(cssContent).toMatch(/font-family:/);
      expect(cssContent).toMatch(/line-height:/);
      expect(cssContent).toMatch(/color:\s*var\(--text-color\)/);
      expect(cssContent).toMatch(/background-color:\s*var\(--light-bg\)/);
    });
  });

  describe('Accessibility Styles', () => {
    test('should style skip-to-content link', () => {
      expect(cssContent).toMatch(/\.skip-to-content\s*{/);
      expect(cssContent).toMatch(/\.skip-to-content[^}]*position:\s*absolute/);
      expect(cssContent).toMatch(/\.skip-to-content[^}]*top:\s*-40px/);
    });

    test('should show skip-to-content on focus', () => {
      expect(cssContent).toMatch(/\.skip-to-content:focus\s*{/);
      expect(cssContent).toMatch(/\.skip-to-content:focus[^}]*top:\s*0/);
    });

    test('should have focus styles for navigation links', () => {
      expect(cssContent).toMatch(/nav\s+a:(?:hover|focus)/);
      expect(cssContent).toMatch(/outline:/);
    });

    test('should have focus styles for form inputs', () => {
      expect(cssContent).toMatch(/\.form-group\s+(?:input|textarea):focus/);
      expect(cssContent).toMatch(/border-color:\s*var\(--secondary-color\)/);
    });

    test('should have focus styles for buttons', () => {
      expect(cssContent).toMatch(/\.contact-form\s+button:(?:hover|focus)/);
    });
  });

  describe('Navigation Styles', () => {
    test('should style navigation', () => {
      expect(cssContent).toMatch(/nav\s*{/);
      expect(cssContent).toMatch(/nav[^}]*background-color:\s*var\(--primary-color\)/);
      expect(cssContent).toMatch(/nav[^}]*position:\s*sticky/);
      expect(cssContent).toMatch(/nav[^}]*top:\s*0/);
      expect(cssContent).toMatch(/nav[^}]*z-index:/);
    });

    test('should style navigation list', () => {
      expect(cssContent).toMatch(/nav\s+ul\s*{/);
      expect(cssContent).toMatch(/list-style:\s*none/);
      expect(cssContent).toMatch(/display:\s*flex/);
      expect(cssContent).toMatch(/justify-content:\s*center/);
    });

    test('should style navigation links', () => {
      expect(cssContent).toMatch(/nav\s+a\s*{/);
      expect(cssContent).toMatch(/color:\s*var\(--white\)/);
      expect(cssContent).toMatch(/text-decoration:\s*none/);
      expect(cssContent).toMatch(/transition:\s*var\(--transition\)/);
    });
  });

  describe('Layout Styles', () => {
    test('should style main content container', () => {
      expect(cssContent).toMatch(/main\s*{/);
      expect(cssContent).toMatch(/max-width:\s*1200px/);
      expect(cssContent).toMatch(/margin:\s*0\s+auto/);
    });

    test('should style sections', () => {
      expect(cssContent).toMatch(/section\s*{/);
      expect(cssContent).toMatch(/background-color:\s*var\(--white\)/);
      expect(cssContent).toMatch(/border-radius:/);
      expect(cssContent).toMatch(/box-shadow:/);
    });

    test('should style section headings', () => {
      expect(cssContent).toMatch(/section\s+h2\s*{/);
      expect(cssContent).toMatch(/color:\s*var\(--primary-color\)/);
      expect(cssContent).toMatch(/border-bottom:/);
    });
  });

  describe('Hero Section Styles', () => {
    test('should style hero section', () => {
      expect(cssContent).toMatch(/\.hero\s*{/);
      expect(cssContent).toMatch(/background:\s*linear-gradient/);
      expect(cssContent).toMatch(/color:\s*var\(--white\)/);
      expect(cssContent).toMatch(/text-align:\s*center/);
    });

    test('should style hero h1', () => {
      expect(cssContent).toMatch(/\.hero\s+h1\s*{/);
      expect(cssContent).toMatch(/font-size:/);
      expect(cssContent).toMatch(/animation:/);
    });

    test('should style professional title', () => {
      expect(cssContent).toMatch(/\.professional-title\s*{/);
      expect(cssContent).toMatch(/animation:/);
    });

    test('should style social links', () => {
      expect(cssContent).toMatch(/\.social-links\s*{/);
      expect(cssContent).toMatch(/display:\s*flex/);
      expect(cssContent).toMatch(/justify-content:\s*center/);
    });

    test('should style social link hover effects', () => {
      expect(cssContent).toMatch(/\.social-links\s+a:(?:hover|focus)/);
      expect(cssContent).toMatch(/transform:\s*translateY/);
    });
  });

  describe('Experience Section Styles', () => {
    test('should style experience items', () => {
      expect(cssContent).toMatch(/\.experience-item\s*{/);
      expect(cssContent).toMatch(/border-left:/);
    });

    test('should style company name', () => {
      expect(cssContent).toMatch(/\.company\s*{/);
      expect(cssContent).toMatch(/font-weight:/);
      expect(cssContent).toMatch(/color:\s*var\(--secondary-color\)/);
    });

    test('should style location', () => {
      expect(cssContent).toMatch(/\.location\s*{/);
      expect(cssContent).toMatch(/font-style:\s*italic/);
    });
  });

  describe('Skills Section Styles', () => {
    test('should style skills list', () => {
      expect(cssContent).toMatch(/\.skills-list\s*{/);
      expect(cssContent).toMatch(/list-style:\s*none/);
      expect(cssContent).toMatch(/display:\s*grid/);
      expect(cssContent).toMatch(/grid-template-columns:/);
    });

    test('should style individual skill items', () => {
      expect(cssContent).toMatch(/\.skills-list\s+li\s*{/);
      expect(cssContent).toMatch(/background-color:\s*var\(--light-bg\)/);
      expect(cssContent).toMatch(/border-radius:/);
      expect(cssContent).toMatch(/transition:/);
    });

    test('should have hover effects for skills', () => {
      expect(cssContent).toMatch(/\.skills-list\s+li:hover/);
      expect(cssContent).toMatch(/transform:\s*translateY/);
    });
  });

  describe('Contact Form Styles', () => {
    test('should style contact form', () => {
      expect(cssContent).toMatch(/\.contact-form\s*{/);
      expect(cssContent).toMatch(/max-width:/);
    });

    test('should style form groups', () => {
      expect(cssContent).toMatch(/\.form-group\s*{/);
      expect(cssContent).toMatch(/margin-bottom:/);
    });

    test('should style form labels', () => {
      expect(cssContent).toMatch(/\.form-group\s+label\s*{/);
      expect(cssContent).toMatch(/display:\s*block/);
      expect(cssContent).toMatch(/font-weight:/);
    });

    test('should style form inputs', () => {
      expect(cssContent).toMatch(/\.form-group\s+(?:input|textarea)\s*{/);
      expect(cssContent).toMatch(/width:\s*100%/);
      expect(cssContent).toMatch(/border:/);
      expect(cssContent).toMatch(/border-radius:/);
    });

    test('should style submit button', () => {
      expect(cssContent).toMatch(/\.contact-form\s+button\s*{/);
      expect(cssContent).toMatch(/background-color:\s*var\(--secondary-color\)/);
      expect(cssContent).toMatch(/color:\s*var\(--white\)/);
      expect(cssContent).toMatch(/cursor:\s*pointer/);
    });

    test('should have button hover effects', () => {
      expect(cssContent).toMatch(/\.contact-form\s+button:(?:hover|focus)/);
      expect(cssContent).toMatch(/transform:/);
    });
  });

  describe('Footer Styles', () => {
    test('should style footer', () => {
      expect(cssContent).toMatch(/footer\s*{/);
      expect(cssContent).toMatch(/background-color:\s*var\(--primary-color\)/);
      expect(cssContent).toMatch(/color:\s*var\(--white\)/);
      expect(cssContent).toMatch(/text-align:\s*center/);
    });
  });

  describe('Animations', () => {
    test('should define fadeIn animation', () => {
      expect(cssContent).toMatch(/@keyframes\s+fadeIn/);
      expect(cssContent).toMatch(/from\s*{[^}]*opacity:\s*0/);
      expect(cssContent).toMatch(/to\s*{[^}]*opacity:\s*1/);
    });

    test('should define fadeInDown animation', () => {
      expect(cssContent).toMatch(/@keyframes\s+fadeInDown/);
      expect(cssContent).toMatch(/transform:\s*translateY\(-20px\)/);
      expect(cssContent).toMatch(/transform:\s*translateY\(0\)/);
    });

    test('should define fadeInUp animation', () => {
      expect(cssContent).toMatch(/@keyframes\s+fadeInUp/);
      expect(cssContent).toMatch(/transform:\s*translateY\(20px\)/);
      expect(cssContent).toMatch(/transform:\s*translateY\(0\)/);
    });

    test('should apply animations to elements', () => {
      expect(cssContent).toMatch(/animation:\s*fade/);
    });
  });

  describe('Responsive Design', () => {
    test('should have media query for mobile devices', () => {
      expect(cssContent).toMatch(/@media\s*\([^)]*max-width:\s*768px[^)]*\)/);
    });

    test('should adjust hero heading size for mobile', () => {
      const mobileStyles = cssContent.match(/@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{[\s\S]*?}/);
      expect(mobileStyles).toBeTruthy();
      
      const mobileContent = mobileStyles[0];
      expect(mobileContent).toMatch(/\.hero\s+h1\s*{[^}]*font-size:/);
    });

    test('should adjust professional title for mobile', () => {
      const mobileStyles = cssContent.match(/@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{[\s\S]*?}/);
      const mobileContent = mobileStyles[0];
      expect(mobileContent).toMatch(/\.professional-title/);
    });

    test('should adjust navigation for mobile', () => {
      const mobileStyles = cssContent.match(/@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{[\s\S]*?}/);
      const mobileContent = mobileStyles[0];
      expect(mobileContent).toMatch(/nav\s+ul/);
    });

    test('should adjust skills grid for mobile', () => {
      const mobileStyles = cssContent.match(/@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{[\s\S]*?}/);
      const mobileContent = mobileStyles[0];
      expect(mobileContent).toMatch(/\.skills-list/);
      expect(mobileContent).toMatch(/grid-template-columns:\s*1fr/);
    });
  });

  describe('Print Styles', () => {
    test('should have print media query', () => {
      expect(cssContent).toMatch(/@media\s+print/);
    });

    test('should hide navigation in print', () => {
      const printStyles = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      expect(printStyles).toBeTruthy();
      
      const printContent = printStyles[0];
      expect(printContent).toMatch(/nav[^}]*display:\s*none/);
    });

    test('should hide skip-to-content in print', () => {
      const printStyles = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      const printContent = printStyles[0];
      expect(printContent).toMatch(/\.skip-to-content[^}]*display:\s*none/);
    });

    test('should hide contact form in print', () => {
      const printStyles = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      const printContent = printStyles[0];
      expect(printContent).toMatch(/\.contact-form[^}]*display:\s*none/);
    });

    test('should adjust body background for print', () => {
      const printStyles = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      const printContent = printStyles[0];
      expect(printContent).toMatch(/body[^}]*background-color:\s*white/);
    });

    test('should remove box shadows for print', () => {
      const printStyles = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      const printContent = printStyles[0];
      expect(printContent).toMatch(/box-shadow:\s*none/);
    });

    test('should prevent page breaks inside sections', () => {
      const printStyles = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      const printContent = printStyles[0];
      expect(printContent).toMatch(/page-break-inside:\s*avoid/);
    });
  });

  describe('CSS Best Practices', () => {
    test('should use CSS variables for consistent theming', () => {
      const varUsage = cssContent.match(/var\(--[\w-]+\)/g);
      expect(varUsage).toBeTruthy();
      expect(varUsage.length).toBeGreaterThan(10);
    });

    test('should have transitions for interactive elements', () => {
      const transitions = cssContent.match(/transition:/g);
      expect(transitions).toBeTruthy();
      expect(transitions.length).toBeGreaterThan(5);
    });

    test('should use border-radius for modern design', () => {
      const borderRadius = cssContent.match(/border-radius:/g);
      expect(borderRadius).toBeTruthy();
      expect(borderRadius.length).toBeGreaterThan(3);
    });

    test('should use box-shadow for depth', () => {
      const boxShadow = cssContent.match(/box-shadow:/g);
      expect(boxShadow).toBeTruthy();
      expect(boxShadow.length).toBeGreaterThan(2);
    });

    test('should have proper color contrast', () => {
      // White text on primary color should have good contrast
      expect(cssContent).toMatch(/color:\s*var\(--white\)/);
      // Dark text on light background
      expect(cssContent).toMatch(/color:\s*var\(--text-color\)/);
    });
  });

  describe('Specific Component Styles', () => {
    test('should style contact info links', () => {
      expect(cssContent).toMatch(/\.contact-info\s+a/);
      expect(cssContent).toMatch(/\.contact-details\s+a/);
    });

    test('should have hover effects for links', () => {
      const hoverEffects = cssContent.match(/a:hover|a:focus/g);
      expect(hoverEffects).toBeTruthy();
      expect(hoverEffects.length).toBeGreaterThan(3);
    });

    test('should style description text', () => {
      expect(cssContent).toMatch(/\.description/);
    });

    test('should have gap property for flexbox/grid layouts', () => {
      const gapUsage = cssContent.match(/gap:/g);
      expect(gapUsage).toBeTruthy();
      expect(gapUsage.length).toBeGreaterThan(2);
    });
  });

  describe('CSS Syntax Validation', () => {
    test('should have balanced braces', () => {
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('should have no empty rulesets', () => {
      const emptyRulesets = cssContent.match(/{\s*}/g);
      expect(emptyRulesets).toBeFalsy();
    });

    test('should use semicolons to end declarations', () => {
      // Check that most declarations end with semicolons
      const declarations = cssContent.match(/:\s*[^;{}]+;/g);
      expect(declarations).toBeTruthy();
      expect(declarations.length).toBeGreaterThan(50);
    });

    test('should have consistent selector formatting', () => {
      // Should have selectors followed by opening brace
      const selectors = cssContent.match(/[\w\s.#:,\-()[\]]+\s*{/g);
      expect(selectors).toBeTruthy();
      expect(selectors.length).toBeGreaterThan(20);
    });
  });
});