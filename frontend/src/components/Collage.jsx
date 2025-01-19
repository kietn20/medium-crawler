import {
  BadgePlus,
  CaseLower,
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
import { ShareModal } from "./ShareModal";
import { useShareModalStore } from "../store/shareModalStore";
import { ManageListsModal } from "./ManageListsModal";
import html2canvas from 'html2canvas';

export const Collage = () => {
  const mediaLists = useMediaStore((state) => state.mediaLists);
  const currentMediaList = useMediaStore((state) => state.currentMediaList);
  const setCurrentMediaList = useMediaStore(
    (state) => state.setCurrentMediaList
  );
  const updateMediaListName = useMediaStore(
    (state) => state.updateMediaListName
  );
  const showHelp = useHelpModalStore((state) => state.showHelp);
  const setShowHelp = useHelpModalStore((state) => state.setShowHelp);
  const [showRanking, setShowRanking] = useState(false);
  const setPage = useHelpModalStore((state) => state.setPage);
  const showShareModal = useShareModalStore((state) => state.showShareModal);
  const setShowShareModal = useShareModalStore(
    (state) => state.setShowShareModal
  );
  const showManageListsModal = useMediaStore(
    (state) => state.showManageListsModal
  );
  const setShowManageListsModal = useMediaStore(
    (state) => state.setShowManageListsModal
  );
  const [showTitles, setShowTitles] = useState(false)

  const [mediaListTitle, setMediaListTitle] = useState(currentMediaList.name);
  const addMediaItem = useMediaStore((state) => state.addMediaItem);

  useEffect(() => {
    setMediaListTitle(currentMediaList.name);
  }, [currentMediaList]);

  useEffect(() => {
    const index = mediaLists.findIndex(
      (list) => list.name === currentMediaList.name
    );
    if (index !== -1) {
      updateMediaListName(index, mediaListTitle);
      setCurrentMediaList({ ...currentMediaList, name: mediaListTitle });
    }
  }, [mediaListTitle]);

  const dockElements = [
    {
      title: "Instructions",
      icon: (
        <CircleHelp
          onClick={() => {
            setShowHelp(!showHelp);
            setPage(1);
          }}
          className="h-full w-full dark:text-neutral-3001 text-[#8ac847] opacity-30 hover:opacity-100 duration-300"
        />
      ),
      href: "#",
    },
    {
      title: "Toggle Sorting",
      icon: (
        <ListOrdered
          onClick={() => setShowRanking(!showRanking)}
          className="h-full w-full dark:text-neutral-3001 text-[#8ac847] opacity-30 hover:opacity-100 duration-300"
        />
      ),
      href: "#",
    },
    {
      title: "Show Titles",
      icon: (
        <CaseLower
          onClick={() => setShowTitles(!showTitles)}
          className="h-full w-full dark:text-neutral-3001 text-[#8ac847] opacity-30 hover:opacity-100 duration-300"
        />
      ),
      href: "#",
    },
    {
      title: "Add Media",
      icon: (
        <BadgePlus
          onClick={() => addMediaItem()}
          className="h-full w-full dark:text-neutral-3001 text-[#8ac847] opacity-30 hover:opacity-100 duration-300"
        />
      ),
      href: "#",
    },
    {
      title: "Share",
      icon: (
        <Share
          onClick={() => { captureScreenshot(); }}
          className="h-full w-full dark:text-neutral-3001 text-[#8ac847] opacity-30 hover:opacity-100 duration-300"
        />
      ),
      href: "#",
    },
    {
      title: "Manage Lists",
      icon: (
        <ListFilterPlus
          onClick={() => setShowManageListsModal(!showManageListsModal)}
          className="h-full w-full dark:text-neutral-3001 text-[#8ac847] opacity-30 hover:opacity-100 duration-300"
        />
      ),
      href: "#",
    },
  ];

  const dockRef = useRef(null);

  const captureAndShare = async (action) => {
    const element = document.getElementById('collage-screenshot');
    if (!element) return;

    try {
      // Hide dock temporarily
      if (dockRef.current) {
        dockRef.current.style.display = 'none';
      }

      // Capture screenshot
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });

      // Restore dock
      if (dockRef.current) {
        dockRef.current.style.display = 'flex';
      }

      if (action === 'copy') {
        canvas.toBlob((blob) => {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
        });
      } else if (action === 'open') {
        const newTab = window.open();
        newTab.document.body.innerHTML = `<img src="${canvas.toDataURL()}" />`;
      }
    } catch (error) {
      console.error('Screenshot failed:', error);
    }
  };

  return (
    <div id="collage-screenshot" className="relative flex flex-col items-center justify-start w-[70%] h-screen overflow-auto bg-[#0A0B06] border border-red-500 bg-[#728623]">
      {/* <Navbar /> */}
      <div className="absolute font-heading z-50 text-lg">
        <Toaster />
      </div>
      <div className="flex relative group h-32 items-center justify-center mt-8">
        <input
          type="text"
          className="font-heading text-8xl text-[#B1FA63] bg-inherit text-center placeholder:text-[#B1FA63] w-[1200px] h-[120px] border-none pb-8"
          placeholder={currentMediaList.name}
          value={mediaListTitle}
          onClick={() => {
            setMediaListTitle("");
          }}
          onChange={(e) => setMediaListTitle(e.target.value)}
        />
        <PencilLine className="absolute left-32 w-24 h-24 text-gray-400 opacity-0 group-hover:opacity-10 duration-150" />
      </div>
      <HelpModal />
      <SearchModal />
      <EditModal />
      <ShareModal />
      <ManageListsModal />
      <div className="w-[80%] h-auto grid grid-cols-5 gap-x-[20px] gap-y-[20px] items-start place-items-center place-content-start py-10 ">
        {currentMediaList.items.map((mediaItem, index) => (
          <div key={index} className="relative flex flex-col justify-center items-center">

            <div className="relative">

              <Slot index={index} className="relative" />
              {showRanking && (
                <div className="absolute text-2xl text-[#444C48] -top-8 -left-8 w-[50px] h-[50px] bg-[#232f16] bg-opacity-100 font-heading text-center rounded-lg flex justify-center items-end z-10">
                  <span className="text-center mb-1">

                    &nbsp;{index + 1}.
                  </span>
                </div>
              )}
            </div>
            <span className={`text-sm font-heading text-white my-1 text-center ${showTitles ? 'opacity-100' : 'opacity-0'}`}>{currentMediaList.items[index].title}</span>
          </div>
        ))}
      </div>
      <div className="fixed bottom-20 right-10 flex flex-col gap-2">
        <button
          onClick={() => captureAndShare('copy')}
          className="p-3 rounded-lg bg-slate-500 text-white opacity-50 hover:opacity-100 hover:bg-[#8ac847] duration-300"
        >
          Copy Screenshot
        </button>
        <button
          onClick={() => captureAndShare('open')}
          className="p-3 rounded-lg bg-slate-500 text-white opacity-50 hover:opacity-100 hover:bg-[#8ac847] duration-300"
        >
          Open Screenshot
        </button>
      </div>
      <div className="absolute bottom-2 left-1/2 max-w-full -translate-x-1/2 opacity-30 hover:opacity-100 duration-300 z-50">
        <Dock className="items-end pb-1">
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