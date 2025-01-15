import { useState } from "react";
import { useSearchModalStore } from "../store/searchModal";
import { useMediaStore } from "../store/mediaStore";
import { useEditModalStore } from "../store/editStore";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "SLOT";

export const Slot = ({ index }) => {
  // Search Modal State Store
  const setShowSearchModal = useSearchModalStore(
    (state) => state.setShowSearchModal
  );
  const setSlotIndexClicked = useSearchModalStore(
    (state) => state.setSlotIndexClicked
  );

  // Edit Modal State Store
  const setShowEditModal = useEditModalStore((state) => state.setShowEditModal);
  const setCurrentEditIndex = useEditModalStore(
    (state) => state.setCurrentEditIndex
  );

  // Media Item State Store
  const mediaItem = useMediaStore((state) => state.mediaItems[index]);
  const swapMediaItems = useMediaStore((state) => state.swapMediaItems);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        swapMediaItems(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative w-[165px] h-[280px] rounded-[30px] flex items-center justify-center text-[#B1FA63] text-9xl font-heading cursor-pointer hover:opacity-100 duration-300 overflow-hidden z-20 ${
        mediaItem
          ? "opacity-100 border-transparent"
          : "opacity-35 border-[#B1FA63] border-2 border-dashed"
      }`}
      style={{
        opacity: isDragging ?? 0.1,
        boxShadow: mediaItem ? "0 4px 8px rgba(0, 0, 0, 1)" : "none",
      }}
      onClick={() => {
        if (mediaItem) {
          setShowEditModal(true);
          setCurrentEditIndex(index);
        } else {
          setSlotIndexClicked(index);
          setShowSearchModal(true);
        }
      }}
    >
      {mediaItem ? (
        <img
          src={mediaItem.imageUrl}
          alt="mediaItem"
          className="w-full h-full object-cover z-20"
        />
      ) : (
        <div className="mb-10">+</div>
      )}
    </div>
  );
};
