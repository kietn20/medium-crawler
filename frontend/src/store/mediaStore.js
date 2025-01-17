import { create } from "zustand";
import { useAuthStore } from "./authStore";

// Helper functions to interact with local storage
const loadFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Could not load state from local storage", e);
    return undefined;
  }
};

const saveToLocalStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error("Could not save state to local storage", e);
  }
};

const clearLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Could not clear state from local storage", e);
  }
};

const defaultMediaObject = { title: "", rating: "", description: "", imageUrl: "" };
const defaultMediaList = { name: "medium crawler", items: Array(8).fill(defaultMediaObject) };

const initialState = {
  mediaItems: loadFromLocalStorage("mediaItems") || [],
  mediaLists: loadFromLocalStorage("mediaLists") || [defaultMediaList],
  currentMediaList: loadFromLocalStorage("currentMediaList") || defaultMediaList,
  slotIndexClicked: null,
  showManageListsModal: false,
};

export const useMediaStore = create((set) => ({
  ...initialState,
  setMediaItem: (index, mediaItem) =>
    set((state) => {
      const mediaItems = [...state.currentMediaList.items];
      mediaItems[index] = mediaItem;
      const updatedMediaList = { ...state.currentMediaList, items: mediaItems };
      const mediaLists = state.mediaLists.map((list) =>
        list.name === state.currentMediaList.name ? updatedMediaList : list
      );
      saveToLocalStorage("currentMediaList", updatedMediaList);
      saveToLocalStorage("mediaLists", mediaLists);
      return { currentMediaList: updatedMediaList, mediaLists };
    }),
  swapMediaItems: (index1, index2) =>
    set((state) => {
      const newMediaItems = [...state.currentMediaList.items];
      [newMediaItems[index1], newMediaItems[index2]] = [
        newMediaItems[index2],
        newMediaItems[index1],
      ];
      const updatedMediaList = { ...state.currentMediaList, items: newMediaItems };
      const mediaLists = state.mediaLists.map((list) =>
        list.name === state.currentMediaList.name ? updatedMediaList : list
      );
      saveToLocalStorage("currentMediaList", updatedMediaList);
      saveToLocalStorage("mediaLists", mediaLists);
      return { currentMediaList: updatedMediaList, mediaLists };
    }),
  setSlotIndexClicked: (index) => set({ slotIndexClicked: index }),
  setShowManageListsModal: (show) => set({ showManageListsModal: show }),
  addMediaList: (list) =>
    set((state) => {
      const isSignedIn = useAuthStore.getState().isSignedIn;
      const maxLists = isSignedIn ? 5 : 2;
      if (state.mediaLists.length < maxLists) {
        const newList = { ...list, name: `new media list ${state.mediaLists.length}`, items: Array(8).fill(defaultMediaObject) };
        const mediaLists = [...state.mediaLists, newList];
        saveToLocalStorage("mediaLists", mediaLists);
        return { mediaLists };
      } else {
        console.warn("Media list limit reached");
        return state;
      }
    }),
  removeMediaList: (index) =>
    set((state) => {
      const mediaLists = state.mediaLists.filter((_, i) => i !== index);
      saveToLocalStorage("mediaLists", mediaLists);
      return { mediaLists };
    }),
  setCurrentMediaList: (list) =>
    set((state) => {
      saveToLocalStorage("currentMediaList", list);
      return { currentMediaList: list };
    }),
  updateMediaListName: (index, name) =>
    set((state) => {
      const mediaLists = state.mediaLists.map((list, i) => i === index ? { ...list, name } : list);
      saveToLocalStorage("mediaLists", mediaLists);
      return { mediaLists };
    }),
  clearLocalStorage: () => {
    clearLocalStorage("mediaItems");
    clearLocalStorage("mediaLists");
    clearLocalStorage("currentMediaList");
    set({ mediaItems: [], mediaLists: [defaultMediaList], currentMediaList: defaultMediaList });
  },
}));