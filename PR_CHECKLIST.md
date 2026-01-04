# Pull Request Checklist

## Before Merging

- [ ] Review all code changes for accuracy and completeness
- [ ] Test the site locally (see instructions below)
- [ ] Verify contact form validation works
- [ ] Check accessibility features (keyboard navigation, screen reader compatibility)
- [ ] Ensure no sensitive information (API keys, real Formspree IDs) is committed
- [ ] Verify responsive design on different screen sizes
- [ ] Review PAGES_SETUP.md troubleshooting instructions

## Testing Locally

### Start Local Server

You can test the site locally using any of these methods:

**Python 3:**
```bash
python -m http.server 8000
# Then open http://localhost:8000/index.html
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
# Then open http://localhost:8000/index.html
```

**Node.js (with http-server):**
```bash
npx http-server -p 8000
# Then open http://localhost:8000/index.html
```

**PHP:**
```bash
php -S localhost:8000
# Then open http://localhost:8000/index.html
```

### Test Contact Form

1. Open the site in a browser
2. Navigate to the Contact section
3. Try submitting the form without filling fields (should show validation error)
4. Try submitting with invalid email (should show email validation error)
5. Try submitting with all valid fields:
   - **If Formspree ID is still placeholder (`YOUR_FORM_ID`)**: Should show alert directing user to email directly
   - **If Formspree ID is configured**: Form should submit successfully (requires actual Formspree setup)

### Formspree Setup (Optional - For Production)

To enable the contact form in production:

1. **Sign up for Formspree**:
   - Go to https://formspree.io/
   - Create a free account
   - Create a new form project

2. **Get Your Form ID**:
   - After creating the form, you'll receive a form ID (e.g., `xyzabc123`)
   - The endpoint will be: `https://formspree.io/f/YOUR_FORM_ID`

3. **Update index.html**:
   - Replace `YOUR_FORM_ID` in the form action with your actual Formspree form ID:
   ```html
   <form action="https://formspree.io/f/xyzabc123" method="POST" class="contact-form" id="contact-form">
   ```

4. **Test the form**:
   - Submit a test message
   - Check your Formspree dashboard to confirm receipt
   - Verify the email notification (if configured)

### Test Checklist

- [ ] Site loads correctly at http://localhost:8000
- [ ] All navigation links work (About, Experience, Skills, Contact)
- [ ] Smooth scrolling works
- [ ] Contact form shows validation errors for empty/invalid fields
- [ ] Contact form shows placeholder warning when Formspree ID not configured
- [ ] Responsive design works on mobile/tablet view (resize browser)
- [ ] All external links (GitHub, LinkedIn) open in new tabs
- [ ] Favicons display correctly
- [ ] No console errors in browser DevTools

## After Merging to Main

- [ ] Check that GitHub Actions workflow runs successfully
- [ ] Enable GitHub Pages in repository settings (if not already enabled):
  - Go to Settings → Pages
  - Set Source to "GitHub Actions" or Branch "main", folder "/ (root)"
- [ ] Verify site is accessible at https://dbourassa11.github.io/interactive-resume/
- [ ] If workflow fails, follow troubleshooting steps in PAGES_SETUP.md
- [ ] (Optional) Configure Formspree and update form ID in production

## Notes

- **Placeholder Warning**: The site will show a warning if the Formspree form ID is not configured. This is expected behavior.
- **No Build Step Required**: This is a static site with no build process - files are served as-is.
- **Contact Form**: The form will work with the placeholder, but will show an alert. Configure Formspree to enable actual submissions.
