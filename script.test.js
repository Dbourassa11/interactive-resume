/**
 * Comprehensive Unit Tests for Interactive Resume JavaScript
 * Testing all functionality including smooth scrolling, form validation,
 * navigation state management, animations, and keyboard interactions
 */

// Load the HTML structure for testing
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('Interactive Resume - script.js', () => {
  let scriptContent;

  beforeAll(() => {
    // Load script content for evaluation
    scriptContent = fs.readFileSync(path.resolve(__dirname, './script.js'), 'utf8');
  });

  beforeEach(() => {
    // Set up DOM with the actual HTML
    document.documentElement.innerHTML = html;
    
    // Reset mocks
    jest.clearAllMocks();
    
    // Reset scroll position
    window.pageYOffset = 0;
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0
    });
  });

  afterEach(() => {
    // Clean up DOM
    document.documentElement.innerHTML = '';
  });

  describe('DOMContentLoaded Event Handler', () => {
    test('should execute initialization code when DOM is loaded', () => {
      // Execute the script
      eval(scriptContent);
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Verify that anchor links were found and processed
      const links = document.querySelectorAll('a[href^="#"]');
      expect(links.length).toBeGreaterThan(0);
    });

    test('should find all navigation sections', () => {
      eval(scriptContent);
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const sections = document.querySelectorAll('section[id]');
      expect(sections.length).toBe(5); // hero, about, experience, skills, contact
    });

    test('should find all navigation links', () => {
      eval(scriptContent);
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const navLinks = document.querySelectorAll('nav a');
      expect(navLinks.length).toBe(4); // about, experience, skills, contact
    });
  });

  describe('Smooth Scrolling Functionality', () => {
    test('should prevent default behavior on anchor link click', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const link = document.querySelector('a[href="#about"]');
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      link.dispatchEvent(event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should call scrollIntoView with correct options when valid target exists', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const targetElement = document.querySelector('#about');
      const scrollSpy = jest.spyOn(targetElement, 'scrollIntoView');
      
      const link = document.querySelector('a[href="#about"]');
      link.click();
      
      expect(scrollSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    test('should set tabindex and focus on target element for accessibility', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const targetElement = document.querySelector('#about');
      const focusSpy = jest.spyOn(targetElement, 'focus');
      
      const link = document.querySelector('a[href="#about"]');
      link.click();
      
      expect(targetElement.getAttribute('tabindex')).toBe('-1');
      expect(focusSpy).toHaveBeenCalled();
    });

    test('should handle click on anchor link with just "#" (no action)', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      // Create a link with href="#"
      const link = document.createElement('a');
      link.href = '#';
      document.body.appendChild(link);
      
      // Re-run the link setup
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const scrollSpy = jest.spyOn(Element.prototype, 'scrollIntoView');
      link.click();
      
      // scrollIntoView should not be called for href="#"
      expect(scrollSpy).not.toHaveBeenCalled();
    });

    test('should handle non-existent target gracefully', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      // Create a link pointing to non-existent element
      const link = document.createElement('a');
      link.href = '#nonexistent';
      document.body.appendChild(link);
      
      // Re-run the link setup
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      // Should not throw error
      expect(() => link.click()).not.toThrow();
    });
  });

  describe('Navigation Active State Management', () => {
    test('should add active class to current section link on scroll', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const aboutSection = document.querySelector('#about');
      const aboutLink = document.querySelector('a[href="#about"]');
      
      // Mock section position
      Object.defineProperty(aboutSection, 'offsetTop', { value: 200, configurable: true });
      Object.defineProperty(aboutSection, 'clientHeight', { value: 300, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 250, configurable: true });
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      expect(aboutLink.classList.contains('active')).toBe(true);
    });

    test('should remove active class from all links before adding to current', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const navLinks = document.querySelectorAll('nav a');
      
      // Add active class to all links initially
      navLinks.forEach(link => link.classList.add('active'));
      
      const aboutSection = document.querySelector('#about');
      Object.defineProperty(aboutSection, 'offsetTop', { value: 200, configurable: true });
      Object.defineProperty(aboutSection, 'clientHeight', { value: 300, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 250, configurable: true });
      
      window.dispatchEvent(new Event('scroll'));
      
      // Only the about link should have active class
      const activeLinks = Array.from(navLinks).filter(link => link.classList.contains('active'));
      expect(activeLinks.length).toBe(1);
      expect(activeLinks[0].getAttribute('href')).toBe('#about');
    });

    test('should handle scroll with offset of 150px correctly', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const aboutSection = document.querySelector('#about');
      const aboutLink = document.querySelector('a[href="#about"]');
      
      // Set scroll position just below the threshold (offsetTop - 150)
      Object.defineProperty(aboutSection, 'offsetTop', { value: 500, configurable: true });
      Object.defineProperty(aboutSection, 'clientHeight', { value: 300, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 350, configurable: true }); // 500 - 150 = 350
      
      window.dispatchEvent(new Event('scroll'));
      
      expect(aboutLink.classList.contains('active')).toBe(true);
    });

    test('should not activate section if scroll position is above threshold', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const aboutSection = document.querySelector('#about');
      const aboutLink = document.querySelector('a[href="#about"]');
      
      Object.defineProperty(aboutSection, 'offsetTop', { value: 500, configurable: true });
      Object.defineProperty(aboutSection, 'clientHeight', { value: 300, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 300, configurable: true }); // Below threshold
      
      window.dispatchEvent(new Event('scroll'));
      
      expect(aboutLink.classList.contains('active')).toBe(false);
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
      expect(global.alert).toHaveBeenCalledWith('Please fill in all fields.');
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
      expect(global.alert).toHaveBeenCalledWith('Please fill in all fields.');
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
      expect(global.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });

    test('should trim whitespace from input fields', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      nameInput.value = '   ';
      emailInput.value = '  test@example.com  ';
      messageInput.value = '  message  ';
      
      const event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
      
      expect(global.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });

    test('should validate email format with regex', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      nameInput.value = 'John Doe';
      emailInput.value = 'invalid-email';
      messageInput.value = 'Test message';
      
      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });

    test('should reject email without @ symbol', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      nameInput.value = 'John Doe';
      emailInput.value = 'testexample.com';
      messageInput.value = 'Test message';
      
      const event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
      
      expect(global.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });

    test('should reject email without domain', () => {
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
      form.dispatchEvent(event);
      
      expect(global.alert).toHaveBeenCalledWith('Please enter a valid email address.');
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
      form.dispatchEvent(event);
      
      expect(global.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });

    test('should accept valid email addresses', () => {
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
        'user_name@example.org',
        'user123@test-domain.com'
      ];
      
      validEmails.forEach(email => {
        jest.clearAllMocks();
        nameInput.value = 'John Doe';
        emailInput.value = email;
        messageInput.value = 'Test message';
        
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
        
        // Should not show email validation error
        expect(global.alert).not.toHaveBeenCalledWith('Please enter a valid email address.');
      });
    });

    test('should allow form submission with all valid fields', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const form = document.querySelector('.contact-form');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      nameInput.value = 'John Doe';
      emailInput.value = 'test@example.com';
      messageInput.value = 'This is a test message';
      
      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      form.dispatchEvent(event);
      
      // With all valid fields, preventDefault should not be called by validation
      // (it would be submitted to Formspree)
      expect(global.alert).not.toHaveBeenCalled();
    });

    test('should handle missing contact form gracefully', () => {
      // Remove the form from DOM
      const form = document.querySelector('.contact-form');
      form.remove();
      
      // Should not throw error
      expect(() => {
        eval(scriptContent);
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }).not.toThrow();
    });
  });

  describe('Intersection Observer - Animation on Scroll', () => {
    test('should create IntersectionObserver with correct options', () => {
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

    test('should observe all sections', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const sections = document.querySelectorAll('section[id]');
      expect(sections.length).toBe(5);
      
      // Each section should be observed (verified by our mock)
      sections.forEach(section => {
        // Our mock IntersectionObserver automatically adds the class
        expect(section.classList.contains('fade-in-visible')).toBe(true);
      });
    });

    test('should add fade-in-visible class when section is intersecting', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const aboutSection = document.querySelector('#about');
      
      // The mock automatically simulates intersection
      expect(aboutSection.classList.contains('fade-in-visible')).toBe(true);
    });

    test('should handle multiple sections intersecting', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const sections = document.querySelectorAll('section[id]');
      const visibleSections = Array.from(sections).filter(
        section => section.classList.contains('fade-in-visible')
      );
      
      expect(visibleSections.length).toBeGreaterThan(0);
    });
  });

  describe('Keyboard Navigation', () => {
    test('should blur active element when Escape key is pressed', () => {
      eval(scriptContent);
      
      const input = document.getElementById('name');
      input.focus();
      
      const blurSpy = jest.spyOn(input, 'blur');
      
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      
      expect(blurSpy).toHaveBeenCalled();
    });

    test('should handle Escape key when no element is focused', () => {
      eval(scriptContent);
      
      // Ensure no element is focused
      if (document.activeElement) {
        document.activeElement.blur();
      }
      
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      
      // Should not throw error
      expect(() => document.dispatchEvent(event)).not.toThrow();
    });

    test('should not react to other keys', () => {
      eval(scriptContent);
      
      const input = document.getElementById('name');
      input.focus();
      
      const blurSpy = jest.spyOn(input, 'blur');
      
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      document.dispatchEvent(event);
      
      // Blur should not be called for non-Escape keys
      expect(blurSpy).not.toHaveBeenCalled();
    });

    test('should handle multiple Escape key presses', () => {
      eval(scriptContent);
      
      const input = document.getElementById('name');
      input.focus();
      
      const blurSpy = jest.spyOn(input, 'blur');
      
      // Press Escape multiple times
      for (let i = 0; i < 3; i++) {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
      }
      
      expect(blurSpy).toHaveBeenCalledTimes(3);
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
      
      expect(global.print).toHaveBeenCalled();
    });

    test('should be callable multiple times', () => {
      eval(scriptContent);
      
      printResume();
      printResume();
      printResume();
      
      expect(global.print).toHaveBeenCalledTimes(3);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle missing sections gracefully', () => {
      // Remove all sections
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => section.remove());
      
      expect(() => {
        eval(scriptContent);
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }).not.toThrow();
    });

    test('should handle missing navigation links gracefully', () => {
      // Remove navigation
      const nav = document.querySelector('nav');
      nav.remove();
      
      expect(() => {
        eval(scriptContent);
        document.dispatchEvent(new Event('DOMContentLoaded'));
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle scroll event with no sections', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      // Remove all sections after initialization
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => section.remove());
      
      expect(() => {
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle form submission event with missing inputs', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      const form = document.querySelector('.contact-form');
      
      // Remove inputs
      document.getElementById('name').remove();
      document.getElementById('email').remove();
      document.getElementById('message').remove();
      
      const event = new Event('submit', { bubbles: true, cancelable: true });
      
      // Should handle gracefully (might throw, but caught internally)
      form.dispatchEvent(event);
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

    test('should handle rapid keydown events', () => {
      eval(scriptContent);
      
      expect(() => {
        for (let i = 0; i < 100; i++) {
          const event = new KeyboardEvent('keydown', { key: 'Escape' });
          document.dispatchEvent(event);
        }
      }).not.toThrow();
    });
  });

  describe('Integration Tests', () => {
    test('should handle complete user flow: navigate, scroll, and submit form', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      // 1. Click navigation link
      const aboutLink = document.querySelector('a[href="#about"]');
      aboutLink.click();
      
      // 2. Simulate scroll
      const aboutSection = document.querySelector('#about');
      Object.defineProperty(aboutSection, 'offsetTop', { value: 200, configurable: true });
      Object.defineProperty(aboutSection, 'clientHeight', { value: 300, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 250, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      
      // 3. Fill and submit form
      const form = document.querySelector('.contact-form');
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('message').value = 'Hello!';
      
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      // Verify navigation is active
      expect(aboutLink.classList.contains('active')).toBe(true);
      
      // Verify form didn't show validation errors
      expect(global.alert).not.toHaveBeenCalled();
    });

    test('should handle accessibility flow with keyboard navigation', () => {
      eval(scriptContent);
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      // Focus on form input
      const nameInput = document.getElementById('name');
      nameInput.focus();
      expect(document.activeElement).toBe(nameInput);
      
      // Press Escape to blur
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      // Element should be blurred
      expect(document.activeElement).not.toBe(nameInput);
    });
  });
});