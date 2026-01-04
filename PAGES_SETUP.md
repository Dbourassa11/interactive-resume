# GitHub Pages Setup & Contact Form

This branch includes a workflow to deploy the site to GitHub Pages and a placeholder Formspree contact form. Follow these steps to publish the site:

1. Mark PR #3 as "Ready for review" and merge it into `main` (PR: https://github.com/Dbourassa11/interactive-resume/pull/3).
2. Enable GitHub Pages for this repository:
   - Go to: Settings → Pages → Source
   - Select Branch: `main` and folder: `/ (root)`
   - Save. The site URL will be: `https://Dbourassa11.github.io/interactive-resume/`.
3. (Optional) Configure the contact form:
   - Sign up at Formspree (https://formspree.io) and create a form.
   - Replace the form action in `index.html` with your Formspree form endpoint (e.g., `https://formspree.io/f/xyzabc`).
   - Alternatively, you can use a mailto fallback if you prefer not to use Formspree.
4. The workflow `.github/workflows/deploy-pages.yml` will automatically publish the site when changes are pushed to `main`.

Notes:
- The Formspree action currently uses a placeholder `your-form-id`. Do NOT commit real secrets to the repo.
- If you prefer manual Pages enabling, complete step 2 and the Pages UI will publish within a minute or two.

---

Test locally:

```bash
python -m http.server 8000
# then open http://localhost:8000/index.html
```
