# Carton Connect project and profile update — design

## Why

Shoaib planned, built and shipped Carton Connect (cartonconnect.pac-d.com) alone, and moved into a
new role, Packaging Infrastructure System Developer. The portfolio should lead with that work and
reflect the new role and skills.

## Goals

- Carton Connect is Project 1 on the home page and has its own case study at
  `/projects/carton-connect`, showing ownership from planning to deployment.
- Home disciplines: `Animator` → `System Designer`.
- About Me: corrected PACD dates, the new role, a Web & Cloud skills group, profile copy that
  mentions full-stack/cloud work.

## Non-goals

- No redesign of existing pages or components; no new dependencies.

## Anti-goals (would make it a failure)

- Publishing anything that is a security or commercial concern: costs and budgets, AWS region,
  instance sizes, account layout, firewall/WAF rules, sign-in rules (password policy, session
  time-outs, removed two-factor), malware-scan or row-level-security implementation detail beyond
  "each company sees only its own data", the PAC-D fee rate or pricing formula, release IDs,
  internal hostnames other than the public portal URL, the load-test data clean-up.

## Approaches

- **A. Story-led case study, Liminal-style (picked).** Narrative sections with screenshots between
  them; shows end-to-end ownership.
- B. Screenshot gallery, CampusHub-style. Faster, but undersells the solo planning-to-launch story.

## Design

### Home (`src/layouts/Home/Home.js`)

- `disciplines`: `['Developer', 'Data Analyst', 'System Designer', 'Techie']`.
- New first `ProjectSummary`: index 1, title "Carton Connect", laptop model with the dark dashboard
  screenshot, button "View project" → `/projects/carton-connect`. Description (one or two lines):
  carton ordering and supply portal for Primark's programme, run by PAC-D, designed and built
  single-handedly. Existing four summaries shift to indexes 2–5 with a fifth section ref.

### Case study (`src/pages/projects/carton-connect/`)

Built from the existing `layouts/Project` pieces, like Liminal. Header: title "Carton Connect",
description, `url` = https://cartonconnect.pac-d.com/, `linkLabel` "Visit site", roles
`['Product Design', 'Full-stack Development', 'Cloud Infrastructure']`. Sections:

1. **Hero image** — desktop sign-in screenshot.
2. **The problem** — carton orders between factories, garment suppliers and packaging suppliers
   were tracked by hand through email and spreadsheets; nobody saw the same status at once.
3. **One shared record per order** — placed → accepted (split into deliveries) → delivered (with a
   delivery-challan photo) → completed; damage claims with photo/video evidence approved by Primark
   or PAC-D. Live carton pricing on every line (no formula shown).
4. **Six roles, one portal** — Factory, Supplier, Packaging Supplier, Primark, PAC-D Admin,
   Superadmin; each company sees only its own orders. Dashboard screenshots (light, dark).
5. **Reports and oversight** — query builder over 45 fields, Excel/PDF exports, weekly/monthly
   subscriptions, supply figures and forecast. Query-builder screenshot.
6. **Built to scale** — load-tested at 10 million order lines; 1,600+ automated tests run on every
   change; usable on a phone (mobile sign-in screenshot). Brief stack: Next.js, React, TypeScript,
   PostgreSQL, AWS, infrastructure as code.
7. **Solo, end to end** — requirements and design spec (approved 07/10/26), build, AWS deployment
   (24/10/26), live at its own address (27/10/26), ongoing releases. Every stage by Shoaib.

Screenshots copied into `src/assets/carton-connect/` as `.webp`, each with a small placeholder made
the same way as the CampusHub ones.

### About Me (`src/pages/about_me/AboutMe.js`)

- New first experience entry: **Packaging Infrastructure System Developer**, PACD, Allport Cargo
  Services USA, Remote, `10/2026 - Present`. Points: develops the team's new internal systems;
  replaced most traditional Excel reporting with live dashboards on PostgreSQL hosted on AWS;
  designed, built and deployed Carton Connect single-handedly (link to case study).
- Packaging Coordinator period: `06/2025 - 09/2026`.
- Skills: new `Web & Cloud` group — Next.js, React, TypeScript, Node.js, PostgreSQL, AWS, Docker,
  Infrastructure as code (AWS CDK), Automated testing. `SQL` stays in Programming.
- Profile/description/snapshot "Focus": add system development and cloud alongside BI/analytics.

## Builder's calls (marked)

- New role start date `10/2026` (user said Coordinator ran until 09).
- Exact copy wording, section order details, and the Home description length.
- Work happens on a new branch `feat/carton-connect` from `chore/dependency-upgrade`.
