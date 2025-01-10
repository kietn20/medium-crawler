"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const displayMedia = [
  {
    image: "src/assets/media0.png",
    url: "https://letterboxd.com/film/dune-part-two/",
  },
  {
    image: "src/assets/media16.png",
    url: "https://store.steampowered.com/app/2161700/Persona_3_Reload/",
  },
  {
    image: "src/assets/media2.png",
    url: "https://letterboxd.com/film/look-back-2024/",
  },
  {
    image: "src/assets/media15.png",
    url: "https://letterboxd.com/film/perfect-blue/",
  },
  {
    image: "src/assets/media14.png",
    url: "https://letterboxd.com/film/shogun-2024/",
  },
  {
    image: "src/assets/media12.png",
    url: "https://letterboxd.com/film/longlegs/",
  },
  {
    image: "src/assets/media17.png",
    url: "https://store.steampowered.com/app/2358720/Black_Myth_Wukong/",
  },
  {
    image: "src/assets/media7.png",
    url: "https://letterboxd.com/film/godzilla-minus-one/",
  },
];

export default function ImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpread, setIsSpread] = useState(false); // State to spread images
  const [setshowArrow, setSetshowArrow] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const animationDuration = 0.5;

  useEffect(() => {
    if (currentIndex < displayMedia.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, animationDuration + 500); // Add 500ms delay between animations
      return () => clearTimeout(timer);
    } else {
      const spreadTimer = setTimeout(() => {
        setIsSpread(true);

        // Show arrow after spreading
        const arrowTimer = setTimeout(() => {
          setSetshowArrow(true);
        }, animationDuration * 1000 + 10000); // Add 500ms delay after spreading
        return () => clearTimeout(arrowTimer);
      }, animationDuration + 1000); // Add 1s delay before spreading
      return () => clearTimeout(spreadTimer);
    }
  }, [currentIndex, animationDuration]);

  const getSpreadPosition = (index) => {
    if (!isSpread) return 0;
    const totalImages = displayMedia.length;
    const spreadWidth = 550; // percentage of container width to spread across
    const step = spreadWidth / (totalImages - 1);
    return (index - (totalImages - 1) / 2) * step;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {displayMedia.slice(0, currentIndex + 1).map((item, index) => (
            <motion.div
              key={index}
              className="absolute w-64 h-96"
              initial={{
                scale: 0.3,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                scale: hoveredIndex === index && isSpread ? 1.2 : 1,
                opacity: 1,
                rotate: isSpread
                  ? hoveredIndex === index
                    ? 0
                    : -15
                  : (index - (displayMedia.length - 1) / 2) * 5,
                x: `calc(${getSpreadPosition(index)}% - 32px)`, // Subtracting half the width of the image
                x: `${getSpreadPosition(index)}%`,
                y: isSpread && hoveredIndex === index ? "-5%" : "0%",
                zIndex: isSpread && hoveredIndex === index ? 10 : 1,
              }}
              transition={{
                duration: animationDuration / 1000,
                ease: [0.32, 0.72, 0, 1], // Custom easing for warping effect
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              onMouseEnter={() => isSpread && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-64 h-96">
                <img
                  src={item.image}
                  alt={`Poster ${index + 1}`}
                  className="object-cover w-full h-full rounded-3xl shadow-lg"
                  style={{ width: "100%", height: "100%" }}
                  loading={index === 0 ? "eager" : "lazy"}
                  onClick={() => window.open(item.url, "_blank")}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {setshowArrow && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 flex justify-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="src/assets/arrow-down 1.png"
                alt="arrowdown"
                className="h-32 animate-bounce opacity-40"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
