# veskov.dev

Personal landing page that plays as a live terminal session: zero dependencies,
plain HTML/CSS/JS, self-hosted font.

Hosted on a Hetzner box at [veskov.dev](https://veskov.dev).

## How it works

The browser boots the OS first: the boot log plays on a black screen, the
desktop appears, and the terminal window opens with a pop. Then the site types
itself: `whoami`, `cat ~/tagline.txt`,
`cat ~/about.md`, `cat ~/experience.md`, `ls -la ~/projects/`, `cat ~/contacts.md`
and `help` run automatically, in that order, with fast, irregular, human-like
typing (occasional hesitation and typo-and-correct). Output renders instantly.
Then the prompt is handed to the visitor.

The page is drawn as a desktop: a nav bar on top, one terminal window under it
(the session scrolls inside the window), and the copyright line as a caption
below. The window is a real one: drag it by the title bar, resize it from the
bottom-right grip, maximize with the green button or a double-click on the bar.
The other two buttons answer in-session: close runs `exit`, minimize runs
`clear`. On phones the window pins itself full-bleed instead. The nav links
(`~/about`, `~/work`, `~/projects`, `~/contact`) type their own commands into
the session. Everything the visitor types at the prompt is answered
too, so try `cv`, `status`, `sudo`, `ping`, `ls`, `work`, `projects`, `clear`.
Arrow-up/down cycles history; Tab completes commands and the filenames `cat`
takes, and a second Tab on the same line lists the candidates.

Append `?snap` to the URL to skip all animation and render the session instantly.

## Files

- `index.html`: page structure
- `style.css`: terminal theme (CRT scanlines, glow, glitch)
- `noscript.css`: loaded only without JS, hides the boot overlay and the dead prompt
- `main.js`: content + session engine
- `cv.txt`: the resume as a hand-set text file, 7-bit ASCII, 80 columns
- `cv.pdf`: the printable A4 resume, rendered from `tools/cv/cv.html`
- `tools/cv/`: print source for the PDF and the one command that regenerates it
- `fonts/`: self-hosted JetBrains Mono (woff2 + @font-face css)

## Editing content

Everything personal (name, role, bio, skills, work history, projects,
contacts/socials) lives in the `CONFIG` block at the top of `main.js`, marked with
a ★ banner, and it mirrors the CV. The auto-run sequence is the `AUTO_SEQUENCE` array
right below it. Edit, reload, no build step.

Projects take an optional `note` (rendered dim under the links), used to say when
a repo is private client work rather than leaving a card with no source link.

## Deploy

Static files only. Served by Apache (vhosts `veskov.dev.conf` /
`veskov.dev-le-ssl.conf`) from `/var/www/veskov.dev/`.

**Automatic:** every push to `main` that touches a served file deploys via
GitHub Actions (`.github/workflows/deploy.yml`): rsync over a dedicated SSH key
jailed with `rrsync` to the docroot, then a sha256 comparison of the live site
against the repo. One-time key setup: `docs/deploy-provisioning.md`. Manual
trigger: `gh workflow run deploy`.

**Manual fallback**, if Actions is ever down:

```bash
scp -r index.html style.css main.js cv.txt cv.pdf fonts \
  og-image.png favicon.svg favicon-96.png apple-touch-icon.png \
  robots.txt sitemap.xml \
  root@159.69.8.29:/var/www/veskov.dev/
```

No restart needed: Apache serves the files straight off disk. `cv.txt` and
`cv.pdf` ride along in the same copy, so the resume never drifts from the page.

Server-side bits that are not files in this repo (vhost redirect, security headers,
cache policy) are written down in `docs/server-hardening.md`.
