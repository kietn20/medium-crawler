import {
  ChartNoAxesColumnDecreasing,
  CircleHelp,
  ListFilterPlus,
  ListOrdered,
  PencilLine,
  Share,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Slot } from "./Slot";
import { useEffect, useRef, useState } from "react";
import { useMediaStore } from "../store/mediaStore";
import { useHelpModalStore } from "../store/helpModalStore";
import { HelpModal } from "./HelpModal";
import { SearchModal } from "./SearchModal";
import { EditModal } from "./EditModal";
import { Toaster } from "react-hot-toast";
import { Dock, DockIcon, DockItem, DockLabel } from "./UI/Dock";

export const Collage = () => {
  const mediaItems = useMediaStore((state) => state.mediaItems);
  const showHelp = useHelpModalStore((state) => state.showHelp);
  const setShowHelp = useHelpModalStore((state) => state.setShowHelp);
  const [showRanking, setShowRanking] = useState(false);

  const dockElements = [
    {
      title: "Instructions",
      icon: (
        <CircleHelp
          onClick={() => {
            setShowHelp(!showHelp);
            setPage(1);
          }}
          className="h-full w-full text-neutral-600 dark:text-neutral-3001 text-[#8ac847]"
        />
      ),
      href: "#",
    },
    {
      title: "Toggle Sorting",
      icon: (
        <ListOrdered
          onClick={() => {
            setShowRanking(!showRanking);
            console.log("showRanking", showRanking);
          }}
          className="h-full w-full text-neutral-600 dark:text-neutral-3001 text-[#8ac847]"
        />
      ),
      href: "#",
    },
    {
      title: "Share Collage",
      icon: (
        <Share className="h-full w-full text-neutral-600 dark:text-neutral-3001 text-[#8ac847]" />
      ),
      href: "#",
    },
    {
      title: "Manage Media Lists",
      icon: (
        <ListFilterPlus className="h-full w-full text-neutral-600 dark:text-neutral-3001 text-[#8ac847]" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-start w-screen h-screen overflow-hidden bg-[#0A0B06]">
      <Navbar />
      <div className="absolute font-heading z-20 text-lg">
        <Toaster />
      </div>
      <div className="flex relative group h-32 items-center justify-center">
        <input
          type="text"
          className="font-heading text-8xl text-[#B1FA63] bg-inherit text-center placeholder:text-[#B1FA63] w-[1200px] h-[120px] border-none pb-8"
          placeholder="medium crawler"
        />
        <PencilLine className="absolute left-32 w-24 h-24 text-gray-400 opacity-0 group-hover:opacity-10 duration-150" />
      </div>
      <HelpModal />
      <SearchModal />
      <EditModal />
      <div className="mt-10 w-[822px] h-[614px] grid grid-cols-4 gap-x-[20px] gap-y-[30px] items-center place-items-center place-content-center">
        {mediaItems.map((mediaItem, index) => (
          <div key={index} className="relative">
            {showRanking && mediaItem && (
              <div className="absolute text-3xl text-[#444C48] -bottom-7 -left-7 w-[50px] h-[50px] bg-white font-heading text-center rounded-lg flex justify-center items-end z-10">
                &nbsp;{index + 1}.
              </div>
            )}
            <Slot index={index} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-1/2 max-w-full -translate-x-1/2 opacity-30 hover:opacity-100 duration-300">
        <Dock className="items-end pb-3">
          {dockElements.map((item, idx) => (
            <DockItem
              key={idx}
              className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 "
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    </div>
  );
};
