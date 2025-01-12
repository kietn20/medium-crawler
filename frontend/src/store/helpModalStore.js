import { create } from 'zustand'; 

export const useHelpModalStore = create((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
}));