import { useShareModalStore } from "../store/shareModalStore";

export const ShareModal = () => {
  const showShareModal = useShareModalStore((state) => state.showShareModal);
  const setShowShareModal = useShareModalStore(
    (state) => state.setShowShareModal
  );
  return (
    <>
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-30"
          onClick={() => setShowShareModal(false)}
        ></div>
      )}
      <div
        className={`absolute top-4 w-[95%] m-10 h-[80%] bg-[#f0f1ea] flex flex-col rounded-[30px] border-8 border-lime-900 z-50 transition-opacity duration-300 items-center setShowShareModal p-2 font-heading ${
          showShareModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } `}
      >
        <span className="text-3xl">choose a sharing template</span>
        <div className="w-full h-full flex justify-between items-center">
          <div className="w-[33%] h-[80%] bg-[#0A0B06] rounded-xl p-5 flex flex-col items-center justify-start text-[#f0f1ea] overflow-hidden">
            <span className="text-2xl  text-[#B1FA63]">
              kat's 2024 favorite medias
            </span>
            <div className="flex flex-col items-center justify-center">
              <div className="w-[90%] h-[30%] flex justify-center items-center gap-5">
                <img
                  src="src/assets/media0.png"
                  alt="dune 2"
                  className="w-[35%] h-auto rounded-[20px]"
                />
                <p className="w-[50%] h-auto text-center">
                  My favorite film this year. Denis Villeneuve is a genius.
                </p>
              </div>
              <div className="w-[90%] h-[30%] flex justify-center items-center gap-5">
                <p className="w-[50%] h-auto text-center">
                  Perfect Blue is my first satoshi kon film. I love it. Excited
                  to see his other works.
                </p>
                <img
                  src="src/assets/media15.png"
                  alt="perfectblue"
                  className="w-[35%] h-auto rounded-[20px]"
                />
              </div>
              <div className="w-[90%] h-[30%] flex justify-center items-center gap-5">
                <img
                  src="src/assets/media18.png"
                  alt="dune 2"
                  className="w-[35%] h-auto rounded-[20px]"
                />
                <p className="w-[50%] h-auto text-center">
                  Shin godizlla was an epic film. The way it was portrayed was terrifying.
                </p>
              </div>
            </div>
          </div>
          <div className="w-[33%] h-[80%] bg-[#0A0B06] rounded-xl p-5 flex flex-col items-center justify-start text-[#B1FA63]">
            <span className="text-2xl">kat's 2024 favorite medias</span>
          </div>
          <div className="w-[33%] h-[80%] bg-[#0A0B06] rounded-xl p-5 flex flex-col items-center justify-start text-[#B1FA63]">
            <span className="text-2xl">kat's 2024 favorite medias</span>
          </div>
        </div>
      </div>
    </>
  );
};
