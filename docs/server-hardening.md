# Server hardening: veskov.dev

> ## **DO NOT APPLY WITHOUT EXPLICIT OK**
>
> Nothing in this file is applied automatically. It is a script for a human with a
> root shell, not a runbook for an agent. Every command here touches a live box that
> serves other people's sites, so it gets read out loud, agreed on, and then pasted
> by Vesko. One step at a time, each with its verification curl.

> **Status 2026-08-18: fully applied, nothing open.** All eleven checklist steps
> are live, one phase at a time, verified after every reload - see the
> [Applied log](#applied-log-2026-08-18) at the bottom, including two places where
> the live box disagreed with this document's assumptions. Step 9 (www) followed
> the same day once the DNS record existed; step 10 (HSTS at a year) went out the
> same day too, ramp deliberately skipped - Vesko's call on a zero-traffic site
> with every prerequisite already measured green.

## The box

| | |
|---|---|
| Host | `root@159.69.8.29` (Hetzner) |
| Server | Apache/2.4.52 on Ubuntu |
| Vhosts | `/etc/apache2/sites-available/veskov.dev.conf` (port 80), `veskov.dev-le-ssl.conf` (port 443) |
| Docroot | `/var/www/veskov.dev/` |
| Neighbours | the box hosts other tenants |

**Scope rule:** everything below lives inside the `veskov.dev` vhosts. No global config
edits, no `systemctl restart apache2`, no touching another tenant's vhost, DNS or cert.
The two shared actions in this document are (a) `a2enmod`, which loads a module
process-wide, and (b) `systemctl reload apache2`, which is graceful and keeps existing
connections alive. Both are called out where they occur.

## What is actually broken (measured, 2026-08-18)

1. **Port 80 serves a stranger.** `http://veskov.dev` returns `200` with a document
   whose `Last-Modified` is May 2024, i.e. some other vhost's default page, instead of
   redirecting to https. Anyone who types the domain without the scheme lands on it.
2. **Zero security headers on https.** No CSP, no HSTS, no `X-Content-Type-Options`,
   no `Referrer-Policy`, no `Permissions-Policy`.
3. **Zero `Cache-Control`.** Every asset, fonts included, revalidates on every visit.
4. **HTTP/1.1 only, gzip at best, no brotli.**
5. **`www.veskov.dev` does not resolve.** No DNS record, no `ServerAlias`, no cert SAN.

Point 1 is the embarrassing one: the audience for this site is exactly the audience
that runs `curl -I` on it.

---

## 1. Port 80: redirect vhost

### Why the stale page wins

Apache picks a vhost for a request by matching `ServerName`/`ServerAlias`. When nothing
matches, the **first** vhost loaded for that address:port wins, which on a multi-tenant
box is whatever sorts first in `sites-enabled` (usually `000-default.conf`). So either
`veskov.dev.conf` is not enabled, or it has no `ServerName veskov.dev`. Diagnose before
changing anything:

```bash
apache2ctl -S 2>&1 | sed -n '/VirtualHost configuration/,/^$/p'
ls -l /etc/apache2/sites-enabled/
grep -nE 'ServerName|ServerAlias|Redirect|Rewrite' /etc/apache2/sites-available/veskov.dev.conf
```

### The vhost

Full replacement content for `/etc/apache2/sites-available/veskov.dev.conf`:

```apache
<VirtualHost *:80>
  ServerName veskov.dev
  ServerAlias www.veskov.dev

  # Kept so certbot's HTTP-01 challenge can be served over plain http.
  DocumentRoot /var/www/veskov.dev

  RewriteEngine On
  RewriteCond %{REQUEST_URI} !^/\.well-known/acme-challenge/
  RewriteRule ^ https://veskov.dev%{REQUEST_URI} [R=301,L]

  ErrorLog ${APACHE_LOG_DIR}/veskov.dev-error.log
  CustomLog ${APACHE_LOG_DIR}/veskov.dev-access.log combined
</VirtualHost>
```

Notes:

* Needs `mod_rewrite` (`a2enmod rewrite`; it is on by default on Ubuntu, verify with
  `apache2ctl -M | grep rewrite`).
* The `RewriteCond` line is the only reason to prefer rewrite over the one-liner
  `Redirect permanent / https://veskov.dev/`. ACME does follow redirects, so the
  one-liner also renews fine; the exception just keeps renewals boring.
* `www` is redirected to the apex, which makes the apex canonical and matches what
  `sitemap.xml` will claim. Do not add `ServerAlias www.veskov.dev` here until the DNS
  record from section 5 exists, otherwise it is a no-op that only looks reassuring.

---

## 2. Security headers on https

Requires `mod_headers`. These directives go **inside** `<VirtualHost *:443>` in
`/etc/apache2/sites-available/veskov.dev-le-ssl.conf`, so they apply to this site only.

```apache
  # --- security headers ---------------------------------------------------
  # Everything this page loads is self-hosted: fonts/, style.css, main.js.
  # No CDN, no analytics, no inline <script>, no inline style attributes.
  Header always set Content-Security-Policy "default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"

  # Start short. Raise only after the redirect and the cert have been boring for a day.
  Header always set Strict-Transport-Security "max-age=300"

  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
```

`always` matters: without it the headers are skipped on error responses, and the 404
page is a response like any other.

### Reading the CSP, directive by directive

| Directive | Why |
|---|---|
| `default-src 'none'` | The site fetches nothing this policy does not name. Deny by default, then open exactly what is used. |
| `script-src 'self'` | `main.js` only. No inline handlers, no `eval`, no `new Function` in the codebase (checked). |
| `style-src 'self'` | `style.css` + `fonts/fonts.css`. `main.js` never writes a `style` attribute. One caveat below: the `<noscript>` block does. |
| `font-src 'self'` | The self-hosted JetBrains Mono woff2 files. |
| `img-src 'self'` | `og-image.png` and the three icon files, all served from this docroot. No `data:` needed: the data-URI SVG favicon is gone, replaced by real `favicon.svg` / `favicon-96.png` / `apple-touch-icon.png`. Add `data:` back only if a data-URI asset ever returns. |
| `base-uri 'none'` | Nothing to gain from a `<base>` tag, plenty to lose. |
| `form-action 'self'` | The prompt is a `<form>` whose submit is cancelled in JS. If JS ever dies, the fallback submit is a same-origin reload rather than a CSP violation. |
| `frame-ancestors 'none'` | Replaces `X-Frame-Options: DENY`, which is now legacy. Add the old header too only if some scanner insists on seeing it. |
| `upgrade-insecure-requests` | Cheap insurance against a hand-written `http://` asset path slipping in later. |

### One real blocker: inline styles in the `<noscript>` fallback

`style-src 'self'` also covers `style` **attributes**, and the no-JS fallback block in
`index.html` currently carries six of them (`<section style="border: 1px solid ...">`,
`<p style="margin-top: 1rem;">`, and so on). Under the policy above those attributes are
dropped, so a visitor with JavaScript disabled gets the correct text with no spacing and
no border. Not a broken page, but not the intended one either, and the console will log
six violations that make the real signal harder to read.

The fix belongs in the site, not in the header: move those declarations into `style.css`
under a `.noscript-card` class and friends, then this policy is clean as written. Do that
before step 5 of the checklist.

If the headers absolutely have to ship first, the interim policy is

```apache
  # TEMPORARY: until the <noscript> inline style attributes move into style.css.
  Header always set Content-Security-Policy "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
```

and it comes back out the same day the CSS lands. `'unsafe-inline'` on `style-src` is a
much smaller hole than on `script-src`, but it is still a hole, and leaving it in place
because it works is how these headers rot. Hashes are not an option worth taking here:
style attributes need `'unsafe-hashes'` plus one hash per distinct attribute value, which
is more moving parts than the CSS class it replaces.

### The JSON-LD question, answered correctly

`index.html` is about to grow a `<script type="application/ld+json">` block with the
Person schema. **It needs no CSP change: no hash, and absolutely no `'unsafe-inline'`.**

The reason is not a loophole, it is how the HTML spec sequences things. When the browser
prepares a `<script>` element it first determines the script type; a type that is not a
JavaScript MIME type, not `module` and not `importmap` makes the element a *data block*,
and preparation returns right there. The element is never executed, and the CSP inline
check, which comes later in that same algorithm, is never reached. `script-src 'self'`
therefore does not block `application/ld+json`, and Google's own structured data
guidance assumes exactly that.

Two consequences worth keeping straight:

* Adding `'unsafe-inline'` "for the JSON-LD" would buy nothing and would disable inline
  script protection for the whole document. Never do it.
* Adding a `sha256-` hash for the block would also buy nothing, and would need
  regenerating on every byte of content change. Skip it. If some scanner reports the
  JSON-LD as an inline-script finding, the finding is wrong; the browser console is the
  authority, and it stays silent.

### Rollout in report-only first

Before enforcing, ship the same policy as report-only for one browsing session:

```apache
  Header always set Content-Security-Policy-Report-Only "default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"
```

Load `https://veskov.dev/?snap` with devtools open, click every nav link, type a few
commands. Zero violations in the console means the enforcing version is safe. There is
no report collector on this box, so the console is the only reporting channel; that is
fine for a five-file static site.

### HSTS ramp

`max-age=300` first, so a mistake expires in five minutes instead of a year. After the
https vhost, the cert (including `www`) and the redirect have all been quiet for at
least a day:

```apache
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

`includeSubDomains` only after confirming nothing else lives under `*.veskov.dev`
without TLS. No `preload` token: preloading is effectively irreversible and this domain
has no reason to take that bet.

---

## 3. Modules: headers, compression, HTTP/2

Loading a module is process-wide, so it affects the other tenants' Apache too, though
none of them get new behaviour until a directive uses the module. Reload, never restart.

```bash
a2enmod headers deflate brotli
apache2ctl configtest && systemctl reload apache2
```

`mod_deflate` is usually enabled already on Ubuntu; `a2enmod` on an enabled module is a
no-op that says so.

### HTTP/2: check the MPM first

```bash
apache2ctl -M 2>/dev/null | grep -E 'mpm|php|http2'
```

* `mpm_event` and no `php_module`: safe, proceed.
* `mpm_prefork` (typically because a tenant runs mod_php): **stop.** HTTP/2 needs
  event or worker, and switching the MPM is a box-wide change that can take other
  tenants' sites down. Leave HTTP/1.1 in place and revisit only if those tenants ever
  move to php-fpm. This is not a hill worth dying on for a static page.

If the MPM is fine:

```bash
a2enmod http2
```

and inside `<VirtualHost *:443>` for veskov.dev only:

```apache
  Protocols h2 http/1.1
```

Per-vhost `Protocols` keeps the other tenants on whatever they have today.

### Compression, inside the vhost

```apache
  # --- compression --------------------------------------------------------
  # woff2 is already compressed; deliberately not in either list.
  AddOutputFilterByType BROTLI_COMPRESS text/html text/css text/plain text/xml application/xml application/javascript text/javascript application/json image/svg+xml
  AddOutputFilterByType DEFLATE         text/html text/css text/plain text/xml application/xml application/javascript text/javascript application/json image/svg+xml
```

Both filters inspect `Accept-Encoding` and remove themselves when they are not wanted,
so brotli serves clients that offer `br` and gzip covers the rest. `text/javascript` and
`application/javascript` are both listed because which one Apache picks for `.js`
depends on the mime.types version shipped with the distro.

---

## 4. Cache-Control

Inside `<VirtualHost *:443>`, after the headers block:

```apache
  # --- caching ------------------------------------------------------------
  # Fonts and raster assets: the bytes behind these names do not change.
  <FilesMatch "\.(woff2|png|jpe?g|ico)$">
    Header always set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # Theme, engine, favicon: short leash, these get deployed often.
  <FilesMatch "\.(css|js|svg)$">
    Header always set Cache-Control "public, max-age=3600"
  </FilesMatch>

  # Entry point and crawler files: always revalidate.
  <FilesMatch "\.(html|txt|xml)$">
    Header always set Cache-Control "no-cache"
  </FilesMatch>
```

`no-cache` means "revalidate before reuse", not "do not store". That is what an HTML
entry point wants: a 304 on every visit, and new content the moment it ships.

**Trap: no filenames are content-hashed here.** `immutable` on a name that can change
content is a year-long stale-cache promise you cannot take back from a visitor's browser.
So:

* Land the real bold font (`jetbrains-700.woff2` is currently byte-identical to the 400,
  see REVIEW.md) **before** this block goes live, or ship it under a new name such as
  `jetbrains-700.v2.woff2` with `fonts/fonts.css` updated to match.
* Same rule forever after: to change a `woff2` or a `png`, rename it.

---

## 5. www.veskov.dev

Three things are missing and the order matters, because the cert cannot be issued for a
name that does not resolve, and a name that resolves without a matching cert produces a
browser warning.

1. **DNS**, at the registrar/DNS provider:

   ```
   www.veskov.dev.  A     159.69.8.29
   ```

   Add `AAAA` too if the box has public IPv6 (`ip -6 addr show scope global`). Set TTL to
   300 while testing, raise afterwards. Verify:

   ```bash
   dig +short www.veskov.dev A
   ```

2. **Cert SAN.** The port-80 vhost from section 1 already carries
   `ServerAlias www.veskov.dev`, which is what lets the HTTP-01 challenge land in the
   right docroot:

   ```bash
   certbot certonly --webroot -w /var/www/veskov.dev \
     --cert-name veskov.dev -d veskov.dev -d www.veskov.dev --expand
   ```

   `certonly --webroot` is deliberate: `certbot --apache` rewrites vhost files, and on a
   shared box that is a blast radius nobody asked for. Verify:

   ```bash
   certbot certificates | grep -A2 'Certificate Name: veskov.dev'
   ```

3. **`ServerAlias`** in `veskov.dev-le-ssl.conf`, only after step 2 succeeds:

   ```apache
   ServerAlias www.veskov.dev
   ```

   The apex stays canonical; `www` over https keeps working, and the `<link rel="canonical">`
   plus `sitemap.xml` continue to point at `https://veskov.dev/`.

---

## 6. New static files the deploy must carry

The site fixes add files that do not exist on the box yet. The `scp` line in `README.md`
copies only `index.html style.css main.js fonts`, so without this change the new
`<meta>` tags and the sitemap point at 404s:

```bash
scp -r index.html style.css main.js fonts \
       og-image.png favicon.svg favicon-96.png apple-touch-icon.png \
       robots.txt sitemap.xml \
       root@159.69.8.29:/var/www/veskov.dev/
ssh root@159.69.8.29 'chown -R www-data:www-data /var/www/veskov.dev'
```

All six land at the docroot root, i.e. `https://veskov.dev/og-image.png` and friends,
which is what `robots.txt`, the `og:image` meta and the icon links assume. Verify each
one is actually there and typed correctly:

```bash
for f in og-image.png favicon.svg favicon-96.png apple-touch-icon.png robots.txt sitemap.xml; do
  printf '%-24s %s\n' "$f" "$(curl -sI "https://veskov.dev/$f" | awk 'NR==1||/^[Cc]ontent-[Tt]ype/' | tr -d '\r' | paste -sd' ' -)"
done
```

Expected: `200` for all six, `image/png`, `image/svg+xml`, `text/plain`, `application/xml`
or `text/xml`. Apache's default mime.types handles all of these; nothing to configure.

---

## 7. Apply checklist

Ordered. Each step ends with its own verification. If a verification fails, stop and roll
back that step before continuing; do not stack changes on top of a broken one.

**Step 0. Back up the two vhosts.**

```bash
mkdir -p /root/backups
tar czf /root/backups/apache-veskov-$(date +%F-%H%M).tar.gz \
    /etc/apache2/sites-available/veskov.dev.conf \
    /etc/apache2/sites-available/veskov.dev-le-ssl.conf
tar tzf /root/backups/apache-veskov-*.tar.gz | tail -2
```

**Step 1. Enable modules** (section 3).

```bash
a2enmod headers deflate brotli
apache2ctl configtest && systemctl reload apache2
apache2ctl -M 2>/dev/null | grep -E 'headers|deflate|brotli'
```

Verify: all three listed as `_module (shared)`, and the other tenants' sites still
answer (`curl -sI https://<neighbour-domain>/ | head -1`).

**Step 2. Port-80 redirect** (section 1).

```bash
a2ensite veskov.dev            # if it was not enabled
apache2ctl configtest && systemctl reload apache2
curl -sI http://veskov.dev/ | head -n 4
curl -sIL http://veskov.dev/?snap | grep -E '^HTTP/|^[Ll]ocation'
```

Verify: `301` plus `Location: https://veskov.dev/`, then `200` on the https hop, and no
redirect loop. The May 2024 `Last-Modified` must be gone.

**Step 3. Deploy the new static files** (section 6), then the loop from that section.

Verify: six `200`s.

**Step 4. CSP in report-only** (section 2).

```bash
apache2ctl configtest && systemctl reload apache2
curl -sI https://veskov.dev/ | grep -i content-security-policy-report-only
```

Then open `https://veskov.dev/` in a browser with the console visible, click all four
nav links, run `help`, `work`, `projects`, `clear`. Verify: no CSP violation lines. Then
disable JavaScript and reload once, to catch the `<noscript>` inline-style issue from
section 2 if that CSS has not moved yet.

**Step 5. Enforcing CSP + the rest of the headers, HSTS at `max-age=300`** (section 2).
Delete the report-only line in the same edit.

```bash
apache2ctl configtest && systemctl reload apache2
curl -sI https://veskov.dev/ | grep -iE 'content-security-policy|strict-transport|x-content-type|referrer-policy|permissions-policy'
```

Verify: five headers, `Strict-Transport-Security: max-age=300`, and the page still
renders with a silent console.

**Step 6. Cache-Control** (section 4). Confirm the real bold font shipped first.

```bash
apache2ctl configtest && systemctl reload apache2
curl -sI https://veskov.dev/fonts/jetbrains-400.woff2 | grep -i cache-control
curl -sI https://veskov.dev/style.css                 | grep -i cache-control
curl -sI https://veskov.dev/                          | grep -i cache-control
```

Verify: `immutable` for the font, `max-age=3600` for the css, `no-cache` for the HTML
(the last one proves `FilesMatch` resolves through the directory index to `index.html`).

**Step 7. Compression** (section 3).

```bash
curl -sI -H 'Accept-Encoding: br'   https://veskov.dev/main.js | grep -i content-encoding
curl -sI -H 'Accept-Encoding: gzip' https://veskov.dev/main.js | grep -i content-encoding
curl -sI -H 'Accept-Encoding: br'   https://veskov.dev/fonts/jetbrains-400.woff2 | grep -ci content-encoding
```

Verify: `br`, then `gzip`, then `0` for the woff2 (already compressed, must not be
double-compressed).

**Step 8. HTTP/2**, only if step 3 of section 3 cleared the MPM check.

```bash
apache2ctl configtest && systemctl reload apache2
curl -sI --http2 https://veskov.dev/ | head -1
```

Verify: `HTTP/2 200`. Then check a neighbour domain still answers on HTTP/1.1 as before.

**Step 9. www** (section 5): DNS, then certbot, then `ServerAlias`.

```bash
dig +short www.veskov.dev
curl -sI https://www.veskov.dev/ | head -n 4
curl -sI http://www.veskov.dev/  | head -n 4
```

Verify: the A record resolves, https on `www` gives a valid cert (no `curl -k` needed)
and the apex redirect works from `www` over http.

**Step 10. Raise HSTS** after a quiet day (section 2), then:

```bash
curl -sI https://veskov.dev/ | grep -i strict-transport
```

Verify: `max-age=31536000; includeSubDomains`.

**Step 11. Final sweep.**

```bash
curl -sI https://veskov.dev/ ; curl -sI --http2 https://veskov.dev/robots.txt | head -1
apache2ctl -S 2>&1 | grep -i veskov
tail -n 40 /var/log/apache2/veskov.dev-error.log
```

Verify: clean error log, and every neighbour vhost still listed exactly as it was in the
`apache2ctl -S` output captured in section 1.

---

## 8. Rollback

Every step above is one vhost file plus one graceful reload, which is the entire reason
it is sliced this way.

**A config that fails `configtest`:** do not reload. A failed `configtest` costs nothing;
a reload with broken config is refused by Apache, but a `restart` with broken config
takes every tenant on the box down. Never `systemctl restart apache2` here. Fix the file
or restore it, then reload.

**Undo one step:** restore the file and reload.

```bash
tar xzf /root/backups/apache-veskov-<stamp>.tar.gz -C / \
    etc/apache2/sites-available/veskov.dev-le-ssl.conf
apache2ctl configtest && systemctl reload apache2
```

**Take the site out of the picture entirely** (leaves the other tenants untouched):

```bash
a2dissite veskov.dev veskov.dev-le-ssl
apache2ctl configtest && systemctl reload apache2
```

**Undo a module:** `a2dismod brotli http2` then configtest and reload. Only do this
after the directives that use the module are gone from the vhost, otherwise configtest
fails on an unknown directive.

**The one thing that does not roll back:** HSTS already sent to a browser is cached by
that browser for its full `max-age`. That is precisely why step 5 ships `max-age=300`
and step 10 waits a day. If HSTS at a year has to be withdrawn, the only clean move is
serving `max-age=0` for at least as long as the old value was cached, and hoping
everyone comes back. Do not skip the ramp to save five minutes.

---

## 9. curl serves the resume

The `cv` command on the page and `cv.txt` itself both promise that
`curl veskov.dev` returns the plain-text resume. The promise is kept by a
user-agent rewrite in **both** veskov.dev vhosts, and it must go live in the same
breath as the first deploy that ships `/cv.txt`, or the page lies in the gap.

In `veskov.dev.conf` (port 80), **before** the https redirect rule, so a terminal
gets the file directly with no 301 dance:

```apache
  # terminal users get the resume, browsers get the redirect below
  RewriteCond %{HTTP_USER_AGENT} ^(curl|wget|httpie)/ [NC]
  RewriteRule ^/?$ /cv.txt [L]
```

In `veskov.dev-le-ssl.conf` (port 443), same pair plus `RewriteEngine On`, which
the ssl vhost does not have yet.

Notes:

* Only the exact root path rewrites. The deploy workflow's verify step curls
  `/index.html` and `/cv.txt` by name, so it is unaffected either way.
* Cache safety comes from the existing `no-cache` on html/txt rather than a
  `Vary: User-Agent` header: every response revalidates, and no shared cache
  sits in front of this box. Add `Vary` only if a CDN ever appears.
* Own habit to keep: `curl -sI https://veskov.dev/` now answers for `/cv.txt`;
  header checks against the HTML must hit `/index.html` or pass `-A Mozilla/5.0`.

Verification:

```bash
curl -s  https://veskov.dev/ | head -3        # the ascii banner, not <!doctype>
curl -s  http://veskov.dev/  | head -3        # same, straight over http, no 301
curl -sI -A "Mozilla/5.0" https://veskov.dev/ | head -1   # browsers: HTTP/2 200 html
curl -s  https://veskov.dev/index.html | head -1          # path form untouched
```

## Applied log (2026-08-18)

Steps 0-8 and 11 went live on 2026-08-18, one phase per reload, commands pasted by
Vesko, external verification (curl + a full browser session against the enforcing
CSP) after each. Backup of all touched vhosts:
`/root/backups/apache-veskov-2026-08-18-1648.tar.gz`. Two places where the live box
disagreed with this document's assumptions:

1. **The stale port-80 page was `000-default.conf`'s doing, not a missing
   `ServerName` in ours.** The box's FQDN is literally `veskov.dev` and the stock
   `000-default.conf` ships with no `ServerName`, so the default vhost computed its
   own name as `veskov.dev`, loaded first, and swallowed the domain's port-80
   traffic; `veskov.dev.conf` was enabled and correct all along. Fix: one line in
   the shared file - an explicit `ServerName localhost` - plus the section-1 vhost
   replacing `veskov.dev.conf` (without `ServerAlias www.veskov.dev` until step 9's
   DNS exists). Raw-IP requests still land on the stock page, exactly as before.
2. **`Protocols h2 http/1.1` did not stay per-vhost in practice.** On this
   Apache 2.4.52 / OpenSSL 3.0.2 build, ALPN negotiation offers h2 to the sibling
   vhosts too: calculator and locations now answer over HTTP/2 as well. Benign
   here (mpm_event, no mod_php, every vhost on the box is Vesko's own, HTTP/1.1
   fallback verified working) - but it is a box-wide behaviour change, not the
   scoped one section 3 promised. Known before flipping the switch elsewhere.

Section 9 (curl serves the resume) went live on 2026-08-19, minutes after the
deploy that shipped `/cv.txt`: both vhosts got the user-agent pair, and all four
verification curls passed (banner for curl/wget/httpie over http and https,
normal HTML for browsers, `/index.html` untouched, `text/plain` on the trick).

Also surfaced: `softuni-react.veskov.dev` no longer resolves in DNS, so its two
vhosts are dead weight - a candidate for `a2dissite` cleanup someday.

Deviations from the letter of the checklist: steps 6+7+8 were applied as a single
vhost replacement (one reload), then verified individually; the `<noscript>`
inline-style blocker from section 2 never materialized because that CSS had already
moved to classes before the headers shipped, so the CSP went straight to enforcing
after one clean report-only browser session.

Step 9 went live later the same day, after Vesko added the `www` A record at the
registrar: `ServerAlias` into the port-80 vhost first (so HTTP-01 lands in the
right docroot), then `certbot certonly --webroot --expand` (cert now carries both
SANs, expiry 2026-11-16, renewal switched to webroot - no more vhost-rewriting
`--apache` runs), then `ServerAlias` into the le-ssl vhost. Verified: `https://www`
answers HTTP/2 200 with a valid cert and the full header set, `http://www` 301s to
the apex, the apex is untouched. Note: neither apex nor www has an AAAA record,
though the box has public IPv6 - consistent today, and a deliberate pair-decision
for another day.

Step 10 also went out on 2026-08-18: Vesko chose to skip the quiet-day ramp on a
zero-traffic site whose redirect, cert and www had all just been verified, so HSTS
went `max-age=300` -> `max-age=31536000; includeSubDomains` the same afternoon
(no `preload`, per section 2). `includeSubDomains` was checked safe first:
calculator and locations are TLS-only, softuni-react's DNS is gone. Verified on
apex, www and a 404. Nothing in this document remains unapplied; from here the
only recurring duty is the caching trap - to change a `woff2`/`png`, rename it.
