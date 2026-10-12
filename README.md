# Recruiter.AI — Intelligent Hiring Decision Support System

> **A state-of-the-art decision intelligence platform for modern talent acquisition teams.**
> Engineered with React 18, Vite, Tailwind CSS, Framer Motion, Recharts, and Lucide Icons.

---

## 🌟 Core Principle: Human-in-the-Loop Intelligence
Recruiter.AI operates under a non-negotiable principle: **AI ASSISTS the recruiter, it never makes the final hiring decision.** All AI dossiers, risk indicators, score calibrations, and drafted communications require explicit human verification and sign-off.

---

## 🚀 Features & Modules Overview

| Module | Route | Key Capabilities |
| :--- | :--- | :--- |
| **Public Landing** | `/` | Sticky glass navbar, hero with live score gauges, 4-step workflow, flagship showcase, trust strip, FAQs. |
| **Module 1: User & Recruiter Auth** | `/login`, `/register`, `/app/settings` | Split-screen animated brand panel, 1-click Demo Account login, JWT session store, signature & notification settings. |
| **Module 2: Job Requirements** | `/app/jobs`, `/app/jobs/create`, `/app/jobs/:id` | Grid/table views, multi-step stepper wizard (Basics → Skills → Qualifications → Review), live preview card, candidate rankings. |
| **Module 3: AI Persona Studio (Flagship)** | `/app/persona/:id` | Streaming typewriter executive summary, confidence meter, connected evidence repositories, verified vs. unverified claims auditor, skills radar, GitHub telemetry, and multi-step AI-thinking animation. |
| **Module 4: Candidate Matching** | `/app/matching` | Multi-dimensional semantic vector ranking, dynamic weight sliders (Skills, Experience, Education) with live reordering, and side-by-side radar overlay for up to 3 candidates. |
| **Module 5: Risk & Fraud Intelligence** | `/app/risk` | Large animated risk gauge (0–100), explainable anomaly diagnostics (overlapping tenures, plagiarized CV text, expired badges), and recruiter review actions. |
| **Module 6: Retention Predictor** | `/app/retention` | 18-month retention likelihood gauge, SHAP-style positive & negative contributing drivers, and an interactive What-If scenario simulator (salary, commute, target tenure). |
| **Module 7: Workforce Demand Predictor** | `/app/workforce` | 12-month statistical headcount demand forecast with 95% confidence bands, macro insight cards, and emerging vs. deprecating skills rankings. |
| **Module 8: Job Offer Optimization** | `/app/offers` | Calibrated offer acceptance probability gauge, market median range bar, live compensation sliders (base, signing bonus, equity), and benefits tailoring. |
| **Module 9: Communications Hub** | `/app/communications` | Gmail-style split view, tone selectors (Warm, Formal, Concise), regeneration engine, approval queues, and send confirmation guardrails. |
| **Module 9: Dashboard & Reporting** | `/app/dashboard`, `/app/reports` | 4 animated KPI cards with sparklines, candidates-over-time area chart, hiring conversion funnel, risk distribution donut, and PDF/CSV report builder. |

---

## 🎨 Design System & Theme Tokens

- **Palette**: Deep midnight indigo (`#0B1020` base dark), electric violet to indigo gradient (`#6D5EF5` → `#4F46E5`), fresh emerald verified accent (`#10B981`), amber caution (`#F59E0B`), and rose risk (`#F43F5E`). Light mode uses crisp warm off-white (`#F7F8FC`) with elevated glass panels.
- **Typography**: Sora & Plus Jakarta Sans for headings, Inter for high-legibility body, and JetBrains Mono for metrics and scores.
- **Micro-interactions**: Framer Motion layout animations, SVG circular gauges, spring transitions, and custom shimmer skeletons.
- **Global Shortcut**: Press `Cmd+K` or `Ctrl+K` from any screen to summon the instant Command Palette.

---

## 🛠️ Quickstart & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```

---

## 🔌 Connecting to FastAPI Backend

Recruiter.AI includes a service layer with an automated fallback mechanism:
1. When `VITE_USE_MOCK=true`, the app runs fully standalone using realistic mock data with simulated network latency (450ms–1000ms).
2. To connect to a live FastAPI REST backend, update `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_USE_MOCK=false
```

### Expected REST Endpoints List (FastAPI Architecture):

#### Authentication & User (Module 1)
- `POST /api/v1/auth/login` — JWT credentials login
- `POST /api/v1/auth/register` — Recruiter registration
- `GET /api/v1/users/me` — Authenticated recruiter profile
- `PUT /api/v1/users/profile` — Update preferences and signature

