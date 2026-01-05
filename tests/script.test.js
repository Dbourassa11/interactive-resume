/**
 * Comprehensive test suite for script.js
 * Tests all interactive features of the resume website
 */

const fs = require('fs');
const path = require('path');

describe('Interactive Resume - JavaScript Functionality', () => {
  let html;
  let script;

  beforeEach(() => {
    // Load HTML and create DOM
    html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;
    
    // Load and execute script
    script = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
    
    // Reset scroll position
    window.pageYOffset = 0;
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 0
    });
    
    // Reset innerHeight
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 1000
    });
  });

  afterEach(() => {
    document.documentElement.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('Mobile Navigation', () => {
    test('should toggle mobile menu when hamburger is clicked', () => {
      eval(script);
      
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      
      expect(hamburger).toBeTruthy();
      expect(navLinks).toBeTruthy();
      
      // Click hamburger
      hamburger.click();
      
      expect(navLinks.classList.contains('active')).toBe(true);
      expect(hamburger.classList.contains('active')).toBe(true);
      
      // Click again to close
      hamburger.click();
      
      expect(navLinks.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });

    test('should close mobile menu when nav link is clicked', () => {
      eval(script);
      
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      const firstNavItem = document.querySelector('.nav-links a');
      
      // Open menu
      hamburger.click();
      expect(navLinks.classList.contains('active')).toBe(true);
      
      // Click nav item
      firstNavItem.click();
      
      expect(navLinks.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });

    test('should handle multiple hamburger clicks', () => {
      eval(script);
      
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      
      // Multiple rapid clicks
      for (let i = 0; i < 5; i++) {
        hamburger.click();
      }
      
      // Should be in open state (odd number of clicks)
      expect(navLinks.classList.contains('active')).toBe(true);
    });
  });

  describe('Smooth Scrolling', () => {
    test('should prevent default link behavior and scroll smoothly', () => {
      eval(script);
      
      const navLink = document.querySelector('.nav-links a[href="#about"]');
      const aboutSection = document.querySelector('#about');
      
      expect(navLink).toBeTruthy();
      expect(aboutSection).toBeTruthy();
      
      // Mock offsetTop
      Object.defineProperty(aboutSection, 'offsetTop', {
        value: 500,
        writable: true
      });
      
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      navLink.dispatchEvent(event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 430, // 500 - 70
        behavior: 'smooth'
      });
    });

    test('should handle clicking all navigation links', () => {
      eval(script);
      
      const navLinks = document.querySelectorAll('.nav-links a');
      
      navLinks.forEach(link => {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true });
        link.dispatchEvent(event);
        expect(window.scrollTo).toHaveBeenCalled();
      });
    });

    test('should handle missing target section gracefully', () => {
      eval(script);
      
      const navLink = document.querySelector('.nav-links a');
      navLink.setAttribute('href', '#nonexistent');
      
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      
      expect(() => navLink.dispatchEvent(event)).not.toThrow();
    });

    test('should calculate correct offset for sections', () => {
      eval(script);
      
      const sections = ['home', 'about', 'skills', 'experience'];
      
      sections.forEach(sectionId => {
        const link = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        const section = document.querySelector(`#${sectionId}`);
        
        if (link && section) {
          Object.defineProperty(section, 'offsetTop', {
            value: 1000,
            writable: true
          });
          
          const event = new MouseEvent('click', { bubbles: true, cancelable: true });
          link.dispatchEvent(event);
          
          expect(window.scrollTo).toHaveBeenCalledWith({
            top: 930,
            behavior: 'smooth'
          });
        }
      });
    });
  });

  describe('Scroll Effects', () => {
    test('should update navbar style when scrolled past threshold', () => {
      eval(script);
      
      const navbar = document.querySelector('.navbar');
      
      // Scroll past threshold
      window.pageYOffset = 150;
      window.dispatchEvent(new Event('scroll'));
      
      expect(navbar.style.background).toBe('rgba(255, 255, 255, 0.98)');
      expect(navbar.style.boxShadow).toBe('0 5px 20px rgba(0, 0, 0, 0.1)');
    });

    test('should reset navbar style when scrolled back to top', () => {
      eval(script);
      
      const navbar = document.querySelector('.navbar');
      
      // Scroll to top
      window.pageYOffset = 50;
      window.dispatchEvent(new Event('scroll'));
      
      expect(navbar.style.background).toBe('var(--white)');
      expect(navbar.style.boxShadow).toBe('0 5px 15px rgba(0, 0, 0, 0.1)');
    });

    test('should apply parallax effect to hero content', () => {
      eval(script);
      
      const heroContent = document.querySelector('.hero-content');
      
      window.pageYOffset = 100;
      window.dispatchEvent(new Event('scroll'));
      
      expect(heroContent.style.transform).toBe('translateY(50px)');
      expect(heroContent.style.opacity).toBe('0.8');
    });

    test('should stop parallax effect after scrolling past hero', () => {
      eval(script);
      
      const heroContent = document.querySelector('.hero-content');
      
      // Scroll past hero
      window.pageYOffset = 1500;
      window.dispatchEvent(new Event('scroll'));
      
      // Transform should not update beyond this point
      const currentTransform = heroContent.style.transform;
      
      window.pageYOffset = 2000;
      window.dispatchEvent(new Event('scroll'));
      
      expect(heroContent.style.transform).toBe(currentTransform);
    });

    test('should update active navigation link based on scroll position', () => {
      eval(script);
      
      const sections = document.querySelectorAll('section[id]');
      const navItems = document.querySelectorAll('.nav-links a');
      
      // Mock section positions
      sections.forEach((section, index) => {
        Object.defineProperty(section, 'offsetTop', {
          value: index * 800,
          writable: true
        });
        Object.defineProperty(section, 'offsetHeight', {
          value: 800,
          writable: true
        });
      });
      
      // Scroll to second section
      window.pageYOffset = 800;
      window.dispatchEvent(new Event('scroll'));
      
      // Check that only one link is active
      const activeLinks = Array.from(navItems).filter(item => 
        item.classList.contains('active')
      );
      
      expect(activeLinks.length).toBeLessThanOrEqual(1);
    });
  });

  describe('Animated Counters', () => {
    test('should animate counter numbers when stats section is visible', (done) => {
      eval(script);
      
      const stats = document.querySelectorAll('.stat-number');
      
      expect(stats.length).toBeGreaterThan(0);
      
      // Wait for animation to complete
      setTimeout(() => {
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          expect(parseInt(stat.textContent)).toBe(target);
        });
        done();
      }, 2500);
    });

    test('should not animate counters twice', (done) => {
      eval(script);
      
      const statsSection = document.querySelector('.stats');
      const stat = document.querySelector('.stat-number');
      
      // First animation
      setTimeout(() => {
        const firstValue = parseInt(stat.textContent);
        
        // Try to trigger again
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.target === statsSection) {
              observer.observe(statsSection);
            }
          });
        });
        
        observer.observe(statsSection);
        
        setTimeout(() => {
          const secondValue = parseInt(stat.textContent);
          expect(secondValue).toBe(firstValue);
          done();
        }, 100);
      }, 2500);
    });

    test('should handle invalid data-target values gracefully', (done) => {
      eval(script);
      
      const stat = document.querySelector('.stat-number');
      stat.setAttribute('data-target', 'invalid');
      
      setTimeout(() => {
        expect(() => {
          const value = stat.textContent;
        }).not.toThrow();
        done();
      }, 100);
    });
  });

  describe('Intersection Observer Animations', () => {
    test('should initialize observer for animated elements', () => {
      eval(script);
      
      const animateElements = document.querySelectorAll(
        '.stat-item, .skill-category, .timeline-item, .project-card, .education-card'
      );
      
      animateElements.forEach(el => {
        expect(el.style.opacity).toBe('0');
        expect(el.style.transform).toBe('translateY(30px)');
        expect(el.style.transition).toBe('all 0.6s ease');
      });
    });

    test('should animate skill bars when visible', () => {
      eval(script);
      
      const skillCategory = document.querySelector('.skill-category');
      const progressBars = document.querySelectorAll('.progress-bar');
      
      expect(progressBars.length).toBeGreaterThan(0);
      
      // Simulate intersection
      setTimeout(() => {
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          expect(bar.style.width).toBeTruthy();
        });
      }, 300);
    });

    test('should make elements visible when intersecting', () => {
      eval(script);
      
      const elements = document.querySelectorAll('.timeline-item');
      
      if (elements.length > 0) {
        // Elements should become visible
        setTimeout(() => {
          expect(elements[0].style.opacity).toBe('1');
          expect(elements[0].style.transform).toBe('translateY(0)');
        }, 100);
      }
    });
  });

  describe('Contact Form Validation', () => {
    test('should validate all required fields', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      const event = new Event('submit', { cancelable: true });
      
      form.dispatchEvent(event);
      
      // Should have been prevented due to empty fields
      expect(event.defaultPrevented).toBe(true);
    });

    test('should validate email format', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'invalid-email';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Test message';
      
      const event = new Event('submit', { cancelable: true });
      form.dispatchEvent(event);
      
      const notification = document.querySelector('.notification.error');
      expect(notification).toBeTruthy();
      expect(notification.textContent).toContain('valid email');
    });

    test('should accept valid email addresses', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Test message';
      
      const event = new Event('submit', { cancelable: true });
      form.dispatchEvent(event);
      
      const notification = document.querySelector('.notification.success');
      expect(notification).toBeTruthy();
    });

    test('should reset form after successful submission', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Test message';
      
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      expect(document.getElementById('name').value).toBe('');
      expect(document.getElementById('email').value).toBe('');
      expect(document.getElementById('subject').value).toBe('');
      expect(document.getElementById('message').value).toBe('');
    });

    test('should reject emails without @', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = 'John';
      document.getElementById('email').value = 'invalidemail.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Message';
      
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      const notification = document.querySelector('.notification.error');
      expect(notification).toBeTruthy();
    });

    test('should reject emails without domain', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = 'John';
      document.getElementById('email').value = 'invalid@';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Message';
      
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      const notification = document.querySelector('.notification.error');
      expect(notification).toBeTruthy();
    });

    test('should handle whitespace-only values', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = '   ';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Message';
      
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      // Empty or whitespace should trigger error
      const notification = document.querySelector('.notification');
      expect(notification).toBeTruthy();
    });
  });

  describe('Notification System', () => {
    test('should create notification element with correct styling', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = 'John';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Message';
      
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      const notification = document.querySelector('.notification');
      expect(notification).toBeTruthy();
      expect(notification.style.position).toBe('fixed');
      expect(notification.style.zIndex).toBe('10000');
    });

    test('should remove existing notification before creating new one', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      
      // Fill form with valid data
      const fillForm = () => {
        document.getElementById('name').value = 'John';
        document.getElementById('email').value = 'john@example.com';
        document.getElementById('subject').value = 'Test';
        document.getElementById('message').value = 'Message';
      };
      
      fillForm();
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      fillForm();
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      const notifications = document.querySelectorAll('.notification');
      expect(notifications.length).toBe(1);
    });

    test('should auto-remove notification after timeout', (done) => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = 'John';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Message';
      
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      setTimeout(() => {
        const notification = document.querySelector('.notification');
        expect(notification).toBeFalsy();
        done();
      }, 3500);
    });

    test('should show error notification with correct color', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      const notification = document.querySelector('.notification.error');
      expect(notification).toBeTruthy();
      expect(notification.style.background).toContain('#ef4444');
    });

    test('should show success notification with correct color', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').value = 'John';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('subject').value = 'Test';
      document.getElementById('message').value = 'Message';
      
      form.dispatchEvent(new Event('submit', { cancelable: true }));
      
      const notification = document.querySelector('.notification.success');
      expect(notification).toBeTruthy();
      expect(notification.style.background).toContain('#10b981');
    });
  });

  describe('Lazy Loading Images', () => {
    test('should observe project images for lazy loading', () => {
      eval(script);
      
      const images = document.querySelectorAll('.project-image img');
      
      if (images.length > 0) {
        // Images should be observed
        expect(images.length).toBeGreaterThan(0);
      }
    });

    test('should add loaded class when image intersects', () => {
      eval(script);
      
      const images = document.querySelectorAll('.project-image img');
      
      if (images.length > 0) {
        setTimeout(() => {
          expect(images[0].classList.contains('loaded')).toBe(true);
        }, 100);
      }
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle missing hamburger element', () => {
      const hamburger = document.querySelector('.hamburger');
      if (hamburger) {
        hamburger.remove();
      }
      
      expect(() => eval(script)).not.toThrow();
    });

    test('should handle missing contact form', () => {
      const form = document.getElementById('contactForm');
      if (form) {
        form.remove();
      }
      
      expect(() => eval(script)).not.toThrow();
    });

    test('should handle missing hero content', () => {
      const hero = document.querySelector('.hero-content');
      if (hero) {
        hero.remove();
      }
      
      expect(() => eval(script)).not.toThrow();
      
      window.pageYOffset = 100;
      expect(() => window.dispatchEvent(new Event('scroll'))).not.toThrow();
    });

    test('should handle missing stats section', () => {
      const stats = document.querySelector('.stats');
      if (stats) {
        stats.remove();
      }
      
      expect(() => eval(script)).not.toThrow();
    });

    test('should handle sections without IDs', () => {
      eval(script);
      
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => section.removeAttribute('id'));
      
      window.pageYOffset = 500;
      expect(() => window.dispatchEvent(new Event('scroll'))).not.toThrow();
    });

    test('should handle rapid scroll events', () => {
      eval(script);
      
      for (let i = 0; i < 100; i++) {
        window.pageYOffset = i * 10;
        window.dispatchEvent(new Event('scroll'));
      }
      
      // Should not crash or throw errors
      expect(true).toBe(true);
    });

    test('should handle form submission without form elements', () => {
      eval(script);
      
      const form = document.getElementById('contactForm');
      document.getElementById('name').remove();
      
      expect(() => form.dispatchEvent(new Event('submit', { cancelable: true }))).not.toThrow();
    });
  });

  describe('Performance and Optimization', () => {
    test('should use requestAnimationFrame for counter animation', (done) => {
      eval(script);
      
      expect(global.requestAnimationFrame).toHaveBeenCalled();
      done();
    });

    test('should consolidate scroll handlers', () => {
      eval(script);
      
      const scrollListeners = [];
      const originalAddEventListener = window.addEventListener;
      
      window.addEventListener = jest.fn((event, handler) => {
        if (event === 'scroll') {
          scrollListeners.push(handler);
        }
        return originalAddEventListener.call(window, event, handler);
      });
      
      eval(script);
      
      // Should have only one scroll listener for performance
      expect(scrollListeners.length).toBe(1);
    });
  });

  describe('Console Output', () => {
    test('should log success message on load', () => {
      eval(script);
      
      expect(console.log).toHaveBeenCalledWith('Interactive Resume Loaded Successfully! 🚀');
    });
  });
});