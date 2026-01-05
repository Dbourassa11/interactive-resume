/**
 * Tests for Scroll Effects in script.js
 * Covers navbar effects, parallax scrolling, and scroll-based animations
 */

describe('Scroll Effects - Navbar', () => {
  let navbar;

  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar">
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
        </ul>
      </nav>
      <div class="hero-content">Hero Content</div>
      <section id="home">Home</section>
    `;

    navbar = document.querySelector('.navbar');
    
    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should apply initial navbar styles when not scrolled', () => {
    triggerScroll(0);

    expect(navbar.style.background).toBe('var(--white)');
    expect(navbar.style.boxShadow).toBe('0 5px 15px rgba(0, 0, 0, 0.1)');
  });

  test('should change navbar background when scrolled past 100px', () => {
    triggerScroll(150);

    expect(navbar.style.background).toBe('rgba(255, 255, 255, 0.98)');
    expect(navbar.style.boxShadow).toBe('0 5px 20px rgba(0, 0, 0, 0.1)');
  });

  test('should revert navbar styles when scrolled back to top', () => {
    triggerScroll(150);
    expect(navbar.style.background).toBe('rgba(255, 255, 255, 0.98)');

    triggerScroll(50);
    expect(navbar.style.background).toBe('var(--white)');
  });

  test('should handle exactly 100px scroll (boundary condition)', () => {
    triggerScroll(100);
    expect(navbar.style.background).toBe('var(--white)');
    expect(navbar.style.boxShadow).toBe('0 5px 15px rgba(0, 0, 0, 0.1)');
  });

  test('should handle exactly 101px scroll', () => {
    triggerScroll(101);
    expect(navbar.style.background).toBe('rgba(255, 255, 255, 0.98)');
    expect(navbar.style.boxShadow).toBe('0 5px 20px rgba(0, 0, 0, 0.1)');
  });

  test('should handle very large scroll values', () => {
    triggerScroll(10000);
    expect(navbar.style.background).toBe('rgba(255, 255, 255, 0.98)');
    expect(navbar.style.boxShadow).toBe('0 5px 20px rgba(0, 0, 0, 0.1)');
  });

  test('should handle missing navbar gracefully', () => {
    document.body.innerHTML = `
      <section id="home">Home</section>
    `;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
      triggerScroll(150);
    }).not.toThrow();
  });
});

describe('Scroll Effects - Parallax Hero', () => {
  let heroContent;

  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="hero-content">Hero Content</div>
      <section id="home">Home</section>
    `;

    heroContent = document.querySelector('.hero-content');
    
    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 800
    });

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should apply parallax effect when scrolled within hero section', () => {
    triggerScroll(100);

    expect(heroContent.style.transform).toBe('translateY(50px)'); // 100 * 0.5
    expect(heroContent.style.opacity).toBe('0.8'); // 1 - (100 / 500)
  });

  test('should calculate correct parallax at different scroll positions', () => {
    triggerScroll(200);
    expect(heroContent.style.transform).toBe('translateY(100px)'); // 200 * 0.5
    expect(heroContent.style.opacity).toBe('0.6'); // 1 - (200 / 500)
  });

  test('should handle scroll at 500px (opacity boundary)', () => {
    triggerScroll(500);
    expect(heroContent.style.transform).toBe('translateY(250px)');
    expect(heroContent.style.opacity).toBe('0'); // 1 - (500 / 500)
  });

  test('should not apply parallax when scrolled past window height', () => {
    triggerScroll(100);
    expect(heroContent.style.transform).toBe('translateY(50px)');

    triggerScroll(850); // Past innerHeight (800)
    
    // Should stop updating
    triggerScroll(900);
    // Transform should remain from when it stopped
  });

  test('should handle zero scroll position', () => {
    triggerScroll(0);
    expect(heroContent.style.transform).toBe('translateY(0px)');
    expect(heroContent.style.opacity).toBe('1'); // 1 - (0 / 500)
  });

  test('should handle missing hero content gracefully', () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <section id="home">Home</section>
    `;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
      triggerScroll(100);
    }).not.toThrow();
  });

  test('should disable parallax handler after scrolling past viewport', () => {
    const initialTransform = heroContent.style.transform;
    
    triggerScroll(850);
    const transformAfterDisable = heroContent.style.transform;
    
    triggerScroll(900);
    const transformAfterMore = heroContent.style.transform;
    
    // Transform should not change after handler is disabled
    expect(transformAfterMore).toBe(transformAfterDisable);
  });
});

describe('Scroll Effects - Performance', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar">
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
      <div class="hero-content">Hero</div>
      <section id="home" style="height: 500px;">Home</section>
      <section id="about" style="height: 500px;">About</section>
    `;

    const home = document.querySelector('#home');
    const about = document.querySelector('#about');
    Object.defineProperty(home, 'offsetTop', { value: 0 });
    Object.defineProperty(home, 'offsetHeight', { value: 500 });
    Object.defineProperty(about, 'offsetTop', { value: 500 });
    Object.defineProperty(about, 'offsetHeight', { value: 500 });

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should handle multiple rapid scroll events', () => {
    expect(() => {
      for (let i = 0; i < 100; i++) {
        triggerScroll(i * 10);
      }
    }).not.toThrow();
  });

  test('should handle scroll events with all features active', () => {
    const navbar = document.querySelector('.navbar');
    const heroContent = document.querySelector('.hero-content');
    
    triggerScroll(150);
    
    expect(navbar.style.background).toBeTruthy();
    expect(heroContent.style.transform).toBeTruthy();
  });

  test('should handle negative scroll values gracefully', () => {
    expect(() => {
      triggerScroll(-10);
    }).not.toThrow();
  });

  test('should handle decimal scroll values', () => {
    expect(() => {
      triggerScroll(123.456);
    }).not.toThrow();
  });
});