import { useEffect, useRef, useState } from "react";
import { useSearchModalStore } from "../store/searchModal";
import {
  Film,
  Settings,
  User,
  BadgeJapaneseYen,
  Gamepad2,
  BookMarked,
  BadgePlus,
} from "lucide-react";

export const SearchModal = () => {
  // Search Modal State Store
  const showSearchModal = useSearchModalStore((state) => state.showSearchModal);
  const setShowSearchModal = useSearchModalStore(
    (state) => state.setShowSearchModal
  );
  const modalRef = useRef(null);

  // Local states
  const [selectedSuggestion, setSelectedSuggestion] =
    useState("Movie & TV Show");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSuggestionClick = (option) => {
    setSelectedSuggestion(option);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowSearchModal(false);
    }
  };

  useEffect(() => {
    if (showSearchModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchModal]);

  return (
    <div
      ref={modalRef}
      className={`absolute top-80 w-[700px] flex-col justify-center z-10 transition-opacity duration-300 shadow-md md:min-w-[450px] bg-white rounded-xl ${
        showSearchModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } `}
    >
      <div className="relative rounded-xl">
        <input
          type="text"
          className="w-full px-4 py-3 text-sm outline-none border-b rounded-xl"
          placeholder="Type in the title of media to search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {searchQuery &&
          ![
            "Movie & TV Show",
            "Anime & Manga",
            "Video Game",
            "Book",
            "Add Media",
          ].some((item) =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          ) && <p className="p-4 text-sm text-gray-500">No results found.</p>}
        <div className="p-2">
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-600">
            Choose a type of media
          </div>
          <div className="space-y-1">
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                selectedSuggestion === "Movie & TV Show"
                  ? "bg-[#B1FA63]"
                  : "hover:bg-[#B1FA63] hover:bg-opacity-50"
              }`}
              onClick={() => handleSuggestionClick("Movie & TV Show")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSuggestionClick("Movie & TV Show");
                }
              }}
            >
              <Film className="mr-2 h-4 w-4" />
              <span>Movie & TV Show</span>
            </div>
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                selectedSuggestion === "Anime & Manga"
                  ? "bg-[#B1FA63]"
                  : "hover:bg-[#B1FA63] hover:bg-opacity-50"
              }`}
              onClick={() => handleSuggestionClick("Anime & Manga")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSuggestionClick("Anime & Manga");
                }
              }}
            >
              <BadgeJapaneseYen className="mr-2 h-4 w-4" />
              <span>Anime & Manga</span>
            </div>
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                selectedSuggestion === "Video Game"
                  ? "bg-[#B1FA63]"
                  : "hover:bg-[#B1FA63] hover:bg-opacity-50"
              }`}
              onClick={() => handleSuggestionClick("Video Game")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSuggestionClick("Video Game");
                }
              }}
            >
              <Gamepad2 className="mr-2 h-4 w-4" />
              <span>Video Game</span>
            </div>
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                selectedSuggestion === "Book"
                  ? "bg-[#B1FA63]"
                  : "hover:bg-[#B1FA63] hover:bg-opacity-50"
              }`}
              onClick={() => handleSuggestionClick("Book")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSuggestionClick("Book");
                }
              }}
            >
              <BookMarked className="mr-2 h-4 w-4" />
              <span>Books</span>
            </div>
          </div>
        </div>
        <div className="h-px bg-gray-200 mx-2" />
        <div className="p-2">
          <div className="px-2 py-1.5 text-xs font-semibold text-gray-600">
            Manually add media item
          </div>
          <div className="space-y-1">
            <div
              className="flex items-center p-2 rounded-md cursor-pointer hover:bg-[#B1FA63]"
              role="button"
              tabIndex={0}
            >
              <BadgePlus className="mr-2 h-4 w-4" />
              <span>Add Media</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
