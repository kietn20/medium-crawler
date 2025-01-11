import { ChartNoAxesColumnDecreasing, Share } from "lucide-react";
import { Navbar } from "./Navbar";
import { Slot } from "./Slot";
import { useState } from "react";

export const Collage = () => {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <div className="relative flex flex-col items-center justify-start w-screen h-screen overflow-hidden bg-[#0A0B06]">
      <Navbar />
      <div className="flex relative w-[1500px] h-32 bg-gray-0 items-center justify-center">
        <span className="font-heading text-9xl text-[#B1FA63]  absolute bottom-4">
          medium crawler
        </span>
      </div>
      {showHelp &&
        <div className="absolute top-56 w-[830px] h-[614px] bg-[#B1FA63] flex-col rounded-[30px] border-8 border-[#142120] justify-center z-10 duration-150">
          <span className="font-heading text-4xl mt-3 flex justify-center items-center p-7">
            What is medium crawler?
          </span>
          {/* <span className="font-heading text-4xl mt-3 flex justify-center items-center p-7">
          How does medium crawler work?
          </span> */}
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
          <div className="w-full flex justify-end items-start">
            <span className="font-heading text-2xl mr-5">
              &lt; <span>1/2</span> &gt;
            </span>
          </div>
        </div>
      }
      <div className="mt-10 w-[822px] h-[614px] grid grid-cols-4 gap-x-[20px] gap-y-[30px]">
        {Array.from({ length: 8 }, (_, i) => (
          <Slot key={i} />
        ))}
      </div>
      <div className="text-[#B1FA63] flex gap-2 absolute bottom-5 left-5">
        {/* Instruction Modal */}
        <div
          className="font-heading flex justify-center items-center text-3xl rounded-full bg-[#142120] w-[50px] h-[50px] opacity-50 hover:opacity-100 duration-300"
          onClick={() => setShowHelp(!showHelp)}
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
