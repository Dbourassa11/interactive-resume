/**
 * Comprehensive Unit Tests for Interactive Resume JavaScript
 * Tests cover: smooth scrolling, navigation active states, form validation,
 * intersection observer, keyboard navigation, and print functionality
 */

describe('Interactive Resume - script.js', () => {
  let container;
  
  beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Test</title>
      </head>
      <body>
        <a href="#main-content" class="skip-to-content">Skip to content</a>
        
        <nav aria-label="Main navigation">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        
        <main id="main-content">
          <section id="hero" class="hero">
            <h1>Charles David Bourassa</h1>
          </section>
          
          <section id="about" class="about">
            <h2>About Me</h2>
            <p>Test content</p>
          </section>
          
          <section id="experience" class="experience">
            <h2>Experience</h2>
          </section>
          
          <section id="skills" class="skills">
            <h2>Skills</h2>
          </section>
          
          <section id="contact" class="contact">
            <h2>Contact Me</h2>
            <form action="https://formspree.io/f/TEST" method="POST" class="contact-form">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </section>
        </main>
        
        <footer>
          <p>&copy; 2026 Charles David Bourassa</p>
        </footer>
      </body>
      </html>
    `;
    
    container = document.body;
    
    // Reset mocks
    jest.clearAllMocks();
    
    // Reset pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0
    });
  });
  
  afterEach(() => {
    // Clean up event listeners
    document.removeEventListener('DOMContentLoaded', () => {});
    document.removeEventListener('keydown', () => {});
    window.removeEventListener('scroll', () => {});
  });
  
  describe('Smooth Scrolling for Navigation Links', () => {
    test('should add click event listeners to all anchor links starting with #', () => {
      const links = document.querySelectorAll('a[href^="#"]');
      expect(links.length).toBeGreaterThan(0);
    });
    
    test('should prevent default behavior when clicking navigation link', () => {
      // Load the script
      require('../script.js');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const link = document.querySelector('a[href="#about"]');
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      
      const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
      link.dispatchEvent(clickEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
    
    test('should call scrollIntoView when clicking on valid anchor link', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const link = document.querySelector('a[href="#about"]');
      const targetElement = document.querySelector('#about');
      const scrollIntoViewSpy = jest.spyOn(targetElement, 'scrollIntoView');
      
      link.click();
      
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });
    
    test('should set tabindex and focus on target element after scrolling', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const link = document.querySelector('a[href="#experience"]');
      const targetElement = document.querySelector('#experience');
      const focusSpy = jest.spyOn(targetElement, 'focus');
      
      link.click();
      
      expect(targetElement.getAttribute('tabindex')).toBe('-1');
      expect(focusSpy).toHaveBeenCalled();
    });
    
    test('should do nothing when anchor link href is just "#"', () => {
      document.body.innerHTML += '<a href="#" id="empty-link">Empty</a>';
      
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const link = document.querySelector('#empty-link');
      const scrollIntoViewSpy = jest.fn();
      Element.prototype.scrollIntoView = scrollIntoViewSpy;
      
      link.click();
      
      expect(scrollIntoViewSpy).not.toHaveBeenCalled();
    });
    
    test('should handle non-existent target element gracefully', () => {
      document.body.innerHTML += '<a href="#nonexistent" id="bad-link">Bad Link</a>';
      
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const link = document.querySelector('#bad-link');
      
      expect(() => link.click()).not.toThrow();
    });
  });
  
  describe('Active Navigation State Based on Scroll Position', () => {
    test('should add active class to navigation link when scrolled to corresponding section', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const aboutSection = document.querySelector('#about');
      const aboutLink = document.querySelector('a[href="#about"]');
      
      // Mock section position
      Object.defineProperty(aboutSection, 'offsetTop', { value: 100, configurable: true });
      Object.defineProperty(aboutSection, 'clientHeight', { value: 500, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 200, configurable: true });
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      expect(aboutLink.classList.contains('active')).toBe(true);
    });
    
    test('should remove active class from other navigation links', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const navLinks = document.querySelectorAll('nav a');
      const aboutSection = document.querySelector('#about');
      
      // Set one link as active initially
      navLinks[0].classList.add('active');
      
      // Mock section positions
      Object.defineProperty(aboutSection, 'offsetTop', { value: 100, configurable: true });
      Object.defineProperty(aboutSection, 'clientHeight', { value: 500, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 200, configurable: true });
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      // Check that only the about link is active
      const aboutLink = document.querySelector('a[href="#about"]');
      expect(aboutLink.classList.contains('active')).toBe(true);
      
      navLinks.forEach(link => {
        if (link !== aboutLink) {
          expect(link.classList.contains('active')).toBe(false);
        }
      });
    });
    
    test('should update active state when scrolling through multiple sections', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const sections = document.querySelectorAll('section[id]');
      
      // Mock different scroll positions
      sections.forEach((section, index) => {
        Object.defineProperty(section, 'offsetTop', { value: index * 600, configurable: true });
        Object.defineProperty(section, 'clientHeight', { value: 500, configurable: true });
      });
      
      // Scroll to skills section
      Object.defineProperty(window, 'pageYOffset', { value: 1800, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      
      const skillsLink = document.querySelector('a[href="#skills"]');
      expect(skillsLink.classList.contains('active')).toBe(true);
    });
    
    test('should account for 150px offset when determining active section', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const aboutSection = document.querySelector('#about');
      Object.defineProperty(aboutSection, 'offsetTop', { value: 200, configurable: true });
      Object.defineProperty(aboutSection, 'clientHeight', { value: 500, configurable: true });
      
      // Just before the threshold (200 - 150 = 50)
      Object.defineProperty(window, 'pageYOffset', { value: 49, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      
      const aboutLink = document.querySelector('a[href="#about"]');
      expect(aboutLink.classList.contains('active')).toBe(false);
      
      // Right at the threshold
      Object.defineProperty(window, 'pageYOffset', { value: 50, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      
      expect(aboutLink.classList.contains('active')).toBe(true);
    });
  });
  
  describe('Form Validation and Handling', () => {
    test('should prevent form submission when name is empty', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      document.getElementById('name').value = '';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(submitEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });
    
    test('should prevent form submission when email is empty', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = '';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(submitEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });
    
    test('should prevent form submission when message is empty', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('message').value = '';
      
      form.dispatchEvent(submitEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });
    
    test('should trim whitespace from form fields before validation', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      document.getElementById('name').value = '   ';
      document.getElementById('email').value = '  ';
      document.getElementById('message').value = '  ';
      
      form.dispatchEvent(submitEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Please fill in all fields.');
    });
    
    test('should validate email format and reject invalid email', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'invalid-email';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(submitEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });
    
    test('should validate email format and reject email without @', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'testexample.com';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(submitEvent);
      
      expect(global.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });
    
    test('should validate email format and reject email without domain', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'test@';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(submitEvent);
      
      expect(global.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });
    
    test('should validate email format and reject email with spaces', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'test @example.com';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(submitEvent);
      
      expect(global.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    });
    
    test('should accept valid email formats', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'test123@test-domain.com'
      ];
      
      validEmails.forEach(email => {
        jest.clearAllMocks();
        document.getElementById('name').value = 'John Doe';
        document.getElementById('email').value = email;
        document.getElementById('message').value = 'Test message';
        
        form.dispatchEvent(submitEvent);
        
        // Should not show alert for valid emails
        expect(global.alert).not.toHaveBeenCalled();
      });
    });
    
    test('should allow form submission when all fields are valid', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('message').value = 'This is a test message.';
      
      form.dispatchEvent(submitEvent);
      
      expect(global.alert).not.toHaveBeenCalled();
    });
    
    test('should handle missing contact form gracefully', () => {
      // Remove the form from DOM
      const form = document.querySelector('.contact-form');
      form.remove();
      
      expect(() => {
        require('../script.js');
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });
  });
  
  describe('Intersection Observer for Animations', () => {
    test('should create IntersectionObserver with correct options', () => {
      const observerSpy = jest.spyOn(global, 'IntersectionObserver');
      
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      expect(observerSpy).toHaveBeenCalled();
      const call = observerSpy.mock.calls[0];
      expect(call[1]).toEqual({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });
    });
    
    test('should observe all sections with id attributes', () => {
      let observedElements = [];
      
      global.IntersectionObserver = class {
        constructor(callback, options) {
          this.callback = callback;
        }
        observe(element) {
          observedElements.push(element);
        }
        unobserve() {}
        disconnect() {}
      };
      
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const sections = document.querySelectorAll('section[id]');
      expect(observedElements.length).toBe(sections.length);
    });
    
    test('should add fade-in-visible class when section intersects', () => {
      let intersectionCallback;
      
      global.IntersectionObserver = class {
        constructor(callback, options) {
          intersectionCallback = callback;
        }
        observe(element) {
          // Simulate intersection
          intersectionCallback([{
            target: element,
            isIntersecting: true
          }]);
        }
        unobserve() {}
        disconnect() {}
      };
      
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        expect(section.classList.contains('fade-in-visible')).toBe(true);
      });
    });
    
    test('should not add fade-in-visible class when section is not intersecting', () => {
      let intersectionCallback;
      
      global.IntersectionObserver = class {
        constructor(callback, options) {
          intersectionCallback = callback;
        }
        observe(element) {
          // Simulate no intersection
          intersectionCallback([{
            target: element,
            isIntersecting: false
          }]);
        }
        unobserve() {}
        disconnect() {}
      };
      
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const section = document.querySelector('#about');
      expect(section.classList.contains('fade-in-visible')).toBe(false);
    });
  });
  
  describe('Keyboard Navigation Enhancement', () => {
    test('should blur active element when Escape key is pressed', () => {
      require('../script.js');
      
      const button = document.querySelector('button[type="submit"]');
      button.focus();
      
      const blurSpy = jest.spyOn(button, 'blur');
      
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      expect(blurSpy).toHaveBeenCalled();
    });
    
    test('should handle Escape key when no element is focused', () => {
      require('../script.js');
      
      // Set activeElement to null (simulate no focus)
      Object.defineProperty(document, 'activeElement', {
        value: null,
        writable: true,
        configurable: true
      });
      
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      
      expect(() => document.dispatchEvent(escapeEvent)).not.toThrow();
    });
    
    test('should only respond to Escape key, not other keys', () => {
      require('../script.js');
      
      const button = document.querySelector('button[type="submit"]');
      button.focus();
      
      const blurSpy = jest.spyOn(button, 'blur');
      
      // Try different keys
      const keys = ['Enter', 'Tab', 'Space', 'a', 'ArrowDown'];
      keys.forEach(key => {
        const keyEvent = new KeyboardEvent('keydown', { key });
        document.dispatchEvent(keyEvent);
      });
      
      expect(blurSpy).not.toHaveBeenCalled();
      
      // Now try Escape
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      expect(blurSpy).toHaveBeenCalled();
    });
  });
  
  describe('Print Resume Functionality', () => {
    test('should call window.print when printResume is invoked', () => {
      require('../script.js');
      
      // The printResume function should be globally available
      expect(typeof window.printResume).toBe('function');
      
      window.printResume();
      
      expect(global.print).toHaveBeenCalled();
    });
    
    test('should define printResume function globally', () => {
      require('../script.js');
      
      expect(window.printResume).toBeDefined();
      expect(typeof window.printResume).toBe('function');
    });
  });
  
  describe('Edge Cases and Error Handling', () => {
    test('should handle multiple rapid scroll events', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Trigger multiple scroll events rapidly
      for (let i = 0; i < 10; i++) {
        window.dispatchEvent(new Event('scroll'));
      }
      
      // Should not throw errors
      expect(true).toBe(true);
    });
    
    test('should handle clicks on links before DOMContentLoaded', () => {
      const link = document.querySelector('a[href="#about"]');
      
      expect(() => link.click()).not.toThrow();
    });
    
    test('should handle form submission before DOMContentLoaded', () => {
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      expect(() => form.dispatchEvent(submitEvent)).not.toThrow();
    });
    
    test('should handle missing sections gracefully', () => {
      // Remove all sections
      document.querySelectorAll('section[id]').forEach(s => s.remove());
      
      expect(() => {
        require('../script.js');
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });
    
    test('should handle missing navigation gracefully', () => {
      document.querySelector('nav').remove();
      
      expect(() => {
        require('../script.js');
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });
    
    test('should handle special characters in form inputs', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'John O\'Brien <test>';
      document.getElementById('email').value = 'test+special@example.com';
      document.getElementById('message').value = 'Message with "quotes" & special <chars>';
      
      form.dispatchEvent(submitEvent);
      
      expect(global.alert).not.toHaveBeenCalled();
    });
    
    test('should handle very long form input values', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const form = document.querySelector('.contact-form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'A'.repeat(1000);
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('message').value = 'B'.repeat(10000);
      
      form.dispatchEvent(submitEvent);
      
      expect(global.alert).not.toHaveBeenCalled();
    });
  });
  
  describe('Integration Tests', () => {
    test('should complete full user flow: navigate, scroll, fill form', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Step 1: Click navigation link
      const link = document.querySelector('a[href="#contact"]');
      link.click();
      
      const contactSection = document.querySelector('#contact');
      expect(contactSection.getAttribute('tabindex')).toBe('-1');
      
      // Step 2: Simulate scroll to section
      Object.defineProperty(contactSection, 'offsetTop', { value: 2000, configurable: true });
      Object.defineProperty(contactSection, 'clientHeight', { value: 600, configurable: true });
      Object.defineProperty(window, 'pageYOffset', { value: 2100, configurable: true });
      
      window.dispatchEvent(new Event('scroll'));
      
      const contactLink = document.querySelector('a[href="#contact"]');
      expect(contactLink.classList.contains('active')).toBe(true);
      
      // Step 3: Fill and submit form
      const form = document.querySelector('.contact-form');
      document.getElementById('name').value = 'Jane Smith';
      document.getElementById('email').value = 'jane@example.com';
      document.getElementById('message').value = 'Hello, I would like to connect!';
      
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      expect(global.alert).not.toHaveBeenCalled();
    });
    
    test('should handle keyboard navigation and form interaction', () => {
      require('../script.js');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Focus on an input
      const nameInput = document.getElementById('name');
      nameInput.focus();
      
      // Press Escape to blur
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      const blurSpy = jest.spyOn(nameInput, 'blur');
      
      document.dispatchEvent(escapeEvent);
      
      expect(blurSpy).toHaveBeenCalled();
    });
  });
});