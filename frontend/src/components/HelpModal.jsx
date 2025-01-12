import { useHelpModalStore } from "../store/helpModalStore";

export const HelpModal = () => {
    const page = useHelpModalStore((state) => state.page);
    
  return (
    <div>
      {page == 1 ? (
        <span className="font-heading text-4xl mt-3 flex justify-center items-center p-7">
          What is medium crawler?
        </span>
      ) : (
        <span className="font-heading text-4xl mt-3 flex justify-center items-center p-7">
          How does medium crawler work?
        </span>
      )}
      {page == 1 ? (
        <div className="flex justify-center gap-5 relative">
          <div className="w-[400px] h-[400px] bg-gray-400 rounded-[30px] flex justify-center items-center font-heading text-white">
            insert gif here
          </div>
          <div className="w-[315px] h-[400px]">
            <span className="font-heading text-[20px]">
              Medium Crawler is a creative tool that allows you to curate and
              display your yearly watchlists in a stunning collage format. Use
              our intuitive platform to add media from popular sources or input
              your own.
              <br />
              <br />
              Discover, showcase, and share your favorite media with friends and
              the community. Whether it's movies, books, TV shows, anime, manga,
              or games, we’ve got you covered!
            </span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-5 relative font-heading">
          <div>
            <p className="text-2xl">
              1. Start a Watchlist
              <br />
              <span className="text-xl">
                &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Create a watchlist to showcase
                your favorite media
              </span>
              <br />
              <span className="text-xl">
                &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Add items by searching from
                integrated APIs or manually inputting details
              </span>
              <br />
              2. Customize Your Collage
              <br />
              <span className="text-xl">
                &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Drag, drop, and rearrange items
                to your liking
              </span>
              <br />
              <span className="text-xl">
                &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Toggle between ranked and
                unranked modes for a personalized look
              </span>
              <br />
              3. Save and Share
              <br />
              <span className="text-xl">
                &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Finalize your watchlist and
                share it as a beautiful
              </span>
              <br />
              <span className="text-xl">
                &nbsp;&nbsp;&#8226;&nbsp;&nbsp; Post your creation on social
                media or send it directly to friends
              </span>
              <br />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
