export const MOCK_DASHBOARD_METRICS = {
  kpis: [
    {
      id: "kpi-jobs",
      title: "Active Open Jobs",
      value: 6,
      delta: "+2 this month",
      trend: "up",
      sparkline: [3, 4, 4, 5, 5, 6],
      icon: "Briefcase"
    },
    {
      id: "kpi-candidates",
      title: "Total Evaluated Candidates",
      value: 169,
      delta: "+24% vs last mo",
      trend: "up",
      sparkline: [110, 125, 134, 148, 158, 169],
      icon: "Users"
    },
    {
      id: "kpi-match",
      title: "Average Match Score",
      value: "86.4%",
      numericValue: 86,
      delta: "+3.2% calibrated",
      trend: "up",
      sparkline: [79, 81, 82, 84, 85, 86],
      icon: "Target"
    },
    {
      id: "kpi-emails",
      title: "Pending Email Approvals",
      value: 4,
      delta: "Requires Recruiter Review",
      trend: "neutral",
      sparkline: [2, 3, 5, 4, 6, 4],
      icon: "Mail"
    }
  ],
  funnelData: [
    { stage: "CVs Ingested", count: 240, dropoff: "100%" },
    { stage: "AI Persona Built", count: 184, dropoff: "76.6%" },
    { stage: "Semantic Match ≥75%", count: 112, dropoff: "46.7%" },
    { stage: "Verified Claims Pass", count: 78, dropoff: "32.5%" },
    { stage: "Recruiter Shortlisted", count: 32, dropoff: "13.3%" },
    { stage: "Offer Optimized", count: 14, dropoff: "5.8%" }
  ],
  candidatesOverTime: [
    { month: "May", applications: 45, qualified: 22 },
    { month: "Jun", applications: 62, qualified: 31 },
    { month: "Jul", applications: 84, qualified: 42 },
    { month: "Aug", applications: 115, qualified: 58 },
    { month: "Sep", applications: 142, qualified: 76 },
    { month: "Oct", applications: 169, qualified: 94 }
  ],
  riskDistribution: [
    { name: "Low Risk (<25%)", value: 74, color: "#10B981" },
    { name: "Medium Risk (25-60%)", value: 19, color: "#F59E0B" },
    { name: "High Risk (>60%)", value: 7, color: "#F43F5E" }
  ],
  aiInsightsFeed: [
    {
      id: "ins-1",
      level: "critical",
      title: "Inconsistent Experience Dates Detected",
      text: "Candidate Bilal Ahmed has overlapping full-time employment at NetSol and TechLogix across a 20-month span.",
      timestamp: "10 mins ago",
      candidateId: "cand-5"
    },
    {
      id: "ins-2",
      level: "success",
      title: "Exceptional Match Score Identified",
      text: "Dr. Zainab Malik achieved a 97% semantic match for Lead AI Scientist with 100% verified research citations.",
      timestamp: "1 hour ago",
      candidateId: "cand-2"
    },
    {
      id: "ins-3",
      level: "info",
      title: "Workforce Demand Alert",
      text: "Engineering talent velocity suggests an urgent need to open 2 additional Senior DevOps headcount roles.",
      timestamp: "3 hours ago"
    }
  ],
  recentActivity: [
    { id: "act-1", user: "Sarah Jenkins", action: "Approved AI draft selection email", target: "Zainab Malik", time: "25m ago" },
    { id: "act-2", user: "Recruiter.AI Engine", action: "Generated evidence persona", target: "Hamza Tariq", time: "1h ago" },
    { id: "act-3", user: "Sarah Jenkins", action: "Flagged candidate resume for plagiarism", target: "Bilal Ahmed", time: "2h ago" },
    { id: "act-4", user: "Sarah Jenkins", action: "Created new job requisition", target: "Lead AI & Machine Learning Scientist", time: "Yesterday" }
  ]
};
