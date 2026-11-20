# MYGAME STORE (v1)

An independent, beginner-friendly **Grand Theft Auto VI** fan and news website built with plain **HTML, CSS, and vanilla JavaScript** — no build tools, frameworks, or paid services required.

> **Disclaimer:** Independent fan site; not affiliated with Rockstar Games or Take-Two Interactive.

---

## Files Included

- `index.html` — Single-page layout with all 7 sections (`Home`, `News`, `Device Guide`, `Gallery & Map`, `GTA V Archive`, `About`, `Newsletter`).
- `styles.css` — Responsive dark-charcoal and sunset-accent styling, accessible focus states, and `prefers-reduced-motion` support.
- `script.js` — Mobile menu toggle, subtle scroll reveal, easy `SITE_CONFIG.siteName` renaming, and preview-only newsletter handling.
- `README.md` — Beginner setup and next-steps guide.

---

## How to Open Locally

1. Open your workspace folder where `index.html`, `styles.css`, and `script.js` are saved.
2. Double-click **`index.html`** to open it directly in your web browser (Chrome, Edge, Firefox, or Safari).
3. *(Optional)* If you use VS Code, you can also install the **Live Server** extension and click **Go Live** to preview changes automatically as you edit.

---

## How to Change the Site Name

1. Open `script.js` and edit `siteName` inside `SITE_CONFIG`:
   ```js
   const SITE_CONFIG = {
     siteName: "Your New Site Name",
     newsletterEndpoint: null,
   };
   ```
2. Also update the `<title>` tag near the top of `index.html` so browser tabs show your new name.

---

## What Still Needs to Be Connected Before Going Live

1. **Newsletter Backend & Privacy Compliance**
   - Right now, the newsletter form is a **preview only** and does **not** save or send email addresses.
   - Before collecting real subscribers, you will need:
     - A newsletter provider (such as Buttondown, Mailchimp, or Brevo) or a secure backend/serverless endpoint.
     - A published **Privacy Policy** explaining how emails are used.
     - Double opt-in / explicit consent tracking and a working **unsubscribe** link in every email.
   - **Security reminder:** Never put secret API keys inside `script.js` or any frontend file. Connect `SITE_CONFIG.newsletterEndpoint` to your own backend or form endpoint instead.

2. **Hosting & Custom Domain (Later Step)**
   - When you are ready to publish, you can host these static files for free on GitHub Pages, Cloudflare Pages, or Netlify, and then connect a custom domain later.

3. **Ongoing Fact Verification**
   - Keep the **“Last checked”** dates updated whenever Rockstar Games announces new platforms (such as PC), updated storage requirements, or regional store changes.
