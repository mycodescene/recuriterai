import { apiClient, executeService } from './client';
import { MOCK_EMAILS } from '../../mocks/emails';

let emailsState = [...MOCK_EMAILS];

export const communicationService = {
  getAll: async (filter = {}) => {
    return executeService(
      () => apiClient.get('/communications/emails', { params: filter }),
      () => {
        let list = [...emailsState];
        if (filter.status && filter.status !== 'all') {
          list = list.filter(e => e.status.toLowerCase() === filter.status.toLowerCase());
        }
        if (filter.type && filter.type !== 'all') {
          list = list.filter(e => e.type.toLowerCase() === filter.type.toLowerCase());
        }
        if (filter.search) {
          const q = filter.search.toLowerCase();
          list = list.filter(e => 
            e.candidateName.toLowerCase().includes(q) || 
            e.subject.toLowerCase().includes(q) ||
            e.candidateEmail.toLowerCase().includes(q)
          );
        }
        return list;
      },
      450
    );
  },

  updateEmail: async (id, updates) => {
    return executeService(
      () => apiClient.put(`/communications/emails/${id}`, updates),
      () => {
        emailsState = emailsState.map(e => e.id === id ? { ...e, ...updates } : e);
        return emailsState.find(e => e.id === id);
      },
      300
    );
  },

  regenerateEmail: async (id, tone = "Warm") => {
    return executeService(
      () => apiClient.post(`/communications/emails/${id}/regenerate`, { tone }),
      () => {
        const email = emailsState.find(e => e.id === id);
        if (!email) return null;

        let newContent = '';
        if (email.type === 'Selection') {
          if (tone === 'Formal') {
            newContent = `Dear ${email.candidateName},\n\nWe are pleased to advise that following your assessment for the ${email.jobTitle} position, your application has been selected for advancement to the executive interview phase.\n\nYour demonstrated technical pedigree and alignment with our system benchmarks were regarded favorably by our selection committee.\n\nKindly indicate your availability for a scheduled conference next week.\n\nSincerely,\nTalent Acquisition Directorate\nSynthetix Global`;
          } else if (tone === 'Concise') {
            newContent = `Hi ${email.candidateName},\n\nGreat news! Your evaluation score (${email.score}/100) qualified you for the final technical interview for ${email.jobTitle}.\n\nPlease reply with your available dates for a 45-minute sync this week.\n\nBest,\nSarah Jenkins | Synthetix`;
          } else {
            newContent = `Dear ${email.candidateName},\n\nWe were genuinely thrilled reviewing your background for ${email.jobTitle}! Your work stands out, and our team is excited to invite you to the next round of conversations.\n\nLet us know what times work best for you this week so we can connect!\n\nWarm regards,\nSarah Jenkins | Synthetix Global`;
          }
        } else {
          if (tone === 'Formal') {
            newContent = `Dear ${email.candidateName},\n\nWe write to advise that our hiring panel has concluded evaluations for the ${email.jobTitle} position. We will not be advancing your candidacy further at this juncture.\n\nWe commend your qualifications and extend our best wishes for your ongoing professional career.\n\nSincerely,\nSynthetix Recruitment Committee`;
          } else if (tone === 'Concise') {
            newContent = `Hello ${email.candidateName},\n\nThank you for applying for ${email.jobTitle}. While your background is impressive, we have chosen to proceed with candidates whose skills more closely align with our current architecture requirements.\n\nWe wish you all the best.\n\nRegards,\nSarah Jenkins`;
          } else {
            newContent = `Hi ${email.candidateName},\n\nThank you so much for taking the time to speak with us regarding the ${email.jobTitle} position. While we were impressed with your enthusiasm and background, we've decided to proceed with other candidates whose experience more closely matches our immediate technical needs.\n\nWe truly appreciate your interest and wish you the best in your job search!\n\nWarmly,\nSarah Jenkins`;
          }
        }

        const updated = {
          ...email,
          content: newContent,
          tone,
          previewSnippet: newContent.slice(0, 90) + '...'
        };
        emailsState = emailsState.map(e => e.id === id ? updated : e);
        return updated;
      },
      700
    );
  },

  approveEmail: async (id) => {
    return executeService(
      () => apiClient.post(`/communications/emails/${id}/approve`),
      () => {
        emailsState = emailsState.map(e => e.id === id ? { ...e, status: 'Approved' } : e);
        return emailsState.find(e => e.id === id);
      },
      300
    );
  },

  sendEmail: async (id) => {
    return executeService(
      () => apiClient.post(`/communications/emails/${id}/send`),
      () => {
        emailsState = emailsState.map(e => e.id === id ? { ...e, status: 'Sent', sentAt: new Date().toISOString() } : e);
        return emailsState.find(e => e.id === id);
      },
      800
    );
  },

  bulkApprove: async (ids) => {
    return executeService(
      () => apiClient.post(`/communications/emails/bulk-approve`, { ids }),
      () => {
        emailsState = emailsState.map(e => ids.includes(e.id) ? { ...e, status: 'Approved' } : e);
        return { success: true, approvedCount: ids.length };
      },
      500
    );
  }
};
