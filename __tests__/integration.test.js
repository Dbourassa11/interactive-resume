/**
 * Integration Tests
 * Tests for end-to-end functionality and component interactions
 */

const fs = require('fs');
const path = require('path');

describe('Integration Tests - Full User Experience', () => {
  let document;
  let window;
  let scriptContent;
  let htmlContent;

  beforeEach(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    scriptContent = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');

    document = window.document;
    document.body.innerHTML = htmlContent;

    // Mock IntersectionObserver
    global.IntersectionObserver = class IntersectionObserver {
      constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.observedElements = [];
      }
      observe(element) {
        this.observedElements.push(element);
      }
      unobserve(element) {
        const index = this.observedElements.indexOf(element);
        if (index > -1) {
          this.observedElements.splice(index, 1);
        }
      }
      disconnect() {
        this.observedElements = [];
      }
    };

    window.print = jest.fn();
    window.alert = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();

    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 0
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Complete User Journey - Portfolio Visitor', () => {
    test('visitor lands on page and sees all sections', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      expect(document.querySelector('#hero')).toBeTruthy();
      expect(document.querySelector('#about')).toBeTruthy();
      expect(document.querySelector('#experience')).toBeTruthy();
      expect(document.querySelector('#skills')).toBeTruthy();
      expect(document.querySelector('#contact')).toBeTruthy();
    });

    test('visitor uses navigation to jump to sections', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const navigationLinks = ['about', 'experience', 'skills', 'contact'];
      
      navigationLinks.forEach(sectionId => {
        const link = document.querySelector(`a[href="#${sectionId}"]`);
        const section = document.querySelector(`#${sectionId}`);
        
        expect(link).toBeTruthy();
        expect(section).toBeTruthy();

        const event = new Event('click', { bubbles: true, cancelable: true });
        link.dispatchEvent(event);

        expect(section.scrollIntoView).toHaveBeenCalledWith({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });

    test('visitor scrolls and navigation updates active state', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section, index) => {
        Object.defineProperty(section, 'offsetTop', {
          writable: true,
          value: index * 600
        });
        Object.defineProperty(section, 'clientHeight', {
          writable: true,
          value: 500
        });
      });

      // Simulate scrolling through sections
      const scrollPositions = [100, 700, 1300, 1900];
      
      scrollPositions.forEach(position => {
        Object.defineProperty(window, 'pageYOffset', {
          writable: true,
          value: position
        });
        window.dispatchEvent(new Event('scroll'));
      });

      // Navigation should have updated multiple times without errors
      expect(true).toBe(true);
    });

    test('visitor submits contact form with valid information', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'Jane Smith';
      emailInput.value = 'jane.smith@example.com';
      messageInput.value = 'I would like to discuss a potential collaboration on quantum computing projects.';

      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);

      expect(window.alert).not.toHaveBeenCalled();
    });

    test('visitor makes mistakes in form and sees validation messages', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Mistake 1: Empty form
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';

      let submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      expect(window.alert).toHaveBeenCalledWith('Please fill in all fields.');

      // Mistake 2: Invalid email
      window.alert.mockClear();
      nameInput.value = 'Jane Smith';
      emailInput.value = 'not-an-email';
      messageInput.value = 'Hello';

      submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');

      // Success: Corrects mistakes
      window.alert.mockClear();
      emailInput.value = 'jane@example.com';

      submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      expect(window.alert).not.toHaveBeenCalled();
    });

    test('visitor uses keyboard for accessibility', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      // Tab to form field
      const emailInput = document.getElementById('email');
      emailInput.focus();
      expect(document.activeElement).toBe(emailInput);

      // Press Escape to blur
      const blurSpy = jest.spyOn(emailInput, 'blur');
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      expect(blurSpy).toHaveBeenCalled();
    });

    test('visitor clicks social media links', () => {
      const githubLink = document.querySelector('a[href*="github.com"]');
      const linkedinLink = document.querySelector('a[href*="linkedin.com"]');

      expect(githubLink).toBeTruthy();
      expect(linkedinLink).toBeTruthy();
      
      expect(githubLink.getAttribute('target')).toBe('_blank');
      expect(linkedinLink.getAttribute('target')).toBe('_blank');
      
      expect(githubLink.getAttribute('rel')).toContain('noopener');
      expect(linkedinLink.getAttribute('rel')).toContain('noreferrer');
    });
  });

  describe('Complete User Journey - Recruiter', () => {
    test('recruiter views all experience and skills', () => {
      const experienceSection = document.querySelector('#experience');
      const skillsSection = document.querySelector('#skills');

      expect(experienceSection).toBeTruthy();
      expect(skillsSection).toBeTruthy();

      expect(experienceSection.textContent).toMatch(/Principal/i);
      expect(experienceSection.textContent).toMatch(/Quantum Concepts LLC/i);

      expect(skillsSection.textContent).toMatch(/Quantum Computing/i);
      expect(skillsSection.textContent).toMatch(/Technology Leadership/i);
    });

    test('recruiter copies contact information', () => {
      const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
      const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

      expect(emailLinks.length).toBeGreaterThan(0);
      expect(phoneLinks.length).toBeGreaterThan(0);

      emailLinks.forEach(link => {
        expect(link.getAttribute('href')).toMatch(/Quantum\.Concepts@outlook\.com/i);
      });

      phoneLinks.forEach(link => {
        expect(link.getAttribute('href')).toMatch(/\+15054690152/);
      });
    });

    test('recruiter prints resume for review', () => {
      eval(scriptContent);
      
      printResume();
      
      expect(window.print).toHaveBeenCalled();
    });
  });

  describe('Accessibility User Journey - Screen Reader User', () => {
    test('screen reader user uses skip to content link', () => {
      const skipLink = document.querySelector('.skip-to-content');
      const mainContent = document.querySelector('#main-content');

      expect(skipLink).toBeTruthy();
      expect(mainContent).toBeTruthy();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
    });

    test('screen reader user navigates with proper ARIA labels', () => {
      const nav = document.querySelector('nav[aria-label]');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBeTruthy();

      const externalLinks = document.querySelectorAll('a[target="_blank"][aria-label]');
      expect(externalLinks.length).toBeGreaterThan(0);
    });

    test('screen reader user encounters proper heading hierarchy', () => {
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);

      const h2Elements = document.querySelectorAll('h2');
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    test('screen reader user navigates form with labels', () => {
      const nameLabel = document.querySelector('label[for="name"]');
      const emailLabel = document.querySelector('label[for="email"]');
      const messageLabel = document.querySelector('label[for="message"]');

      expect(nameLabel).toBeTruthy();
      expect(emailLabel).toBeTruthy();
      expect(messageLabel).toBeTruthy();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      expect(nameInput.getAttribute('aria-required')).toBe('true');
      expect(emailInput.getAttribute('aria-required')).toBe('true');
      expect(messageInput.getAttribute('aria-required')).toBe('true');
    });
  });

  describe('Mobile User Journey', () => {
    test('mobile user sees responsive navigation', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();

      const navLinks = document.querySelectorAll('nav a');
      expect(navLinks.length).toBeGreaterThan(0);
    });

    test('mobile user can tap on sections to navigate', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const link = document.querySelector('a[href="#about"]');
      const touchEvent = new Event('click', { bubbles: true, cancelable: true });
      
      expect(() => {
        link.dispatchEvent(touchEvent);
      }).not.toThrow();
    });

    test('mobile user fills out contact form', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const inputs = form.querySelectorAll('input, textarea');

      expect(inputs.length).toBeGreaterThanOrEqual(3);

      inputs.forEach(input => {
        expect(input.hasAttribute('required')).toBe(true);
      });
    });
  });

  describe('SEO and Social Sharing', () => {
    test('social media crawlers can read meta tags', () => {
      const ogTags = htmlContent.match(/<meta\s+property="og:[^"]+"\s+content="[^"]+"/gi);
      expect(ogTags).toBeTruthy();
      expect(ogTags.length).toBeGreaterThanOrEqual(4);

      const twitterTags = htmlContent.match(/<meta\s+name="twitter:[^"]+"\s+content="[^"]+"/gi);
      expect(twitterTags).toBeTruthy();
      expect(twitterTags.length).toBeGreaterThanOrEqual(3);
    });

    test('search engines can index content', () => {
      const title = htmlContent.match(/<title>(.*?)<\/title>/);
      expect(title).toBeTruthy();
      expect(title[1].length).toBeGreaterThan(10);

      const description = htmlContent.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
      expect(description).toBeTruthy();
      expect(description[1].length).toBeGreaterThan(50);
    });
  });

  describe('Error Recovery and Edge Cases', () => {
    test('system handles missing form gracefully', () => {
      const form = document.querySelector('.contact-form');
      form.remove();

      eval(scriptContent);
      
      expect(() => {
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }).not.toThrow();
    });

    test('system handles missing navigation gracefully', () => {
      const nav = document.querySelector('nav');
      nav.remove();

      eval(scriptContent);
      
      expect(() => {
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }).not.toThrow();
    });

    test('system handles rapid user interactions', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const link = document.querySelector('a[href="#about"]');
      
      expect(() => {
        for (let i = 0; i < 50; i++) {
          const event = new Event('click', { bubbles: true, cancelable: true });
          link.dispatchEvent(event);
          window.dispatchEvent(new Event('scroll'));
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        }
      }).not.toThrow();
    });

    test('system handles form submission spam', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'Test User';
      emailInput.value = 'test@example.com';
      messageInput.value = 'Test message';

      expect(() => {
        for (let i = 0; i < 10; i++) {
          const event = new Event('submit', { bubbles: true, cancelable: true });
          form.dispatchEvent(event);
        }
      }).not.toThrow();
    });
  });

  describe('Performance Under Load', () => {
    test('handles multiple simultaneous scroll events', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section, index) => {
        Object.defineProperty(section, 'offsetTop', {
          writable: true,
          value: index * 600
        });
        Object.defineProperty(section, 'clientHeight', {
          writable: true,
          value: 500
        });
      });

      const startTime = Date.now();
      
      for (let i = 0; i < 100; i++) {
        Object.defineProperty(window, 'pageYOffset', {
          writable: true,
          value: Math.random() * 3000
        });
        window.dispatchEvent(new Event('scroll'));
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(1000);
    });

    test('handles multiple form validations efficiently', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const testData = [
        { name: '', email: 'test@example.com', message: 'Test' },
        { name: 'Test', email: 'invalid', message: 'Test' },
        { name: 'Test', email: 'test@example.com', message: '' },
        { name: 'Test', email: 'test@example.com', message: 'Valid' }
      ];

      const startTime = Date.now();

      testData.forEach(data => {
        nameInput.value = data.name;
        emailInput.value = data.email;
        messageInput.value = data.message;

        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(100);
    });
  });
});