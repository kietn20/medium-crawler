import { Navbar } from "./Navbar";


export const Collage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen overflow-hidden bg-[#0A0B06]">
        <Navbar />
      <span className="font-heading text-[30px]">welcome to</span>
      <span className="font-heading text-9xl">medium crawler</span>
    </div>
  );
};
