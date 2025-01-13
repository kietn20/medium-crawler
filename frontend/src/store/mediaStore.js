import { create } from "zustand";

export const useMediaStore = create((set) => ({
    mediaItems: [{title: "MEDIA 1"}, null, null, null, null, null, null, null],
    setMediaItem: (index, mediaItem) =>
        set((state) => {
            const mediaItems = [...state.mediaItems];
            mediaItems[index] = mediaItem;
            return { mediaItems };
        }),
}));