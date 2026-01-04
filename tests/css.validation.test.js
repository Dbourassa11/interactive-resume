/**
 * CSS Validation and Structure Tests
 * Tests verify proper CSS structure, responsive design, accessibility, and best practices
 */

const fs = require('fs');
const path = require('path');

describe('CSS Structure and Validation', () => {
  let cssContent;
  
  beforeAll(() => {
    const cssPath = path.join(__dirname, '..', 'styles.css');
    cssContent = fs.readFileSync(cssPath, 'utf-8');
  });
  
  describe('CSS Variables and Theme', () => {
    test('should define CSS custom properties in :root', () => {
      expect(cssContent).toMatch(/:root\s*{/);
    });
    
    test('should define primary color variable', () => {
      expect(cssContent).toMatch(/--primary-color:\s*#[0-9a-fA-F]{6}/);
    });
    
    test('should define secondary color variable', () => {
      expect(cssContent).toMatch(/--secondary-color:\s*#[0-9a-fA-F]{6}/);
    });
    
    test('should define accent color variable', () => {
      expect(cssContent).toMatch(/--accent-color:\s*#[0-9a-fA-F]{6}/);
    });
    
    test('should define text color variable', () => {
      expect(cssContent).toMatch(/--text-color:\s*#[0-9a-fA-F]{3,6}/);
    });
    
    test('should define transition variable for consistency', () => {
      expect(cssContent).toMatch(/--transition:\s*all\s+[\d.]+s\s+ease/);
    });
  });
  
  describe('Global Styles and Reset', () => {
    test('should have universal selector reset', () => {
      expect(cssContent).toMatch(/\*\s*{[^}]*box-sizing:\s*border-box/);
    });
    
    test('should reset margin and padding', () => {
      expect(cssContent).toMatch(/\*\s*{[^}]*margin:\s*0/);
      expect(cssContent).toMatch(/\*\s*{[^}]*padding:\s*0/);
    });
    
    test('should set body font properties', () => {
      expect(cssContent).toMatch(/body\s*{[^}]*font-family:/);
      expect(cssContent).toMatch(/body\s*{[^}]*line-height:/);
    });
  });
  
  describe('Accessibility Features', () => {
    test('should style skip-to-content link', () => {
      expect(cssContent).toMatch(/\.skip-to-content\s*{/);
    });
    
    test('should show skip-to-content on focus', () => {
      expect(cssContent).toMatch(/\.skip-to-content:focus\s*{/);
    });
    
    test('should have focus styles for interactive elements', () => {
      expect(cssContent).toMatch(/:focus\s*{/);
    });
    
    test('should have hover and focus styles together for consistency', () => {
      const hoverFocusPattern = /(:hover,\s*:focus|:focus,\s*:hover)/;
      expect(cssContent).toMatch(hoverFocusPattern);
    });
    
    test('should use outline for keyboard focus indicators', () => {
      expect(cssContent).toMatch(/outline:\s*\d+px\s+solid/);
    });
  });
  
  describe('Navigation Styles', () => {
    test('should style navigation element', () => {
      expect(cssContent).toMatch(/nav\s*{/);
    });
    
    test('should make navigation sticky', () => {
      expect(cssContent).toMatch(/position:\s*sticky/);
    });
    
    test('should style navigation links', () => {
      expect(cssContent).toMatch(/nav\s+a\s*{/);
    });
    
    test('should have transition on navigation links', () => {
      const navLinkSection = cssContent.match(/nav\s+a\s*{[^}]*}/s);
      expect(navLinkSection).toBeTruthy();
      expect(navLinkSection[0]).toMatch(/transition:/);
    });
  });
  
  describe('Hero Section Styles', () => {
    test('should style hero section', () => {
      expect(cssContent).toMatch(/\.hero\s*{/);
    });
    
    test('should use gradient background for hero', () => {
      expect(cssContent).toMatch(/background:\s*linear-gradient/);
    });
    
    test('should have text-align center for hero', () => {
      const heroSection = cssContent.match(/\.hero\s*{[^}]*}/s);
      expect(heroSection).toBeTruthy();
      expect(heroSection[0]).toMatch(/text-align:\s*center/);
    });
    
    test('should style hero heading', () => {
      expect(cssContent).toMatch(/\.hero\s+h1\s*{/);
    });
    
    test('should have animation for hero elements', () => {
      expect(cssContent).toMatch(/animation:\s*fade/);
    });
  });
  
  describe('Section Styles', () => {
    test('should style generic sections', () => {
      expect(cssContent).toMatch(/section\s*{/);
    });
    
    test('should add box-shadow to sections', () => {
      const sectionStyles = cssContent.match(/section\s*{[^}]*}/s);
      expect(sectionStyles).toBeTruthy();
      expect(sectionStyles[0]).toMatch(/box-shadow:/);
    });
    
    test('should style section headings (h2)', () => {
      expect(cssContent).toMatch(/section\s+h2\s*{/);
    });
    
    test('should have border-bottom on section headings', () => {
      const h2Styles = cssContent.match(/section\s+h2\s*{[^}]*}/s);
      expect(h2Styles).toBeTruthy();
      expect(h2Styles[0]).toMatch(/border-bottom:/);
    });
  });
  
  describe('Form Styles', () => {
    test('should style contact form', () => {
      expect(cssContent).toMatch(/\.contact-form\s*{/);
    });
    
    test('should style form groups', () => {
      expect(cssContent).toMatch(/\.form-group\s*{/);
    });
    
    test('should style form inputs', () => {
      expect(cssContent).toMatch(/\.form-group\s+input\s*{/);
    });
    
    test('should style textarea', () => {
      expect(cssContent).toMatch(/\.form-group\s+textarea\s*{/);
    });
    
    test('should have focus styles for inputs', () => {
      expect(cssContent).toMatch(/input:focus/);
      expect(cssContent).toMatch(/textarea:focus/);
    });
    
    test('should style submit button', () => {
      expect(cssContent).toMatch(/\.contact-form\s+button\s*{/);
    });
    
    test('should have hover effect on submit button', () => {
      expect(cssContent).toMatch(/button:hover/);
    });
  });
  
  describe('Skills Section Styles', () => {
    test('should style skills list', () => {
      expect(cssContent).toMatch(/\.skills-list\s*{/);
    });
    
    test('should use CSS Grid for skills layout', () => {
      const skillsListStyles = cssContent.match(/\.skills-list\s*{[^}]*}/s);
      expect(skillsListStyles).toBeTruthy();
      expect(skillsListStyles[0]).toMatch(/display:\s*grid/);
      expect(skillsListStyles[0]).toMatch(/grid-template-columns:/);
    });
    
    test('should have hover effect on skills items', () => {
      expect(cssContent).toMatch(/\.skills-list\s+li:hover\s*{/);
    });
  });
  
  describe('Animations and Transitions', () => {
    test('should define fadeIn keyframes', () => {
      expect(cssContent).toMatch(/@keyframes\s+fadeIn/);
    });
    
    test('should define fadeInDown keyframes', () => {
      expect(cssContent).toMatch(/@keyframes\s+fadeInDown/);
    });
    
    test('should define fadeInUp keyframes', () => {
      expect(cssContent).toMatch(/@keyframes\s+fadeInUp/);
    });
    
    test('should use transform in animations', () => {
      expect(cssContent).toMatch(/transform:\s*translateY/);
    });
    
    test('should animate opacity', () => {
      const keyframesSections = cssContent.match(/@keyframes[^}]*{[^}]*}/gs);
      expect(keyframesSections).toBeTruthy();
      expect(keyframesSections.some(section => section.includes('opacity'))).toBe(true);
    });
  });
  
  describe('Responsive Design', () => {
    test('should have media query for mobile devices', () => {
      expect(cssContent).toMatch(/@media\s*\([^)]*max-width:\s*768px\)/);
    });
    
    test('should adjust hero heading size on mobile', () => {
      const mobileSection = cssContent.match(/@media[^{]*max-width:\s*768px[^{]*{[^}]*\.hero\s+h1\s*{[^}]*}/s);
      expect(mobileSection).toBeTruthy();
    });
    
    test('should adjust navigation on mobile', () => {
      const mediaQuery = cssContent.match(/@media[^{]*max-width:\s*768px[^{]*{[\s\S]*?nav\s+ul[\s\S]*?}/);
      expect(mediaQuery).toBeTruthy();
    });
    
    test('should adjust grid layout for mobile', () => {
      const mobileContent = cssContent.match(/@media[^{]*max-width:\s*768px[^{]*{[\s\S]*?}/);
      expect(mobileContent).toBeTruthy();
      expect(mobileContent[0]).toMatch(/grid-template-columns:\s*1fr/);
    });
  });
  
  describe('Print Styles', () => {
    test('should have print media query', () => {
      expect(cssContent).toMatch(/@media\s+print/);
    });
    
    test('should hide navigation in print', () => {
      const printSection = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      expect(printSection).toBeTruthy();
      expect(printSection[0]).toMatch(/nav[^}]*display:\s*none/);
    });
    
    test('should hide skip-to-content in print', () => {
      const printSection = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      expect(printSection).toBeTruthy();
      expect(printSection[0]).toMatch(/\.skip-to-content[^}]*display:\s*none/);
    });
    
    test('should hide contact form in print', () => {
      const printSection = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      expect(printSection).toBeTruthy();
      expect(printSection[0]).toMatch(/\.contact-form[^}]*display:\s*none/);
    });
    
    test('should set white background for print', () => {
      const printSection = cssContent.match(/@media\s+print\s*{[\s\S]*?}/);
      expect(printSection).toBeTruthy();
      expect(printSection[0]).toMatch(/background-color:\s*white/);
    });
  });
  
  describe('Social Links Styles', () => {
    test('should style social links container', () => {
      expect(cssContent).toMatch(/\.social-links\s*{/);
    });
    
    test('should use flexbox for social links', () => {
      const socialLinksStyles = cssContent.match(/\.social-links\s*{[^}]*}/s);
      expect(socialLinksStyles).toBeTruthy();
      expect(socialLinksStyles[0]).toMatch(/display:\s*flex/);
    });
    
    test('should have hover effects on social links', () => {
      expect(cssContent).toMatch(/\.social-links\s+a:hover/);
    });
    
    test('should use transform on hover for social links', () => {
      const socialHoverStyles = cssContent.match(/\.social-links\s+a:hover[^}]*}/s);
      expect(socialHoverStyles).toBeTruthy();
      expect(socialHoverStyles[0]).toMatch(/transform:/);
    });
  });
  
  describe('Experience Section Styles', () => {
    test('should style experience items', () => {
      expect(cssContent).toMatch(/\.experience-item\s*{/);
    });
    
    test('should have border accent on experience items', () => {
      const expStyles = cssContent.match(/\.experience-item\s*{[^}]*}/s);
      expect(expStyles).toBeTruthy();
      expect(expStyles[0]).toMatch(/border-left:/);
    });
    
    test('should style company name', () => {
      expect(cssContent).toMatch(/\.company\s*{/);
    });
    
    test('should style location', () => {
      expect(cssContent).toMatch(/\.location\s*{/);
    });
  });
  
  describe('Footer Styles', () => {
    test('should style footer', () => {
      expect(cssContent).toMatch(/footer\s*{/);
    });
    
    test('should center footer text', () => {
      const footerStyles = cssContent.match(/footer\s*{[^}]*}/s);
      expect(footerStyles).toBeTruthy();
      expect(footerStyles[0]).toMatch(/text-align:\s*center/);
    });
  });
  
  describe('Color Usage and Consistency', () => {
    test('should use CSS variables for colors', () => {
      expect(cssContent).toMatch(/var\(--primary-color\)/);
      expect(cssContent).toMatch(/var\(--secondary-color\)/);
    });
    
    test('should use consistent transition variable', () => {
      expect(cssContent).toMatch(/transition:\s*var\(--transition\)/);
    });
    
    test('should not have hardcoded colors outside :root (except rgba)', () => {
      // Extract content after :root block
      const rootEndIndex = cssContent.indexOf('}', cssContent.indexOf(':root'));
      const contentAfterRoot = cssContent.substring(rootEndIndex);
      
      // Allow rgba colors for opacity effects
      const hardcodedColors = contentAfterRoot.match(/#[0-9a-fA-F]{3,6}(?!.*var\()/g);
      
      // Some hardcoded colors are acceptable in specific contexts (gradients, etc)
      // This is a warning test - too strict would be impractical
      if (hardcodedColors) {
        expect(hardcodedColors.length).toBeLessThan(5);
      }
    });
  });
  
  describe('Layout and Spacing', () => {
    test('should set max-width on main content', () => {
      const mainStyles = cssContent.match(/main\s*{[^}]*}/s);
      expect(mainStyles).toBeTruthy();
      expect(mainStyles[0]).toMatch(/max-width:/);
    });
    
    test('should center main content', () => {
      const mainStyles = cssContent.match(/main\s*{[^}]*}/s);
      expect(mainStyles).toBeTruthy();
      expect(mainStyles[0]).toMatch(/margin:\s*[^;]*auto/);
    });
    
    test('should have consistent padding on sections', () => {
      const sectionStyles = cssContent.match(/section\s*{[^}]*}/s);
      expect(sectionStyles).toBeTruthy();
      expect(sectionStyles[0]).toMatch(/padding:/);
    });
    
    test('should have border-radius for modern look', () => {
      expect(cssContent).toMatch(/border-radius:/);
    });
  });
  
  describe('Best Practices', () => {
    test('should not have !important (except where absolutely necessary)', () => {
      const importantCount = (cssContent.match(/!important/g) || []).length;
      expect(importantCount).toBeLessThan(3);
    });
    
    test('should use shorthand properties where appropriate', () => {
      // Check for some shorthand usage
      expect(cssContent).toMatch(/padding:\s*[\d.]+(?:px|rem|em)/);
      expect(cssContent).toMatch(/margin:\s*[\d.]+(?:px|rem|em)/);
    });
    
    test('should use relative units (rem, em) for scalability', () => {
      expect(cssContent).toMatch(/\d+(?:rem|em)/);
    });
    
    test('should have z-index organized (no arbitrary high values)', () => {
      const zIndexValues = cssContent.match(/z-index:\s*(\d+)/g);
      if (zIndexValues) {
        zIndexValues.forEach(zIndex => {
          const value = parseInt(zIndex.match(/\d+/)[0]);
          expect(value).toBeLessThan(1000);
        });
      }
    });
  });
  
  describe('Performance Considerations', () => {
    test('should use transform for animations (better performance)', () => {
      expect(cssContent).toMatch(/transform:/);
    });
    
    test('should avoid animating expensive properties like width/height directly', () => {
      const animationBlocks = cssContent.match(/@keyframes[^}]*{[\s\S]*?}/g);
      if (animationBlocks) {
        animationBlocks.forEach(block => {
          // Prefer transform over width/height
          if (block.includes('translateY') || block.includes('translateX')) {
            expect(block).not.toMatch(/width:|height:/);
          }
        });
      }
    });
  });
  
  describe('Contact Details Styles', () => {
    test('should style contact details section', () => {
      expect(cssContent).toMatch(/\.contact-details\s*{/);
    });
    
    test('should style contact details links', () => {
      expect(cssContent).toMatch(/\.contact-details\s+a\s*{/);
    });
  });
  
  describe('Syntax Validation', () => {
    test('should have balanced curly braces', () => {
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });
    
    test('should have semicolons after property declarations', () => {
      // Check for common missing semicolon patterns
      expect(cssContent).not.toMatch(/:\s*[^;}\s]+\s*}/);
    });
    
    test('should not have empty rulesets', () => {
      expect(cssContent).not.toMatch(/{\s*}/);
    });
  });
});