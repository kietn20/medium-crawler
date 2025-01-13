import { useState } from "react";
import { useSearchModalStore } from "../store/searchModal";
import { useMediaStore } from "../store/mediaStore";

export const Slot = (index) => {
  const showSearchModal = useSearchModalStore((state) => state.showSearchModal);
  const setShowSearchModal = useSearchModalStore(
    (state) => state.setShowSearchModal
  );

  // Media Item State Store
  const mediaItem = useMediaStore((state) => state.mediaItems[index]);

  return (
    <div
      className="w-[165px] h-[280px] border border-[#B1FA63] rounded-[30px] flex items-center justify-center text-[#B1FA63] text-9xl font-heading opacity-35 cursor-pointer"
      style={{
        borderStyle: "dashed",
        borderWidth: "2px",
      }}
      onClick={() => {
        !showSearchModal && !mediaItem && setShowSearchModal(true);
      }}
    >
      <div className="mb-10">+</div>
    </div>
  );
};
