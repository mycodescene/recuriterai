import { apiClient, executeService } from './client';
import { MOCK_WORKFORCE_DATA } from '../../mocks/workforce';

export const workforceService = {
  getDemand: async (department = 'all') => {
    return executeService(
      () => apiClient.get('/workforce/demand', { params: { department } }),
      () => {
        let heatmap = MOCK_WORKFORCE_DATA.departmentHeatmap;
        if (department !== 'all') {
          heatmap = heatmap.filter(d => d.department.toLowerCase().includes(department.toLowerCase()));
        }
        return {
          ...MOCK_WORKFORCE_DATA,
          departmentHeatmap: heatmap
        };
      },
      600
    );
  }
};
