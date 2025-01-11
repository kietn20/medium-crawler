import { ChartNoAxesColumnDecreasing, Share } from "lucide-react";
import { Navbar } from "./Navbar";
import { Slot } from "./Slot";
import { useEffect, useRef, useState } from "react";

export const Collage = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [page, setPage] = useState(1);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
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
        className={`absolute top-56 w-[840px] h-[614px] bg-[#B1FA63] flex-col rounded-[30px] border-8 border-[#142120] justify-center z-10 transition-opacity duration-300 ${
          showHelp
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {page == 1 ? (
          <span className="font-heading text-4xl mt-3 flex justify-center items-center p-7">
            What is medium crawler?
          </span>
        ) : (
          <span className="font-heading text-4xl mt-3 flex justify-center items-center p-7">
            How does medium crawler work?
          </span>
        )}
        {page == 1 ? (
          <div className="flex justify-center gap-5 relative">
            <div className="w-[400px] h-[400px] bg-gray-400 rounded-[30px] flex justify-center items-center font-heading text-white">
              insert gif here
            </div>
            <div className="w-[315px] h-[400px]">
              <span className="font-heading text-[20px]">
                Medium Crawler is a creative tool that allows you to curate and
                display your yearly watchlists in a stunning collage format. Use
                our intuitive platform to add media from popular sources or
                input your own.
                <br />
                <br />
                Discover, showcase, and share your favorite media with friends
                and the community. Whether it's movies, books, TV shows, anime,
                manga, or games, we’ve got you covered!
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5 relative font-heading">
            <div>
              <p className="text-2xl">
                1. Start a Watchlist
                <br />
                <span className="text-xl">
                  &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Create a watchlist to showcase
                  your favorite media
                </span>
                <br />
                <span className="text-xl">
                  &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Add items by searching from
                  integrated APIs or manually inputting details
                </span>
                <br />
                2. Customize Your Collage
                <br />
                <span className="text-xl">
                  &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Drag, drop, and rearrange
                  items to your liking
                </span>
                <br />
                <span className="text-xl">
                  &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Toggle between ranked and
                  unranked modes for a personalized look
                </span>
                <br />
                3. Save and Share
                <br />
                <span className="text-xl">
                  &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Finalize your watchlist and
                  share it as a beautiful
                </span>
                <br />
                <span className="text-xl">
                  &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Post your creation on social
                  media or send it directly to friends
                </span>
                <br />
              </p>
            </div>
          </div>
        )}
        <div className="w-full flex justify-end items-start absolute bottom-2 right-0">
          <span className="font-heading text-2xl mr-5">
            <span
              className="cursor-pointer text-3xl"
              onClick={() => {
                if (page == 2) {
                  setPage(1);
                }
              }}
            >
              &lt;&nbsp;
            </span>
            <span>{page} / 2</span>
            <span
              className="cursor-pointer text-3xl"
              onClick={() => {
                if (page == 1) {
                  setPage(2);
                }
              }}
            >
              &nbsp;&gt;
            </span>
          </span>
        </div>
      </div>
      <div className="mt-10 w-[822px] h-[614px] grid grid-cols-4 gap-x-[20px] gap-y-[30px] items-center place-items-center place-content-center">
        {Array.from({ length: 8 }, (_, i) => (
          <Slot key={i} />
        ))}
      </div>
      <div className="text-[#B1FA63] flex gap-2 absolute bottom-5 left-5">
        {/* Instruction Modal */}
        <div
          className="font-heading flex justify-center items-center text-3xl rounded-full bg-[#142120] w-[50px] h-[50px] opacity-50 hover:opacity-100 duration-200"
          onClick={() => {
            setPage(1);
            setShowHelp(!showHelp);
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
