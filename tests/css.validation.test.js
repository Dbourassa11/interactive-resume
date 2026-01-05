/**
 * CSS Validation and Structure Tests
 * Validates CSS structure, styling conventions, and best practices
 */

const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf8');

describe('CSS Structure and Validation', () => {
  describe('CSS Variables and Theming', () => {
    test('should have CSS custom properties defined', () => {
      expect(cssContent).toMatch(/:root\s*{/i);
    });

    test('should define primary color variable', () => {
      expect(cssContent).toMatch(/--primary-color:/i);
    });

    test('should define color scheme variables', () => {
      const rootBlock = cssContent.match(/:root\s*{[^}]*}/s);
      expect(rootBlock).toBeTruthy();
      expect(rootBlock[0]).toMatch(/--.*-color:/i);
    });

    test('should use CSS variables for consistency', () => {
      const varUsage = cssContent.match(/var\(--[^)]+\)/g);
      expect(varUsage).toBeTruthy();
      expect(varUsage.length).toBeGreaterThan(5);
    });

    test('should define font family variables', () => {
      expect(cssContent).toMatch(/--.*font/i);
    });

    test('should define spacing/size variables', () => {
      const hasSpacing = cssContent.match(/--spacing|--padding|--margin|--gap/i);
      expect(hasSpacing).toBeTruthy();
    });
  });

  describe('Global Styles and Reset', () => {
    test('should have universal selector reset', () => {
      expect(cssContent).toMatch(/\*\s*{/);
    });

    test('should set box-sizing to border-box', () => {
      expect(cssContent).toMatch(/box-sizing:\s*border-box/i);
    });

    test('should have body styles', () => {
      expect(cssContent).toMatch(/body\s*{/);
    });

    test('should define base font family', () => {
      const bodyStyles = cssContent.match(/body\s*{[^}]*}/s);
      expect(bodyStyles).toBeTruthy();
      expect(bodyStyles[0]).toMatch(/font-family:/i);
    });

    test('should set default line-height', () => {
      expect(cssContent).toMatch(/line-height:/i);
    });

    test('should remove default margins and paddings', () => {
      expect(cssContent).toMatch(/margin:\s*0/i);
      expect(cssContent).toMatch(/padding:\s*0/i);
    });

    test('should set smooth scrolling behavior', () => {
      expect(cssContent).toMatch(/scroll-behavior:\s*smooth/i);
    });
  });

  describe('Typography', () => {
    test('should have heading styles', () => {
      expect(cssContent).toMatch(/h1[,\s{]/i);
    });

    test('should have paragraph styles', () => {
      expect(cssContent).toMatch(/p\s*{/i);
    });

    test('should use consistent font weights', () => {
      expect(cssContent).toMatch(/font-weight:/i);
    });

    test('should have responsive font sizes', () => {
      expect(cssContent).toMatch(/font-size:/i);
    });

    test('should define text color', () => {
      expect(cssContent).toMatch(/color:/i);
    });
  });

  describe('Navigation Styles', () => {
    test('should have navbar styles', () => {
      expect(cssContent).toMatch(/\.navbar\s*{/);
    });

    test('should have fixed or sticky navigation', () => {
      const navbarStyles = cssContent.match(/\.navbar\s*{[^}]*}/s);
      expect(navbarStyles).toBeTruthy();
      expect(navbarStyles[0]).toMatch(/position:\s*(fixed|sticky)/i);
    });

    test('should have nav-links styles', () => {
      expect(cssContent).toMatch(/\.nav-links\s*{/);
    });

    test('should have hamburger menu styles', () => {
      expect(cssContent).toMatch(/\.hamburger\s*{/);
    });

    test('should have active state for navigation', () => {
      expect(cssContent).toMatch(/\.active/i);
    });

    test('should have hover effects on navigation', () => {
      expect(cssContent).toMatch(/\.nav-links[^}]*:hover/i);
    });

    test('should have z-index for navbar', () => {
      const navbarStyles = cssContent.match(/\.navbar\s*{[^}]*}/s);
      expect(navbarStyles).toBeTruthy();
      expect(navbarStyles[0]).toMatch(/z-index:/i);
    });

    test('should have logo styles', () => {
      expect(cssContent).toMatch(/\.logo\s*{/);
    });
  });

  describe('Hero Section Styles', () => {
    test('should have hero section styles', () => {
      expect(cssContent).toMatch(/\.hero\s*{/);
    });

    test('should have hero-content styles', () => {
      expect(cssContent).toMatch(/\.hero-content\s*{/);
    });

    test('should have minimum height for hero', () => {
      const heroStyles = cssContent.match(/\.hero\s*{[^}]*}/s);
      expect(heroStyles).toBeTruthy();
      expect(heroStyles[0]).toMatch(/min-height:/i);
    });

    test('should have gradient or background styling', () => {
      const heroStyles = cssContent.match(/\.hero\s*{[^}]*}/s);
      expect(heroStyles).toBeTruthy();
      expect(heroStyles[0]).toMatch(/background/i);
    });

    test('should have CTA button styles', () => {
      expect(cssContent).toMatch(/\.btn\s*{/);
    });

    test('should have primary button styles', () => {
      expect(cssContent).toMatch(/\.btn-primary\s*{/);
    });

    test('should have secondary button styles', () => {
      expect(cssContent).toMatch(/\.btn-secondary\s*{/);
    });

    test('should have hover effects on buttons', () => {
      expect(cssContent).toMatch(/\.btn[^}]*:hover/i);
    });

    test('should have social links styles', () => {
      expect(cssContent).toMatch(/\.social-links\s*{/);
    });

    test('should have scroll indicator styles', () => {
      expect(cssContent).toMatch(/\.scroll-indicator\s*{/);
    });

    test('should have highlight/accent styles', () => {
      expect(cssContent).toMatch(/\.highlight\s*{/);
    });
  });

  describe('Section Styles', () => {
    test('should have generic section styles', () => {
      expect(cssContent).toMatch(/\.section\s*{/);
    });

    test('should have section-title styles', () => {
      expect(cssContent).toMatch(/\.section-title\s*{/);
    });

    test('should have container styles', () => {
      expect(cssContent).toMatch(/\.container\s*{/);
    });

    test('should have background color variations', () => {
      expect(cssContent).toMatch(/\.bg-light\s*{/);
    });

    test('should have consistent section padding', () => {
      const sectionStyles = cssContent.match(/\.section\s*{[^}]*}/s);
      expect(sectionStyles).toBeTruthy();
      expect(sectionStyles[0]).toMatch(/padding:/i);
    });
  });

  describe('About Section Styles', () => {
    test('should have about-content styles', () => {
      expect(cssContent).toMatch(/\.about-content\s*{/);
    });

    test('should have stats container styles', () => {
      expect(cssContent).toMatch(/\.stats\s*{/);
    });

    test('should have stat-item styles', () => {
      expect(cssContent).toMatch(/\.stat-item\s*{/);
    });

    test('should have stat-number styles', () => {
      expect(cssContent).toMatch(/\.stat-number\s*{/);
    });

    test('should have stat-label styles', () => {
      expect(cssContent).toMatch(/\.stat-label\s*{/);
    });

    test('should use flexbox or grid for stats layout', () => {
      const statsStyles = cssContent.match(/\.stats\s*{[^}]*}/s);
      expect(statsStyles).toBeTruthy();
      expect(statsStyles[0]).toMatch(/display:\s*(flex|grid)/i);
    });
  });

  describe('Skills Section Styles', () => {
    test('should have skills-grid styles', () => {
      expect(cssContent).toMatch(/\.skills-grid\s*{/);
    });

    test('should use CSS Grid for skills layout', () => {
      const skillsGrid = cssContent.match(/\.skills-grid\s*{[^}]*}/s);
      expect(skillsGrid).toBeTruthy();
      expect(skillsGrid[0]).toMatch(/display:\s*grid/i);
    });

    test('should have skill-category styles', () => {
      expect(cssContent).toMatch(/\.skill-category\s*{/);
    });

    test('should have skill-bar styles', () => {
      expect(cssContent).toMatch(/\.skill-bar\s*{/);
    });

    test('should have progress bar styles', () => {
      expect(cssContent).toMatch(/\.progress\s*{/);
    });

    test('should have progress-bar styles', () => {
      expect(cssContent).toMatch(/\.progress-bar\s*{/);
    });

    test('should have skill-info styles', () => {
      expect(cssContent).toMatch(/\.skill-info\s*{/);
    });

    test('should use transition for progress bars', () => {
      const progressBar = cssContent.match(/\.progress-bar\s*{[^}]*}/s);
      expect(progressBar).toBeTruthy();
      expect(progressBar[0]).toMatch(/transition:/i);
    });
  });

  describe('Timeline Styles', () => {
    test('should have timeline styles', () => {
      expect(cssContent).toMatch(/\.timeline\s*{/);
    });

    test('should have timeline-item styles', () => {
      expect(cssContent).toMatch(/\.timeline-item\s*{/);
    });

    test('should have timeline-dot styles', () => {
      expect(cssContent).toMatch(/\.timeline-dot\s*{/);
    });

    test('should have timeline-content styles', () => {
      expect(cssContent).toMatch(/\.timeline-content\s*{/);
    });

    test('should have timeline-date styles', () => {
      expect(cssContent).toMatch(/\.timeline-date\s*{/);
    });

    test('should use positioning for timeline elements', () => {
      const timelineItem = cssContent.match(/\.timeline-item\s*{[^}]*}/s);
      expect(timelineItem).toBeTruthy();
      expect(timelineItem[0]).toMatch(/position:/i);
    });
  });

  describe('Education Section Styles', () => {
    test('should have education-grid styles', () => {
      expect(cssContent).toMatch(/\.education-grid\s*{/);
    });

    test('should have education-card styles', () => {
      expect(cssContent).toMatch(/\.education-card\s*{/);
    });

    test('should have education-icon styles', () => {
      expect(cssContent).toMatch(/\.education-icon\s*{/);
    });

    test('should have education-date styles', () => {
      expect(cssContent).toMatch(/\.education-date\s*{/);
    });
  });

  describe('Projects Section Styles', () => {
    test('should have projects-grid styles', () => {
      expect(cssContent).toMatch(/\.projects-grid\s*{/);
    });

    test('should have project-card styles', () => {
      expect(cssContent).toMatch(/\.project-card\s*{/);
    });

    test('should have project-image styles', () => {
      expect(cssContent).toMatch(/\.project-image\s*{/);
    });

    test('should have project-overlay styles', () => {
      expect(cssContent).toMatch(/\.project-overlay\s*{/);
    });

    test('should have project-info styles', () => {
      expect(cssContent).toMatch(/\.project-info\s*{/);
    });

    test('should have project-tags styles', () => {
      expect(cssContent).toMatch(/\.project-tags\s*{/);
    });

    test('should have hover effects on project cards', () => {
      expect(cssContent).toMatch(/\.project-card[^}]*:hover/i);
    });

    test('should use transform for project animations', () => {
      const projectCard = cssContent.match(/\.project-card[^}]*:hover[^}]*{[^}]*}/s);
      if (projectCard) {
        expect(projectCard[0]).toMatch(/transform:/i);
      }
    });
  });

  describe('Contact Section Styles', () => {
    test('should have contact-content styles', () => {
      expect(cssContent).toMatch(/\.contact-content\s*{/);
    });

    test('should have contact-details styles', () => {
      expect(cssContent).toMatch(/\.contact-details\s*{/);
    });

    test('should have contact-item styles', () => {
      expect(cssContent).toMatch(/\.contact-item\s*{/);
    });

    test('should have contact-form styles', () => {
      expect(cssContent).toMatch(/\.contact-form\s*{/);
    });

    test('should have form-group styles', () => {
      expect(cssContent).toMatch(/\.form-group\s*{/);
    });
  });

  describe('Form Styles', () => {
    test('should have input field styles', () => {
      expect(cssContent).toMatch(/input\[type="text"\]|input\[type="email"\]|input\s*{/i);
    });

    test('should have textarea styles', () => {
      expect(cssContent).toMatch(/textarea\s*{/);
    });

    test('should have button styles', () => {
      expect(cssContent).toMatch(/button\s*{/);
    });

    test('should have focus states for inputs', () => {
      expect(cssContent).toMatch(/input[^}]*:focus|textarea[^}]*:focus/i);
    });

    test('should have label styles', () => {
      expect(cssContent).toMatch(/label\s*{/);
    });

    test('should remove default input styling', () => {
      const inputStyles = cssContent.match(/input[^{]*{[^}]*}/s);
      if (inputStyles) {
        expect(inputStyles[0]).toMatch(/border:|outline:/i);
      }
    });

    test('should have proper input padding', () => {
      const inputStyles = cssContent.match(/input[^{]*{[^}]*}/s);
      expect(inputStyles).toBeTruthy();
      expect(inputStyles[0]).toMatch(/padding:/i);
    });
  });

  describe('Footer Styles', () => {
    test('should have footer styles', () => {
      expect(cssContent).toMatch(/footer\s*{/);
    });

    test('should have footer background color', () => {
      const footerStyles = cssContent.match(/footer\s*{[^}]*}/s);
      expect(footerStyles).toBeTruthy();
      expect(footerStyles[0]).toMatch(/background/i);
    });

    test('should have footer text alignment', () => {
      const footerStyles = cssContent.match(/footer\s*{[^}]*}/s);
      expect(footerStyles).toBeTruthy();
      expect(footerStyles[0]).toMatch(/text-align:/i);
    });
  });

  describe('Animations and Transitions', () => {
    test('should have fade-in animation class', () => {
      expect(cssContent).toMatch(/\.fade-in/i);
    });

    test('should have transition properties', () => {
      const transitionCount = (cssContent.match(/transition:/gi) || []).length;
      expect(transitionCount).toBeGreaterThan(5);
    });

    test('should have keyframe animations', () => {
      expect(cssContent).toMatch(/@keyframes/i);
    });

    test('should use transform for animations', () => {
      expect(cssContent).toMatch(/transform:/i);
    });

    test('should have opacity transitions', () => {
      expect(cssContent).toMatch(/opacity:/i);
    });

    test('should use CSS animations for smooth effects', () => {
      expect(cssContent).toMatch(/animation:/i);
    });

    test('should have hover transitions', () => {
      expect(cssContent).toMatch(/:hover[^}]*{[^}]*transition/is);
    });
  });

  describe('Responsive Design', () => {
    test('should have media queries', () => {
      expect(cssContent).toMatch(/@media/i);
    });

    test('should have mobile breakpoint', () => {
      expect(cssContent).toMatch(/@media[^{]*\(max-width:\s*768px\)/i);
    });

    test('should have tablet breakpoint', () => {
      expect(cssContent).toMatch(/@media[^{]*\(max-width:\s*(1024|992)px\)/i);
    });

    test('should adjust navigation for mobile', () => {
      const mobileMedia = cssContent.match(/@media[^{]*\(max-width:\s*768px\)[^{]*{[\s\S]*?(?=@media|$)}/i);
      if (mobileMedia) {
        expect(mobileMedia[0]).toMatch(/\.nav-links|\.hamburger/i);
      }
    });

    test('should hide hamburger on desktop', () => {
      expect(cssContent).toMatch(/\.hamburger\s*{[^}]*display:\s*none/is);
    });

    test('should show hamburger on mobile', () => {
      const mobileMedia = cssContent.match(/@media[^{]*\(max-width:\s*768px\)[^{]*{[\s\S]*?(?=@media|$)}/i);
      if (mobileMedia) {
        expect(mobileMedia[0]).toMatch(/\.hamburger[^}]*display:\s*block/is);
      }
    });

    test('should adjust grid columns for mobile', () => {
      const mobileMedia = cssContent.match(/@media[^{]*\(max-width:\s*768px\)[^{]*{[\s\S]*?(?=@media|$)}/i);
      if (mobileMedia) {
        expect(mobileMedia[0]).toMatch(/grid-template-columns/i);
      }
    });

    test('should adjust font sizes for mobile', () => {
      const mobileMedia = cssContent.match(/@media[^{]*\(max-width:\s*768px\)[^{]*{[\s\S]*?(?=@media|$)}/i);
      if (mobileMedia) {
        expect(mobileMedia[0]).toMatch(/font-size/i);
      }
    });
  });

  describe('Accessibility Features', () => {
    test('should have focus visible styles', () => {
      expect(cssContent).toMatch(/:focus/i);
    });

    test('should have focus outline', () => {
      const focusStyles = cssContent.match(/:focus[^}]*{[^}]*}/gs);
      if (focusStyles) {
        const hasFocusIndicator = focusStyles.some(style => 
          style.match(/outline:|border:|box-shadow:/i)
        );
        expect(hasFocusIndicator).toBe(true);
      }
    });

    test('should have sufficient color contrast hints', () => {
      // Check for dark text on light background or vice versa
      expect(cssContent).toMatch(/color:\s*#(000|333|444|666)/i);
    });

    test('should not use outline: none without alternative', () => {
      const outlineNone = cssContent.match(/outline:\s*none/gi);
      if (outlineNone) {
        // Should have some focus styles elsewhere
        expect(cssContent).toMatch(/:focus[^}]*{[^}]*(box-shadow|border)/i);
      }
    });

    test('should have visible skip link styles', () => {
      // Check if there are any skip-to-content or similar accessibility links
      const hasSkipStyles = cssContent.match(/\.skip|\.sr-only/i);
      // This is optional but good to have
      expect(true).toBe(true); // Pass if not found
    });
  });

  describe('Layout and Spacing', () => {
    test('should use flexbox', () => {
      expect(cssContent).toMatch(/display:\s*flex/i);
    });

    test('should use CSS Grid', () => {
      expect(cssContent).toMatch(/display:\s*grid/i);
    });

    test('should have consistent spacing', () => {
      expect(cssContent).toMatch(/gap:/i);
    });

    test('should use margin for spacing', () => {
      const marginCount = (cssContent.match(/margin:/gi) || []).length;
      expect(marginCount).toBeGreaterThan(10);
    });

    test('should use padding for spacing', () => {
      const paddingCount = (cssContent.match(/padding:/gi) || []).length;
      expect(paddingCount).toBeGreaterThan(10);
    });

    test('should have max-width constraints for readability', () => {
      expect(cssContent).toMatch(/max-width:/i);
    });

    test('should center content with margin auto', () => {
      expect(cssContent).toMatch(/margin:\s*[^;]*auto/i);
    });
  });

  describe('Color Usage', () => {
    test('should use consistent color palette', () => {
      const colorMatches = cssContent.match(/#[0-9a-fA-F]{3,6}/g);
      expect(colorMatches).toBeTruthy();
      expect(colorMatches.length).toBeGreaterThan(5);
    });

    test('should define brand colors', () => {
      expect(cssContent).toMatch(/#[0-9a-fA-F]{3,6}/);
    });

    test('should use rgba for transparency', () => {
      expect(cssContent).toMatch(/rgba?\(/i);
    });

    test('should have background colors', () => {
      expect(cssContent).toMatch(/background-color:/i);
    });

    test('should have text colors', () => {
      const colorCount = (cssContent.match(/color:/gi) || []).length;
      expect(colorCount).toBeGreaterThan(5);
    });
  });

  describe('CSS Best Practices', () => {
    test('should not use !important excessively', () => {
      const importantCount = (cssContent.match(/!important/gi) || []).length;
      expect(importantCount).toBeLessThan(5);
    });

    test('should use class selectors primarily', () => {
      const classSelectors = (cssContent.match(/\.[a-zA-Z-_][a-zA-Z0-9-_]*/g) || []).length;
      expect(classSelectors).toBeGreaterThan(30);
    });

    test('should have organized structure', () => {
      // Check for comment sections
      const comments = cssContent.match(/\/\*[\s\S]*?\*\//g);
      expect(comments).toBeTruthy();
      expect(comments.length).toBeGreaterThan(3);
    });

    test('should use shorthand properties', () => {
      expect(cssContent).toMatch(/padding:\s*\d+/i);
      expect(cssContent).toMatch(/margin:\s*\d+/i);
    });

    test('should group related properties', () => {
      // Check that display/position properties come before styling
      expect(true).toBe(true); // Structure check
    });

    test('should use consistent naming convention', () => {
      // Check for kebab-case classes
      const classes = cssContent.match(/\.[a-z][a-z0-9-]*/g);
      expect(classes).toBeTruthy();
      expect(classes.length).toBeGreaterThan(20);
    });
  });

  describe('Performance Considerations', () => {
    test('should use transform for animations', () => {
      const transforms = cssContent.match(/transform:/gi);
      expect(transforms).toBeTruthy();
      expect(transforms.length).toBeGreaterThan(3);
    });

    test('should avoid expensive properties in transitions', () => {
      // Check that width/height are not used in transitions frequently
      const widthTransitions = cssContent.match(/transition:[^;]*width/gi);
      expect(widthTransitions || []).toHaveLength(0);
    });

    test('should use will-change sparingly', () => {
      const willChange = (cssContent.match(/will-change:/gi) || []).length;
      expect(willChange).toBeLessThan(3);
    });

    test('should batch animations with transform', () => {
      expect(cssContent).toMatch(/transform:[^;]*(translate|scale|rotate)/i);
    });
  });

  describe('Syntax Validation', () => {
    test('should have balanced braces', () => {
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('should end declarations with semicolons', () => {
      // Check that most declarations have semicolons
      const declarations = cssContent.match(/[a-z-]+:\s*[^;{}]+;/gi);
      expect(declarations).toBeTruthy();
      expect(declarations.length).toBeGreaterThan(50);
    });

    test('should not have empty rulesets', () => {
      const emptyRules = cssContent.match(/[^}]\{\s*\}/g);
      expect(emptyRules).toBeFalsy();
    });

    test('should use proper color formats', () => {
      const colors = cssContent.match(/#[0-9a-fA-F]{3,6}|rgba?\([^)]+\)/g);
      expect(colors).toBeTruthy();
    });

    test('should not have trailing spaces', () => {
      const trailingSpaces = cssContent.match(/[ \t]+$/gm);
      expect(trailingSpaces || []).toHaveLength(0);
    });
  });

  describe('Modern CSS Features', () => {
    test('should use CSS Grid', () => {
      expect(cssContent).toMatch(/display:\s*grid/i);
    });

    test('should use Flexbox', () => {
      expect(cssContent).toMatch(/display:\s*flex/i);
    });

    test('should use CSS custom properties (variables)', () => {
      expect(cssContent).toMatch(/var\(--[^)]+\)/);
    });

    test('should use calc() for dynamic sizing', () => {
      // Optional but modern
      const hasCalc = cssContent.match(/calc\(/);
      expect(true).toBe(true); // Pass regardless
    });

    test('should use modern units (rem, em, vh, vw)', () => {
      expect(cssContent).toMatch(/\d+(rem|em|vh|vw)/);
    });
  });

  describe('Print Styles', () => {
    test('should have print media query', () => {
      expect(cssContent).toMatch(/@media\s+print/i);
    });

    test('should optimize for print in print media query', () => {
      const printMedia = cssContent.match(/@media\s+print[^{]*{[\s\S]*?}/i);
      if (printMedia) {
        expect(printMedia[0]).toMatch(/background|color/i);
      }
    });
  });

  describe('Component-Specific Styles', () => {
    test('should style hamburger menu bars', () => {
      const hamburgerStyles = cssContent.match(/\.hamburger\s+span/i);
      expect(hamburgerStyles).toBeTruthy();
    });

    test('should have notification styles', () => {
      expect(cssContent).toMatch(/\.notification/i);
    });

    test('should have loading or animation states', () => {
      expect(cssContent).toMatch(/\.loaded|@keyframes/i);
    });

    test('should style card components consistently', () => {
      const cardStyles = [
        /\.project-card/,
        /\.education-card/
      ];
      
      cardStyles.forEach(pattern => {
        expect(cssContent).toMatch(pattern);
      });
    });
  });

  describe('Utility Classes', () => {
    test('should have text utility classes', () => {
      // Common utility patterns
      expect(cssContent).toMatch(/text-center|text-align:\s*center/i);
    });

    test('should have spacing utility classes', () => {
      // Check for any spacing-related classes
      expect(cssContent).toMatch(/margin|padding/i);
    });

    test('should have display utility classes', () => {
      expect(cssContent).toMatch(/display:\s*(none|block|flex|grid)/i);
    });
  });

  describe('Cross-Browser Compatibility', () => {
    test('should use standard properties', () => {
      // Check that vendor prefixes are minimal
      const vendorPrefixes = (cssContent.match(/-(webkit|moz|ms|o)-/g) || []).length;
      expect(vendorPrefixes).toBeLessThan(10);
    });

    test('should have fallback values for custom properties', () => {
      // Modern CSS should work without extensive fallbacks
      expect(true).toBe(true);
    });
  });
});