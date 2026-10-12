import { apiClient, executeService } from './client';
import { MOCK_CANDIDATES } from '../../mocks/candidates';

export const retentionService = {
  getPrediction: async (candidateId) => {
    return executeService(
      () => apiClient.get(`/retention/candidate/${candidateId}`),
      () => {
        const candidate = MOCK_CANDIDATES.find(c => c.id === candidateId) || MOCK_CANDIDATES[0];
        return {
          candidateId: candidate.id,
          candidateName: candidate.name,
          retentionScore: candidate.retentionScore,
          retentionRiskScore: 100 - candidate.retentionScore,
          factors: candidate.retentionFactors,
          tenureHistoryYears: candidate.experienceYears,
          marketAttritionBaseline: 22 // 22% annual benchmark
        };
      },
      500
    );
  },

  simulate: async (candidateId, params = { salaryDeltaPercent: 0, commuteMins: 30, tenureMonths: 24 }) => {
    return executeService(
      () => apiClient.post(`/retention/simulate`, { candidateId, params }),
      () => {
        const candidate = MOCK_CANDIDATES.find(c => c.id === candidateId) || MOCK_CANDIDATES[0];
        let base = candidate.retentionScore;
        
        // Dynamic simulation model
        const salaryImpact = (params.salaryDeltaPercent || 0) * 0.45;
        const commuteImpact = Math.max(-15, (30 - (params.commuteMins || 30)) * 0.3);
        const tenureImpact = Math.min(12, ((params.tenureMonths || 24) - 24) * 0.25);
        
        const simulatedScore = Math.min(99, Math.max(20, Math.round(base + salaryImpact + commuteImpact + tenureImpact)));
        
        return {
          originalScore: base,
          simulatedScore,
          delta: simulatedScore - base,
          breakdown: {
            salaryContribution: Math.round(salaryImpact),
            commuteContribution: Math.round(commuteImpact),
            tenureContribution: Math.round(tenureImpact)
          }
        };
      },
      300
    );
  }
};
