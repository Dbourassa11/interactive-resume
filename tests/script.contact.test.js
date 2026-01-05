/**
 * Tests for Contact Form functionality in script.js
 * Covers form validation, submission, and notification system
 */

describe('Contact Form - Validation', () => {
  let form, nameInput, emailInput, subjectInput, messageInput;

  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="navbar"></nav>
      <form id="contactForm">
        <input type="text" id="name" name="name">
        <input type="email" id="email" name="email">
        <input type="text" id="subject" name="subject">
        <textarea id="message" name="message"></textarea>
        <button type="submit">Send</button>
      </form>
    `;

    require('../script.js');
    triggerDOMContentLoaded();

    form = document.getElementById('contactForm');
    nameInput = document.getElementById('name');
    emailInput = document.getElementById('email');
    subjectInput = document.getElementById('subject');
    messageInput = document.getElementById('message');
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should prevent default form submission', () => {
    const preventDefault = jest.fn();
    const submitEvent = new Event('submit', { bubbles: true });
    submitEvent.preventDefault = preventDefault;

    form.dispatchEvent(submitEvent);

    expect(preventDefault).toHaveBeenCalled();
  });

  test('should show error notification when name is missing', () => {
    nameInput.value = '';
    emailInput.value = 'test@example.com';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();
    expect(notification.textContent).toBe('Please fill in all fields');
    expect(notification.classList.contains('error')).toBe(true);
  });

  test('should show error notification when email is missing', () => {
    nameInput.value = 'John Doe';
    emailInput.value = '';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();
    expect(notification.textContent).toBe('Please fill in all fields');
  });

  test('should show error notification when subject is missing', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'test@example.com';
    subjectInput.value = '';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();
    expect(notification.textContent).toBe('Please fill in all fields');
  });

  test('should show error notification when message is missing', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'test@example.com';
    subjectInput.value = 'Test Subject';
    messageInput.value = '';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();
    expect(notification.textContent).toBe('Please fill in all fields');
  });

  test('should show error notification when all fields are empty', () => {
    nameInput.value = '';
    emailInput.value = '';
    subjectInput.value = '';
    messageInput.value = '';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();
    expect(notification.textContent).toBe('Please fill in all fields');
  });

  test('should validate email format - invalid email without @', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'invalidemail.com';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();
    expect(notification.textContent).toBe('Please enter a valid email address');
  });

  test('should validate email format - invalid email without domain', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'test@';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();
    expect(notification.textContent).toBe('Please enter a valid email address');
  });

  test('should validate email format - invalid email without TLD', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'test@example';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();
    expect(notification.textContent).toBe('Please enter a valid email address');
  });

  test('should accept valid email with subdomain', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'test@mail.example.com';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification.textContent).toBe('Thank you for your message! I\'ll get back to you soon.');
  });

  test('should accept valid email with numbers', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'test123@example.com';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification.textContent).toBe('Thank you for your message! I\'ll get back to you soon.');
  });

  test('should accept valid email with special characters', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'test.user+tag@example.com';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification.textContent).toBe('Thank you for your message! I\'ll get back to you soon.');
  });

  test('should show success notification with valid form data', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();
    expect(notification.textContent).toBe('Thank you for your message! I\'ll get back to you soon.');
    expect(notification.classList.contains('success')).toBe(true);
  });

  test('should reset form after successful submission', () => {
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';
    subjectInput.value = 'Test Subject';
    messageInput.value = 'Test Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(subjectInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });

  test('should handle missing form gracefully', () => {
    document.body.innerHTML = `<nav class="navbar"></nav>`;

    expect(() => {
      require('../script.js');
      triggerDOMContentLoaded();
    }).not.toThrow();
  });

  test('should handle whitespace-only input fields', () => {
    nameInput.value = '   ';
    emailInput.value = 'test@example.com';
    subjectInput.value = 'Subject';
    messageInput.value = 'Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    // Whitespace counts as filled, so should proceed to success
    const notification = document.querySelector('.notification');
    expect(notification.textContent).toBe('Thank you for your message! I\'ll get back to you soon.');
  });
});

describe('Notification System', () => {
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

  test('should create notification with correct styles for success', () => {
    const form = document.getElementById('contactForm');
    document.getElementById('name').value = 'John';
    document.getElementById('email').value = 'john@example.com';
    document.getElementById('subject').value = 'Subject';
    document.getElementById('message').value = 'Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification.style.position).toBe('fixed');
    expect(notification.style.top).toBe('100px');
    expect(notification.style.right).toBe('20px');
    expect(notification.style.background).toBe('rgb(16, 185, 129)'); // #10b981
  });

  test('should create notification with correct styles for error', () => {
    const form = document.getElementById('contactForm');
    document.getElementById('name').value = '';
    document.getElementById('email').value = 'john@example.com';
    document.getElementById('subject').value = 'Subject';
    document.getElementById('message').value = 'Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification.style.background).toBe('rgb(239, 68, 68)'); // #ef4444
  });

  test('should add animation keyframes style only once', () => {
    const form = document.getElementById('contactForm');
    
    // Trigger multiple notifications
    for (let i = 0; i < 3; i++) {
      document.getElementById('name').value = '';
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    }

    const styles = document.querySelectorAll('#notification-slidein-style');
    expect(styles.length).toBe(1);
  });

  test('should remove existing notification before showing new one', () => {
    const form = document.getElementById('contactForm');
    
    // First notification
    document.getElementById('name').value = '';
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    
    let notifications = document.querySelectorAll('.notification');
    expect(notifications.length).toBe(1);
    
    // Second notification
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    
    notifications = document.querySelectorAll('.notification');
    expect(notifications.length).toBe(1);
  });

  test('should remove notification after timeout', async () => {
    const form = document.getElementById('contactForm');
    document.getElementById('name').value = 'John';
    document.getElementById('email').value = 'john@example.com';
    document.getElementById('subject').value = 'Subject';
    document.getElementById('message').value = 'Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    let notification = document.querySelector('.notification');
    expect(notification).toBeTruthy();

    await waitFor(3400); // 3000ms display + 300ms fade + buffer

    notification = document.querySelector('.notification');
    expect(notification).toBeFalsy();
  });

  test('should apply fade-out animation before removing notification', async () => {
    const form = document.getElementById('contactForm');
    document.getElementById('name').value = 'John';
    document.getElementById('email').value = 'john@example.com';
    document.getElementById('subject').value = 'Subject';
    document.getElementById('message').value = 'Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    await waitFor(3050); // After fade-out starts

    const notification = document.querySelector('.notification');
    expect(notification.style.transform).toBe('translateX(400px)');
    expect(notification.style.opacity).toBe('0');
  });

  test('should have proper z-index for notification', () => {
    const form = document.getElementById('contactForm');
    document.getElementById('name').value = 'John';
    document.getElementById('email').value = 'john@example.com';
    document.getElementById('subject').value = 'Subject';
    document.getElementById('message').value = 'Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification.style.zIndex).toBe('10000');
  });

  test('should handle rapid form submissions', () => {
    const form = document.getElementById('contactForm');
    
    for (let i = 0; i < 5; i++) {
      document.getElementById('name').value = '';
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    }

    const notifications = document.querySelectorAll('.notification');
    expect(notifications.length).toBe(1);
  });
});

describe('Contact Form - Edge Cases', () => {
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

  test('should handle very long input values', () => {
    const form = document.getElementById('contactForm');
    const longText = 'a'.repeat(10000);
    
    document.getElementById('name').value = longText;
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('subject').value = longText;
    document.getElementById('message').value = longText;

    expect(() => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    }).not.toThrow();
  });

  test('should handle special characters in input', () => {
    const form = document.getElementById('contactForm');
    
    document.getElementById('name').value = '<script>alert("xss")</script>';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('subject').value = '"><img src=x onerror=alert(1)>';
    document.getElementById('message').value = '\'; DROP TABLE users; --';

    expect(() => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    }).not.toThrow();
  });

  test('should handle unicode characters', () => {
    const form = document.getElementById('contactForm');
    
    document.getElementById('name').value = '日本語 中文 한글';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('subject').value = 'Émojis 🎉🚀✨';
    document.getElementById('message').value = 'Message with émojis 😀👍';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification.textContent).toBe('Thank you for your message! I\'ll get back to you soon.');
  });

  test('should handle email with multiple dots', () => {
    const form = document.getElementById('contactForm');
    
    document.getElementById('name').value = 'John Doe';
    document.getElementById('email').value = 'test.user.name@example.co.uk';
    document.getElementById('subject').value = 'Subject';
    document.getElementById('message').value = 'Message';

    form.dispatchEvent(new Event('submit', { bubbles: true }));

    const notification = document.querySelector('.notification');
    expect(notification.textContent).toBe('Thank you for your message! I\'ll get back to you soon.');
  });
});