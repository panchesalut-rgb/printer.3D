# AGENTS.md

## What this project is
A single static page (`preview_3d_checkout.html`): a Three.js 3D product viewer plus a demo
checkout (the card form is a mock — it only shows a JS alert). There is no backend, no database,
no build step, no package manager and no environment variables or credentials.

## Running it
```bash
docker compose -f docker-compose.base44.yml up -d   # web on host port 3000
```
- `web` = stock `nginx:alpine` serving the repo root read-only; there is nothing to build.
- `/` is mapped to `preview_3d_checkout.html` via the `index` directive in
  `docker/nginx.base44.conf` (the file keeps its descriptive name).
- `.git/` and `docker/` are denied in nginx so repo metadata is not served.

## Sandbox quirk (why the config looks unusual)
The sandbox clones the repo with mode 700 on its root, and that directory is bind-mounted as-is.
nginx's default unprivileged worker therefore cannot traverse it and returns 403 on every path.
`docker/nginx.base44.main.conf` is a full `nginx.conf` override that sets `user root;` for the
worker. This is a dev-only change for the sandbox; a production deployment should serve the file
with a normally-permissioned web server instead.

No sandbox behaviour is gated on `BASE44_PREVIEW_MODE` here — nothing checks hosts or origins.

## Editing / verifying
- Edits are plain files served straight from the bind mount: no rebuild, no dependency install.
- There is no live-reload dev server. After editing the HTML, refresh the preview (Base44
  `reload_preview`) to see changes.
- Verify with `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` (expect 200), and
  in the browser confirm the 3D canvas in `#canvas-container` renders with no console errors.

## External dependencies (browser-side, from CDNs)
Tailwind CDN, Font Awesome, Google Fonts, Three.js r128 + OrbitControls. The browser needs
internet access to these; a blocked CDN degrades styling or drops the 3D view but the page still
loads. No API keys are involved anywhere.
