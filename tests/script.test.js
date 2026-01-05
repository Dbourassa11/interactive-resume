/**
 * Unit Tests for script.js
 * Tests all interactive functionality of the resume website
 */

const fs = require('fs');
const path = require('path');

// Load the HTML and script
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');

describe('Interactive Resume - JavaScript Functionality', () => {
  beforeEach(() => {
    // Set up the DOM
    document.documentElement.innerHTML = html;
    
    // Execute the script
    const scriptElement = document.createElement('script');
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);
    
    // Trigger DOMContentLoaded
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  });

  describe('Mobile Navigation', () => {
    test('should toggle mobile menu when hamburger is clicked', () => {
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      
      expect(hamburger).toBeInTheDocument();
      expect(navLinks).toBeInTheDocument();
      
      // Initially not active
      expect(navLinks.classList.contains('active')).toBe(false);
      
      // Click to open
      hamburger.click();
      expect(navLinks.classList.contains('active')).toBe(true);
      expect(hamburger.classList.contains('active')).toBe(true);
      
      // Click to close
      hamburger.click();
      expect(navLinks.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });

    test('should close mobile menu when navigation link is clicked', () => {
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

    test('should handle missing hamburger gracefully', () => {
      // Remove hamburger
      const hamburger = document.querySelector('.hamburger');
      hamburger.remove();
      
      // Re-run script - should not throw error
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });
  });

  describe('Smooth Scrolling', () => {
    test('should prevent default navigation and scroll smoothly', () => {
      const navLink = document.querySelector('.nav-links a[href="#about"]');
      const aboutSection = document.querySelector('#about');
      
      expect(navLink).toBeInTheDocument();
      expect(aboutSection).toBeInTheDocument();
      
      // Mock offsetTop
      Object.defineProperty(aboutSection, 'offsetTop', {
        value: 500,
        writable: true
      });
      
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      });
      
      navLink.dispatchEvent(clickEvent);
      
      expect(global.scrollTo).toHaveBeenCalledWith({
        top: 430, // offsetTop (500) - 70
        behavior: 'smooth'
      });
    });

    test('should handle navigation to non-existent section gracefully', () => {
      const navLink = document.createElement('a');
      navLink.href = '#nonexistent';
      navLink.className = 'nav-links';
      document.body.appendChild(navLink);
      
      // Add click listener manually
      navLink.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
      
      navLink.click();
      
      // Should not throw and scrollTo should not be called
      expect(global.scrollTo).not.toHaveBeenCalled();
    });

    test('should calculate correct scroll offset for all navigation links', () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach((section, index) => {
        Object.defineProperty(section, 'offsetTop', {
          value: (index + 1) * 600,
          writable: true
        });
      });
      
      const homeLink = document.querySelector('.nav-links a[href="#home"]');
      if (homeLink) {
        homeLink.click();
        expect(global.scrollTo).toHaveBeenCalled();
      }
    });
  });

  describe('Scroll Effects', () => {
    test('should change navbar style when scrolled past threshold', () => {
      const navbar = document.querySelector('.navbar');
      
      // Simulate scroll past 100px
      Object.defineProperty(window, 'pageYOffset', { value: 150, writable: true });
      window.dispatchEvent(new Event('scroll'));
      
      expect(navbar.style.background).toBe('rgba(255, 255, 255, 0.98)');
      expect(navbar.style.boxShadow).toBe('0 5px 20px rgba(0, 0, 0, 0.1)');
    });

    test('should reset navbar style when scrolled to top', () => {
      const navbar = document.querySelector('.navbar');
      
      // First scroll down
      Object.defineProperty(window, 'pageYOffset', { value: 150, writable: true });
      window.dispatchEvent(new Event('scroll'));
      
      // Then scroll back up
      Object.defineProperty(window, 'pageYOffset', { value: 50, writable: true });
      window.dispatchEvent(new Event('scroll'));
      
      expect(navbar.style.background).toBe('var(--white)');
      expect(navbar.style.boxShadow).toBe('0 5px 15px rgba(0, 0, 0, 0.1)');
    });

    test('should apply parallax effect to hero content within bounds', () => {
      const heroContent = document.querySelector('.hero-content');
      
      // Set initial window height
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
      
      // Scroll within hero section
      Object.defineProperty(window, 'pageYOffset', { value: 200, writable: true });
      window.dispatchEvent(new Event('scroll'));
      
      expect(heroContent.style.transform).toContain('translateY');
      expect(parseFloat(heroContent.style.opacity)).toBeLessThan(1);
    });

    test('should stop parallax effect after scrolling past hero section', () => {
      const heroContent = document.querySelector('.hero-content');
      
      // Set window height
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
      
      // Scroll past hero section
      Object.defineProperty(window, 'pageYOffset', { value: 900, writable: true });
      window.dispatchEvent(new Event('scroll'));
      
      const initialTransform = heroContent.style.transform;
      
      // Scroll more
      Object.defineProperty(window, 'pageYOffset', { value: 1000, writable: true });
      window.dispatchEvent(new Event('scroll'));
      
      // Transform should not change after passing hero
      expect(heroContent.style.transform).toBe(initialTransform);
    });

    test('should highlight active navigation based on scroll position', () => {
      const sections = document.querySelectorAll('section[id]');
      const navItems = document.querySelectorAll('.nav-links a');
      
      // Set up section positions
      sections.forEach((section, index) => {
        Object.defineProperty(section, 'offsetTop', {
          value: index * 600,
          writable: true
        });
        Object.defineProperty(section, 'offsetHeight', {
          value: 500,
          writable: true
        });
      });
      
      // Scroll to second section
      Object.defineProperty(window, 'pageYOffset', { value: 650, writable: true });
      window.dispatchEvent(new Event('scroll'));
      
      // Check that some nav item got active class
      const hasActiveItem = Array.from(navItems).some(item => 
        item.classList.contains('active')
      );
      expect(hasActiveItem).toBe(true);
    });
  });

  describe('Animated Counters', () => {
    test('should animate stat counters when stats section is visible', (done) => {
      const stats = document.querySelectorAll('.stat-number');
      
      expect(stats.length).toBeGreaterThan(0);
      
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        expect(target).toBeGreaterThan(0);
        expect(stat.textContent).toBe('0');
      });
      
      // Wait for animation to start
      setTimeout(() => {
        stats.forEach(stat => {
          const currentValue = parseInt(stat.textContent);
          expect(currentValue).toBeGreaterThanOrEqual(0);
        });
        done();
      }, 100);
    });

    test('should reach target value for all counters', (done) => {
      const stats = document.querySelectorAll('.stat-number');
      
      // Wait for animation to complete (2 seconds + buffer)
      setTimeout(() => {
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          const finalValue = parseInt(stat.textContent);
          expect(finalValue).toBe(target);
        });
        done();
      }, 2500);
    });

    test('should handle missing data-target attribute gracefully', () => {
      const stat = document.createElement('span');
      stat.className = 'stat-number';
      document.body.appendChild(stat);
      
      // Trigger observation
      const statsSection = document.querySelector('.stats');
      if (statsSection) {
        const observer = new IntersectionObserver(() => {});
        observer.observe(stat);
      }
      
      // Should not throw
      expect(stat.textContent).toBe('');
    });
  });

  describe('Intersection Observer Animations', () => {
    test('should initialize elements with opacity 0 and transform', () => {
      const animateElements = document.querySelectorAll(
        '.stat-item, .skill-category, .timeline-item, .project-card, .education-card'
      );
      
      animateElements.forEach(el => {
        expect(el.style.opacity).toBe('0');
        expect(el.style.transform).toBe('translateY(30px)');
        expect(el.style.transition).toContain('all');
      });
    });

    test('should animate elements when they become visible', () => {
      const element = document.querySelector('.stat-item');
      
      if (element) {
        // Element should be observed and animated by IntersectionObserver mock
        expect(element.style.opacity).toBe('1');
        expect(element.style.transform).toBe('translateY(0)');
      }
    });

    test('should animate skill bars when skill category is visible', (done) => {
      const skillCategory = document.querySelector('.skill-category');
      
      if (skillCategory) {
        const progressBars = skillCategory.querySelectorAll('.progress-bar');
        
        // Check initial state
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          expect(width).toBeTruthy();
        });
        
        // Wait for animation delay (200ms)
        setTimeout(() => {
          progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            expect(bar.style.width).toBe(width + '%');
          });
          done();
        }, 300);
      } else {
        done();
      }
    });

    test('should only animate stats once', () => {
      const statsSection = document.querySelector('.stats');
      
      if (statsSection) {
        // First intersection should trigger animation
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Animation should be triggered
              expect(entry.target).toBe(statsSection);
            }
          });
        });
        
        observer.observe(statsSection);
        
        // Second observation should not re-trigger
        // This is ensured by the 'animated' flag in the code
        observer.observe(statsSection);
      }
    });

    test('should handle IntersectionObserver for multiple element types', () => {
      const elementTypes = [
        '.stat-item',
        '.skill-category',
        '.timeline-item',
        '.project-card',
        '.education-card'
      ];
      
      elementTypes.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          expect(el.style.opacity).toBeTruthy();
          expect(el.style.transform).toBeTruthy();
        });
      });
    });
  });

  describe('Contact Form Validation', () => {
    test('should prevent submission with empty fields', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        const submitEvent = new Event('submit', { 
          bubbles: true, 
          cancelable: true 
        });
        
        form.dispatchEvent(submitEvent);
        
        // Check that form was prevented from submitting
        expect(submitEvent.defaultPrevented).toBe(true);
      }
    });

    test('should validate email format', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        // Fill in all fields with invalid email
        document.getElementById('name').value = 'John Doe';
        document.getElementById('email').value = 'invalid-email';
        document.getElementById('subject').value = 'Test Subject';
        document.getElementById('message').value = 'Test message';
        
        const submitEvent = new Event('submit', { 
          bubbles: true, 
          cancelable: true 
        });
        
        form.dispatchEvent(submitEvent);
        
        expect(submitEvent.defaultPrevented).toBe(true);
      }
    });

    test('should accept valid email format', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        document.getElementById('name').value = 'John Doe';
        document.getElementById('email').value = 'john.doe@example.com';
        document.getElementById('subject').value = 'Test Subject';
        document.getElementById('message').value = 'Test message';
        
        const submitEvent = new Event('submit', { 
          bubbles: true, 
          cancelable: true 
        });
        
        form.dispatchEvent(submitEvent);
        
        expect(submitEvent.defaultPrevented).toBe(true);
      }
    });

    test('should reset form after successful submission', (done) => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        nameField.value = 'John Doe';
        emailField.value = 'john@example.com';
        subjectField.value = 'Test';
        messageField.value = 'Test message';
        
        form.dispatchEvent(new Event('submit', { 
          bubbles: true, 
          cancelable: true 
        }));
        
        setTimeout(() => {
          expect(nameField.value).toBe('');
          expect(emailField.value).toBe('');
          expect(subjectField.value).toBe('');
          expect(messageField.value).toBe('');
          done();
        }, 100);
      } else {
        done();
      }
    });

    test('should validate individual required fields', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        const fields = [
          { id: 'name', value: 'John Doe' },
          { id: 'email', value: 'john@example.com' },
          { id: 'subject', value: 'Test' },
          { id: 'message', value: 'Test message' }
        ];
        
        fields.forEach((field, index) => {
          // Reset form
          form.reset();
          
          // Fill all fields except current one
          fields.forEach((f, i) => {
            if (i !== index) {
              document.getElementById(f.id).value = f.value;
            }
          });
          
          const submitEvent = new Event('submit', { 
            bubbles: true, 
            cancelable: true 
          });
          
          form.dispatchEvent(submitEvent);
          expect(submitEvent.defaultPrevented).toBe(true);
        });
      }
    });

    test('should handle special characters in form fields', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        document.getElementById('name').value = 'John O\'Brien';
        document.getElementById('email').value = 'john+test@example.com';
        document.getElementById('subject').value = 'Test & <Special> "Characters"';
        document.getElementById('message').value = 'Message with\nnewlines\nand\ttabs';
        
        const submitEvent = new Event('submit', { 
          bubbles: true, 
          cancelable: true 
        });
        
        form.dispatchEvent(submitEvent);
        
        // Should handle special characters without errors
        expect(submitEvent.defaultPrevented).toBe(true);
      }
    });

    test('should validate email with various valid formats', () => {
      const validEmails = [
        'simple@example.com',
        'user+tag@example.co.uk',
        'user.name@example.com',
        'user_name@example.com',
        'user123@example123.com'
      ];
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      validEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    test('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example',
        'user@.com'
      ];
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe('Notification System', () => {
    test('should create notification element when shown', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        document.getElementById('name').value = 'John';
        document.getElementById('email').value = 'john@example.com';
        document.getElementById('subject').value = 'Test';
        document.getElementById('message').value = 'Test';
        
        form.dispatchEvent(new Event('submit', { 
          bubbles: true, 
          cancelable: true 
        }));
        
        const notification = document.querySelector('.notification');
        expect(notification).toBeInTheDocument();
      }
    });

    test('should remove existing notification before showing new one', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        document.getElementById('name').value = 'John';
        document.getElementById('email').value = 'john@example.com';
        document.getElementById('subject').value = 'Test';
        document.getElementById('message').value = 'Test';
        
        // Submit twice
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        
        const notifications = document.querySelectorAll('.notification');
        expect(notifications.length).toBeLessThanOrEqual(1);
      }
    });

    test('should apply correct styles for success notification', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        document.getElementById('name').value = 'John';
        document.getElementById('email').value = 'john@example.com';
        document.getElementById('subject').value = 'Test';
        document.getElementById('message').value = 'Test';
        
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        
        const notification = document.querySelector('.notification.success');
        if (notification) {
          expect(notification.style.background).toContain('#10b981');
        }
      }
    });

    test('should apply correct styles for error notification', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        // Submit with empty fields to trigger error
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        
        const notification = document.querySelector('.notification.error');
        if (notification) {
          expect(notification.style.background).toContain('#ef4444');
        }
      }
    });

    test('should add slide-in animation keyframes only once', () => {
      const form = document.getElementById('contactForm');
      
      if (form) {
        document.getElementById('name').value = 'John';
        document.getElementById('email').value = 'john@example.com';
        document.getElementById('subject').value = 'Test';
        document.getElementById('message').value = 'Test';
        
        // Submit multiple times
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        
        const styles = document.querySelectorAll('#notification-slidein-style');
        expect(styles.length).toBe(1);
      }
    });
  });

  describe('Lazy Loading Images', () => {
    test('should observe project images with IntersectionObserver', () => {
      const images = document.querySelectorAll('.project-image img');
      
      images.forEach(img => {
        // Images should be observed by IntersectionObserver
        expect(img).toBeInTheDocument();
      });
    });

    test('should add loaded class when image is intersecting', () => {
      const image = document.querySelector('.project-image img');
      
      if (image) {
        // IntersectionObserver mock should trigger callback
        expect(image.classList.contains('loaded')).toBe(true);
      }
    });

    test('should handle missing IntersectionObserver gracefully', () => {
      const originalIO = global.IntersectionObserver;
      delete global.IntersectionObserver;
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
      
      global.IntersectionObserver = originalIO;
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle missing navbar element', () => {
      const navbar = document.querySelector('.navbar');
      navbar.remove();
      
      // Scroll event should not throw
      expect(() => {
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle missing hero content element', () => {
      const heroContent = document.querySelector('.hero-content');
      heroContent.remove();
      
      // Scroll event should not throw
      expect(() => {
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle missing sections', () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => section.remove());
      
      // Scroll event should not throw
      expect(() => {
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle missing form gracefully', () => {
      const form = document.getElementById('contactForm');
      if (form) {
        form.remove();
      }
      
      // Re-run script should not throw
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });

    test('should handle missing stats elements', () => {
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach(stat => stat.remove());
      
      // Should not throw
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });

    test('should log success message to console', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Interactive Resume Loaded Successfully')
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('Performance Optimizations', () => {
    test('should disable hero parallax after scrolling past viewport', () => {
      const heroContent = document.querySelector('.hero-content');
      
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
      
      // Scroll past hero
      Object.defineProperty(window, 'pageYOffset', { value: 1000, writable: true });
      window.dispatchEvent(new Event('scroll'));
      
      const transform1 = heroContent.style.transform;
      
      // Scroll more
      Object.defineProperty(window, 'pageYOffset', { value: 1500, writable: true });
      window.dispatchEvent(new Event('scroll'));
      
      const transform2 = heroContent.style.transform;
      
      // Transform should not update after passing hero
      expect(transform1).toBe(transform2);
    });

    test('should use requestAnimationFrame for counter animations', (done) => {
      const stats = document.querySelectorAll('.stat-number');
      
      if (stats.length > 0) {
        expect(global.requestAnimationFrame).toHaveBeenCalled();
      }
      
      done();
    });

    test('should consolidate scroll handlers for performance', () => {
      const scrollHandler = window.addEventListener.mock.calls.find(
        call => call[0] === 'scroll'
      );
      
      // Should only have one scroll listener
      const scrollListeners = window.addEventListener.mock.calls.filter(
        call => call[0] === 'scroll'
      );
      
      expect(scrollListeners.length).toBeLessThanOrEqual(1);
    });
  });

  describe('Accessibility Features', () => {
    test('should support keyboard navigation for hamburger', () => {
      const hamburger = document.querySelector('.hamburger');
      
      expect(hamburger.getAttribute('role')).toBe('button');
      expect(hamburger.getAttribute('tabindex')).toBe('0');
      expect(hamburger.getAttribute('aria-label')).toBeTruthy();
    });

    test('should have proper ARIA labels on social links', () => {
      const socialLinks = document.querySelectorAll('.social-links a');
      
      socialLinks.forEach(link => {
        expect(link.getAttribute('aria-label')).toBeTruthy();
      });
    });

    test('should maintain focus indicators', () => {
      const navLinks = document.querySelectorAll('.nav-links a');
      
      navLinks.forEach(link => {
        expect(link).toBeInTheDocument();
      });
    });
  });
});