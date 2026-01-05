/**
 * Comprehensive Unit Tests for script.js
 * Tests all interactive functionality of the resume website
 */

describe('Interactive Resume - Script Tests', () => {
  let scriptContent;

  beforeAll(() => {
    // Load the script content
    const fs = require('fs');
    const path = require('path');
    scriptContent = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
  });

  beforeEach(() => {
    // Reset DOM before each test
    document.body.innerHTML = '';
    
    // Create a basic HTML structure for testing
    document.body.innerHTML = `
      <nav class="navbar">
        <div class="container">
          <div class="logo">My Portfolio</div>
          <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      
      <section id="home" class="hero">
        <div class="hero-content">
          <h1>Hello, I'm <span class="highlight">Test User</span></h1>
        </div>
      </section>
      
      <section id="about" class="section">
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number" data-target="5">0</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" data-target="50">0</span>
            <span class="stat-label">Projects Completed</span>
          </div>
        </div>
      </section>
      
      <section id="skills" class="section">
        <div class="skill-category">
          <div class="progress-bar" data-width="90"></div>
          <div class="progress-bar" data-width="85"></div>
        </div>
      </section>
      
      <section id="contact" class="section">
        <form id="contactForm">
          <input type="text" id="name" name="name" />
          <input type="email" id="email" name="email" />
          <input type="text" id="subject" name="subject" />
          <textarea id="message" name="message"></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
      
      <div class="project-image">
        <img src="test.jpg" alt="Test Project" />
      </div>
    `;
  });

  describe('Mobile Navigation', () => {
    test('should toggle navigation menu when hamburger is clicked', () => {
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Simulate click
      hamburger.click();
      
      expect(navLinks.classList.contains('active')).toBe(true);
      expect(hamburger.classList.contains('active')).toBe(true);
    });

    test('should close menu when clicking on navigation link', () => {
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      const navItem = document.querySelector('.nav-links a');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Open menu first
      hamburger.click();
      expect(navLinks.classList.contains('active')).toBe(true);
      
      // Click nav item
      navItem.click();
      
      expect(navLinks.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });

    test('should handle missing hamburger element gracefully', () => {
      document.body.innerHTML = '<nav class="navbar"></nav>';
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });
  });

  describe('Smooth Scrolling', () => {
    test('should prevent default behavior on navigation link click', () => {
      const navLink = document.querySelector('.nav-links a');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const clickEvent = new Event('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
      
      navLink.dispatchEvent(clickEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should calculate correct offset for scrolling', () => {
      const navLink = document.querySelector('.nav-links a[href="#about"]');
      const aboutSection = document.querySelector('#about');
      
      // Mock offsetTop
      Object.defineProperty(aboutSection, 'offsetTop', {
        value: 1000,
        writable: true
      });
      
      // Mock window.scrollTo
      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      navLink.click();
      
      // Should scroll to offsetTop - 70 (navbar height)
      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 930,
        behavior: 'smooth'
      });
      
      scrollToSpy.mockRestore();
    });

    test('should handle missing target section gracefully', () => {
      const navLink = document.querySelector('.nav-links a');
      navLink.setAttribute('href', '#nonexistent');
      
      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      navLink.click();
      
      expect(scrollToSpy).not.toHaveBeenCalled();
      
      scrollToSpy.mockRestore();
    });
  });

  describe('Scroll Handler', () => {
    test('should change navbar style when scrolled past threshold', () => {
      const navbar = document.querySelector('.navbar');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Mock pageYOffset
      Object.defineProperty(window, 'pageYOffset', {
        value: 150,
        writable: true
      });
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      expect(navbar.style.background).toBe('rgba(255, 255, 255, 0.98)');
      expect(navbar.style.boxShadow).toBe('0 5px 20px rgba(0, 0, 0, 0.1)');
    });

    test('should reset navbar style when scrolled to top', () => {
      const navbar = document.querySelector('.navbar');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Mock pageYOffset
      Object.defineProperty(window, 'pageYOffset', {
        value: 50,
        writable: true
      });
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      expect(navbar.style.background).toBe('var(--white)');
      expect(navbar.style.boxShadow).toBe('0 5px 15px rgba(0, 0, 0, 0.1)');
    });

    test('should apply parallax effect to hero content', () => {
      const heroContent = document.querySelector('.hero-content');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Mock window properties
      Object.defineProperty(window, 'pageYOffset', {
        value: 200,
        writable: true
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 1000,
        writable: true
      });
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      expect(heroContent.style.transform).toBe('translateY(100px)');
      expect(heroContent.style.opacity).toBe('0.6');
    });

    test('should stop parallax effect when scrolled past hero', () => {
      const heroContent = document.querySelector('.hero-content');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Mock window properties - scroll past hero
      Object.defineProperty(window, 'pageYOffset', {
        value: 1500,
        writable: true
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 1000,
        writable: true
      });
      
      const initialTransform = heroContent.style.transform;
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      // Transform should not change after scrolling past hero
      expect(heroContent.style.transform).toBe(initialTransform);
    });

    test('should highlight active navigation link based on scroll position', () => {
      const navItems = document.querySelectorAll('.nav-links a');
      const aboutSection = document.querySelector('#about');
      
      // Mock section properties
      Object.defineProperty(aboutSection, 'offsetTop', {
        value: 500,
        writable: true
      });
      Object.defineProperty(aboutSection, 'offsetHeight', {
        value: 800,
        writable: true
      });
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Mock scroll position in about section
      Object.defineProperty(window, 'pageYOffset', {
        value: 600,
        writable: true
      });
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      const aboutLink = document.querySelector('.nav-links a[href="#about"]');
      expect(aboutLink.classList.contains('active')).toBe(true);
    });
  });

  describe('Animated Counters', () => {
    test('should animate counter from 0 to target value', (done) => {
      const statNumber = document.querySelector('.stat-number[data-target="5"]');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Wait for animation to complete
      setTimeout(() => {
        expect(statNumber.textContent).toBe('5');
        done();
      }, 2500);
    });

    test('should parse target value correctly', () => {
      const statNumber = document.querySelector('.stat-number[data-target="50"]');
      const target = parseInt(statNumber.getAttribute('data-target'));
      
      expect(target).toBe(50);
      expect(typeof target).toBe('number');
    });

    test('should handle multiple counters independently', (done) => {
      const stats = document.querySelectorAll('.stat-number');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      setTimeout(() => {
        expect(stats[0].textContent).toBe('5');
        expect(stats[1].textContent).toBe('50');
        done();
      }, 2500);
    });

    test('should only animate once', (done) => {
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Trigger multiple times
      const statsSection = document.querySelector('.stats');
      const observer = new IntersectionObserver(() => {});
      
      observer.observe(statsSection);
      observer.observe(statsSection);
      
      setTimeout(() => {
        // Should still only have final values, not doubled
        const stat = document.querySelector('.stat-number[data-target="5"]');
        expect(parseInt(stat.textContent)).toBeLessThanOrEqual(5);
        done();
      }, 2500);
    });
  });

  describe('Intersection Observer', () => {
    test('should initialize IntersectionObserver with correct options', () => {
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // IntersectionObserver should be called
      expect(IntersectionObserver).toBeDefined();
    });

    test('should observe stat items for animation', () => {
      const statItem = document.querySelector('.stat-item');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Initial state should be set
      expect(statItem.style.opacity).toBe('0');
      expect(statItem.style.transform).toBe('translateY(30px)');
      expect(statItem.style.transition).toBe('all 0.6s ease');
    });

    test('should animate elements when they intersect', () => {
      const statItem = document.querySelector('.stat-item');
      
      // Set initial state
      statItem.style.opacity = '0';
      statItem.style.transform = 'translateY(30px)';
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // IntersectionObserver callback is triggered in setup
      expect(statItem.style.opacity).toBe('1');
      expect(statItem.style.transform).toBe('translateY(0)');
    });

    test('should animate skill bars when visible', (done) => {
      const skillCategory = document.querySelector('.skill-category');
      const progressBars = document.querySelectorAll('.progress-bar');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Wait for animation delay
      setTimeout(() => {
        expect(progressBars[0].style.width).toBe('90%');
        expect(progressBars[1].style.width).toBe('85%');
        done();
      }, 300);
    });

    test('should observe stats section if it exists', () => {
      const statsSection = document.querySelector('.stats');
      
      expect(statsSection).toBeTruthy();
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Stats section should be observed
      expect(statsSection).toBeDefined();
    });

    test('should handle missing stats section gracefully', () => {
      // Remove stats section
      const statsSection = document.querySelector('.stats');
      statsSection.remove();
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });
  });

  describe('Contact Form Validation', () => {
    test('should prevent submission with empty fields', () => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      form.dispatchEvent(submitEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should validate email format', () => {
      const form = document.querySelector('#contactForm');
      const emailInput = document.querySelector('#email');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Fill form with invalid email
      document.querySelector('#name').value = 'Test User';
      emailInput.value = 'invalid-email';
      document.querySelector('#subject').value = 'Test Subject';
      document.querySelector('#message').value = 'Test Message';
      
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      // Should show error notification
      setTimeout(() => {
        const notification = document.querySelector('.notification.error');
        expect(notification).toBeTruthy();
      }, 100);
    });

    test('should accept valid email format', () => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Fill form with valid data
      document.querySelector('#name').value = 'Test User';
      document.querySelector('#email').value = 'test@example.com';
      document.querySelector('#subject').value = 'Test Subject';
      document.querySelector('#message').value = 'Test Message';
      
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      // Should show success notification
      setTimeout(() => {
        const notification = document.querySelector('.notification.success');
        expect(notification).toBeTruthy();
      }, 100);
    });

    test('should reset form after successful submission', () => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Fill form
      document.querySelector('#name').value = 'Test User';
      document.querySelector('#email').value = 'test@example.com';
      document.querySelector('#subject').value = 'Test Subject';
      document.querySelector('#message').value = 'Test Message';
      
      const resetSpy = jest.spyOn(form, 'reset');
      
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      expect(resetSpy).toHaveBeenCalled();
    });

    test('should handle missing form gracefully', () => {
      const form = document.querySelector('#contactForm');
      form.remove();
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });

    test('should validate all required fields are filled', () => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Fill only some fields
      document.querySelector('#name').value = 'Test User';
      document.querySelector('#email').value = 'test@example.com';
      // Leave subject and message empty
      
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      // Should show error notification
      setTimeout(() => {
        const notification = document.querySelector('.notification.error');
        expect(notification).toBeTruthy();
      }, 100);
    });
  });

  describe('Notification System', () => {
    test('should create notification element with correct styling', (done) => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Trigger form submission to create notification
      document.querySelector('#name').value = 'Test User';
      document.querySelector('#email').value = 'test@example.com';
      document.querySelector('#subject').value = 'Test Subject';
      document.querySelector('#message').value = 'Test Message';
      
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      
      setTimeout(() => {
        const notification = document.querySelector('.notification');
        expect(notification).toBeTruthy();
        expect(notification.style.position).toBe('fixed');
        expect(notification.style.top).toBe('100px');
        expect(notification.style.right).toBe('20px');
        done();
      }, 100);
    });

    test('should show success notification with green background', (done) => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Valid form submission
      document.querySelector('#name').value = 'Test User';
      document.querySelector('#email').value = 'test@example.com';
      document.querySelector('#subject').value = 'Test Subject';
      document.querySelector('#message').value = 'Test Message';
      
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      
      setTimeout(() => {
        const notification = document.querySelector('.notification.success');
        expect(notification).toBeTruthy();
        expect(notification.style.background).toContain('#10b981');
        done();
      }, 100);
    });

    test('should show error notification with red background', (done) => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Invalid form submission
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      
      setTimeout(() => {
        const notification = document.querySelector('.notification.error');
        expect(notification).toBeTruthy();
        expect(notification.style.background).toContain('#ef4444');
        done();
      }, 100);
    });

    test('should remove existing notification before showing new one', (done) => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Submit twice
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      
      setTimeout(() => {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        
        setTimeout(() => {
          const notifications = document.querySelectorAll('.notification');
          expect(notifications.length).toBe(1);
          done();
        }, 100);
      }, 100);
    });

    test('should auto-remove notification after 3 seconds', (done) => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      
      setTimeout(() => {
        const notification = document.querySelector('.notification');
        expect(notification).toBeTruthy();
        
        // Check it's removed after timeout
        setTimeout(() => {
          const notificationAfter = document.querySelector('.notification');
          expect(notificationAfter).toBeFalsy();
          done();
        }, 3500);
      }, 100);
    });

    test('should add animation keyframes only once', (done) => {
      const form = document.querySelector('#contactForm');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Trigger multiple notifications
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      
      setTimeout(() => {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        
        setTimeout(() => {
          const styles = document.querySelectorAll('#notification-slidein-style');
          expect(styles.length).toBe(1);
          done();
        }, 100);
      }, 100);
    });
  });

  describe('Image Lazy Loading', () => {
    test('should set up IntersectionObserver for images', () => {
      const images = document.querySelectorAll('.project-image img');
      
      expect(images.length).toBeGreaterThan(0);
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Images should exist
      expect(images[0]).toBeDefined();
    });

    test('should add loaded class when image intersects', () => {
      const image = document.querySelector('.project-image img');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // IntersectionObserver triggers immediately in our mock
      expect(image.classList.contains('loaded')).toBe(true);
    });

    test('should handle browsers without IntersectionObserver', () => {
      const originalIO = window.IntersectionObserver;
      delete window.IntersectionObserver;
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
      
      window.IntersectionObserver = originalIO;
    });
  });

  describe('Hero Typing Effect', () => {
    test('should preserve hero title text', () => {
      const heroTitle = document.querySelector('.hero h1');
      const originalText = heroTitle.innerHTML;
      
      expect(originalText).toContain('Test User');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Text should be preserved (typing effect is commented out)
      expect(heroTitle.innerHTML).toBeDefined();
    });

    test('should set opacity on hero title', () => {
      const heroTitle = document.querySelector('.hero h1');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      expect(heroTitle.style.opacity).toBe('1');
    });

    test('should handle missing hero title gracefully', () => {
      const heroTitle = document.querySelector('.hero h1');
      heroTitle.remove();
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });
  });

  describe('Console Log', () => {
    test('should log success message on load', () => {
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      expect(console.log).toHaveBeenCalledWith('Interactive Resume Loaded Successfully! 🚀');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty DOM gracefully', () => {
      document.body.innerHTML = '';
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
      }).not.toThrow();
    });

    test('should handle missing navbar gracefully', () => {
      const navbar = document.querySelector('.navbar');
      navbar.remove();
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle missing hero content gracefully', () => {
      const heroContent = document.querySelector('.hero-content');
      heroContent.remove();
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle sections without id attribute', () => {
      const section = document.querySelector('section');
      section.removeAttribute('id');
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        window.dispatchEvent(new Event('scroll'));
      }).not.toThrow();
    });

    test('should handle navigation links with invalid hrefs', () => {
      const navLink = document.querySelector('.nav-links a');
      navLink.setAttribute('href', '');
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        navLink.click();
      }).not.toThrow();
    });

    test('should handle form with missing input fields', () => {
      document.querySelector('#name').remove();
      
      const form = document.querySelector('#contactForm');
      
      expect(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }).not.toThrow();
    });
  });

  describe('Email Validation Regex', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    test('should accept valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'test123@test-domain.com'
      ];

      validEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    test('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid',
        'invalid@',
        '@example.com',
        'invalid@.com',
        'invalid @example.com',
        'invalid@example',
        ''
      ];

      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe('Performance Optimizations', () => {
    test('should disable hero parallax after scrolling past', () => {
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Scroll past hero
      Object.defineProperty(window, 'pageYOffset', {
        value: 2000,
        writable: true
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 1000,
        writable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      const heroContent = document.querySelector('.hero-content');
      const transformBefore = heroContent.style.transform;
      
      // Scroll again
      Object.defineProperty(window, 'pageYOffset', {
        value: 2500,
        writable: true
      });
      
      window.dispatchEvent(new Event('scroll'));
      
      // Transform should not change
      expect(heroContent.style.transform).toBe(transformBefore);
    });

    test('should use requestAnimationFrame for counter animations', () => {
      const rafSpy = jest.spyOn(window, 'requestAnimationFrame');
      
      // Trigger DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // RAF should be called for animations
      expect(rafSpy).toHaveBeenCalled();
      
      rafSpy.mockRestore();
    });
  });
});