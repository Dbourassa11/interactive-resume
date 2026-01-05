/**
 * Integration Tests
 * Tests complete user workflows and interactions between components
 */

describe('Integration - Complete User Journey', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar">
        <div class="container">
          <div class="logo">My Portfolio</div>
          <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
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
        <div class="hero-content">Hero</div>
      </section>
      <section id="about" class="section">
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number" data-target="5">0</span>
          </div>
        </div>
        <div class="skill-category">
          <div class="progress-bar" data-width="90"></div>
        </div>
      </section>
      <section id="contact" class="section">
        <form id="contactForm">
          <input type="text" id="name">
          <input type="email" id="email">
          <input type="text" id="subject">
          <textarea id="message"></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    `;

    // Setup section positions
    const home = document.querySelector('#home');
    const about = document.querySelector('#about');
    const contact = document.querySelector('#contact');
    
    Object.defineProperty(home, 'offsetTop', { value: 0 });
    Object.defineProperty(home, 'offsetHeight', { value: 500 });
    Object.defineProperty(about, 'offsetTop', { value: 500 });
    Object.defineProperty(about, 'offsetHeight', { value: 500 });
    Object.defineProperty(contact, 'offsetTop', { value: 1000 });
    Object.defineProperty(contact, 'offsetHeight', { value: 500 });

    window.scrollTo = jest.fn();

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should handle complete mobile navigation workflow', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItem = document.querySelector('.nav-links a');

    // Open menu
    hamburger.click();
    expect(navLinks.classList.contains('active')).toBe(true);

    // Click nav item
    navItem.click();
    expect(navLinks.classList.contains('active')).toBe(false);
    expect(window.scrollTo).toHaveBeenCalled();
  });

  test('should handle scroll with all effects active', () => {
    const navbar = document.querySelector('.navbar');
    const heroContent = document.querySelector('.hero-content');
    
    triggerScroll(150);
    
    expect(navbar.style.background).toBe('rgba(255, 255, 255, 0.98)');
    expect(heroContent.style.transform).toBeTruthy();
  });

  test('should animate elements when scrolling through sections', async () => {
    triggerScroll(550);
    
    const activeNavItem = document.querySelector('.nav-links a.active');
    expect(activeNavItem.getAttribute('href')).toBe('#about');
    
    await waitFor(250);
    
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar.style.width).toBe('90%');
  });

  test('should handle form submission with validation', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Try invalid submission
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    let notification = document.querySelector('.notification');
    expect(notification.textContent).toBe('Please fill in all fields');

    // Valid submission
    nameInput.value = 'John';
    emailInput.value = 'john@example.com';
    subjectInput.value = 'Test';
    messageInput.value = 'Message';
    
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    notification = document.querySelector('.notification');
    expect(notification.textContent).toContain('Thank you');
  });

  test('should handle rapid user interactions', () => {
    const hamburger = document.querySelector('.hamburger');
    
    expect(() => {
      for (let i = 0; i < 10; i++) {
        hamburger.click();
      }
    }).not.toThrow();
  });

  test('should maintain state consistency during navigation', () => {
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems[0].click();
    triggerScroll(50);
    expect(navItems[0].classList.contains('active')).toBe(true);
    
    triggerScroll(550);
    expect(navItems[0].classList.contains('active')).toBe(false);
    expect(navItems[1].classList.contains('active')).toBe(true);
  });
});

describe('Integration - Performance Under Load', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar">
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
        </ul>
      </nav>
      <div class="hero-content">Hero</div>
      <section id="home">Home</section>
    `;

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should handle rapid scroll events', () => {
    const startTime = Date.now();
    
    for (let i = 0; i < 100; i++) {
      triggerScroll(i * 5);
    }
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(1000);
  });

  test('should handle multiple simultaneous interactions', () => {
    const navbar = document.querySelector('.navbar');
    
    expect(() => {
      triggerScroll(100);
      triggerScroll(200);
      triggerScroll(300);
      
      expect(navbar.style.background).toBeTruthy();
    }).not.toThrow();
  });
});

