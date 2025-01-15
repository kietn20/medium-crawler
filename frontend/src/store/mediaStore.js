import { create } from "zustand";

export const useMediaStore = create((set) => ({
    mediaItems: [null, null, null, null, null, null, null, null],
    setMediaItem: (index, mediaItem) =>
        set((state) => {
            const mediaItems = [...state.mediaItems];
            mediaItems[index] = mediaItem;
            return { mediaItems };
        }),
    swapMediaItems: (index1, index2) => set((state) => {
        const newMediaItems = [...state.mediaItems];
        [newMediaItems[index1], newMediaItems[index2]] = [newMediaItems[index2], newMediaItems[index1]];
        return { mediaItems: newMediaItems };
    }),
    slotIndexClicked: null,
    setSlotIndexClicked: (index) => set({ slotIndexClicked: index }),
}));