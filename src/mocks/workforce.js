export const MOCK_WORKFORCE_DATA = {
  forecast: [
    { month: "Nov 2026", demand: 18, lowerBand: 15, upperBand: 22, actual: 19 },
    { month: "Dec 2026", demand: 24, lowerBand: 20, upperBand: 28, actual: null },
    { month: "Jan 2027", demand: 32, lowerBand: 26, upperBand: 38, actual: null },
    { month: "Feb 2027", demand: 39, lowerBand: 31, upperBand: 46, actual: null },
    { month: "Mar 2027", demand: 45, lowerBand: 36, upperBand: 53, actual: null },
    { month: "Apr 2027", demand: 52, lowerBand: 42, upperBand: 61, actual: null },
    { month: "May 2027", demand: 48, lowerBand: 39, upperBand: 58, actual: null },
    { month: "Jun 2027", demand: 56, lowerBand: 45, upperBand: 67, actual: null },
    { month: "Jul 2027", demand: 61, lowerBand: 50, upperBand: 73, actual: null },
    { month: "Aug 2027", demand: 58, lowerBand: 47, upperBand: 69, actual: null },
    { month: "Sep 2027", demand: 64, lowerBand: 52, upperBand: 77, actual: null },
    { month: "Oct 2027", demand: 70, lowerBand: 57, upperBand: 84, actual: null },
  ],
  emergingSkills: [
    { skill: "Agentic AI / LangGraph", demandGrowth: "+148%", trend: "up", urgency: "Critical", currentHeadcount: 3, projectedNeed: 12 },
    { skill: "Rust for High-Frequency Services", demandGrowth: "+94%", trend: "up", urgency: "High", currentHeadcount: 2, projectedNeed: 7 },
    { skill: "Kubernetes Platform Eng (Cilium / eBPF)", demandGrowth: "+76%", trend: "up", urgency: "High", currentHeadcount: 4, projectedNeed: 9 },
    { skill: "Vector Database Architecture (Milvus, Qdrant)", demandGrowth: "+62%", trend: "up", urgency: "Medium", currentHeadcount: 5, projectedNeed: 10 },
    { skill: "Framer Motion & Token Architecture", demandGrowth: "+45%", trend: "up", urgency: "Medium", currentHeadcount: 3, projectedNeed: 6 },
    { skill: "Legacy Monolith PHP / CodeIgniter", demandGrowth: "-38%", trend: "down", urgency: "Deprecating", currentHeadcount: 6, projectedNeed: 2 }
  ],
  departmentHeatmap: [
    { department: "AI & ML Labs", q1: 18, q2: 24, q3: 31, q4: 36, riskLevel: "High Growth" },
    { department: "Core Platform & Infra", q1: 12, q2: 15, q3: 18, q4: 21, riskLevel: "Stable Growth" },
    { department: "Product Design", q1: 6, q2: 8, q3: 10, q4: 12, riskLevel: "Moderate" },
    { department: "Talent & People Ops", q1: 4, q2: 5, q3: 6, q4: 7, riskLevel: "Moderate" },
    { department: "Data & BI Analytics", q1: 8, q2: 11, q3: 14, q4: 17, riskLevel: "High Growth" }
  ],
  aiInsight: {
    title: "Projected Q1-Q2 2027 Talent Deficit in Agentic AI Engineering",
    summary: "Based on current product roadmap velocity and cross-company attrition indicators, our models project a 42% talent deficit in specialized LLM and Agentic infrastructure by March 2027. Immediate proactive talent pipelining for senior AI researchers and Rust systems developers is strongly advised to prevent delivery delays."
  }
};
