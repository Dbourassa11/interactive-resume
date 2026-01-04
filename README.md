# Interactive Resume - Charles David Bourassa

An interactive, accessible, and responsive online resume for Charles David Bourassa, Principal at Quantum Concepts LLC.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG compliant with ARIA labels, skip-to-content link, and keyboard navigation
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card integration
- **Contact Form**: Integrated with Formspree for easy contact
- **Modern UI**: Clean, professional design with smooth animations
- **Print Friendly**: Optimized styles for printing

## Setup

### Formspree Integration

To enable the contact form:

1. Go to [Formspree.io](https://formspree.io/) and create a free account
2. Create a new form and get your form ID
3. In `index.html`, replace `YOUR_FORM_ID` in the form action with your actual Formspree form ID:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Deployment

This resume can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

#### GitHub Pages Deployment

1. Push the code to your GitHub repository
2. Go to repository Settings > Pages
3. Select the branch to deploy (e.g., `main` or `feature/complete-resume`)
4. Save and wait for deployment

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - Interactive features and smooth scrolling
- `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png` - Site favicons

## Customization

To customize for your own use:

1. Update personal information in `index.html`:
   - Name, title, contact details
   - Experience and skills sections
   - Social media links

2. Modify colors in `styles.css`:
   - Edit CSS variables in the `:root` section

3. Replace favicon files with your own branding

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- Formspree for form handling

## License

© 2026 Charles David Bourassa. All rights reserved.

## Contact

- **Email**: Quantum.Concepts@outlook.com
- **Phone**: +1 (505) 469-0152
- **Location**: Albuquerque, NM, USA
- **GitHub**: [Dbourassa11](https://github.com/Dbourassa11)
- **LinkedIn**: [charlesdbourassa](https://www.linkedin.com/in/charlesdbourassa)
