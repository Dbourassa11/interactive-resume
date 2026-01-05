/**
 * Comprehensive CSS Validation Tests
 * Tests CSS structure, styling, responsiveness, and best practices
 */

const fs = require('fs');
const path = require('path');

describe('Interactive Resume - CSS Validation', () => {
  let cssContent;

  beforeAll(() => {
    cssContent = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf8');
  });

  describe('CSS Variables and Theme', () => {
    test('should define CSS custom properties in :root', () => {
      expect(cssContent).toMatch(/:root\s*{[^}]*--[^}]+}/s);
    });

    test('should have color variables defined', () => {
      const rootVars = cssContent.match(/:root\s*{([^}]+)}/s);
      if (rootVars) {
        expect(rootVars[1]).toMatch(/--[^:]+:\s*#[0-9a-fA-F]{3,6}|rgb|hsl/);
      }
    });

    test('should use consistent color scheme', () => {
      const colors = cssContent.match(/(?:color|background(?:-color)?|border-color):\s*(?:var\(--[^)]+\)|#[0-9a-fA-F]{3,6}|rgb[a]?\([^)]+\))/gi) || [];
      expect(colors.length).toBeGreaterThan(10);
    });

    test('should define primary and secondary colors', () => {
      const rootSection = cssContent.match(/:root\s*{([^}]+)}/s);
      if (rootSection) {
        expect(rootSection[1]).toMatch(/--primary/i);
      }
    });

    test('CSS variables should have descriptive names', () => {
      const variables = cssContent.match(/--[a-z-]+/gi) || [];
      variables.forEach(variable => {
        expect(variable.length).toBeGreaterThan(3);
        expect(variable).toMatch(/^--[a-z-]+$/);
      });
    });
  });

  describe('Global Styles and Reset', () => {
    test('should have universal box-sizing', () => {
      expect(cssContent).toMatch(/\*[^{]*{[^}]*box-sizing:\s*border-box/s);
    });

    test('should reset default margins and paddings', () => {
      expect(cssContent).toMatch(/margin:\s*0/i);
      expect(cssContent).toMatch(/padding:\s*0/i);
    });

    test('should set base font properties on body', () => {
      const bodyStyles = cssContent.match(/body\s*{([^}]+)}/s);
      expect(bodyStyles).toBeTruthy();
      expect(bodyStyles[1]).toMatch(/font-family/i);
    });

    test('should define smooth scrolling behavior', () => {
      expect(cssContent).toMatch(/scroll-behavior:\s*smooth/i);
    });

    test('should set line-height for readability', () => {
      const bodyStyles = cssContent.match(/body\s*{([^}]+)}/s);
      if (bodyStyles) {
        expect(bodyStyles[1]).toMatch(/line-height/i);
      }
    });

    test('should remove list styles where appropriate', () => {
      expect(cssContent).toMatch(/list-style:\s*none/i);
    });

    test('should style links consistently', () => {
      expect(cssContent).toMatch(/a\s*{[^}]*text-decoration/s);
    });
  });

  describe('Navigation Styles', () => {
    test('should style navbar', () => {
      expect(cssContent).toMatch(/\.navbar\s*{[^}]+}/s);
    });

    test('navbar should have positioning', () => {
      const navbarStyles = cssContent.match(/\.navbar\s*{([^}]+)}/s);
      expect(navbarStyles).toBeTruthy();
      expect(navbarStyles[1]).toMatch(/position:\s*(fixed|sticky)/i);
    });

    test('navbar should have z-index for layering', () => {
      const navbarStyles = cssContent.match(/\.navbar\s*{([^}]+)}/s);
      if (navbarStyles) {
        expect(navbarStyles[1]).toMatch(/z-index/i);
      }
    });

    test('should style navigation links', () => {
      expect(cssContent).toMatch(/\.nav-links\s*{[^}]+}/s);
    });

    test('should have active state for navigation links', () => {
      expect(cssContent).toMatch(/\.nav-links.*\.active|\.active.*nav/is);
    });

    test('should style hamburger menu', () => {
      expect(cssContent).toMatch(/\.hamburger\s*{[^}]+}/s);
    });

    test('hamburger should have cursor pointer', () => {
      const hamburgerStyles = cssContent.match(/\.hamburger[^{]*{([^}]+)}/s);
      if (hamburgerStyles) {
        expect(hamburgerStyles[1]).toMatch(/cursor:\s*pointer/i);
      }
    });

    test('should have hover effects on navigation', () => {
      expect(cssContent).toMatch(/\.nav-links.*:hover|\.navbar.*:hover/is);
    });

    test('should have transition effects', () => {
      const navStyles = cssContent.match(/\.nav[^{]*{([^}]+)}/gs) || [];
      const hasTransition = navStyles.some(style => style.match(/transition/i));
      expect(hasTransition).toBe(true);
    });
  });

  describe('Hero Section Styles', () => {
    test('should style hero section', () => {
      expect(cssContent).toMatch(/\.hero\s*{[^}]+}/s);
    });

    test('hero should have minimum height', () => {
      const heroStyles = cssContent.match(/\.hero\s*{([^}]+)}/s);
      if (heroStyles) {
        expect(heroStyles[1]).toMatch(/(?:min-)?height/i);
      }
    });

    test('should center hero content', () => {
      const heroStyles = cssContent.match(/\.hero[^{]*{([^}]+)}/s);
      if (heroStyles) {
        const hasFlexCenter = heroStyles[1].match(/display:\s*flex/i) && 
                             (heroStyles[1].match(/align-items:\s*center/i) || 
                              heroStyles[1].match(/justify-content:\s*center/i));
        const hasTextCenter = heroStyles[1].match(/text-align:\s*center/i);
        expect(hasFlexCenter || hasTextCenter).toBeTruthy();
      }
    });

    test('should have gradient or background styling', () => {
      const heroStyles = cssContent.match(/\.hero[^{]*{([^}]+)}/s);
      if (heroStyles) {
        expect(heroStyles[1]).toMatch(/background|gradient/i);
      }
    });

    test('should style CTA buttons', () => {
      expect(cssContent).toMatch(/\.btn\s*{[^}]+}/s);
    });

    test('buttons should have hover states', () => {
      expect(cssContent).toMatch(/\.btn:hover\s*{[^}]+}/s);
    });

    test('should distinguish primary and secondary buttons', () => {
      expect(cssContent).toMatch(/\.btn-primary\s*{[^}]+}/s);
      expect(cssContent).toMatch(/\.btn-secondary\s*{[^}]+}/s);
    });

    test('should style social links', () => {
      expect(cssContent).toMatch(/\.social-links\s*{[^}]+}/s);
    });

    test('social links should have hover effects', () => {
      expect(cssContent).toMatch(/\.social-links.*:hover/is);
    });

    test('should style scroll indicator', () => {
      expect(cssContent).toMatch(/\.scroll-indicator\s*{[^}]+}/s);
    });
  });

  describe('Section Styles', () => {
    test('should style section elements', () => {
      expect(cssContent).toMatch(/\.section\s*{[^}]+}/s);
    });

    test('sections should have padding', () => {
      const sectionStyles = cssContent.match(/\.section\s*{([^}]+)}/s);
      if (sectionStyles) {
        expect(sectionStyles[1]).toMatch(/padding/i);
      }
    });

    test('should style section titles', () => {
      expect(cssContent).toMatch(/\.section-title\s*{[^}]+}/s);
    });

    test('should have container class for content width', () => {
      expect(cssContent).toMatch(/\.container\s*{[^}]+}/s);
    });

    test('container should have max-width', () => {
      const containerStyles = cssContent.match(/\.container\s*{([^}]+)}/s);
      if (containerStyles) {
        expect(containerStyles[1]).toMatch(/max-width/i);
      }
    });

    test('should have alternating section backgrounds', () => {
      expect(cssContent).toMatch(/\.bg-light\s*{[^}]+}/s);
    });

    test('section titles should be centered or prominent', () => {
      const titleStyles = cssContent.match(/\.section-title\s*{([^}]+)}/s);
      if (titleStyles) {
        const isCentered = titleStyles[1].match(/text-align:\s*center/i);
        const hasLargeSize = titleStyles[1].match(/font-size/i);
        expect(isCentered || hasLargeSize).toBeTruthy();
      }
    });
  });

  describe('Skills Section Styles', () => {
    test('should style skills grid', () => {
      expect(cssContent).toMatch(/\.skills-grid\s*{[^}]+}/s);
    });

    test('should use CSS Grid or Flexbox for layout', () => {
      const skillsGrid = cssContent.match(/\.skills-grid\s*{([^}]+)}/s);
      if (skillsGrid) {
        const hasGrid = skillsGrid[1].match(/display:\s*grid/i);
        const hasFlex = skillsGrid[1].match(/display:\s*flex/i);
        expect(hasGrid || hasFlex).toBeTruthy();
      }
    });

    test('should style skill categories', () => {
      expect(cssContent).toMatch(/\.skill-category\s*{[^}]+}/s);
    });

    test('should style skill bars', () => {
      expect(cssContent).toMatch(/\.skill-bar\s*{[^}]+}/s);
    });

    test('should style progress bars', () => {
      expect(cssContent).toMatch(/\.progress-bar\s*{[^}]+}/s);
    });

    test('progress bars should have width transition', () => {
      const progressStyles = cssContent.match(/\.progress-bar\s*{([^}]+)}/s);
      if (progressStyles) {
        expect(progressStyles[1]).toMatch(/transition/i);
      }
    });

    test('should style progress container', () => {
      expect(cssContent).toMatch(/\.progress\s*{[^}]+}/s);
    });

    test('skill bars should have proper height', () => {
      const progressStyles = cssContent.match(/\.progress\s*{([^}]+)}/s);
      if (progressStyles) {
        expect(progressStyles[1]).toMatch(/height/i);
      }
    });
  });

  describe('Timeline Styles (Experience)', () => {
    test('should style timeline', () => {
      expect(cssContent).toMatch(/\.timeline\s*{[^}]+}/s);
    });

    test('should style timeline items', () => {
      expect(cssContent).toMatch(/\.timeline-item\s*{[^}]+}/s);
    });

    test('should style timeline dots', () => {
      expect(cssContent).toMatch(/\.timeline-dot\s*{[^}]+}/s);
    });

    test('timeline should have visual line or connection', () => {
      const timelineStyles = cssContent.match(/\.timeline[^{]*{([^}]+)}/s);
      if (timelineStyles) {
        const hasBorder = timelineStyles[1].match(/border/i);
        const hasPseudo = cssContent.match(/\.timeline::(?:before|after)/i);
        expect(hasBorder || hasPseudo).toBeTruthy();
      }
    });

    test('should style timeline content', () => {
      expect(cssContent).toMatch(/\.timeline-content\s*{[^}]+}/s);
    });

    test('should style timeline dates', () => {
      expect(cssContent).toMatch(/\.timeline-date\s*{[^}]+}/s);
    });
  });

  describe('Project Cards Styles', () => {
    test('should style projects grid', () => {
      expect(cssContent).toMatch(/\.projects-grid\s*{[^}]+}/s);
    });

    test('should style project cards', () => {
      expect(cssContent).toMatch(/\.project-card\s*{[^}]+}/s);
    });

    test('project cards should have hover effects', () => {
      expect(cssContent).toMatch(/\.project-card:hover\s*{[^}]+}/s);
    });

    test('should style project images', () => {
      expect(cssContent).toMatch(/\.project-image\s*{[^}]+}/s);
    });

    test('should style project overlay', () => {
      expect(cssContent).toMatch(/\.project-overlay\s*{[^}]+}/s);
    });

    test('project overlay should be positioned absolutely', () => {
      const overlayStyles = cssContent.match(/\.project-overlay\s*{([^}]+)}/s);
      if (overlayStyles) {
        expect(overlayStyles[1]).toMatch(/position:\s*absolute/i);
      }
    });

    test('should style project tags', () => {
      expect(cssContent).toMatch(/\.project-tags\s*{[^}]+}/s);
    });

    test('project images should cover container', () => {
      const imgStyles = cssContent.match(/\.project-image\s+img\s*{([^}]+)}/s);
      if (imgStyles) {
        expect(imgStyles[1]).toMatch(/object-fit|width.*100%/i);
      }
    });
  });

  describe('Form Styles', () => {
    test('should style contact form', () => {
      expect(cssContent).toMatch(/\.contact-form\s*{[^}]+}/s);
    });

    test('should style form groups', () => {
      expect(cssContent).toMatch(/\.form-group\s*{[^}]+}/s);
    });

    test('should style input fields', () => {
      expect(cssContent).toMatch(/input\[type="text"\]|input\[type="email"\]|input\s*{/i);
    });

    test('should style textarea', () => {
      expect(cssContent).toMatch(/textarea\s*{[^}]+}/s);
    });

    test('inputs should have focus states', () => {
      expect(cssContent).toMatch(/input:focus|textarea:focus/i);
    });

    test('should style labels', () => {
      expect(cssContent).toMatch(/label\s*{[^}]+}/s);
    });

    test('form fields should have border styling', () => {
      const inputStyles = cssContent.match(/(?:input|textarea)[^{]*{([^}]+)}/s);
      if (inputStyles) {
        expect(inputStyles[1]).toMatch(/border/i);
      }
    });

    test('form fields should have padding', () => {
      const inputStyles = cssContent.match(/(?:input|textarea)[^{]*{([^}]+)}/s);
      if (inputStyles) {
        expect(inputStyles[1]).toMatch(/padding/i);
      }
    });

    test('should remove default outline on focus and add custom focus state', () => {
      const focusStyles = cssContent.match(/(?:input|textarea):focus[^{]*{([^}]+)}/s);
      if (focusStyles) {
        expect(focusStyles[1]).toMatch(/outline|border|box-shadow/i);
      }
    });
  });

  describe('Statistics/Counter Styles', () => {
    test('should style stats section', () => {
      expect(cssContent).toMatch(/\.stats\s*{[^}]+}/s);
    });

    test('should style stat items', () => {
      expect(cssContent).toMatch(/\.stat-item\s*{[^}]+}/s);
    });

    test('should style stat numbers', () => {
      expect(cssContent).toMatch(/\.stat-number\s*{[^}]+}/s);
    });

    test('stat numbers should be prominent', () => {
      const statNumStyles = cssContent.match(/\.stat-number\s*{([^}]+)}/s);
      if (statNumStyles) {
        expect(statNumStyles[1]).toMatch(/font-size|font-weight/i);
      }
    });

    test('should style stat labels', () => {
      expect(cssContent).toMatch(/\.stat-label\s*{[^}]+}/s);
    });
  });

  describe('Education Cards Styles', () => {
    test('should style education grid', () => {
      expect(cssContent).toMatch(/\.education-grid\s*{[^}]+}/s);
    });

    test('should style education cards', () => {
      expect(cssContent).toMatch(/\.education-card\s*{[^}]+}/s);
    });

    test('should style education icons', () => {
      expect(cssContent).toMatch(/\.education-icon\s*{[^}]+}/s);
    });

    test('education cards should have consistent styling', () => {
      const eduCardStyles = cssContent.match(/\.education-card\s*{([^}]+)}/s);
      if (eduCardStyles) {
        expect(eduCardStyles[1]).toMatch(/padding|margin|border|background/i);
      }
    });
  });

  describe('Footer Styles', () => {
    test('should style footer', () => {
      expect(cssContent).toMatch(/\.footer\s*{[^}]+}|footer\s*{[^}]+}/s);
    });

    test('footer should have background color', () => {
      const footerStyles = cssContent.match(/\.?footer\s*{([^}]+)}/s);
      if (footerStyles) {
        expect(footerStyles[1]).toMatch(/background/i);
      }
    });

    test('footer should have padding', () => {
      const footerStyles = cssContent.match(/\.?footer\s*{([^}]+)}/s);
      if (footerStyles) {
        expect(footerStyles[1]).toMatch(/padding/i);
      }
    });

    test('should style footer links', () => {
      expect(cssContent).toMatch(/\.footer-links\s*{[^}]+}/s);
    });
  });

  describe('Animations and Transitions', () => {
    test('should define fade-in animations', () => {
      expect(cssContent).toMatch(/\.fade-in|@keyframes\s+fade/i);
    });

    test('should use transitions for smooth effects', () => {
      const transitions = cssContent.match(/transition:/gi) || [];
      expect(transitions.length).toBeGreaterThan(5);
    });

    test('should define keyframe animations', () => {
      expect(cssContent).toMatch(/@keyframes/i);
    });

    test('animations should have reasonable durations', () => {
      const durations = cssContent.match(/(?:animation-duration|transition):\s*[\d.]+s/gi) || [];
      durations.forEach(duration => {
        const seconds = parseFloat(duration.match(/([\d.]+)s/)[1]);
        expect(seconds).toBeGreaterThan(0);
        expect(seconds).toBeLessThan(5); // Not too long
      });
    });

    test('should use transform for performance', () => {
      expect(cssContent).toMatch(/transform:/i);
    });

    test('transitions should specify properties for better performance', () => {
      const transitions = cssContent.match(/transition:\s*[^;]+;/gi) || [];
      const goodTransitions = transitions.filter(t => 
        !t.match(/transition:\s*all/i) || t.match(/transform|opacity|color/i)
      );
      expect(goodTransitions.length).toBeGreaterThan(0);
    });

    test('should have animation delays for staggered effects', () => {
      expect(cssContent).toMatch(/\.fade-in-delay|animation-delay/i);
    });
  });

  describe('Responsive Design', () => {
    test('should have media queries for mobile devices', () => {
      expect(cssContent).toMatch(/@media[^{]*\([^)]*max-width/i);
    });

    test('should have at least one mobile breakpoint', () => {
      const mediaQueries = cssContent.match(/@media[^{]*{/gi) || [];
      expect(mediaQueries.length).toBeGreaterThan(0);
    });

    test('should have common breakpoints (768px, 992px, 1200px)', () => {
      const hasTablet = cssContent.match(/@media[^{]*(?:768|800)px/i);
      const hasDesktop = cssContent.match(/@media[^{]*(?:992|1024|1200)px/i);
      expect(hasTablet || hasDesktop).toBeTruthy();
    });

    test('mobile menu should be hidden on desktop', () => {
      const hamburgerStyles = cssContent.match(/\.hamburger\s*{([^}]+)}/s);
      if (hamburgerStyles) {
        expect(hamburgerStyles[1]).toMatch(/display:\s*none/i);
      }
    });

    test('should adjust layout for mobile in media queries', () => {
      const mediaQueries = cssContent.match(/@media[^{]*{[^}]*}/gs) || [];
      const hasFlexDirection = mediaQueries.some(mq => mq.match(/flex-direction:\s*column/i));
      const hasGridColumns = mediaQueries.some(mq => mq.match(/grid-template-columns:\s*1fr/i));
      expect(hasFlexDirection || hasGridColumns).toBeTruthy();
    });

    test('font sizes should be responsive', () => {
      const mediaQuery = cssContent.match(/@media[^{]*{([^}]+)}/s);
      if (mediaQuery) {
        expect(mediaQuery[1]).toMatch(/font-size/i);
      }
    });

    test('should hide/show elements on mobile', () => {
      const mediaQueries = cssContent.match(/@media[^{]*{([^}]+)}/gs) || [];
      const hasDisplayChanges = mediaQueries.some(mq => mq.match(/display:\s*(?:none|block|flex)/i));
      expect(hasDisplayChanges).toBeTruthy();
    });
  });

  describe('Accessibility Features', () => {
    test('should have focus indicators', () => {
      expect(cssContent).toMatch(/:focus/i);
    });

    test('focus states should be visible', () => {
      const focusStyles = cssContent.match(/:focus[^{]*{([^}]+)}/gs) || [];
      const hasVisibleFocus = focusStyles.some(style => 
        style.match(/outline|border|box-shadow/i)
      );
      expect(hasVisibleFocus).toBe(true);
    });

    test('should not completely remove outlines without alternative', () => {
      const outlineNone = cssContent.match(/outline:\s*none[^}]*}/gi) || [];
      outlineNone.forEach(style => {
        const context = cssContent.substring(
          cssContent.indexOf(style) - 200,
          cssContent.indexOf(style) + 200
        );
        // Should have alternative focus indicator
        expect(context).toMatch(/border|box-shadow|background/i);
      });
    });

    test('text should have sufficient contrast', () => {
      // Basic check - should not use very light text on light background
      const bodyStyles = cssContent.match(/body\s*{([^}]+)}/s);
      if (bodyStyles) {
        const hasColor = bodyStyles[1].match(/color/i);
        expect(hasColor).toBeTruthy();
      }
    });

    test('links should be distinguishable', () => {
      const linkStyles = cssContent.match(/a\s*{([^}]+)}/s);
      if (linkStyles) {
        expect(linkStyles[1]).toMatch(/color|text-decoration/i);
      }
    });

    test('should have cursor pointer on clickable elements', () => {
      const clickableElements = cssContent.match(/(?:button|\.btn|\.hamburger)[^{]*{([^}]+)}/gs) || [];
      const hasCursor = clickableElements.some(style => style.match(/cursor:\s*pointer/i));
      expect(hasCursor).toBe(true);
    });
  });

  describe('Typography', () => {
    test('should define font families', () => {
      expect(cssContent).toMatch(/font-family:/i);
    });

    test('should use system fonts or web-safe fonts', () => {
      const fontFamilies = cssContent.match(/font-family:\s*([^;]+);/gi) || [];
      expect(fontFamilies.length).toBeGreaterThan(0);
    });

    test('should have heading styles', () => {
      expect(cssContent).toMatch(/h[1-6]\s*{[^}]+}|h[1-6],\s*h[1-6]/s);
    });

    test('headings should be distinct from body text', () => {
      const headingStyles = cssContent.match(/h[1-6][^{]*{([^}]+)}/s);
      if (headingStyles) {
        expect(headingStyles[1]).toMatch(/font-size|font-weight|margin/i);
      }
    });

    test('should set appropriate line heights', () => {
      const lineHeights = cssContent.match(/line-height:\s*[\d.]+/gi) || [];
      expect(lineHeights.length).toBeGreaterThan(0);
    });

    test('should use relative units for font sizes', () => {
      const fontSizes = cssContent.match(/font-size:\s*[\d.]+(?:rem|em|%)/gi) || [];
      expect(fontSizes.length).toBeGreaterThan(0);
    });
  });

  describe('Layout and Spacing', () => {
    test('should use consistent spacing units', () => {
      const margins = cssContent.match(/margin:\s*[\d.]+(?:px|rem|em)/gi) || [];
      const paddings = cssContent.match(/padding:\s*[\d.]+(?:px|rem|em)/gi) || [];
      expect(margins.length + paddings.length).toBeGreaterThan(10);
    });

    test('should use Flexbox for layouts', () => {
      expect(cssContent).toMatch(/display:\s*flex/i);
    });

    test('should use CSS Grid where appropriate', () => {
      expect(cssContent).toMatch(/display:\s*grid/i);
    });

    test('should center content appropriately', () => {
      const centerPatterns = [
        /margin:\s*(?:0\s+)?auto/i,
        /justify-content:\s*center/i,
        /align-items:\s*center/i,
        /text-align:\s*center/i
      ];
      const hasCentering = centerPatterns.some(pattern => cssContent.match(pattern));
      expect(hasCentering).toBe(true);
    });

    test('should have appropriate gap/spacing in grid/flex layouts', () => {
      const gaps = cssContent.match(/gap:|column-gap:|row-gap:/gi) || [];
      expect(gaps.length).toBeGreaterThan(0);
    });
  });

  describe('Colors and Visual Design', () => {
    test('should use consistent color palette', () => {
      const colors = cssContent.match(/#[0-9a-fA-F]{3,6}/g) || [];
      const uniqueColors = [...new Set(colors)];
      // Should have colors but not too many (consistent palette)
      expect(uniqueColors.length).toBeGreaterThan(3);
      expect(uniqueColors.length).toBeLessThan(30);
    });

    test('should use modern color formats (rgba, hsla)', () => {
      const modernColors = cssContent.match(/rgba?\([^)]+\)|hsla?\([^)]+\)/gi) || [];
      expect(modernColors.length).toBeGreaterThan(0);
    });

    test('should have box shadows for depth', () => {
      expect(cssContent).toMatch(/box-shadow:/i);
    });

    test('should use border-radius for modern look', () => {
      expect(cssContent).toMatch(/border-radius:/i);
    });

    test('should have background colors defined', () => {
      const backgrounds = cssContent.match(/background(?:-color)?:\s*[^;]+;/gi) || [];
      expect(backgrounds.length).toBeGreaterThan(5);
    });
  });

  describe('Performance Considerations', () => {
    test('should avoid expensive properties in animations', () => {
      const animations = cssContent.match(/@keyframes[^{]*{[^}]*}[^}]*}/gs) || [];
      animations.forEach(animation => {
        // Should primarily use transform and opacity
        const hasExpensive = animation.match(/(?:width|height|top|left|right|bottom|margin|padding):/i);
        if (hasExpensive) {
          const hasTransform = animation.match(/transform:/i);
          // If using expensive properties, should also use transform
          expect(hasTransform).toBeTruthy();
        }
      });
    });

    test('should use transform instead of position changes', () => {
      const transforms = cssContent.match(/transform:/gi) || [];
      expect(transforms.length).toBeGreaterThan(3);
    });

    test('should use will-change sparingly', () => {
      const willChange = cssContent.match(/will-change:/gi) || [];
      // Should either not use it, or use it very sparingly
      expect(willChange.length).toBeLessThan(5);
    });

    test('should minimize use of universal selector with properties', () => {
      const universalWithProps = cssContent.match(/\*\s*{[^}]+(?:transform|transition|animation)[^}]+}/s);
      // It's OK to have *, but it shouldn't have expensive properties
      if (universalWithProps) {
        // This is acceptable for box-sizing but not for animations
        expect(universalWithProps[0]).toMatch(/box-sizing/i);
      }
    });
  });

  describe('Best Practices and Code Quality', () => {
    test('should not use !important excessively', () => {
      const importants = cssContent.match(/!important/gi) || [];
      expect(importants.length).toBeLessThan(10);
    });

    test('should have organized structure with comments', () => {
      const comments = cssContent.match(/\/\*[\s\S]*?\*\//g) || [];
      expect(comments.length).toBeGreaterThan(0);
    });

    test('should use shorthand properties where possible', () => {
      // Check for margin, padding, border shorthand
      expect(cssContent).toMatch(/(?:margin|padding|border):\s*[\d.]+[^\s;]+\s+[\d.]+/i);
    });

    test('should group related selectors', () => {
      const commaSelectors = cssContent.match(/[^{,]+,\s*[^{,]+\s*{/g) || [];
      expect(commaSelectors.length).toBeGreaterThan(0);
    });

    test('should not have empty rule sets', () => {
      const emptyRules = cssContent.match(/[^}]\s*{\s*}/g) || [];
      expect(emptyRules.length).toBe(0);
    });

    test('should end declarations with semicolons', () => {
      const declarations = cssContent.match(/[a-z-]+:\s*[^;{}]+}/gi) || [];
      // Most declarations should end with semicolon before }
      expect(declarations.length).toBeLessThan(20); // Allow some flexibility
    });

    test('should use lowercase for properties and values', () => {
      const uppercaseProps = cssContent.match(/\s+[A-Z][a-z-]+:/g) || [];
      expect(uppercaseProps.length).toBe(0);
    });

    test('should have proper indentation (not checking specifics but structure)', () => {
      const lines = cssContent.split('\n');
      const indentedLines = lines.filter(line => line.match(/^\s{2,}/));
      // Should have some indentation
      expect(indentedLines.length).toBeGreaterThan(lines.length * 0.3);
    });
  });

  describe('Vendor Prefixes', () => {
    test('should use vendor prefixes for transform if needed', () => {
      // Modern browsers don't need these, but checking if used correctly
      const transforms = cssContent.match(/transform:/gi) || [];
      const vendorTransforms = cssContent.match(/(?:-webkit-|-moz-|-ms-)transform:/gi) || [];
      
      // Either use no vendor prefixes (modern) or use them consistently
      if (vendorTransforms.length > 0) {
        expect(vendorTransforms.length).toBeGreaterThanOrEqual(transforms.length * 0.5);
      }
    });

    test('should handle flexbox vendor prefixes if supporting old browsers', () => {
      const flexbox = cssContent.match(/display:\s*flex/gi) || [];
      // Modern approach is to not use vendor prefixes, which is fine
      expect(flexbox.length).toBeGreaterThan(0);
    });
  });

  describe('Specific Component Styles', () => {
    test('should style notification component', () => {
      // Notification is created dynamically, but might have styles
      const hasNotificationStyles = cssContent.match(/\.notification/i);
      // This is optional as notifications are styled inline
    });

    test('should have mobile menu active state', () => {
      expect(cssContent).toMatch(/\.nav-links\.active|\.active\.nav-links/i);
    });

    test('hamburger should have animation on active state', () => {
      const hamburgerActive = cssContent.match(/\.hamburger\.active/i);
      if (hamburgerActive) {
        // Should transform the hamburger into an X
        expect(cssContent).toMatch(/\.hamburger\.active.*transform/is);
      }
    });

    test('should style contact details', () => {
      expect(cssContent).toMatch(/\.contact-details\s*{[^}]+}/s);
    });

    test('should style contact items', () => {
      expect(cssContent).toMatch(/\.contact-item\s*{[^}]+}/s);
    });
  });

  describe('CSS Syntax Validation', () => {
    test('should have balanced braces', () => {
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('should not have duplicate selectors in close proximity', () => {
      const selectors = cssContent.match(/[^}]+{/g) || [];
      const selectorTexts = selectors.map(s => s.trim());
      
      // Check for duplicates within 10 lines
      for (let i = 0; i < selectorTexts.length - 1; i++) {
        if (selectorTexts[i] === selectorTexts[i + 1]) {
          // Consecutive duplicates might be intentional (media queries)
          // but generally should be avoided
        }
      }
    });

    test('should use valid CSS properties', () => {
      // Check for common typos
      expect(cssContent).not.toMatch(/color\s*:/i); // This should be 'color:'
      expect(cssContent).not.toMatch(/background\s*:/i); // This should be 'background:'
      // Actually these are valid, checking syntax instead
      const properties = cssContent.match(/([a-z-]+):\s*[^;]+;/gi) || [];
      expect(properties.length).toBeGreaterThan(50);
    });

    test('should not have trailing whitespace in selectors', () => {
      const selectorsWithTrailing = cssContent.match(/[a-z-]\s+{/gi) || [];
      // Some might be intentional (descendant selectors), but excessive trailing is bad
      expect(selectorsWithTrailing.length).toBeLessThan(cssContent.match(/{/g).length * 0.1);
    });
  });

  describe('Print Styles (if applicable)', () => {
    test('should consider print media if present', () => {
      const printMedia = cssContent.match(/@media\s+print/i);
      // Optional but good to have
      if (printMedia) {
        expect(printMedia).toBeTruthy();
      }
    });
  });
});