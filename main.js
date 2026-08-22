/* ============================================================
   veskov.dev :: terminal
   ------------------------------------------------------------
   ★  EDIT THIS BLOCK: everything personal lives here.  ★
   ============================================================ */
const CONFIG = {
  name:    "vesko_vasilev",
  handle:  "veskov",
  role:    "full-stack engineer: typescript · node · react",
  location: "Troyan, Bulgaria",
  tagline: "Twelve years keeping other people's servers alive, now building the software that runs on them. I ship things that are observable, automated, and boring to operate.",

  about: [
    "I'm Vesko, a full-stack engineer in Troyan, Bulgaria. I build the unglamorous half well: typed APIs, migrations that survive a rollback, deploys nobody has to stay awake for. The instincts came from the hosting industry, which showed me how production actually breaks long before I was the one writing it.",
    "The clearest example is the Bulgarian Volleyball Federation's software, which I build as its sole engineer: the electronic licence registry, in production since 2025, and the competition platform, delivered for the 2026/27 season: schedule generation, standings, match bulletins, and a court-side live-scoring PWA.",
    "The systems background still shows in how I build: small dependencies, real tests, and a sysadmin's instinct for what breaks at 3am. This page is served from a small Hetzner box that also hosts a few other experiments.",
    "Outside the day job: Kanban 3.0, an AI product-owner assistant bolted onto a kanban board, paying people out over Hedera the moment their card lands in Complete, took 2nd place at the 2024 Hedera hackathon. I also mentor student teams shipping their first product at Teenovator.",
    "Currently interviewing. If you are hiring senior full-stack engineers, email is the fast path; the rest of this terminal is the scenic route.",
  ],
  /* precise taxonomy: virtualization means hypervisors, web servers live with linux */
  skills: [
    { group: "languages",      items: ["typescript", "c#"] },
    { group: "frontend",       items: ["react 19", "next.js", "tanstack", "shadcn/ui"] },
    { group: "backend",        items: ["node.js", "nestjs", ".net", "graphql", "kafka"] },
    { group: "databases",      items: ["postgresql", "mssql", "prisma"] },
    { group: "devops",         items: ["docker", "kubernetes", "github actions"] },
    { group: "virtualization", items: ["kvm", "proxmox", "incus", "openvz"] },
    { group: "systems",        items: ["linux", "nginx", "apache"] },
    { group: "tooling",        items: ["vitest", "git", "neovim", "bash", "terraform", "ansible"] },
  ],
  /* the ones the job hunt runs on: rendered with an amber accent */
  coreSkills: ["typescript", "node.js", "react 19"],

  /* ordered by relevance, not by date: the engineering roles first, rendered by `cat ~/experience.md` */
  experience: [
    {
      role: "Full-Stack Engineer (Contract)",
      org:  "Bulgarian Volleyball Federation",
      when: "2022-present · remote",
      desc: "Sole engineer behind the federation's entire software estate and the vision for its digital development: I conceive the systems, own the architecture, and ship end to end, advising the administrative director on every digital decision. The licensing system is in production since 2025; the competition platform is delivered and launches with the 2026/27 season.",
    },
    {
      role: "Lead Full-Stack Engineer (Contract)",
      org:  "Nota Bene pharmacy chain",
      when: "2024-present · remote",
      desc: "Lead the four-person team digitalising the chain: I scope the projects, own delivery, and write some of the code. Shipped the compounding lab's order journal, the cash-flow book that catches missing cash, a REST service over the legacy Firebird databases, and a bot that babysits a flaky national export. Rolled it all out across 50 pharmacies and 400+ employees single-handedly.",
    },
    {
      role: "Senior System Administrator",
      org:  "Nodisto IT, LLC (VPSDime · Backupsy · Winity)",
      when: "2014-2026 · remote",
      desc: "Four people, 200+ hypervisors, 10,000+ virtual machines, six data centers, three VPS brands. In-house Go orchestrator replacing SolusVM, a self-service control panel, monitoring that acts directly in WHMCS, automated order review with fraud scoring, template builds, and a 15-minute response time, 24/7/365.",
    },
    {
      role: "Co-Founder",
      org:  "ImpactHost Ltd.",
      when: "2016-2023",
      desc: "Co-founded a cloud provider selling resource pools you carve into your own virtual machines. Stood up the physical platform from zero: procurement, rack mounting, hypervisors, billing, SolusVM, backups. 1,500+ customers at peak; sold into AlphaVPS.",
    },
    {
      role: "Chief Operations Officer",
      org:  "AlphaVPS (DA International Group Ltd.)",
      when: "2013-2022 · remote",
      desc: "Nine years, every rung of the ladder: joined at inception as a junior sysadmin, left as COO of a VPS provider with infrastructure on multiple continents. Led the tech support team, owned onboarding, processes and daily operations end to end, and racked every server and ran every cable in the Sofia datacenter myself.",
    },
    {
      role: "Regional Coordinator",
      org:  "Bulgarian Volleyball Federation, Region Hemus",
      when: "2023-2025",
      desc: "Bulgaria's largest region by area and clubs (27). Hybrid championship formats got teams 60% more matches for the same travel, and the region climbed from last to 4th in the national ranking. The domain knowledge became the federation's competition platform.",
    },
    {
      role: "President & Manager",
      org:  "VC Troyan Volley (part-time)",
      when: "2018-present",
      desc: "Run a non-profit club with 110+ athletes competing in 12 of 14 national age groups: funding, logistics, and a full season calendar.",
    },
  ],

  projects: [
    {
      name:  "bvf-registry",
      desc:  "The federation's electronic licensing system: clubs, players, coaches, licences, transfers, halls and season applications, feeding the admin SPA and the public register on bvf.bg. 185 endpoints, 1,383 backend tests behind a hard 100% coverage gate. In production since 2025.",
      stack: ["c# / .net 10", "ef core", "sql server", "react 19", "tanstack query"],
      link:  "",
      demo:  "https://db.bvf.bg",
      note:  "private repo, client system",
    },
    {
      name:  "bvf-competitions",
      desc:  "The federation's competition platform, single source of truth from season down to match: FIDE-verified Berger schedule generation, playoff brackets, standings under official BVF rules, and .docx match bulletins emailed to clubs. 90,000 lines of TypeScript, 622 automated tests. The prototype scheduled the Hemus region's 2025/26 season.",
      stack: ["typescript", "react 19", "strapi 5", "playwright"],
      link:  "",
      demo:  "",
      note:  "private repo, client system, delivered",
    },
    {
      name:  "bvf-livescore",
      desc:  "Court-side live scoring PWA for match secretaries: token-guarded match links, offline-tolerant, full FIVB indoor and beach rules on a dependency-free, event-sourced scoring engine.",
      stack: ["typescript", "react 19", "pwa", "vitest"],
      link:  "",
      demo:  "",
      note:  "part of the competition platform, private repo",
    },
    {
      name:  "bvf-distances",
      desc:  "Picks the optimal host for a tournament round: Google Distance Matrix over the region's clubs, minimising total real road travel, with the routes drawn on a map. Built in two days for the Hemus region.",
      stack: ["typescript", "react 19", "node.js", "express", "sqlite"],
      link:  "",
      demo:  "https://locations.veskov.dev",
      note:  "MIT",
    },
    {
      name:  "notabene-journal",
      desc:  "Journal for Nota Bene's compounding laboratory: an eight-state order lifecycle with a field-level audit trail, mobile prescription capture, one-click thermal label printing, a self-service portal where the chain's pharmacies place their own orders, Speedy courier integration, push notifications, and Excel reports on volumes, turnover and top prescribing doctors. In production across the chain.",
      stack: ["strapi 5", "mysql", "react 19", "tanstack start"],
      link:  "",
      demo:  "",
      note:  "private repo, client work",
    },
    {
      name:  "notabene-cashbook",
      desc:  "Built to catch missing cash: employees track till shifts, report register and safe amounts, and the software reconciles them against takings pulled live from the POS system, with configurable tolerances, QR photo evidence, and an incident workflow from detection to resolution. Grew into the chain's operations platform: rosters, payroll, analytics that replaced a legacy Excel workbook, compliance questionnaires, and a driver cash portal. 64 data models, 106,000 lines of TypeScript, 1,000+ tests.",
      stack: ["next.js", "prisma", "postgresql", "opentelemetry"],
      link:  "",
      demo:  "",
      note:  "private repo, client work",
    },
    {
      name:  "notabene-axp-service",
      desc:  "REST service exposing the chain's legacy Firebird pharmacy databases: sales summaries, NZOK and profit reports, behind a central pharmacy registry. Runs in production as a Windows service.",
      stack: ["nestjs", "typescript", "firebird", "mysql"],
      link:  "",
      demo:  "",
      note:  "private repo, client work",
    },
    {
      name:  "notabene-nwa-bot",
      desc:  "A stubborn Python bot that retries the flaky national NWA export hourly through the night, validates every pharmacy made it in, imports the best run and emails the outcome.",
      stack: ["python", "selenium", "sqlite"],
      link:  "",
      demo:  "",
      note:  "private repo, client work",
    },
    {
      name:  "pushdb",
      desc:  "Database backup orchestration SaaS, born from running backup-heavy hosting infrastructure for a decade. Monorepo with a web app, a scheduler and a worker, containerised and deployed to Kubernetes.",
      stack: ["typescript", "tanstack start", "postgresql", "docker", "kubernetes"],
      link:  "",
      demo:  "",
      note:  "private repo, work in progress",
    },
  ],

  contacts: {
    status:   "open to senior full-stack roles · remote or EU",
    email:    "payvesipal@gmail.com",
    github:   "https://github.com/becuhkyy",
    linkedin: "https://www.linkedin.com/in/vesko-vasilev-a49795127/",
    // add or remove rows freely, they render automatically
  },

  /* since when the unit reports itself as available */
  availableSince: "Aug 2026",

  /* the numbers `systemctl status` prints; PID 1 because a career is the init
     process of everything else, not because of any birth year */
  status: {
    pid:      1,
    tenure:   "12 years in production, no known leaks",
    timezone: "EET, UTC+2/+3",
    docs:     "https://veskov.dev",
  },

  /* {quote, name, role, org} each. While this array is empty the whole feature
     stays hidden: no command, no help row, no references.md, no completion.
     Fill it in and the terminal grows a references section on its own. */
  references: [],
};

