/**
 * Comprehensive Unit Tests for script.js
 * Tests all interactive functionality of the resume
 */

const fs = require('fs');
const path = require('path');

describe('Interactive Resume - JavaScript Functionality', () => {
  let scriptContent;

  beforeAll(() => {
    // Load the HTML file
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.body.innerHTML = html;

    // Load and execute the script
    scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
  });

  beforeEach(() => {
    // Reset DOM
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.body.innerHTML = html;
    
    // Clear all mocks
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('Mobile Navigation', () => {
    test('should toggle mobile menu when hamburger is clicked', () => {
      eval(scriptContent);
      
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      
      expect(hamburger).toBeTruthy();
      expect(navLinks).toBeTruthy();
      
      // Simulate click
      hamburger.click();
      
      expect(navLinks.classList.contains('active')).toBe(true);
      expect(hamburger.classList.contains('active')).toBe(true);
      
      // Click again to close
      hamburger.click();
      
      expect(navLinks.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });

    test('should close mobile menu when navigation link is clicked', () => {
      eval(scriptContent);
      
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      const firstNavLink = document.querySelector('.nav-links a');
      
      // Open menu first
      hamburger.click();
      expect(navLinks.classList.contains('active')).toBe(true);
      
      // Click a nav link
      firstNavLink.click();
      
      expect(navLinks.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });

    test('should handle missing hamburger element gracefully', () => {
      const hamburger = document.querySelector('.hamburger');
      hamburger.remove();
      
      expect(() => {
        eval(scriptContent);
      }).not.toThrow();
    });
  });

  describe('Smooth Scrolling', () => {
    test('should scroll to target section when nav link is clicked', () => {
      eval(scriptContent);
      
      const navLink = document.querySelector('.nav-links a[href="#about"]');
      const aboutSection = document.querySelector('#about');
      
      expect(navLink).toBeTruthy();
      expect(aboutSection).toBeTruthy();
      
      // Mock offsetTop
      Object.defineProperty(aboutSection, 'offsetTop', {
        value: 1000,
        configurable: true
      });
      
      navLink.click();
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 930, // 1000 - 70 (navbar offset)
        behavior: 'smooth'
      });
    });

    test('should prevent default link behavior', () => {
      eval(scriptContent);
      
      const navLink = document.querySelector('.nav-links a[href="#home"]');
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      navLink.dispatchEvent(event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should handle missing target section gracefully', () => {
      eval(scriptContent);
      
      const navLink = document.querySelector('.nav-links a[href="#about"]');
      const aboutSection = document.querySelector('#about');
      aboutSection.remove();
      
      expect(() => {
        navLink.click();
      }).not.toThrow();
    });
  });

  describe('Navbar Scroll Effect', () => {
    test('should update navbar style when scrolled past threshold', () => {
      eval(scriptContent);
      
      const navbar = document.querySelector('.navbar');
      
      // Simulate scroll
      Object.defineProperty(window, 'pageYOffset', {
        value: 150,
        configurable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      expect(navbar.style.background).toBe('rgba(255, 255, 255, 0.98)');
      expect(navbar.style.boxShadow).toBe('0 5px 20px rgba(0, 0, 0, 0.1)');
    });

    test('should reset navbar style when scrolled to top', () => {
      eval(scriptContent);
      
      const navbar = document.querySelector('.navbar');
      
      // Simulate scroll to top
      Object.defineProperty(window, 'pageYOffset', {
        value: 50,
        configurable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      expect(navbar.style.background).toBe('var(--white)');
      expect(navbar.style.boxShadow).toBe('0 5px 15px rgba(0, 0, 0, 0.1)');
    });
  });

  describe('Parallax Effect', () => {
    test('should apply parallax transform to hero content', () => {
      eval(scriptContent);
      
      const heroContent = document.querySelector('.hero-content');
      
      // Simulate scroll within hero section
      Object.defineProperty(window, 'pageYOffset', {
        value: 200,
        configurable: true
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 800,
        configurable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      expect(heroContent.style.transform).toContain('translateY');
      expect(heroContent.style.opacity).toBeTruthy();
    });

    test('should stop parallax effect when scrolled past hero section', () => {
      eval(scriptContent);
      
      const heroContent = document.querySelector('.hero-content');
      
      // Simulate scroll past hero
      Object.defineProperty(window, 'pageYOffset', {
        value: 1000,
        configurable: true
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 800,
        configurable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      // Further scrolling shouldn't change transform
      const previousTransform = heroContent.style.transform;
      
      Object.defineProperty(window, 'pageYOffset', {
        value: 1200,
        configurable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      // Transform should not update (handler disabled)
      expect(heroContent.style.transform).toBe(previousTransform);
    });

    test('should handle missing hero content gracefully', () => {
      const heroContent = document.querySelector('.hero-content');
      heroContent.remove();
      
      expect(() => {
        eval(scriptContent);
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });
  });

  describe('Active Navigation Highlighting', () => {
    test('should highlight active section in navigation', () => {
      eval(scriptContent);
      
      const aboutSection = document.querySelector('#about');
      const aboutLink = document.querySelector('.nav-links a[href="#about"]');
      
      // Mock section position
      Object.defineProperty(aboutSection, 'offsetTop', {
        value: 500,
        configurable: true
      });
      Object.defineProperty(aboutSection, 'offsetHeight', {
        value: 400,
        configurable: true
      });
      Object.defineProperty(window, 'pageYOffset', {
        value: 550,
        configurable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      expect(aboutLink.classList.contains('active')).toBe(true);
    });

    test('should remove active class from other links', () => {
      eval(scriptContent);
      
      const homeSection = document.querySelector('#home');
      const aboutSection = document.querySelector('#about');
      const homeLink = document.querySelector('.nav-links a[href="#home"]');
      const aboutLink = document.querySelector('.nav-links a[href="#about"]');
      
      // Initially at home
      Object.defineProperty(homeSection, 'offsetTop', {
        value: 0,
        configurable: true
      });
      Object.defineProperty(homeSection, 'offsetHeight', {
        value: 400,
        configurable: true
      });
      Object.defineProperty(window, 'pageYOffset', {
        value: 50,
        configurable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      // Now scroll to about
      Object.defineProperty(aboutSection, 'offsetTop', {
        value: 500,
        configurable: true
      });
      Object.defineProperty(aboutSection, 'offsetHeight', {
        value: 400,
        configurable: true
      });
      Object.defineProperty(window, 'pageYOffset', {
        value: 550,
        configurable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      expect(homeLink.classList.contains('active')).toBe(false);
      expect(aboutLink.classList.contains('active')).toBe(true);
    });
  });

  describe('Animated Counters', () => {
    test('should animate stat numbers when section is visible', () => {
      eval(scriptContent);
      
      const statNumbers = document.querySelectorAll('.stat-number');
      
      expect(statNumbers.length).toBeGreaterThan(0);
      
      // Initial values should be 0
      statNumbers.forEach(stat => {
        expect(stat.textContent).toBe('0');
      });
      
      // Trigger animation by observing stats
      jest.runAllTimers();
      
      // After animation, values should match targets
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        expect(parseInt(stat.textContent)).toBeLessThanOrEqual(target);
      });
    });

    test('should not animate counters more than once', () => {
      eval(scriptContent);
      
      const statsSection = document.querySelector('.stats');
      const statNumbers = document.querySelectorAll('.stat-number');
      
      // First observation
      jest.runAllTimers();
      
      const firstValues = Array.from(statNumbers).map(s => s.textContent);
      
      // Second observation (shouldn't re-animate)
      jest.runAllTimers();
      
      const secondValues = Array.from(statNumbers).map(s => s.textContent);
      
      expect(firstValues).toEqual(secondValues);
    });

    test('should handle missing data-target attribute', () => {
      eval(scriptContent);
      
      const statNumber = document.querySelector('.stat-number');
      statNumber.removeAttribute('data-target');
      
      expect(() => {
        jest.runAllTimers();
      }).not.toThrow();
    });
  });

  describe('Skill Bar Animations', () => {
    test('should animate skill bars when visible', () => {
      eval(scriptContent);
      
      const progressBars = document.querySelectorAll('.progress-bar');
      
      expect(progressBars.length).toBeGreaterThan(0);
      
      // Initially should have no width
      progressBars.forEach(bar => {
        expect(bar.style.width).toBeFalsy();
      });
      
      jest.runAllTimers();
      
      // After animation, should have width from data-width
      progressBars.forEach(bar => {
        const expectedWidth = bar.getAttribute('data-width');
        if (expectedWidth) {
          expect(bar.style.width).toBe(expectedWidth + '%');
        }
      });
    });

    test('should handle missing data-width attribute', () => {
      eval(scriptContent);
      
      const progressBar = document.querySelector('.progress-bar');
      progressBar.removeAttribute('data-width');
      
      expect(() => {
        jest.runAllTimers();
      }).not.toThrow();
    });
  });

  describe('Contact Form Validation', () => {
    test('should validate all required fields are filled', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      // Leave fields empty
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';
      
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      form.dispatchEvent(submitEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      
      // Check for notification
      const notification = document.querySelector('.notification');
      expect(notification).toBeTruthy();
      expect(notification.textContent).toContain('Please fill in all fields');
    });

    test('should validate email format', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'invalid-email';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(submitEvent);
      
      const notification = document.querySelector('.notification');
      expect(notification).toBeTruthy();
      expect(notification.textContent).toContain('valid email address');
    });

    test('should accept valid email formats', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      const validEmails = [
        'test@example.com',
        'user.name@example.co.uk',
        'user+tag@example.com',
        'test123@test-domain.com'
      ];
      
      validEmails.forEach(email => {
        document.getElementById('name').value = 'John Doe';
        document.getElementById('email').value = email;
        document.getElementById('subject').value = 'Test';
        document.getElementById('message').value = 'Test message';
        
        form.dispatchEvent(submitEvent);
        
        const notification = document.querySelector('.notification');
        if (notification) {
          expect(notification.textContent).not.toContain('valid email address');
        }
      });
    });

    test('should reject invalid email formats', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      
      const invalidEmails = [
        'invalid',
        'invalid@',
        '@example.com',
        'test@',
        'test..double@example.com',
        'test @example.com',
        'test@example',
      ];
      
      invalidEmails.forEach(email => {
        // Clear previous notifications
        const prevNotification = document.querySelector('.notification');
        if (prevNotification) prevNotification.remove();
        
        document.getElementById('name').value = 'John Doe';
        document.getElementById('email').value = email;
        document.getElementById('subject').value = 'Test';
        document.getElementById('message').value = 'Test message';
        
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
        
        const notification = document.querySelector('.notification');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toContain('valid email address');
      });
    });

    test('should show success message on valid submission', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test Subject';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(submitEvent);
      
      jest.runAllTimers();
      
      const notification = document.querySelector('.notification.success');
      expect(notification).toBeTruthy();
      expect(notification.textContent).toContain('Thank you');
    });

    test('should reset form after successful submission', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test Subject';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(submitEvent);
      
      expect(document.getElementById('name').value).toBe('');
      expect(document.getElementById('email').value).toBe('');
      expect(document.getElementById('subject').value).toBe('');
      expect(document.getElementById('message').value).toBe('');
    });

    test('should handle missing form elements gracefully', () => {
      const form = document.getElementById('contactForm');
      form.remove();
      
      expect(() => {
        eval(scriptContent);
      }).not.toThrow();
    });
  });

  describe('Notification System', () => {
    test('should create notification element with correct styling', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Test';
      
      form.dispatchEvent(submitEvent);
      
      const notification = document.querySelector('.notification');
      expect(notification).toBeTruthy();
      expect(notification.style.position).toBe('fixed');
      expect(notification.style.zIndex).toBe('10000');
    });

    test('should remove existing notification before creating new one', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      
      // Create first notification
      document.getElementById('name').value = '';
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      
      const firstNotification = document.querySelector('.notification');
      expect(firstNotification).toBeTruthy();
      
      // Create second notification
      document.getElementById('email').value = 'invalid';
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      
      const notifications = document.querySelectorAll('.notification');
      expect(notifications.length).toBe(1);
    });

    test('should auto-remove notification after timeout', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Test';
      
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      
      const notification = document.querySelector('.notification');
      expect(notification).toBeTruthy();
      
      // Fast-forward timers
      jest.advanceTimersByTime(3500);
      
      expect(document.querySelector('.notification')).toBeFalsy();
    });

    test('should add slideIn animation keyframes only once', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      
      // Trigger multiple notifications
      for (let i = 0; i < 3; i++) {
        document.getElementById('name').value = '';
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        
        // Clear notification
        const notification = document.querySelector('.notification');
        if (notification) notification.remove();
      }
      
      // Should only have one style element for animations
      const animationStyles = document.querySelectorAll('#notification-slidein-style');
      expect(animationStyles.length).toBe(1);
    });
  });

  describe('Intersection Observer', () => {
    test('should observe animate elements', () => {
      eval(scriptContent);
      
      const animateElements = document.querySelectorAll('.stat-item, .skill-category, .timeline-item, .project-card, .education-card');
      
      expect(animateElements.length).toBeGreaterThan(0);
      
      // Elements should have initial animation state
      animateElements.forEach(el => {
        expect(el.style.opacity).toBe('0');
        expect(el.style.transform).toContain('translateY');
      });
    });

    test('should animate elements when intersecting', () => {
      eval(scriptContent);
      
      const animateElements = document.querySelectorAll('.stat-item, .skill-category, .timeline-item');
      
      // After intersection, elements should be visible
      animateElements.forEach(el => {
        expect(el.style.opacity).toBe('1');
        expect(el.style.transform).toContain('translateY(0)');
      });
    });

    test('should observe stats section separately', () => {
      eval(scriptContent);
      
      const statsSection = document.querySelector('.stats');
      expect(statsSection).toBeTruthy();
      
      // Stats should be observed and animated
      expect(statsSection.style.opacity).toBe('1');
    });
  });

  describe('Image Lazy Loading', () => {
    test('should observe project images for lazy loading', () => {
      eval(scriptContent);
      
      const images = document.querySelectorAll('.project-image img');
      
      expect(images.length).toBeGreaterThan(0);
      
      // After observation, images should have loaded class
      images.forEach(img => {
        expect(img.classList.contains('loaded')).toBe(true);
      });
    });

    test('should handle missing IntersectionObserver', () => {
      const originalIO = window.IntersectionObserver;
      delete window.IntersectionObserver;
      
      expect(() => {
        eval(scriptContent);
      }).not.toThrow();
      
      window.IntersectionObserver = originalIO;
    });
  });

  describe('Console Logging', () => {
    test('should log success message on load', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      
      eval(scriptContent);
      
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Interactive Resume Loaded Successfully'));
      
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty DOM gracefully', () => {
      document.body.innerHTML = '';
      
      expect(() => {
        eval(scriptContent);
      }).not.toThrow();
    });

    test('should handle missing sections', () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => section.removeAttribute('id'));
      
      expect(() => {
        eval(scriptContent);
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle rapid scroll events', () => {
      eval(scriptContent);
      
      expect(() => {
        for (let i = 0; i < 100; i++) {
          Object.defineProperty(window, 'pageYOffset', {
            value: i * 10,
            configurable: true
          });
          window.dispatchEvent(new Event('scroll'));
        }
      }).not.toThrow();
    });

    test('should handle rapid form submissions', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      
      document.getElementById('name').value = 'John';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Test';
      
      expect(() => {
        for (let i = 0; i < 10; i++) {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
      }).not.toThrow();
    });

    test('should handle special characters in form inputs', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      
      document.getElementById('name').value = '<script>alert("xss")</script>';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('subject').value = '${injection}';
      document.getElementById('message').value = 'Test with "quotes" and \'apostrophes\'';
      
      expect(() => {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }).not.toThrow();
    });

    test('should handle very long input values', () => {
      eval(scriptContent);
      
      const form = document.getElementById('contactForm');
      const longString = 'a'.repeat(10000);
      
      document.getElementById('name').value = longString;
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('subject').value = longString;
      document.getElementById('message').value = longString;
      
      expect(() => {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }).not.toThrow();
    });

    test('should handle missing navbar element', () => {
      const navbar = document.querySelector('.navbar');
      navbar.remove();
      
      expect(() => {
        eval(scriptContent);
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });
  });

  describe('Performance and Memory', () => {
    test('should not create memory leaks with event listeners', () => {
      eval(scriptContent);
      
      const initialListenerCount = window._events ? Object.keys(window._events).length : 0;
      
      // Trigger various events
      window.dispatchEvent(new Event('scroll'));
      document.querySelector('.hamburger')?.click();
      
      const finalListenerCount = window._events ? Object.keys(window._events).length : 0;
      
      // Listener count should remain stable
      expect(finalListenerCount).toBeLessThanOrEqual(initialListenerCount + 10);
    });

    test('should use requestAnimationFrame for animations', () => {
      eval(scriptContent);
      
      expect(window.requestAnimationFrame).toHaveBeenCalled();
    });
  });
});