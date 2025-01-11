import { ChartNoAxesColumnDecreasing } from "lucide-react";
import { Navbar } from "./Navbar";
import { Slot } from "./Slot";

export const Collage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen overflow-hidden bg-[#0A0B06]">
      <Navbar />
      <span className="font-heading text-9xl text-[#B1FA63]">
        medium crawler
      </span>
      <div className="mt-10 w-[822px] h-[614px] grid grid-cols-4 gap-x-[20px] gap-y-[30px]">
        {Array.from({ length: 8 }, (_, i) => (
          <Slot key={i} />
        ))}
      </div>
      <div className="text-[#B1FA63] flex ">
        <div className="font-heading flex justify-center items-center text-3xl rounded-full bg-[#142120] w-[50px] h-[50px]">
          <span className="mb-1">?</span>
        </div>
        <div className="font-heading flex justify-center items-center text-3xl rounded-full bg-[#142120] w-[50px] h-[50px]">
          <span className="mb-1">
            <ChartNoAxesColumnDecreasing />
          </span>
        </div>
        <div className="font-heading flex justify-center items-center text-3xl rounded-full bg-[#142120] w-[50px] h-[50px]">
          <span className="mb-1">?</span>
        </div>
      </div>
    </div>
  );
};