/* the session that types itself after boot */
const AUTO_SEQUENCE = [
  "whoami",
  "cat ~/tagline.txt",
  "cat ~/about.md",
  "cat ~/experience.md",
  "ls -la ~/projects/",
  "cat ~/contacts.md",
  "help",
];
/* ============================================================
   Everything below is machinery, no need to touch it.
   ============================================================ */

const $  = (s) => document.querySelector(s);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls)  n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};
const PARAMS = new URLSearchParams(location.search);
// '?snap' runs the whole session instantly (testing / no-animation preview);
// so does a visitor who asked their OS for less motion
const SNAP =
  PARAMS.has("snap") ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// esc (or the hint) fast-forwards boot + intro; only ever true while the intro runs
let skipping = false;
const waiting = new Set(); // live sleeps, so a skip can cut them all short
const sleep = (ms) => {
  if (SNAP || skipping) return Promise.resolve();
  return new Promise((r) => {
    const wake = () => { clearTimeout(timer); waiting.delete(wake); r(); };
    const timer = setTimeout(wake, ms);
    waiting.add(wake);
  });
};
function wakeAll() { [...waiting].forEach((wake) => wake()); }

const history  = $("#history");
const input    = $("#prompt-input");
const viewport = $("#viewport");
const windowEl = $("#window");

