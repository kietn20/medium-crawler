import { Slot } from "./Slot";

export const EditModal = () => {
  return (
    <div
      // ref={modalRef}
      className={`absolute top-72 w-[700px] h-[470px] bg-[B1FA63] bg-[#151518]  flex-col rounded-[30px] border-8 border-lime-900 justify-center z-10 transition-opacity duration-300 font-heading text-[#151518] text-white ${
        true
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } `}
    >
      <div className="flex justify-start items-center w-full h-16 bg-pink-200 bg-opacity-0 px-7 text-3xl">
        Edit Media
      </div>
      <div className="flex px-7 justify-between">
        <div className="w-[250px] h-96 bg-orange-400 bg-opacity-0 flex justify-around items-center flex-col text-md">
          <Slot />
          <span className="px-4">
            Drag & Drop an image from the web (e.g. Google Images) or insert web
            image link into "Web Image URL" section
          </span>
        </div>
        <div className="flex-col justify-between items-center gap-5 w-[350px] h-96 bg-blue-300 bg-opacity-40">
          <div className="p-1 bg-pink-400 bg-opacity-40 h-80">
            <form action="/" className="flex-col">
              <div className="flex w-full bg-red-300 justify-between">
                <div className="flex-col w-56">
                  <label htmlFor="">Title*</label>
                  <input type="text" placeholder="Parasite" className="w-56" />
                </div>
                <div className="flex-col w-20">
                  <label htmlFor="">Rating</label>
                  <input type="text" placeholder="8.5" className="w-14" />
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-end items-center h-10 bg-white bg-opacity-40 p-1">
            save
          </div>
        </div>
      </div>
    </div>
  );
};
