# Premium Personal Portfolio

A unique, professional, modern, and visually impressive personal portfolio website built with pure HTML5, CSS3, and Vanilla JavaScript (ES6+). Designed utilizing a "Glass-Tech Fusion" aesthetic, matching neon-brutalism with elegant frosted glass overlays without relying on generic frameworks like Bootstrap or Tailwind.

## Project Structure
```text
portfolio/
│
├── index.html          # Main HTML semantic structure
├── css/
│   └── style.css       # All styles, variables, media queries, and themes
├── js/
│   └── script.js       # Core interactivity (slider, cursor, observer, filter, buttons)
├── assets/
│   ├── images/         # Placeholders for images/avatars
│   ├── icons/          # Fallback for SVG icons (using Phosphor CDN by default)
│   └── resume/         # Store your PDF resume here
└── README.md           # This documentation file
```

---

## 🎨 Changing Design Elements

### Changing Colors
All colors are managed via CSS Custom Properties (Variables) at the very top of `css/style.css`.
To change the colors, simply edit the values inside `:root` (for Dark Mode, default) and `[data-theme="light"]` (for Light Mode).

**Default Variables:**
```css
:root {
    --bg-color: #0a0a0a;
    --primary-color: #00f0ff; /* The prominent vibrant cyan accent */
    --secondary-color: #8a2be2; /* The vivid violet accent */
    /* ... */
}
```
*Tip:* For a "Cyberpunk" look, try setting primary to `#ff003c` and secondary to `#fcee09`. For a minimalist professional look, use primary as `#2563eb` (Blue) and secondary as `#4f46e5` (Indigo).

### Changing Fonts
The project uses Google Fonts: `Outfit` for headings and `Inter` for body text. 
1. Open `index.html` and locate the `<link href="...fonts.googleapis.com...">` tag in the `<head>`. Replace it with your preferred Google Font link.
2. Open `css/style.css`, go to `:root`, and update:
```css
    --font-heading: 'Your New Font', sans-serif;
    --font-body: 'Your New Font', sans-serif;
```

---

## 📝 Replacing Placeholder Content

Open `index.html` in your favorite code editor (like VS Code) and search (Ctrl+F or Cmd+F) for the bracketed text patterns:
- `[YOUR NAME]`
- `[YOUR PROFESSIONAL TITLE]` (e.g., "Senior Frontend Engineer")
- `[YOUR BIO]`
- `[EMAIL]`, `[PHONE]`, `[CITY, COUNTRY LOCATION]`
- Social Links: `[GITHUB URL]`, `[LINKEDIN URL]`, `[TWITTER/X URL]`
- Also make sure to point the "Download CV" link `href="assets/resume/[YOUR_RESUME].pdf"` to an actual PDF in your assets/resume folder.

---

## 🖼️ Recommended Image Dimensions

To keep the UI pixel-perfect, use these image dimensions when adding your own files:
- **Hero Profile Avatar (if added)**: 400x400px (1:1 ratio), transparent PNG or circular crop.
- **Featured Project Cover**: 1200x800px (3:2 ratio), high-resolution WebP or optimized JPG.
- **Project Card Thumbnails**: 800x600px (4:3 ratio). 
- **Testimonial Avatars**: 100x100px (1:1 ratio).

*(Currently, image previews use sleek CSS-based placeholder containers. You can replace the `<div class="image-placeholder">` HTML nodes with an actual `<img src="..." alt="...">` tag).*

---

## 🏗️ Adding Projects

### 1. In the `Projects Grid` section:
Add a new `<div class="project-card glass" data-category="[YOUR_CATEGORY]">` inside the `<div class="projects-grid">`.
The `data-category` attribute handles the filtering. It can have multiple values separated by spaces (e.g., `data-category="web js"`).

```html
<div class="project-card glass" data-category="web js">
    <div class="project-img-wrapper">
        <img src="assets/images/my-project.jpg" alt="Project Thumbnail" style="width:100%; height:100%; object-fit:cover;">
    </div>
    <div class="project-card-content">
        <h3>My Cool Project</h3>
        <p>A short description.</p>
        <div class="tools-used small">
            <span>React</span><span>Node</span>
        </div>
        <div class="project-card-actions">
            <!-- Replace [GITHUB LINK] and [LIVE LINK] -->
        </div>
    </div>
</div>
```

---

## 📧 Connecting the Contact Form

Currently, the contact form uses Vanilla JS to validate the input and show a success message (`form-status`), but it **does not** connect to a database to send an email yet. 

To make it actually send emails to you:
**Using Formspree (Recommended & Free):**
1. Go to [formspree.io](https://formspree.io/) and create an account.
2. Create a new form project to get an Endpoint URL (e.g., `https://formspree.io/f/your_unique_id`).
3. In `index.html`, modify the `<form>` tag:
   ```html
   <form id="contact-form" class="contact-form" novalidate action="https://formspree.io/f/your_unique_id" method="POST">
   ```
4. If you use this, you may want to disable the e.preventDefault() in `script.js` located in the `/* --- 11. Contact Form Validation --- */` section so that the form properly redirects to Formspree, or rewrite the JS to use `fetch()`.

Example `fetch()` logic for `script.js`:
```javascript
// Replace the setTimeout block inside form validation with:
fetch('https://formspree.io/f/your_unique_id', {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
}).then(response => {
    // Show success message logic...
});
```

---

## 🚀 Deployment Instructions

Because this website uses exclusively pure HTML/CSS/JS without any build steps or backend servers, it is a static asset. This means deploying it is completely free and instant on most major static hosts.

### Deploying to GitHub Pages (Recommended)
1. Initialize a Git repository in this folder: `git init`
2. Commit your code: `git add .` and `git commit -m "Initial portfolio commit"`
3. Push it to a new GitHub repository you created.
4. On GitHub, go to your repository's **Settings** > **Pages**.
5. Under Build and deployment, set the source branch to `main` (or `master`) and hit **Save**.
6. Your site will be live at `https://[yourusername].github.io/[repository-name]`.

### Deploying to Vercel or Netlify
1. Create a free account at [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
2. Connect your GitHub account.
3. Import the repository.
4. Set the "Build Command" to empty (leave blank) since it's plain HTML.
5. Set the "Output Directory" to empty (or `/`).
6. Click Deploy! Your site will be live in seconds.