/* the block cursor lives after the input, so the input is only ever as wide as
   its own text; every write to input.value goes through setInput to keep them
   glued together */
function sizeInput() {
  input.style.width = Math.max(1, input.value.length + 1) + "ch";
}
function setInput(value) {
  input.value = value;
  sizeInput();
}
input.addEventListener("input", sizeInput);

/* the reader wins: only glue to the bottom while they are already down there.
   During the intro the rules are stricter: the moment the session outgrows the
   viewport, following stops so the visitor reads top-down at their own pace,
   and it only resumes if they scroll to the bottom themselves. */
const SCROLL_SLACK = 150;
let stickToBottom = true;
let introOverflow = false;      // the intro has grown past one screen
let readerScrolled = false;     // the visitor has scrolled on purpose
function nearBottom() {
  return viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - SCROLL_SLACK;
}
viewport.addEventListener("scroll", () => { stickToBottom = nearBottom(); }, { passive: true });
["wheel", "touchmove"].forEach((ev) =>
  window.addEventListener(ev, () => { readerScrolled = true; }, { passive: true })
);

function scrollBottom() {
  if (introRunning && viewport.scrollHeight > viewport.clientHeight + 4) {
    if (!introOverflow) { introOverflow = true; stickToBottom = false; }
    if (!readerScrolled) return; // they are reading from the top: do not drag them
  }
  if (stickToBottom) viewport.scrollTo(0, viewport.scrollHeight);
}

/* ---------- Boot sequence ---------- */
const BOOT_LINES = [
  "[ OK ] veskov.dev kernel 6.9.0 loading…",
  "[ OK ] mounting /dev/curiosity",
  "[ OK ] starting apache2 … already running (other tenants undisturbed)",
  "[ OK ] starting window manager … one window is enough",
  "[ OK ] establishing session for guest",
  "",
  "welcome to veskov.dev · last login: just now",
];
/* the overlay is opaque, so nothing behind it should be reachable by Tab */
function setBehindInert(on) {
  [document.querySelector("main"), document.querySelector("header"),
   document.querySelector(".topnav")].forEach((n) => {
    if (!n) return;
    if (on) n.setAttribute("inert", "");
    else n.removeAttribute("inert");
  });
}

let bootJump = null; // while the log is playing: dump whatever is left, at once

function boot() {
  return new Promise((done) => {
    const log = $("#boot-log");
    let i = 0, timer = null, over = false;
    const finish = () => {
      if (over) return;
      over = true;
      bootJump = null;
      clearTimeout(timer);
      $("#boot").classList.add("done");
      setBehindInert(false);
      done();
    };
    const dump = () => {
      while (i < BOOT_LINES.length) log.textContent += BOOT_LINES[i++] + "\n";
      finish();
    };
    bootJump = dump;
    (function next() {
      if (SNAP || skipping) return dump(); // '?snap' / esc: nobody is watching this
      if (i < BOOT_LINES.length) {
        log.textContent += BOOT_LINES[i++] + "\n";
        timer = setTimeout(next, 120 + Math.random() * 150);
      } else {
        timer = setTimeout(finish, 400);
      }
    })();
  });
}

/* ---------- Typing: fast, irregular, human ---------- */
function typeDelay(ch) {
  if (Math.random() < 0.05) return 160 + Math.random() * 240; // hesitation
  if (ch === " ") return 45 + Math.random() * 70;
  return 14 + Math.random() * 42;
}

/* auto-typing happens directly in the live prompt input */
async function typeIntoInput(cmd) {
  if (SNAP || skipping) { setInput(cmd); return; } // no theatre requested

  // occasionally fumble one character and correct it, like a person
  const fumbleAt =
    cmd.length > 6 && Math.random() < 0.35
      ? 2 + Math.floor(Math.random() * (cmd.length - 4))
      : -1;

  for (let i = 0; i < cmd.length; i++) {
    if (skipping) { setInput(cmd); return; } // esc mid-word: land the whole line
    if (i === fumbleAt) {
      setInput(input.value + "asdfghjkl"[Math.floor(Math.random() * 9)]);
      scrollBottom();
      await sleep(220 + Math.random() * 200);
      setInput(input.value.slice(0, -1)); // backspace
      await sleep(120 + Math.random() * 120);
    }
    setInput(input.value + cmd[i]);
    scrollBottom();
    await sleep(typeDelay(cmd[i]));
  }
  await sleep(140 + Math.random() * 200); // beat before hitting enter
}

/* ---------- Command execution ----------
   `busy` is true only while auto-typed lines are playing: then the session is
   driving and the prompt is locked. A command the visitor submitted themselves
   runs at once, with no lock and no beat, so no keystroke is ever swallowed. */
let busy = false;
const pending = [];
let queueDone = Promise.resolve();

const cmdLog = [];
let logIdx = -1;

