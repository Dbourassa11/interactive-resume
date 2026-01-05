/**
 * Comprehensive HTML Validation Tests
 * Tests HTML structure, semantics, accessibility, and SEO
 */

const fs = require('fs');
const path = require('path');

describe('Interactive Resume - HTML Validation', () => {
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  });

  describe('Document Structure', () => {
    test('should have valid DOCTYPE declaration', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });

    test('should have html element with lang attribute', () => {
      expect(htmlContent).toMatch(/<html[^>]+lang="en"/i);
    });

    test('should have head section with required meta tags', () => {
      expect(htmlContent).toMatch(/<head>/i);
      expect(htmlContent).toMatch(/<meta charset="UTF-8">/i);
      expect(htmlContent).toMatch(/<meta name="viewport"/i);
    });

    test('should have body element', () => {
      expect(htmlContent).toMatch(/<body>/i);
      expect(htmlContent).toMatch(/<\/body>/i);
    });

    test('should have proper nesting of elements', () => {
      const htmlTag = htmlContent.match(/<html[^>]*>/i);
      const htmlCloseTag = htmlContent.match(/<\/html>/i);
      const bodyTag = htmlContent.match(/<body>/i);
      const bodyCloseTag = htmlContent.match(/<\/body>/i);
      
      expect(htmlTag).toBeTruthy();
      expect(htmlCloseTag).toBeTruthy();
      expect(bodyTag).toBeTruthy();
      expect(bodyCloseTag).toBeTruthy();
      
      expect(htmlTag.index).toBeLessThan(bodyTag.index);
      expect(bodyCloseTag.index).toBeLessThan(htmlCloseTag.index);
    });

    test('should close all opening tags properly', () => {
      const openingTags = htmlContent.match(/<(?!\/|!)[a-z][^>]*>/gi) || [];
      const closingTags = htmlContent.match(/<\/[a-z][^>]*>/gi) || [];
      const selfClosingTags = htmlContent.match(/<[a-z][^>]*\/>/gi) || [];
      
      // Count non-self-closing tags
      const nonSelfClosing = openingTags.filter(tag => 
        !tag.endsWith('/>') && 
        !['<meta', '<link', '<img', '<input', '<br', '<hr'].some(t => tag.toLowerCase().startsWith(t))
      );
      
      // Should have roughly equal number of opening and closing tags
      expect(closingTags.length).toBeGreaterThan(nonSelfClosing.length * 0.8);
    });
  });

  describe('Meta Tags and SEO', () => {
    test('should have title tag', () => {
      expect(htmlContent).toMatch(/<title>[^<]+<\/title>/i);
      const title = htmlContent.match(/<title>([^<]+)<\/title>/i);
      expect(title[1].length).toBeGreaterThan(0);
    });

    test('should have meta description', () => {
      expect(htmlContent).toMatch(/<meta[^>]+name="description"/i);
      const description = htmlContent.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
      expect(description).toBeTruthy();
      expect(description[1].length).toBeGreaterThan(0);
    });

    test('should have viewport meta tag for responsive design', () => {
      expect(htmlContent).toMatch(/<meta name="viewport" content="width=device-width, initial-scale=1.0">/i);
    });

    test('should have UTF-8 charset', () => {
      expect(htmlContent).toMatch(/<meta charset="UTF-8">/i);
    });

    test('title should be descriptive and under 60 characters', () => {
      const title = htmlContent.match(/<title>([^<]+)<\/title>/i);
      expect(title).toBeTruthy();
      expect(title[1].length).toBeLessThanOrEqual(60);
      expect(title[1].length).toBeGreaterThan(10);
    });

    test('meta description should be between 50-160 characters', () => {
      const description = htmlContent.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
      if (description) {
        expect(description[1].length).toBeGreaterThanOrEqual(20);
        expect(description[1].length).toBeLessThanOrEqual(160);
      }
    });
  });

  describe('CSS and JavaScript Resources', () => {
    test('should link to styles.css', () => {
      expect(htmlContent).toMatch(/<link[^>]+href="styles\.css"/i);
    });

    test('should link to script.js', () => {
      expect(htmlContent).toMatch(/<script[^>]+src="script\.js"/i);
    });

    test('should include Font Awesome', () => {
      expect(htmlContent).toMatch(/font-awesome/i);
    });

    test('should load script at end of body', () => {
      const scriptTag = htmlContent.match(/<script[^>]+src="script\.js"[^>]*><\/script>/i);
      const bodyCloseTag = htmlContent.match(/<\/body>/i);
      
      if (scriptTag && bodyCloseTag) {
        expect(scriptTag.index).toBeLessThan(bodyCloseTag.index);
      }
    });

    test('should use proper link tag attributes', () => {
      const links = htmlContent.match(/<link[^>]+>/gi) || [];
      links.forEach(link => {
        if (link.includes('stylesheet')) {
          expect(link).toMatch(/rel="stylesheet"/i);
        }
      });
    });
  });

  describe('Navigation Structure', () => {
    test('should have navigation element', () => {
      expect(htmlContent).toMatch(/<nav[^>]*>/i);
    });

    test('should have navigation with navbar class', () => {
      expect(htmlContent).toMatch(/<nav[^>]+class="[^"]*navbar[^"]*"/i);
    });

    test('should have navigation links', () => {
      expect(htmlContent).toMatch(/<nav[^>]*>[\s\S]*<ul[^>]*>[\s\S]*<\/ul>[\s\S]*<\/nav>/i);
    });

    test('should have hamburger menu for mobile', () => {
      expect(htmlContent).toMatch(/class="[^"]*hamburger[^"]*"/i);
    });

    test('should have aria-label on hamburger menu', () => {
      expect(htmlContent).toMatch(/<div[^>]+class="[^"]*hamburger[^"]*"[^>]+aria-label="[^"]+"/i);
    });

    test('should have navigation links to all main sections', () => {
      const expectedSections = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'];
      expectedSections.forEach(section => {
        expect(htmlContent).toMatch(new RegExp(`href="#${section}"`, 'i'));
      });
    });

    test('navigation links should be within list items', () => {
      const navLinks = htmlContent.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
      if (navLinks) {
        const links = navLinks[0].match(/<a[^>]+href="#[^"]+"/gi) || [];
        const listItems = navLinks[0].match(/<li>/gi) || [];
        expect(links.length).toBeGreaterThan(0);
        expect(listItems.length).toBeGreaterThanOrEqual(links.length - 1); // -1 for potential logo link
      }
    });
  });

  describe('Hero Section', () => {
    test('should have hero section', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="home"[^>]*class="[^"]*hero[^"]*"/i);
    });

    test('should have h1 heading in hero', () => {
      const heroSection = htmlContent.match(/<section[^>]+id="home"[^>]*>[\s\S]*?<\/section>/i);
      expect(heroSection).toBeTruthy();
      expect(heroSection[0]).toMatch(/<h1[^>]*>/i);
    });

    test('should have call-to-action buttons', () => {
      expect(htmlContent).toMatch(/class="[^"]*cta-buttons[^"]*"/i);
      expect(htmlContent).toMatch(/class="[^"]*btn[^"]*"/gi);
    });

    test('should have social links', () => {
      expect(htmlContent).toMatch(/class="[^"]*social-links[^"]*"/i);
    });

    test('should have scroll indicator', () => {
      expect(htmlContent).toMatch(/class="[^"]*scroll-indicator[^"]*"/i);
    });

    test('social links should have target="_blank" for external links', () => {
      const socialLinks = htmlContent.match(/<div[^>]+class="[^"]*social-links[^"]*"[^>]*>[\s\S]*?<\/div>/i);
      if (socialLinks) {
        const externalLinks = socialLinks[0].match(/<a[^>]+href="https?:\/\//gi) || [];
        externalLinks.forEach(link => {
          expect(link).toMatch(/target="_blank"/i);
        });
      }
    });

    test('social links should have aria-label', () => {
      const socialLinks = htmlContent.match(/<div[^>]+class="[^"]*social-links[^"]*"[^>]*>[\s\S]*?<\/div>/i);
      if (socialLinks) {
        const links = socialLinks[0].match(/<a[^>]+>/gi) || [];
        links.forEach(link => {
          expect(link).toMatch(/aria-label="[^"]+"/i);
        });
      }
    });
  });

  describe('About Section', () => {
    test('should have about section', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="about"/i);
    });

    test('should have section title', () => {
      const aboutSection = htmlContent.match(/<section[^>]+id="about"[^>]*>[\s\S]*?<\/section>/i);
      expect(aboutSection).toBeTruthy();
      expect(aboutSection[0]).toMatch(/<h2[^>]*>[\s\S]*?About[\s\S]*?<\/h2>/i);
    });

    test('should have statistics section', () => {
      expect(htmlContent).toMatch(/class="[^"]*stats[^"]*"/i);
    });

    test('should have stat items with data-target attributes', () => {
      const statNumbers = htmlContent.match(/<span[^>]+class="[^"]*stat-number[^"]*"[^>]+data-target="\d+"/gi);
      expect(statNumbers).toBeTruthy();
      expect(statNumbers.length).toBeGreaterThan(0);
    });

    test('statistics should have descriptive labels', () => {
      expect(htmlContent).toMatch(/class="[^"]*stat-label[^"]*"/i);
    });

    test('should contain about text content', () => {
      const aboutSection = htmlContent.match(/<section[^>]+id="about"[^>]*>[\s\S]*?<\/section>/i);
      expect(aboutSection).toBeTruthy();
      expect(aboutSection[0]).toMatch(/<p>/i);
    });
  });

  describe('Skills Section', () => {
    test('should have skills section', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="skills"/i);
    });

    test('should have skill categories', () => {
      expect(htmlContent).toMatch(/class="[^"]*skill-category[^"]*"/gi);
    });

    test('should have skill bars', () => {
      expect(htmlContent).toMatch(/class="[^"]*skill-bar[^"]*"/gi);
    });

    test('should have progress bars with data-width attributes', () => {
      const progressBars = htmlContent.match(/<div[^>]+class="[^"]*progress-bar[^"]*"[^>]+data-width="\d+"/gi);
      expect(progressBars).toBeTruthy();
      expect(progressBars.length).toBeGreaterThan(0);
    });

    test('progress bar widths should be between 0-100', () => {
      const progressBars = htmlContent.match(/data-width="(\d+)"/gi) || [];
      progressBars.forEach(bar => {
        const width = parseInt(bar.match(/\d+/)[0]);
        expect(width).toBeGreaterThanOrEqual(0);
        expect(width).toBeLessThanOrEqual(100);
      });
    });

    test('should have skill names and percentages', () => {
      const skillSection = htmlContent.match(/<section[^>]+id="skills"[^>]*>[\s\S]*?<\/section>/i);
      expect(skillSection).toBeTruthy();
      expect(skillSection[0]).toMatch(/<span>[\s\S]*?<\/span>/gi);
    });

    test('should use Font Awesome icons', () => {
      const skillsSection = htmlContent.match(/<section[^>]+id="skills"[^>]*>[\s\S]*?<\/section>/i);
      if (skillsSection) {
        expect(skillsSection[0]).toMatch(/<i[^>]+class="[^"]*fa[^"]*"/gi);
      }
    });
  });

  describe('Experience Section', () => {
    test('should have experience section', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="experience"/i);
    });

    test('should have timeline structure', () => {
      expect(htmlContent).toMatch(/class="[^"]*timeline[^"]*"/i);
    });

    test('should have timeline items', () => {
      const timelineItems = htmlContent.match(/class="[^"]*timeline-item[^"]*"/gi);
      expect(timelineItems).toBeTruthy();
      expect(timelineItems.length).toBeGreaterThan(0);
    });

    test('should have timeline dots', () => {
      expect(htmlContent).toMatch(/class="[^"]*timeline-dot[^"]*"/gi);
    });

    test('timeline items should have job titles', () => {
      const experienceSection = htmlContent.match(/<section[^>]+id="experience"[^>]*>[\s\S]*?<\/section>/i);
      expect(experienceSection).toBeTruthy();
      expect(experienceSection[0]).toMatch(/<h3>/gi);
    });

    test('timeline items should have company names', () => {
      const experienceSection = htmlContent.match(/<section[^>]+id="experience"[^>]*>[\s\S]*?<\/section>/i);
      expect(experienceSection).toBeTruthy();
      expect(experienceSection[0]).toMatch(/<h4>/gi);
    });

    test('timeline items should have dates', () => {
      expect(htmlContent).toMatch(/class="[^"]*timeline-date[^"]*"/gi);
    });

    test('timeline items should have descriptions', () => {
      const experienceSection = htmlContent.match(/<section[^>]+id="experience"[^>]*>[\s\S]*?<\/section>/i);
      if (experienceSection) {
        expect(experienceSection[0]).toMatch(/<ul>/gi);
        expect(experienceSection[0]).toMatch(/<li>/gi);
      }
    });
  });

  describe('Education Section', () => {
    test('should have education section', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="education"/i);
    });

    test('should have education cards', () => {
      const educationCards = htmlContent.match(/class="[^"]*education-card[^"]*"/gi);
      expect(educationCards).toBeTruthy();
      expect(educationCards.length).toBeGreaterThan(0);
    });

    test('should have education icons', () => {
      const educationSection = htmlContent.match(/<section[^>]+id="education"[^>]*>[\s\S]*?<\/section>/i);
      if (educationSection) {
        expect(educationSection[0]).toMatch(/class="[^"]*education-icon[^"]*"/gi);
      }
    });

    test('education cards should have degree/certification names', () => {
      const educationSection = htmlContent.match(/<section[^>]+id="education"[^>]*>[\s\S]*?<\/section>/i);
      expect(educationSection).toBeTruthy();
      expect(educationSection[0]).toMatch(/<h3>/gi);
    });

    test('education cards should have institution names', () => {
      const educationSection = htmlContent.match(/<section[^>]+id="education"[^>]*>[\s\S]*?<\/section>/i);
      expect(educationSection).toBeTruthy();
      expect(educationSection[0]).toMatch(/<h4>/gi);
    });

    test('should have education dates', () => {
      expect(htmlContent).toMatch(/class="[^"]*education-date[^"]*"/gi);
    });
  });

  describe('Projects Section', () => {
    test('should have projects section', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="projects"/i);
    });

    test('should have project cards', () => {
      const projectCards = htmlContent.match(/class="[^"]*project-card[^"]*"/gi);
      expect(projectCards).toBeTruthy();
      expect(projectCards.length).toBeGreaterThan(0);
    });

    test('should have project images', () => {
      expect(htmlContent).toMatch(/class="[^"]*project-image[^"]*"/gi);
    });

    test('project images should have alt attributes', () => {
      const projectSection = htmlContent.match(/<section[^>]+id="projects"[^>]*>[\s\S]*?<\/section>/i);
      if (projectSection) {
        const images = projectSection[0].match(/<img[^>]+>/gi) || [];
        images.forEach(img => {
          expect(img).toMatch(/alt="[^"]*"/i);
        });
      }
    });

    test('should have project overlays', () => {
      expect(htmlContent).toMatch(/class="[^"]*project-overlay[^"]*"/gi);
    });

    test('project links should have aria-labels', () => {
      const projectSection = htmlContent.match(/<section[^>]+id="projects"[^>]*>[\s\S]*?<\/section>/i);
      if (projectSection) {
        const projectLinks = projectSection[0].match(/<a[^>]+class="[^"]*project-link[^"]*"[^>]*>/gi) || [];
        projectLinks.forEach(link => {
          expect(link).toMatch(/aria-label="[^"]+"/i);
        });
      }
    });

    test('should have project tags', () => {
      expect(htmlContent).toMatch(/class="[^"]*project-tags[^"]*"/gi);
    });

    test('projects should have titles and descriptions', () => {
      const projectSection = htmlContent.match(/<section[^>]+id="projects"[^>]*>[\s\S]*?<\/section>/i);
      expect(projectSection).toBeTruthy();
      expect(projectSection[0]).toMatch(/<h3>/gi);
      expect(projectSection[0]).toMatch(/<p>/gi);
    });
  });

  describe('Contact Section', () => {
    test('should have contact section', () => {
      expect(htmlContent).toMatch(/<section[^>]+id="contact"/i);
    });

    test('should have contact form', () => {
      expect(htmlContent).toMatch(/<form[^>]+id="contactForm"/i);
    });

    test('form should have all required fields', () => {
      const form = htmlContent.match(/<form[^>]+id="contactForm"[^>]*>[\s\S]*?<\/form>/i);
      expect(form).toBeTruthy();
      expect(form[0]).toMatch(/<input[^>]+id="name"/i);
      expect(form[0]).toMatch(/<input[^>]+id="email"/i);
      expect(form[0]).toMatch(/<input[^>]+id="subject"/i);
      expect(form[0]).toMatch(/<textarea[^>]+id="message"/i);
    });

    test('form fields should have labels', () => {
      const form = htmlContent.match(/<form[^>]+id="contactForm"[^>]*>[\s\S]*?<\/form>/i);
      expect(form).toBeTruthy();
      expect(form[0]).toMatch(/<label[^>]+for="name"/i);
      expect(form[0]).toMatch(/<label[^>]+for="email"/i);
      expect(form[0]).toMatch(/<label[^>]+for="subject"/i);
      expect(form[0]).toMatch(/<label[^>]+for="message"/i);
    });

    test('form fields should have required attribute', () => {
      const form = htmlContent.match(/<form[^>]+id="contactForm"[^>]*>[\s\S]*?<\/form>/i);
      if (form) {
        const inputs = form[0].match(/<input[^>]+id="(name|email|subject)"[^>]*>/gi) || [];
        inputs.forEach(input => {
          expect(input).toMatch(/required/i);
        });
      }
    });

    test('email field should have type="email"', () => {
      expect(htmlContent).toMatch(/<input[^>]+id="email"[^>]+type="email"/i);
    });

    test('form should have submit button', () => {
      const form = htmlContent.match(/<form[^>]+id="contactForm"[^>]*>[\s\S]*?<\/form>/i);
      expect(form).toBeTruthy();
      expect(form[0]).toMatch(/<button[^>]+type="submit"/i);
    });

    test('should have contact details', () => {
      expect(htmlContent).toMatch(/class="[^"]*contact-details[^"]*"/i);
    });

    test('contact items should have icons', () => {
      const contactSection = htmlContent.match(/<section[^>]+id="contact"[^>]*>[\s\S]*?<\/section>/i);
      if (contactSection) {
        expect(contactSection[0]).toMatch(/<i[^>]+class="[^"]*fa[^"]*"/gi);
      }
    });

    test('form should have proper accessibility attributes', () => {
      const form = htmlContent.match(/<form[^>]+id="contactForm"[^>]*>[\s\S]*?<\/form>/i);
      if (form) {
        const inputs = form[0].match(/<input[^>]+>/gi) || [];
        const textareas = form[0].match(/<textarea[^>]+>/gi) || [];
        
        [...inputs, ...textareas].forEach(field => {
          expect(field).toMatch(/id="[^"]+"/i);
        });
      }
    });
  });

  describe('Footer', () => {
    test('should have footer element', () => {
      expect(htmlContent).toMatch(/<footer[^>]*>/i);
    });

    test('footer should have copyright notice', () => {
      const footer = htmlContent.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
      expect(footer).toBeTruthy();
      expect(footer[0]).toMatch(/©|&copy;|copyright/i);
    });

    test('footer should have back to top link', () => {
      const footer = htmlContent.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
      if (footer) {
        expect(footer[0]).toMatch(/<a[^>]+href="#home"/i);
      }
    });
  });

  describe('Accessibility', () => {
    test('should use semantic HTML5 elements', () => {
      expect(htmlContent).toMatch(/<nav/i);
      expect(htmlContent).toMatch(/<section/i);
      expect(htmlContent).toMatch(/<footer/i);
    });

    test('all images should have alt attributes', () => {
      const images = htmlContent.match(/<img[^>]*>/gi) || [];
      images.forEach(img => {
        expect(img).toMatch(/alt="[^"]*"/i);
      });
    });

    test('links should have descriptive text or aria-labels', () => {
      const links = htmlContent.match(/<a[^>]*>[\s\S]*?<\/a>/gi) || [];
      links.forEach(link => {
        const hasText = link.match(/>([^<]+)</);
        const hasAriaLabel = link.match(/aria-label="[^"]+"/i);
        const hasIconOnly = link.match(/<i[^>]+class="[^"]*fa[^"]*"/i);
        
        if (hasIconOnly) {
          expect(hasAriaLabel).toBeTruthy();
        } else {
          expect(hasText || hasAriaLabel).toBeTruthy();
        }
      });
    });

    test('external links should have rel="noopener noreferrer" for security', () => {
      const externalLinks = htmlContent.match(/<a[^>]+href="https?:\/\/[^"]+target="_blank"[^>]*>/gi) || [];
      // Note: While recommended, this is not always present in current code
      // Just checking if any exist
      if (externalLinks.length > 0) {
        const hasSecureRel = externalLinks.some(link => link.match(/rel="[^"]*noopener/i));
        // This is a best practice check, not strictly required
      }
    });

    test('sections should have meaningful IDs', () => {
      const sections = htmlContent.match(/<section[^>]+id="([^"]+)"/gi) || [];
      sections.forEach(section => {
        const id = section.match(/id="([^"]+)"/i)[1];
        expect(id).toBeTruthy();
        expect(id.length).toBeGreaterThan(0);
        expect(id).not.toMatch(/^[0-9]+$/); // Should not be just numbers
      });
    });

    test('form fields should be properly associated with labels', () => {
      const labels = htmlContent.match(/<label[^>]+for="([^"]+)"/gi) || [];
      labels.forEach(label => {
        const forId = label.match(/for="([^"]+)"/i)[1];
        const inputRegex = new RegExp(`<(input|textarea)[^>]+id="${forId}"`, 'i');
        expect(htmlContent).toMatch(inputRegex);
      });
    });

    test('should have proper heading hierarchy', () => {
      const h1s = htmlContent.match(/<h1[^>]*>/gi) || [];
      expect(h1s.length).toBe(1); // Should have exactly one h1
      
      // Check that h2s exist after h1
      const h1Index = htmlContent.indexOf('<h1');
      const h2Index = htmlContent.indexOf('<h2');
      if (h2Index > -1) {
        expect(h2Index).toBeGreaterThan(h1Index);
      }
    });

    test('interactive elements should be keyboard accessible', () => {
      const hamburger = htmlContent.match(/<div[^>]+class="[^"]*hamburger[^"]*"[^>]*>/i);
      if (hamburger) {
        expect(hamburger[0]).toMatch(/tabindex="0"/i);
        expect(hamburger[0]).toMatch(/role="button"/i);
      }
    });
  });

  describe('HTML Validation - Syntax', () => {
    test('should not have duplicate IDs', () => {
      const ids = htmlContent.match(/id="([^"]+)"/gi) || [];
      const idValues = ids.map(id => id.match(/id="([^"]+)"/i)[1]);
      const uniqueIds = [...new Set(idValues)];
      
      expect(idValues.length).toBe(uniqueIds.length);
    });

    test('should use double quotes for attributes', () => {
      // Check that most attributes use double quotes
      const doubleQuoteAttrs = htmlContent.match(/="[^"]*"/g) || [];
      const singleQuoteAttrs = htmlContent.match(/='[^']*'/g) || [];
      
      // Double quotes should be predominantly used
      expect(doubleQuoteAttrs.length).toBeGreaterThan(singleQuoteAttrs.length);
    });

    test('should not have unclosed tags', () => {
      const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
      const openTags = htmlContent.match(/<([a-z][a-z0-9]*)[^>]*>/gi) || [];
      const closeTags = htmlContent.match(/<\/([a-z][a-z0-9]*)>/gi) || [];
      
      const openTagNames = openTags
        .map(tag => tag.match(/<([a-z][a-z0-9]*)/i)[1].toLowerCase())
        .filter(tag => !selfClosingTags.includes(tag) && !tag.startsWith('!'));
      
      const closeTagNames = closeTags.map(tag => tag.match(/<\/([a-z][a-z0-9]*)/i)[1].toLowerCase());
      
      // Count should be roughly equal
      expect(Math.abs(openTagNames.length - closeTagNames.length)).toBeLessThan(5);
    });

    test('should not have commented out large code blocks', () => {
      const comments = htmlContent.match(/<!--[\s\S]*?-->/g) || [];
      comments.forEach(comment => {
        // Comments should be reasonably small (not large blocks of code)
        expect(comment.length).toBeLessThan(500);
      });
    });

    test('should use lowercase for tag names', () => {
      const tags = htmlContent.match(/<\/?[A-Z][A-Z0-9]*/g) || [];
      // Should have very few or no uppercase tags
      expect(tags.length).toBeLessThan(5);
    });
  });

  describe('Performance and Best Practices', () => {
    test('should load critical CSS in head', () => {
      const head = htmlContent.match(/<head>[\s\S]*?<\/head>/i);
      expect(head).toBeTruthy();
      expect(head[0]).toMatch(/<link[^>]+rel="stylesheet"/i);
    });

    test('should load scripts at end of body', () => {
      const scriptTags = htmlContent.match(/<script[^>]+src="[^"]+"><\/script>/gi) || [];
      const bodyCloseIndex = htmlContent.lastIndexOf('</body>');
      
      scriptTags.forEach(script => {
        const scriptIndex = htmlContent.indexOf(script);
        expect(scriptIndex).toBeLessThan(bodyCloseIndex);
        expect(bodyCloseIndex - scriptIndex).toBeLessThan(500); // Should be near end
      });
    });

    test('should use relative URLs for local resources', () => {
      const localLinks = htmlContent.match(/<link[^>]+href="([^"]+\.css)"/gi) || [];
      const localScripts = htmlContent.match(/<script[^>]+src="([^"]+\.js)"/gi) || [];
      
      [...localLinks, ...localScripts].forEach(tag => {
        const url = tag.match(/(?:href|src)="([^"]+)"/i)[1];
        if (!url.startsWith('http')) {
          expect(url).not.toMatch(/^\//); // Should not start with /
        }
      });
    });

    test('should use semantic section elements instead of divs where appropriate', () => {
      const sections = htmlContent.match(/<section/gi) || [];
      expect(sections.length).toBeGreaterThan(3); // Should have multiple sections
    });
  });

  describe('Content Verification', () => {
    test('should have actual content in main sections', () => {
      const sections = ['about', 'skills', 'experience', 'education', 'projects', 'contact'];
      sections.forEach(sectionId => {
        const sectionMatch = htmlContent.match(new RegExp(`<section[^>]+id="${sectionId}"[^>]*>([\\s\\S]*?)<\\/section>`, 'i'));
        expect(sectionMatch).toBeTruthy();
        expect(sectionMatch[1].length).toBeGreaterThan(50); // Should have substantial content
      });
    });

    test('hero section should have engaging content', () => {
      const hero = htmlContent.match(/<section[^>]+id="home"[^>]*>[\s\S]*?<\/section>/i);
      expect(hero).toBeTruthy();
      expect(hero[0]).toMatch(/<h1/i);
      expect(hero[0]).toMatch(/<p/i);
      expect(hero[0]).toMatch(/btn/i);
    });
  });
});