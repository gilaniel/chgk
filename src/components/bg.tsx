import { motion } from "framer-motion";

export const Bg = () => {
  return (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      src="/bg.png"
      className="fixed top-0 left-0 size-full object-cover object-center blur-[5px]"
    />
  );
};