function enqueue(cmd, typed) {
  if (!typed && !busy && !pending.length) { commit(cmd); return; }
  pending.push({ cmd, typed }); // FIFO: a visitor's line waits its turn behind the intro
  if (!busy) queueDone = pump();
}

async function pump() {
  if (busy) return;
  busy = true;
  input.readOnly = true; // session is driving, visitor just watches
  // whatever happens in there, the prompt goes back to the visitor
  try {
    while (pending.length) {
      const { cmd, typed } = pending.shift();
      // anything the visitor left half-typed clears before the session types its own line
      if (typed) { setInput(""); await typeIntoInput(cmd); }
      commit(cmd);
      // a beat between auto-typed lines only; a queued visitor line gets none
      if (typed && pending.length) await sleep(650 + Math.random() * 450);
    }
  } finally {
    busy = false;
    input.readOnly = false;
    input.focus({ preventScroll: true });
  }
}

/* "enter": the line leaves the prompt and commits to the scrollback */
function commit(cmd) {
  const line = el("div", "h-line");
  line.append(
    el("span", "prompt", "guest@veskov.dev"),
    el("span", "path", ":~$ "),
    el("span", "cmd", cmd)
  );
  history.appendChild(line);
  setInput("");

  // output appears immediately; a renderer that throws prints a miss, not a dead session
  let out;
  try {
    out = renderOutput(cmd);
  } catch (err) {
    console.error(err);
    out = textOut((cmd.trim().split(/\s+/)[0] || "command") + ": internal error", "err");
  }
  if (out) {
    out.dataset.cmd = cmd; // lets the nav bar find a section it already printed
    history.appendChild(out);
  }
  cmdLog.push(cmd); // auto-typed and nav lines included, so ArrowUp recalls them
  logIdx = cmdLog.length;
  scrollBottom();
}

/* ---------- Skip affordance ---------- */
let introRunning = false;
let skipHint = null;

function showSkipHint() {
  if (skipHint) return;
  skipHint = el("button", "skip-hint", "esc: skip intro");
  skipHint.type = "button";
  skipHint.addEventListener("click", skipIntro);
  windowEl.appendChild(skipHint);
}

function hideSkipHint() {
  if (!skipHint) return;
  skipHint.remove();
  skipHint = null;
}

// esc, or the hint: boot log and every queued line land at once
function skipIntro() {
  if (skipping) return;
  skipping = true;
  hideSkipHint();
  if (bootJump) bootJump();
  wakeAll(); // whatever is mid-keystroke stops waiting and lands now
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && introRunning) skipIntro();
});

/* ---------- Output renderers ---------- */
function outNode(cls) { return el("div", "out" + (cls ? " " + cls : "")); }

function whoamiOut() {
  const o = outNode();
  const name = el("div", "who-name glitch", CONFIG.name);
  name.dataset.text = CONFIG.name;
  o.appendChild(name);
  o.appendChild(el("div", "who-sub", `${CONFIG.role}`));
  o.appendChild(el("div", "who-sub dim", `${CONFIG.location} · host: veskov.dev`));
  return o;
}

function taglineOut() {
  const o = outNode();
  o.appendChild(el("p", null, CONFIG.tagline));
  return o;
}

function aboutOut() {
  const o = outNode();
  CONFIG.about.forEach((p) => o.appendChild(el("p", null, p)));
  o.appendChild(el("div", "dim", "# skills"));
  const list = el("div", "skill-list");
  CONFIG.skills.forEach((g) => {
    const line = el("div", "skill-group");
    line.appendChild(el("span", "skill-label dim", g.group));
    const tags = el("span", "skill-tags");
    g.items.forEach((s) =>
      tags.appendChild(el("span", CONFIG.coreSkills.includes(s) ? "tag tag-core" : "tag", s))
    );
    line.appendChild(tags);
    list.appendChild(line);
  });
  o.appendChild(list);
  return o;
}

function experienceOut() {
  const o = outNode();
  CONFIG.experience.forEach((e) => {
    const job = el("div", "job");
    job.appendChild(el("div", "j-role", e.role));
    job.appendChild(el("div", "j-org", e.org));
    job.appendChild(el("div", "j-when dim", e.when));
    job.appendChild(el("div", "j-desc", e.desc));
    o.appendChild(job);
  });
  return o;
}

/* "https://www.github.com/becuhkyy/" reads as "github.com/becuhkyy"; the
   linkedin disambiguation hash goes too, or the row wraps on a 390px screen */
function shortLink(url) {
  return url
    .replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "")
    .replace(/^(linkedin\.com\/in\/[a-z0-9-]*?)-[a-z0-9]{6,}$/i, "$1");
}

function contactsOut() {
  const o = outNode();
  Object.entries(CONFIG.contacts).forEach(([k, v]) => {
    const row = el("div", "contact-row");
    row.appendChild(el("span", "c-key", k));
    const isUrl  = /^https?:\/\//i.test(v);
    const isMail = !isUrl && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (isUrl || isMail) {
      const a = el("a", null, isUrl ? shortLink(v) : v);
      a.href = isUrl ? v : "mailto:" + v;
      if (isUrl) { a.target = "_blank"; a.rel = "noopener"; }
      row.appendChild(a);
    } else {
      row.appendChild(el("span", null, v)); // plain value, nothing to link to
    }
    o.appendChild(row);
  });
  return o;
}

