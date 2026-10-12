import { apiClient, executeService } from './client';
import { MOCK_JOBS } from '../../mocks/jobs';

let localJobs = [...MOCK_JOBS];

export const jobService = {
  getAll: async (filter = {}) => {
    return executeService(
      () => apiClient.get('/jobs', { params: filter }),
      () => {
        let result = [...localJobs];
        if (filter.status && filter.status !== 'all') {
          result = result.filter(j => j.status.toLowerCase() === filter.status.toLowerCase());
        }
        if (filter.department && filter.department !== 'all') {
          result = result.filter(j => j.department.toLowerCase() === filter.department.toLowerCase());
        }
        if (filter.search) {
          const q = filter.search.toLowerCase();
          result = result.filter(j => j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q));
        }
        return result;
      }
    );
  },

  getById: async (id) => {
    return executeService(
      () => apiClient.get(`/jobs/${id}`),
      () => {
        const found = localJobs.find(j => j.id === id);
        return found || localJobs[0];
      }
    );
  },

  create: async (jobData) => {
    return executeService(
      () => apiClient.post('/jobs', jobData),
      () => {
        const newJob = {
          ...jobData,
          id: `job-${Date.now()}`,
          applicantsCount: 0,
          postedDate: new Date().toISOString().split('T')[0],
          status: 'Active',
          experienceYears: jobData.experienceYears || [3, 6],
          matchThreshold: jobData.matchThreshold || 75
        };
        localJobs = [newJob, ...localJobs];
        return newJob;
      },
      800
    );
  },

  update: async (id, updates) => {
    return executeService(
      () => apiClient.put(`/jobs/${id}`, updates),
      () => {
        localJobs = localJobs.map(j => j.id === id ? { ...j, ...updates } : j);
        return localJobs.find(j => j.id === id);
      }
    );
  }
};
