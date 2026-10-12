import { apiClient, executeService } from './client';
import { MOCK_CANDIDATES } from '../../mocks/candidates';

let localCandidates = [...MOCK_CANDIDATES];

export const candidateService = {
  getAll: async (filter = {}) => {
    return executeService(
      () => apiClient.get('/candidates', { params: filter }),
      () => {
        let result = [...localCandidates];
        if (filter.jobId && filter.jobId !== 'all') {
          result = result.filter(c => c.appliedJobId === filter.jobId);
        }
        if (filter.search) {
          const q = filter.search.toLowerCase();
          result = result.filter(c => c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
        }
        if (filter.status && filter.status !== 'all') {
          result = result.filter(c => c.status.toLowerCase() === filter.status.toLowerCase());
        }
        return result;
      }
    );
  },

  getById: async (id) => {
    return executeService(
      () => apiClient.get(`/candidates/${id}`),
      () => {
        const found = localCandidates.find(c => c.id === id);
        return found || localCandidates[0];
      }
    );
  },

  uploadCVs: async (files) => {
    return executeService(
      () => {
        const formData = new FormData();
        files.forEach(f => formData.append('files', f));
        return apiClient.post('/candidates/upload-cv', formData);
      },
      () => {
        const newCandidates = files.map((file, idx) => ({
          id: `cand-${Date.now()}-${idx}`,
          name: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
          title: "Candidate (Ingested CV)",
          email: `${file.name.slice(0, 5).toLowerCase()}@example.com`,
          phone: "+92 300 1234567",
          location: "Islamabad, PK",
          avatar: "NEW",
          accentColor: "from-indigo-600 to-purple-600",
          experienceYears: 4,
          currentCompany: "Pending Verification",
          appliedJobId: "job-1",
          matchScore: 85,
          matchBreakdown: { skills: 88, experience: 82, education: 85 },
          matchedSkills: ["React", "TypeScript", "Python"],
          missingSkills: ["Docker"],
          riskScore: 15,
          riskLevel: "Low",
          retentionScore: 85,
          retentionFactors: [],
          status: "Screening",
          cvFileName: file.name,
          uploadedAt: new Date().toISOString().split('T')[0],
          personaSummary: "Candidate profile parsed from uploaded PDF. Automated claim extraction and persona generation ready.",
          personaConfidence: 88,
          strengths: ["Strong technical clarity in CV", "Verified education credentials"],
          concerns: ["Needs full cross-reference with GitHub and LinkedIn"],
          suggestedQuestions: ["Can you explain the system architecture in your most recent project?"],
          evidenceSources: [
            { type: "CV", name: "Curriculum Vitae", status: "Connected", verifiedClaims: 5, lastChecked: "Just now" }
          ],
          claims: [
            { id: `cl-new-${idx}`, text: "Degree verified from university records", status: "Verified", source: "CV Ingest", link: "#" }
          ],
          radarSkills: [
            { subject: "System Design", A: 80, fullMark: 100 },
            { subject: "Frontend", A: 85, fullMark: 100 },
            { subject: "Backend", A: 82, fullMark: 100 },
            { subject: "Cloud", A: 75, fullMark: 100 },
            { subject: "Testing", A: 80, fullMark: 100 },
            { subject: "Leadership", A: 70, fullMark: 100 }
          ],
          skillsProficiency: [
            { skill: "Core Engineering", level: 85 },
            { skill: "Framework Competency", level: 82 }
          ],
          experienceTimeline: [
            { role: "Software Engineer", company: "Previous Tech", period: "2023 - Present", description: "Parsed from CV document." }
          ],
          githubHeatmap: { totalCommitsLastYear: 450, activeDaysPercentage: 45, languages: [] },
          riskFlags: [],
          offerRecommendation: {
            baseSalary: 95000,
            minRecommended: 90000,
            maxRecommended: 105000,
            marketMedian: 95000,
            acceptanceProbability: 88,
            equityPercent: 0.1,
            signingBonus: 5000,
            benefitsScore: 90
          }
        }));
        localCandidates = [...newCandidates, ...localCandidates];
        return newCandidates;
      },
      900
    );
  },

  updateStatus: async (candidateId, status) => {
    return executeService(
      () => apiClient.patch(`/candidates/${candidateId}/status`, { status }),
      () => {
        localCandidates = localCandidates.map(c => c.id === candidateId ? { ...c, status } : c);
        return { success: true, candidateId, status };
      }
    );
  }
};
