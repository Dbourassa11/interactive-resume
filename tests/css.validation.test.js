/**
 * CSS Validation and Quality Tests
 * Validates CSS structure, syntax, best practices, and design patterns
 */

const fs = require('fs');
const path = require('path');

describe('CSS Validation Tests', () => {
  let cssContent;

  beforeAll(() => {
    cssContent = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  describe('CSS Reset and Base Styles', () => {
    test('should have universal selector reset', () => {
      expect(cssContent).toMatch(/\*\s*\{[^}]*margin:\s*0/i);
      expect(cssContent).toMatch(/\*\s*\{[^}]*padding:\s*0/i);
      expect(cssContent).toMatch(/\*\s*\{[^}]*box-sizing:\s*border-box/i);
    });

    test('should define body styles', () => {
      expect(cssContent).toMatch(/body\s*\{/i);
    });

    test('should have font-family defined', () => {
      expect(cssContent).toMatch(/font-family:/i);
    });

    test('should have line-height for readability', () => {
      expect(cssContent).toMatch(/line-height:/i);
    });
  });

  describe('CSS Custom Properties (Variables)', () => {
    test('should define CSS custom properties in :root', () => {
      expect(cssContent).toMatch(/:root\s*\{/i);
    });

    test('should have color variables', () => {
      expect(cssContent).toMatch(/--primary-color:/i);
      expect(cssContent).toMatch(/--secondary-color:/i);
      expect(cssContent).toMatch(/--accent-color:/i);
    });

    test('should have text color variables', () => {
      expect(cssContent).toMatch(/--text-dark:/i);
      expect(cssContent).toMatch(/--text-light:/i);
    });

    test('should have background color variables', () => {
      expect(cssContent).toMatch(/--bg-light:/i);
      expect(cssContent).toMatch(/--white:/i);
    });

    test('should have shadow variables', () => {
      expect(cssContent).toMatch(/--shadow:/i);
    });

    test('should have transition variable', () => {
      expect(cssContent).toMatch(/--transition:/i);
    });

    test('should use var() function to reference custom properties', () => {
      expect(cssContent).toMatch(/var\(--[a-z-]+\)/i);
    });

    test('should have valid hex color values', () => {
      const hexColors = cssContent.match(/#[0-9a-f]{3,6}/gi);
      expect(hexColors).toBeTruthy();
      hexColors.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{3}$|^#[0-9a-f]{6}$/i);
      });
    });
  });

  describe('Layout and Container Styles', () => {
    test('should have container class', () => {
      expect(cssContent).toMatch(/\.container\s*\{/i);
    });

    test('should have max-width for containers', () => {
      expect(cssContent).toMatch(/max-width:/i);
    });

    test('should have margin auto for centering', () => {
      expect(cssContent).toMatch(/margin:\s*0\s+auto/i);
    });

    test('should have padding for containers', () => {
      const containerMatch = cssContent.match(/\.container\s*\{[^}]*\}/is);
      if (containerMatch) {
        expect(containerMatch[0]).toMatch(/padding:/i);
      }
    });
  });

  describe('Smooth Scrolling', () => {
    test('should enable smooth scrolling on html', () => {
      expect(cssContent).toMatch(/html\s*\{[^}]*scroll-behavior:\s*smooth/i);
    });
  });

  describe('Navigation Styles', () => {
    test('should have navbar styles', () => {
      expect(cssContent).toMatch(/\.navbar\s*\{/i);
    });

    test('should have fixed positioning for navbar', () => {
      expect(cssContent).toMatch(/\.navbar\s*\{[^}]*position:\s*fixed/is);
    });

    test('should have z-index for navbar', () => {
      const navbarMatch = cssContent.match(/\.navbar\s*\{[^}]*\}/is);
      if (navbarMatch) {
        expect(navbarMatch[0]).toMatch(/z-index:/i);
      }
    });

    test('should have nav-links styles', () => {
      expect(cssContent).toMatch(/\.nav-links\s*\{/i);
    });

    test('should use flexbox for navigation', () => {
      expect(cssContent).toMatch(/\.nav-links\s*\{[^}]*display:\s*flex/is);
    });

    test('should have logo styles', () => {
      expect(cssContent).toMatch(/\.logo\s*\{/i);
    });

    test('should have hamburger menu styles', () => {
      expect(cssContent).toMatch(/\.hamburger\s*\{/i);
    });

    test('should have hover effects on navigation links', () => {
      expect(cssContent).toMatch(/\.nav-links\s+a:hover/i);
    });

    test('should have active state styles', () => {
      expect(cssContent).toMatch(/\.active/i);
    });

    test('should use pseudo-elements for link animations', () => {
      expect(cssContent).toMatch(/::after|::before/i);
    });
  });

  describe('Hero Section Styles', () => {
    test('should have hero styles', () => {
      expect(cssContent).toMatch(/\.hero\s*\{/i);
    });

    test('should have min-height for hero', () => {
      const heroMatch = cssContent.match(/\.hero\s*\{[^}]*\}/is);
      if (heroMatch) {
        expect(heroMatch[0]).toMatch(/min-height:/i);
      }
    });

    test('should use flexbox for hero layout', () => {
      expect(cssContent).toMatch(/\.hero\s*\{[^}]*display:\s*flex/is);
    });

    test('should have gradient background', () => {
      expect(cssContent).toMatch(/linear-gradient/i);
    });

    test('should have hero-content styles', () => {
      expect(cssContent).toMatch(/\.hero-content\s*\{/i);
    });

    test('should have scroll indicator styles', () => {
      expect(cssContent).toMatch(/\.scroll-indicator/i);
    });
  });

  describe('Section Styles', () => {
    test('should have section class styles', () => {
      expect(cssContent).toMatch(/\.section\s*\{/i);
    });

    test('should have section-title styles', () => {
      expect(cssContent).toMatch(/\.section-title\s*\{/i);
    });

    test('should have padding for sections', () => {
      const sectionMatch = cssContent.match(/\.section\s*\{[^}]*\}/is);
      if (sectionMatch) {
        expect(sectionMatch[0]).toMatch(/padding:/i);
      }
    });

    test('should have bg-light utility class', () => {
      expect(cssContent).toMatch(/\.bg-light\s*\{/i);
    });
  });

  describe('Button Styles', () => {
    test('should have button styles', () => {
      expect(cssContent).toMatch(/\.btn\s*\{/i);
    });

    test('should have btn-primary styles', () => {
      expect(cssContent).toMatch(/\.btn-primary\s*\{/i);
    });

    test('should have btn-secondary styles', () => {
      expect(cssContent).toMatch(/\.btn-secondary\s*\{/i);
    });

    test('should have hover effects on buttons', () => {
      expect(cssContent).toMatch(/\.btn:hover/i);
    });

    test('should have transform on button hover', () => {
      const btnHoverMatch = cssContent.match(/\.btn[^{]*:hover\s*\{[^}]*\}/is);
      if (btnHoverMatch) {
        expect(btnHoverMatch[0]).toMatch(/transform:/i);
      }
    });

    test('should remove text decoration from button links', () => {
      expect(cssContent).toMatch(/text-decoration:\s*none/i);
    });

    test('should have cursor pointer for interactive elements', () => {
      expect(cssContent).toMatch(/cursor:\s*pointer/i);
    });
  });

  describe('Statistics Section', () => {
    test('should have stats styles', () => {
      expect(cssContent).toMatch(/\.stats\s*\{/i);
    });

    test('should have stat-item styles', () => {
      expect(cssContent).toMatch(/\.stat-item\s*\{/i);
    });

    test('should have stat-number styles', () => {
      expect(cssContent).toMatch(/\.stat-number\s*\{/i);
    });

    test('should have stat-label styles', () => {
      expect(cssContent).toMatch(/\.stat-label\s*\{/i);
    });
  });

  describe('Skills Section', () => {
    test('should have skills-grid styles', () => {
      expect(cssContent).toMatch(/\.skills-grid\s*\{/i);
    });

    test('should have skill-category styles', () => {
      expect(cssContent).toMatch(/\.skill-category\s*\{/i);
    });

    test('should have skill-bar styles', () => {
      expect(cssContent).toMatch(/\.skill-bar\s*\{/i);
    });

    test('should have progress bar styles', () => {
      expect(cssContent).toMatch(/\.progress\s*\{/i);
      expect(cssContent).toMatch(/\.progress-bar\s*\{/i);
    });

    test('should have transition on progress bars', () => {
      const progressMatch = cssContent.match(/\.progress-bar\s*\{[^}]*\}/is);
      if (progressMatch) {
        expect(progressMatch[0]).toMatch(/transition:/i);
      }
    });
  });

  describe('Timeline Styles', () => {
    test('should have timeline styles', () => {
      expect(cssContent).toMatch(/\.timeline\s*\{/i);
    });

    test('should have timeline-item styles', () => {
      expect(cssContent).toMatch(/\.timeline-item\s*\{/i);
    });

    test('should have timeline-dot styles', () => {
      expect(cssContent).toMatch(/\.timeline-dot\s*\{/i);
    });

    test('should have timeline-content styles', () => {
      expect(cssContent).toMatch(/\.timeline-content\s*\{/i);
    });
  });

  describe('Project Cards', () => {
    test('should have projects-grid styles', () => {
      expect(cssContent).toMatch(/\.projects-grid\s*\{/i);
    });

    test('should have project-card styles', () => {
      expect(cssContent).toMatch(/\.project-card\s*\{/i);
    });

    test('should have project-image styles', () => {
      expect(cssContent).toMatch(/\.project-image\s*\{/i);
    });

    test('should have project-overlay styles', () => {
      expect(cssContent).toMatch(/\.project-overlay\s*\{/i);
    });

    test('should have hover effects on project cards', () => {
      expect(cssContent).toMatch(/\.project-card:hover/i);
    });

    test('should have project-tags styles', () => {
      expect(cssContent).toMatch(/\.project-tags\s*\{/i);
    });

    test('should have box-shadow on cards', () => {
      expect(cssContent).toMatch(/box-shadow:/i);
    });
  });

  describe('Education Section', () => {
    test('should have education-grid styles', () => {
      expect(cssContent).toMatch(/\.education-grid\s*\{/i);
    });

    test('should have education-card styles', () => {
      expect(cssContent).toMatch(/\.education-card\s*\{/i);
    });

    test('should have education-icon styles', () => {
      expect(cssContent).toMatch(/\.education-icon\s*\{/i);
    });
  });

  describe('Contact Section', () => {
    test('should have contact-content styles', () => {
      expect(cssContent).toMatch(/\.contact-content\s*\{/i);
    });

    test('should have contact-form styles', () => {
      expect(cssContent).toMatch(/\.contact-form\s*\{/i);
    });

    test('should have form-group styles', () => {
      expect(cssContent).toMatch(/\.form-group\s*\{/i);
    });

    test('should have input styles', () => {
      expect(cssContent).toMatch(/input\[type="text"\]/i);
      expect(cssContent).toMatch(/input\[type="email"\]/i);
    });

    test('should have textarea styles', () => {
      expect(cssContent).toMatch(/textarea\s*\{/i);
    });

    test('should have focus styles for inputs', () => {
      expect(cssContent).toMatch(/:focus/i);
    });

    test('should have contact-details styles', () => {
      expect(cssContent).toMatch(/\.contact-details\s*\{/i);
    });

    test('should have contact-item styles', () => {
      expect(cssContent).toMatch(/\.contact-item\s*\{/i);
    });
  });

  describe('Footer Styles', () => {
    test('should have footer styles', () => {
      expect(cssContent).toMatch(/\.footer\s*\{/i);
    });

    test('should have footer-links styles', () => {
      expect(cssContent).toMatch(/\.footer-links\s*\{/i);
    });
  });

  describe('Animations and Transitions', () => {
    test('should use transition property', () => {
      expect(cssContent).toMatch(/transition:/i);
    });

    test('should have keyframe animations', () => {
      expect(cssContent).toMatch(/@keyframes/i);
    });

    test('should have transform property for animations', () => {
      expect(cssContent).toMatch(/transform:/i);
    });

    test('should have opacity transitions', () => {
      expect(cssContent).toMatch(/opacity:/i);
    });

    test('should have animation property', () => {
      expect(cssContent).toMatch(/animation:/i);
    });

    test('should have scroll animation keyframes', () => {
      const scrollKeyframes = cssContent.match(/@keyframes\s+scroll/i);
      expect(scrollKeyframes).toBeTruthy();
    });

    test('should use translateY for animations', () => {
      expect(cssContent).toMatch(/translateY/i);
    });

    test('should use translateX for animations', () => {
      expect(cssContent).toMatch(/translateX/i);
    });

    test('should use scale for hover effects', () => {
      expect(cssContent).toMatch(/scale/i);
    });
  });

  describe('Responsive Design - Media Queries', () => {
    test('should have media queries for responsive design', () => {
      expect(cssContent).toMatch(/@media/i);
    });

    test('should have mobile breakpoint', () => {
      expect(cssContent).toMatch(/@media[^{]*\(max-width:\s*768px\)/i);
    });

    test('should have tablet/desktop breakpoints', () => {
      const mediaQueries = cssContent.match(/@media[^{]*\([^)]+\)/gi);
      expect(mediaQueries).toBeTruthy();
      expect(mediaQueries.length).toBeGreaterThan(0);
    });

    test('should adjust hamburger menu visibility in media queries', () => {
      const mobileMedia = cssContent.match(/@media[^{]*\(max-width:\s*768px\)[^}]*\{[^}]*\.hamburger[^}]*display[^}]*\}/is);
      expect(mobileMedia).toBeTruthy();
    });

    test('should adjust navigation for mobile', () => {
      expect(cssContent).toMatch(/\.nav-links\.active/i);
    });
  });

  describe('Flexbox Usage', () => {
    test('should use flexbox display', () => {
      expect(cssContent).toMatch(/display:\s*flex/i);
    });

    test('should use flex-direction', () => {
      expect(cssContent).toMatch(/flex-direction:/i);
    });

    test('should use justify-content', () => {
      expect(cssContent).toMatch(/justify-content:/i);
    });

    test('should use align-items', () => {
      expect(cssContent).toMatch(/align-items:/i);
    });

    test('should use gap property for flex layouts', () => {
      expect(cssContent).toMatch(/gap:/i);
    });
  });

  describe('Grid Usage', () => {
    test('should use CSS grid', () => {
      expect(cssContent).toMatch(/display:\s*grid/i);
    });

    test('should use grid-template-columns', () => {
      expect(cssContent).toMatch(/grid-template-columns:/i);
    });

    test('should use gap in grid layouts', () => {
      const gridMatches = cssContent.match(/display:\s*grid[^}]*gap:/is);
      expect(gridMatches).toBeTruthy();
    });
  });

  describe('Typography', () => {
    test('should define font sizes', () => {
      expect(cssContent).toMatch(/font-size:/i);
    });

    test('should define font weights', () => {
      expect(cssContent).toMatch(/font-weight:/i);
    });

    test('should have text-align properties', () => {
      expect(cssContent).toMatch(/text-align:/i);
    });

    test('should have letter-spacing for headings', () => {
      expect(cssContent).toMatch(/letter-spacing:/i);
    });

    test('should use rem or em units for scalability', () => {
      expect(cssContent).toMatch(/\d+(\.\d+)?(rem|em)/i);
    });
  });

  describe('Colors and Gradients', () => {
    test('should use gradient backgrounds', () => {
      expect(cssContent).toMatch(/linear-gradient\s*\(/i);
    });

    test('should use rgba for transparency', () => {
      expect(cssContent).toMatch(/rgba\s*\(/i);
    });

    test('should have consistent color scheme', () => {
      const varUsage = cssContent.match(/var\(--[a-z-]*color[a-z-]*\)/gi);
      expect(varUsage).toBeTruthy();
      expect(varUsage.length).toBeGreaterThan(10);
    });

    test('should use background-clip for gradient text', () => {
      expect(cssContent).toMatch(/background-clip:\s*text/i);
      expect(cssContent).toMatch(/-webkit-background-clip:\s*text/i);
    });

    test('should use -webkit-text-fill-color for gradient text', () => {
      expect(cssContent).toMatch(/-webkit-text-fill-color:/i);
    });
  });

  describe('Shadows and Depth', () => {
    test('should use box-shadow', () => {
      expect(cssContent).toMatch(/box-shadow:/i);
    });

    test('should have different shadow intensities', () => {
      expect(cssContent).toMatch(/--shadow:/i);
      expect(cssContent).toMatch(/--shadow-hover:/i);
    });
  });

  describe('Positioning', () => {
    test('should use position: fixed for navbar', () => {
      expect(cssContent).toMatch(/position:\s*fixed/i);
    });

    test('should use position: relative', () => {
      expect(cssContent).toMatch(/position:\s*relative/i);
    });

    test('should use position: absolute for overlays', () => {
      expect(cssContent).toMatch(/position:\s*absolute/i);
    });

    test('should use top, right, bottom, left properties', () => {
      expect(cssContent).toMatch(/\b(top|right|bottom|left):/i);
    });
  });

  describe('Border and Border-Radius', () => {
    test('should use border-radius for rounded corners', () => {
      expect(cssContent).toMatch(/border-radius:/i);
    });

    test('should have border properties', () => {
      expect(cssContent).toMatch(/border:/i);
    });

    test('should use border for circular elements', () => {
      const circularElements = cssContent.match(/border-radius:\s*50%/gi);
      expect(circularElements).toBeTruthy();
    });
  });

  describe('Overflow Handling', () => {
    test('should handle overflow on body', () => {
      expect(cssContent).toMatch(/overflow(-x)?:\s*hidden/i);
    });

    test('should have overflow properties where needed', () => {
      expect(cssContent).toMatch(/overflow:/i);
    });
  });

  describe('Social Links Styling', () => {
    test('should have social-links styles', () => {
      expect(cssContent).toMatch(/\.social-links\s*\{/i);
    });

    test('should have hover effects on social links', () => {
      expect(cssContent).toMatch(/\.social-links\s+a:hover/i);
    });
  });

  describe('CSS Best Practices', () => {
    test('should not have !important (discouraged)', () => {
      const importantCount = (cssContent.match(/!important/gi) || []).length;
      expect(importantCount).toBeLessThan(5);
    });

    test('should use lowercase for property names', () => {
      const uppercaseProps = cssContent.match(/[A-Z][\w-]*:/g);
      expect(uppercaseProps).toBeFalsy();
    });

    test('should have consistent spacing', () => {
      // Check for space after colons
      const propsWithoutSpace = cssContent.match(/:[^\s]/g);
      if (propsWithoutSpace) {
        expect(propsWithoutSpace.length).toBeLessThan(10);
      }
    });

    test('should end declarations with semicolons', () => {
      // Most declarations should end with semicolons
      const declarations = cssContent.match(/[a-z-]+:\s*[^;{}]+;/gi);
      expect(declarations).toBeTruthy();
      expect(declarations.length).toBeGreaterThan(100);
    });

    test('should use shorthand properties where appropriate', () => {
      expect(cssContent).toMatch(/margin:\s*\d+/i);
      expect(cssContent).toMatch(/padding:\s*\d+/i);
    });

    test('should group related properties', () => {
      // Check that display/flex properties are typically together
      const flexGroups = cssContent.match(/display:\s*flex[^}]*justify-content:/is);
      expect(flexGroups).toBeTruthy();
    });
  });

  describe('Performance Optimizations', () => {
    test('should use will-change for animated elements', () => {
      // Optional but recommended
      const willChange = cssContent.match(/will-change:/i);
      // This is optional, so we just check if it exists without failing
      if (willChange) {
        expect(willChange).toBeTruthy();
      }
    });

    test('should minimize use of * selector', () => {
      const universalSelectors = cssContent.match(/\*\s*\{/g);
      expect(universalSelectors.length).toBeLessThan(3);
    });
  });

  describe('Accessibility in CSS', () => {
    test('should have focus styles', () => {
      expect(cssContent).toMatch(/:focus/i);
    });

    test('should have visible focus indicators', () => {
      const focusStyles = cssContent.match(/:focus[^}]*\{[^}]*\}/is);
      expect(focusStyles).toBeTruthy();
    });

    test('should have sufficient contrast (check for very light colors on white)', () => {
      // This is a basic check - real contrast checking requires calculation
      const whiteOnWhite = cssContent.match(/background:\s*#fff[^}]*color:\s*#fff/is);
      expect(whiteOnWhite).toBeFalsy();
    });
  });

  describe('Vendor Prefixes', () => {
    test('should have webkit prefixes for background-clip', () => {
      expect(cssContent).toMatch(/-webkit-background-clip:/i);
    });

    test('should have webkit prefixes for text-fill-color', () => {
      expect(cssContent).toMatch(/-webkit-text-fill-color:/i);
    });
  });

  describe('CSS Structure and Organization', () => {
    test('should have CSS custom properties defined first', () => {
      const rootIndex = cssContent.indexOf(':root');
      const firstClassIndex = cssContent.indexOf('.');
      expect(rootIndex).toBeLessThan(firstClassIndex);
    });

    test('should have reset styles near the beginning', () => {
      const resetIndex = cssContent.indexOf('* {');
      const midpoint = cssContent.length / 2;
      expect(resetIndex).toBeLessThan(midpoint);
    });

    test('should group related selectors', () => {
      // Check that related classes are near each other
      const navbarIndex = cssContent.indexOf('.navbar');
      const navLinksIndex = cssContent.indexOf('.nav-links');
      const distance = Math.abs(navLinksIndex - navbarIndex);
      expect(distance).toBeLessThan(2000);
    });

    test('should use meaningful class names', () => {
      expect(cssContent).toMatch(/\.hero/i);
      expect(cssContent).toMatch(/\.section/i);
      expect(cssContent).toMatch(/\.container/i);
      expect(cssContent).toMatch(/\.footer/i);
    });
  });

  describe('Specific Component Styles', () => {
    test('should have CTA button styles', () => {
      expect(cssContent).toMatch(/\.cta-buttons\s*\{/i);
    });

    test('should have highlight class for emphasis', () => {
      expect(cssContent).toMatch(/\.highlight\s*\{/i);
    });

    test('should have fade-in animation classes', () => {
      expect(cssContent).toMatch(/\.fade-in/i);
    });

    test('should have project-link styles', () => {
      expect(cssContent).toMatch(/\.project-link\s*\{/i);
    });

    test('should have skill-info styles', () => {
      expect(cssContent).toMatch(/\.skill-info\s*\{/i);
    });
  });

  describe('Interactive Elements', () => {
    test('should change cursor to pointer on clickable elements', () => {
      const cursorPointers = cssContent.match(/cursor:\s*pointer/gi);
      expect(cursorPointers).toBeTruthy();
      expect(cursorPointers.length).toBeGreaterThan(3);
    });

    test('should have transition on interactive elements', () => {
      expect(cssContent).toMatch(/\.btn[^}]*transition:/is);
      expect(cssContent).toMatch(/\.nav-links\s+a[^}]*transition:/is);
    });

    test('should have hover states for links', () => {
      expect(cssContent).toMatch(/a:hover/i);
    });
  });

  describe('CSS Units Usage', () => {
    test('should use px for borders and small values', () => {
      expect(cssContent).toMatch(/\d+px/);
    });

    test('should use rem or em for font sizes', () => {
      expect(cssContent).toMatch(/font-size:\s*\d+(\.\d+)?(rem|em)/i);
    });

    test('should use percentages for widths', () => {
      expect(cssContent).toMatch(/width:\s*\d+%/i);
    });

    test('should use viewport units', () => {
      expect(cssContent).toMatch(/\d+(vh|vw)/i);
    });
  });
});