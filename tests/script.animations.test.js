/**
 * Tests for Animation functionality in script.js
 * Covers counter animations, intersection observer, and element animations
 */

describe('Counter Animations', () => {
  let stats;

  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number" data-target="5">0</span>
          <span class="stat-label">Years</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" data-target="50">0</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" data-target="100">0</span>
          <span class="stat-label">Clients</span>
        </div>
      </div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();

    stats = document.querySelectorAll('.stat-number');
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should initialize stat counters with zero', () => {
    stats.forEach(stat => {
      expect(stat.textContent).toBe('0');
    });
  });

  test('should have correct data-target attributes', () => {
    expect(stats[0].getAttribute('data-target')).toBe('5');
    expect(stats[1].getAttribute('data-target')).toBe('50');
    expect(stats[2].getAttribute('data-target')).toBe('100');
  });

  test('should animate counters when stats section becomes visible', async () => {
    // Counter animation is triggered by IntersectionObserver
    // Our mock automatically triggers it
    
    await waitFor(100);
    
    stats.forEach(stat => {
      const currentValue = parseInt(stat.textContent);
      expect(currentValue).toBeGreaterThan(0);
    });
  });

  test('should reach target values', async () => {
    await waitFor(2100); // Animation duration is 2000ms
    
    expect(stats[0].textContent).toBe('5');
    expect(stats[1].textContent).toBe('50');
    expect(stats[2].textContent).toBe('100');
  });

  test('should animate only once (not repeat on multiple intersections)', async () => {
    await waitFor(2100);
    
    expect(stats[0].textContent).toBe('5');
    
    // Trigger intersection again - should not restart
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver(() => {});
    observer.observe(statsSection);
    
    await waitFor(100);
    
    // Values should remain the same
    expect(stats[0].textContent).toBe('5');
  });

  test('should handle missing stats section gracefully', () => {
    document.body.innerHTML = `<nav class="navbar"></nav>`;
    
    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });

  test('should handle stats with zero target', () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number" data-target="0">0</span>
        </div>
      </div>
    `;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });

  test('should handle negative data-target values', () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number" data-target="-10">0</span>
        </div>
      </div>
    `;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });

  test('should handle invalid data-target values', () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number" data-target="invalid">0</span>
        </div>
      </div>
    `;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });

  test('should handle very large target values', async () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number" data-target="10000">0</span>
        </div>
      </div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();

    const stat = document.querySelector('.stat-number');
    
    await waitFor(2100);
    expect(stat.textContent).toBe('10000');
  });
});

describe('Intersection Observer - Element Animations', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="stat-item">Stat Item</div>
      <div class="skill-category">Skill Category</div>
      <div class="timeline-item">Timeline Item</div>
      <div class="project-card">Project Card</div>
      <div class="education-card">Education Card</div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should set initial animation state for all animate elements', () => {
    const elements = document.querySelectorAll('.stat-item, .skill-category, .timeline-item, .project-card, .education-card');
    
    elements.forEach(el => {
      expect(el.style.opacity).toBe('0');
      expect(el.style.transform).toBe('translateY(30px)');
      expect(el.style.transition).toBe('all 0.6s ease');
    });
  });

  test('should animate elements when they intersect', () => {
    const elements = document.querySelectorAll('.stat-item, .skill-category, .timeline-item, .project-card, .education-card');
    
    // IntersectionObserver mock automatically triggers
    elements.forEach(el => {
      expect(el.style.opacity).toBe('1');
      expect(el.style.transform).toBe('translateY(0)');
    });
  });

  test('should handle multiple elements of same type', () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="project-card">Project 1</div>
      <div class="project-card">Project 2</div>
      <div class="project-card">Project 3</div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();

    const cards = document.querySelectorAll('.project-card');
    expect(cards.length).toBe(3);

    cards.forEach(card => {
      expect(card.style.opacity).toBe('1');
      expect(card.style.transform).toBe('translateY(0)');
    });
  });

  test('should handle no animatable elements', () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div>Regular div</div>
    `;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });
});

describe('Intersection Observer - Skill Bars', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="skill-category">
        <h3>Skills</h3>
        <div class="progress-bar" data-width="90"></div>
        <div class="progress-bar" data-width="75"></div>
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

  test('should animate skill bars when skill category intersects', async () => {
    await waitFor(250); // Wait for setTimeout delay

    const progressBars = document.querySelectorAll('.progress-bar');
    
    expect(progressBars[0].style.width).toBe('90%');
    expect(progressBars[1].style.width).toBe('75%');
    expect(progressBars[2].style.width).toBe('85%');
  });

  test('should handle skill category without progress bars', () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="skill-category">
        <h3>Skills</h3>
      </div>
    `;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });

  test('should handle progress bars with 0% width', async () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="skill-category">
        <div class="progress-bar" data-width="0"></div>
      </div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();

    await waitFor(250);

    const bar = document.querySelector('.progress-bar');
    expect(bar.style.width).toBe('0%');
  });

  test('should handle progress bars with 100% width', async () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="skill-category">
        <div class="progress-bar" data-width="100"></div>
      </div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();

    await waitFor(250);

    const bar = document.querySelector('.progress-bar');
    expect(bar.style.width).toBe('100%');
  });

  test('should handle invalid width values gracefully', async () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="skill-category">
        <div class="progress-bar" data-width="invalid"></div>
      </div>
    `;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });

  test('should handle multiple skill categories', async () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="skill-category">
        <div class="progress-bar" data-width="80"></div>
      </div>
      <div class="skill-category">
        <div class="progress-bar" data-width="70"></div>
      </div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();

    await waitFor(250);

    const bars = document.querySelectorAll('.progress-bar');
    expect(bars[0].style.width).toBe('80%');
    expect(bars[1].style.width).toBe('70%');
  });
});

describe('Lazy Loading Images', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="project-image">
        <img src="test1.jpg" alt="Test 1">
      </div>
      <div class="project-image">
        <img src="test2.jpg" alt="Test 2">
      </div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should add loaded class to images when they intersect', () => {
    const images = document.querySelectorAll('.project-image img');
    
    // IntersectionObserver mock automatically triggers
    images.forEach(img => {
      expect(img.classList.contains('loaded')).toBe(true);
    });
  });

  test('should handle no images gracefully', () => {
    document.body.innerHTML = `<nav class="navbar"></nav>`;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });

  test('should handle single image', () => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <div class="project-image">
        <img src="test.jpg" alt="Test">
      </div>
    `;

    require('../script.js');
    triggerDOMContentLoaded();

    const img = document.querySelector('.project-image img');
    expect(img.classList.contains('loaded')).toBe(true);
  });
});