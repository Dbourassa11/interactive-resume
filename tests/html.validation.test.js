/**
 * HTML Structure and Validation Tests
 * Tests HTML semantics, structure, and accessibility
 */

const fs = require('fs');
const path = require('path');

describe('HTML Structure and Validation', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  });

  describe('Document Structure', () => {
    test('should have valid DOCTYPE declaration', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });

    test('should have html element with lang attribute', () => {
      expect(htmlContent).toMatch(/<html[^>]+lang="en"/i);
    });

    test('should have head element with charset', () => {
      expect(htmlContent).toMatch(/<meta charset="UTF-8">/i);
    });

    test('should have viewport meta tag for responsiveness', () => {
      expect(htmlContent).toMatch(/<meta name="viewport"/i);
      expect(htmlContent).toMatch(/width=device-width/i);
    });

    test('should have title element', () => {
      expect(htmlContent).toMatch(/<title>.*?<\/title>/i);
    });

    test('should have body element', () => {
      expect(htmlContent).toMatch(/<body>/i);
      expect(htmlContent).toMatch(/<\/body>/i);
    });
  });

  describe('Meta Tags and SEO', () => {
    test('should have description meta tag', () => {
      expect(htmlContent).toMatch(/<meta name="description"/i);
    });

    test('should have title that is descriptive', () => {
      const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
      expect(titleMatch).toBeTruthy();
      expect(titleMatch[1].length).toBeGreaterThan(10);
    });

    test('should have meta description with content', () => {
      const descMatch = htmlContent.match(/<meta name="description" content="([^"]+)"/i);
      expect(descMatch).toBeTruthy();
      expect(descMatch[1].length).toBeGreaterThan(20);
    });
  });

  describe('Stylesheet Links', () => {
    test('should link to styles.css', () => {
      expect(htmlContent).toMatch(/<link[^>]+href="styles\.css"/i);
    });

    test('should link to Font Awesome', () => {
      expect(htmlContent).toMatch(/font-awesome/i);
    });

    test('should have rel="stylesheet" for CSS links', () => {
      const cssLinks = htmlContent.match(/<link[^>]+rel="stylesheet"[^>]*>/gi);
      expect(cssLinks).toBeTruthy();
      expect(cssLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation Structure', () => {
    test('should have nav element with class navbar', () => {
      expect(htmlContent).toMatch(/<nav[^>]+class="navbar"/i);
    });

    test('should have logo element', () => {
      expect(htmlContent).toMatch(/class="logo"/i);
    });

    test('should have navigation links list', () => {
      expect(htmlContent).toMatch(/class="nav-links"/i);
      expect(htmlContent).toMatch(/<ul[^>]*class="nav-links"/i);
    });

    test('should have hamburger menu for mobile', () => {
      expect(htmlContent).toMatch(/class="hamburger"/i);
    });

    test('should have aria-label on hamburger menu', () => {
      expect(htmlContent).toMatch(/hamburger"[^>]+aria-label/i);
    });

    test('should have all required navigation links', () => {
      const requiredLinks = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'];
      
      requiredLinks.forEach(link => {
        expect(htmlContent).toMatch(new RegExp(`href="#${link}"`, 'i'));
      });
    });

    test('should have navigation items as list items', () => {
      const navItems = htmlContent.match(/<li><a href="#[^"]+">.*?<\/a><\/li>/gi);
      expect(navItems).toBeTruthy();
      expect(navItems.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Hero Section', () => {
    test('should have hero section with id="home"', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="home"/i);
      expect(htmlContent).toMatch(/class="hero"/i);
    });

    test('should have h1 heading in hero', () => {
      expect(htmlContent).toMatch(/<h1[^>]*>.*?<\/h1>/i);
    });

    test('should have CTA buttons', () => {
      expect(htmlContent).toMatch(/class="cta-buttons"/i);
      expect(htmlContent).toMatch(/class="btn btn-primary"/i);
      expect(htmlContent).toMatch(/class="btn btn-secondary"/i);
    });

    test('should have social links in hero', () => {
      expect(htmlContent).toMatch(/class="social-links"/i);
    });

    test('should have social links with aria-labels', () => {
      const socialLinks = htmlContent.match(/<a[^>]+aria-label="[^"]*profile"[^>]*>/gi);
      expect(socialLinks).toBeTruthy();
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    test('should have scroll indicator', () => {
      expect(htmlContent).toMatch(/class="scroll-indicator"/i);
    });

    test('should have fade-in animation classes', () => {
      expect(htmlContent).toMatch(/class="[^"]*fade-in[^"]*"/i);
    });
  });

  describe('About Section', () => {
    test('should have about section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="about"/i);
    });

    test('should have section title', () => {
      expect(htmlContent).toMatch(/class="section-title"[^>]*>About Me<\/h2>/i);
    });

    test('should have stats section', () => {
      expect(htmlContent).toMatch(/class="stats"/i);
    });

    test('should have stat items with data-target attributes', () => {
      expect(htmlContent).toMatch(/data-target="\d+"/gi);
    });

    test('should have stat numbers and labels', () => {
      expect(htmlContent).toMatch(/class="stat-number"/i);
      expect(htmlContent).toMatch(/class="stat-label"/i);
    });

    test('should have at least 3 statistics', () => {
      const stats = htmlContent.match(/class="stat-item"/gi);
      expect(stats).toBeTruthy();
      expect(stats.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Skills Section', () => {
    test('should have skills section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="skills"/i);
    });

    test('should have skills grid', () => {
      expect(htmlContent).toMatch(/class="skills-grid"/i);
    });

    test('should have skill categories', () => {
      const categories = htmlContent.match(/class="skill-category"/gi);
      expect(categories).toBeTruthy();
      expect(categories.length).toBeGreaterThan(0);
    });

    test('should have skill bars with progress indicators', () => {
      expect(htmlContent).toMatch(/class="skill-bar"/gi);
      expect(htmlContent).toMatch(/class="progress"/gi);
      expect(htmlContent).toMatch(/class="progress-bar"/gi);
    });

    test('should have data-width attributes for progress bars', () => {
      const progressBars = htmlContent.match(/data-width="\d+"/gi);
      expect(progressBars).toBeTruthy();
      expect(progressBars.length).toBeGreaterThan(0);
    });

    test('should have skill percentages', () => {
      expect(htmlContent).toMatch(/\d+%/);
    });

    test('should have Font Awesome icons', () => {
      expect(htmlContent).toMatch(/<i class="fas fa-/gi);
    });
  });

  describe('Experience Section', () => {
    test('should have experience section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="experience"/i);
    });

    test('should have timeline structure', () => {
      expect(htmlContent).toMatch(/class="timeline"/i);
    });

    test('should have timeline items', () => {
      const items = htmlContent.match(/class="timeline-item"/gi);
      expect(items).toBeTruthy();
      expect(items.length).toBeGreaterThan(0);
    });

    test('should have timeline dots', () => {
      expect(htmlContent).toMatch(/class="timeline-dot"/gi);
    });

    test('should have timeline content with job details', () => {
      expect(htmlContent).toMatch(/class="timeline-content"/gi);
    });

    test('should have dates for each position', () => {
      expect(htmlContent).toMatch(/class="timeline-date"/gi);
    });

    test('should have job descriptions as lists', () => {
      const experienceSection = htmlContent.match(/<section[^>]+id="experience"[^>]*>[\s\S]*?<\/section>/i);
      expect(experienceSection).toBeTruthy();
      expect(experienceSection[0]).toMatch(/<ul>/i);
      expect(experienceSection[0]).toMatch(/<li>/i);
    });
  });

  describe('Education Section', () => {
    test('should have education section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="education"/i);
    });

    test('should have education grid', () => {
      expect(htmlContent).toMatch(/class="education-grid"/i);
    });

    test('should have education cards', () => {
      const cards = htmlContent.match(/class="education-card"/gi);
      expect(cards).toBeTruthy();
      expect(cards.length).toBeGreaterThan(0);
    });

    test('should have education icons', () => {
      expect(htmlContent).toMatch(/class="education-icon"/gi);
    });

    test('should have graduation cap or certificate icons', () => {
      expect(htmlContent).toMatch(/fa-graduation-cap|fa-certificate/gi);
    });

    test('should have education dates', () => {
      expect(htmlContent).toMatch(/class="education-date"/gi);
    });
  });

  describe('Projects Section', () => {
    test('should have projects section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="projects"/i);
    });

    test('should have projects grid', () => {
      expect(htmlContent).toMatch(/class="projects-grid"/i);
    });

    test('should have project cards', () => {
      const cards = htmlContent.match(/class="project-card"/gi);
      expect(cards).toBeTruthy();
      expect(cards.length).toBeGreaterThan(0);
    });

    test('should have project images', () => {
      expect(htmlContent).toMatch(/class="project-image"/gi);
    });

    test('should have project overlays', () => {
      expect(htmlContent).toMatch(/class="project-overlay"/gi);
    });

    test('should have project links with aria-labels', () => {
      expect(htmlContent).toMatch(/class="project-link"[^>]+aria-label/gi);
    });

    test('should have project tags', () => {
      expect(htmlContent).toMatch(/class="project-tags"/gi);
    });

    test('should have project images with alt text', () => {
      const projectImages = htmlContent.match(/<img[^>]+alt="Project \d+"/gi);
      expect(projectImages).toBeTruthy();
    });

    test('should have external link icons', () => {
      expect(htmlContent).toMatch(/fa-external-link-alt/i);
    });

    test('should have GitHub link icons', () => {
      expect(htmlContent).toMatch(/fa-github/i);
    });
  });

  describe('Contact Section', () => {
    test('should have contact section with id', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="contact"/i);
    });

    test('should have contact form with id', () => {
      expect(htmlContent).toMatch(/<form[^>]+id="contactForm"/i);
    });

    test('should have all required form fields', () => {
      expect(htmlContent).toMatch(/id="name"/i);
      expect(htmlContent).toMatch(/id="email"/i);
      expect(htmlContent).toMatch(/id="subject"/i);
      expect(htmlContent).toMatch(/id="message"/i);
    });

    test('should have labels for form fields', () => {
      const labels = htmlContent.match(/<label for="(name|email|subject|message)">/gi);
      expect(labels).toBeTruthy();
      expect(labels.length).toBe(4);
    });

    test('should have required attributes on form fields', () => {
      expect(htmlContent).toMatch(/id="name"[^>]+required/i);
      expect(htmlContent).toMatch(/id="email"[^>]+required/i);
      expect(htmlContent).toMatch(/id="subject"[^>]+required/i);
      expect(htmlContent).toMatch(/id="message"[^>]+required/i);
    });

    test('should have email input with type="email"', () => {
      expect(htmlContent).toMatch(/<input[^>]+type="email"[^>]+id="email"/i);
    });

    test('should have textarea for message', () => {
      expect(htmlContent).toMatch(/<textarea[^>]+id="message"/i);
    });

    test('should have submit button', () => {
      expect(htmlContent).toMatch(/<button[^>]+type="submit"/i);
    });

    test('should have contact details', () => {
      expect(htmlContent).toMatch(/class="contact-details"/i);
      expect(htmlContent).toMatch(/class="contact-item"/gi);
    });

    test('should have contact icons', () => {
      expect(htmlContent).toMatch(/fa-envelope|fa-phone|fa-map-marker-alt/gi);
    });
  });

  describe('Footer', () => {
    test('should have footer element', () => {
      expect(htmlContent).toMatch(/<footer[^>]+class="footer"/i);
    });

    test('should have copyright information', () => {
      expect(htmlContent).toMatch(/©|&copy;|copyright/i);
    });

    test('should have back to top link', () => {
      expect(htmlContent).toMatch(/Back to Top/i);
      expect(htmlContent).toMatch(/href="#home"/i);
    });

    test('should have current year or static year', () => {
      expect(htmlContent).toMatch(/20\d{2}/);
    });
  });

  describe('Script Loading', () => {
    test('should load script.js at end of body', () => {
      expect(htmlContent).toMatch(/<script src="script\.js"><\/script>/i);
    });

    test('should load scripts before closing body tag', () => {
      const scriptPosition = htmlContent.indexOf('<script src="script.js">');
      const bodyClosePosition = htmlContent.indexOf('</body>');
      
      expect(scriptPosition).toBeLessThan(bodyClosePosition);
    });
  });

  describe('Accessibility', () => {
    test('should have aria-labels on interactive elements', () => {
      const ariaLabels = htmlContent.match(/aria-label="/gi);
      expect(ariaLabels).toBeTruthy();
      expect(ariaLabels.length).toBeGreaterThan(5);
    });

    test('should have role attributes where appropriate', () => {
      expect(htmlContent).toMatch(/role="button"/gi);
    });

    test('should have tabindex on keyboard-navigable elements', () => {
      expect(htmlContent).toMatch(/tabindex="0"/i);
    });

    test('should use semantic HTML elements', () => {
      expect(htmlContent).toMatch(/<nav/i);
      expect(htmlContent).toMatch(/<section/i);
      expect(htmlContent).toMatch(/<footer/i);
    });

    test('should have proper heading hierarchy', () => {
      expect(htmlContent).toMatch(/<h1/i);
      expect(htmlContent).toMatch(/<h2/i);
      expect(htmlContent).toMatch(/<h3/i);
    });

    test('should have alt text on images', () => {
      const images = htmlContent.match(/<img[^>]*>/gi);
      if (images) {
        images.forEach(img => {
          expect(img).toMatch(/alt="[^"]*"/i);
        });
      }
    });

    test('should have aria-hidden on decorative elements', () => {
      expect(htmlContent).toMatch(/aria-hidden="true"/i);
    });
  });

  describe('HTML Validation', () => {
    test('should not have duplicate IDs', () => {
      const ids = htmlContent.match(/id="([^"]+)"/gi);
      if (ids) {
        const idValues = ids.map(id => id.match(/id="([^"]+)"/i)[1]);
        const uniqueIds = new Set(idValues);
        expect(idValues.length).toBe(uniqueIds.size);
      }
    });

    test('should properly close all tags', () => {
      const openDivs = (htmlContent.match(/<div/gi) || []).length;
      const closeDivs = (htmlContent.match(/<\/div>/gi) || []).length;
      expect(openDivs).toBe(closeDivs);
      
      const openSections = (htmlContent.match(/<section/gi) || []).length;
      const closeSections = (htmlContent.match(/<\/section>/gi) || []).length;
      expect(openSections).toBe(closeSections);
    });

    test('should use proper quote syntax', () => {
      // Check that attributes use consistent quotes
      const doubleQuotes = (htmlContent.match(/="[^"]*"/g) || []).length;
      expect(doubleQuotes).toBeGreaterThan(0);
    });

    test('should not have inline styles (use classes instead)', () => {
      const inlineStyles = htmlContent.match(/<[^>]+style="[^"]*"/gi);
      // Allow minimal inline styles, but not excessive
      if (inlineStyles) {
        expect(inlineStyles.length).toBeLessThan(5);
      }
    });
  });

  describe('Responsive Design Indicators', () => {
    test('should have container classes', () => {
      expect(htmlContent).toMatch(/class="[^"]*container[^"]*"/gi);
    });

    test('should have grid layouts', () => {
      expect(htmlContent).toMatch(/grid/i);
    });

    test('should have section classes for styling', () => {
      expect(htmlContent).toMatch(/class="section"/gi);
    });

    test('should have bg-light class for alternating backgrounds', () => {
      expect(htmlContent).toMatch(/class="[^"]*bg-light[^"]*"/gi);
    });
  });

  describe('Content Quality', () => {
    test('should have placeholder content or real content', () => {
      expect(htmlContent.length).toBeGreaterThan(5000);
    });

    test('should have meaningful section titles', () => {
      expect(htmlContent).toMatch(/About Me|Skills|Experience|Education|Projects|Contact/i);
    });

    test('should have descriptive link text', () => {
      const links = htmlContent.match(/<a[^>]*>(.*?)<\/a>/gi);
      if (links) {
        links.forEach(link => {
          const text = link.match(/<a[^>]*>(.*?)<\/a>/i)[1];
          // Links should not just say "click here" or be empty
          expect(text.length).toBeGreaterThan(0);
        });
      }
    });
  });
});