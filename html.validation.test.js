/**
 * HTML Structure and Accessibility Validation Tests
 * Ensures proper semantic HTML, accessibility features, and SEO optimization
 */

const fs = require('fs');
const path = require('path');

describe('HTML Structure Validation - index.html', () => {
  let htmlContent;
  let dom;

  beforeEach(() => {
    htmlContent = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
    document.documentElement.innerHTML = htmlContent;
    dom = document;
  });

  afterEach(() => {
    document.documentElement.innerHTML = '';
  });

  describe('Document Structure', () => {
    test('should have DOCTYPE declaration', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });

    test('should have html lang attribute set to "en"', () => {
      const html = dom.documentElement;
      expect(html.getAttribute('lang')).toBe('en');
    });

    test('should have proper head section with charset', () => {
      const metaCharset = dom.querySelector('meta[charset]');
      expect(metaCharset).toBeTruthy();
      expect(metaCharset.getAttribute('charset')).toBe('UTF-8');
    });

    test('should have viewport meta tag for responsive design', () => {
      const viewport = dom.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
      expect(viewport.getAttribute('content')).toContain('initial-scale=1.0');
    });

    test('should have title tag', () => {
      const title = dom.querySelector('title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Charles David Bourassa - Principal, Quantum Concepts LLC');
    });

    test('should link to external stylesheet', () => {
      const stylesheet = dom.querySelector('link[rel="stylesheet"]');
      expect(stylesheet).toBeTruthy();
      expect(stylesheet.getAttribute('href')).toBe('styles.css');
    });

    test('should include script tag at end of body', () => {
      const script = dom.querySelector('script[src="script.js"]');
      expect(script).toBeTruthy();
      
      // Script should be near the end of body
      const bodyChildren = Array.from(dom.body.children);
      const scriptIndex = bodyChildren.indexOf(script);
      expect(scriptIndex).toBe(bodyChildren.length - 1);
    });
  });

  describe('SEO Meta Tags', () => {
    test('should have description meta tag', () => {
      const description = dom.querySelector('meta[name="description"]');
      expect(description).toBeTruthy();
      expect(description.getAttribute('content')).toContain('Charles David Bourassa');
      expect(description.getAttribute('content')).toContain('Quantum Concepts LLC');
    });

    test('should have keywords meta tag', () => {
      const keywords = dom.querySelector('meta[name="keywords"]');
      expect(keywords).toBeTruthy();
      expect(keywords.getAttribute('content')).toContain('Charles Bourassa');
    });

    test('should have author meta tag', () => {
      const author = dom.querySelector('meta[name="author"]');
      expect(author).toBeTruthy();
      expect(author.getAttribute('content')).toBe('Charles David Bourassa');
    });
  });

  describe('Open Graph Meta Tags', () => {
    test('should have Open Graph title', () => {
      const ogTitle = dom.querySelector('meta[property="og:title"]');
      expect(ogTitle).toBeTruthy();
      expect(ogTitle.getAttribute('content')).toContain('Charles David Bourassa');
    });

    test('should have Open Graph description', () => {
      const ogDescription = dom.querySelector('meta[property="og:description"]');
      expect(ogDescription).toBeTruthy();
      expect(ogDescription.getAttribute('content')).toBeTruthy();
    });

    test('should have Open Graph type', () => {
      const ogType = dom.querySelector('meta[property="og:type"]');
      expect(ogType).toBeTruthy();
      expect(ogType.getAttribute('content')).toBe('website');
    });

    test('should have Open Graph URL', () => {
      const ogUrl = dom.querySelector('meta[property="og:url"]');
      expect(ogUrl).toBeTruthy();
      expect(ogUrl.getAttribute('content')).toContain('github.io');
    });
  });

  describe('Twitter Card Meta Tags', () => {
    test('should have Twitter card type', () => {
      const twitterCard = dom.querySelector('meta[name="twitter:card"]');
      expect(twitterCard).toBeTruthy();
      expect(twitterCard.getAttribute('content')).toBe('summary');
    });

    test('should have Twitter title', () => {
      const twitterTitle = dom.querySelector('meta[name="twitter:title"]');
      expect(twitterTitle).toBeTruthy();
      expect(twitterTitle.getAttribute('content')).toContain('Charles David Bourassa');
    });

    test('should have Twitter description', () => {
      const twitterDescription = dom.querySelector('meta[name="twitter:description"]');
      expect(twitterDescription).toBeTruthy();
      expect(twitterDescription.getAttribute('content')).toBeTruthy();
    });
  });

  describe('Favicon Links', () => {
    test('should have .ico favicon', () => {
      const favicon = dom.querySelector('link[rel="icon"][type="image/x-icon"]');
      expect(favicon).toBeTruthy();
      expect(favicon.getAttribute('href')).toBe('favicon.ico');
    });

    test('should have 32x32 PNG favicon', () => {
      const favicon32 = dom.querySelector('link[rel="icon"][sizes="32x32"]');
      expect(favicon32).toBeTruthy();
      expect(favicon32.getAttribute('href')).toBe('favicon-32x32.png');
    });

    test('should have 16x16 PNG favicon', () => {
      const favicon16 = dom.querySelector('link[rel="icon"][sizes="16x16"]');
      expect(favicon16).toBeTruthy();
      expect(favicon16.getAttribute('href')).toBe('favicon-16x16.png');
    });
  });

  describe('Accessibility Features', () => {
    test('should have skip-to-content link', () => {
      const skipLink = dom.querySelector('.skip-to-content');
      expect(skipLink).toBeTruthy();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
      expect(skipLink.textContent).toBe('Skip to content');
    });

    test('should have main element with id for skip link target', () => {
      const main = dom.querySelector('main#main-content');
      expect(main).toBeTruthy();
    });

    test('should have navigation with aria-label', () => {
      const nav = dom.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Main navigation');
    });

    test('should have aria-labels on social links', () => {
      const socialLinks = dom.querySelectorAll('.social-links a');
      expect(socialLinks.length).toBeGreaterThan(0);
      
      socialLinks.forEach(link => {
        expect(link.getAttribute('aria-label')).toBeTruthy();
      });
    });

    test('should have aria-hidden on decorative SVG icons', () => {
      const svgIcons = dom.querySelectorAll('.social-links svg');
      expect(svgIcons.length).toBeGreaterThan(0);
      
      svgIcons.forEach(svg => {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      });
    });

    test('should have aria-labels on contact links', () => {
      const emailLink = dom.querySelector('a[href^="mailto:"]');
      const phoneLink = dom.querySelector('a[href^="tel:"]');
      
      expect(emailLink.getAttribute('aria-label')).toContain('Email');
      expect(phoneLink.getAttribute('aria-label')).toContain('Call');
    });

    test('should have required and aria-required on form inputs', () => {
      const requiredInputs = dom.querySelectorAll('.contact-form [required]');
      expect(requiredInputs.length).toBe(3); // name, email, message
      
      requiredInputs.forEach(input => {
        expect(input.hasAttribute('required')).toBe(true);
        expect(input.getAttribute('aria-required')).toBe('true');
      });
    });

    test('should have proper label associations for form inputs', () => {
      const nameLabel = dom.querySelector('label[for="name"]');
      const emailLabel = dom.querySelector('label[for="email"]');
      const messageLabel = dom.querySelector('label[for="message"]');
      
      expect(nameLabel).toBeTruthy();
      expect(emailLabel).toBeTruthy();
      expect(messageLabel).toBeTruthy();
      
      expect(dom.getElementById('name')).toBeTruthy();
      expect(dom.getElementById('email')).toBeTruthy();
      expect(dom.getElementById('message')).toBeTruthy();
    });
  });

  describe('Semantic HTML Structure', () => {
    test('should use semantic HTML5 elements', () => {
      expect(dom.querySelector('nav')).toBeTruthy();
      expect(dom.querySelector('main')).toBeTruthy();
      expect(dom.querySelector('footer')).toBeTruthy();
      expect(dom.querySelectorAll('section').length).toBeGreaterThan(0);
    });

    test('should have proper heading hierarchy', () => {
      const h1 = dom.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1.textContent).toBe('Charles David Bourassa');
      
      const h2s = dom.querySelectorAll('h2');
      expect(h2s.length).toBeGreaterThan(0);
      
      const h3s = dom.querySelectorAll('h3');
      expect(h3s.length).toBeGreaterThan(0);
    });

    test('should have only one h1 element', () => {
      const h1Elements = dom.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });

    test('should have proper section IDs for navigation', () => {
      const aboutSection = dom.querySelector('#about');
      const experienceSection = dom.querySelector('#experience');
      const skillsSection = dom.querySelector('#skills');
      const contactSection = dom.querySelector('#contact');
      
      expect(aboutSection).toBeTruthy();
      expect(experienceSection).toBeTruthy();
      expect(skillsSection).toBeTruthy();
      expect(contactSection).toBeTruthy();
    });
  });

  describe('Navigation Structure', () => {
    test('should have navigation list', () => {
      const navList = dom.querySelector('nav ul');
      expect(navList).toBeTruthy();
    });

    test('should have all required navigation links', () => {
      const aboutLink = dom.querySelector('nav a[href="#about"]');
      const experienceLink = dom.querySelector('nav a[href="#experience"]');
      const skillsLink = dom.querySelector('nav a[href="#skills"]');
      const contactLink = dom.querySelector('nav a[href="#contact"]');
      
      expect(aboutLink).toBeTruthy();
      expect(experienceLink).toBeTruthy();
      expect(skillsLink).toBeTruthy();
      expect(contactLink).toBeTruthy();
    });

    test('should have navigation links with proper text content', () => {
      const navLinks = dom.querySelectorAll('nav a');
      const linkTexts = Array.from(navLinks).map(link => link.textContent);
      
      expect(linkTexts).toContain('About');
      expect(linkTexts).toContain('Experience');
      expect(linkTexts).toContain('Skills');
      expect(linkTexts).toContain('Contact');
    });
  });

  describe('Hero Section', () => {
    test('should have hero section', () => {
      const hero = dom.querySelector('.hero');
      expect(hero).toBeTruthy();
    });

    test('should display professional title', () => {
      const title = dom.querySelector('.professional-title');
      expect(title).toBeTruthy();
      expect(title.textContent).toContain('Principal');
      expect(title.textContent).toContain('Quantum Concepts LLC');
    });

    test('should have contact information in hero', () => {
      const contactInfo = dom.querySelector('.hero .contact-info');
      expect(contactInfo).toBeTruthy();
      
      const email = contactInfo.querySelector('a[href^="mailto:"]');
      const phone = contactInfo.querySelector('a[href^="tel:"]');
      
      expect(email).toBeTruthy();
      expect(phone).toBeTruthy();
    });

    test('should have social links with proper attributes', () => {
      const githubLink = dom.querySelector('.social-links a[href*="github"]');
      const linkedinLink = dom.querySelector('.social-links a[href*="linkedin"]');
      
      expect(githubLink).toBeTruthy();
      expect(linkedinLink).toBeTruthy();
      
      expect(githubLink.getAttribute('target')).toBe('_blank');
      expect(githubLink.getAttribute('rel')).toBe('noopener noreferrer');
      
      expect(linkedinLink.getAttribute('target')).toBe('_blank');
      expect(linkedinLink.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('Content Sections', () => {
    test('should have About section with content', () => {
      const about = dom.querySelector('#about');
      expect(about).toBeTruthy();
      
      const heading = about.querySelector('h2');
      expect(heading.textContent).toBe('About Me');
      
      const paragraph = about.querySelector('p');
      expect(paragraph).toBeTruthy();
      expect(paragraph.textContent.length).toBeGreaterThan(50);
    });

    test('should have Experience section with job details', () => {
      const experience = dom.querySelector('#experience');
      expect(experience).toBeTruthy();
      
      const heading = experience.querySelector('h2');
      expect(heading.textContent).toBe('Experience');
      
      const experienceItem = experience.querySelector('.experience-item');
      expect(experienceItem).toBeTruthy();
      
      const jobTitle = experienceItem.querySelector('h3');
      const company = experienceItem.querySelector('.company');
      const location = experienceItem.querySelector('.location');
      
      expect(jobTitle).toBeTruthy();
      expect(company).toBeTruthy();
      expect(location).toBeTruthy();
    });

    test('should have Skills section with list', () => {
      const skills = dom.querySelector('#skills');
      expect(skills).toBeTruthy();
      
      const heading = skills.querySelector('h2');
      expect(heading.textContent).toBe('Skills');
      
      const skillsList = skills.querySelector('.skills-list');
      expect(skillsList).toBeTruthy();
      
      const skillItems = skillsList.querySelectorAll('li');
      expect(skillItems.length).toBeGreaterThan(0);
    });

    test('should have specific skills listed', () => {
      const skillsList = dom.querySelector('.skills-list');
      const skills = Array.from(skillsList.querySelectorAll('li')).map(li => li.textContent);
      
      expect(skills).toContain('Quantum Computing');
      expect(skills).toContain('Technology Leadership');
      expect(skills).toContain('Strategic Planning');
    });
  });

  describe('Contact Section', () => {
    test('should have Contact section', () => {
      const contact = dom.querySelector('#contact');
      expect(contact).toBeTruthy();
      
      const heading = contact.querySelector('h2');
      expect(heading.textContent).toBe('Contact Me');
    });

    test('should have contact details displayed', () => {
      const contactDetails = dom.querySelector('.contact-details');
      expect(contactDetails).toBeTruthy();
      
      const paragraphs = contactDetails.querySelectorAll('p');
      expect(paragraphs.length).toBe(3); // Email, Phone, Location
    });

    test('should have contact form with Formspree action', () => {
      const form = dom.querySelector('.contact-form');
      expect(form).toBeTruthy();
      
      const action = form.getAttribute('action');
      expect(action).toContain('formspree.io');
      expect(form.getAttribute('method')).toBe('POST');
    });

    test('should have all required form fields', () => {
      const nameInput = dom.getElementById('name');
      const emailInput = dom.getElementById('email');
      const messageInput = dom.getElementById('message');
      
      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(messageInput).toBeTruthy();
      
      expect(nameInput.getAttribute('type')).toBe('text');
      expect(emailInput.getAttribute('type')).toBe('email');
      expect(messageInput.tagName.toLowerCase()).toBe('textarea');
    });

    test('should have form submit button', () => {
      const submitButton = dom.querySelector('.contact-form button[type="submit"]');
      expect(submitButton).toBeTruthy();
      expect(submitButton.textContent).toBe('Send Message');
    });

    test('should have proper form group structure', () => {
      const formGroups = dom.querySelectorAll('.form-group');
      expect(formGroups.length).toBe(3);
      
      formGroups.forEach(group => {
        const label = group.querySelector('label');
        const input = group.querySelector('input, textarea');
        
        expect(label).toBeTruthy();
        expect(input).toBeTruthy();
      });
    });
  });

  describe('Footer', () => {
    test('should have footer element', () => {
      const footer = dom.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    test('should have copyright notice', () => {
      const footer = dom.querySelector('footer');
      const copyright = footer.textContent;
      
      expect(copyright).toContain('2026');
      expect(copyright).toContain('Charles David Bourassa');
      expect(copyright).toContain('All rights reserved');
    });
  });

  describe('Link Validation', () => {
    test('should have valid email link', () => {
      const emailLinks = dom.querySelectorAll('a[href^="mailto:"]');
      expect(emailLinks.length).toBeGreaterThan(0);
      
      emailLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toMatch(/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });

    test('should have valid phone link', () => {
      const phoneLinks = dom.querySelectorAll('a[href^="tel:"]');
      expect(phoneLinks.length).toBeGreaterThan(0);
      
      phoneLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toMatch(/^tel:\+?[0-9]+$/);
      });
    });

    test('should have external links with security attributes', () => {
      const externalLinks = dom.querySelectorAll('a[target="_blank"]');
      
      externalLinks.forEach(link => {
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });
  });

  describe('Content Validation', () => {
    test('should have non-empty text content in all sections', () => {
      const sections = dom.querySelectorAll('section');
      
      sections.forEach(section => {
        const textContent = section.textContent.trim();
        expect(textContent.length).toBeGreaterThan(0);
      });
    });

    test('should have contact information displayed', () => {
      const email = 'Quantum.Concepts@outlook.com';
      const phone = '+1\u00A0(505)\u00A0469‑0152';
      const location = 'Albuquerque, NM';
      
      expect(htmlContent).toContain(email);
      expect(htmlContent).toContain('505');
      expect(htmlContent).toContain(location);
    });
  });
});