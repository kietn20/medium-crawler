import { ChartNoAxesColumnDecreasing, Share } from "lucide-react";
import { Navbar } from "./Navbar";
import { Slot } from "./Slot";
import { useEffect, useRef, useState } from "react";
import { useMediaStore } from "../store/mediaStore";
import { useHelpModalStore } from "../store/helpModalStore";
import { HelpModal } from "./HelpModal";
import { SearchModal } from "./SearchModal";

export const Collage = () => {
  const [showHelp, setShowHelp] = useState(false);
  const modalRef = useRef(null);
  const helpButtonRef = useRef(null);

  const page = useHelpModalStore((state) => state.page);
  const setPage = useHelpModalStore((state) => state.setPage);
  const mediaItems = useMediaStore((state) => state.mediaItems);
  const setMediaItem = useMediaStore((state) => state.setMediaItem);

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      helpButtonRef.current &&
      !helpButtonRef.current.contains(event.target)
    ) {
      setShowHelp(false);
    }
  };
  useEffect(() => {
    if (showHelp) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHelp]);

  return (
    <div className="relative flex flex-col items-center justify-start w-screen h-screen overflow-hidden bg-[#0A0B06]">
      <Navbar />
      <div className="flex relative w-[1500px] h-32 bg-gray-0 items-center justify-center">
        <span className="font-heading text-9xl text-[#B1FA63]  absolute bottom-4">
          medium crawler
        </span>
      </div>
      <div
        ref={modalRef}
        className={`absolute top-56 w-[840px] h-[614px] flex-col rounded-[30px] border-8 border-[#142120] justify-center z-10 transition-opacity duration-300 ${
          showHelp
            ? "opacity-100 pointer-events-auto bg-[#B1FA63]"
            : "opacity-0 pointer-events-none"
        } `}
      >
        {showHelp && <HelpModal />}
        <SearchModal />
      </div>
      <div className="mt-10 w-[822px] h-[614px] grid grid-cols-4 gap-x-[20px] gap-y-[30px] items-center place-items-center place-content-center">
        {mediaItems.map((mediaItem, index) => (
          <Slot
            key={index}
            mediaItem={mediaItem}
            setMediaItem={(newMediaItem) => {
              setMediaItem(index, newMediaItem);
            }}
          />
        ))}
      </div>
      <div className="text-[#B1FA63] flex gap-2 absolute bottom-5 left-5">
        {/* Instruction Modal */}
        <div
          ref={helpButtonRef}
          className="font-heading flex justify-center items-center text-3xl rounded-full bg-[#142120] w-[50px] h-[50px] opacity-50 hover:opacity-100 duration-200"
          onClick={() => {
            setShowHelp(!showHelp);
            setPage(1);
          }}
          style={{ cursor: "pointer", opacity: showHelp && 1 }}
        >
          <span className="mb-1">?</span>
        </div>

        <div className="font-heading flex justify-center items-center text-3xl rounded-full bg-[#142120] w-[50px] h-[50px]">
          <span className="mb-1">
            <ChartNoAxesColumnDecreasing />
          </span>
        </div>

        <div className="font-heading flex justify-center items-center text-3xl rounded-full bg-[#142120] w-[50px] h-[50px]">
          <span className="mb-1">
            <Share />
          </span>
        </div>
      </div>
    </div>
  );
};
