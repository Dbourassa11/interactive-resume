/**
 * HTML Validation and Structure Tests
 * Tests for HTML semantics, accessibility, and structure
 */

const fs = require('fs');
const path = require('path');

describe('HTML Structure and Validation Tests', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  });

  describe('Document Structure', () => {
    test('should have proper DOCTYPE declaration', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });

    test('should have html element with lang attribute', () => {
      expect(htmlContent).toMatch(/<html\s+lang="en">/i);
    });

    test('should have required meta tags in head', () => {
      expect(htmlContent).toMatch(/<meta\s+charset="UTF-8">/i);
      expect(htmlContent).toMatch(/<meta\s+name="viewport"[^>]*>/i);
    });

    test('should have a title element', () => {
      expect(htmlContent).toMatch(/<title>.*<\/title>/);
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
      expect(titleMatch[1]).toBeTruthy();
      expect(titleMatch[1].length).toBeGreaterThan(0);
    });

    test('should link to external CSS file', () => {
      expect(htmlContent).toMatch(/<link\s+rel="stylesheet"\s+href="styles\.css">/i);
    });

    test('should link to external JavaScript file', () => {
      expect(htmlContent).toMatch(/<script\s+src="script\.js"><\/script>/i);
    });
  });

  describe('SEO Optimization', () => {
    test('should have meta description', () => {
      expect(htmlContent).toMatch(/<meta\s+name="description"\s+content="[^"]+"/i);
      const descMatch = htmlContent.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
      expect(descMatch[1].length).toBeGreaterThan(50);
      expect(descMatch[1].length).toBeLessThan(160);
    });

    test('should have meta keywords', () => {
      expect(htmlContent).toMatch(/<meta\s+name="keywords"/i);
    });

    test('should have meta author', () => {
      expect(htmlContent).toMatch(/<meta\s+name="author"/i);
    });

    test('should have Open Graph meta tags', () => {
      expect(htmlContent).toMatch(/<meta\s+property="og:title"/i);
      expect(htmlContent).toMatch(/<meta\s+property="og:description"/i);
      expect(htmlContent).toMatch(/<meta\s+property="og:type"/i);
      expect(htmlContent).toMatch(/<meta\s+property="og:url"/i);
    });

    test('should have Twitter Card meta tags', () => {
      expect(htmlContent).toMatch(/<meta\s+name="twitter:card"/i);
      expect(htmlContent).toMatch(/<meta\s+name="twitter:title"/i);
      expect(htmlContent).toMatch(/<meta\s+name="twitter:description"/i);
    });

    test('should have proper heading hierarchy', () => {
      const h1Count = (htmlContent.match(/<h1>/g) || []).length;
      expect(h1Count).toBe(1); // Should have exactly one h1

      const h2Count = (htmlContent.match(/<h2>/g) || []).length;
      expect(h2Count).toBeGreaterThan(0); // Should have h2 headings
    });
  });

  describe('Accessibility Features', () => {
    test('should have skip to content link', () => {
      expect(htmlContent).toMatch(/<a\s+href="#main-content"\s+class="skip-to-content">/i);
    });

    test('should have main element with id for skip link', () => {
      expect(htmlContent).toMatch(/<main\s+id="main-content">/i);
    });

    test('should have aria-label on navigation', () => {
      expect(htmlContent).toMatch(/<nav\s+aria-label="[^"]+"/i);
    });

    test('should have aria-label on external links', () => {
      const externalLinks = htmlContent.match(/<a\s+href="https?:\/\/[^"]+"\s+[^>]*aria-label="[^"]+"/gi);
      expect(externalLinks).toBeTruthy();
      expect(externalLinks.length).toBeGreaterThan(0);
    });

    test('should have aria-required on required form fields', () => {
      expect(htmlContent).toMatch(/aria-required="true"/gi);
    });

    test('should have proper form labels', () => {
      const labelMatches = htmlContent.match(/<label\s+for="([^"]+)">/gi);
      expect(labelMatches).toBeTruthy();
      expect(labelMatches.length).toBeGreaterThan(0);

      // Check that each label has a corresponding input
      labelMatches.forEach(label => {
        const forMatch = label.match(/for="([^"]+)"/);
        const inputId = forMatch[1];
        expect(htmlContent).toMatch(new RegExp(`<input[^>]*id="${inputId}"`, 'i'));
      });
    });

    test('should have alt text or aria-hidden on SVG icons', () => {
      const svgElements = htmlContent.match(/<svg[^>]*>/gi) || [];
      svgElements.forEach(svg => {
        const hasAriaHidden = /aria-hidden="true"/.test(svg);
        const hasAriaLabel = /aria-label="[^"]+"/.test(svg);
        expect(hasAriaHidden || hasAriaLabel).toBe(true);
      });
    });

    test('should use semantic HTML5 elements', () => {
      expect(htmlContent).toMatch(/<nav[>\s]/i);
      expect(htmlContent).toMatch(/<main[>\s]/i);
      expect(htmlContent).toMatch(/<section[>\s]/gi);
      expect(htmlContent).toMatch(/<footer[>\s]/i);
    });
  });

  describe('Favicon Configuration', () => {
    test('should have standard favicon link', () => {
      expect(htmlContent).toMatch(/<link\s+rel="icon"\s+type="image\/x-icon"\s+href="favicon\.ico">/i);
    });

    test('should have PNG favicon in multiple sizes', () => {
      expect(htmlContent).toMatch(/<link\s+rel="icon"\s+type="image\/png"\s+sizes="32x32"\s+href="favicon-32x32\.png">/i);
      expect(htmlContent).toMatch(/<link\s+rel="icon"\s+type="image\/png"\s+sizes="16x16"\s+href="favicon-16x16\.png">/i);
    });
  });

  describe('Content Structure', () => {
    test('should have navigation with links', () => {
      expect(htmlContent).toMatch(/<nav[^>]*>[\s\S]*<ul>[\s\S]*<li>[\s\S]*<a/i);
    });

    test('should have hero section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="hero"/i);
    });

    test('should have about section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="about"/i);
    });

    test('should have experience section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="experience"/i);
    });

    test('should have skills section', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="skills"/i);
    });

    test('should have contact section with form', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="contact"/i);
      expect(htmlContent).toMatch(/<form[^>]*class="contact-form"/i);
    });

    test('should have footer element', () => {
      expect(htmlContent).toMatch(/<footer>/i);
      expect(htmlContent).toMatch(/©.*\d{4}/); // Copyright with year
    });
  });

  describe('Contact Form Structure', () => {
    test('should have form with proper action attribute', () => {
      expect(htmlContent).toMatch(/<form\s+action="https:\/\/formspree\.io\/f\/[^"]+"\s+method="POST"/i);
    });

    test('should have name input field', () => {
      expect(htmlContent).toMatch(/<input\s+type="text"\s+id="name"\s+name="name"\s+required/i);
    });

    test('should have email input field with correct type', () => {
      expect(htmlContent).toMatch(/<input\s+type="email"\s+id="email"\s+name="email"\s+required/i);
    });

    test('should have message textarea', () => {
      expect(htmlContent).toMatch(/<textarea\s+id="message"\s+name="message"[^>]*required/i);
    });

    test('should have submit button', () => {
      expect(htmlContent).toMatch(/<button\s+type="submit">/i);
    });

    test('should have proper form field grouping', () => {
      const formGroups = htmlContent.match(/<div\s+class="form-group">/gi);
      expect(formGroups).toBeTruthy();
      expect(formGroups.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Link Validation', () => {
    test('should have valid email links', () => {
      const emailLinks = htmlContent.match(/<a\s+href="mailto:[^"]+"/gi);
      expect(emailLinks).toBeTruthy();
      
      emailLinks.forEach(link => {
        const emailMatch = link.match(/mailto:([^"]+)/);
        expect(emailMatch[1]).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });

    test('should have valid telephone links', () => {
      const telLinks = htmlContent.match(/<a\s+href="tel:[^"]+"/gi);
      expect(telLinks).toBeTruthy();
      
      telLinks.forEach(link => {
        const telMatch = link.match(/tel:([^"]+)/);
        expect(telMatch[1]).toMatch(/^\+?\d+$/); // Phone numbers with optional +
      });
    });

    test('should have external links with proper attributes', () => {
      const externalLinks = htmlContent.match(/<a\s+href="https?:\/\/[^"]+github\.com[^"]*"[^>]*>/gi);
      expect(externalLinks).toBeTruthy();
      
      externalLinks.forEach(link => {
        expect(link).toMatch(/target="_blank"/i);
        expect(link).toMatch(/rel="noopener noreferrer"/i);
      });
    });

    test('should have internal anchor links', () => {
      const anchorLinks = htmlContent.match(/<a\s+href="#[^"]+"/gi);
      expect(anchorLinks).toBeTruthy();
      expect(anchorLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Contact Information', () => {
    test('should display email address', () => {
      expect(htmlContent).toMatch(/Quantum\.Concepts@outlook\.com/i);
    });

    test('should display phone number', () => {
      expect(htmlContent).toMatch(/\+1.*505.*469.*0152/);
    });

    test('should display location', () => {
      expect(htmlContent).toMatch(/Albuquerque.*NM/i);
    });

    test('should have GitHub link', () => {
      expect(htmlContent).toMatch(/https:\/\/github\.com\/Dbourassa11/i);
    });

    test('should have LinkedIn link', () => {
      expect(htmlContent).toMatch(/https:\/\/www\.linkedin\.com\/in\/charlesdbourassa/i);
    });
  });

  describe('HTML Syntax Validation', () => {
    test('should have matching opening and closing tags', () => {
      const tags = ['html', 'head', 'body', 'nav', 'main', 'footer', 'form'];
      
      tags.forEach(tag => {
        const openingCount = (htmlContent.match(new RegExp(`<${tag}[>\\s]`, 'gi')) || []).length;
        const closingCount = (htmlContent.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
        expect(openingCount).toBe(closingCount);
      });
    });

    test('should properly close self-closing tags', () => {
      const metaTags = htmlContent.match(/<meta[^>]*>/gi) || [];
      const linkTags = htmlContent.match(/<link[^>]*>/gi) || [];
      
      expect(metaTags.length).toBeGreaterThan(0);
      expect(linkTags.length).toBeGreaterThan(0);
    });

    test('should not have duplicate IDs', () => {
      const idMatches = htmlContent.match(/id="([^"]+)"/gi) || [];
      const ids = idMatches.map(match => match.match(/id="([^"]+)"/)[1]);
      const uniqueIds = new Set(ids);
      
      expect(ids.length).toBe(uniqueIds.size);
    });

    test('should have properly quoted attributes', () => {
      // Check for attributes with values
      const attributeMatches = htmlContent.match(/\w+="[^"]*"/g) || [];
      expect(attributeMatches.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design Meta Tags', () => {
    test('should have viewport meta tag with proper settings', () => {
      const viewportMatch = htmlContent.match(/<meta\s+name="viewport"\s+content="([^"]+)"/i);
      expect(viewportMatch).toBeTruthy();
      
      const content = viewportMatch[1];
      expect(content).toMatch(/width=device-width/i);
      expect(content).toMatch(/initial-scale=1\.0/i);
    });
  });

  describe('Performance Optimization', () => {
    test('should load CSS in head', () => {
      const headContent = htmlContent.match(/<head>[\s\S]*<\/head>/i)[0];
      expect(headContent).toMatch(/<link\s+rel="stylesheet"/i);
    });

    test('should load JavaScript at end of body', () => {
      const bodyContent = htmlContent.match(/<body>[\s\S]*<\/body>/i)[0];
      const scriptPosition = bodyContent.lastIndexOf('<script');
      const bodyEndPosition = bodyContent.lastIndexOf('</body>');
      
      expect(scriptPosition).toBeLessThan(bodyEndPosition);
      expect(bodyEndPosition - scriptPosition).toBeLessThan(100); // Script near end
    });
  });

  describe('Content Quality', () => {
    test('should have meaningful text content', () => {
      // Remove HTML tags to check text content
      const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
      expect(textContent.length).toBeGreaterThan(500);
    });

    test('should have professional title and company name', () => {
      expect(htmlContent).toMatch(/Principal.*Quantum Concepts LLC/i);
    });

    test('should have skills listed', () => {
      expect(htmlContent).toMatch(/Quantum Computing/i);
      expect(htmlContent).toMatch(/Technology Leadership/i);
    });
  });

  describe('Security Best Practices', () => {
    test('should use rel="noopener noreferrer" on external links with target="_blank"', () => {
      const externalLinks = htmlContent.match(/<a[^>]*target="_blank"[^>]*>/gi) || [];
      
      externalLinks.forEach(link => {
        expect(link).toMatch(/rel="noopener noreferrer"/i);
      });
    });

    test('should use HTTPS for all external resources', () => {
      const httpLinks = htmlContent.match(/http:\/\/(?!localhost)/gi);
      expect(httpLinks).toBeNull();
    });
  });
});