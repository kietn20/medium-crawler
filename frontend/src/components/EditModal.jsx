import { useEffect, useRef } from "react";
import { Slot } from "./Slot";
import { useEditModalStore } from "../store/editStore";

export const EditModal = () => {

  // Edit Modal State Store
  const showEditModal = useEditModalStore((state) => state.showEditModal);
  const setShowEditModal = useEditModalStore((state) => state.setShowEditModal);

  const editModalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (editModalRef.current && !editModalRef.current.contains(event.target)) {
      setShowEditModal(false);
    }
  };

  useEffect(() => {
    if (showEditModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditModal]);

  return (
    <div
      ref={editModalRef}
      className={`absolute top-72 w-[700px] h-[470px] bg-[B1FA63] bg-[#151518]  flex-col rounded-[30px] border-8 border-lime-900 justify-center z-10 transition-opacity duration-300 font-heading text-white ${
        showEditModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } `}
    >
      <div className="flex justify-start items-center w-full h-16 bg-pink-200 bg-opacity-0 px-7 text-3xl">
        Edit Media
      </div>
      <div className="flex px-7 justify-between">
        <div className="w-[250px] h-96 bg-orange-400 bg-opacity-0 flex justify-around items-center flex-col text-[14px]">
          <Slot />
          <span className="">
            Drag & Drop an image from the web (e.g. Google Images) or paste
            image link into web Web Image URL section
          </span>
        </div>
        <div className="flex-col justify-start items-start gap-5 w-[350px] h-96 bg-blue-300 bg-opacity-0">
          <div className="p-1 bg-pink-0 bg-opacity-40 h-80 text-xl">
            <form action="/" className="flex-col text">
              <div className="flex w-full justify-between items-center pb-2">
                <div className="flex-col w-56 justify-between items-center">
                  <label htmlFor="" className="p-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    placeholder="Parasite"
                    className="w-64 text-black"
                  />
                </div>
                <div className="flex-col w-20">
                  <label htmlFor="" className="p-1">
                    Rating
                  </label>
                  <input type="text" placeholder="8.5" className="w-20" />
                </div>
              </div>

              <label htmlFor="" className="p-1">
                Description / Review
              </label>
              <textarea
                name=""
                id=""
                placeholder="Enter description here..."
                className="w-full h-28"
              ></textarea>
              <label htmlFor="" className="p-1">
                Web Image URL
              </label>
              <input
                type="text"
                className="w-full"
                placeholder="https://www.imdb.com/title/tt6751668/"
              />
            </form>
          </div>
          <div className="flex justify-end gap-5 items-center h-10 p-1">
            <button
              className="w-32 bg-red-600 bg-opacity-50 hover:bg-opacity-100 duration-150 border rounded-[30px] p-2"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
            <button className="w-32 bg-[#B1FA63] bg-opacity-50 hover:bg-opacity-100 duration-150 border rounded-[30px] p-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
