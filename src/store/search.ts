import { create } from 'zustand';

interface SearchState {
  search: string;
  setSearch: (v: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: '',
  setSearch: (v) => set({ search: v }),
}));
