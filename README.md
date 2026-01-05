# Interactive Resume

A modern, responsive, and interactive personal resume website hosted on GitHub Pages.

## Features

- 🎨 Modern and professional design
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- 🎯 Interactive navigation
- 📊 Animated statistics and skill bars
- 💼 Project showcase with hover effects
- 📧 Contact form with validation
- 🌐 Hosted on GitHub Pages

## Sections

- **Home/Hero**: Eye-catching introduction with call-to-action buttons
- **About**: Personal introduction with animated statistics
- **Skills**: Technical skills organized by category with progress bars
- **Experience**: Timeline of work experience
- **Education**: Academic background and certifications
- **Projects**: Portfolio of featured projects
- **Contact**: Contact information and form

## Customization

To personalize this resume for yourself:

1. **Personal Information**: Edit `index.html` and replace:
   - Your Name (in hero section and title)
   - Professional Title
   - Social media links (GitHub, LinkedIn, Twitter, Email)
   - Contact information (email, phone, location)

2. **About Section**: Update the about text and statistics in `index.html`

3. **Skills**: Modify skill categories and proficiency levels in `index.html`

4. **Experience**: Add/edit your work experience in the timeline section

5. **Education**: Update educational background and certifications

6. **Projects**: Replace placeholder projects with your actual projects
   - Update project images (replace placeholder URLs)
   - Add GitHub/demo links
   - Update project descriptions and technologies

7. **Colors**: Customize the color scheme in `styles.css` by modifying CSS variables in `:root`

## Deployment to GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select the branch (usually `main` or `master`)
4. Select `/root` as the folder
5. Click "Save"
6. Your site will be available at: `https://[username].github.io/interactive-resume/`

## Local Development

To view the website locally:

1. Clone this repository
2. Open `index.html` in your web browser
3. No build process required - it's pure HTML, CSS, and JavaScript!

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- System fonts (for performance)


## Testing

This project includes a comprehensive test suite with **250+ test cases** covering all functionality.

### Test Coverage

- ✅ **JavaScript Tests** (95+ tests): All interactive features, form validation, animations, scroll effects
- ✅ **HTML Validation** (95+ tests): Structure, semantics, accessibility, SEO optimization
- ✅ **CSS Validation** (90+ tests): Styling, responsive design, animations, best practices

### Running Tests

Install dependencies:
```bash
npm install
```

Run all tests:
```bash
npm test
```

Run with coverage report:
```bash
npm run test:coverage
```

Watch mode (auto-rerun on changes):
```bash
npm run test:watch
```

Run specific test suites:
```bash
npm run test:script  # JavaScript functionality
npm run test:html    # HTML structure
npm run test:css     # CSS styling
```

### Test Coverage Goals

- Functions: 80%+
- Lines: 80%+
- Branches: 80%+
- Statements: 80%+

### What's Tested

#### JavaScript Functionality
- Mobile navigation (hamburger menu)
- Smooth scrolling
- Scroll effects (navbar, parallax, active states)
- Animated counters
- Intersection Observer animations
- Form validation (email format, required fields)
- Notification system
- Lazy loading images
- Error handling and edge cases

#### HTML Structure
- Valid HTML5 structure
- SEO meta tags
- Accessibility features (ARIA labels, semantic HTML)
- All sections (hero, about, skills, experience, education, projects, contact)
- Form structure and validation
- Social media integration
- No duplicate IDs or common errors

#### CSS Styling
- CSS variables and theming
- Responsive design (mobile, tablet, desktop)
- Animations and transitions
- Layout (Flexbox, CSS Grid)
- Form styling and focus states
- Typography and color consistency
- Performance optimizations
- Cross-browser compatibility

For detailed testing documentation, see [tests/README.md](tests/README.md).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Credits

Created with ❤️ using modern web technologies.
