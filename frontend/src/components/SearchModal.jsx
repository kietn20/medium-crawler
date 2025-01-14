import { useEffect, useRef, useState } from "react";
import { useSearchModalStore } from "../store/searchModal";
import {
  Film,
  BadgeJapaneseYen,
  Gamepad2,
  BookMarked,
  BadgePlus,
  Search,
} from "lucide-react";
import { useMediaStore } from "../store/mediaStore";
import axios from "axios";

export const SearchModal = () => {
  // Search Modal State Store
  const showSearchModal = useSearchModalStore((state) => state.showSearchModal);
  const setShowSearchModal = useSearchModalStore(
    (state) => state.setShowSearchModal
  );
  const searchModalRef = useRef(null);

  // Media Item State Store
  const setMediaItem = useMediaStore((state) => state.setMediaItem);
  const currentEditIndex = useSearchModalStore(
    (state) => state.slotIndexClicked
  );

  // Local states
  const [selectedSuggestion, setSelectedSuggestion] =
    useState("Movie & TV Show");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchBarRef = useRef(null);

  const handleSuggestionClick = (option) => {
    setSelectedSuggestion(option);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;

    const typeMap = {
      "Movie & TV Show": "movie",
      "Anime & Manga": "anime",
      "Video Game": "game",
      Book: "book",
    };

    const type = typeMap[selectedSuggestion];

    try {
      const response = await axios.post("/api/media-search", {
        query: searchQuery,
        type: type,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching media:", error);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      if (searchQuery.trim() === "") return;

      const typeMap = {
        "Movie & TV Show": "movie",
        "Anime & Manga": "anime",
        "Video Game": "game",
        Book: "book",
      };

      const type = typeMap[selectedSuggestion];

      try {
        const response = await axios.post("/api/media-search", {
          query: searchQuery,
          type: type,
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching media:", error);
      }
    }
  };

  const handleMediaSelect = (media) => {
    setMediaItem(currentEditIndex, {
      title: media.title,
      imageUrl: media.posterPath,
      description: media.description,
      releaseDate: media.releaseDate,
    });
    setShowSearchModal(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  useEffect(() => {
    if (showSearchModal && searchBarRef.current) {
      setTimeout(() => {
        searchBarRef.current.focus();
      }, 50);
    }
  }, [showSearchModal]);

  return (
    <>
      {showSearchModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setShowSearchModal(false)}
        ></div>
      )}
      <div
        ref={searchModalRef}
        className={`fixed top-80 left-1/2 transform -translate-x-1/2 w-[800px] flex-col justify-center z-20 transition-opacity duration-300 shadow-md md:min-w-[450px] bg-white rounded-xl font-heading ${
          showSearchModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } `}
      >
        <div className="relative rounded-xl flex justify-between items-center">
          <input
            ref={searchBarRef}
            type="text"
            className="w-full px-4 py-3 text-base outline-none border-b rounded-xl"
            placeholder="Type in the title of media to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="p-2 m-1 rounded-2xl hover:bg-[#B1FA63] duration-200"
            onClick={handleSearch}
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {searchResults.map((media) => (
            <div
              key={media.title + media.releaseDate}
              className="flex items-center p-2 cursor-pointer hover:bg-[#B1FA63] hover:bg-opacity-50"
              onClick={() => handleMediaSelect(media)}
            >
              <img
                src={media.posterPath}
                alt={media.title}
                className="w-12 h-16 mr-4"
              />
              <div>
                <div className="font-bold">{media.title}</div>
                <div className="text-sm text-gray-500">{media.releaseDate}</div>
              </div>
            </div>
          ))}
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
    </>
  );
};
