/**
 * HTML Validation and Structure Tests
 * Tests verify proper HTML structure, accessibility, SEO tags, and semantic markup
 */

const fs = require('fs');
const path = require('path');

describe('HTML Structure and Validation', () => {
  let htmlContent;
  
  beforeAll(() => {
    const htmlPath = path.join(__dirname, '..', 'index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  });
  
  describe('Document Structure', () => {
    test('should have valid DOCTYPE declaration', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });
    
    test('should have html tag with lang attribute', () => {
      expect(htmlContent).toMatch(/<html[^>]+lang="en"/i);
    });
    
    test('should have proper head section with required meta tags', () => {
      expect(htmlContent).toMatch(/<head>/i);
      expect(htmlContent).toMatch(/<meta charset="UTF-8">/i);
      expect(htmlContent).toMatch(/<meta name="viewport"/i);
    });
    
    test('should have title tag', () => {
      expect(htmlContent).toMatch(/<title>.*<\/title>/i);
    });
    
    test('should have body tag', () => {
      expect(htmlContent).toMatch(/<body>/i);
      expect(htmlContent).toMatch(/<\/body>/i);
    });
    
    test('should link to external CSS file', () => {
      expect(htmlContent).toMatch(/<link[^>]+href="styles\.css"/i);
    });
    
    test('should link to external JavaScript file', () => {
      expect(htmlContent).toMatch(/<script[^>]+src="script\.js"/i);
    });
  });
  
  describe('SEO Meta Tags', () => {
    test('should have description meta tag', () => {
      expect(htmlContent).toMatch(/<meta name="description"/i);
    });
    
    test('should have keywords meta tag', () => {
      expect(htmlContent).toMatch(/<meta name="keywords"/i);
    });
    
    test('should have author meta tag', () => {
      expect(htmlContent).toMatch(/<meta name="author"/i);
    });
    
    test('should have meaningful title content', () => {
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
      expect(titleMatch).toBeTruthy();
      expect(titleMatch[1].length).toBeGreaterThan(10);
      expect(titleMatch[1]).toContain('Charles David Bourassa');
    });
    
    test('should have meaningful description', () => {
      const descMatch = htmlContent.match(/<meta name="description" content="([^"]*)"/i);
      expect(descMatch).toBeTruthy();
      expect(descMatch[1].length).toBeGreaterThan(50);
    });
  });
  
  describe('Open Graph Meta Tags', () => {
    test('should have og:title meta tag', () => {
      expect(htmlContent).toMatch(/<meta property="og:title"/i);
    });
    
    test('should have og:description meta tag', () => {
      expect(htmlContent).toMatch(/<meta property="og:description"/i);
    });
    
    test('should have og:type meta tag', () => {
      expect(htmlContent).toMatch(/<meta property="og:type"/i);
    });
    
    test('should have og:url meta tag', () => {
      expect(htmlContent).toMatch(/<meta property="og:url"/i);
    });
  });
  
  describe('Twitter Card Meta Tags', () => {
    test('should have twitter:card meta tag', () => {
      expect(htmlContent).toMatch(/<meta name="twitter:card"/i);
    });
    
    test('should have twitter:title meta tag', () => {
      expect(htmlContent).toMatch(/<meta name="twitter:title"/i);
    });
    
    test('should have twitter:description meta tag', () => {
      expect(htmlContent).toMatch(/<meta name="twitter:description"/i);
    });
  });
  
  describe('Favicon Configuration', () => {
    test('should have favicon.ico link', () => {
      expect(htmlContent).toMatch(/<link[^>]+href="favicon\.ico"/i);
    });
    
    test('should have 32x32 PNG favicon', () => {
      expect(htmlContent).toMatch(/<link[^>]+href="favicon-32x32\.png"/i);
      expect(htmlContent).toMatch(/sizes="32x32"/i);
    });
    
    test('should have 16x16 PNG favicon', () => {
      expect(htmlContent).toMatch(/<link[^>]+href="favicon-16x16\.png"/i);
      expect(htmlContent).toMatch(/sizes="16x16"/i);
    });
  });
  
  describe('Accessibility Features', () => {
    test('should have skip-to-content link', () => {
      expect(htmlContent).toMatch(/<a[^>]+class="skip-to-content"/i);
      expect(htmlContent).toMatch(/href="#main-content"/i);
    });
    
    test('should have main landmark with id', () => {
      expect(htmlContent).toMatch(/<main[^>]+id="main-content"/i);
    });
    
    test('should have navigation with aria-label', () => {
      expect(htmlContent).toMatch(/<nav[^>]+aria-label="Main navigation"/i);
    });
    
    test('should have aria-required on required form fields', () => {
      const ariaRequiredMatches = htmlContent.match(/aria-required="true"/gi);
      expect(ariaRequiredMatches).toBeTruthy();
      expect(ariaRequiredMatches.length).toBeGreaterThanOrEqual(3);
    });
    
    test('should have aria-label on social media links', () => {
      expect(htmlContent).toMatch(/aria-label="GitHub profile"/i);
      expect(htmlContent).toMatch(/aria-label="LinkedIn profile"/i);
    });
    
    test('should have aria-label on email and phone links', () => {
      expect(htmlContent).toMatch(/aria-label="Email/i);
      expect(htmlContent).toMatch(/aria-label="Call/i);
    });
    
    test('should have aria-hidden on decorative SVG icons', () => {
      const svgMatches = htmlContent.match(/<svg[^>]*>/gi);
      if (svgMatches) {
        svgMatches.forEach(svg => {
          expect(svg).toMatch(/aria-hidden="true"/i);
        });
      }
    });
  });
  
  describe('Semantic HTML Structure', () => {
    test('should use semantic section elements', () => {
      const sectionMatches = htmlContent.match(/<section/gi);
      expect(sectionMatches).toBeTruthy();
      expect(sectionMatches.length).toBeGreaterThanOrEqual(4);
    });
    
    test('should have header hierarchy (h1, h2)', () => {
      expect(htmlContent).toMatch(/<h1>/i);
      expect(htmlContent).toMatch(/<h2>/i);
    });
    
    test('should have only one h1 element', () => {
      const h1Matches = htmlContent.match(/<h1>/gi);
      expect(h1Matches).toBeTruthy();
      expect(h1Matches.length).toBe(1);
    });
    
    test('should use nav element for navigation', () => {
      expect(htmlContent).toMatch(/<nav/i);
    });
    
    test('should use footer element', () => {
      expect(htmlContent).toMatch(/<footer>/i);
    });
    
    test('should use main element', () => {
      expect(htmlContent).toMatch(/<main/i);
    });
  });
  
  describe('Content Sections', () => {
    test('should have hero section', () => {
      expect(htmlContent).toMatch(/id="hero"/i);
    });
    
    test('should have about section', () => {
      expect(htmlContent).toMatch(/id="about"/i);
    });
    
    test('should have experience section', () => {
      expect(htmlContent).toMatch(/id="experience"/i);
    });
    
    test('should have skills section', () => {
      expect(htmlContent).toMatch(/id="skills"/i);
    });
    
    test('should have contact section', () => {
      expect(htmlContent).toMatch(/id="contact"/i);
    });
    
    test('should have navigation links matching section ids', () => {
      expect(htmlContent).toMatch(/href="#about"/i);
      expect(htmlContent).toMatch(/href="#experience"/i);
      expect(htmlContent).toMatch(/href="#skills"/i);
      expect(htmlContent).toMatch(/href="#contact"/i);
    });
  });
  
  describe('Contact Information', () => {
    test('should have email address', () => {
      expect(htmlContent).toMatch(/Quantum\.Concepts@outlook\.com/i);
    });
    
    test('should have phone number', () => {
      expect(htmlContent).toMatch(/\+1.*505.*469.*0152/);
    });
    
    test('should have location', () => {
      expect(htmlContent).toMatch(/Albuquerque.*NM/i);
    });
    
    test('should have mailto link for email', () => {
      expect(htmlContent).toMatch(/href="mailto:Quantum\.Concepts@outlook\.com"/i);
    });
    
    test('should have tel link for phone', () => {
      expect(htmlContent).toMatch(/href="tel:\+15054690152"/i);
    });
  });
  
  describe('Social Media Links', () => {
    test('should have GitHub link', () => {
      expect(htmlContent).toMatch(/href="https:\/\/github\.com\/Dbourassa11"/i);
    });
    
    test('should have LinkedIn link', () => {
      expect(htmlContent).toMatch(/href="https:\/\/www\.linkedin\.com\/in\/charlesdbourassa"/i);
    });
    
    test('should have proper target and rel attributes for external links', () => {
      const githubMatch = htmlContent.match(/<a[^>]+href="https:\/\/github\.com[^>]*>/i);
      expect(githubMatch).toBeTruthy();
      expect(githubMatch[0]).toMatch(/target="_blank"/i);
      expect(githubMatch[0]).toMatch(/rel="noopener noreferrer"/i);
    });
  });
  
  describe('Contact Form', () => {
    test('should have form element with proper action', () => {
      expect(htmlContent).toMatch(/<form[^>]+action="https:\/\/formspree\.io/i);
      expect(htmlContent).toMatch(/method="POST"/i);
    });
    
    test('should have name input field', () => {
      expect(htmlContent).toMatch(/<input[^>]+id="name"/i);
      expect(htmlContent).toMatch(/<input[^>]+name="name"/i);
      expect(htmlContent).toMatch(/<input[^>]+required/i);
    });
    
    test('should have email input field with type email', () => {
      expect(htmlContent).toMatch(/<input[^>]+type="email"[^>]+id="email"/i);
      expect(htmlContent).toMatch(/<input[^>]+name="email"/i);
    });
    
    test('should have message textarea', () => {
      expect(htmlContent).toMatch(/<textarea[^>]+id="message"/i);
      expect(htmlContent).toMatch(/<textarea[^>]+name="message"/i);
    });
    
    test('should have labels for all form fields', () => {
      expect(htmlContent).toMatch(/<label[^>]+for="name"/i);
      expect(htmlContent).toMatch(/<label[^>]+for="email"/i);
      expect(htmlContent).toMatch(/<label[^>]+for="message"/i);
    });
    
    test('should have submit button', () => {
      expect(htmlContent).toMatch(/<button[^>]+type="submit"/i);
    });
  });
  
  describe('Professional Content', () => {
    test('should display professional title', () => {
      expect(htmlContent).toMatch(/Principal.*Quantum Concepts LLC/i);
    });
    
    test('should have skills list', () => {
      expect(htmlContent).toMatch(/Quantum Computing/i);
      expect(htmlContent).toMatch(/Technology Leadership/i);
    });
    
    test('should have experience information', () => {
      expect(htmlContent).toMatch(/Quantum Concepts LLC/i);
    });
  });
  
  describe('Footer', () => {
    test('should have copyright notice', () => {
      expect(htmlContent).toMatch(/&copy;.*202\d/i);
      expect(htmlContent).toMatch(/Charles David Bourassa/i);
    });
  });
  
  describe('HTML Validation - No Common Errors', () => {
    test('should not have unclosed tags (basic check)', () => {
      const openDivs = (htmlContent.match(/<div[^>]*>/gi) || []).length;
      const closeDivs = (htmlContent.match(/<\/div>/gi) || []).length;
      expect(openDivs).toBe(closeDivs);
    });
    
    test('should not have duplicate ids', () => {
      const idMatches = htmlContent.match(/id="([^"]*)"/gi);
      if (idMatches) {
        const ids = idMatches.map(match => match.match(/id="([^"]*)"/)[1]);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
      }
    });
    
    test('should have proper quote usage in attributes', () => {
      // Check that attributes use proper quotes
      const attributeRegex = /\s+\w+=[^"'\s>][^>\s]*/g;
      const unquotedAttrs = htmlContent.match(attributeRegex);
      
      // Filter out valid unquoted attributes (numbers, data attributes)
      if (unquotedAttrs) {
        unquotedAttrs.forEach(attr => {
          // Allow numeric values and certain patterns
          expect(attr).toMatch(/=\d+|\s+required|\s+checked|\s+disabled/);
        });
      }
    });
  });
  
  describe('Responsive Design Hints', () => {
    test('should have viewport meta tag for responsive design', () => {
      expect(htmlContent).toMatch(/<meta name="viewport" content="width=device-width, initial-scale=1\.0">/i);
    });
  });
  
  describe('Script Loading', () => {
    test('should load script.js at end of body', () => {
      const scriptPosition = htmlContent.indexOf('<script src="script.js"></script>');
      const bodyClosePosition = htmlContent.indexOf('</body>');
      
      expect(scriptPosition).toBeGreaterThan(0);
      expect(scriptPosition).toBeLessThan(bodyClosePosition);
    });
  });
});