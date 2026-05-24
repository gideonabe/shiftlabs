import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '../../store/authStore';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use((config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) {
    return this.client.post('/auth/register', data);
  }

  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  async verifyEmail(token: string) {
    return this.client.post('/auth/verify-email', { token });
  }

  async resendVerificationEmail(email: string) {
    return this.client.post('/auth/resend-verification', { email });
  }

  // Gig endpoints
  async getGigs(params?: { skip?: number; limit?: number; category?: string }) {
    return this.client.get('/gigs', { params });
  }

  async getGig(id: string) {
    return this.client.get(`/gigs/${id}`);
  }

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
    return this.client.post('/gigs', data);
  }

  async updateGig(id: string, data: Partial<any>) {
    return this.client.put(`/gigs/${id}`, data);
  }

  async deleteGig(id: string) {
    return this.client.delete(`/gigs/${id}`);
  }

  async applyToGig(gigId: string, coverLetter: string) {
    return this.client.post(`/gigs/${gigId}/apply`, { coverLetter });
  }

  // User endpoints
  async getProfile() {
    return this.client.get('/users/profile');
  }

  async updateProfile(data: Partial<any>) {
    return this.client.put('/users/profile', data);
  }

  async getUserById(id: string) {
    return this.client.get(`/users/${id}`);
  }

  // Wallet endpoints
  async getWallet() {
    return this.client.get('/wallet');
  }

  async addFunds(amount: number, method: string) {
    return this.client.post('/wallet/add-funds', { amount, method });
  }

  async withdrawFunds(amount: number, method: string) {
    return this.client.post('/wallet/withdraw', { amount, method });
  }

  // Chat endpoints
  async getConversations() {
    return this.client.get('/chat/conversations');
  }

  async getMessages(conversationId: string) {
    return this.client.get(`/chat/conversations/${conversationId}/messages`);
  }

  async sendMessage(conversationId: string, message: string) {
    return this.client.post(`/chat/conversations/${conversationId}/messages`, { message });
  }

  async createConversation(userId: string) {
    return this.client.post('/chat/conversations', { userId });
  }

  // Admin endpoints
  async getAnalytics() {
    return this.client.get('/admin/analytics');
  }

  async getUsers(params?: { skip?: number; limit?: number; role?: string }) {
    return this.client.get('/admin/users', { params });
  }

  async banUser(userId: string) {
    return this.client.post(`/admin/users/${userId}/ban`);
  }
}

export const apiClient = new ApiClient();
