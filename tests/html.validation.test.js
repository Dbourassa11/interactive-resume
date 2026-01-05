/**
 * HTML Validation and Structure Tests
 * Validates HTML structure, semantics, accessibility, and SEO
 */

const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('HTML Structure and Validation', () => {
  describe('Document Structure', () => {
    test('should have valid HTML5 DOCTYPE', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });

    test('should have html tag with lang attribute', () => {
      expect(htmlContent).toMatch(/<html[^>]+lang=/i);
    });

    test('should have proper head section', () => {
      expect(htmlContent).toMatch(/<head>/i);
      expect(htmlContent).toMatch(/<\/head>/i);
    });

    test('should have charset meta tag', () => {
      expect(htmlContent).toMatch(/<meta\s+charset="UTF-8">/i);
    });

    test('should have viewport meta tag for responsive design', () => {
      expect(htmlContent).toMatch(/<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1\.0">/i);
    });

    test('should have title tag', () => {
      expect(htmlContent).toMatch(/<title>.*<\/title>/i);
    });

    test('should have body tag', () => {
      expect(htmlContent).toMatch(/<body>/i);
      expect(htmlContent).toMatch(/<\/body>/i);
    });

    test('should have closing html tag', () => {
      expect(htmlContent).toMatch(/<\/html>/i);
    });
  });

  describe('Meta Tags and SEO', () => {
    test('should have description meta tag', () => {
      expect(htmlContent).toMatch(/<meta\s+name="description"\s+content=/i);
    });

    test('should have meaningful title', () => {
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
      expect(titleMatch).toBeTruthy();
      expect(titleMatch[1].length).toBeGreaterThan(0);
    });

    test('should have meaningful description content', () => {
      const descMatch = htmlContent.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
      expect(descMatch).toBeTruthy();
      expect(descMatch[1].length).toBeGreaterThan(10);
    });

    test('should link to stylesheet', () => {
      expect(htmlContent).toMatch(/<link\s+rel="stylesheet"\s+href="styles\.css">/i);
    });

    test('should link to Font Awesome', () => {
      expect(htmlContent).toMatch(/font-awesome/i);
    });

    test('should include script tag for JavaScript', () => {
      expect(htmlContent).toMatch(/<script\s+src="script\.js">/i);
    });
  });

  describe('Navigation Structure', () => {
    test('should have nav element', () => {
      expect(htmlContent).toMatch(/<nav[^>]*class="navbar"[^>]*>/i);
    });

    test('should have navigation links', () => {
      expect(htmlContent).toMatch(/<ul[^>]*class="nav-links"[^>]*>/i);
    });

    test('should have home navigation link', () => {
      expect(htmlContent).toMatch(/href="#home"/i);
    });

    test('should have about navigation link', () => {
      expect(htmlContent).toMatch(/href="#about"/i);
    });

    test('should have skills navigation link', () => {
      expect(htmlContent).toMatch(/href="#skills"/i);
    });

    test('should have experience navigation link', () => {
      expect(htmlContent).toMatch(/href="#experience"/i);
    });

    test('should have education navigation link', () => {
      expect(htmlContent).toMatch(/href="#education"/i);
    });

    test('should have projects navigation link', () => {
      expect(htmlContent).toMatch(/href="#projects"/i);
    });

    test('should have contact navigation link', () => {
      expect(htmlContent).toMatch(/href="#contact"/i);
    });

    test('should have hamburger menu for mobile', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hamburger"[^>]*>/i);
    });

    test('should have logo/branding', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="logo"[^>]*>/i);
    });
  });

  describe('Hero Section', () => {
    test('should have hero section with id="home"', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="home"[^>]*>/i);
    });

    test('should have hero content container', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hero-content"[^>]*>/i);
    });

    test('should have main heading (h1)', () => {
      expect(htmlContent).toMatch(/<h1[^>]*>.*<\/h1>/i);
    });

    test('should have call-to-action buttons', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="cta-buttons"[^>]*>/i);
    });

    test('should have primary CTA button', () => {
      expect(htmlContent).toMatch(/<a[^>]*class="[^"]*btn[^"]*btn-primary[^"]*"[^>]*>/i);
    });

    test('should have secondary CTA button', () => {
      expect(htmlContent).toMatch(/<a[^>]*class="[^"]*btn[^"]*btn-secondary[^"]*"[^>]*>/i);
    });

    test('should have social links', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="social-links"[^>]*>/i);
    });

    test('should have scroll indicator', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="scroll-indicator"[^>]*>/i);
    });

    test('should have highlight span for name', () => {
      expect(htmlContent).toMatch(/<span[^>]*class="highlight"[^>]*>/i);
    });
  });

  describe('About Section', () => {
    test('should have about section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="about"[^>]*>/i);
    });

    test('should have section title', () => {
      const aboutSection = htmlContent.match(/<section[^>]*id="about"[^>]*>[\s\S]*?<\/section>/i);
      expect(aboutSection).toBeTruthy();
      expect(aboutSection[0]).toMatch(/<h2[^>]*class="section-title"[^>]*>/i);
    });

    test('should have about content', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="about-content"[^>]*>/i);
    });

    test('should have about text', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="about-text"[^>]*>/i);
    });

    test('should have statistics section', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="stats"[^>]*>/i);
    });

    test('should have stat items', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="stat-item"[^>]*>/i);
    });

    test('should have stat numbers with data-target', () => {
      expect(htmlContent).toMatch(/<span[^>]*class="stat-number"[^>]*data-target="\d+"[^>]*>/i);
    });

    test('should have stat labels', () => {
      expect(htmlContent).toMatch(/<span[^>]*class="stat-label"[^>]*>/i);
    });

    test('should have at least 3 statistics', () => {
      const statMatches = htmlContent.match(/<div[^>]*class="stat-item"[^>]*>/gi);
      expect(statMatches).toBeTruthy();
      expect(statMatches.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Skills Section', () => {
    test('should have skills section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="skills"[^>]*>/i);
    });

    test('should have skills grid', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="skills-grid"[^>]*>/i);
    });

    test('should have skill categories', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="skill-category"[^>]*>/i);
    });

    test('should have skill bars container', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="skill-bars"[^>]*>/i);
    });

    test('should have individual skill bars', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="skill-bar"[^>]*>/i);
    });

    test('should have skill info', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="skill-info"[^>]*>/i);
    });

    test('should have progress bars', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="progress"[^>]*>/i);
    });

    test('should have progress bar elements with data-width', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="progress-bar"[^>]*data-width="\d+"[^>]*>/i);
    });

    test('should have at least 2 skill categories', () => {
      const categoryMatches = htmlContent.match(/<div[^>]*class="skill-category"[^>]*>/gi);
      expect(categoryMatches).toBeTruthy();
      expect(categoryMatches.length).toBeGreaterThanOrEqual(2);
    });

    test('should have Font Awesome icons in skill categories', () => {
      const skillsSection = htmlContent.match(/<section[^>]*id="skills"[^>]*>[\s\S]*?<\/section>/i);
      expect(skillsSection).toBeTruthy();
      expect(skillsSection[0]).toMatch(/<i[^>]*class="[^"]*fa[^"]*"[^>]*>/i);
    });
  });

  describe('Experience Section', () => {
    test('should have experience section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="experience"[^>]*>/i);
    });

    test('should have timeline structure', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="timeline"[^>]*>/i);
    });

    test('should have timeline items', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="timeline-item"[^>]*>/i);
    });

    test('should have timeline dots', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="timeline-dot"[^>]*>/i);
    });

    test('should have timeline content', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="timeline-content"[^>]*>/i);
    });

    test('should have timeline dates', () => {
      expect(htmlContent).toMatch(/<span[^>]*class="timeline-date"[^>]*>/i);
    });

    test('should have job titles (h3)', () => {
      const experienceSection = htmlContent.match(/<section[^>]*id="experience"[^>]*>[\s\S]*?<\/section>/i);
      expect(experienceSection).toBeTruthy();
      expect(experienceSection[0]).toMatch(/<h3>/i);
    });

    test('should have company names (h4)', () => {
      const experienceSection = htmlContent.match(/<section[^>]*id="experience"[^>]*>[\s\S]*?<\/section>/i);
      expect(experienceSection).toBeTruthy();
      expect(experienceSection[0]).toMatch(/<h4>/i);
    });
  });

  describe('Education Section', () => {
    test('should have education section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="education"[^>]*>/i);
    });

    test('should have education grid', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="education-grid"[^>]*>/i);
    });

    test('should have education cards', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="education-card"[^>]*>/i);
    });

    test('should have education icons', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="education-icon"[^>]*>/i);
    });

    test('should have education dates', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="education-date"[^>]*>/i);
    });
  });

  describe('Projects Section', () => {
    test('should have projects section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="projects"[^>]*>/i);
    });

    test('should have projects grid', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="projects-grid"[^>]*>/i);
    });

    test('should have project cards', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="project-card"[^>]*>/i);
    });

    test('should have project images', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="project-image"[^>]*>/i);
    });

    test('should have project overlays', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="project-overlay"[^>]*>/i);
    });

    test('should have project info', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="project-info"[^>]*>/i);
    });

    test('should have project tags', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="project-tags"[^>]*>/i);
    });

    test('should have project links', () => {
      expect(htmlContent).toMatch(/<a[^>]*class="project-link"[^>]*>/i);
    });

    test('should have at least 3 project cards', () => {
      const projectMatches = htmlContent.match(/<div[^>]*class="project-card"[^>]*>/gi);
      expect(projectMatches).toBeTruthy();
      expect(projectMatches.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Contact Section', () => {
    test('should have contact section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="contact"[^>]*>/i);
    });

    test('should have contact content', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="contact-content"[^>]*>/i);
    });

    test('should have contact details', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="contact-details"[^>]*>/i);
    });

    test('should have contact items', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="contact-item"[^>]*>/i);
    });

    test('should have contact form', () => {
      expect(htmlContent).toMatch(/<form[^>]*class="contact-form"[^>]*id="contactForm"[^>]*>/i);
    });
  });

  describe('Contact Form Structure', () => {
    test('should have name input field', () => {
      expect(htmlContent).toMatch(/<input[^>]*type="text"[^>]*id="name"[^>]*>/i);
    });

    test('should have email input field', () => {
      expect(htmlContent).toMatch(/<input[^>]*type="email"[^>]*id="email"[^>]*>/i);
    });

    test('should have subject input field', () => {
      expect(htmlContent).toMatch(/<input[^>]*type="text"[^>]*id="subject"[^>]*>/i);
    });

    test('should have message textarea', () => {
      expect(htmlContent).toMatch(/<textarea[^>]*id="message"[^>]*>/i);
    });

    test('should have submit button', () => {
      const formMatch = htmlContent.match(/<form[^>]*id="contactForm"[^>]*>[\s\S]*?<\/form>/i);
      expect(formMatch).toBeTruthy();
      expect(formMatch[0]).toMatch(/<button[^>]*type="submit"[^>]*>/i);
    });

    test('should have labels for form fields', () => {
      const formMatch = htmlContent.match(/<form[^>]*id="contactForm"[^>]*>[\s\S]*?<\/form>/i);
      expect(formMatch).toBeTruthy();
      expect(formMatch[0]).toMatch(/<label[^>]*for="name"[^>]*>/i);
      expect(formMatch[0]).toMatch(/<label[^>]*for="email"[^>]*>/i);
      expect(formMatch[0]).toMatch(/<label[^>]*for="subject"[^>]*>/i);
      expect(formMatch[0]).toMatch(/<label[^>]*for="message"[^>]*>/i);
    });

    test('should have required attributes on form fields', () => {
      expect(htmlContent).toMatch(/<input[^>]*id="name"[^>]*required[^>]*>/i);
      expect(htmlContent).toMatch(/<input[^>]*id="email"[^>]*required[^>]*>/i);
    });

    test('should have form groups', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="form-group"[^>]*>/i);
    });

    test('should have placeholders for better UX', () => {
      expect(htmlContent).toMatch(/<input[^>]*placeholder=/i);
    });
  });

  describe('Footer', () => {
    test('should have footer element', () => {
      expect(htmlContent).toMatch(/<footer[^>]*>/i);
    });

    test('should have copyright or attribution text', () => {
      const footerMatch = htmlContent.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
      expect(footerMatch).toBeTruthy();
      expect(footerMatch[0].length).toBeGreaterThan(20);
    });
  });

  describe('Accessibility Features', () => {
    test('should have aria-label on hamburger menu', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hamburger"[^>]*aria-label=/i);
    });

    test('should have role attribute on hamburger', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hamburger"[^>]*role="button"[^>]*>/i);
    });

    test('should have tabindex on hamburger for keyboard access', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hamburger"[^>]*tabindex="0"[^>]*>/i);
    });

    test('should have aria-label on social media links', () => {
      const socialLinks = htmlContent.match(/<div[^>]*class="social-links"[^>]*>[\s\S]*?<\/div>/i);
      expect(socialLinks).toBeTruthy();
      expect(socialLinks[0]).toMatch(/aria-label=/i);
    });

    test('should have target="_blank" with rel="noopener" for external links', () => {
      const externalLinks = htmlContent.match(/<a[^>]*target="_blank"[^>]*>/gi);
      if (externalLinks) {
        externalLinks.forEach(link => {
          // For security, external links should have rel="noopener" or rel="noreferrer"
          expect(link).toMatch(/rel="[^"]*noopener[^"]*"/i);
        });
      }
    });

    test('should have aria-hidden on decorative elements', () => {
      expect(htmlContent).toMatch(/aria-hidden="true"/i);
    });

    test('should have semantic heading hierarchy', () => {
      expect(htmlContent).toMatch(/<h1>/i);
      expect(htmlContent).toMatch(/<h2>/i);
    });

    test('should have alt attributes on images', () => {
      const images = htmlContent.match(/<img[^>]*>/gi);
      if (images) {
        images.forEach(img => {
          expect(img).toMatch(/alt=/i);
        });
      }
    });
  });

  describe('Semantic HTML', () => {
    test('should use semantic nav element', () => {
      expect(htmlContent).toMatch(/<nav[^>]*>/i);
    });

    test('should use semantic section elements', () => {
      const sections = htmlContent.match(/<section[^>]*>/gi);
      expect(sections).toBeTruthy();
      expect(sections.length).toBeGreaterThanOrEqual(5);
    });

    test('should use semantic footer element', () => {
      expect(htmlContent).toMatch(/<footer[^>]*>/i);
    });

    test('should use semantic form element', () => {
      expect(htmlContent).toMatch(/<form[^>]*>/i);
    });

    test('should use proper heading hierarchy', () => {
      const h1Count = (htmlContent.match(/<h1[^>]*>/gi) || []).length;
      expect(h1Count).toBe(1); // Should have exactly one h1
    });

    test('should use lists for navigation', () => {
      const navMatch = htmlContent.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
      expect(navMatch).toBeTruthy();
      expect(navMatch[0]).toMatch(/<ul[^>]*>/i);
    });
  });

  describe('Social Media Integration', () => {
    test('should have GitHub link', () => {
      expect(htmlContent).toMatch(/github\.com/i);
    });

    test('should have LinkedIn link', () => {
      expect(htmlContent).toMatch(/linkedin\.com/i);
    });

    test('should have Twitter link', () => {
      expect(htmlContent).toMatch(/twitter\.com/i);
    });

    test('should have email link with mailto', () => {
      expect(htmlContent).toMatch(/mailto:/i);
    });

    test('should have Font Awesome icons for social media', () => {
      const socialSection = htmlContent.match(/<div[^>]*class="social-links"[^>]*>[\s\S]*?<\/div>/i);
      expect(socialSection).toBeTruthy();
      expect(socialSection[0]).toMatch(/<i[^>]*class="[^"]*fa[^"]*"[^>]*>/i);
    });
  });

  describe('HTML Validation - No Common Errors', () => {
    test('should not have duplicate IDs', () => {
      const idMatches = htmlContent.match(/id="([^"]*)"/gi);
      if (idMatches) {
        const ids = idMatches.map(match => match.match(/id="([^"]*)"/i)[1]);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
      }
    });

    test('should have properly closed tags', () => {
      const openTags = (htmlContent.match(/<section[^>]*>/gi) || []).length;
      const closeTags = (htmlContent.match(/<\/section>/gi) || []).length;
      expect(openTags).toBe(closeTags);
    });

    test('should not have inline styles (use CSS classes instead)', () => {
      // Allow inline styles only in script-generated content
      const bodyContent = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyContent) {
        const styleMatches = bodyContent[1].match(/style="[^"]*"/gi);
        // Should have minimal or no inline styles in HTML
        expect(styleMatches).toBeFalsy();
      }
    });

    test('should use double quotes for attributes', () => {
      // Check that attributes use double quotes consistently
      const singleQuoteAttrs = htmlContent.match(/\s\w+='[^']*'/g);
      expect(singleQuoteAttrs).toBeFalsy();
    });

    test('should have proper indentation structure', () => {
      // Basic check: more opening tags than closing tags at start
      const firstHalf = htmlContent.substring(0, htmlContent.length / 2);
      const openCount = (firstHalf.match(/<[^/][^>]*>/g) || []).length;
      const closeCount = (firstHalf.match(/<\/[^>]*>/g) || []).length;
      expect(openCount).toBeGreaterThan(closeCount);
    });
  });

  describe('Performance and Best Practices', () => {
    test('should load CSS before JavaScript', () => {
      const cssIndex = htmlContent.indexOf('styles.css');
      const jsIndex = htmlContent.indexOf('script.js');
      expect(cssIndex).toBeLessThan(jsIndex);
    });

    test('should have defer or async on script tags', () => {
      const scriptTags = htmlContent.match(/<script[^>]*src="script\.js"[^>]*>/i);
      if (scriptTags) {
        // Script should ideally have defer or be at end of body
        const bodyEnd = htmlContent.lastIndexOf('</body>');
        const scriptIndex = htmlContent.indexOf('script.js');
        expect(scriptIndex).toBeGreaterThan(bodyEnd - 1000); // Near end of body
      }
    });

    test('should use system fonts or CDN fonts efficiently', () => {
      // Check for Font Awesome CDN
      expect(htmlContent).toMatch(/cdnjs\.cloudflare\.com/i);
    });

    test('should not have excessive whitespace', () => {
      // No more than 3 consecutive blank lines
      expect(htmlContent).not.toMatch(/\n\s*\n\s*\n\s*\n/);
    });
  });

  describe('Content Quality', () => {
    test('should have meaningful section titles', () => {
      const h2Tags = htmlContent.match(/<h2[^>]*>([^<]*)<\/h2>/gi);
      expect(h2Tags).toBeTruthy();
      h2Tags.forEach(h2 => {
        const text = h2.match(/<h2[^>]*>([^<]*)<\/h2>/i)[1];
        expect(text.length).toBeGreaterThan(2);
      });
    });

    test('should have descriptive button text', () => {
      const buttons = htmlContent.match(/<button[^>]*>([^<]*)<\/button>/gi);
      if (buttons) {
        buttons.forEach(button => {
          const text = button.match(/<button[^>]*>([^<]*)<\/button>/i)[1];
          expect(text.length).toBeGreaterThan(2);
        });
      }
    });

    test('should have descriptive link text', () => {
      const links = htmlContent.match(/<a[^>]*class="btn[^>]*>([^<]*)<\/a>/gi);
      if (links) {
        links.forEach(link => {
          const text = link.match(/>([^<]*)<\/a>/i);
          if (text) {
            expect(text[1].trim().length).toBeGreaterThan(0);
          }
        });
      }
    });
  });

  describe('Mobile Responsiveness Hints', () => {
    test('should have mobile-friendly viewport settings', () => {
      expect(htmlContent).toMatch(/width=device-width/i);
      expect(htmlContent).toMatch(/initial-scale=1/i);
    });

    test('should have hamburger menu structure for mobile navigation', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hamburger"[^>]*>/i);
      const hamburger = htmlContent.match(/<div[^>]*class="hamburger"[^>]*>[\s\S]*?<\/div>/i);
      expect(hamburger).toBeTruthy();
      expect(hamburger[0]).toMatch(/<span>/i);
    });

    test('should use container classes for responsive layout', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="container"[^>]*>/i);
    });
  });
});