/* real `ls -la` prints "Aug 18", never the locale's idea of a short date */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function projectsOut() {
  const o = outNode();
  const ls = el("div", "ls-block dim");
  // same deal as the status block: it clips, so keyboards need a way in
  ls.tabIndex = 0;
  ls.setAttribute("role", "group");
  ls.setAttribute("aria-label", "projects listing");
  const d = new Date();
  const now = MONTHS[d.getMonth()] + " " + String(d.getDate()).padStart(2, " ");
  ls.appendChild(el("div", null, `total ${CONFIG.projects.length}`));
  CONFIG.projects.forEach((p) =>
    ls.appendChild(el("div", null, `drwxr-xr-x  ${CONFIG.handle}  staff  4096  ${now}  ${p.name}/`))
  );
  o.appendChild(ls);

  const grid = el("div", "projects-grid");
  CONFIG.projects.forEach((p) => {
    const card = el("div", "project");
    card.appendChild(el("div", "p-name", p.name));
    card.appendChild(el("div", "p-desc", p.desc));
    card.appendChild(el("div", "p-stack", "stack: " + p.stack.join(" · ")));
    const links = el("div", "p-links");
    if (p.link) { const a = el("a", null, "source"); a.href = p.link; a.target = "_blank"; a.rel = "noopener"; links.appendChild(a); }
    if (p.demo) { const a = el("a", null, "demo");   a.href = p.demo; a.target = "_blank"; a.rel = "noopener"; links.appendChild(a); }
    if (links.children.length) card.appendChild(links);
    if (p.note) card.appendChild(el("div", "p-note dim", p.note));
    grid.appendChild(card);
  });
  o.appendChild(grid);
  return o;
}

/* `systemctl status`, if a career were a unit file. The labels sit in the same
   12-column field the real thing uses, so the block clips instead of reflowing */
function statusOut() {
  const o = outNode();
  const block = el("div", "status-block");
  // the block clips instead of wrapping, so it has to be reachable by keyboard
  block.tabIndex = 0;
  block.setAttribute("role", "group");
  block.setAttribute("aria-label", "systemctl status output");
  const first = CONFIG.name.split(/[\s_-]/)[0];
  const title = CONFIG.role.split(":")[0].trim();
  const s = CONFIG.status;
  const availability = CONFIG.contacts.status || "status unknown";
  const row = (label, value) =>
    (label ? (label + ":").padStart(12) : " ".repeat(12)) + " " + value;

  const head = el("div");
  const dot = el("span", "status-dot", "●");
  dot.setAttribute("aria-hidden", "true"); // decoration: the word "active" is the state
  head.appendChild(dot);
  head.appendChild(el("span", null, ` ${first}.service - ${CONFIG.name}, ${title}`));
  block.appendChild(head);

  [
    ["Loaded",   `loaded (/home/${first}/career.unit; enabled)`],
    ["Active",   `active (available) since ${CONFIG.availableSince} · ${availability.replace(" · ", ", ")}`],
    ["Docs",     s.docs],
    ["",         "mailto:" + CONFIG.contacts.email],
    ["Main PID", `${s.pid} (${first})`],
    ["Tasks",    `${CONFIG.skills.reduce((n, g) => n + g.items.length, 0)} (${CONFIG.coreSkills.join(", ")}, and a volleyball club)`],
    ["Memory",   s.tenure],
    ["CPU",      `${CONFIG.location} (${s.timezone})`],
  ].forEach(([k, v]) => block.appendChild(el("div", null, row(k, v))));

  o.appendChild(block);
  return o;
}

/* the resume, in the two formats people actually ask for */
function cvOut() {
  const o = outNode();
  o.appendChild(el("div", null, "same resume, two formats:"));
  [
    ["/cv.pdf", "veskov.dev/cv.pdf", "for humans and their ATS"],
    ["/cv.txt", "veskov.dev/cv.txt", "for terminals"],
  ].forEach(([href, label, note]) => {
    const row = el("div", "cv-row");
    const a = el("a", null, label);
    a.href = href; a.target = "_blank"; a.rel = "noopener";
    row.appendChild(a);
    row.appendChild(el("span", "dim", note));
    o.appendChild(row);
  });
  o.appendChild(el("div", "cv-tip dim", "tip: curl veskov.dev from a real terminal returns the txt version"));
  return o;
}

/* dormant: nothing reaches this while CONFIG.references is empty */
function referencesOut() {
  const o = outNode();
  CONFIG.references.forEach((r) => {
    const q = el("blockquote", "quote");
    q.appendChild(el("p", "q-text", r.quote));
    const by = [r.role, r.org].filter(Boolean).join(", ");
    q.appendChild(el("div", "q-by dim", by ? `${r.name} · ${by}` : r.name));
    o.appendChild(q);
  });
  return o;
}

function textOut(text, cls) {
  const o = outNode(cls);
  o.textContent = text;
  return o;
}

/* one miss for an unknown word and for a command that is not enabled yet */
function notFound(word) {
  return textOut(`${word}: command not found, try 'help'`, "err");
}

/* the whole references feature hangs off this one flag */
const REFERENCES_ON = CONFIG.references.length > 0;

const FILES = {
  "about.md":      aboutOut,
  "tagline.txt":   taglineOut,
  "contacts.md":   contactsOut,
  "experience.md": experienceOut,
};
if (REFERENCES_ON) FILES["references.md"] = referencesOut;

/* the resume ships as two real static files, so `cat` cannot open them here,
   but `ls` still has to admit they exist */
const ARTIFACTS = ["cv.pdf", "cv.txt"];

/* plain `ls` lists what `cat` can open, the two resume files, and the one directory */
const LS_LISTING = Object.keys(FILES).concat(ARTIFACTS, "projects/").sort().join("  ");

