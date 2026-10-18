# Hostinger / Hermes handoff

## Deliverable

- Repository name: `Brass-Tasks-WebApp`.
- Type: static HTML/CSS/JavaScript application.
- Build command: `npm run build` (Node.js 22+).
- Publish directory: `dist`.
- Start command on Hostinger: **none**. Serve these files through the hosting account's normal web server.
- Backend, environment variables, database, external APIs: **none**.
- Domain and DNS: left to the user's existing Hermes setup.

## Upload

1. Build with `npm run build`.
2. Open the document root for the intended domain in the Hostinger hosting account (often `public_html`; use the actual configured directory).
3. Back up any existing site before replacing files in that directory.
4. Upload **the contents** of `dist`, including `.htaccess` and the complete `assets` folder. `index.html` must be directly inside the document root, not inside a nested `dist` folder.
5. Alternatively extract `release/Brass-Tasks-WebApp-hostinger.zip` directly into the document root. The ZIP contains the deployment files at its root, including hidden `.htaccess`.
6. Have Hermes configure the intended domain and HTTPS. HTTPS is required for a normal production environment and browser APIs such as `crypto.randomUUID()`.
7. Open the HTTPS URL and test creating a plan, reloading it, importing/exporting Markdown, starting a timer, and downloading a backup.

Paths are relative, so deployment under a subdirectory also works. There is no client-side route rewriting requirement. The supplied `.htaccess` disables directory listings, sets `index.html` as the index, adds basic response headers, and asks the browser to revalidate HTML/JS/CSS. Its header directives are conditional on the server's headers module. If this hosting plan does not support Apache-compatible configuration, configure equivalent behavior in the hosting server instead.

## Moving existing work to the domain

The preview and production site are different browser origins. Before moving, choose **Back up workspace** in the preview. On the final domain choose **Restore backup** and select that JSON file. This also applies to changing between `www`, non-`www`, HTTP, HTTPS, or a different port. Prefer one canonical HTTPS hostname to avoid separate workspaces.

## Repository setup for Hermes

The separate private GitHub repository is [bauer-code/Brass-Tasks-WebApp](https://github.com/bauer-code/Brass-Tasks-WebApp). To obtain its source using an account with access:

```sh
git clone https://github.com/bauer-code/Brass-Tasks-WebApp.git
cd Brass-Tasks-WebApp
npm test
npm run build
```

Keep the original `bauer-code/Brass-Tasks` repository completely separate. Do not add it as this project's push remote. This web repository has independent history.

## Scope boundary

This initial edition stores data in the browser. Hosting it does not create server-side sync or backups. If a later version needs accounts, synchronized tasks, or remote Obsidian access, those features need an explicitly designed backend and authentication model. Do not expose an Obsidian vault or local filesystem directly to the web server.
