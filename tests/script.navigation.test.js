/**
 * Tests for Navigation functionality in script.js
 * Covers mobile menu, smooth scrolling, and active state management
 */

describe('Navigation - Mobile Menu', () => {
  let hamburger, navLinks, navItems;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <nav class="navbar">
        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <section id="home" style="height: 500px;">Home Section</section>
      <section id="about" style="height: 500px;">About Section</section>
      <section id="contact" style="height: 500px;">Contact Section</section>
    `;

    // Load the script
    require('../script.js');
    triggerDOMContentLoaded();

    hamburger = document.querySelector('.hamburger');
    navLinks = document.querySelector('.nav-links');
    navItems = document.querySelectorAll('.nav-links a');
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should toggle mobile menu when hamburger is clicked', () => {
    expect(navLinks.classList.contains('active')).toBe(false);
    expect(hamburger.classList.contains('active')).toBe(false);

    hamburger.click();

    expect(navLinks.classList.contains('active')).toBe(true);
    expect(hamburger.classList.contains('active')).toBe(true);
  });

  test('should close mobile menu on second hamburger click', () => {
    hamburger.click();
    expect(navLinks.classList.contains('active')).toBe(true);

    hamburger.click();
    expect(navLinks.classList.contains('active')).toBe(false);
    expect(hamburger.classList.contains('active')).toBe(false);
  });

  test('should close mobile menu when nav link is clicked', () => {
    hamburger.click();
    expect(navLinks.classList.contains('active')).toBe(true);

    navItems[0].click();

    expect(navLinks.classList.contains('active')).toBe(false);
    expect(hamburger.classList.contains('active')).toBe(false);
  });

  test('should close menu for all nav items', () => {
    navItems.forEach((item, index) => {
      hamburger.click();
      expect(navLinks.classList.contains('active')).toBe(true);

      item.click();

      expect(navLinks.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });
  });

  test('should handle missing hamburger gracefully', () => {
    document.body.innerHTML = `
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
      </ul>
    `;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });
});

describe('Navigation - Smooth Scrolling', () => {
  let navItems, sections;

  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar">
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <section id="home" style="height: 500px;">Home Section</section>
      <section id="about" style="height: 500px;">About Section</section>
      <section id="contact" style="height: 500px;">Contact Section</section>
    `;

    // Mock window.scrollTo
    window.scrollTo = jest.fn();

    // Mock offsetTop
    document.querySelector('#home').offsetTop = 0;
    document.querySelector('#about').offsetTop = 500;
    document.querySelector('#contact').offsetTop = 1000;

    require('../script.js');
    triggerDOMContentLoaded();

    navItems = document.querySelectorAll('.nav-links a');
    sections = document.querySelectorAll('section[id]');
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should prevent default navigation behavior', () => {
    const preventDefault = jest.fn();
    const clickEvent = new MouseEvent('click', { bubbles: true });
    clickEvent.preventDefault = preventDefault;

    navItems[0].dispatchEvent(clickEvent);

    expect(preventDefault).toHaveBeenCalled();
  });

  test('should scroll to correct section with offset', () => {
    navItems[1].click(); // Click "About" link

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 430, // 500 (offsetTop) - 70 (offset)
      behavior: 'smooth'
    });
  });

  test('should handle scroll to first section', () => {
    navItems[0].click(); // Click "Home" link

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: -70, // 0 (offsetTop) - 70 (offset)
      behavior: 'smooth'
    });
  });

  test('should handle scroll to last section', () => {
    navItems[2].click(); // Click "Contact" link

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 930, // 1000 (offsetTop) - 70 (offset)
      behavior: 'smooth'
    });
  });

  test('should handle invalid target gracefully', () => {
    const invalidLink = document.createElement('a');
    invalidLink.setAttribute('href', '#nonexistent');
    document.querySelector('.nav-links').appendChild(invalidLink);

    expect(() => {
      invalidLink.click();
    }).not.toThrow();

    // Should not scroll if target doesn't exist
    const callCount = window.scrollTo.mock.calls.length;
    invalidLink.click();
    expect(window.scrollTo.mock.calls.length).toBe(callCount);
  });
});

describe('Navigation - Active State', () => {
  let navItems, sections;

  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar">
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <section id="home" style="height: 500px;">Home</section>
      <section id="about" style="height: 500px;">About</section>
      <section id="contact" style="height: 500px;">Contact</section>
    `;

    // Setup section positions
    const home = document.querySelector('#home');
    const about = document.querySelector('#about');
    const contact = document.querySelector('#contact');

    Object.defineProperty(home, 'offsetTop', { value: 0, writable: true });
    Object.defineProperty(home, 'offsetHeight', { value: 500, writable: true });
    Object.defineProperty(about, 'offsetTop', { value: 500, writable: true });
    Object.defineProperty(about, 'offsetHeight', { value: 500, writable: true });
    Object.defineProperty(contact, 'offsetTop', { value: 1000, writable: true });
    Object.defineProperty(contact, 'offsetHeight', { value: 500, writable: true });

    require('../script.js');
    triggerDOMContentLoaded();

    navItems = document.querySelectorAll('.nav-links a');
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should highlight home nav when scrolled to home section', () => {
    triggerScroll(50);

    expect(navItems[0].classList.contains('active')).toBe(true);
    expect(navItems[1].classList.contains('active')).toBe(false);
    expect(navItems[2].classList.contains('active')).toBe(false);
  });

  test('should highlight about nav when scrolled to about section', () => {
    triggerScroll(550);

    expect(navItems[0].classList.contains('active')).toBe(false);
    expect(navItems[1].classList.contains('active')).toBe(true);
    expect(navItems[2].classList.contains('active')).toBe(false);
  });

  test('should highlight contact nav when scrolled to contact section', () => {
    triggerScroll(1050);

    expect(navItems[0].classList.contains('active')).toBe(false);
    expect(navItems[1].classList.contains('active')).toBe(false);
    expect(navItems[2].classList.contains('active')).toBe(true);
  });

  test('should remove active class from all items before adding to current', () => {
    navItems[0].classList.add('active');
    navItems[1].classList.add('active');

    triggerScroll(550);

    const activeCount = Array.from(navItems).filter(item => 
      item.classList.contains('active')
    ).length;

    expect(activeCount).toBe(1);
  });
});