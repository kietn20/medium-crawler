import { ChartNoAxesColumnDecreasing, Share } from "lucide-react";
import { Navbar } from "./Navbar";
import { Slot } from "./Slot";
import { useEffect, useRef, useState } from "react";
import { useMediaStore } from "../store/mediaStore";
import { useHelpModalStore } from "../store/helpModalStore";
import { HelpModal } from "./HelpModal";
import { SearchModal } from "./SearchModal";
import { EditModal } from "./EditModal";
import { Toaster } from "react-hot-toast";

export const Collage = () => {
  // Help Modal State Store
  const showHelp = useHelpModalStore((state) => state.showHelp);
  const setShowHelp = useHelpModalStore((state) => state.setShowHelp);
  const page = useHelpModalStore((state) => state.page);
  const setPage = useHelpModalStore((state) => state.setPage);
  const helpButtonRef = useRef(null);
  const setHelpButtonRef = useHelpModalStore((state) => state.setHelpButtonRef);

  // Search Modal State Store

  const mediaItems = useMediaStore((state) => state.mediaItems);
  const setMediaItem = useMediaStore((state) => state.setMediaItem);

  useEffect(() => {
    setHelpButtonRef(helpButtonRef);
  }, [setHelpButtonRef]);

  return (
    <div className="relative flex flex-col items-center justify-start w-screen h-screen overflow-hidden bg-[#0A0B06]">
      <Navbar />
      <div className="font-heading z-20">
        <Toaster />
      </div>
      <div className="flex relative w-[1500px] h-32 bg-gray-0 items-center justify-center">
        <span className="font-heading text-9xl text-[#B1FA63]  absolute bottom-4">
          medium crawler
        </span>
      </div>
      <HelpModal />
      <SearchModal />
      <EditModal />
      <div className="mt-10 w-[822px] h-[614px] grid grid-cols-4 gap-x-[20px] gap-y-[30px] items-center place-items-center place-content-center">
        {mediaItems.map((mediaItem, index) => (
          <Slot key={index} index={index} />
        ))}
      </div>
      <div className="text-[#B1FA63] flex gap-2 absolute bottom-5 left-5">
        <div
          ref={helpButtonRef}
          className="font-heading flex justify-center items-center text-3xl rounded-full bg-[#142120] w-[50px] h-[50px] opacity-50 hover:opacity-100 duration-200"
          onClick={() => {
            setShowHelp(!showHelp);
            setPage(1);
          }}
          style={{ cursor: "pointer" }}
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
