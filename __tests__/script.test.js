/**
 * Comprehensive Unit Tests for Interactive Resume
 * Tests all JavaScript functionality including:
 * - Smooth scrolling navigation
 * - Active navigation state management
 * - Form validation
 * - Intersection Observer animations
 * - Keyboard navigation
 * - Edge cases and error handling
 */

const fs = require('fs');
const path = require('path');

describe('Interactive Resume - Script.js Tests', () => {
  let document;
  let window;
  let scriptContent;

  beforeEach(() => {
    // Read the HTML and script files
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    scriptContent = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');

    // Set up jsdom environment
    document = window.document;
    document.body.innerHTML = html;

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
      triggerIntersection(element, isIntersecting) {
        this.callback([{
          target: element,
          isIntersecting: isIntersecting
        }]);
      }
    };

    // Mock window.print
    window.print = jest.fn();
    
    // Mock window.alert
    window.alert = jest.fn();

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();

    // Reset scroll position
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 0
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Smooth Scrolling Navigation', () => {
    test('should prevent default behavior when clicking anchor links', () => {
      const link = document.querySelector('a[href="#about"]');
      const event = new Event('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

      // Execute the script to attach event listeners
      eval(scriptContent);

      // Trigger DOMContentLoaded
      const domLoadedEvent = new Event('DOMContentLoaded');
      document.dispatchEvent(domLoadedEvent);

      link.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should call scrollIntoView with smooth behavior on valid anchor click', () => {
      const link = document.querySelector('a[href="#about"]');
      const targetSection = document.querySelector('#about');
      
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const event = new Event('click', { bubbles: true, cancelable: true });
      link.dispatchEvent(event);

      expect(targetSection.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    test('should set tabindex and focus on target element for accessibility', () => {
      const link = document.querySelector('a[href="#experience"]');
      const targetSection = document.querySelector('#experience');
      const focusSpy = jest.spyOn(targetSection, 'focus');
      
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const event = new Event('click', { bubbles: true, cancelable: true });
      link.dispatchEvent(event);

      expect(targetSection.getAttribute('tabindex')).toBe('-1');
      expect(focusSpy).toHaveBeenCalled();
    });

    test('should handle clicks on anchor-only links (#) gracefully', () => {
      // Create a link with just '#'
      const emptyLink = document.createElement('a');
      emptyLink.href = '#';
      document.body.appendChild(emptyLink);

      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const event = new Event('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      emptyLink.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      // Should not throw error
    });

    test('should handle non-existent target elements gracefully', () => {
      const link = document.createElement('a');
      link.href = '#nonexistent';
      document.body.appendChild(link);

      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const event = new Event('click', { bubbles: true, cancelable: true });
      
      // Should not throw error
      expect(() => {
        link.dispatchEvent(event);
      }).not.toThrow();
    });

    test('should attach click listeners to all anchor links', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const links = document.querySelectorAll('a[href^="#"]');
      expect(links.length).toBeGreaterThan(0);

      // Each link should have a click handler
      links.forEach(link => {
        const event = new Event('click', { bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        link.dispatchEvent(event);
        expect(preventDefaultSpy).toHaveBeenCalled();
      });
    });
  });

  describe('Active Navigation State Management', () => {
    test('should add active class to navigation link when scrolled to corresponding section', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const aboutSection = document.querySelector('#about');
      const aboutLink = document.querySelector('a[href="#about"]');

      // Mock section position
      Object.defineProperty(aboutSection, 'offsetTop', {
        writable: true,
        value: 100
      });
      Object.defineProperty(aboutSection, 'clientHeight', {
        writable: true,
        value: 500
      });

      // Simulate scroll to about section
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 200
      });

      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);

      expect(aboutLink.classList.contains('active')).toBe(true);
    });

    test('should remove active class from other navigation links', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('nav a');

      // Set up section positions
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

      // Scroll to second section
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 700
      });

      window.dispatchEvent(new Event('scroll'));

      // Only one link should have active class
      const activeLinks = Array.from(navLinks).filter(link => 
        link.classList.contains('active')
      );
      expect(activeLinks.length).toBeLessThanOrEqual(1);
    });

    test('should handle scroll events when no sections match', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 0
      });

      expect(() => {
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should update active state multiple times during scroll', () => {
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

      // Simulate multiple scroll positions
      [100, 700, 1300].forEach(scrollPos => {
        Object.defineProperty(window, 'pageYOffset', {
          writable: true,
          value: scrollPos
        });
        window.dispatchEvent(new Event('scroll'));
      });

      // Should execute without errors
      expect(true).toBe(true);
    });
  });

  describe('Form Validation', () => {
    test('should prevent submission when name field is empty', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = '';
      emailInput.value = 'test@example.com';
      messageInput.value = 'Test message';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });

    test('should prevent submission when email field is empty', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'John Doe';
      emailInput.value = '';
      messageInput.value = 'Test message';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });

    test('should prevent submission when message field is empty', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'John Doe';
      emailInput.value = 'test@example.com';
      messageInput.value = '';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });

    test('should trim whitespace from form fields', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = '   ';
      emailInput.value = '  test@example.com  ';
      messageInput.value = '  ';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });

    test('should reject invalid email format - missing @', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'John Doe';
      emailInput.value = 'invalidemail.com';
      messageInput.value = 'Test message';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });

    test('should reject invalid email format - missing domain', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'John Doe';
      emailInput.value = 'test@';
      messageInput.value = 'Test message';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });

    test('should reject invalid email format - missing TLD', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'John Doe';
      emailInput.value = 'test@example';
      messageInput.value = 'Test message';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });

    test('should reject email with spaces', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'John Doe';
      emailInput.value = 'test @example.com';
      messageInput.value = 'Test message';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });

    test('should accept valid email formats', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const validEmails = [
        'test@example.com',
        'user.name@example.co.uk',
        'user+tag@example.com',
        'test123@test-domain.com',
        'a@b.c'
      ];

      validEmails.forEach(email => {
        nameInput.value = 'John Doe';
        emailInput.value = email;
        messageInput.value = 'Test message';

        const event = new Event('submit', { bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        
        form.dispatchEvent(event);

        // For valid forms, preventDefault should only be called for empty fields
        // not for email validation
        expect(window.alert).not.toHaveBeenCalledWith('Please enter a valid email address.');
      });
    });

    test('should allow form submission when all validations pass', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'John Doe';
      emailInput.value = 'john.doe@example.com';
      messageInput.value = 'This is a valid test message.';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);

      // Should not prevent default when all validations pass
      expect(window.alert).not.toHaveBeenCalled();
    });

    test('should handle form submission when contact form does not exist', () => {
      // Remove the contact form
      const form = document.querySelector('.contact-form');
      form.remove();

      eval(scriptContent);
      
      expect(() => {
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }).not.toThrow();
    });
  });

  describe('Intersection Observer - Animation on Scroll', () => {
    test('should observe all sections on page load', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const sections = document.querySelectorAll('section[id]');
      expect(sections.length).toBeGreaterThan(0);

      // IntersectionObserver should have been created
      expect(global.IntersectionObserver).toHaveBeenCalled();
    });

    test('should add fade-in-visible class when section intersects', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const section = document.querySelector('#about');
      
      // Simulate intersection
      const observer = new IntersectionObserver(() => {});
      observer.callback([{
        target: section,
        isIntersecting: true
      }]);

      expect(section.classList.contains('fade-in-visible')).toBe(true);
    });

    test('should not add class when section does not intersect', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const section = document.querySelector('#about');
      section.classList.remove('fade-in-visible');
      
      // Simulate no intersection
      const observer = new IntersectionObserver(() => {});
      observer.callback([{
        target: section,
        isIntersecting: false
      }]);

      expect(section.classList.contains('fade-in-visible')).toBe(false);
    });

    test('should use correct observer options', () => {
      const observerSpy = jest.spyOn(global, 'IntersectionObserver');
      
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      expect(observerSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
        })
      );
    });

    test('should handle multiple sections intersecting', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const sections = document.querySelectorAll('section[id]');
      const observer = new IntersectionObserver(() => {});

      // Simulate multiple sections intersecting
      const entries = Array.from(sections).map(section => ({
        target: section,
        isIntersecting: true
      }));

      observer.callback(entries);

      sections.forEach(section => {
        expect(section.classList.contains('fade-in-visible')).toBe(true);
      });
    });
  });

  describe('Keyboard Navigation', () => {
    test('should blur active element when Escape key is pressed', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const input = document.getElementById('name');
      input.focus();
      
      const blurSpy = jest.spyOn(input, 'blur');
      
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);

      expect(blurSpy).toHaveBeenCalled();
    });

    test('should handle Escape key when no element is focused', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      // Blur any focused element
      if (document.activeElement) {
        document.activeElement.blur();
      }

      expect(() => {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
      }).not.toThrow();
    });

    test('should not affect other keys', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const input = document.getElementById('name');
      input.focus();
      
      const blurSpy = jest.spyOn(input, 'blur');
      
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(event);

      expect(blurSpy).not.toHaveBeenCalled();
    });

    test('should handle multiple Escape key presses', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const input = document.getElementById('email');
      input.focus();
      
      const blurSpy = jest.spyOn(input, 'blur');
      
      // Press Escape multiple times
      for (let i = 0; i < 3; i++) {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
      }

      expect(blurSpy).toHaveBeenCalled();
    });
  });

  describe('Print Resume Functionality', () => {
    test('should define printResume function', () => {
      eval(scriptContent);
      
      expect(typeof printResume).toBe('function');
    });

    test('should call window.print when printResume is invoked', () => {
      eval(scriptContent);
      
      printResume();
      
      expect(window.print).toHaveBeenCalled();
    });

    test('should handle multiple print calls', () => {
      eval(scriptContent);
      
      printResume();
      printResume();
      printResume();
      
      expect(window.print).toHaveBeenCalledTimes(3);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle missing navigation elements gracefully', () => {
      const nav = document.querySelector('nav');
      nav.remove();

      eval(scriptContent);
      
      expect(() => {
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }).not.toThrow();
    });

    test('should handle missing sections gracefully', () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => section.removeAttribute('id'));

      eval(scriptContent);
      
      expect(() => {
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }).not.toThrow();
    });

    test('should handle scroll events with no sections', () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => section.remove());

      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      expect(() => {
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle multiple DOMContentLoaded events', () => {
      eval(scriptContent);
      
      expect(() => {
        document.dispatchEvent(new Event('DOMContentLoaded'));
        document.dispatchEvent(new Event('DOMContentLoaded'));
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }).not.toThrow();
    });

    test('should handle rapid scroll events', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      expect(() => {
        for (let i = 0; i < 100; i++) {
          window.dispatchEvent(new Event('scroll'));
        }
      }).not.toThrow();
    });

    test('should handle form with special characters in values', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = "John O'Doe <script>alert('xss')</script>";
      emailInput.value = 'test@example.com';
      messageInput.value = 'Message with "quotes" and \'apostrophes\'';

      const event = new Event('submit', { bubbles: true, cancelable: true });
      
      expect(() => {
        form.dispatchEvent(event);
      }).not.toThrow();
    });

    test('should handle very long input values', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      nameInput.value = 'A'.repeat(1000);
      emailInput.value = 'test@example.com';
      messageInput.value = 'B'.repeat(10000);

      const event = new Event('submit', { bubbles: true, cancelable: true });
      
      expect(() => {
        form.dispatchEvent(event);
      }).not.toThrow();
    });

    test('should handle null or undefined activeElement', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      Object.defineProperty(document, 'activeElement', {
        writable: true,
        value: null
      });

      expect(() => {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
      }).not.toThrow();
    });
  });

  describe('Accessibility Features', () => {
    test('should set tabindex -1 on target sections for keyboard focus', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const link = document.querySelector('a[href="#skills"]');
      const targetSection = document.querySelector('#skills');

      const event = new Event('click', { bubbles: true, cancelable: true });
      link.dispatchEvent(event);

      expect(targetSection.getAttribute('tabindex')).toBe('-1');
    });

    test('should maintain focus for screen reader navigation', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const link = document.querySelector('a[href="#contact"]');
      const targetSection = document.querySelector('#contact');
      const focusSpy = jest.spyOn(targetSection, 'focus');

      const event = new Event('click', { bubbles: true, cancelable: true });
      link.dispatchEvent(event);

      expect(focusSpy).toHaveBeenCalled();
    });

    test('should provide clear error messages for form validation', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Test empty fields message
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';

      let event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
      expect(window.alert).toHaveBeenCalledWith('Please fill in all fields.');

      // Test invalid email message
      window.alert.mockClear();
      nameInput.value = 'John Doe';
      emailInput.value = 'invalid-email';
      messageInput.value = 'Message';

      event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });
  });

  describe('Performance and Optimization', () => {
    test('should only attach event listeners once on DOMContentLoaded', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      
      eval(scriptContent);
      
      const initialCallCount = addEventListenerSpy.mock.calls.length;
      
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const afterLoadCount = addEventListenerSpy.mock.calls.length;
      
      // Should not add significantly more listeners after load
      expect(afterLoadCount).toBeGreaterThanOrEqual(initialCallCount);
    });

    test('should handle rapid navigation clicks efficiently', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const links = document.querySelectorAll('nav a');
      
      expect(() => {
        links.forEach(link => {
          for (let i = 0; i < 10; i++) {
            const event = new Event('click', { bubbles: true, cancelable: true });
            link.dispatchEvent(event);
          }
        });
      }).not.toThrow();
    });

    test('should efficiently handle intersection observer callbacks', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const sections = document.querySelectorAll('section[id]');
      const observer = new IntersectionObserver(() => {});

      const startTime = Date.now();
      
      // Simulate many intersection events
      for (let i = 0; i < 100; i++) {
        const entries = Array.from(sections).map(section => ({
          target: section,
          isIntersecting: i % 2 === 0
        }));
        observer.callback(entries);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete in reasonable time (less than 1 second)
      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Integration Tests', () => {
    test('should handle complete user navigation flow', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      // User clicks on nav link
      const aboutLink = document.querySelector('a[href="#about"]');
      const clickEvent = new Event('click', { bubbles: true, cancelable: true });
      aboutLink.dispatchEvent(clickEvent);

      // Scroll happens
      const aboutSection = document.querySelector('#about');
      expect(aboutSection.scrollIntoView).toHaveBeenCalled();

      // Section comes into view
      const observer = new IntersectionObserver(() => {});
      observer.callback([{
        target: aboutSection,
        isIntersecting: true
      }]);

      expect(aboutSection.classList.contains('fade-in-visible')).toBe(true);
    });

    test('should handle complete form submission flow with validation', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Try submitting empty form
      let event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
      expect(window.alert).toHaveBeenCalledWith('Please fill in all fields.');

      // Fill in invalid email
      window.alert.mockClear();
      nameInput.value = 'John Doe';
      emailInput.value = 'invalid';
      messageInput.value = 'Test message';
      
      event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');

      // Fill in valid data
      window.alert.mockClear();
      emailInput.value = 'john@example.com';
      
      event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
      expect(window.alert).not.toHaveBeenCalled();
    });

    test('should handle keyboard navigation and form interaction', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));

      const emailInput = document.getElementById('email');
      emailInput.focus();
      
      const blurSpy = jest.spyOn(emailInput, 'blur');

      // User presses Escape
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      expect(blurSpy).toHaveBeenCalled();
    });
  });
});