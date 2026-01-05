/**
 * HTML Validation and Structure Tests
 * Validates HTML structure, semantics, accessibility, and best practices
 */

const fs = require('fs');
const path = require('path');

describe('HTML Validation Tests', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  });

  describe('Document Structure', () => {
    test('should have valid DOCTYPE declaration', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });

    test('should have html element with lang attribute', () => {
      expect(htmlContent).toMatch(/<html\s+lang="en">/i);
    });

    test('should have head section', () => {
      expect(htmlContent).toMatch(/<head>/i);
      expect(htmlContent).toMatch(/<\/head>/i);
    });

    test('should have body section', () => {
      expect(htmlContent).toMatch(/<body>/i);
      expect(htmlContent).toMatch(/<\/body>/i);
    });

    test('should have proper nesting of html, head, and body', () => {
      const htmlIndex = htmlContent.indexOf('<html');
      const headIndex = htmlContent.indexOf('<head>');
      const bodyIndex = htmlContent.indexOf('<body>');
      const closingHtmlIndex = htmlContent.lastIndexOf('</html>');

      expect(htmlIndex).toBeLessThan(headIndex);
      expect(headIndex).toBeLessThan(bodyIndex);
      expect(bodyIndex).toBeLessThan(closingHtmlIndex);
    });
  });

  describe('Meta Tags', () => {
    test('should have charset meta tag', () => {
      expect(htmlContent).toMatch(/<meta\s+charset="UTF-8">/i);
    });

    test('should have viewport meta tag for responsive design', () => {
      expect(htmlContent).toMatch(/<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1\.0">/i);
    });

    test('should have description meta tag', () => {
      expect(htmlContent).toMatch(/<meta\s+name="description"/i);
    });

    test('should have title tag', () => {
      expect(htmlContent).toMatch(/<title>.*<\/title>/i);
    });

    test('should have non-empty title', () => {
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
      expect(titleMatch).toBeTruthy();
      expect(titleMatch[1].trim().length).toBeGreaterThan(0);
    });
  });

  describe('Stylesheet Links', () => {
    test('should link to styles.css', () => {
      expect(htmlContent).toMatch(/<link\s+rel="stylesheet"\s+href="styles\.css">/i);
    });

    test('should link to Font Awesome', () => {
      expect(htmlContent).toMatch(/font-awesome/i);
    });

    test('should have proper link tag structure', () => {
      const linkMatches = htmlContent.match(/<link[^>]+>/gi);
      expect(linkMatches).toBeTruthy();
      expect(linkMatches.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation Structure', () => {
    test('should have nav element', () => {
      expect(htmlContent).toMatch(/<nav/i);
    });

    test('should have navigation links', () => {
      expect(htmlContent).toMatch(/<nav[^>]*>[\s\S]*?<\/nav>/i);
      expect(htmlContent).toMatch(/href="#home"/i);
      expect(htmlContent).toMatch(/href="#about"/i);
      expect(htmlContent).toMatch(/href="#skills"/i);
      expect(htmlContent).toMatch(/href="#experience"/i);
      expect(htmlContent).toMatch(/href="#projects"/i);
      expect(htmlContent).toMatch(/href="#contact"/i);
    });

    test('should have hamburger menu for mobile', () => {
      expect(htmlContent).toMatch(/class="hamburger"/i);
    });

    test('should have proper list structure in navigation', () => {
      expect(htmlContent).toMatch(/<ul[^>]*class="nav-links"/i);
      expect(htmlContent).toMatch(/<li>/i);
    });
  });

  describe('Section Structure', () => {
    test('should have hero section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="home"/i);
    });

    test('should have about section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="about"/i);
    });

    test('should have skills section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="skills"/i);
    });

    test('should have experience section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="experience"/i);
    });

    test('should have education section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="education"/i);
    });

    test('should have projects section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="projects"/i);
    });

    test('should have contact section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="contact"/i);
    });

    test('should have all sections with section tags', () => {
      const sectionMatches = htmlContent.match(/<section/gi);
      expect(sectionMatches.length).toBeGreaterThanOrEqual(7);
    });
  });

  describe('Semantic HTML', () => {
    test('should use semantic header tags (h1, h2, h3)', () => {
      expect(htmlContent).toMatch(/<h1/i);
      expect(htmlContent).toMatch(/<h2/i);
      expect(htmlContent).toMatch(/<h3/i);
    });

    test('should have only one h1 tag', () => {
      const h1Matches = htmlContent.match(/<h1[^>]*>/gi);
      expect(h1Matches.length).toBe(1);
    });

    test('should use section tags for major content blocks', () => {
      const sectionMatches = htmlContent.match(/<section/gi);
      expect(sectionMatches.length).toBeGreaterThan(5);
    });

    test('should use footer element', () => {
      expect(htmlContent).toMatch(/<footer/i);
    });

    test('should use nav element for navigation', () => {
      expect(htmlContent).toMatch(/<nav/i);
    });
  });

  describe('Accessibility', () => {
    test('should have aria-label attributes for interactive elements', () => {
      expect(htmlContent).toMatch(/aria-label/i);
    });

    test('should have alt attributes for images', () => {
      const imgMatches = htmlContent.match(/<img[^>]*>/gi);
      if (imgMatches) {
        imgMatches.forEach(img => {
          expect(img).toMatch(/alt=/i);
        });
      }
    });

    test('should have proper button roles and labels', () => {
      expect(htmlContent).toMatch(/role="button"|<button/i);
    });

    test('should have tabindex for keyboard navigation', () => {
      expect(htmlContent).toMatch(/tabindex/i);
    });

    test('should have descriptive aria-labels for social links', () => {
      const socialLinkMatches = htmlContent.match(/aria-label="[^"]*profile"/gi);
      expect(socialLinkMatches).toBeTruthy();
      expect(socialLinkMatches.length).toBeGreaterThan(0);
    });

    test('should have aria-hidden for decorative elements', () => {
      expect(htmlContent).toMatch(/aria-hidden="true"/i);
    });
  });

  describe('Form Structure', () => {
    test('should have contact form with id', () => {
      expect(htmlContent).toMatch(/<form[^>]*id="contactForm"/i);
    });

    test('should have form input fields', () => {
      expect(htmlContent).toMatch(/<input[^>]*id="name"/i);
      expect(htmlContent).toMatch(/<input[^>]*id="email"/i);
      expect(htmlContent).toMatch(/<input[^>]*id="subject"/i);
    });

    test('should have textarea for message', () => {
      expect(htmlContent).toMatch(/<textarea[^>]*id="message"/i);
    });

    test('should have submit button', () => {
      expect(htmlContent).toMatch(/<button[^>]*type="submit"/i);
    });

    test('should have labels for form inputs', () => {
      expect(htmlContent).toMatch(/<label[^>]*for="name"/i);
      expect(htmlContent).toMatch(/<label[^>]*for="email"/i);
      expect(htmlContent).toMatch(/<label[^>]*for="subject"/i);
      expect(htmlContent).toMatch(/<label[^>]*for="message"/i);
    });

    test('should have required attribute on form fields', () => {
      expect(htmlContent).toMatch(/required/i);
    });

    test('should have proper input types', () => {
      expect(htmlContent).toMatch(/type="text"/i);
      expect(htmlContent).toMatch(/type="email"/i);
      expect(htmlContent).toMatch(/type="submit"/i);
    });
  });

  describe('Link Structure', () => {
    test('should have external links with target="_blank"', () => {
      const externalLinks = htmlContent.match(/href="https?:\/\//gi);
      if (externalLinks && externalLinks.length > 0) {
        expect(htmlContent).toMatch(/target="_blank"/i);
      }
    });

    test('should have rel="noopener noreferrer" for external links', () => {
      const targetBlankLinks = htmlContent.match(/<a[^>]*target="_blank"[^>]*>/gi);
      if (targetBlankLinks && targetBlankLinks.length > 0) {
        // At least some external links should have proper rel attribute
        expect(htmlContent).toMatch(/rel="[^"]*noopener[^"]*"/i);
      }
    });

    test('should have internal navigation links', () => {
      expect(htmlContent).toMatch(/href="#[a-z]+"/i);
    });

    test('should have social media links', () => {
      expect(htmlContent).toMatch(/github\.com|linkedin\.com|twitter\.com/i);
    });

    test('should have email link', () => {
      expect(htmlContent).toMatch(/mailto:/i);
    });
  });

  describe('Content Structure', () => {
    test('should have container divs for layout', () => {
      expect(htmlContent).toMatch(/class="container"/i);
    });

    test('should have section titles', () => {
      expect(htmlContent).toMatch(/class="section-title"/i);
    });

    test('should have hero content', () => {
      expect(htmlContent).toMatch(/class="hero-content"/i);
    });

    test('should have CTA buttons', () => {
      expect(htmlContent).toMatch(/class="[^"]*btn[^"]*"/i);
    });

    test('should have social links section', () => {
      expect(htmlContent).toMatch(/class="social-links"/i);
    });

    test('should have statistics display', () => {
      expect(htmlContent).toMatch(/class="stats"/i);
      expect(htmlContent).toMatch(/class="stat-item"/i);
      expect(htmlContent).toMatch(/class="stat-number"/i);
    });

    test('should have skills grid', () => {
      expect(htmlContent).toMatch(/class="skills-grid"/i);
      expect(htmlContent).toMatch(/class="skill-category"/i);
    });

    test('should have progress bars for skills', () => {
      expect(htmlContent).toMatch(/class="progress-bar"/i);
      expect(htmlContent).toMatch(/data-width/i);
    });

    test('should have timeline structure for experience', () => {
      expect(htmlContent).toMatch(/class="timeline"/i);
      expect(htmlContent).toMatch(/class="timeline-item"/i);
    });

    test('should have project cards', () => {
      expect(htmlContent).toMatch(/class="project-card"/i);
      expect(htmlContent).toMatch(/class="project-image"/i);
    });

    test('should have education cards', () => {
      expect(htmlContent).toMatch(/class="education-card"/i);
    });
  });

  describe('Script Links', () => {
    test('should link to script.js', () => {
      expect(htmlContent).toMatch(/<script[^>]*src="script\.js"/i);
    });

    test('should have script tag at end of body', () => {
      const scriptIndex = htmlContent.lastIndexOf('<script');
      const bodyCloseIndex = htmlContent.lastIndexOf('</body>');
      expect(scriptIndex).toBeLessThan(bodyCloseIndex);
    });
  });

  describe('Data Attributes', () => {
    test('should have data-target attributes for counters', () => {
      expect(htmlContent).toMatch(/data-target="\d+"/i);
    });

    test('should have data-width attributes for progress bars', () => {
      expect(htmlContent).toMatch(/data-width="\d+"/i);
    });

    test('should have proper numeric values in data attributes', () => {
      const dataTargetMatches = htmlContent.match(/data-target="(\d+)"/gi);
      if (dataTargetMatches) {
        dataTargetMatches.forEach(match => {
          const value = match.match(/\d+/)[0];
          expect(parseInt(value)).toBeGreaterThan(0);
        });
      }
    });
  });

  describe('Icon Usage', () => {
    test('should use Font Awesome icons', () => {
      expect(htmlContent).toMatch(/<i[^>]*class="[^"]*fa[sb]?[^"]*"/i);
    });

    test('should have icons in appropriate sections', () => {
      // Skills section
      expect(htmlContent).toMatch(/fa-code/i);
      // Social links
      expect(htmlContent).toMatch(/fa-github/i);
      expect(htmlContent).toMatch(/fa-linkedin/i);
      // Contact
      expect(htmlContent).toMatch(/fa-envelope/i);
    });
  });

  describe('HTML Best Practices', () => {
    test('should not have inline styles (prefer external CSS)', () => {
      const inlineStyles = htmlContent.match(/style="[^"]*"/gi);
      // Allow a few inline styles but discourage excessive use
      if (inlineStyles) {
        expect(inlineStyles.length).toBeLessThan(5);
      }
    });

    test('should use lowercase for HTML tags', () => {
      const uppercaseTags = htmlContent.match(/<[A-Z]+/g);
      expect(uppercaseTags).toBeFalsy();
    });

    test('should have proper indentation (no excessive whitespace)', () => {
      const lines = htmlContent.split('\n');
      lines.forEach(line => {
        // Check that indentation uses spaces (4 or multiples)
        if (line.trim().length > 0) {
          const leadingSpaces = line.match(/^\s*/)[0].length;
          expect(leadingSpaces % 4).toBe(0);
        }
      });
    });

    test('should close all tags properly', () => {
      // Check for common unclosed tags
      const divOpen = (htmlContent.match(/<div/gi) || []).length;
      const divClose = (htmlContent.match(/<\/div>/gi) || []).length;
      expect(divOpen).toBe(divClose);

      const sectionOpen = (htmlContent.match(/<section/gi) || []).length;
      const sectionClose = (htmlContent.match(/<\/section>/gi) || []).length;
      expect(sectionOpen).toBe(sectionClose);
    });

    test('should not have excessive nesting depth', () => {
      const lines = htmlContent.split('\n');
      lines.forEach(line => {
        const leadingSpaces = line.match(/^\s*/)[0].length;
        // Discourage nesting deeper than 10 levels (40 spaces)
        expect(leadingSpaces).toBeLessThan(44);
      });
    });
  });

  describe('SEO Considerations', () => {
    test('should have meaningful title', () => {
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
      expect(titleMatch[1]).toContain('Resume');
    });

    test('should have meta description with content', () => {
      const metaDesc = htmlContent.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
      expect(metaDesc).toBeTruthy();
      expect(metaDesc[1].length).toBeGreaterThan(50);
    });

    test('should use semantic heading hierarchy', () => {
      const h1Index = htmlContent.indexOf('<h1');
      const firstH2Index = htmlContent.indexOf('<h2');
      expect(h1Index).toBeLessThan(firstH2Index);
    });
  });

  describe('Responsive Design Elements', () => {
    test('should have viewport meta tag configured correctly', () => {
      expect(htmlContent).toMatch(/width=device-width/i);
      expect(htmlContent).toMatch(/initial-scale=1\.0/i);
    });

    test('should have container classes for responsive layout', () => {
      expect(htmlContent).toMatch(/class="container"/i);
    });

    test('should have grid layouts for responsive sections', () => {
      expect(htmlContent).toMatch(/class="[^"]*grid[^"]*"/i);
    });
  });

  describe('Footer Content', () => {
    test('should have footer element', () => {
      expect(htmlContent).toMatch(/<footer[^>]*class="footer"/i);
    });

    test('should have copyright notice', () => {
      expect(htmlContent).toMatch(/&copy;|©/i);
      expect(htmlContent).toMatch(/\d{4}/); // Year
    });

    test('should have back to top link', () => {
      expect(htmlContent).toMatch(/back to top/i);
      expect(htmlContent).toMatch(/href="#home"/i);
    });
  });

  describe('Content Placeholders', () => {
    test('should have placeholder images', () => {
      expect(htmlContent).toMatch(/placeholder|via\.placeholder/i);
    });

    test('should have project tags', () => {
      expect(htmlContent).toMatch(/class="project-tags"/i);
    });

    test('should have contact details', () => {
      expect(htmlContent).toMatch(/class="contact-details"/i);
      expect(htmlContent).toMatch(/class="contact-item"/i);
    });
  });

  describe('Performance Considerations', () => {
    test('should load Font Awesome from CDN', () => {
      expect(htmlContent).toMatch(/cdnjs\.cloudflare\.com/i);
    });

    test('should have script tag before closing body', () => {
      const scriptPos = htmlContent.lastIndexOf('<script');
      const bodyClosePos = htmlContent.lastIndexOf('</body>');
      expect(scriptPos).toBeGreaterThan(0);
      expect(scriptPos).toBeLessThan(bodyClosePos);
    });
  });
});