#### Job Requisitions (Module 2)
- `GET /api/v1/jobs` — Retrieve filtered jobs list
- `POST /api/v1/jobs` — Create new job requisition
- `GET /api/v1/jobs/{id}` — Job requirements & matched candidates
- `PUT /api/v1/jobs/{id}` — Update job details

#### Candidate Management & Ingestion (Module 3 & 4)
- `GET /api/v1/candidates` — Candidate directory with filters
- `POST /api/v1/candidates/upload-cv` — Multipart PDF CV ingestion & extraction
- `GET /api/v1/candidates/{id}` — Candidate dossier details
- `PATCH /api/v1/candidates/{id}/status` — Update candidate stage

#### AI Persona Studio (Module 3)
- `GET /api/v1/persona/{candidate_id}` — Evidence profile, claims, and telemetry
- `POST /api/v1/persona/{candidate_id}/generate` — Execute multi-agent verification sequence

#### Semantic Matching (Module 4)
- `POST /api/v1/matching/rankings` — Dynamic weighted ranking (`weights: { skills, experience, education }`)

#### Risk & Fraud Intelligence (Module 5)
- `GET /api/v1/risk/overview` — Portfolio risk gauge & anomaly flags
- `POST /api/v1/risk/flags/{id}/review` — Mark flag as reviewed by human recruiter

#### Retention Predictor (Module 6)
- `GET /api/v1/retention/candidate/{id}` — SHAP factors & baseline tenure probability
- `POST /api/v1/retention/simulate` — What-If scenario simulation

#### Workforce Demand Predictor (Module 7)
- `GET /api/v1/workforce/demand` — 12-month confidence band forecast & emerging skills

#### Job Offer Optimizer (Module 8)
- `GET /api/v1/offers/recommendation` — Salary range, market median, and benefits
- `POST /api/v1/offers/save` — Persist calibrated offer to candidate record

#### Candidate Communications Hub (Module 9)
- `GET /api/v1/communications/emails` — Email drafts queue
- `POST /api/v1/communications/emails/{id}/regenerate` — Regenerate text with specified tone
- `POST /api/v1/communications/emails/{id}/approve` — Authorize draft
- `POST /api/v1/communications/emails/{id}/send` — Dispatch email
- `POST /api/v1/communications/emails/bulk-approve` — Bulk authorize drafts

#### Dashboard & Reporting (Module 9)
- `GET /api/v1/dashboard/metrics` — Aggregate pipeline KPIs and funnel metrics
- `POST /api/v1/reports/export` — Generate printable PDF or CSV export

---

## 📁 Project Structure

```text
src/
├── assets/                 # Brand assets, SVGs
├── components/
│   ├── charts/             # Recharts & custom SVG (Radar, Funnel, Sparkline, Area, Donut, Forecast)
│   ├── layout/             # AppShell, Navbar, Sidebar, Topbar, Footer, CommandPalette
│   └── ui/                 # Button, Card, Badge, Input, Modal, Tabs, Tooltip, Skeleton, GaugeMeter, Stepper, Typewriter, CircularScore
├── lib/                    # Utilities, formatting, delay helpers (utils.js)
├── mocks/                  # Realistic datasets (candidates.js, jobs.js, emails.js, workforce.js, analytics.js)
├── pages/
│   ├── auth/               # LoginPage, RegisterPage, ForgotPasswordPage
│   ├── candidates/         # CandidatesPage, CandidateProfilePage
│   ├── communications/     # CommunicationsHubPage
│   ├── dashboard/          # DashboardPage, ReportsPage
│   ├── jobs/               # JobsPage, JobDetailPage, CreateJobPage
│   ├── matching/           # MatchingPage
│   ├── offers/             # OfferOptimizerPage
│   ├── persona/            # PersonaStudioPage (Flagship)
│   ├── retention/          # RetentionPage
│   ├── risk/               # RiskIntelligencePage
│   ├── settings/           # SettingsPage
│   ├── workforce/          # WorkforceDemandPage
│   └── LandingPage.jsx     # Modern Public Landing Page
├── routes/                 # AppRoutes.jsx with lazy Suspense routes and protected route wrapper
├── services/api/           # Axios service client with mock fallback and latency simulation
├── store/                  # Zustand stores (authStore.js, themeStore.js)
├── App.jsx                 # Root component with Router and Toaster
├── index.css               # Tailwind directives and CSS variable design tokens
└── main.jsx                # React DOM entry point
```

---

## 🏆 Verification Completed
Verified in browser:
- Clean production build (`npm run build`) with zero linting or bundle errors.
- End-to-end user journey tested across all 15 workflow steps.
- Dark and Light modes tested with high visual contrast.
- 60fps Framer Motion transitions, responsive drawer navigation, and zero console warnings.
