import { useEffect, useRef } from "react";
import { useSearchModalStore } from "../store/searchModal";

export const SearchModal = () => {
  const showSearchModal = useSearchModalStore((state) => state.showSearchModal);
  const setShowSearchModal = useSearchModalStore(
    (state) => state.setShowSearchModal
  );
  const modalRef = useRef(null);

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
      className={`absolute top-80 w-[700px] h-[400px] bg-[#0A0B06] flex-col rounded-[30px] border-8 border-[#142120] justify-center z-10 transition-opacity duration-300 ${
        showSearchModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } `}
    >
      <div>
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <div className="p-2 space-y-1">
                <div
                  className={`flex items-center p-1 rounded-md cursor-pointer transition-colors ${
                    selectedSuggestion === "calendar"
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => handleSuggestionClick("calendar")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </div>
                <div
                  className={`flex items-center p-1 rounded-md cursor-pointer transition-colors ${
                    selectedSuggestion === "emoji"
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => handleSuggestionClick("emoji")}
                >
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </div>
                <div
                  className={`flex items-center p-1  rounded-md cursor-not-allowed opacity-50`}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </div>
              </div>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};
