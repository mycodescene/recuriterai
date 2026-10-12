import { apiClient, executeService } from './client';
import { MOCK_CANDIDATES } from '../../mocks/candidates';

export const matchingService = {
  getRankings: async (jobId, weights = { skills: 0.5, experience: 0.3, education: 0.2 }) => {
    return executeService(
      () => apiClient.post('/matching/rankings', { jobId, weights }),
      () => {
        // Calculate dynamic weighted score
        const totalWeight = (weights.skills + weights.experience + weights.education) || 1;
        const normSkills = weights.skills / totalWeight;
        const normExp = weights.experience / totalWeight;
        const normEdu = weights.education / totalWeight;

        const filtered = MOCK_CANDIDATES.map(cand => {
          const s = cand.matchBreakdown.skills * normSkills;
          const e = cand.matchBreakdown.experience * normExp;
          const ed = cand.matchBreakdown.education * normEdu;
          const dynamicScore = Math.round(s + e + ed);

          return {
            ...cand,
            dynamicScore,
            isJobSpecific: cand.appliedJobId === jobId
          };
        });

        // Sort descending by calculated score
        return filtered.sort((a, b) => b.dynamicScore - a.dynamicScore);
      },
      600
    );
  }
};
