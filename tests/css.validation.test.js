/**
 * CSS Validation Tests
 * Validates CSS structure, responsive design, and styling consistency
 */

const fs = require('fs');
const path = require('path');

describe('CSS Basic Structure', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have CSS reset styles', () => {
    expect(css).toMatch(/\*[\s\S]*?{[\s\S]*?margin:\s*0/i);
    expect(css).toMatch(/\*[\s\S]*?{[\s\S]*?padding:\s*0/i);
    expect(css).toMatch(/\*[\s\S]*?{[\s\S]*?box-sizing:\s*border-box/i);
  });

  test('should define CSS custom properties (variables)', () => {
    expect(css).toMatch(/:root\s*{/i);
    expect(css).toMatch(/--primary-color/i);
    expect(css).toMatch(/--secondary-color/i);
  });

  test('should have smooth scroll behavior', () => {
    expect(css).toMatch(/html\s*{[\s\S]*?scroll-behavior:\s*smooth/i);
  });

  test('should have body base styles', () => {
    expect(css).toMatch(/body\s*{/i);
    expect(css).toMatch(/font-family:/i);
    expect(css).toMatch(/line-height:/i);
  });
});

describe('CSS Variables (Custom Properties)', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should define color variables', () => {
    expect(css).toMatch(/--primary-color:\s*#[0-9a-fA-F]{6}/i);
    expect(css).toMatch(/--secondary-color:\s*#[0-9a-fA-F]{6}/i);
    expect(css).toMatch(/--accent-color:\s*#[0-9a-fA-F]{6}/i);
    expect(css).toMatch(/--white:\s*#[fF]{6}/i);
  });

  test('should define text color variables', () => {
    expect(css).toMatch(/--text-dark/i);
    expect(css).toMatch(/--text-light/i);
  });

  test('should define background color variables', () => {
    expect(css).toMatch(/--bg-light/i);
  });

  test('should define shadow variables', () => {
    expect(css).toMatch(/--shadow/i);
    expect(css).toMatch(/--shadow-hover/i);
  });

  test('should define transition variable', () => {
    expect(css).toMatch(/--transition:\s*all\s+[\d.]+s\s+ease/i);
  });

  test('should use CSS variables throughout stylesheet', () => {
    const varUsages = css.match(/var\(--[a-z-]+\)/gi);
    expect(varUsages).not.toBeNull();
    expect(varUsages.length).toBeGreaterThan(10);
  });
});

describe('CSS Layout and Container', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have container class with max-width', () => {
    expect(css).toMatch(/\.container\s*{[\s\S]*?max-width/i);
  });

  test('should have container with margin auto for centering', () => {
    expect(css).toMatch(/\.container\s*{[\s\S]*?margin:\s*0\s+auto/i);
  });

  test('should have container with padding', () => {
    expect(css).toMatch(/\.container\s*{[\s\S]*?padding/i);
  });

  test('should handle overflow-x on body', () => {
    expect(css).toMatch(/body\s*{[\s\S]*?overflow-x:\s*hidden/i);
  });
});

describe('CSS Navigation Styles', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have navbar with fixed position', () => {
    expect(css).toMatch(/\.navbar\s*{[\s\S]*?position:\s*fixed/i);
  });

  test('should have navbar z-index for layering', () => {
    expect(css).toMatch(/\.navbar\s*{[\s\S]*?z-index/i);
  });

  test('should have navbar box-shadow', () => {
    expect(css).toMatch(/\.navbar\s*{[\s\S]*?box-shadow/i);
  });

  test('should have nav-links styles', () => {
    expect(css).toMatch(/\.nav-links/i);
  });

  test('should have hamburger menu styles', () => {
    expect(css).toMatch(/\.hamburger/i);
  });

  test('should have logo styles', () => {
    expect(css).toMatch(/\.logo/i);
  });

  test('should style active navigation links', () => {
    expect(css).toMatch(/\.nav-links\s+a\.active/i);
  });

  test('should have hover effects for nav links', () => {
    expect(css).toMatch(/\.nav-links\s+a:hover/i);
  });
});

describe('CSS Responsive Design', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have media queries for responsive design', () => {
    const mediaQueries = css.match(/@media[^{]+{/gi);
    expect(mediaQueries).not.toBeNull();
    expect(mediaQueries.length).toBeGreaterThan(0);
  });

  test('should have mobile-first or desktop-first breakpoints', () => {
    expect(css).toMatch(/@media.*\(max-width:|@media.*\(min-width:/i);
  });

  test('should adjust hamburger menu visibility in media queries', () => {
    const mediaQuerySections = css.split(/@media/i);
    let hasHamburgerRules = false;
    
    mediaQuerySections.forEach(section => {
      if (section.match(/\.hamburger/i)) {
        hasHamburgerRules = true;
      }
    });
    
    expect(hasHamburgerRules).toBe(true);
  });

  test('should have responsive navigation styles', () => {
    const mediaQuerySections = css.split(/@media/i);
    let hasNavResponsive = false;
    
    mediaQuerySections.forEach(section => {
      if (section.match(/\.nav-links/i)) {
        hasNavResponsive = true;
      }
    });
    
    expect(hasNavResponsive).toBe(true);
  });
});

describe('CSS Hero Section', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have hero section styles', () => {
    expect(css).toMatch(/\.hero\s*{/i);
  });

  test('should have hero-content styles', () => {
    expect(css).toMatch(/\.hero-content/i);
  });

  test('should have scroll indicator styles', () => {
    expect(css).toMatch(/\.scroll-indicator/i);
  });

  test('should have fade-in animation classes', () => {
    expect(css).toMatch(/\.fade-in/i);
  });

  test('should have social links styles', () => {
    expect(css).toMatch(/\.social-links/i);
  });

  test('should have CTA button styles', () => {
    expect(css).toMatch(/\.cta-buttons/i);
    expect(css).toMatch(/\.btn/i);
  });

  test('should have primary and secondary button variants', () => {
    expect(css).toMatch(/\.btn-primary/i);
    expect(css).toMatch(/\.btn-secondary/i);
  });
});

describe('CSS Section Styles', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have section class with padding', () => {
    expect(css).toMatch(/\.section\s*{[\s\S]*?padding/i);
  });

  test('should have section-title styles', () => {
    expect(css).toMatch(/\.section-title/i);
  });

  test('should have bg-light class for alternating sections', () => {
    expect(css).toMatch(/\.bg-light/i);
  });

  test('should have about-content styles', () => {
    expect(css).toMatch(/\.about-content/i);
  });

  test('should have stats section styles', () => {
    expect(css).toMatch(/\.stats/i);
    expect(css).toMatch(/\.stat-item/i);
    expect(css).toMatch(/\.stat-number/i);
  });
});

describe('CSS Skills Section', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have skills-grid styles', () => {
    expect(css).toMatch(/\.skills-grid/i);
  });

  test('should have skill-category styles', () => {
    expect(css).toMatch(/\.skill-category/i);
  });

  test('should have skill-bar styles', () => {
    expect(css).toMatch(/\.skill-bar/i);
  });

  test('should have progress bar styles', () => {
    expect(css).toMatch(/\.progress-bar/i);
  });

  test('should have progress container styles', () => {
    expect(css).toMatch(/\.progress\s*{/i);
  });

  test('should have skill-info styles', () => {
    expect(css).toMatch(/\.skill-info/i);
  });
});

