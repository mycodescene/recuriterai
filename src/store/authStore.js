import { create } from 'zustand';

const DEMO_USER = {
  id: 'usr-101',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@recruiter.ai',
  title: 'Lead Technical Talent Partner',
  company: 'Synthetix Global Tech',
  role: 'Recruiter',
  avatar: 'SJ',
  department: 'Engineering & Product',
  notifications: {
    emailAlerts: true,
    candidateRiskAlerts: true,
    weeklyReport: true
  },
  signature: 'Sarah Jenkins\nLead Technical Talent Partner | Synthetix Global'
};

const getStoredAuth = () => {
  try {
    const token = localStorage.getItem('recruiter_token');
    const user = localStorage.getItem('recruiter_user');
    if (token && user) {
      return { token, user: JSON.parse(user), isAuthenticated: true };
    }
  } catch (e) {
    console.error('Failed to parse auth token', e);
  }
  return { token: null, user: null, isAuthenticated: false };
};

export const useAuthStore = create((set) => ({
  ...getStoredAuth(),
  login: (email, password) => {
    const fakeToken = 'jwt-fake-session-token-' + Date.now();
    const user = {
      ...DEMO_USER,
      email: email || DEMO_USER.email,
    };
    localStorage.setItem('recruiter_token', fakeToken);
    localStorage.setItem('recruiter_user', JSON.stringify(user));
    set({ token: fakeToken, user, isAuthenticated: true });
    return user;
  },
  demoLogin: () => {
    const fakeToken = 'jwt-demo-session-token-' + Date.now();
    localStorage.setItem('recruiter_token', fakeToken);
    localStorage.setItem('recruiter_user', JSON.stringify(DEMO_USER));
    set({ token: fakeToken, user: DEMO_USER, isAuthenticated: true });
    return DEMO_USER;
  },
  logout: () => {
    localStorage.removeItem('recruiter_token');
    localStorage.removeItem('recruiter_user');
    set({ token: null, user: null, isAuthenticated: false });
  },
  updateProfile: (updatedData) => {
    set((state) => {
      const newUser = { ...state.user, ...updatedData };
      localStorage.setItem('recruiter_user', JSON.stringify(newUser));
      return { user: newUser };
    });
  }
}));
