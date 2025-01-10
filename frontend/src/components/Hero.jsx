import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen overflow-hidden bg-[#B1FA63] relative">
      <motion.div
        className="flex flex-col items-center absolute top-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.5 }}
      >
        <span className="font-heading text-[30px]">welcome to</span>
        <span className="font-heading text-9xl">medium crawler</span>
      </motion.div>
      <motion.img
        src="src/assets/hero.svg"
        alt="hero"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 50 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="absolute mt-20"
      />
    </div>
  );
};