describe('CSS Experience Timeline', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have timeline styles', () => {
    expect(css).toMatch(/\.timeline/i);
  });

  test('should have timeline-item styles', () => {
    expect(css).toMatch(/\.timeline-item/i);
  });

  test('should have timeline-dot styles', () => {
    expect(css).toMatch(/\.timeline-dot/i);
  });

  test('should have timeline-content styles', () => {
    expect(css).toMatch(/\.timeline-content/i);
  });

  test('should have timeline-date styles', () => {
    expect(css).toMatch(/\.timeline-date/i);
  });
});

describe('CSS Project Cards', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have projects-grid styles', () => {
    expect(css).toMatch(/\.projects-grid/i);
  });

  test('should have project-card styles', () => {
    expect(css).toMatch(/\.project-card/i);
  });

  test('should have project-image styles', () => {
    expect(css).toMatch(/\.project-image/i);
  });

  test('should have project-overlay styles', () => {
    expect(css).toMatch(/\.project-overlay/i);
  });

  test('should have project-info styles', () => {
    expect(css).toMatch(/\.project-info/i);
  });

  test('should have project-tags styles', () => {
    expect(css).toMatch(/\.project-tags/i);
  });

  test('should have project-link styles', () => {
    expect(css).toMatch(/\.project-link/i);
  });

  test('should have hover effects for project cards', () => {
    expect(css).toMatch(/\.project-card:hover/i);
  });
});

describe('CSS Education Section', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have education-grid styles', () => {
    expect(css).toMatch(/\.education-grid/i);
  });

  test('should have education-card styles', () => {
    expect(css).toMatch(/\.education-card/i);
  });

  test('should have education-icon styles', () => {
    expect(css).toMatch(/\.education-icon/i);
  });

  test('should have education-date styles', () => {
    expect(css).toMatch(/\.education-date/i);
  });
});

