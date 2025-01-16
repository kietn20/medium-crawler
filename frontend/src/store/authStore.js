import { create } from "zustand";

export const useAuthStore = create((set) => ({
    isSignedIn: false,
    setSignedIn: (signedIn) => set({ isSignedIn: signedIn }),
}));