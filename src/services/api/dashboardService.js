import { apiClient, executeService } from './client';
import { MOCK_DASHBOARD_METRICS } from '../../mocks/analytics';

export const dashboardService = {
  getMetrics: async () => {
    return executeService(
      () => apiClient.get('/dashboard/metrics'),
      () => MOCK_DASHBOARD_METRICS,
      500
    );
  },

  exportReport: async (format = 'pdf', filters = {}) => {
    return executeService(
      () => apiClient.post('/reports/export', { format, filters }),
      () => {
        // Return simulated download payload
        return {
          downloadUrl: `data:text/plain;charset=utf-8,Recruiter.AI%20Executive%20Talent%20Report%0AGenerated%20on%20${new Date().toISOString()}`,
          filename: `RecruiterAI_Talent_Report_${new Date().toISOString().slice(0, 10)}.${format}`,
          format,
          recordCount: 169
        };
      },
      1200
    );
  }
};
