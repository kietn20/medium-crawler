import { create } from 'zustand';

export const useSearchModalStore = create((set) => ({
  showSearchModal: false,
  setShowSearchModal: (show) => set({ showSearchModal: show }),
  slotIndexClicked: null,
  setSlotIndexClicked: (index) => set({ slotIndexClicked: index }),
}));