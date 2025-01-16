import { create } from "zustand";

export const useMediaStore = create((set) => ({
    mediaItems: [{title: "Dune 2", imageUrl: "https://a.ltrbxd.com/resized/film-poster/6/1/7/4/4/3/617443-dune-part-two-0-2000-0-3000-crop.jpg"}, {title: "Dune 2", imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/65/Persona_3_Reload_box_art.jpg"}, {title: "Dune 2", imageUrl: "https://a.ltrbxd.com/resized/film-poster/1/1/2/7/6/6/9/1127669-look-back-0-2000-0-3000-crop.jpg"}, {title: "Dune 2", imageUrl: "https://a.ltrbxd.com/resized/film-poster/4/6/1/7/5/46175-perfect-blue-0-2000-0-3000-crop.jpg"}, {title: "Dune 2", imageUrl: "https://i.ebayimg.com/images/g/5i4AAOSw3SdmVQ0l/s-l1200.jpg"}, {title: "Dune 2", imageUrl: "https://a.ltrbxd.com/resized/film-poster/1/1/1/0/0/5/9/1110059-longlegs-0-2000-0-3000-crop.jpg"}, {title: "Dune 2", imageUrl: "https://m.media-amazon.com/images/M/MV5BNGVmZTVjZDMtMzkyZi00MTczLWE4OTUtY2Y1ODBlMGFlYTAxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"}, {title: "Dune 2", imageUrl: "https://a.ltrbxd.com/resized/sm/upload/8g/5p/p4/6b/8YWirGQidtZeSEmhqvQM5FrI6N1-0-2000-0-3000-crop.jpg"}],
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
    showManageListsModal: false,
    setShowManageListsModal: (show) => set({ showManageListsModal: show }),
}));