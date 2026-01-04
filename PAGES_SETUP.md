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

## Troubleshooting Pages Deployment

If the Pages deployment workflow fails, try these steps:

### 1. Check Workflow Run Status
- Go to the Actions tab: https://github.com/Dbourassa11/interactive-resume/actions
- Click on the failed "Deploy to GitHub Pages" workflow run
- Review the error logs to identify the issue

### 2. Enable Actions Permissions for Pages
If you see permission errors:
1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", ensure one of the following is selected:
   - "Read and write permissions" is enabled, OR
   - "Read repository contents and packages permissions" with additional "Allow GitHub Actions to create and approve pull requests" if needed
3. Go to **Settings** → **Pages**
4. Under "Build and deployment", ensure **Source** is set to "GitHub Actions"

### 3. Re-run Failed Workflow
1. Go to the Actions tab
2. Click on the failed workflow run
3. Click "Re-run all jobs" button in the top right
4. Wait for the workflow to complete

### 4. Trigger Deployment with Empty Commit
If the workflow doesn't trigger automatically:
```bash
git commit --allow-empty -m "Trigger Pages deployment"
git push origin main
```

### 5. Common Issues
- **Permissions error**: Enable "Read and write permissions" in Settings → Actions → General
- **Pages not enabled**: Go to Settings → Pages and set Source to "GitHub Actions"
- **Workflow not found**: Ensure `.github/workflows/deploy-pages.yml` exists in the main branch
- **Build artifacts issue**: Check that the workflow has proper `permissions` set (pages: write, id-token: write)

### Recent Deployment Status
The most recent workflow run can be found at: https://github.com/Dbourassa11/interactive-resume/actions/runs/20697091106

---

Test locally:

```bash
python -m http.server 8000
# then open http://localhost:8000/index.html
```