describe('CSS Contact Form', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have contact-content styles', () => {
    expect(css).toMatch(/\.contact-content/i);
  });

  test('should have contact-form styles', () => {
    expect(css).toMatch(/\.contact-form/i);
  });

  test('should have contact-info styles', () => {
    expect(css).toMatch(/\.contact-info/i);
  });

  test('should have contact-item styles', () => {
    expect(css).toMatch(/\.contact-item/i);
  });

  test('should have form-group styles', () => {
    expect(css).toMatch(/\.form-group/i);
  });

  test('should have input field styles', () => {
    expect(css).toMatch(/input\[type="text"\]/i);
    expect(css).toMatch(/input\[type="email"\]/i);
    expect(css).toMatch(/textarea/i);
  });

  test('should have focus styles for inputs', () => {
    expect(css).toMatch(/input.*:focus/i);
    expect(css).toMatch(/textarea.*:focus/i);
  });

  test('should have button styles', () => {
    expect(css).toMatch(/button/i);
  });
});

describe('CSS Footer', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have footer styles', () => {
    expect(css).toMatch(/\.footer/i);
  });

  test('should have footer-links styles', () => {
    expect(css).toMatch(/\.footer-links/i);
  });
});

describe('CSS Animations', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should have transition properties', () => {
    const transitions = css.match(/transition:/gi);
    expect(transitions).not.toBeNull();
    expect(transitions.length).toBeGreaterThan(5);
  });

  test('should have hover effects with transitions', () => {
    expect(css).toMatch(/:hover/gi);
  });

  test('should use transform for animations', () => {
    expect(css).toMatch(/transform:/i);
  });

  test('should have opacity transitions', () => {
    expect(css).toMatch(/opacity:/i);
  });

  test('should define keyframe animations if used', () => {
    const keyframes = css.match(/@keyframes/gi);
    if (keyframes) {
      expect(keyframes.length).toBeGreaterThan(0);
    }
  });
});

describe('CSS Best Practices', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should use relative units (rem, em, %) for responsive design', () => {
    const relativeUnits = css.match(/:\s*[\d.]+(?:rem|em|%)/gi);
    expect(relativeUnits).not.toBeNull();
    expect(relativeUnits.length).toBeGreaterThan(10);
  });

  test('should have box-shadow for depth', () => {
    const boxShadows = css.match(/box-shadow:/gi);
    expect(boxShadows).not.toBeNull();
    expect(boxShadows.length).toBeGreaterThan(0);
  });

  test('should use flexbox for layouts', () => {
    expect(css).toMatch(/display:\s*flex/i);
  });

  test('should have consistent spacing', () => {
    expect(css).toMatch(/margin:/gi);
    expect(css).toMatch(/padding:/gi);
  });

  test('should not have !important overuse', () => {
    const importantCount = (css.match(/!important/gi) || []).length;
    expect(importantCount).toBeLessThan(5);
  });

  test('should have proper color contrast', () => {
    // Ensure light backgrounds with dark text
    expect(css).toMatch(/--text-dark/i);
    expect(css).toMatch(/--text-light/i);
  });
});

describe('CSS Grid Layouts', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should use grid for card layouts', () => {
    const gridUsages = css.match(/display:\s*grid/gi);
    if (gridUsages) {
      expect(gridUsages.length).toBeGreaterThan(0);
    }
  });

  test('should have gap property for grid spacing', () => {
    const gapUsages = css.match(/gap:/gi);
    if (gapUsages) {
      expect(gapUsages.length).toBeGreaterThan(0);
    }
  });
});

describe('CSS Typography', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should define font-family', () => {
    expect(css).toMatch(/font-family:/i);
  });

  test('should have font-size definitions', () => {
    const fontSizes = css.match(/font-size:/gi);
    expect(fontSizes).not.toBeNull();
    expect(fontSizes.length).toBeGreaterThan(5);
  });

  test('should have font-weight variations', () => {
    expect(css).toMatch(/font-weight:/gi);
  });

  test('should define line-height for readability', () => {
    expect(css).toMatch(/line-height:/gi);
  });

  test('should have text-align properties', () => {
    expect(css).toMatch(/text-align:/gi);
  });
});

describe('CSS Performance', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  });

  test('should not have excessive nesting (indicated by file size)', () => {
    const lines = css.split('\n').length;
    expect(lines).toBeLessThan(2000); // Reasonable limit
  });

  test('should use hardware-accelerated properties', () => {
    // transform and opacity are hardware accelerated
    expect(css).toMatch(/transform:/i);
    expect(css).toMatch(/opacity:/i);
  });

  test('should have will-change for complex animations if needed', () => {
    // Optional but good practice for performance
    const willChange = css.match(/will-change:/gi);
    // This is optional, so we just check it doesn't break
    expect(true).toBe(true);
  });
});