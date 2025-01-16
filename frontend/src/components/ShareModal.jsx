import { useShareModalStore } from "../store/shareModalStore";

const exampleMediaItems = [
  {
    title: "Dune 2",
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/6/1/7/4/4/3/617443-dune-part-two-0-2000-0-3000-crop.jpg",
  },
  {
    title: "Persona 3 Reload",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/6/65/Persona_3_Reload_box_art.jpg",
  },
  {
    title: "Look Back",
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/1/1/2/7/6/6/9/1127669-look-back-0-2000-0-3000-crop.jpg",
  },
  {
    title: "Perfect Blue",
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/4/6/1/7/5/46175-perfect-blue-0-2000-0-3000-crop.jpg",
  },
  {
    title: "Shogun",
    imageUrl: "https://i.ebayimg.com/images/g/5i4AAOSw3SdmVQ0l/s-l1200.jpg",
  },
  {
    title: "LongLegs",
    imageUrl:
      "https://a.ltrbxd.com/resized/film-poster/1/1/1/0/0/5/9/1110059-longlegs-0-2000-0-3000-crop.jpg",
  },
  {
    title: "Black Myth Wukong",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNGVmZTVjZDMtMzkyZi00MTczLWE4OTUtY2Y1ODBlMGFlYTAxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Shin Godzilla",
    imageUrl:
      "https://a.ltrbxd.com/resized/sm/upload/8g/5p/p4/6b/8YWirGQidtZeSEmhqvQM5FrI6N1-0-2000-0-3000-crop.jpg",
  },
];

export const ShareModal = () => {
  const showShareModal = useShareModalStore((state) => state.showShareModal);
  const setShowShareModal = useShareModalStore(
    (state) => state.setShowShareModal
  );

  const getSpreadPosition = (index) => {
    const spreadWidth = -50;
    const step = spreadWidth / (exampleMediaItems.length - 1);
    return (index - (exampleMediaItems.length - 1) / 2) * step;
  };
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
        <div className="w-full h-full flex justify-between items-start mt-5 ">
          {/* TEMPLATE 1: vertical */}
          <div className="w-[33%] h-[90%] flex flex-col items-center justify-center rounded-[20px] hover:bg-[#B1FA63] p-1 duration-200">
            <span className="text-xl">collage</span>
            <div className="bg-[#0A0B06] rounded-xl p-5 m-1 flex flex-col items-center justify-start text-[#f0f1ea] overflow-hidden gap-3">
              <span className="text-2xl  text-[#B1FA63]">
                kat's 2024 favorite medias
              </span>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[90%] h-auto grid grid-cols-4 gap-x-[15px] gap-y-[15px] items-center place-items-center place-content-between">
                  {exampleMediaItems.map((exampleMedia, index) => (
                    <div key={index} className="relative">
                      <img
                        src={exampleMedia.imageUrl}
                        alt={exampleMedia.title}
                        className="rounded-[10px] object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TEMPLATE 2: vertical */}
          <div className="w-[33%] h-[90%] flex flex-col items-center justify-start rounded-[20px] hover:bg-[#B1FA63] p-1 duration-200">
            <span className="text-xl">vertical</span>
            <div className="bg-[#0A0B06] rounded-xl p-5 m-1 flex flex-col items-center justify-start text-[#f0f1ea] overflow-hidden">
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
                    Perfect Blue is my first satoshi kon film. I love it.
                    Excited to see his other works.
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
                    Shin godizlla was an epic film. The way it was portrayed was
                    terrifying.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TEMPLATE 3: spread */}
          <div className="w-[33%] h-[90%] flex flex-col items-center justify-center rounded-[20px] hover:bg-[#B1FA63] p-1 duration-200">
            <span className="text-xl">spread</span>
            <div className="bg-[#0A0B06] rounded-xl px-2 py-4 m-1 flex flex-col items-center justify-start text-[#f0f1ea] overflow-hidden">
              <span className="text-2xl  text-[#B1FA63] mb-3">
                kat's 2024 favorite medias
              </span>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-[100%] h-auto overflow-hidden">
                  <div className=" flex items-center justify-center">
                    {exampleMediaItems.map((exampleMedia, index) => (
                      <div
                        key={exampleMedia.title}
                        className="w-full h-auto"
                        style={{
                          transform: `translateX(calc(${getSpreadPosition(
                            index
                          )}%)) rotate(-15deg)`,
                          zIndex: index,
                        }}
                      >
                        <img
                          src={exampleMedia.imageUrl}
                          alt={exampleMedia.title}
                          className="object-cover w-full h-full shadow-lg rounded-[10px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
