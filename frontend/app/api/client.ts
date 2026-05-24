import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '../../store/authStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// Lazy-initialized axios instance
let client: AxiosInstance | null = null;

const getClient = (): AxiosInstance => {
  if (!client) {
    client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    client.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    // Response interceptor to handle errors
    client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
        }
        return Promise.reject(error);
      }
    );
  }
  return client;
};

// Auth endpoints
export const apiClient = {
  async register(data: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) {
    return getClient().post('/auth/register', data);
  },

  async login(email: string, password: string) {
    return getClient().post('/auth/login', { email, password });
  },

  async verifyEmail(token: string) {
    return getClient().post('/auth/verify-email', { token });
  },

  async resendVerificationEmail(email: string) {
    return getClient().post('/auth/resend-verification', { email });
  },

  // Gig endpoints
  async getGigs(params?: { skip?: number; limit?: number; category?: string }) {
    return getClient().get('/gigs', { params });
  },

  async getGig(id: string) {
    return getClient().get(`/gigs/${id}`);
  },

  async createGig(data: {
    title: string;
    description: string;
    category: string;
    budget: number;
    duration: string;
    location: string;
    skills: string[];
    deadline: string;
  }) {
    return getClient().post('/gigs', data);
  },

  async updateGig(id: string, data: Partial<any>) {
    return getClient().put(`/gigs/${id}`, data);
  },

  async deleteGig(id: string) {
    return getClient().delete(`/gigs/${id}`);
  },

  async applyToGig(gigId: string, coverLetter: string) {
    return getClient().post(`/gigs/${gigId}/apply`, { coverLetter });
  },

  // User endpoints
  async getProfile() {
    return getClient().get('/users/profile');
  },

  async updateProfile(data: Partial<any>) {
    return getClient().put('/users/profile', data);
  },

  async getUserById(id: string) {
    return getClient().get(`/users/${id}`);
  },

  // Wallet endpoints
  async getWallet() {
    return getClient().get('/wallet');
  },

  async addFunds(amount: number, method: string) {
    return getClient().post('/wallet/add-funds', { amount, method });
  },

  async withdrawFunds(amount: number, method: string) {
    return getClient().post('/wallet/withdraw', { amount, method });
  },

  // Chat endpoints
  async getConversations() {
    return getClient().get('/chat/conversations');
  },

  async getMessages(conversationId: string) {
    return getClient().get(`/chat/conversations/${conversationId}/messages`);
  },

  async sendMessage(conversationId: string, message: string) {
    return getClient().post(`/chat/conversations/${conversationId}/messages`, { message });
  },

  async createConversation(userId: string) {
    return getClient().post('/chat/conversations', { userId });
  },

  // Admin endpoints
  async getAnalytics() {
    return getClient().get('/admin/analytics');
  },

  async getUsers(params?: { skip?: number; limit?: number; role?: string }) {
    return getClient().get('/admin/users', { params });
  },

  async banUser(userId: string) {
    return getClient().post(`/admin/users/${userId}/ban`);
  },
};

// Export is now the object literal above