/* the help table is markup, not hand-padded spaces: it has to survive 390px */
const HELP_ROWS = [
  ["whoami",              "identify the owner of this machine"],
  ["cat ~/about.md",      "the long version (alias: about)"],
  ["cat ~/experience.md", "where I've worked (alias: work)"],
  ["cat ~/tagline.txt",   "the short version"],
  ["cat ~/contacts.md",   "how to reach me (alias: contact)"],
  ...(REFERENCES_ON ? [["cat ~/references.md", "what colleagues say (alias: references)"]] : []),
  ["cv",                  "resume as pdf · txt (alias: resume)"],
  ["ls -la ~/projects/",  "things I've built (alias: projects)"],
  ["ls",                  "what's in ~"],
  ["status",              "am I available? ask the init system"],
  ["ping",                "…"],
  ["sudo",                "try it"],
  ["clear",               "wipe the scrollback"],
];

function helpOut() {
  const o = outNode();
  o.appendChild(el("div", null, "available commands:"));
  HELP_ROWS.forEach(([cmd, desc]) => {
    const row = el("div", "help-row");
    row.appendChild(el("span", "help-cmd", cmd));
    row.appendChild(el("span", "help-desc", desc));
    o.appendChild(row);
  });
  o.appendChild(el("div", "help-tip", "tip: the nav bar up top types these for you · tab completes"));
  return o;
}

/* ---------- Command parser ---------- */
function renderOutput(raw) {
  const rawParts = raw.trim().split(/\s+/).filter(Boolean);
  if (!rawParts.length) return null;
  const parts = rawParts.map((p) => p.toLowerCase()); // matching is case-insensitive
  const bin = parts[0];
  const argAt = parts.findIndex((p, i) => i > 0 && !p.startsWith("-"));
  const arg = argAt > 0 ? parts[argAt] : undefined;
  const rawArg = rawParts[argAt];                     // errors echo what was typed

  switch (bin) {
    case "whoami":               return whoamiOut();
    case "help": case "?":       return helpOut();
    case "projects":             return projectsOut();
    case "contact": case "socials": return contactsOut();
    case "about":                return aboutOut();
    case "work": case "experience": return experienceOut();
    case "cv": case "resume":    return cvOut();
    case "status":               return statusOut();
    case "systemctl": {
      // "status" counts wherever it lands: `systemctl status vesko`, `systemctl vesko status`
      if (parts.slice(1).some((p) => p.includes("status"))) return statusOut();
      return textOut("systemctl: no unit given. try 'systemctl status vesko'", "dim");
    }
    case "references":
      if (REFERENCES_ON) return referencesOut();
      return notFound(rawParts[0]); // dormant: reads like any other typo
    case "ping":                 return textOut("pong: " + (8 + Math.floor(Math.random() * 40)) + "ms (from your browser, so it means nothing)");
    case "sudo":                 return textOut("guest is not in the sudoers file. This incident will be reported to /dev/null.", "err");
    case "pwd":                  return textOut("/home/guest");
    case "exit": case "logout":  return textOut("there is no escape. only scroll.");
    case "clear":
      history.innerHTML = "";
      return null;
    case "ls": {
      if (arg && arg.includes("projects")) return projectsOut();
      return textOut(LS_LISTING);
    }
    case "cat": {
      if (!arg) return textOut("cat: missing operand", "err");
      const f = arg.replace(/^~\/|^\.\//, "");
      // the resume is two static files, not a renderer: point at the real thing
      if (ARTIFACTS.includes(f)) {
        return textOut(`cat: ${rawArg}: reads better in a browser, run 'cv' for the links`, "dim");
      }
      const renderer = FILES[f];
      if (renderer) return renderer();
      if (f === "projects" || f === "projects/") return textOut(`cat: ${rawArg}: Is a directory`, "err");
      return textOut(`cat: ${rawArg}: No such file or directory`, "err");
    }
    default:
      return notFound(rawParts[0]);
  }
}

/* ---------- Live prompt ---------- */
$("#prompt-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (busy) return; // the session is mid-sentence; that Enter is not yours yet
  const raw = input.value.trim();
  if (!raw) return;
  setInput("");
  enqueue(raw, false); // user already typed it, echo instantly
});

input.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
  if (busy) return; // hands off a line the session is still typing
  e.preventDefault();
  if (e.key === "ArrowUp") {
    if (logIdx > 0) setInput(cmdLog[--logIdx] || "");
  } else if (logIdx < cmdLog.length - 1) {
    setInput(cmdLog[++logIdx]);
  } else {
    logIdx = cmdLog.length;
    setInput("");
  }
});

/* ---------- Tab completion ---------- */
/* the canonical words only: the aliases are here, typos and '?' are not */
const COMMANDS = [
  "about", "cat", "clear", "contact", "cv", "exit", "experience", "help",
  "logout", "ls", "ping", "projects", "pwd", "resume", "socials", "status",
  "sudo", "systemctl", "whoami", "work",
].concat(REFERENCES_ON ? ["references"] : []).sort();
/* only these three read a second word, so only these three earn a trailing space */
const TAKES_ARG = ["cat", "ls", "systemctl"];
/* and this is what that second word can be */
const ARG_CANDIDATES = {
  cat:       Object.keys(FILES).concat(ARTIFACTS).sort(),
  ls:        ["~/projects/"],
  systemctl: ["status"],
};
/* "~", "~/", "." and "./" all mean "here": kept on the completion, stripped for matching */
const PATH_PREFIX = /^(~\/?|\.\/?)/;
const stripPath = (word) => word.replace(PATH_PREFIX, "");
function pathPrefix(word) {
  const pre = (word.match(PATH_PREFIX) || [""])[0];
  return pre && !pre.endsWith("/") ? pre + "/" : pre; // a lone "~" completes into "~/"
}

