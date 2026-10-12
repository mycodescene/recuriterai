import { apiClient, executeService } from './client';
import { MOCK_CANDIDATES } from '../../mocks/candidates';
import { MOCK_JOBS } from '../../mocks/jobs';

export const offerService = {
  getOfferRecommendation: async (candidateId, jobId) => {
    return executeService(
      () => apiClient.get(`/offers/recommendation`, { params: { candidateId, jobId } }),
      () => {
        const candidate = MOCK_CANDIDATES.find(c => c.id === candidateId) || MOCK_CANDIDATES[0];
        const job = MOCK_JOBS.find(j => j.id === jobId) || MOCK_JOBS[0];
        
        const baseRec = candidate.offerRecommendation || {
          baseSalary: Math.round((job.salaryMin + job.salaryMax) / 2),
          minRecommended: job.salaryMin,
          maxRecommended: job.salaryMax,
          marketMedian: Math.round((job.salaryMin + job.salaryMax) / 2),
          acceptanceProbability: 85,
          equityPercent: 0.1,
          signingBonus: 8000,
          benefitsScore: 90
        };

        return {
          candidate,
          job,
          recommendation: baseRec,
          benefitsRecommendations: [
            { name: "Premium Global Health & Dental Coverage", selected: true, impact: "+12% probability" },
            { name: "Home Office / Tech Equipment Stipend ($2,500)", selected: true, impact: "+8% probability" },
            { name: "Continuous Learning & Conference Budget ($3,000/yr)", selected: true, impact: "+9% probability" },
            { name: "Flexible Work Hours & Autonomous Schedule", selected: true, impact: "+14% probability" }
          ]
        };
      },
      500
    );
  },

  calculateAcceptanceProbability: (baseSalary, marketMedian, signingBonus, equityPercent) => {
    // Dynamic formula
    const salaryRatio = baseSalary / marketMedian;
    let prob = 70 + (salaryRatio - 1) * 60;
    if (signingBonus > 0) prob += Math.min(10, (signingBonus / 2000) * 1.5);
    if (equityPercent > 0) prob += Math.min(8, equityPercent * 25);
    return Math.min(98, Math.max(25, Math.round(prob)));
  },

  saveOffer: async (offerData) => {
    return executeService(
      () => apiClient.post(`/offers/save`, offerData),
      () => {
        return {
          success: true,
          offerId: `offer-${Date.now()}`,
          savedAt: new Date().toISOString(),
          ...offerData
        };
      },
      600
    );
  }
};