describe('Integration - Accessibility Workflow', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar">
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <div class="hamburger" role="button" tabindex="0">
          <span></span>
        </div>
      </nav>
      <section id="home">Home</section>
      <section id="about">About</section>
      <form id="contactForm">
        <label for="email">Email</label>
        <input type="email" id="email">
        <button type="submit">Submit</button>
      </form>
    `;

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should maintain focus management', () => {
    const hamburger = document.querySelector('.hamburger');
    expect(hamburger.getAttribute('role')).toBe('button');
    expect(hamburger.getAttribute('tabindex')).toBe('0');
  });

  test('should have proper ARIA labels', () => {
    const hamburger = document.querySelector('.hamburger');
    expect(hamburger.hasAttribute('aria-label')).toBe(true);
  });

  test('should handle keyboard navigation', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      expect(() => {
        link.focus();
        link.click();
      }).not.toThrow();
    });
  });
});

describe('Integration - Error Recovery', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <form id="contactForm">
        <input type="text" id="name">
        <input type="email" id="email">
        <input type="text" id="subject">
        <textarea id="message"></textarea>
      </form>
    `;

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should recover from invalid form input', () => {
    const form = document.getElementById('contactForm');
    
    // Submit with invalid email
    document.getElementById('name').value = 'John';
    document.getElementById('email').value = 'invalid';
    document.getElementById('subject').value = 'Test';
    document.getElementById('message').value = 'Message';
    
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    let notification = document.querySelector('.notification');
    expect(notification.classList.contains('error')).toBe(true);
    
    // Fix and resubmit
    document.getElementById('email').value = 'valid@example.com';
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    notification = document.querySelector('.notification');
    expect(notification.classList.contains('success')).toBe(true);
  });

  test('should handle missing elements gracefully', () => {
    document.body.innerHTML = '<div>Minimal content</div>';
    
    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
      triggerScroll(100);
    }).not.toThrow();
  });

  test('should continue working after notification removal', async () => {
    const form = document.getElementById('contactForm');
    
    document.getElementById('name').value = 'John';
    document.getElementById('email').value = 'john@example.com';
    document.getElementById('subject').value = 'Test';
    document.getElementById('message').value = 'Message';
    
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    await waitFor(3400);
    
    // Submit again after notification is removed
    document.getElementById('name').value = 'Jane';
    document.getElementById('email').value = 'jane@example.com';
    document.getElementById('subject').value = 'Test 2';
    document.getElementById('message').value = 'Message 2';
    
    expect(() => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    }).not.toThrow();
  });
});

describe('Integration - Multi-Device Simulation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar">
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
        </ul>
        <div class="hamburger">
          <span></span>
        </div>
      </nav>
      <div class="hero-content">Hero</div>
      <section id="home">Home</section>
    `;

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should adapt to different viewport heights', () => {
    Object.defineProperty(window, 'innerHeight', { value: 600, writable: true });
    triggerScroll(300);
    
    Object.defineProperty(window, 'innerHeight', { value: 1200, writable: true });
    triggerScroll(600);
    
    expect(true).toBe(true); // Should not throw
  });

  test('should handle mobile viewport width', () => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
    
    const hamburger = document.querySelector('.hamburger');
    hamburger.click();
    
    expect(document.querySelector('.nav-links').classList.contains('active')).toBe(true);
  });
});

describe('Integration - Data Flow', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="stats">
        <span class="stat-number" data-target="100">0</span>
      </div>
      <div class="skill-category">
        <div class="progress-bar" data-width="85"></div>
      </div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should propagate data from HTML to JavaScript', async () => {
    const stat = document.querySelector('.stat-number');
    const targetValue = parseInt(stat.getAttribute('data-target'));
    
    expect(targetValue).toBe(100);
    
    await waitFor(2100);
    expect(parseInt(stat.textContent)).toBe(100);
  });

  test('should use data attributes for animations', async () => {
    await waitFor(250);
    
    const progressBar = document.querySelector('.progress-bar');
    const width = progressBar.getAttribute('data-width');
    
    expect(progressBar.style.width).toBe(`${width}%`);
  });
});