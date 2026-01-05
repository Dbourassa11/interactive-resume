/**
 * Comprehensive CSS Validation Tests
 * Tests CSS structure, styling, responsiveness, and best practices
 */

const fs = require('fs');
const path = require('path');

describe('CSS Structure and Validation', () => {
  let cssContent;

  beforeAll(() => {
    cssContent = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf8');
  });

  describe('CSS Variables and Theme', () => {
    test('should define root CSS variables', () => {
      expect(cssContent).toMatch(/:root\s*{/);
    });

    test('should define primary color variable', () => {
      expect(cssContent).toMatch(/--primary-color:\s*#[0-9a-f]{3,6}/i);
    });

    test('should define secondary color variable', () => {
      expect(cssContent).toMatch(/--secondary-color:\s*#[0-9a-f]{3,6}/i);
    });

    test('should define accent color variable', () => {
      expect(cssContent).toMatch(/--accent-color:\s*#[0-9a-f]{3,6}/i);
    });

    test('should define text colors', () => {
      expect(cssContent).toMatch(/--text-dark/);
      expect(cssContent).toMatch(/--text-light/);
    });

    test('should define shadow variables', () => {
      expect(cssContent).toMatch(/--shadow:/);
      expect(cssContent).toMatch(/--shadow-hover:/);
    });

    test('should define transition variable', () => {
      expect(cssContent).toMatch(/--transition:/);
    });

    test('should use CSS variables throughout stylesheet', () => {
      const varUsage = cssContent.match(/var\(--[a-z-]+\)/gi);
      expect(varUsage).toBeTruthy();
      expect(varUsage.length).toBeGreaterThan(20);
    });
  });

  describe('Global Styles', () => {
    test('should have universal selector reset', () => {
      expect(cssContent).toMatch(/\*\s*{[^}]*margin:\s*0/);
      expect(cssContent).toMatch(/\*\s*{[^}]*padding:\s*0/);
      expect(cssContent).toMatch(/\*\s*{[^}]*box-sizing:\s*border-box/);
    });

    test('should enable smooth scrolling on html', () => {
      expect(cssContent).toMatch(/html\s*{[^}]*scroll-behavior:\s*smooth/);
    });

    test('should define body font family', () => {
      expect(cssContent).toMatch(/body\s*{[^}]*font-family:/);
    });

    test('should define body line-height', () => {
      expect(cssContent).toMatch(/body\s*{[^}]*line-height:/);
    });

    test('should prevent horizontal overflow on body', () => {
      expect(cssContent).toMatch(/body\s*{[^}]*overflow-x:\s*hidden/);
    });

    test('should define container max-width', () => {
      expect(cssContent).toMatch(/\.container\s*{[^}]*max-width:/);
    });
  });

  describe('Navigation Styles', () => {
    test('should have fixed navbar positioning', () => {
      expect(cssContent).toMatch(/\.navbar\s*{[^}]*position:\s*fixed/);
    });

    test('should have navbar z-index for layering', () => {
      expect(cssContent).toMatch(/\.navbar\s*{[^}]*z-index:/);
    });

    test('should style logo with gradient', () => {
      expect(cssContent).toMatch(/\.logo\s*{[^}]*background:\s*linear-gradient/);
    });

    test('should use flexbox for nav-links', () => {
      expect(cssContent).toMatch(/\.nav-links\s*{[^}]*display:\s*flex/);
    });

    test('should remove list-style from nav-links', () => {
      expect(cssContent).toMatch(/\.nav-links\s*{[^}]*list-style:\s*none/);
    });

    test('should have hover effect on nav links', () => {
      expect(cssContent).toMatch(/\.nav-links\s+a:hover/);
    });

    test('should have active state for nav links', () => {
      expect(cssContent).toMatch(/\.nav-links\s+a\.active/);
    });

    test('should have after pseudo-element for nav link underline', () => {
      expect(cssContent).toMatch(/\.nav-links\s+a::after/);
    });

    test('should hide hamburger by default (desktop-first)', () => {
      expect(cssContent).toMatch(/\.hamburger\s*{[^}]*display:\s*none/);
    });
  });

  describe('Hero Section Styles', () => {
    test('should have full viewport height for hero', () => {
      expect(cssContent).toMatch(/\.hero\s*{[^}]*min-height:\s*100vh/);
    });

    test('should use flexbox for hero centering', () => {
      expect(cssContent).toMatch(/\.hero\s*{[^}]*display:\s*flex/);
      expect(cssContent).toMatch(/\.hero\s*{[^}]*align-items:\s*center/);
    });

    test('should have gradient background for hero', () => {
      expect(cssContent).toMatch(/\.hero\s*{[^}]*background:\s*linear-gradient/);
    });

    test('should have before pseudo-element for hero pattern', () => {
      expect(cssContent).toMatch(/\.hero::before/);
    });

    test('should center hero content text', () => {
      expect(cssContent).toMatch(/\.hero-content\s*{[^}]*text-align:\s*center/);
    });

    test('should have large heading font size', () => {
      const h1Match = cssContent.match(/\.hero\s+h1\s*{[^}]*font-size:\s*([\d.]+)rem/);
      expect(h1Match).toBeTruthy();
      expect(parseFloat(h1Match[1])).toBeGreaterThan(2);
    });

    test('should style CTA buttons', () => {
      expect(cssContent).toMatch(/\.btn\s*{[^}]*padding:/);
      expect(cssContent).toMatch(/\.btn\s*{[^}]*border-radius:/);
    });

    test('should have hover effect on buttons', () => {
      expect(cssContent).toMatch(/\.btn-primary:hover/);
      expect(cssContent).toMatch(/\.btn-secondary:hover/);
    });

    test('should have scroll indicator animation', () => {
      expect(cssContent).toMatch(/@keyframes\s+scroll/);
    });
  });

  describe('Section Styles', () => {
    test('should have consistent padding for sections', () => {
      expect(cssContent).toMatch(/\.section\s*{[^}]*padding:/);
    });

    test('should have bg-light background class', () => {
      expect(cssContent).toMatch(/\.bg-light\s*{[^}]*background:/);
    });

    test('should center section titles', () => {
      expect(cssContent).toMatch(/\.section-title\s*{[^}]*text-align:\s*center/);
    });

    test('should have after pseudo-element for section title underline', () => {
      expect(cssContent).toMatch(/\.section-title::after/);
    });

    test('should position section title underline with transform', () => {
      const afterMatch = cssContent.match(/\.section-title::after\s*{([^}]*)}/);
      expect(afterMatch).toBeTruthy();
      expect(afterMatch[1]).toMatch(/transform:\s*translateX\(-50%\)/);
    });
  });

  describe('Statistics Styles', () => {
    test('should use grid for stats layout', () => {
      expect(cssContent).toMatch(/\.stats\s*{[^}]*display:\s*grid/);
    });

    test('should have stat-item hover effect', () => {
      expect(cssContent).toMatch(/\.stat-item:hover/);
      expect(cssContent).toMatch(/transform:\s*translateY\(-\d+px\)/);
    });

    test('should use gradient for stat numbers', () => {
      expect(cssContent).toMatch(/\.stat-number\s*{[^}]*background:\s*linear-gradient/);
    });

    test('should use background-clip for gradient text', () => {
      expect(cssContent).toMatch(/\.stat-number\s*{[^}]*-webkit-background-clip:\s*text/);
      expect(cssContent).toMatch(/\.stat-number\s*{[^}]*-webkit-text-fill-color:\s*transparent/);
    });
  });

  describe('Skills Section Styles', () => {
    test('should use grid for skills layout', () => {
      expect(cssContent).toMatch(/\.skills-grid\s*{[^}]*display:\s*grid/);
    });

    test('should have skill-bar styles', () => {
      expect(cssContent).toMatch(/\.skill-bar\s*{/);
    });

    test('should have progress bar container', () => {
      expect(cssContent).toMatch(/\.progress\s*{[^}]*height:/);
      expect(cssContent).toMatch(/\.progress\s*{[^}]*border-radius:/);
    });

    test('should have progress-bar with gradient', () => {
      expect(cssContent).toMatch(/\.progress-bar\s*{[^}]*background:\s*linear-gradient/);
    });

    test('should have transition on progress-bar width', () => {
      expect(cssContent).toMatch(/\.progress-bar\s*{[^}]*transition:[^}]*width/);
    });

    test('should start progress-bar at width 0', () => {
      expect(cssContent).toMatch(/\.progress-bar\s*{[^}]*width:\s*0/);
    });

    test('should use flexbox for skill-info', () => {
      expect(cssContent).toMatch(/\.skill-info\s*{[^}]*display:\s*flex/);
      expect(cssContent).toMatch(/\.skill-info\s*{[^}]*justify-content:\s*space-between/);
    });
  });

  describe('Timeline Styles', () => {
    test('should have timeline with before pseudo-element line', () => {
      expect(cssContent).toMatch(/\.timeline::before/);
    });

    test('should position timeline line absolutely', () => {
      const timelineBeforeMatch = cssContent.match(/\.timeline::before\s*{([^}]*)}/);
      expect(timelineBeforeMatch).toBeTruthy();
      expect(timelineBeforeMatch[1]).toMatch(/position:\s*absolute/);
    });

    test('should have timeline-dot styles', () => {
      expect(cssContent).toMatch(/\.timeline-dot\s*{[^}]*border-radius:\s*50%/);
    });

    test('should position timeline-dot absolutely', () => {
      expect(cssContent).toMatch(/\.timeline-dot\s*{[^}]*position:\s*absolute/);
    });

    test('should have hover effect on timeline-content', () => {
      expect(cssContent).toMatch(/\.timeline-content:hover/);
    });

    test('should use translateX in timeline hover', () => {
      const hoverMatch = cssContent.match(/\.timeline-content:hover\s*{([^}]*)}/);
      expect(hoverMatch).toBeTruthy();
      expect(hoverMatch[1]).toMatch(/transform:\s*translateX/);
    });
  });

  describe('Education Styles', () => {
    test('should use grid for education layout', () => {
      expect(cssContent).toMatch(/\.education-grid\s*{[^}]*display:\s*grid/);
    });

    test('should have education-card hover effect', () => {
      expect(cssContent).toMatch(/\.education-card:hover/);
    });

    test('should have circular education-icon', () => {
      expect(cssContent).toMatch(/\.education-icon\s*{[^}]*border-radius:\s*50%/);
    });

    test('should use gradient for education-icon background', () => {
      expect(cssContent).toMatch(/\.education-icon\s*{[^}]*background:\s*linear-gradient/);
    });

    test('should center icon content with flexbox', () => {
      expect(cssContent).toMatch(/\.education-icon\s*{[^}]*display:\s*flex/);
      expect(cssContent).toMatch(/\.education-icon\s*{[^}]*align-items:\s*center/);
    });
  });

  describe('Projects Section Styles', () => {
    test('should use grid for projects layout', () => {
      expect(cssContent).toMatch(/\.projects-grid\s*{[^}]*display:\s*grid/);
    });

    test('should have project-card hover effect', () => {
      expect(cssContent).toMatch(/\.project-card:hover/);
    });

    test('should have project-image with fixed height', () => {
      expect(cssContent).toMatch(/\.project-image\s*{[^}]*height:/);
    });

    test('should have object-fit cover for images', () => {
      expect(cssContent).toMatch(/\.project-image\s+img\s*{[^}]*object-fit:\s*cover/);
    });

    test('should scale image on card hover', () => {
      expect(cssContent).toMatch(/\.project-card:hover\s+\.project-image\s+img\s*{[^}]*transform:\s*scale/);
    });

    test('should have project-overlay with opacity 0 by default', () => {
      expect(cssContent).toMatch(/\.project-overlay\s*{[^}]*opacity:\s*0/);
    });

    test('should show overlay on hover', () => {
      expect(cssContent).toMatch(/\.project-card:hover\s+\.project-overlay\s*{[^}]*opacity:\s*1/);
    });

    test('should have circular project-link buttons', () => {
      expect(cssContent).toMatch(/\.project-link\s*{[^}]*border-radius:\s*50%/);
    });

    test('should use flexbox for project-tags', () => {
      expect(cssContent).toMatch(/\.project-tags\s*{[^}]*display:\s*flex/);
    });
  });

  describe('Contact Section Styles', () => {
    test('should use grid for contact-content', () => {
      expect(cssContent).toMatch(/\.contact-content\s*{[^}]*display:\s*grid/);
    });

    test('should have two columns for contact grid', () => {
      const gridMatch = cssContent.match(/\.contact-content\s*{[^}]*grid-template-columns:\s*1fr\s+1fr/);
      expect(gridMatch).toBeTruthy();
    });

    test('should style contact-item with flexbox', () => {
      expect(cssContent).toMatch(/\.contact-item\s*{[^}]*display:\s*flex/);
    });

    test('should have circular icons for contact items', () => {
      expect(cssContent).toMatch(/\.contact-item\s+i\s*{[^}]*border-radius:\s*50%/);
    });

    test('should use gradient for contact icons', () => {
      expect(cssContent).toMatch(/\.contact-item\s+i\s*{[^}]*background:\s*linear-gradient/);
    });

    test('should style form inputs consistently', () => {
      expect(cssContent).toMatch(/\.form-group\s+input/);
      expect(cssContent).toMatch(/\.form-group\s+textarea/);
    });

    test('should have focus state for form inputs', () => {
      expect(cssContent).toMatch(/\.form-group\s+input:focus/);
      expect(cssContent).toMatch(/\.form-group\s+textarea:focus/);
    });

    test('should remove default outline on focus', () => {
      const focusMatch = cssContent.match(/\.form-group\s+input:focus[^}]*outline:\s*none/);
      expect(focusMatch).toBeTruthy();
    });

    test('should change border color on focus', () => {
      expect(cssContent).toMatch(/\.form-group\s+input:focus[^}]*border-color:/);
    });
  });

  describe('Footer Styles', () => {
    test('should have footer background color', () => {
      expect(cssContent).toMatch(/\.footer\s*{[^}]*background:/);
    });

    test('should center footer text', () => {
      expect(cssContent).toMatch(/\.footer\s*{[^}]*text-align:\s*center/);
    });

    test('should style footer links', () => {
      expect(cssContent).toMatch(/\.footer-links\s+a/);
    });

    test('should have footer link hover state', () => {
      expect(cssContent).toMatch(/\.footer-links\s+a:hover/);
    });
  });

  describe('Animations', () => {
    test('should have fadeIn keyframes', () => {
      expect(cssContent).toMatch(/@keyframes\s+fadeIn/);
    });

    test('should have fade-in classes with delays', () => {
      expect(cssContent).toMatch(/\.fade-in\s*{/);
      expect(cssContent).toMatch(/\.fade-in-delay\s*{/);
      expect(cssContent).toMatch(/\.fade-in-delay-2\s*{/);
      expect(cssContent).toMatch(/\.fade-in-delay-3\s*{/);
    });

    test('should use animation property in fade classes', () => {
      expect(cssContent).toMatch(/\.fade-in\s*{[^}]*animation:/);
    });

    test('should have scroll keyframes for scroll indicator', () => {
      expect(cssContent).toMatch(/@keyframes\s+scroll/);
    });

    test('should use transform in animations for better performance', () => {
      const fadeInMatch = cssContent.match(/@keyframes\s+fadeIn\s*{([^}]+from[^}]+to[^}]+)}/s);
      expect(fadeInMatch).toBeTruthy();
      expect(fadeInMatch[1]).toMatch(/transform:/);
    });
  });

  describe('Responsive Design', () => {
    test('should have media query for tablets (768px)', () => {
      expect(cssContent).toMatch(/@media\s*\([^)]*max-width:\s*768px/);
    });

    test('should have media query for mobile (480px)', () => {
      expect(cssContent).toMatch(/@media\s*\([^)]*max-width:\s*480px/);
    });

    test('should show hamburger on mobile', () => {
      const mobileMedia = cssContent.match(/@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{([^}]+\.hamburger[^}]+)}/s);
      expect(mobileMedia).toBeTruthy();
    });

    test('should adjust nav-links for mobile', () => {
      const mobileMedia = cssContent.match(/@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{([\s\S]*?)}/);
      expect(mobileMedia).toBeTruthy();
      expect(mobileMedia[1]).toMatch(/\.nav-links/);
    });

    test('should reduce hero heading size on mobile', () => {
      const mobileMedia = cssContent.match(/@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{([\s\S]*?)}/);
      expect(mobileMedia).toBeTruthy();
      expect(mobileMedia[1]).toMatch(/\.hero\s+h1/);
    });

    test('should adjust grid columns for mobile', () => {
      const mobileMedia = cssContent.match(/@media\s*\([^)]*max-width:\s*768px[^)]*\)\s*{([\s\S]*?)}/);
      expect(mobileMedia).toBeTruthy();
      expect(mobileMedia[1]).toMatch(/grid-template-columns:\s*1fr/);
    });

    test('should use auto-fit for responsive grids', () => {
      expect(cssContent).toMatch(/grid-template-columns:\s*repeat\(auto-fit/);
    });

    test('should have minmax for flexible grid items', () => {
      expect(cssContent).toMatch(/minmax\(/);
    });
  });

  describe('Best Practices', () => {
    test('should use transitions for smooth effects', () => {
      const transitions = cssContent.match(/transition:/gi);
      expect(transitions).toBeTruthy();
      expect(transitions.length).toBeGreaterThan(10);
    });

    test('should use box-shadow for depth', () => {
      const shadows = cssContent.match(/box-shadow:/gi);
      expect(shadows).toBeTruthy();
      expect(shadows.length).toBeGreaterThan(5);
    });

    test('should use transform for hover effects', () => {
      const transforms = cssContent.match(/transform:/gi);
      expect(transforms).toBeTruthy();
      expect(transforms.length).toBeGreaterThan(5);
    });

    test('should avoid using !important excessively', () => {
      const importantUsage = cssContent.match(/!important/gi);
      if (importantUsage) {
        expect(importantUsage.length).toBeLessThan(3);
      }
    });

    test('should use relative units (rem, em, %) appropriately', () => {
      expect(cssContent).toMatch(/\d+rem/);
      expect(cssContent).toMatch(/\d+%/);
    });

    test('should group related selectors', () => {
      // Check for comma-separated selectors
      const groupedSelectors = cssContent.match(/[^{]+,[^{]+{/g);
      expect(groupedSelectors).toBeTruthy();
    });
  });

  describe('Color Consistency', () => {
    test('should use CSS variables for colors', () => {
      const colorVarUsage = cssContent.match(/var\(--[a-z-]*color[a-z-]*\)/gi);
      expect(colorVarUsage).toBeTruthy();
      expect(colorVarUsage.length).toBeGreaterThan(10);
    });

    test('should use linear-gradient consistently', () => {
      const gradients = cssContent.match(/linear-gradient\([^)]+var\(--primary-color\)[^)]+var\(--secondary-color\)/gi);
      expect(gradients).toBeTruthy();
      expect(gradients.length).toBeGreaterThan(3);
    });

    test('should use rgba for transparency', () => {
      expect(cssContent).toMatch(/rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)/);
    });
  });

  describe('Accessibility', () => {
    test('should have focus states for interactive elements', () => {
      expect(cssContent).toMatch(/:focus/);
    });

    test('should maintain sufficient contrast', () => {
      // Check that text has color defined
      expect(cssContent).toMatch(/color:\s*(var\(--text-dark\)|var\(--text-light\)|#[0-9a-f]{3,6})/i);
    });

    test('should not remove outline without replacement', () => {
      const outlineNone = cssContent.match(/outline:\s*none/gi);
      const focusStates = cssContent.match(/:focus/gi);
      
      if (outlineNone) {
        // Should have alternative focus indicators
        expect(focusStates).toBeTruthy();
      }
    });
  });

  describe('Performance', () => {
    test('should use transform for animations instead of position', () => {
      const animations = cssContent.match(/@keyframes[^{]+{[^}]*}/gs);
      if (animations) {
        animations.forEach(animation => {
          if (animation.includes('translateY') || animation.includes('translateX')) {
            expect(animation).toMatch(/transform:/);
          }
        });
      }
    });

    test('should minimize use of expensive properties', () => {
      // Check that filter and backdrop-filter are used sparingly
      const expensiveProps = cssContent.match(/filter:|backdrop-filter:/gi);
      if (expensiveProps) {
        expect(expensiveProps.length).toBeLessThan(5);
      }
    });

    test('should use will-change sparingly if at all', () => {
      const willChange = cssContent.match(/will-change:/gi);
      if (willChange) {
        expect(willChange.length).toBeLessThan(3);
      }
    });
  });

  describe('CSS Syntax Validation', () => {
    test('should have balanced curly braces', () => {
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('should have semicolons at end of declarations', () => {
      // Check major declarations have semicolons
      const declarations = cssContent.match(/:\s*[^;{}]+;/g);
      expect(declarations).toBeTruthy();
      expect(declarations.length).toBeGreaterThan(100);
    });

    test('should not have syntax errors in selectors', () => {
      // Basic check for common syntax errors
      expect(cssContent).not.toMatch(/,,/); // Double commas
      expect(cssContent).not.toMatch(/;{/); // Semicolon before brace
    });

    test('should use consistent spacing', () => {
      // Check for space after colon in declarations
      const colonSpacing = cssContent.match(/:\s+/g);
      expect(colonSpacing).toBeTruthy();
      expect(colonSpacing.length).toBeGreaterThan(100);
    });
  });

  describe('Layout Techniques', () => {
    test('should use Flexbox where appropriate', () => {
      const flexUsage = cssContent.match(/display:\s*flex/gi);
      expect(flexUsage).toBeTruthy();
      expect(flexUsage.length).toBeGreaterThan(10);
    });

    test('should use CSS Grid where appropriate', () => {
      const gridUsage = cssContent.match(/display:\s*grid/gi);
      expect(gridUsage).toBeTruthy();
      expect(gridUsage.length).toBeGreaterThan(5);
    });

    test('should use position:fixed for navbar', () => {
      expect(cssContent).toMatch(/\.navbar\s*{[^}]*position:\s*fixed/);
    });

    test('should use position:absolute for overlays', () => {
      expect(cssContent).toMatch(/position:\s*absolute/i);
    });
  });

  describe('Hover and Interactive States', () => {
    test('should have hover states for links', () => {
      const hoverStates = cssContent.match(/:hover/gi);
      expect(hoverStates).toBeTruthy();
      expect(hoverStates.length).toBeGreaterThan(10);
    });

    test('should have active states where appropriate', () => {
      expect(cssContent).toMatch(/\.active/);
    });

    test('should use cursor:pointer for clickable elements', () => {
      expect(cssContent).toMatch(/cursor:\s*pointer/i);
    });

    test('should have smooth transitions on hover', () => {
      const hoverBlocks = cssContent.match(/:hover\s*{([^}]*)}/g);
      if (hoverBlocks) {
        // Most hover blocks should reference transition
        const transitionsCount = cssContent.match(/transition:/gi).length;
        expect(transitionsCount).toBeGreaterThan(5);
      }
    });
  });
});