function commonPrefix(words) {
  return words.reduce((a, b) => {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return a.slice(0, i);
  });
}

let tabbedValue = null; // the value the previous Tab saw, so a second one can list

input.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") { tabbedValue = null; return; }
  // shift+tab, a locked prompt and an empty line all belong to the browser:
  // never swallow the key somebody needs to reach the links
  if (e.shiftKey || input.readOnly || busy) return;
  const value = input.value;
  if (!value.trim()) return;

  const twice = tabbedValue === value;
  tabbedValue = value;

  const parts = value.replace(/^\s+/, "").split(/\s+/);
  const editing = parts[parts.length - 1]; // the word under the cursor, "" after a space
  const bin = parts[0].toLowerCase();
  let candidates = [];
  if (parts.length === 1) {
    candidates = COMMANDS.filter((c) => c.startsWith(editing.toLowerCase()));
  } else if (parts.length === 2 && TAKES_ARG.includes(bin)) {
    const args = ARG_CANDIDATES[bin] || [];
    if (!editing) {
      candidates = args.slice().sort(); // nothing typed yet: offer them as written
    } else {
      const pre = pathPrefix(editing); // keep the path prefix they typed
      const frag = stripPath(editing).toLowerCase();
      candidates = args.map(stripPath).filter((f) => f.startsWith(frag)).sort().map((f) => pre + f);
    }
  }

  let done = candidates.length ? commonPrefix(candidates) : "";
  if (candidates.length === 1) {
    done = candidates[0];
    if (parts.length === 1 && TAKES_ARG.includes(done)) done += " ";
  }
  const filled = value.slice(0, value.length - editing.length) + done;

  // the key is only ours while it does something: otherwise Tab still moves focus
  if (candidates.length && filled !== value) {
    e.preventDefault();
    setInput(filled);
  } else if (candidates.length > 1) {
    e.preventDefault();
    // bash's courtesy: the second Tab prints the options, the line stays as it is.
    // no data-cmd and nothing in cmdLog: no command ran here
    if (twice) {
      history.appendChild(textOut(candidates.join("  "), "dim tab-list"));
      scrollBottom();
    }
  }
});

// clicking returns focus to the prompt, mouse only: on touch that would pop the
// on-screen keyboard on every single tap
const FINE_POINTER = window.matchMedia("(pointer: fine)");
document.addEventListener("mouseup", () => {
  if (!FINE_POINTER.matches) return;
  if (!busy && !window.getSelection().toString()) input.focus({ preventScroll: true });
});

// the newest output block printed for exactly this command, if any
function lastBlockFor(cmd) {
  const blocks = history.querySelectorAll(".out[data-cmd]");
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i].dataset.cmd === cmd) return blocks[i];
  }
  return null;
}

// topbar links type their commands into the session, or scroll to the answer
// the session already gave, instead of printing it twice
document.querySelectorAll(".topnav a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const cmd = a.dataset.cmd;
    const seen = lastBlockFor(cmd);
    if (!seen) { enqueue(cmd, true); return; }
    const prev = seen.previousElementSibling;
    const target = prev && prev.classList.contains("h-line") ? prev : seen;
    target.scrollIntoView({ behavior: SNAP ? "auto" : "smooth", block: "start" });
  });
});

/* ---------- Titlebar buttons ---------- */
/* close tries to exit, minimize clears the screen: both answer in-session */
$("#btn-close").addEventListener("click", () => enqueue("exit", false));
$("#btn-min").addEventListener("click", () => enqueue("clear", false));
$("#btn-max").addEventListener("click", () => setMaximized(!maximized));

/* ---------- Window management: drag, resize, maximize ----------
   Big screens only: on phones the window is pinned full-bleed by CSS.
   All geometry is desk-relative; the first interaction materialises the
   CSS default position into inline px and everything works from there. */
const desk     = $("#desk");
const titlebar = document.querySelector(".titlebar");
const grip     = document.querySelector(".win-resize");
const FLOATING = window.matchMedia("(min-width: 701px)");
const clampNum = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

let maximized = false;
let prevGeom  = null; // where the window goes back to after a maximize

function winRect() {
  const d = desk.getBoundingClientRect();
  const w = windowEl.getBoundingClientRect();
  return { left: w.left - d.left, top: w.top - d.top,
           width: w.width, height: w.height, dw: d.width, dh: d.height };
}
function applyGeom(g) {
  windowEl.classList.add("managed"); // inline px governs from here on
  windowEl.style.left   = Math.round(g.left) + "px";
  windowEl.style.top    = Math.round(g.top) + "px";
  windowEl.style.width  = Math.round(g.width) + "px";
  windowEl.style.height = Math.round(g.height) + "px";
}
/* the window stays fully on the desk, and never smaller than usable */
function clampGeom(g) {
  g.width  = clampNum(g.width, Math.min(420, g.dw), g.dw);
  g.height = clampNum(g.height, Math.min(320, g.dh), g.dh);
  g.left   = clampNum(g.left, 0, g.dw - g.width);
  g.top    = clampNum(g.top, 0, g.dh - g.height);
  return g;
}
function deskPoint(e) {
  const d = desk.getBoundingClientRect();
  return { x: e.clientX - d.left, y: e.clientY - d.top };
}

