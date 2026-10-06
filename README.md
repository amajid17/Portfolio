# Name - Electrical Engineering Portfolio

Personal portfolio for an EE student at College. Analog circuits, embedded systems, DSP projects and shipped apps. Senior Design capstone.

Built with **React 19 + Vite + Tailwind CSS 4**. The production build inlines everything into a single `dist/index.html` (via `vite-plugin-singlefile`) plus two images — perfect for static hosting.

## 🚀 Deploy to GitHub Pages (automatic)

Deployment is already wired up via GitHub Actions. Just do this once:

### 1. Create a repo on GitHub
- Go to [github.com/new](https://github.com/new)
- Name it anything, e.g. `ee-portfolio` (or `yourusername.github.io` for a root URL)
- Keep it **Public** (required for free GitHub Pages)
- **Do not** initialize with a README (we already have one)

### 2. Push this code
From this project folder, run:

```bash
git init
git add .
git commit -m "Initial commit: EE portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### 3. Turn on GitHub Pages
- In your repo, go to **Settings → Pages**
- Under **Build and deployment → Source**, select **GitHub Actions**
- Save

### 4. Wait for the deploy
- Go to the **Actions** tab — you'll see "Deploy to GitHub Pages" running
- When it's green ✅, your site is live at:

```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

(If you named the repo `YOUR_USERNAME.github.io`, it's live at `https://YOUR_USERNAME.github.io/` instead.)

### 5. Update anytime
Just `git add . && git commit -m "update" && git push` — the workflow rebuilds and redeploys automatically in ~1 minute.

> 💡 **Tip:** You can also trigger a redeploy manually from the **Actions** tab → "Deploy to GitHub Pages" → **Run workflow**.

## 🖥️ Local development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## 📁 Project structure

```
public/images/     portrait (served at /images/)
src/
  data.ts                  all portfolio content (edit this to update the site)
  components/
    chrome.tsx             navbar, footer, section headings, scroll reveal
    hero.tsx               hero + live scope canvas + stats
    about-skills.tsx       about card + skills with fluency bars
    projects.tsx           EE labs grid + interactive comb filter + personal apps
    capstone-contact.tsx   SafeSense section + contact form
  App.tsx                  page composition
index.html                 SEO meta, fonts, favicon
.github/workflows/deploy.yml  auto-deploy to GitHub Pages
```

## ✏️ To customize

Edit **`src/data.ts`** — it holds your name, email, links, skills, personal projects. Change content there, never in the components.

**Before going live, replace these placeholders in `src/data.ts`:**
- `email: "email@school.edu"` → your real school email
- `linkedin: "https://linkedin.com/in/yourhandle"` → your LinkedIn
- Add your real `resume.pdf` to `public/` and update the download link, or point the button at a Google Drive/Notion link
