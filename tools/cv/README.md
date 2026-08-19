# tools/cv

`cv.html` is the print source for the resume PDF served at
[veskov.dev/cv.pdf](https://veskov.dev/cv.pdf). It is deliberately
self-contained: all CSS inline, JetBrains Mono inlined as `data:` URIs, zero
external requests, so it renders the same on any machine.

The plain-text sibling, `/cv.txt`, is maintained by hand at the repo root and
kept to 7-bit ASCII within 80 columns.

## Regenerate cv.pdf

Edit `tools/cv/cv.html`, then render it to the repo root:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=3000 \
  --print-to-pdf=cv.pdf \
  "file://$PWD/tools/cv/cv.html"
```

Chrome honours the `@page { size: A4 }` rule, so the output is A4. Playwright
(`npx -y playwright pdf ...`) also works but forces US Letter, so prefer Chrome.

Sanity checks before committing:

- `file cv.pdf` says "PDF document, 2 pages" and `pdfinfo cv.pdf` reports A4
  (594.96 x 841.92 pts); the file lands in the 30-300 KB range.
- `pdftotext cv.pdf - | head` returns real selectable text (the PDF has to stay
  ATS-readable, never an image).
- `pdffonts cv.pdf` shows no `.SFNS` rows. The body stack is deliberately
  `Helvetica, Arial, sans-serif`: a system-font stack makes Chrome embed macOS
  San Francisco as Type 3 subsets, which is a licensing and ATS problem. The
  JetBrains Mono subsets are expected, they come from the inlined `data:` URIs.
- `pdfinfo cv.pdf | grep Creator` still says HeadlessChrome. Scrub it if a tool
  is at hand, for example
  `exiftool -Creator="Vesko Vasilev" -Author="Vesko Vasilev" -Producer= cv.pdf`,
  otherwise ship it as rendered.
