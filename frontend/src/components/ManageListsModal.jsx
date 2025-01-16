import { useMediaStore } from "../store/mediaStore";

export const ManageListsModal = () => {
  const showManageListsModal = useMediaStore(
    (state) => state.showManageListsModal
  );
  const setShowManageListsModal = useMediaStore(
    (state) => state.setShowManageListsModal
  );

  return (
    <>
      {showManageListsModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-30"
          onClick={() => setShowManageListsModal(false)}
        ></div>
      )}
      <div
        className={`absolute top-56 w-[680px] h-auto bg-[#1E2528] flex flex-col justify-between items-center gap-5 rounded-[30px] z-50 transition-opacity duration-300 font-heading px-2 py-5 drop-shadow-2xl ${
          showManageListsModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } `}
      >
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl text-white mb-5">my media lists</span>
          <div className="flex flex-col items-center justify-start gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                //  insert logic for current media list showing
                key={index}
                className="flex justify-between items-center w-[615px] h-[85px] bg-[#B1FA63] px-10 rounded-[30px] text-black drop-shadow-2xl"
              >
                <span className="text-3xl">List {index + 1}</span>
                <div className="p-2 bg-red-600 bg-opacity-0 hover:bg-opacity-100 rounded-[20px] duration-300 group drop-shadow-2xl">
                  <button className="text-2xl text-white opacity-50 group-hover:opacity-100 duration-300">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center w-[615px] h-[85px] bg-[#B1FA63] border-2 border-black px-10 rounded-[30px] text-black opacity-50 hover:opacity-100 duration-300">
          <span className="text-3xl">Create new list</span>
        </div>
      </div>
    </>
  );
};
