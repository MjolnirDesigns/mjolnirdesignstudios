# MDS Sales Automation Audit

**Date:** 2026-09-20  
**Scope:** Marketing / sales automation only — no visual design or branding changes.  
**Goal:** Explain why high-intent leads exist but deals are not closing, then rank concrete refinements so MDS can book meetings and close web-development + lead-gen work first.

---

## 0. How this audit was done

This workspace (`MjolnirDesigns/mjolnirdesignstudios`, branch `main`) is **not** the live site. It is the late-2025 static marketing export (Norse-themed brochure site, `output: 'export'`, last meaningful product commit Oct 2025).

The live product at [mjolnirdesignstudios.com](https://www.mjolnirdesignstudios.com) (sitemap lastmod **2026-09-03**) is a later Next.js app. Public GitHub does not fully contain that build:

| Source | What it actually is | Last public push |
|---|---|---|
| **This repo** (`MjolnirDesigns/mjolnirdesignstudios`) | Static Hostinger-style marketing site. Stripe/Calendly stubs. No OdinAI, Asynd, Spire, HubSpot, or `/admin/products`. | 2025-12 |
| **`MjolnirDesignStudios/Mjolnir-Design-Studios`** | Closest public product repo. Intake + HubSpot Forms + Stripe + Resend templates + admin dashboard. Specs in `docs/superpowers/` and `CLAUDE.md`. **No Asynd/Spire modules.** | 2026-03-13 |
| **`MjolnirDesignStudios/MjolnirUI`** | Separate UI-library SaaS. OdinAI is a *design agent*, not the MDS qualifier. HubSpot listed as a Q4 idea. | 2026-06 |
| **Production** (`www.mjolnirdesignstudios.com`) | Current offer, Insight router, Stripe SKU catalog, `/admin/products` sandboxes, contact/intake APIs. Source of this audit’s funnel map. | Deployed; not fully mirrored on public GitHub |

Internal docs that describe *intended* automation (March 2026) overstate what is shipped. This report treats **production behavior + current public code** as source of truth, and March specs as a backlog — not as live systems.

HubSpot and Notion were not readable from this environment (MCP servers unauthenticated). CRM conclusions below are from code and live API contracts, not from a portal walkthrough. Confirm workflow / sequence / deal-stage settings in HubSpot before changing them.

---

## 1. Offer clarity

### 1.1 What the owner says the business is

From the owner (this request):

- **Asynd** — frontend website updates/enhancements for business owners.
- **Spire** — high-intent lead generation.
- **OdinAI** — site chatbot / questionnaire that routes the visitor to the right product and collects **email + website**.
- **ICP** — business owners with **≥ $2,500 budget** who need improvements **within ~2 weeks**.
- **Current reality** — Spire already produces some high-intent leads when run against MDS itself. The gap is **follow-up and closing**, not lead volume.
- **CRM** — HubSpot. OdinAI also collects email + website.
- **Near-term strategy** — close MDS clients first, then sell Asynd / Spire to other businesses.
- **Primary revenue (intent)** — web development + automated lead-gen engines, not SaaS seats.
- **Pricing redesign** — public launch **2026-10-01** (11 days from this audit).

That is a simple, closeable offer: two paid outcomes, one qualifier, one CRM.

### 1.2 What the public site currently sells

The homepage and `/pricing` still present **SaaS-style monthly tiers**:

| Public tier | Price | Positioned as |
|---|---|---|
| Base | $250 / mo | OdinAI Insight, Founders Kit, MjolnirUI Pro, 2,500 tokens, 1 profile |
| Pro | $500 / mo | 25k tokens, 2hr/mo Forge session, Yggdrasil Neuro Lite, chat dashboard |
| Elite | $3,000 / mo | 100k tokens, 3 profiles, Yggdrasil Full, avatar dashboard, source access |
| Custom | $25k–$50k BTC lifetime | Unlimited tokens, 5 profiles, “direct line” |

Plus workshops: homepage **Live Workshop $500** / **Live Webinar $250 (coming soon)**.

`/services` is a different catalog entirely — five “blocks,” 15 SKUs, from a free Insight score to $25k–$250k custom builds. Named products that match the owner’s language:

- **Spire™ Lead Generation Engine** — scrape → enrich → qualify → sequence → HubSpot. **$5,000 license or $1,000/mo SaaS.**
- **Asynd** — **not named on `/services`**. Admin sandbox copy: “Web Design — Web2 / Web3 sites.” Closest public SKUs: Conversion Landing Page ($2k / $3k / $5–10k) and Full Mobile/Web Application ($25k–$250k). Stripe slug `module_website_rebuild` exists; slugs `asynd` and `spire` do **not**.
- **OdinAI** — sold as Insight Assessment (free), Chat Dashboard (Pro+), Avatar Dashboard (Elite), tokens, and a router API — **not** as “the closer that books the meeting.”

### 1.3 Price and offer collisions (must resolve before 10/1)

These are not design nits. They confuse a buyer and a salesperson in the same week.

| Topic | Surface A | Surface B | Why it hurts close |
|---|---|---|---|
| Forge workshop | `/forge` and homepage: **$500** one-time | `/services`: **$1,000** (2hr @ $500/hr) | Buyer sees two prices for the same call. |
| AISO audit | `/aiso`: **$500** (or “full build from $1,500”) | `/services`: **$3,000** + $2,000 Remedy | Same named product, 6× spread. |
| Monthly “get everything” | `/pricing`: from **$250/mo** | `/services` footer: from **$300/mo** | SaaS story already muddy. |
| Consultation | `/services`: first hour free, then $500/hr | No Calendly for a *free* first hour on `/forge` (pay $500 first) | The easy “get in the room” path is paywalled. |
| GitHub / this repo | Base $99 / Base+ $499 / Pro $999 / Elite $2,499 / Custom $9,999 | Live site $250 / $500 / $3,000 | Dead public repo. Do not treat it as the offer. |
| March 2026 `CLAUDE.md` | Base $10 / Pro $50 / Elite $500 | Live site 25–50× higher | Internal docs are stale. |
| Asynd brand | Admin + Insight router use “Asynd” | Public services never say “Asynd” | Router recommends a product the marketing site does not name. |

**Offer recommendation (process/copy only — no restyle):** for the 10/1 window, pick **one** public hero offer and make every CTA point at it.

Suggested hero (matches owner + ICP, not the SaaS grid):

1. **Website in ~2 weeks** — Asynd / `module_website_rebuild` — priced at or above $2,500.
2. **Leads on autopilot** — Spire license $5,000 or $1,000/mo managed.
3. **Free 15-minute fit call** — Calendly, no card — only if budget ≥ $2,500 and timeline ≤ 2 weeks.

Keep Base/Pro/Elite on `/pricing` if needed for existing Stripe products, but stop leading the homepage with them until MDS has closed service clients. SaaS seats do not create the first agency case studies.

---

## 2. Funnel map (from code + live APIs)

```
Visitor
  ├─ Homepage OdinAI Insight (10 questions / “no payment”)
  │     └─ POST /api/odin/insight
  │           required: budget, objective
  │           optional: email (validated only if sent)
  │           output: score + matchedProduct (Asynd | Spire | OdinAI)
  │           persistence: none observed when email omitted
  │           next step in payload: “Engage {product}” ×3 — no calendar, no owner, no CRM write
  │
  ├─ /contact  → POST /api/contact (name + email required)
  ├─ /intake   → 307 redirect (workshop intake still behind POST /api/intake)
  │                 requires DOB + home address + industry + goals
  │                 then POST /api/hubspot/intake (HubSpot Forms v3)
  ├─ /pricing & Stripe Checkout
  │     POST /api/stripe/checkout  (large live SKU enum — see §2.3)
  │     webhook: /api/stripe/checkout/webhook  (exists in March repo; not re-verified here)
  ├─ /forge    → Calendly + $500 Stripe  (pay-then-book)
  ├─ /newsletter (“The Hammer”) → no /api/newsletter (404)
  └─ mailto / “we respond in 24 hours”  (human SLA, not a system)
         │
         ▼
   HubSpot  ←  ONLY reliably wired path is Forms submit on /api/hubspot/intake
         │     lifecycleStage hardcoded to "lead"
         │     no deal, no task, no owner, no score, no sequence trigger in app code
         ▼
   [gap]  no meeting booked  →  no stage movement  →  no close
```

### 2.1 OdinAI Insight router (production)

`POST /api/odin/insight` is live. It is the closest thing to the owner’s “chatbot that routes and collects email + website.”

**Required fields**

- `budget`: `0-500` | `500-1k` | `1k-5k` | `5k-10k` | `10k+`
- `objective`: `Automate Tasks` | `Build Systems` | `Cut Costs` | `Get Leads` | `Upgrade Tech Stack`

**Optional:** `email` (Zod email). Website is **not** required by the API contract. A successful call with only budget + objective returns `success: true` and a report. That means a visitor can be “qualified” and routed **without leaving a way to follow up.**

**Routing table (exercised 2026-09-20, no PII sent)**

| Objective | Matched product |
|---|---|
| Get Leads | **Spire** |
| Upgrade Tech Stack | **Asynd** |
| Automate Tasks, Build Systems, Cut Costs | **OdinAI** |

**Score is a budget lookup, not a scan**

| Budget band | Score | Label |
|---|---|---|
| 0–500 | 52 | Developing |
| 500–1k | 56 | Developing |
| 1k–5k | 62 | Established |
| 5k–10k | 68 | Established |
| 10k+ | 72 | Established |

Homepage copy promises “website intelligence scan” and a 0–100 score “benchmarked against industry.” The live router does not appear to use a website at all. `starterMarkdown` even prints `Primary need: undefined` — a field the UI/API never required.

Recommended moves are the same sentence three times (“Engage Spire” / “Engage Asynd” / “Engage OdinAI”). There is **no Calendly URL, no owner name, no “book in 15 minutes,” no HubSpot contact id** in the response.

ICP mismatch baked into the form:

- Qualifying bar is **$2,500 / ~2 weeks**.
- Budget bucket `1k-5k` mixes $1,000 (below ICP) with $5,000 (in ICP).
- No timeline field exists on the API.
- `0-500` + “Get Leads” still returns product = Spire (score 52). Unqualified traffic is routed as if it were a deal.

`POST /api/odin/chat` exists and returns **401 Unauthorized**. The March-repo widget (`components/ai/OdinAI.tsx`) is a **logged-in “forge me a hero” UI assistant**, not a public sales qualifier. It is not the owner’s OdinAI.

`POST /api/odin/blueprint` (the consulting-blueprint engine from the 2026-03-10 spec) is **404** in production.

### 2.2 Capture paths

| Path | Destination | What is collected | Follow-up in code |
|---|---|---|---|
| Insight (`/api/odin/insight`) | In-memory report JSON | Budget + objective; email optional | None |
| Contact (`/api/contact`) | Unknown store (route is live, source not in this repo) | name, email; phone/business optional on the page | Copy: “typically respond within 24 hours” |
| Intake (`/api/intake`) | Supabase `workshop_intake` (March code) | name, **DOB**, **address**, email, phone, business, industry, website, goals | Then HubSpot Forms; no sequence |
| HubSpot (`/api/hubspot/intake`) | HubSpot Forms API `api.hsforms.com/.../{portalId}/{formId}` | name → first/last, email, phone, company, industry, website, `lifecyclestage=lead` | Whatever the HubSpot **form** is configured to do. App does not create deals or tasks. |
| Forge / Calendly | Calendly event `mjolnir-forge` / `mjolnir-forge-live` | Paid workshop attendee | Webhook route exists (`/api/calendly/webhook` returns `{status:"ignored"}` on empty POST). March code claimed HMAC + HubSpot + Resend; **Resend booking routes are 404** today. |
| Stripe Checkout | Stripe Customer + payment | card + email | March webhook updates `profiles.subscription_tier` by email. Does not create a HubSpot *deal*. |
| Newsletter page | — | — | `/api/newsletter` **404**. The Hammer has no capture backend in production. |
| This-repo `SummonUs` | `mailto:contact@mjolnirdesignstudios.com` | name, email, service checkboxes, message | Opens the visitor’s mail client. If they cancel, the lead is gone. |
| This-repo `ContactForm.tsx` | `/api/resend` + `/api/supabase` | name, company, email, message | **Neither route exists** in this repo. Component is unused. |

### 2.3 Stripe catalog (production)

`POST /api/stripe/checkout` accepts this enum (live, 2026-09-20). This is the real product list, not the homepage cards.

**Subscriptions:** `base_monthly`, `base_annual`, `pro_monthly`, `pro_annual`, `elite_monthly`, `elite_annual`, `bitcoin_lifetime`  
**Workshops:** `workshop_live`, `workshop_webinar`  
**Add-ons:** `addon_assessment`, `addon_strategy`, `addon_consult`, `addon_audit`  
**Named services:** `spire_license`, `claude_code_training`, `bi_audit_report`, `aiso_audit_report`, `aiso_remedy_addon`  
**Modules:** `module_bi_dashboard`, `module_lead_gen`, `module_website_rebuild`, `module_ai_assistant`, `module_marketing_character`, `module_crm_setup`, `module_social_automation`, `module_cybersecurity`, `module_aiso_setup`  
**AISO plans:** `aiso_signal_*`, `aiso_active_*`, `aiso_autonomous_*` (monthly/annual)  
**MjolnirUI:** `mjolnirui_pro_*`, `mjolnirui_elite_*`

Implications:

- **Spire is sellable as `spire_license`.** There is no `spire_saas` / `$1,000/mo` slug in the enum even though `/services` advertises it.
- **Asynd is sellable only as `module_website_rebuild`.** The brand name is missing from Stripe.
- Checkout is a payment door, not a sales process. A self-serve $5k license with no discovery call will either not convert or will convert without a scoped SOW.

### 2.4 Admin sandboxes (confirmed on production)

`/admin/products?product=asynd` and `?product=spire` render:

> Products · Sandbox  
> **Asynd** — “Web Design — Web2 / Web3 sites — build & test sandbox.”  
> “Pipeline diagram (mermaid / flowchart) + test harness for Asynd — coming in the Products section build.”

Same stub pattern for Spire. These are placeholders, not operators’ tools. There is no `/admin/leads`, `/admin/pipeline`, `/api/admin/contacts`, or `/api/admin/payments` on the live host (404). The large March “Asgardian Command Center” (`app/(protected)/admin/page.tsx`) is not what `/admin/products` is serving.

### 2.5 This workspace repo (for completeness)

If someone deploys **this** repo, the sales path is:

1. Hero CTA → `#projects` (portfolio), not a lead form.
2. Pricing CTAs → `/checkout`, which posts to **`/api/create-checkout-session` (does not exist)**. Hardcoded $1,500. Comment in file: “placeholder.”
3. Base+ “Forge” → `/api/create-forge-checkout` → Stripe → `/forge` Calendly. Fragile `prompt()` for name/email.
4. SummonUs → mailto.
5. `next.config.js` has `output: 'export'`, so **API routes do not run** on a static host.

Do not spend automation time on this repo’s UI. Use it as a historical snapshot only.

---

## 3. HubSpot and integration status

### 3.1 What exists

| Integration | Status | Evidence |
|---|---|---|
| **HubSpot Forms submit** | Live API, gated on env | Production `POST /api/hubspot/intake` returns Zod 422 on empty body (route is deployed). March source writes `lifecyclestage=lead` via `api.hsforms.com`. |
| **HubSpot Private App / CRM objects** | Not used in app code | No deal, company, task, ticket, note, or engagement create. `HUBSPOT_API_KEY` is read in March code and **never sent** — Forms v3 does not need it; the check only fails the route if the key is missing. |
| **HubSpot admin read** | Not in production | `/api/admin/contacts` 404. |
| **Calendly** | Partial | Widget on `/forge`. Webhook URL exists. Empty POST → `{status:"ignored"}`. No signature details verified in this audit. |
| **Stripe** | Payment works | Live checkout session created for catalog slugs. Fulfillment ≠ sales follow-up. |
| **Supabase** | Auth + workshop tables (March schema) | `profiles`, `workshop_signups`, `workshop_intake`. No `leads`, `deals`, `sequences`, or `odin_insight_results` table. |
| **Resend** | Templates only | `lib/email.ts` has subscription, workshop, and admin-notification HTML. `/api/resend`, `/api/resend/booking`, `/api/resend/subscription` are **404**. Stripe webhook in the *public* March file logs and updates `profiles` — it does **not** call Resend (the analysis log claimed it did; the checked-in webhook does not). |
| **Ollama / Claude chat** | Gated | `/api/odin/chat` → 401. Not a public SDR. |
| **Google Analytics** | Present | `G-GGHD28X744` on production. Useful for top-of-funnel, not for close. |

### 3.2 HubSpot as it will behave today (if the form key is set)

A successful intake writes a **Contact** with email, name, phone, company, industry, website, lifecycle `lead`.

That is the entire app-owned CRM contract.

Anything else — welcome email, owner assignment, sequence, Slack/SMS alert, deal in a pipeline — must already exist as a **HubSpot workflow attached to that form**. This audit could not see the portal. Treat “HubSpot is connected” as **contact ingest only** until someone opens the portal and shows:

- [ ] Form notifications to the owner’s inbox / SMS
- [ ] Workflow: new form → create Deal in a real pipeline
- [ ] Workflow: new form → task “Call in 5 minutes”
- [ ] Sequence: Day 0 / 1 / 3 / 7
- [ ] Lead status / ICP properties (`budget_band`, `timeline`, `matched_product`, `insight_score`, `website`)
- [ ] Duplicate merge on email from Insight vs Contact vs Stripe vs Calendly

If those boxes are empty, HubSpot is a rolodex, not a closer.

### 3.3 Spec vs ship (March 2026 MVP)

`docs/superpowers/specs/2026-03-10-mjolnir-mvp-design.md` designed a full loop: auth → intake → HubSpot → Stripe → Resend → Calendly HMAC → OdinAI blueprint → admin metrics.

Verification checklist in that spec is still mostly open. In production as of this audit:

| Spec item | Live? |
|---|---|
| Intake → Supabase + HubSpot | API yes; page is workshop-heavy (DOB/address) |
| Stripe checkout for Base/Pro/Elite | Yes (and many more SKUs) |
| Stripe webhook → profile tier | Code in public repo; secret may or may not be set |
| Resend confirmation | Routes 404; templates unused |
| Calendly → workshop_signups + HubSpot + email | Webhook present; email routes absent |
| OdinAI blueprint JSON on `profiles` | 404 |
| Admin dashboard real Stripe/HubSpot | Admin contact/payment APIs 404 |
| Insight → CRM + meeting | **Not built** |

---

## 4. Gap analysis — why leads exist and business does not

Owner diagnosis (“follow-up and closing, not generation”) matches the code.

### 4.1 The break is after capture

Spire can dump high-intent rows into a sheet or HubSpot. OdinAI Insight can stamp “Spire” or “Asynd” on a visitor. None of the following exist in the app:

1. **Immediate human alert** (SMS / Slack / HubSpot task) when a ≥$2,500 lead lands.
2. **A free calendar** for a 15-minute fit call (Forge is $500 and framed as a workshop).
3. **A deal** with an owner, amount, and next step.
4. **A sequence** if the owner does not call in an hour.
5. **A single pipeline** (New → Attempted → Meeting booked → Proposal → Won/Lost).
6. **A close path** that is a scoped SOW (Asynd rebuild / Spire install), not a $250/mo SaaS card.

Leads without a meeting ritual die. That is the whole gap.

### 4.2 Qualification is too late and too loose

- Insight lets `0-500` through as a “Spire” recommendation.
- `1k-5k` straddles the $2,500 ICP line.
- No timeline question, so a “someday” $10k browser looks identical to a “need this in two weeks” buyer.
- Email and website are optional on the router that was supposed to collect them.
- Workshop intake asks for **date of birth and home address** — high friction, low sales signal — and does not ask budget or urgency.

### 4.3 The company is selling a catalog, not a next step

A visitor who is ready to buy a website must choose among: Base $250/mo, Pro $500/mo, Elite $3,000/mo, Custom BTC, Workshop $500 or $1,000, Landing Page $2–10k, Spire $5k or $1k/mo, AISO $500 or $3,000, BI audit $5k, swarm $10k, custom $25–250k, and a free Insight PDF.

No closer can run that menu on a first call. No automation can sequence it. The 10/1 pricing redesign should **delete choices**, not add modules.

### 4.4 Product modules are marketing objects, not operators

- Asynd / Spire admin pages are “pipeline diagram coming.”
- No `/api/spire`, `/api/asynd`, lead object, or sequence builder in production.
- `/automations` (“Foundry AI SDR… 15–40 meetings/mo”) is a landing promise, not a connected crew.
- Yggdrasil, Foundry, Mining, Robotics are R&D narrative. They dilute the two offers that can cash this quarter.

### 4.5 Data never becomes a conversation

| Happens | Then |
|---|---|
| Insight without email | Score shown; MDS cannot call anyone. |
| Insight with email (if the UI sends it) | Unknown whether HubSpot is written; no meeting CTA in the API response. |
| Contact form | 24-hour human promise. No SLA timer, no task. |
| Stripe payment | Customer in Stripe. Not a deal in HubSpot (in app code). |
| Calendly workshop | Paid event. Not a sales opportunity for Asynd/Spire. |
| Spire outbound (internal test) | Rows appear somewhere the owner can see. No forced next action. |

### 4.6 Repo / deploy split creates silent failure

Automation work committed only to this static repo will never reach production. Automation described in March GitHub may already have been rewritten on the private/live tree. **Wire HubSpot and Calendly on the deployed app**, then mirror the source of truth into one git repo.

---

## 5. Ranked refinements (no design changes)

### This week — config, process, HubSpot (do not build product)

These are portal + calendar + copy-in-existing-fields. They close the “nobody called the lead” hole.

1. **Stand up a free 15-minute Fit Call calendar** (Calendly or HubSpot Meetings). One event type: “Website or lead-engine fit — 15 min.” No card. Hours the owner will actually pick up. Put the link on Insight results, `/contact` thank-you, and the owner’s email footer. Keep the $500 Forge event as a *paid delivery*, not the first conversation.
2. **HubSpot properties + pipeline** (one pipeline, five stages): `New lead` → `Attempted` → `Meeting booked` → `Proposal sent` → `Won` / `Lost`. Custom properties: `budget_band`, `timeline`, `matched_product` (`asynd` \| `spire` \| `odinai` \| `other`), `insight_score`, `website`, `source` (`insight` \| `contact` \| `spire` \| `stripe` \| `calendly`), `icp` (true if budget ≥ $2,500 AND timeline ≤ 14 days).
3. **Form / Insight → Deal + Task + notification.** On create: if `icp=true`, create Deal ($2,500 default amount, name `{company} — {matched_product}`), assign to the owner, create Task “Call now — 5 min SLA,” notify email + SMS. If `icp=false`, lifecycle = subscriber/marketing, no deal.
4. **Day-0/1/3/7 sequence** (HubSpot sequence or simple Gmail templates — do not wait for Resend routes):  
   - T+0: “Got your Insight — here’s the 15-min link.”  
   - T+1: short case of the matched product (Asynd or Spire).  
   - T+3: “Still want this in two weeks?”  
   - T+7: break-up + newsletter opt-in.  
   Stop the sequence when a meeting is booked.
5. **Manual operating rhythm until automation is trusted:** 2× daily HubSpot “New lead” view. Every ICP lead gets a real call or voicemail the same half-day. Log the attempt. This is the close motion; software only reminds you.
6. **Freeze the 10/1 public story to two SKUs + one call.** Resolve Forge $500 vs $1,000 and AISO $500 vs $3,000 in HubSpot product records and on-page *numbers only* (no restyle). Hide or de-emphasize Base/Pro/Elite as the first CTA. Name Asynd on the website-rebuild SKU so Insight and sales talk the same word.
7. **Spire list hygiene:** whatever export Spire already produced for MDS, import to HubSpot with `source=spire`, `matched_product=asynd` or `spire` as appropriate, `icp` set by budget if known. Work that list this week. Do not wait for a new scrape.

### Next 2–4 weeks — automation wiring (same UI)

Work on the **deployed** app / its real git remote, not this static repo.

1. **Make Insight persist.** Require email + website before showing the score (API already validates email if present). Write the same payload to HubSpot (`/api/hubspot/intake` or CRM Contacts API) **and** a `odin_insights` table. Pass `matched_product`, `budget_band`, `insight_score`.
2. **Put the Fit Call URL in the Insight JSON** (`nextStep.url`). The existing result UI can render a link; no new visual system required.
3. **Score for ICP, not vibes.** Reject or soft-gate `0-500` and `500-1k` from Asynd/Spire recommendations (route to newsletter / Founders Kit). Split `1k-5k` into `1k-2.5k` / `2.5k-5k`. Add `timeline`: `this_week` | `two_weeks` | `this_quarter` | `exploring`.
4. **Unify capture.** `/api/contact`, Insight, and intake should share one “upsert contact + maybe deal” function. Drop DOB/address from any non-workshop path. Workshop intake can stay separate.
5. **Calendly / Meetings webhook → HubSpot deal stage `Meeting booked`.** Verify signing secret. Stop returning `ignored` for real `invitee.created` events. Create the deal if missing (Insight often will not have one).
6. **Stripe webhook → HubSpot.** `checkout.session.completed` creates/updates a Contact and a Deal in `Won` or `Proposal` (if paid in full vs deposit). Map `spire_license` and `module_website_rebuild` explicitly. Do not only write Supabase `profiles`.
7. **Turn on Resend (or HubSpot email) for the three templates that already exist** — admin ping is the one that matters this month. A lead the owner does not see in 5 minutes is a lost lead.
8. **Single source of truth for SKUs.** One table (even a JSON config) used by Stripe enum, `/services` copy, and Insight `matchedProduct`. Today Insight says “Asynd” and Stripe says `module_website_rebuild`.

### Later build — product features (still no design pass)

Only after meetings are happening every week.

1. Finish Asynd / Spire **operator** sandboxes (pipeline + test harness) — they are not a sales priority until MDS has closed its own deals on a spreadsheet.
2. OdinAI blueprint (`/api/odin/blueprint`) as a **post-meeting** deliverable, not a public toy.
3. Real website intelligence scan (the Insight copy already promises it).
4. Spire customer-facing app (the thing MDS will sell after it is the case study).
5. Sequences inside the product (Foundry “AI SDR”). Do not build an SDR product for others while MDS outbound is still a HubSpot sequence + the owner’s phone.
6. Admin Command Center live metrics. Useful after there is revenue to chart.

---

## 6. 30-day experiment (close MDS clients)

**Dates:** 2026-09-21 → 2026-10-20 (covers the 10/1 pricing launch).  
**Offer under test:** Asynd website engagement (≥ $2,500, ≤ 2 weeks) **or** Spire engine ($5,000 license / $1,000/mo).  
**Channel mix:** Insight + contact form + existing Spire MDS list + owner outbound. No new ads required.

### Week 1 — instrument and call

- HubSpot pipeline + properties + 5-min task + SMS/email alert (see §5).
- Free Fit Call calendar live; every ICP lead from the existing Spire test list gets a booked-or-attempted outcome.
- Insight: require email (minimum). If engineering time is scarce, a HubSpot form on the result screen is enough.
- **Target:** 15 ICP leads touched, 5 Fit Calls booked, 2 proposals out.

### Week 2 — 10/1 offer lock + first closes

- Public numbers agree (Forge, AISO, Asynd name, Spire price). SaaS tiers no longer the first sentence.
- Run Fit Calls with a one-page SOW: scope, price, start date, two-week milestone.
- **Target:** 8 Fit Calls cumulative, 3 proposals, **1 paid** (deposit counts).

### Week 3 — sequence + webhook

- Day-0/1/3/7 sequence on; Calendly → `Meeting booked`.
- Stripe `spire_license` / `module_website_rebuild` → HubSpot Won/Deal.
- **Target:** 12 Fit Calls cumulative, 5 proposals, 2 paid.

### Week 4 — review and only then automate more

- Kill whatever CTA did not produce meetings.
- Keep the weekly call block on the calendar even if inbound is slow (Spire the owner’s own ICP list again).
- **Target:** 15 Fit Calls, 6 proposals, **3 paid** in the 30-day window.

### Metrics (check every Friday)

| Metric | Definition | 30-day target | Source |
|---|---|---|---|
| **Leads** | New HubSpot contacts with email + `source` in {insight, contact, spire} | 40 | HubSpot |
| **ICP leads** | `icp=true` (≥$2.5k and ≤14 days, or owner-tagged) | 20 | HubSpot property |
| **Speed-to-lead** | Median minutes from create → first owner activity | < 60 min | HubSpot tasks |
| **Meetings** | Fit Calls booked (not $500 workshops unless they convert) | 15 | Meetings / Calendly |
| **Show rate** | Held / booked | ≥ 70% | Calendar |
| **Proposals** | Written Asynd or Spire offers | 6 | Deal stage |
| **Closed revenue** | Won amount collected or contract-signed | $7,500–$15,000 (e.g. 1× Spire license or 2–3 Asynd deposits) | Stripe + HubSpot Won |
| **Lead → meeting** | Meetings / ICP leads | ≥ 40% | Calculated |
| **Meeting → close** | Won / held meetings | ≥ 20% | Calculated |

If lead → meeting is < 20% after two weeks, the problem is still follow-up (SLA, calendar, sequence) — not Spire. If meetings happen and nothing wins, the problem is offer/price/scope on the call, not automation.

### Explicit non-goals for these 30 days

- New visual design, shader work, MjolnirUI marketing, Foundry/Mining/Robotics, Yggdrasil, newsletter engineering, admin mermaid diagrams, OdinAI avatar, or building Spire-for-sale UI.
- Adding more Stripe SKUs.
- Driving traffic until the owner is reliably booking the leads already in hand.

---

## 7. Appendix — file index

### This repo (static site)

- `components/Pricing.tsx` — old tier prices; Forge `prompt()` checkout.
- `components/SummonUs.tsx` — mailto capture.
- `components/ui/ContactForm.tsx` — dead Resend/Supabase client.
- `app/checkout/page.tsx` — posts to missing `/api/create-checkout-session`.
- `app/api/create-forge-checkout/route.ts` — Stripe workshop session.
- `app/api/stripe/route.ts` — generic checkout; cancel URL `/pricing` (no such app route here).
- `app/forge/page.tsx`, `app/forge-success/page.tsx` — Calendly after pay.
- `next.config.js` — `output: 'export'` (APIs die on static host).

### Public product repo (`Mjolnir-Design-Studios`)

- `app/api/hubspot/intake/route.ts` — Forms v3; unused API key; lifecycle `lead`.
- `app/api/intake/route.ts` — Zod + rate limit + `workshop_intake`.
- `app/(public)/intake/page.tsx` — client dual-post Supabase then HubSpot; alert + `/success`.
- `app/api/stripe/checkout/route.ts` + `webhook/route.ts` — SKU map (subset of live enum); profile update; no Resend.
- `lib/email.ts` — unused transactional HTML.
- `components/ai/OdinAI.tsx` — authenticated UI-forge chat.
- `app/(protected)/admin/page.tsx` — Command Center; mock contracts; missing admin APIs in production.
- `docs/superpowers/specs/2026-03-10-mjolnir-mvp-design.md` — intended Friday MVP.
- `CLAUDE.md`, `.claude/analysis-summary.md`, `.claude/analysis-log.md` — integration status; several claims newer than the committed webhook.
- `supabase/migrations/001_initial_schema.sql` — profiles + workshop tables only.

### Production routes that matter

- `POST /api/odin/insight` — router (this is the real OdinAI sales object).
- `POST /api/odin/chat` — 401.
- `POST /api/contact`, `/api/intake`, `/api/hubspot/intake`
- `POST /api/stripe/checkout` — full SKU enum in §2.3.
- `POST /api/calendly/webhook`
- `GET /admin/products?product=asynd|spire` — stubs.
- Public: `/`, `/pricing`, `/services`, `/odinai-insight`, `/forge`, `/contact`, `/aiso`, `/automations`.

---

## 8. Bottom line

MDS already has a qualifier (Insight), a CRM seat (HubSpot), a payment rail (Stripe), a calendar (Calendly), and a lead engine (Spire) that the owner says works. **Nothing in the deployed app turns a qualified email into a same-day conversation and a dated proposal.**

The 10/1 launch should not be another SaaS tier. It should be: two named offers, one ICP rule, one calendar, one HubSpot pipeline, and a 5-minute SLA. That is enough to get in front of prospects and close. Build Asynd/Spire product UI after the first paid MDS clients exist.
