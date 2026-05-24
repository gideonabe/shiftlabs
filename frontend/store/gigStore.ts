import { ReactNode } from 'react';
import { create } from 'zustand';

export interface Gig {
  urgency: string;
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  duration: string;
  location: string;
  latitude?: number;
  longitude?: number;
  skills: string[];
  employer: {
    verified: any;
    joined: ReactNode;
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  applicants: number;
  createdAt: string;
  deadline: string;
  image?: string;
}

export interface GigStore {
  gigs: Gig[];
  filteredGigs: Gig[];
  selectedGig: Gig | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    category?: string;
    minBudget?: number;
    maxBudget?: number;
    searchQuery?: string;
    location?: string;
  };
  
  setGigs: (gigs: Gig[]) => void;
  setSelectedGig: (gig: Gig | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<GigStore['filters']>) => void;
  applyFilters: () => void;
  addGig: (gig: Gig) => void;
  removeGig: (gigId: string) => void;
}

export const useGigStore = create<GigStore>((set, get) => ({
  gigs: [],
  filteredGigs: [],
  selectedGig: null,
  isLoading: false,
  error: null,
  filters: {},
  
  setGigs: (gigs) => {
    set({ gigs });
    get().applyFilters();
  },
  setSelectedGig: (gig) => set({ selectedGig: gig }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => {
    set((state) => ({ filters: { ...state.filters, ...filters } }));
    get().applyFilters();
  },
  applyFilters: () => {
    const { gigs, filters } = get();
    const filtered = gigs.filter((gig) => {
      if (filters.category && gig.category !== filters.category) return false;
      if (filters.minBudget && gig.budget < filters.minBudget) return false;
      if (filters.maxBudget && gig.budget > filters.maxBudget) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          gig.title.toLowerCase().includes(query) ||
          gig.description.toLowerCase().includes(query) ||
          gig.skills.some((s) => s.toLowerCase().includes(query))
        );
      }
      if (filters.location && !gig.location.includes(filters.location)) return false;
      return true;
    });
    set({ filteredGigs: filtered });
  },
  addGig: (gig) => {
    set((state) => ({ gigs: [gig, ...state.gigs] }));
    get().applyFilters();
  },
  removeGig: (gigId) => {
    set((state) => ({ gigs: state.gigs.filter((g) => g.id !== gigId) }));
    get().applyFilters();
  },
}));
