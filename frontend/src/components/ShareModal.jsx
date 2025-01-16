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
        className={`absolute top-0 w-[95%] m-10 h-[80%] bg-[#f0f1ea] flex flex-col rounded-[30px] border-8 border-lime-900 z-50 transition-opacity duration-300 items-center setShowShareModal p-5 font-heading ${
          showShareModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } `}
      >
        <span className="text-3xl">choose a sharing template</span>
        <div className="w-full h-full flex justify-between items-center">
          <div className="w-[33%] h-[80%] bg-[#0A0B06] rounded-xl"> dog</div>
          <div className="w-[33%] h-[80%] bg-[#0A0B06] rounded-xl"> dog</div>
          <div className="w-[33%] h-[80%] bg-[#0A0B06] rounded-xl"> dog</div>
        </div>
      </div>
    </>
  );
};
