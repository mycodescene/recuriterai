import { apiClient, executeService } from './client';
import { MOCK_CANDIDATES } from '../../mocks/candidates';

let candidatesState = [...MOCK_CANDIDATES];

export const riskService = {
  getOverview: async () => {
    return executeService(
      () => apiClient.get('/risk/overview'),
      () => {
        const allFlags = [];
        candidatesState.forEach(cand => {
          (cand.riskFlags || []).forEach(f => {
            allFlags.push({
              ...f,
              candidateId: cand.id,
              candidateName: cand.name,
              candidateTitle: cand.title,
              overallRiskLevel: cand.riskLevel,
              overallRiskScore: cand.riskScore
            });
          });
        });

        const highRiskCandidates = candidatesState
          .filter(c => c.riskScore > 30)
          .sort((a, b) => b.riskScore - a.riskScore);

        const avgRisk = Math.round(
          candidatesState.reduce((acc, c) => acc + c.riskScore, 0) / candidatesState.length
        );

        return {
          averageRiskScore: avgRisk,
          flags: allFlags,
          highRiskCandidates,
          riskDistribution: [
            { name: "Low Risk (<25%)", count: candidatesState.filter(c => c.riskScore < 25).length },
            { name: "Medium Risk (25-50%)", count: candidatesState.filter(c => c.riskScore >= 25 && c.riskScore <= 50).length },
            { name: "High Risk (>50%)", count: candidatesState.filter(c => c.riskScore > 50).length }
          ]
        };
      },
      500
    );
  },

  markFlagReviewed: async (flagId) => {
    return executeService(
      () => apiClient.post(`/risk/flags/${flagId}/review`),
      () => {
        candidatesState = candidatesState.map(c => ({
          ...c,
          riskFlags: (c.riskFlags || []).map(f => f.id === flagId ? { ...f, status: 'reviewed' } : f)
        }));
        return { success: true, flagId };
      },
      400
    );
  }
};
