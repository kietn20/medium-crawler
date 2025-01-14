import { useState } from "react";
import { useSearchModalStore } from "../store/searchModal";
import { useMediaStore } from "../store/mediaStore";
import { useEditModalStore } from "../store/editStore";

export const Slot = ({ index }) => {
  // Search Modal State Store
  const showSearchModal = useSearchModalStore((state) => state.showSearchModal);
  const setShowSearchModal = useSearchModalStore(
    (state) => state.setShowSearchModal
  );

  // Edit Modal State Store
  const showEditModal = useEditModalStore((state) => state.showEditModal);
  const setShowEditModal = useEditModalStore((state) => state.setShowEditModal);
  const setCurrentEditIndex = useEditModalStore(
    (state) => state.setCurrentEditIndex
  );

  // Media Item State Store
  const mediaItem = useMediaStore((state) => state.mediaItems[index]);

  return (
    <div
      className={`w-[165px] h-[280px] border border-[#B1FA63] rounded-[30px] flex items-center justify-center text-[#B1FA63] text-9xl font-heading cursor-pointer opacity-35 hover:opacity-100 duration-300`}
      style={{
        borderStyle: "dashed",
        borderWidth: "2px",
      }}
      onClick={() => {
        if (mediaItem) {
          setShowEditModal(true);
          setCurrentEditIndex(index);
        } else {
          setShowSearchModal(true);
        }
        console.log(mediaItem);
      }}
    >
      {mediaItem ? (
        <img src={mediaItem.imageUrl} alt="mediaItem" />
      ) : (
        <div className="mb-10">+</div>
      )}
    </div>
  );
};
