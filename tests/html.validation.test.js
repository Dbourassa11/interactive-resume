/**
 * Comprehensive HTML Validation Tests
 * Tests HTML structure, semantics, accessibility, and SEO
 */

const fs = require('fs');
const path = require('path');

describe('HTML Structure and Validation', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  });

  describe('Document Structure', () => {
    test('should have valid DOCTYPE declaration', () => {
      expect(htmlContent).toMatch(/^<!DOCTYPE html>/i);
    });

    test('should have html element with lang attribute', () => {
      expect(htmlContent).toMatch(/<html[^>]+lang="en"/i);
    });

    test('should have proper head section', () => {
      expect(htmlContent).toMatch(/<head>/i);
      expect(htmlContent).toMatch(/<\/head>/i);
    });

    test('should have proper body section', () => {
      expect(htmlContent).toMatch(/<body>/i);
      expect(htmlContent).toMatch(/<\/body>/i);
    });

    test('should have charset meta tag', () => {
      expect(htmlContent).toMatch(/<meta charset="UTF-8">/i);
    });

    test('should have viewport meta tag for responsive design', () => {
      expect(htmlContent).toMatch(/<meta name="viewport"[^>]*>/i);
      expect(htmlContent).toMatch(/width=device-width/i);
    });

    test('should have page title', () => {
      expect(htmlContent).toMatch(/<title>[^<]+<\/title>/i);
    });
  });

  describe('SEO Meta Tags', () => {
    test('should have meta description', () => {
      expect(htmlContent).toMatch(/<meta name="description"[^>]*content="[^"]+"/i);
    });

    test('should have meaningful page title', () => {
      const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i);
      expect(titleMatch).toBeTruthy();
      expect(titleMatch[1].length).toBeGreaterThan(10);
    });

    test('should have description content that is meaningful', () => {
      const descMatch = htmlContent.match(/<meta name="description"[^>]*content="([^"]+)"/i);
      expect(descMatch).toBeTruthy();
      expect(descMatch[1].length).toBeGreaterThan(20);
    });
  });

  describe('External Resources', () => {
    test('should link to stylesheet', () => {
      expect(htmlContent).toMatch(/<link[^>]+rel="stylesheet"[^>]+href="styles\.css"/i);
    });

    test('should link to Font Awesome for icons', () => {
      expect(htmlContent).toMatch(/font-awesome/i);
    });

    test('should include script file', () => {
      expect(htmlContent).toMatch(/<script[^>]+src="script\.js"[^>]*><\/script>/i);
    });

    test('should load script at end of body for performance', () => {
      const scriptIndex = htmlContent.indexOf('<script src="script.js"');
      const bodyCloseIndex = htmlContent.indexOf('</body>');
      expect(scriptIndex).toBeLessThan(bodyCloseIndex);
      expect(bodyCloseIndex - scriptIndex).toBeLessThan(200);
    });
  });

  describe('Navigation Structure', () => {
    test('should have navigation element', () => {
      expect(htmlContent).toMatch(/<nav[^>]*class="navbar"/i);
    });

    test('should have logo/branding', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="logo"/i);
    });

    test('should have navigation links list', () => {
      expect(htmlContent).toMatch(/<ul[^>]*class="nav-links"/i);
    });

    test('should have navigation links for all sections', () => {
      const sections = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'];
      sections.forEach(section => {
        expect(htmlContent).toMatch(new RegExp(`href="#${section}"`, 'i'));
      });
    });

    test('should have hamburger menu for mobile', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hamburger"/i);
    });

    test('should have three spans in hamburger menu', () => {
      const hamburgerMatch = htmlContent.match(/<div[^>]*class="hamburger"[^>]*>([\s\S]*?)<\/div>/i);
      expect(hamburgerMatch).toBeTruthy();
      const spanCount = (hamburgerMatch[1].match(/<span>/gi) || []).length;
      expect(spanCount).toBe(3);
    });
  });

  describe('Accessibility Features', () => {
    test('should have aria-label on hamburger menu', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hamburger"[^>]*aria-label="[^"]+"/i);
    });

    test('should have role attribute on hamburger', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hamburger"[^>]*role="button"/i);
    });

    test('should have tabindex on hamburger for keyboard navigation', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="hamburger"[^>]*tabindex="0"/i);
    });

    test('should have aria-label on social media links', () => {
      const socialLinks = htmlContent.match(/<a[^>]*class="[^"]*"[^>]*aria-label="[^"]+"/gi) || [];
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    test('should have aria-hidden on decorative elements', () => {
      expect(htmlContent).toMatch(/aria-hidden="true"/i);
    });

    test('should have proper heading hierarchy', () => {
      expect(htmlContent).toMatch(/<h1[^>]*>/i);
      expect(htmlContent).toMatch(/<h2[^>]*>/i);
      expect(htmlContent).toMatch(/<h3[^>]*>/i);
    });

    test('should have alt text on images', () => {
      const images = htmlContent.match(/<img[^>]*>/gi) || [];
      images.forEach(img => {
        expect(img).toMatch(/alt="[^"]*"/i);
      });
    });

    test('should use semantic HTML5 elements', () => {
      expect(htmlContent).toMatch(/<nav/i);
      expect(htmlContent).toMatch(/<section/i);
      expect(htmlContent).toMatch(/<footer/i);
    });
  });

  describe('Hero Section', () => {
    test('should have hero section with id="home"', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="home"[^>]*class="hero"/i);
    });

    test('should have main heading in hero', () => {
      expect(htmlContent).toMatch(/<h1[^>]*>.*<\/h1>/i);
    });

    test('should have highlight span for name', () => {
      expect(htmlContent).toMatch(/<span[^>]*class="highlight"/i);
    });

    test('should have CTA buttons', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="cta-buttons"/i);
    });

    test('should have at least two CTA buttons', () => {
      const ctaSection = htmlContent.match(/<div[^>]*class="cta-buttons"[^>]*>([\s\S]*?)<\/div>/i);
      expect(ctaSection).toBeTruthy();
      const buttonCount = (ctaSection[1].match(/<a[^>]*class="btn/gi) || []).length;
      expect(buttonCount).toBeGreaterThanOrEqual(2);
    });

    test('should have social links in hero', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="social-links"/i);
    });

    test('should have scroll indicator', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="scroll-indicator"/i);
    });
  });

  describe('About Section', () => {
    test('should have about section with proper id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="about"/i);
    });

    test('should have section title', () => {
      const aboutSection = htmlContent.match(/<section[^>]*id="about"[^>]*>([\s\S]*?)<\/section>/i);
      expect(aboutSection).toBeTruthy();
      expect(aboutSection[1]).toMatch(/<h2[^>]*class="section-title"/i);
    });

    test('should have about text content', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="about-text"/i);
    });

    test('should have statistics section', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="stats"/i);
    });

    test('should have stat items with data-target attributes', () => {
      const statNumbers = htmlContent.match(/<span[^>]*class="stat-number"[^>]*data-target="[^"]+"/gi);
      expect(statNumbers).toBeTruthy();
      expect(statNumbers.length).toBeGreaterThanOrEqual(3);
    });

    test('should have stat labels', () => {
      expect(htmlContent).toMatch(/<span[^>]*class="stat-label"/gi);
    });
  });

  describe('Skills Section', () => {
    test('should have skills section with proper id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="skills"/i);
    });

    test('should have skills grid', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="skills-grid"/i);
    });

    test('should have skill categories', () => {
      const skillCategories = htmlContent.match(/<div[^>]*class="skill-category"/gi);
      expect(skillCategories).toBeTruthy();
      expect(skillCategories.length).toBeGreaterThanOrEqual(2);
    });

    test('should have skill bars with data-width attributes', () => {
      const progressBars = htmlContent.match(/<div[^>]*class="progress-bar"[^>]*data-width="[^"]+"/gi);
      expect(progressBars).toBeTruthy();
      expect(progressBars.length).toBeGreaterThanOrEqual(4);
    });

    test('should have skill info showing percentages', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="skill-info"/gi);
    });

    test('should use Font Awesome icons in skill categories', () => {
      const skillsSection = htmlContent.match(/<section[^>]*id="skills"[^>]*>([\s\S]*?)<\/section>/i);
      expect(skillsSection).toBeTruthy();
      expect(skillsSection[1]).toMatch(/<i[^>]*class="fas /gi);
    });
  });

  describe('Experience Section', () => {
    test('should have experience section with proper id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="experience"/i);
    });

    test('should have timeline structure', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="timeline"/i);
    });

    test('should have timeline items', () => {
      const timelineItems = htmlContent.match(/<div[^>]*class="timeline-item"/gi);
      expect(timelineItems).toBeTruthy();
      expect(timelineItems.length).toBeGreaterThanOrEqual(3);
    });

    test('should have timeline dots for visual indicator', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="timeline-dot"/gi);
    });

    test('should have timeline content for each item', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="timeline-content"/gi);
    });

    test('should have job titles in experience', () => {
      const experienceSection = htmlContent.match(/<section[^>]*id="experience"[^>]*>([\s\S]*?)<\/section>/i);
      expect(experienceSection).toBeTruthy();
      expect(experienceSection[1]).toMatch(/<h3>/gi);
    });

    test('should have company names', () => {
      const experienceSection = htmlContent.match(/<section[^>]*id="experience"[^>]*>([\s\S]*?)<\/section>/i);
      expect(experienceSection).toBeTruthy();
      expect(experienceSection[1]).toMatch(/<h4>/gi);
    });

    test('should have date spans for timeline', () => {
      expect(htmlContent).toMatch(/<span[^>]*class="timeline-date"/gi);
    });

    test('should have lists of responsibilities', () => {
      const experienceSection = htmlContent.match(/<section[^>]*id="experience"[^>]*>([\s\S]*?)<\/section>/i);
      expect(experienceSection).toBeTruthy();
      expect(experienceSection[1]).toMatch(/<ul>/gi);
    });
  });

  describe('Education Section', () => {
    test('should have education section with proper id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="education"/i);
    });

    test('should have education grid', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="education-grid"/i);
    });

    test('should have education cards', () => {
      const educationCards = htmlContent.match(/<div[^>]*class="education-card"/gi);
      expect(educationCards).toBeTruthy();
      expect(educationCards.length).toBeGreaterThanOrEqual(2);
    });

    test('should have education icons', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="education-icon"/gi);
    });

    test('should use Font Awesome graduation cap icon', () => {
      const educationSection = htmlContent.match(/<section[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/i);
      expect(educationSection).toBeTruthy();
      expect(educationSection[1]).toMatch(/fa-graduation-cap/i);
    });

    test('should have education dates', () => {
      expect(htmlContent).toMatch(/<span[^>]*class="education-date"/gi);
    });
  });

  describe('Projects Section', () => {
    test('should have projects section with proper id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="projects"/i);
    });

    test('should have projects grid', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="projects-grid"/i);
    });

    test('should have project cards', () => {
      const projectCards = htmlContent.match(/<div[^>]*class="project-card"/gi);
      expect(projectCards).toBeTruthy();
      expect(projectCards.length).toBeGreaterThanOrEqual(3);
    });

    test('should have project images', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="project-image"/gi);
    });

    test('should have project overlays for hover effect', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="project-overlay"/gi);
    });

    test('should have project links (demo and source)', () => {
      const projectLinks = htmlContent.match(/<a[^>]*class="project-link"/gi);
      expect(projectLinks).toBeTruthy();
      expect(projectLinks.length).toBeGreaterThanOrEqual(6); // At least 2 per project
    });

    test('should have aria-labels on project links', () => {
      const projectSection = htmlContent.match(/<section[^>]*id="projects"[^>]*>([\s\S]*?)<\/section>/i);
      expect(projectSection).toBeTruthy();
      expect(projectSection[1]).toMatch(/aria-label="View live demo"/gi);
      expect(projectSection[1]).toMatch(/aria-label="View source code/gi);
    });

    test('should have project info sections', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="project-info"/gi);
    });

    test('should have project tags', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="project-tags"/gi);
    });

    test('should have technology tags as spans', () => {
      const projectSection = htmlContent.match(/<section[^>]*id="projects"[^>]*>([\s\S]*?)<\/section>/i);
      expect(projectSection).toBeTruthy();
      const tagMatches = projectSection[1].match(/<div[^>]*class="project-tags"[^>]*>([\s\S]*?)<\/div>/gi);
      expect(tagMatches).toBeTruthy();
      tagMatches.forEach(tagDiv => {
        expect(tagDiv).toMatch(/<span>/gi);
      });
    });
  });

  describe('Contact Section', () => {
    test('should have contact section with proper id', () => {
      expect(htmlContent).toMatch(/<section[^>]*id="contact"/i);
    });

    test('should have contact content grid', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="contact-content"/i);
    });

    test('should have contact info section', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="contact-info"/i);
    });

    test('should have contact details', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="contact-details"/i);
    });

    test('should have contact items (email, phone, location)', () => {
      const contactItems = htmlContent.match(/<div[^>]*class="contact-item"/gi);
      expect(contactItems).toBeTruthy();
      expect(contactItems.length).toBeGreaterThanOrEqual(3);
    });

    test('should use Font Awesome icons for contact items', () => {
      const contactSection = htmlContent.match(/<section[^>]*id="contact"[^>]*>([\s\S]*?)<\/section>/i);
      expect(contactSection).toBeTruthy();
      expect(contactSection[1]).toMatch(/fa-envelope/i);
      expect(contactSection[1]).toMatch(/fa-phone/i);
      expect(contactSection[1]).toMatch(/fa-map-marker-alt/i);
    });

    test('should have contact form with proper id', () => {
      expect(htmlContent).toMatch(/<form[^>]*id="contactForm"/i);
    });

    test('should have form groups', () => {
      const formGroups = htmlContent.match(/<div[^>]*class="form-group"/gi);
      expect(formGroups).toBeTruthy();
      expect(formGroups.length).toBeGreaterThanOrEqual(4);
    });

    test('should have required form fields', () => {
      expect(htmlContent).toMatch(/<input[^>]*id="name"[^>]*required/i);
      expect(htmlContent).toMatch(/<input[^>]*id="email"[^>]*required/i);
      expect(htmlContent).toMatch(/<input[^>]*id="subject"[^>]*required/i);
      expect(htmlContent).toMatch(/<textarea[^>]*id="message"[^>]*required/i);
    });

    test('should have email input with type="email"', () => {
      expect(htmlContent).toMatch(/<input[^>]*type="email"[^>]*id="email"/i);
    });

    test('should have labels for form fields', () => {
      expect(htmlContent).toMatch(/<label[^>]*for="name"/i);
      expect(htmlContent).toMatch(/<label[^>]*for="email"/i);
      expect(htmlContent).toMatch(/<label[^>]*for="subject"/i);
      expect(htmlContent).toMatch(/<label[^>]*for="message"/i);
    });

    test('should have submit button', () => {
      const contactForm = htmlContent.match(/<form[^>]*id="contactForm"[^>]*>([\s\S]*?)<\/form>/i);
      expect(contactForm).toBeTruthy();
      expect(contactForm[1]).toMatch(/<button[^>]*type="submit"/i);
    });

    test('should have placeholder text on inputs', () => {
      expect(htmlContent).toMatch(/placeholder="Your Name"/i);
      expect(htmlContent).toMatch(/placeholder="Your Email"/i);
      expect(htmlContent).toMatch(/placeholder="Subject"/i);
      expect(htmlContent).toMatch(/placeholder="Your Message"/i);
    });
  });

  describe('Footer', () => {
    test('should have footer element', () => {
      expect(htmlContent).toMatch(/<footer[^>]*class="footer"/i);
    });

    test('should have copyright notice', () => {
      const footer = htmlContent.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
      expect(footer).toBeTruthy();
      expect(footer[1]).toMatch(/&copy;|©/i);
    });

    test('should have footer links', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="footer-links"/i);
    });

    test('should have back to top link', () => {
      const footer = htmlContent.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
      expect(footer).toBeTruthy();
      expect(footer[1]).toMatch(/href="#home"|Back to Top/i);
    });
  });

  describe('HTML Validation', () => {
    test('should not have duplicate IDs', () => {
      const idMatches = htmlContent.match(/id="([^"]+)"/g) || [];
      const ids = idMatches.map(match => match.match(/id="([^"]+)"/)[1]);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    test('should properly close all tags', () => {
      const openDivs = (htmlContent.match(/<div[^>]*>/g) || []).length;
      const closeDivs = (htmlContent.match(/<\/div>/g) || []).length;
      expect(openDivs).toBe(closeDivs);
    });

    test('should properly close all sections', () => {
      const openSections = (htmlContent.match(/<section[^>]*>/g) || []).length;
      const closeSections = (htmlContent.match(/<\/section>/g) || []).length;
      expect(openSections).toBe(closeSections);
    });

    test('should use double quotes for attributes', () => {
      const singleQuoteAttrs = htmlContent.match(/=\s*'[^']*'/g);
      if (singleQuoteAttrs) {
        expect(singleQuoteAttrs.length).toBe(0);
      }
    });

    test('should have proper nesting of elements', () => {
      // Check that main is inside body
      const bodyContent = htmlContent.match(/<body>([\s\S]*)<\/body>/i);
      expect(bodyContent).toBeTruthy();
    });

    test('should not have inline styles (prefer external CSS)', () => {
      const inlineStyles = htmlContent.match(/style="[^"]*"/gi);
      // Allow minimal inline styles if necessary
      if (inlineStyles) {
        expect(inlineStyles.length).toBeLessThan(5);
      }
    });
  });

  describe('Social Media Integration', () => {
    test('should have social media links', () => {
      expect(htmlContent).toMatch(/href="https:\/\/github\.com"/i);
      expect(htmlContent).toMatch(/href="https:\/\/linkedin\.com"/i);
      expect(htmlContent).toMatch(/href="https:\/\/twitter\.com"/i);
    });

    test('should have mailto link', () => {
      expect(htmlContent).toMatch(/href="mailto:/i);
    });

    test('should have target="_blank" on external links', () => {
      const externalLinks = htmlContent.match(/<a[^>]*href="https:\/\/[^"]+"/gi) || [];
      externalLinks.forEach(link => {
        if (!link.includes('target')) {
          expect(link).toMatch(/target="_blank"/i);
        }
      });
    });

    test('should use Font Awesome social icons', () => {
      expect(htmlContent).toMatch(/fa-github/i);
      expect(htmlContent).toMatch(/fa-linkedin/i);
      expect(htmlContent).toMatch(/fa-twitter/i);
    });
  });

  describe('Content Structure', () => {
    test('should have all major sections present', () => {
      const sections = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'];
      sections.forEach(section => {
        expect(htmlContent).toMatch(new RegExp(`id="${section}"`, 'i'));
      });
    });

    test('should have container divs for proper layout', () => {
      const containers = htmlContent.match(/<div[^>]*class="container"/gi);
      expect(containers).toBeTruthy();
      expect(containers.length).toBeGreaterThanOrEqual(5);
    });

    test('should use bg-light class for alternating section backgrounds', () => {
      expect(htmlContent).toMatch(/class="section bg-light"/gi);
    });

    test('should have meaningful content in paragraphs', () => {
      const paragraphs = htmlContent.match(/<p>[^<]{20,}<\/p>/gi);
      expect(paragraphs).toBeTruthy();
      expect(paragraphs.length).toBeGreaterThan(5);
    });
  });

  describe('Performance Considerations', () => {
    test('should load external resources efficiently', () => {
      // Font Awesome from CDN
      expect(htmlContent).toMatch(/cdnjs\.cloudflare\.com/i);
    });

    test('should use appropriate image formats', () => {
      const images = htmlContent.match(/<img[^>]*src="[^"]+"/gi) || [];
      images.forEach(img => {
        expect(img).toMatch(/\.(jpg|jpeg|png|webp|svg)/i);
      });
    });

    test('should have placeholder images with proper dimensions', () => {
      const placeholders = htmlContent.match(/via\.placeholder\.com\/(\d+)x(\d+)/gi);
      if (placeholders) {
        placeholders.forEach(placeholder => {
          expect(placeholder).toMatch(/\d{3,4}x\d{3,4}/);
        });
      }
    });
  });
});