/* the toggle animates; drags and resizes cancel it and move raw */
let animTimer = null;
function animateGeom(fn) {
  windowEl.classList.add("animating");
  fn();
  clearTimeout(animTimer);
  animTimer = setTimeout(() => windowEl.classList.remove("animating"), 260);
}
function stopAnim() {
  clearTimeout(animTimer);
  windowEl.classList.remove("animating");
}

function setMaximized(on) {
  if (!FLOATING.matches || on === maximized) return;
  const g = winRect();
  if (on) {
    prevGeom = g;
    animateGeom(() => applyGeom({ left: 0, top: 0, width: g.dw, height: g.dh }));
  } else if (prevGeom) {
    animateGeom(() => applyGeom(clampGeom({ ...prevGeom, dw: g.dw, dh: g.dh })));
  }
  maximized = on;
  windowEl.classList.toggle("maximized", on);
}

let drag = null;
titlebar.addEventListener("pointerdown", (e) => {
  if (!FLOATING.matches || e.button !== 0 || e.target.closest("button")) return;
  stopAnim(); // a grab mid-animation freezes the window where it is
  const p = deskPoint(e);
  const g = winRect();
  // nothing changes yet: a click is not a drag until the pointer proves it
  drag = { sx: p.x, sy: p.y, dx: p.x - g.left, dy: p.y - g.top, active: false };
  titlebar.setPointerCapture(e.pointerId);
});
titlebar.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const p = deskPoint(e);
  if (!drag.active) {
    if (Math.hypot(p.x - drag.sx, p.y - drag.sy) < 4) return;
    if (maximized) {
      // an actual drag peels the maximized window off under the cursor, like a WM
      const g = winRect();
      const frac = p.x / g.dw;
      const pg = clampGeom({ ...prevGeom, dw: g.dw, dh: g.dh });
      pg.left = clampNum(p.x - pg.width * frac, 0, g.dw - pg.width);
      pg.top  = 0;
      applyGeom(pg);
      maximized = false;
      windowEl.classList.remove("maximized");
      const r = winRect();
      drag.dx = p.x - r.left;
      drag.dy = p.y - r.top;
    }
    drag.active = true;
  }
  applyGeom(clampGeom({ ...winRect(), left: p.x - drag.dx, top: p.y - drag.dy }));
});
["pointerup", "pointercancel"].forEach((ev) =>
  titlebar.addEventListener(ev, () => { drag = null; })
);
/* double-click the bar: same as the green button */
titlebar.addEventListener("dblclick", (e) => {
  if (e.target.closest("button")) return;
  setMaximized(!maximized);
});

let resizing = null;
grip.addEventListener("pointerdown", (e) => {
  if (!FLOATING.matches || e.button !== 0) return;
  stopAnim();
  const g = winRect();
  const p = deskPoint(e);
  resizing = { w: g.width, h: g.height, x: p.x, y: p.y };
  grip.setPointerCapture(e.pointerId);
});
grip.addEventListener("pointermove", (e) => {
  if (!resizing) return;
  if (maximized) { maximized = false; windowEl.classList.remove("maximized"); }
  const g = winRect();
  const p = deskPoint(e);
  applyGeom(clampGeom({ ...g,
    width:  resizing.w + (p.x - resizing.x),
    height: resizing.h + (p.y - resizing.y) }));
});
["pointerup", "pointercancel"].forEach((ev) =>
  grip.addEventListener(ev, () => { resizing = null; })
);

/* a browser resize must not strand the window outside the desk */
window.addEventListener("resize", () => {
  if (!FLOATING.matches) return;
  const g = winRect();
  if (maximized) applyGeom({ left: 0, top: 0, width: g.dw, height: g.dh });
  else if (windowEl.style.left) applyGeom(clampGeom(g));
});

/* ---------- Go ---------- */
sizeInput(); // the cursor starts flush against an empty prompt
$("#year").textContent = new Date().getFullYear();
$("#footer-handle").textContent = CONFIG.handle;

/* '?cmd=<section>' lands straight on one answer: no boot, no intro */
const DEEP_LINKS = {
  about:      "cat ~/about.md",
  work:       "cat ~/experience.md",
  experience: "cat ~/experience.md",
  projects:   "ls -la ~/projects/",
  contact:    "cat ~/contacts.md",
  cv:         "cv",
  status:     "status",
  help:       "help",
  whoami:     "whoami",
};
const deepLink = DEEP_LINKS[(PARAMS.get("cmd") || "").trim().toLowerCase()];

function openWindow() {
  windowEl.classList.remove("pre-open");
}

async function runSession() {
  introRunning = true;
  await boot();
  await sleep(250);  // the black screen lifts, the desktop shows
  openWindow();
  await sleep(700);  // the window lands before anyone types in it
  if (!SNAP && !skipping) showSkipHint();
  AUTO_SEQUENCE.forEach((cmd) => enqueue(cmd, true));
  await queueDone;
  introRunning = false;
  skipping = false; // later commands are allowed to type themselves again
  hideSkipHint();
  input.focus({ preventScroll: true });
}

async function runDeepLink(cmd) {
  skipping = true; // nothing to watch, the visitor asked for a specific line
  await boot();
  openWindow();
  skipping = false;
  if (cmd !== "whoami") commit("whoami");
  commit(cmd);
  input.focus({ preventScroll: true });
}

windowEl.classList.add("pre-open");
setBehindInert(true);
if (deepLink) runDeepLink(deepLink);
else runSession();
