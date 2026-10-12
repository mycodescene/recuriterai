export const MOCK_CANDIDATES = [
  {
    id: "cand-1",
    name: "Hamza Tariq",
    title: "Senior Full Stack & Systems Engineer",
    email: "hamza.tariq@devpk.org",
    phone: "+92 301 8472910",
    location: "Islamabad, Pakistan",
    avatar: "HT",
    accentColor: "from-blue-600 to-indigo-600",
    experienceYears: 6.5,
    currentCompany: "Careem Tech Labs",
    appliedJobId: "job-1",
    matchScore: 94,
    matchBreakdown: { skills: 96, experience: 92, education: 90 },
    matchedSkills: ["React", "TypeScript", "Python", "FastAPI", "Docker", "PostgreSQL", "Tailwind CSS"],
    missingSkills: ["GraphQL"],
    riskScore: 12,
    riskLevel: "Low",
    retentionScore: 89,
    retentionFactors: [
      { name: "Consistent 2.5y tenure at previous companies", impact: 18, type: "positive" },
      { name: "High open-source contribution engagement", impact: 14, type: "positive" },
      { name: "Competitive compensation target alignment", impact: 12, type: "positive" },
      { name: "Remote work preference match", impact: 9, type: "positive" },
      { name: "Relocation commute friction", impact: -4, type: "negative" }
    ],
    status: "Shortlisted",
    cvFileName: "Hamza_Tariq_Staff_Engineer_CV.pdf",
    uploadedAt: "2026-10-09",
    personaSummary: "Hamza presents as an exceptionally grounded and pragmatic systems builder with deep proficiency across full-stack TypeScript and asynchronous Python services. His open-source contributions reveal rigorous architectural cleanliness, high test coverage awareness, and empathetic technical leadership. He demonstrates strong problem-solving ownership with negligible fraud signals.",
    personaConfidence: 96,
    strengths: [
      "Architected distributed real-time booking microservices serving 1.2M daily active requests",
      "Maintains top 5% GitHub activity in open-source Python ASGI middleware",
      "Demonstrates high cultural empathy and collaborative code-review standards"
    ],
    concerns: [
      "Limited direct exposure to enterprise GraphQL federation schemas",
      "Prefers purely remote setups; may resist full on-site mandates"
    ],
    suggestedQuestions: [
      "Can you walk us through how you handled data consistency across microservices in your Careem projects?",
      "How do you evaluate whether to build an API using REST with OpenAPI versus GraphQL?",
      "Describe a time when a critical bug escaped into production and how you restructured the CI pipeline afterwards."
    ],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 14, lastChecked: "2 hours ago" },
      { type: "GitHub", name: "github.com/hamzatariq-dev", status: "Connected", verifiedClaims: 8, lastChecked: "1 hour ago", repoCount: 42, stars: 310 },
      { type: "LinkedIn", name: "linkedin.com/in/hamzatariq-eng", status: "Connected", verifiedClaims: 7, lastChecked: "3 hours ago" },
      { type: "Portfolio", name: "hamzatariq.systems", status: "Connected", verifiedClaims: 4, lastChecked: "Yesterday" }
    ],
    claims: [
      { id: "cl-1", text: "Architected event-driven ingestion pipeline handling 1.2M daily events", status: "Verified", source: "GitHub Repo & Tech Talk Slides", link: "https://github.com/hamzatariq-dev/stream-core" },
      { id: "cl-2", text: "Senior Software Engineer at Careem (2023 - Present)", status: "Verified", source: "LinkedIn & Official Payroll Records Check", link: "https://linkedin.com/in/hamzatariq-eng" },
      { id: "cl-3", text: "Published author of PyFastRouter pip library (15k downloads)", status: "Verified", source: "PyPI & GitHub Release Index", link: "https://pypi.org/project/pyfastrouter" },
      { id: "cl-4", text: "Spearheaded company-wide migration from JavaScript to TypeScript", status: "Verified", source: "Careem Engineering Blog Post (Author attributed)", link: "https://tech.careem.com/ts-migration" },
      { id: "cl-5", text: "Master of Science in Distributed Computing from NUST (GPA 3.82)", status: "Verified", source: "Higher Education Degree Registry (HEC)", link: "#" },
      { id: "cl-6", text: "Led cross-functional team of 18 engineers during Q2 platform revamp", status: "Unverified", source: "Mentioned on CV only; self-reported team sizing without corroborating external records", link: "#" }
    ],
    radarSkills: [
      { subject: "System Design", A: 95, fullMark: 100 },
      { subject: "React / Frontend", A: 90, fullMark: 100 },
      { subject: "Python / Async", A: 96, fullMark: 100 },
      { subject: "Cloud & DevOps", A: 84, fullMark: 100 },
      { subject: "Leadership", A: 78, fullMark: 100 },
      { subject: "Testing & QA", A: 88, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "Python (FastAPI, Asyncio)", level: 96 },
      { skill: "TypeScript & React 18", level: 92 },
      { skill: "PostgreSQL & Database Indexing", level: 88 },
      { skill: "Docker & Container Orchestration", level: 82 },
      { skill: "GraphQL Federation", level: 64 }
    ],
    experienceTimeline: [
      { role: "Senior Full Stack Engineer", company: "Careem Tech Labs", period: "2023 - Present", description: "Built microservices dispatch engine and real-time WebSocket telemetry for driver-rider matching." },
      { role: "Software Engineer II", company: "Afiniti Software Solutions", period: "2021 - 2023", description: "Engineered scalable telemetry endpoints and high-volume real-time queuing systems in Python and React." },
      { role: "Junior Web Developer", company: "Systems Limited", period: "2020 - 2021", description: "Developed customer dashboards and internal administrative portals using React and Node.js." }
    ],
    githubHeatmap: {
      totalCommitsLastYear: 1420,
      activeDaysPercentage: 74,
      languages: [
        { name: "Python", percentage: 52, color: "#3B82F6" },
        { name: "TypeScript", percentage: 34, color: "#6366F1" },
        { name: "Rust", percentage: 8, color: "#F59E0B" },
        { name: "Shell / Docker", percentage: 6, color: "#10B981" }
      ]
    },
    riskFlags: [
      { id: "rf-1", title: "Minor gap between undergraduate completion and first role", severity: "Low", description: "4-month gap between graduation in Aug 2020 and Systems Limited entry in Jan 2021. Corroborated as freelance contract work.", status: "reviewed" }
    ],
    offerRecommendation: {
      baseSalary: 115000,
      minRecommended: 108000,
      maxRecommended: 125000,
      marketMedian: 112000,
      acceptanceProbability: 92,
      equityPercent: 0.15,
      signingBonus: 10000,
      benefitsScore: 94
    }
  },
  {
    id: "cand-2",
    name: "Zainab Malik",
    title: "Senior AI & NLP Researcher",
    email: "zainab.malik@oxfordalumni.org",
    phone: "+44 7911 482019",
    location: "London, UK",
    avatar: "ZM",
    accentColor: "from-purple-600 to-pink-600",
    experienceYears: 7.0,
    currentCompany: "DeepMind Collaborative Fellow",
    appliedJobId: "job-2",
    matchScore: 97,
    matchBreakdown: { skills: 98, experience: 96, education: 99 },
    matchedSkills: ["Python", "PyTorch", "Transformers", "LLM Fine-tuning", "LangChain", "Vector DBs", "FastAPI"],
    missingSkills: ["MLOps"],
    riskScore: 8,
    riskLevel: "Low",
    retentionScore: 92,
    retentionFactors: [
      { name: "Strong alignment with lab's AI roadmap", impact: 22, type: "positive" },
      { name: "Long-standing academic mentorship ties", impact: 14, type: "positive" },
      { name: "High institutional prestige satisfaction", impact: 11, type: "positive" },
      { name: "Industry vs academic salary competition", impact: -6, type: "negative" }
    ],
    status: "Shortlisted",
    cvFileName: "Dr_Zainab_Malik_AI_Research_Lead.pdf",
    uploadedAt: "2026-10-08",
    personaSummary: "Dr. Zainab Malik is a distinguished AI researcher with dual strength in theoretical foundation and applied transformer optimization. Her work on multi-agent alignment and parameter-efficient fine-tuning is cited across major NLP proceedings (ACL, NeurIPS). Strong communicator capable of bridging research models and production pipelines.",
    personaConfidence: 98,
    strengths: [
      "PhD from University of Oxford specializing in transformer attention mechanisms",
      "Published 6 peer-reviewed papers with over 840 verified academic citations",
      "Shipped scalable embedding pipelines reducing inference latency by 42%"
    ],
    concerns: [
      "Prefers research exploration over strict enterprise agile sprint constraints",
      "Requires high-tier GPU compute access commitments"
    ],
    suggestedQuestions: [
      "How do you evaluate trade-offs between Quantization (e.g. AWQ, FP8) versus LoRA adaptation for production LLMs?",
      "Can you describe an instance where a model performed brilliantly on benchmarks but failed in user telemetry?",
      "How do you lead collaborative projects between pure researchers and infrastructure engineers?"
    ],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 18, lastChecked: "4 hours ago" },
      { type: "GitHub", name: "github.com/zainab-malik-ai", status: "Connected", verifiedClaims: 9, lastChecked: "2 hours ago", repoCount: 28, stars: 920 },
      { type: "LinkedIn", name: "linkedin.com/in/zainab-malik-phd", status: "Connected", verifiedClaims: 11, lastChecked: "3 hours ago" },
      { type: "Google Scholar", name: "scholar.google.com/zainab-malik", status: "Connected", verifiedClaims: 6, lastChecked: "5 hours ago" }
    ],
    claims: [
      { id: "cl-21", text: "PhD in Computational Linguistics, University of Oxford (2022)", status: "Verified", source: "Oxford Alumni & Degree Verification Office", link: "#" },
      { id: "cl-22", text: "NeurIPS 2024 Spotlight paper on Context Window Compression", status: "Verified", source: "Proceedings of NeurIPS 2024 / OpenReview", link: "https://openreview.net/forum?id=example-zainab" },
      { id: "cl-23", text: "Lead contributor to HuggingFace Optimum acceleration library", status: "Verified", source: "HuggingFace Public Commits and Pull Requests", link: "https://github.com/huggingface/optimum" },
      { id: "cl-24", text: "Mentored 12 MSc students through Oxford Women in CS society", status: "Verified", source: "Oxford CS Department Mentorship Roster", link: "#" }
    ],
    radarSkills: [
      { subject: "Theory & ML", A: 99, fullMark: 100 },
      { subject: "PyTorch & GPUs", A: 98, fullMark: 100 },
      { subject: "LLM Fine-tuning", A: 97, fullMark: 100 },
      { subject: "Engineering", A: 82, fullMark: 100 },
      { subject: "Communication", A: 92, fullMark: 100 },
      { subject: "Product Sense", A: 75, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "PyTorch, CUDA & Triton", level: 98 },
      { skill: "HuggingFace Transformers", level: 97 },
      { skill: "Python & Asynchronous APIs", level: 91 },
      { skill: "Vector Databases (Milvus, Qdrant)", level: 88 },
      { skill: "Kubernetes & Ray Distributed", level: 78 }
    ],
    experienceTimeline: [
      { role: "Postdoctoral Research Fellow", company: "Oxford AI Lab / DeepMind Affiliation", period: "2023 - Present", description: "Focused on agent memory consolidation and retrieval-augmented LLM reasoning." },
      { role: "Doctoral Researcher", company: "University of Oxford", period: "2019 - 2023", description: "Researched attention density in generative NLP architectures." }
    ],
    githubHeatmap: {
      totalCommitsLastYear: 980,
      activeDaysPercentage: 68,
      languages: [
        { name: "Python", percentage: 82, color: "#3B82F6" },
        { name: "C++ / CUDA", percentage: 12, color: "#EC4899" },
        { name: "Jupyter", percentage: 6, color: "#F59E0B" }
      ]
    },
    riskFlags: [],
    offerRecommendation: {
      baseSalary: 168000,
      minRecommended: 155000,
      maxRecommended: 180000,
      marketMedian: 160000,
      acceptanceProbability: 94,
      equityPercent: 0.35,
      signingBonus: 20000,
      benefitsScore: 98
    }
  },
  {
    id: "cand-3",
    name: "Marcus Vance",
    title: "Principal Design Systems & UX Architect",
    email: "marcus.vance@studio-vance.io",
    phone: "+1 (415) 892-3104",
    location: "San Francisco, CA / Remote",
    avatar: "MV",
    accentColor: "from-amber-500 to-rose-500",
    experienceYears: 6.0,
    currentCompany: "Vercel / Independent Design Consultant",
    appliedJobId: "job-3",
    matchScore: 91,
    matchBreakdown: { skills: 94, experience: 88, education: 86 },
    matchedSkills: ["Figma", "Design Systems", "Prototyping", "Framer", "CSS/HTML Understanding", "Design Tokens"],
    missingSkills: ["User Research"],
    riskScore: 16,
    riskLevel: "Low",
    retentionScore: 84,
    retentionFactors: [
      { name: "High creative autonomy preference", impact: 16, type: "positive" },
      { name: "Strong portfolio monetization track record", impact: 12, type: "positive" },
      { name: "Frequent freelance contract shifts", impact: -8, type: "negative" }
    ],
    status: "Shortlisted",
    cvFileName: "Marcus_Vance_Staff_Design_Systems.pdf",
    uploadedAt: "2026-10-07",
    personaSummary: "Marcus possesses an elite visual and interaction craft reminiscent of top-tier developer platforms (Linear, Stripe, Raycast). He combines Figma token workflows with real CSS variable tokens and Framer Motion micro-animations. A relentless perfectionist on typography, dark mode ergonomics, and accessible contrast ratios.",
    personaConfidence: 93,
    strengths: [
      "Built multi-brand token system utilized by over 450 frontend engineers",
      "Pioneer in dark-mode glassmorphic aesthetics and high-density SaaS dashboards",
      "Can code production-ready CSS and Framer Motion prototypes directly"
    ],
    concerns: [
      "History of switching engagements every 14–18 months for high-ticket consulting",
      "Occasional friction when engineering deadlines necessitate simplified visual details"
    ],
    suggestedQuestions: [
      "How do you resolve design debt when engineering teams push for rapid MVP releases over design system uniformity?",
      "Walk us through how you define contrast rules and semantic tokens for enterprise dark mode.",
      "How do you measure the adoption and ROI of a newly introduced component library?"
    ],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 12, lastChecked: "1 day ago" },
      { type: "Portfolio", name: "marcusvance.design", status: "Connected", verifiedClaims: 8, lastChecked: "4 hours ago" },
      { type: "Figma Community", name: "figma.com/@marcusvance", status: "Connected", verifiedClaims: 5, lastChecked: "6 hours ago" },
      { type: "LinkedIn", name: "linkedin.com/in/marcusvance-ux", status: "Connected", verifiedClaims: 6, lastChecked: "1 day ago" }
    ],
    claims: [
      { id: "cl-31", text: "Created 'Aura UI' Figma kit with 48k community duplicates", status: "Verified", source: "Figma Community Official Analytics Verified", link: "https://figma.com/@marcusvance" },
      { id: "cl-32", text: "Lead Design System Consultant for Next-gen Fintech Portal", status: "Verified", source: "Design Case Study with Client Testimonial", link: "https://marcusvance.design/fintech" },
      { id: "cl-33", text: "Senior Product Designer at Stytch (2022-2024)", status: "Verified", source: "LinkedIn & Employment Reference Check", link: "#" }
    ],
    radarSkills: [
      { subject: "Visual Polish", A: 99, fullMark: 100 },
      { subject: "Design Tokens", A: 96, fullMark: 100 },
      { subject: "Micro-interactions", A: 94, fullMark: 100 },
      { subject: "Code Familiarity", A: 86, fullMark: 100 },
      { subject: "Strategy", A: 78, fullMark: 100 },
      { subject: "Speed", A: 90, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "Figma & AutoLayout Tokens", level: 98 },
      { skill: "Framer Motion & CSS Animations", level: 92 },
      { skill: "Design System Governance", level: 94 },
      { skill: "Typography & Layout Hierarchies", level: 96 }
    ],
    experienceTimeline: [
      { role: "Design Systems Consultant", company: "Independent Studio Vance", period: "2024 - Present", description: "Advising Series A-C startups on tokenized design architecture and Figma-to-code pipelines." },
      { role: "Senior Product Designer", company: "Stytch Identity", period: "2022 - 2024", description: "Created the enterprise developer console and interactive API playgrounds." }
    ],
    githubHeatmap: {
      totalCommitsLastYear: 410,
      activeDaysPercentage: 42,
      languages: [
        { name: "TypeScript / React", percentage: 55, color: "#3B82F6" },
        { name: "CSS / PostCSS", percentage: 40, color: "#EC4899" },
        { name: "HTML", percentage: 5, color: "#10B981" }
      ]
    },
    riskFlags: [],
    offerRecommendation: {
      baseSalary: 110000,
      minRecommended: 102000,
      maxRecommended: 118000,
      marketMedian: 105000,
      acceptanceProbability: 88,
      equityPercent: 0.12,
      signingBonus: 10000,
      benefitsScore: 90
    }
  },
  {
    id: "cand-4",
    name: "Elena Rostova",
    title: "Senior Cloud & Kubernetes Infrastructure Engineer",
    email: "elena.rostova@cloudinfra.de",
    phone: "+49 176 8931204",
    location: "Berlin, Germany",
    avatar: "ER",
    accentColor: "from-emerald-500 to-teal-600",
    experienceYears: 5.8,
    currentCompany: "Zalando Cloud Engineering",
    appliedJobId: "job-4",
    matchScore: 88,
    matchBreakdown: { skills: 90, experience: 88, education: 82 },
    matchedSkills: ["Kubernetes", "Terraform", "AWS", "Docker", "CI/CD", "Linux"],
    missingSkills: ["Prometheus", "ArgoCD"],
    riskScore: 22,
    riskLevel: "Low",
    retentionScore: 81,
    retentionFactors: [
      { name: "Clear EU work authorization & stability", impact: 15, type: "positive" },
      { name: "High infrastructure uptime recognition", impact: 12, type: "positive" },
      { name: "Salary expectation gap with German market", impact: -7, type: "negative" }
    ],
    status: "Shortlisted",
    cvFileName: "Elena_Rostova_Cloud_Architect.pdf",
    uploadedAt: "2026-10-06",
    personaSummary: "Elena is a disciplined Site Reliability and Cloud Infrastructure engineer with extensive operational experience scaling distributed Kubernetes clusters under high seasonal e-commerce loads. She excels in Terraform multi-account modularization and automated zero-downtime rolling updates.",
    personaConfidence: 91,
    strengths: [
      "Certified Kubernetes Administrator (CKA) with hands-on multi-cluster federation",
      "Reduced infrastructure spend by 31% via automated spot instance provisioning on AWS",
      "On-call veteran with clear incident post-mortem retrospectives"
    ],
    concerns: [
      "Currently in process of learning GitOps with ArgoCD",
      "Strict preference for European timezone operations"
    ],
    suggestedQuestions: [
      "How do you design Kubernetes pod disruption budgets and affinity rules for stateful databases?",
      "Can you describe an incident where a Terraform state lock failed during a critical deployment?",
      "What strategies do you employ to enforce zero-trust network policies across service meshes?"
    ],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 11, lastChecked: "1 day ago" },
      { type: "GitHub", name: "github.com/erostova-infra", status: "Connected", verifiedClaims: 6, lastChecked: "3 hours ago", repoCount: 31, stars: 140 },
      { type: "LinkedIn", name: "linkedin.com/in/elena-rostova-cloud", status: "Connected", verifiedClaims: 7, lastChecked: "1 day ago" }
    ],
    claims: [
      { id: "cl-41", text: "Certified Kubernetes Administrator (CKA #2023-CKA-981)", status: "Verified", source: "Linux Foundation Certificate Verifier", link: "#" },
      { id: "cl-42", text: "DevOps Engineer at Zalando (2022 - Present)", status: "Verified", source: "LinkedIn & Corporate Domain Verification", link: "#" },
      { id: "cl-43", text: "Architected 99.99% SLA platform for Black Friday flash sales", status: "Verified", source: "Zalando Tech Retrospective Article", link: "#" }
    ],
    radarSkills: [
      { subject: "Kubernetes", A: 96, fullMark: 100 },
      { subject: "Terraform & IaC", A: 92, fullMark: 100 },
      { subject: "AWS / Cloud", A: 94, fullMark: 100 },
      { subject: "Linux Internals", A: 88, fullMark: 100 },
      { subject: "CI/CD & GitOps", A: 78, fullMark: 100 },
      { subject: "Security & IAM", A: 82, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "Kubernetes Orchestration", level: 96 },
      { skill: "Terraform & Pulumi IaC", level: 92 },
      { skill: "AWS Architecture (EKS, RDS, VPC)", level: 94 },
      { skill: "Docker & Container Hardening", level: 88 }
    ],
    experienceTimeline: [
      { role: "Senior Cloud Engineer", company: "Zalando SE", period: "2022 - Present", description: "Engineered automated cloud migration across 4 AWS multi-region accounts." },
      { role: "Infrastructure Engineer", company: "Delivery Hero", period: "2020 - 2022", description: "Configured Terraform pipelines and Prometheus/Grafana alerting clusters." }
    ],
    githubHeatmap: {
      totalCommitsLastYear: 780,
      activeDaysPercentage: 62,
      languages: [
        { name: "HCL / Terraform", percentage: 52, color: "#6366F1" },
        { name: "Go", percentage: 28, color: "#3B82F6" },
        { name: "Shell", percentage: 20, color: "#10B981" }
      ]
    },
    riskFlags: [],
    offerRecommendation: {
      baseSalary: 132000,
      minRecommended: 122000,
      maxRecommended: 142000,
      marketMedian: 130000,
      acceptanceProbability: 86,
      equityPercent: 0.18,
      signingBonus: 12000,
      benefitsScore: 92
    }
  },
  {
    id: "cand-5",
    name: "Bilal Ahmed",
    title: "Senior Full Stack Developer",
    email: "bilal.ahmed.tech@yahoo.com",
    phone: "+92 321 4409123",
    location: "Lahore, Pakistan",
    avatar: "BA",
    accentColor: "from-red-600 to-orange-600",
    experienceYears: 7.2,
    currentCompany: "Self-Employed / Consultancies",
    appliedJobId: "job-1",
    matchScore: 78,
    matchBreakdown: { skills: 82, experience: 76, education: 70 },
    matchedSkills: ["React", "TypeScript", "Python", "Docker"],
    missingSkills: ["FastAPI", "PostgreSQL", "GraphQL", "Tailwind CSS"],
    riskScore: 78,
    riskLevel: "High",
    retentionScore: 42,
    retentionFactors: [
      { name: "Unexplained concurrent full-time employment overlaps", impact: -24, type: "negative" },
      { name: "Identical copy-pasted CV bullet points detected in fraud DB", impact: -22, type: "negative" },
      { name: "LinkedIn dates mismatch with submitted resume", impact: -18, type: "negative" },
      { name: "Relevant React & Python skill tags matched", impact: 12, type: "positive" }
    ],
    status: "Under Review",
    cvFileName: "Bilal_Ahmed_FullStack_2026.pdf",
    uploadedAt: "2026-10-09",
    personaSummary: "Bilal claims over 7 years of full-stack engineering across reputable software houses. However, automated cross-verification flagged significant discrepancies: two simultaneous full-time positions with overlapping 2-year tenures, duplicate text blocks matching known online resume templates, and an inaccessible GitHub profile. Thorough manual verification required before proceeding.",
    personaConfidence: 58,
    strengths: [
      "Demonstrates fundamental familiarity with React and Node.js syntaxes in sample tests",
      "Responsive and courteous in email correspondence"
    ],
    concerns: [
      "HIGH FRAUD RISK: Concurrent full-time roles in Karachi and Lahore during the exact same 2022-2024 timeframe",
      "Over 45% of CV project descriptions match verbatim text in public candidate repository",
      "Submitted GitHub link returns HTTP 404 Not Found"
    ],
    suggestedQuestions: [
      "Please explain the simultaneous employment listed at TechLogix and NetSol between March 2022 and December 2023.",
      "Can you provide a working repository link or live demo of the microservices project mentioned in your resume?",
      "Can you supply verified reference contacts from your direct engineering managers at your last two positions?"
    ],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 3, lastChecked: "Today" },
      { type: "GitHub", name: "github.com/bilal-dev-pro", status: "Unavailable", verifiedClaims: 0, lastChecked: "404 Not Found" },
      { type: "LinkedIn", name: "linkedin.com/in/bilalahmed-dev", status: "Limited by privacy", verifiedClaims: 2, lastChecked: "Yesterday" }
    ],
    claims: [
      { id: "cl-51", text: "Software Engineer at TechLogix (2021 - 2023)", status: "Unverified", source: "Resume claim contradicts LinkedIn profile showing NetSol during identical dates", link: "#" },
      { id: "cl-52", text: "Senior Software Engineer at NetSol Technologies (2022 - 2024)", status: "Unverified", source: "Overlaps by 20 months with TechLogix claim", link: "#" },
      { id: "cl-53", text: "Contributed to high-throughput financial gateway handling 50k TPS", status: "Unverified", source: "Text matched 98% with known online template", link: "#" },
      { id: "cl-54", text: "Bachelor of Science in Computer Science, FAST NUCES", status: "Verified", source: "University graduation records match graduation year 2019", link: "#" }
    ],
    radarSkills: [
      { subject: "React Frontend", A: 75, fullMark: 100 },
      { subject: "Python APIs", A: 60, fullMark: 100 },
      { subject: "System Design", A: 45, fullMark: 100 },
      { subject: "Database Tuning", A: 50, fullMark: 100 },
      { subject: "Reliability & Verifiability", A: 25, fullMark: 100 },
      { subject: "Communication", A: 65, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "React & Vanilla JS", level: 75 },
      { skill: "Python Fundamentals", level: 60 },
      { skill: "SQL Queries", level: 55 },
      { skill: "FastAPI Framework", level: 40 }
    ],
    experienceTimeline: [
      { role: "Senior Engineer (Self-Claimed)", company: "NetSol Technologies", period: "2022 - 2024", description: "Overlap flagged with concurrent TechLogix role." },
      { role: "Software Engineer", company: "TechLogix", period: "2021 - 2023", description: "Overlap flagged by verification engine." },
      { role: "Junior Developer", company: "Software House", period: "2019 - 2021", description: "First junior role post-graduation." }
    ],
    githubHeatmap: {
      totalCommitsLastYear: 0,
      activeDaysPercentage: 0,
      languages: []
    },
    riskFlags: [
      { id: "rf-51", title: "Concurrent Overlapping Full-Time Employment", severity: "High", description: "Simultaneous 20-month overlap between NetSol and TechLogix without freelance disclosure.", status: "open" },
      { id: "rf-52", title: "Plagiarized CV Text Detected", severity: "High", description: "3 paragraphs under 'Projects' match verbatim text from public sample templates.", status: "open" },
      { id: "rf-53", title: "Broken GitHub URL / Dead Portfolio", severity: "Medium", description: "Profile link in resume returns 404, preventing code review validation.", status: "open" }
    ],
    offerRecommendation: {
      baseSalary: 82000,
      minRecommended: 75000,
      maxRecommended: 90000,
      marketMedian: 110000,
      acceptanceProbability: 40,
      equityPercent: 0.05,
      signingBonus: 0,
      benefitsScore: 60
    }
  },
  {
    id: "cand-6",
    name: "Ayesha Siddiqui",
    title: "Technical Talent Acquisition Partner",
    email: "ayesha.siddiqui@talentnexus.pk",
    phone: "+92 333 5189201",
    location: "Lahore, Pakistan",
    avatar: "AS",
    accentColor: "from-teal-600 to-cyan-600",
    experienceYears: 4.5,
    currentCompany: "Systems Limited Talent Squad",
    appliedJobId: "job-5",
    matchScore: 92,
    matchBreakdown: { skills: 94, experience: 90, education: 88 },
    matchedSkills: ["Talent Acquisition", "Technical Recruiting", "HRIS", "Interview Coaching", "Compensation Benchmarking", "Employer Branding"],
    missingSkills: [],
    riskScore: 10,
    riskLevel: "Low",
    retentionScore: 88,
    retentionFactors: [
      { name: "Proven high recruiter retention in previous roles", impact: 18, type: "positive" },
      { name: "Strong local professional network in engineering universities", impact: 14, type: "positive" },
      { name: "Cultural alignment with flexible hybrid environment", impact: 10, type: "positive" }
    ],
    status: "Shortlisted",
    cvFileName: "Ayesha_Siddiqui_Lead_Technical_Recruiter.pdf",
    uploadedAt: "2026-10-09",
    personaSummary: "Ayesha is an accomplished technical recruiter who pairs data-driven candidate sourcing with empathetic, transparent candidate care. She has successfully closed over 65 senior and staff engineering hires across cloud and machine learning tracks. High stakeholder praise for reducing time-to-hire by 28%.",
    personaConfidence: 95,
    strengths: [
      "Reduced average technical hiring cycle from 45 days to 32 days",
      "Pioneered structured rubrics and bias-mitigation interview training",
      "Deep understanding of engineering compensation bands across South Asia and MENA"
    ],
    concerns: [
      "Primarily experienced with tech roles; less exposure to executive finance/legal recruiting"
    ],
    suggestedQuestions: [
      "How do you approach passive software engineers who receive dozens of cold LinkedIn messages weekly?",
      "Can you walk us through how you coach engineering hiring managers on rubric consistency and mitigating unconscious bias?",
      "What HRIS and ATS tooling workflows have you implemented to track funnel conversion drop-offs?"
    ],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 10, lastChecked: "3 hours ago" },
      { type: "LinkedIn", name: "linkedin.com/in/ayesha-siddiqui-talent", status: "Connected", verifiedClaims: 9, lastChecked: "1 hour ago" }
    ],
    claims: [
      { id: "cl-61", text: "Senior Technical Recruiter at Systems Limited (2022 - Present)", status: "Verified", source: "LinkedIn & Corporate Verified Profile", link: "#" },
      { id: "cl-62", text: "Closed 65+ specialized engineering roles with 94% retention rate", status: "Verified", source: "Internal Team Metrics Recommendation by VP of HR", link: "#" },
      { id: "cl-63", text: "BBA in Human Resource Management, LUMS (Dean's Honor List)", status: "Verified", source: "LUMS Alumni Directory Verification", link: "#" }
    ],
    radarSkills: [
      { subject: "Sourcing & Outreach", A: 96, fullMark: 100 },
      { subject: "Interview Rubrics", A: 92, fullMark: 100 },
      { subject: "Candidate Experience", A: 95, fullMark: 100 },
      { subject: "Compensation Analysis", A: 88, fullMark: 100 },
      { subject: "ATS Systems", A: 90, fullMark: 100 },
      { subject: "Stakeholder Management", A: 93, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "Technical Sourcing (GitHub, LinkedIn)", level: 96 },
      { skill: "Structured Interview Architecture", level: 92 },
      { skill: "ATS (Greenhouse, Lever, Ashby)", level: 94 },
      { skill: "Compensation Band Modeling", level: 86 }
    ],
    experienceTimeline: [
      { role: "Senior Technical Talent Partner", company: "Systems Limited", period: "2022 - Present", description: "Led recruiting pod for AI, Cloud and Full-stack engineering verticals." },
      { role: "Talent Acquisition Specialist", company: "10Pearls", period: "2020 - 2022", description: "Sourced and closed 40+ React, Node, and Mobile engineers." }
    ],
    githubHeatmap: {
      totalCommitsLastYear: 0,
      activeDaysPercentage: 0,
      languages: []
    },
    riskFlags: [],
    offerRecommendation: {
      baseSalary: 72000,
      minRecommended: 65000,
      maxRecommended: 78000,
      marketMedian: 68000,
      acceptanceProbability: 91,
      equityPercent: 0.10,
      signingBonus: 6000,
      benefitsScore: 92
    }
  },
  {
    id: "cand-7",
    name: "Tariq Mansoor",
    title: "Cloud Infrastructure & DevOps Engineer",
    email: "tariq.mansoor@infraworks.pk",
    phone: "+92 345 9920148",
    location: "Karachi, Pakistan",
    avatar: "TM",
    accentColor: "from-blue-500 to-cyan-500",
    experienceYears: 4.8,
    currentCompany: "Folio3 Cloud Services",
    appliedJobId: "job-4",
    matchScore: 84,
    matchBreakdown: { skills: 86, experience: 82, education: 80 },
    matchedSkills: ["AWS", "Docker", "CI/CD", "Linux", "Kubernetes"],
    missingSkills: ["Terraform", "Prometheus", "ArgoCD"],
    riskScore: 28,
    riskLevel: "Medium",
    retentionScore: 78,
    retentionFactors: [
      { name: "Strong local infrastructure project completion", impact: 14, type: "positive" },
      { name: "Salary expectation gap with international offers", impact: -12, type: "negative" }
    ],
    status: "Screening",
    cvFileName: "Tariq_Mansoor_DevOps_Resume.pdf",
    uploadedAt: "2026-10-10",
    personaSummary: "Tariq has solid hands-on experience running AWS ECS and baseline Kubernetes clusters. He has built automated GitLab CI pipelines and manages containerized microservices reliably.",
    personaConfidence: 86,
    strengths: ["Strong AWS fundamentals", "Responsive on-call record"],
    concerns: ["Needs more deep exposure to Infrastructure as Code (Terraform)"],
    suggestedQuestions: ["Describe how you structure Dockerfiles for minimal layer caching and multi-stage builds."],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 8, lastChecked: "Yesterday" },
      { type: "LinkedIn", name: "linkedin.com/in/tariq-mansoor-cloud", status: "Connected", verifiedClaims: 6, lastChecked: "Yesterday" }
    ],
    claims: [
      { id: "cl-71", text: "DevOps Engineer at Folio3 (2022 - Present)", status: "Verified", source: "LinkedIn & Official Email check", link: "#" }
    ],
    radarSkills: [
      { subject: "Kubernetes", A: 80, fullMark: 100 },
      { subject: "AWS", A: 88, fullMark: 100 },
      { subject: "CI/CD", A: 84, fullMark: 100 },
      { subject: "Linux", A: 86, fullMark: 100 },
      { subject: "IaC", A: 68, fullMark: 100 },
      { subject: "Monitoring", A: 70, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "AWS Services", level: 88 },
      { skill: "Docker & Linux", level: 86 },
      { skill: "GitLab CI/CD", level: 84 },
      { skill: "Kubernetes Core", level: 78 }
    ],
    experienceTimeline: [
      { role: "DevOps Engineer", company: "Folio3", period: "2022 - Present", description: "Configuring cloud clusters and deployment automations." }
    ],
    githubHeatmap: { totalCommitsLastYear: 320, activeDaysPercentage: 40, languages: [{ name: "Shell", percentage: 70, color: "#10B981" }, { name: "Python", percentage: 30, color: "#3B82F6" }] },
    riskFlags: [
      { id: "rf-71", title: "Certification Expiration Notice", severity: "Medium", description: "AWS Solutions Architect Associate badge expired in June 2025; renewal currently in progress.", status: "open" }
    ],
    offerRecommendation: {
      baseSalary: 118000,
      minRecommended: 105000,
      maxRecommended: 125000,
      marketMedian: 120000,
      acceptanceProbability: 82,
      equityPercent: 0.12,
      signingBonus: 8000,
      benefitsScore: 84
    }
  },
  {
    id: "cand-8",
    name: "Sophia Chen",
    title: "Senior Product Designer & UX Strategist",
    email: "sophia.chen@designsprint.sg",
    phone: "+65 9128 3491",
    location: "Singapore / Remote",
    avatar: "SC",
    accentColor: "from-violet-600 to-indigo-600",
    experienceYears: 5.5,
    currentCompany: "Grab Holdings UX",
    appliedJobId: "job-3",
    matchScore: 89,
    matchBreakdown: { skills: 90, experience: 88, education: 86 },
    matchedSkills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    missingSkills: ["CSS/HTML Understanding", "Design Tokens"],
    riskScore: 14,
    riskLevel: "Low",
    retentionScore: 87,
    retentionFactors: [
      { name: "Consistent career progression at Grab", impact: 16, type: "positive" },
      { name: "Collaborative research feedback", impact: 12, type: "positive" }
    ],
    status: "Shortlisted",
    cvFileName: "Sophia_Chen_Product_Design.pdf",
    uploadedAt: "2026-10-08",
    personaSummary: "Sophia brings a balanced mix of enterprise workflow optimization and empathetic user research. She has led user interviews across 8 countries in Southeast Asia.",
    personaConfidence: 92,
    strengths: ["Strong user research protocols", "Data-informed design decisions"],
    concerns: ["Relies on engineering for token implementation"],
    suggestedQuestions: ["How do you conduct remote usability testing when users are non-technical?"],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 9, lastChecked: "1 day ago" },
      { type: "Portfolio", name: "sophiachen.design", status: "Connected", verifiedClaims: 7, lastChecked: "5 hours ago" }
    ],
    claims: [
      { id: "cl-81", text: "Product Designer at Grab (2021 - Present)", status: "Verified", source: "LinkedIn & Portfolio validation", link: "#" }
    ],
    radarSkills: [
      { subject: "User Research", A: 96, fullMark: 100 },
      { subject: "Figma UI", A: 94, fullMark: 100 },
      { subject: "Prototyping", A: 90, fullMark: 100 },
      { subject: "Interaction Design", A: 88, fullMark: 100 },
      { subject: "Design Tokens", A: 74, fullMark: 100 },
      { subject: "Code Familiarity", A: 65, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "Figma Design & Wireframing", level: 96 },
      { skill: "User Testing & Synthesizing", level: 94 },
      { skill: "Interactive Prototypes", level: 90 }
    ],
    experienceTimeline: [
      { role: "Senior Product Designer", company: "Grab", period: "2021 - Present", description: "Designing driver earnings interfaces and merchant portal workflows." }
    ],
    githubHeatmap: { totalCommitsLastYear: 80, activeDaysPercentage: 15, languages: [] },
    riskFlags: [],
    offerRecommendation: {
      baseSalary: 104000,
      minRecommended: 98000,
      maxRecommended: 112000,
      marketMedian: 105000,
      acceptanceProbability: 87,
      equityPercent: 0.10,
      signingBonus: 8000,
      benefitsScore: 88
    }
  },
  {
    id: "cand-9",
    name: "Fatima Noor",
    title: "Junior Data Analyst & Insights Associate",
    email: "fatima.noor@datascience.edu.pk",
    phone: "+92 312 7701824",
    location: "Karachi, Pakistan",
    avatar: "FN",
    accentColor: "from-pink-500 to-rose-600",
    experienceYears: 1.8,
    currentCompany: "Daraz (Alibaba Group)",
    appliedJobId: "job-6",
    matchScore: 91,
    matchBreakdown: { skills: 92, experience: 88, education: 92 },
    matchedSkills: ["SQL", "Python", "Tableau", "PowerBI", "Pandas", "Excel"],
    missingSkills: ["Statistical Modeling"],
    riskScore: 11,
    riskLevel: "Low",
    retentionScore: 90,
    retentionFactors: [
      { name: "High growth enthusiasm and coachability", impact: 20, type: "positive" },
      { name: "Academic excellence award winner", impact: 14, type: "positive" }
    ],
    status: "Shortlisted",
    cvFileName: "Fatima_Noor_Data_Analyst_Resume.pdf",
    uploadedAt: "2026-10-10",
    personaSummary: "Fatima is a sharp, ambitious junior analyst with exceptional SQL and Tableau dashboarding capabilities. She transformed seller analytics reports at Daraz into automated daily executive briefings.",
    personaConfidence: 94,
    strengths: ["Fast learner", "Flawless SQL window functions", "Clear visual storytelling"],
    concerns: ["Needs mentorship on production machine learning pipelines"],
    suggestedQuestions: ["Can you explain how you optimize a slow multi-table join with millions of records in PostgreSQL?"],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 7, lastChecked: "Today" },
      { type: "GitHub", name: "github.com/fatimanoor-analytics", status: "Connected", verifiedClaims: 4, lastChecked: "Yesterday" }
    ],
    claims: [
      { id: "cl-91", text: "BS Data Science, IBA Karachi (Magna Cum Laude)", status: "Verified", source: "IBA Alumni Directory verified", link: "#" }
    ],
    radarSkills: [
      { subject: "SQL", A: 96, fullMark: 100 },
      { subject: "Python / Pandas", A: 90, fullMark: 100 },
      { subject: "Tableau", A: 92, fullMark: 100 },
      { subject: "Statistics", A: 80, fullMark: 100 },
      { subject: "Communication", A: 88, fullMark: 100 },
      { subject: "Business Sense", A: 82, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "SQL (PostgreSQL, BigQuery)", level: 96 },
      { skill: "Tableau & PowerBI Dashboards", level: 92 },
      { skill: "Python (Pandas, NumPy)", level: 88 }
    ],
    experienceTimeline: [
      { role: "Junior Analytics Associate", company: "Daraz PK", period: "2024 - Present", description: "Automated seller metrics extraction and weekly customer conversion funnel reporting." }
    ],
    githubHeatmap: { totalCommitsLastYear: 480, activeDaysPercentage: 54, languages: [{ name: "Python", percentage: 65, color: "#3B82F6" }, { name: "SQL", percentage: 35, color: "#10B981" }] },
    riskFlags: [],
    offerRecommendation: {
      baseSalary: 48000,
      minRecommended: 42000,
      maxRecommended: 52000,
      marketMedian: 45000,
      acceptanceProbability: 93,
      equityPercent: 0.05,
      signingBonus: 3000,
      benefitsScore: 86
    }
  },
  {
    id: "cand-10",
    name: "Daniel Kim",
    title: "Senior Machine Learning Engineer",
    email: "daniel.kim@neuralcore.io",
    phone: "+1 (206) 551-9302",
    location: "Seattle, WA, USA",
    avatar: "DK",
    accentColor: "from-indigo-600 to-purple-700",
    experienceYears: 6.2,
    currentCompany: "Amazon AWS AI",
    appliedJobId: "job-2",
    matchScore: 86,
    matchBreakdown: { skills: 88, experience: 86, education: 84 },
    matchedSkills: ["Python", "PyTorch", "Transformers", "FastAPI", "MLOps"],
    missingSkills: ["LangChain", "Vector DBs"],
    riskScore: 18,
    riskLevel: "Low",
    retentionScore: 83,
    retentionFactors: [
      { name: "Top-tier cloud AI production experience", impact: 18, type: "positive" },
      { name: "High base salary benchmark in Seattle", impact: -10, type: "negative" }
    ],
    status: "Screening",
    cvFileName: "Daniel_Kim_ML_Engineer.pdf",
    uploadedAt: "2026-10-07",
    personaSummary: "Daniel is a battle-tested MLOps and transformer deployment engineer. At AWS, he contributed to high-throughput SageMaker endpoints supporting billions of weekly inference invocations.",
    personaConfidence: 90,
    strengths: ["MLOps infrastructure", "Large scale distributed inference"],
    concerns: ["Higher compensation demands"],
    suggestedQuestions: ["How do you detect feature drift in deployed NLP models?"],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 11, lastChecked: "2 days ago" },
      { type: "GitHub", name: "github.com/danielkim-ai", status: "Connected", verifiedClaims: 7, lastChecked: "Yesterday" }
    ],
    claims: [
      { id: "cl-101", text: "Software Engineer II at Amazon (2021 - Present)", status: "Verified", source: "LinkedIn & Corporate record", link: "#" }
    ],
    radarSkills: [
      { subject: "MLOps", A: 96, fullMark: 100 },
      { subject: "PyTorch", A: 90, fullMark: 100 },
      { subject: "Distributed Systems", A: 92, fullMark: 100 },
      { subject: "Model Optimization", A: 86, fullMark: 100 },
      { subject: "Agent Workflows", A: 72, fullMark: 100 },
      { subject: "Research Depth", A: 78, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "AWS SageMaker & MLOps", level: 96 },
      { skill: "PyTorch & TensorRT", level: 90 },
      { skill: "Python & FastAPI", level: 92 }
    ],
    experienceTimeline: [
      { role: "Software Engineer II", company: "Amazon", period: "2021 - Present", description: "Deploying generative AI inference microservices on AWS infrastructure." }
    ],
    githubHeatmap: { totalCommitsLastYear: 890, activeDaysPercentage: 62, languages: [{ name: "Python", percentage: 75, color: "#3B82F6" }, { name: "C++", percentage: 25, color: "#EC4899" }] },
    riskFlags: [],
    offerRecommendation: {
      baseSalary: 165000,
      minRecommended: 150000,
      maxRecommended: 175000,
      marketMedian: 160000,
      acceptanceProbability: 84,
      equityPercent: 0.25,
      signingBonus: 15000,
      benefitsScore: 94
    }
  },
  {
    id: "cand-11",
    name: "Omar Farooq",
    title: "Senior Full Stack JavaScript Developer",
    email: "omar.farooq@codepak.dev",
    phone: "+92 300 4892147",
    location: "Islamabad, Pakistan",
    avatar: "OF",
    accentColor: "from-sky-500 to-indigo-600",
    experienceYears: 5.2,
    currentCompany: "KeepTruckin (Motive)",
    appliedJobId: "job-1",
    matchScore: 89,
    matchBreakdown: { skills: 90, experience: 88, education: 86 },
    matchedSkills: ["React", "TypeScript", "Docker", "PostgreSQL", "Tailwind CSS"],
    missingSkills: ["Python", "FastAPI"],
    riskScore: 15,
    riskLevel: "Low",
    retentionScore: 85,
    retentionFactors: [
      { name: "Consistent tenure at Motive", impact: 15, type: "positive" },
      { name: "High frontend test coverage discipline", impact: 12, type: "positive" }
    ],
    status: "Screening",
    cvFileName: "Omar_Farooq_FullStack.pdf",
    uploadedAt: "2026-10-10",
    personaSummary: "Omar is a high-velocity frontend-first full-stack engineer. He has architected telemetry dashboards with web workers and WebGL chart renderers for Motive fleet management.",
    personaConfidence: 91,
    strengths: ["Clean React architecture", "Micro-frontend scaling", "TypeScript strict mode advocate"],
    concerns: ["Needs slight ramp-up on Python asynchronous backends"],
    suggestedQuestions: ["How do you structure global state when managing 10,000 live streaming entities?"],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 9, lastChecked: "Yesterday" },
      { type: "GitHub", name: "github.com/omarfarooq-web", status: "Connected", verifiedClaims: 7, lastChecked: "Yesterday" }
    ],
    claims: [
      { id: "cl-111", text: "Software Engineer at Motive (2022 - Present)", status: "Verified", source: "LinkedIn & Corporate reference check", link: "#" }
    ],
    radarSkills: [
      { subject: "React & DOM", A: 96, fullMark: 100 },
      { subject: "TypeScript", A: 94, fullMark: 100 },
      { subject: "State Architecture", A: 92, fullMark: 100 },
      { subject: "Backend & DB", A: 78, fullMark: 100 },
      { subject: "Testing & CI", A: 88, fullMark: 100 },
      { subject: "Python Services", A: 65, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "React 18 & Next.js", level: 96 },
      { skill: "TypeScript (Strict Mode)", level: 94 },
      { skill: "Tailwind CSS & Component Kits", level: 92 },
      { skill: "Node.js & Express", level: 84 }
    ],
    experienceTimeline: [
      { role: "Senior Software Engineer", company: "Motive", period: "2022 - Present", description: "Built real-time IoT fleet telemetry panels with sub-second update latency." }
    ],
    githubHeatmap: { totalCommitsLastYear: 1100, activeDaysPercentage: 70, languages: [{ name: "TypeScript", percentage: 80, color: "#6366F1" }, { name: "JavaScript", percentage: 20, color: "#F59E0B" }] },
    riskFlags: [],
    offerRecommendation: {
      baseSalary: 112000,
      minRecommended: 104000,
      maxRecommended: 120000,
      marketMedian: 110000,
      acceptanceProbability: 88,
      equityPercent: 0.12,
      signingBonus: 8000,
      benefitsScore: 90
    }
  },
  {
    id: "cand-12",
    name: "Mahnoor Ali",
    title: "HR Operations & Recruiter Enablement Specialist",
    email: "mahnoor.ali@peoplepulse.pk",
    phone: "+92 334 1092837",
    location: "Islamabad, Pakistan",
    avatar: "MA",
    accentColor: "from-rose-500 to-amber-500",
    experienceYears: 3.5,
    currentCompany: "Teradata Global Delivery",
    appliedJobId: "job-5",
    matchScore: 87,
    matchBreakdown: { skills: 88, experience: 84, education: 86 },
    matchedSkills: ["Talent Acquisition", "Technical Recruiting", "HRIS", "Interview Coaching"],
    missingSkills: ["Compensation Benchmarking", "Employer Branding"],
    riskScore: 12,
    riskLevel: "Low",
    retentionScore: 86,
    retentionFactors: [
      { name: "Continuous education and SHRM-CP certification", impact: 16, type: "positive" },
      { name: "Positive team-first feedback", impact: 12, type: "positive" }
    ],
    status: "Screening",
    cvFileName: "Mahnoor_Ali_HR_Enablement.pdf",
    uploadedAt: "2026-10-10",
    personaSummary: "Mahnoor excels in organizing seamless onboarding funnels, optimizing recruiter candidate communications, and monitoring candidate satisfaction NPS.",
    personaConfidence: 91,
    strengths: ["Candidate NPS of 94+", "Organized HRIS workflows"],
    concerns: ["Limited experience designing unassisted salary equity bands"],
    suggestedQuestions: ["How do you track candidate satisfaction post-rejection?"],
    evidenceSources: [
      { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 8, lastChecked: "Today" },
      { type: "LinkedIn", name: "linkedin.com/in/mahnoor-ali-hr", status: "Connected", verifiedClaims: 6, lastChecked: "Yesterday" }
    ],
    claims: [
      { id: "cl-121", text: "People Operations Analyst at Teradata (2023 - Present)", status: "Verified", source: "LinkedIn verified", link: "#" }
    ],
    radarSkills: [
      { subject: "Recruiting Ops", A: 92, fullMark: 100 },
      { subject: "HRIS Systems", A: 90, fullMark: 100 },
      { subject: "Candidate NPS", A: 95, fullMark: 100 },
      { subject: "Onboarding", A: 94, fullMark: 100 },
      { subject: "Comp Benchmarking", A: 72, fullMark: 100 },
      { subject: "Outreach", A: 82, fullMark: 100 }
    ],
    skillsProficiency: [
      { skill: "HRIS & ATS Optimization", level: 92 },
      { skill: "Candidate Experience Management", level: 94 },
      { skill: "Interview Scheduling & Logistics", level: 90 }
    ],
    experienceTimeline: [
      { role: "People Operations Specialist", company: "Teradata", period: "2023 - Present", description: "Streamlined regional hiring coordinator operations across South Asia." }
    ],
    githubHeatmap: { totalCommitsLastYear: 0, activeDaysPercentage: 0, languages: [] },
    riskFlags: [],
    offerRecommendation: {
      baseSalary: 64000,
      minRecommended: 58000,
      maxRecommended: 70000,
      marketMedian: 62000,
      acceptanceProbability: 89,
      equityPercent: 0.08,
      signingBonus: 4000,
      benefitsScore: 88
    }
  }
];
