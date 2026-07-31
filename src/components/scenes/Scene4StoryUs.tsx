"use client";

import { motion, Variants } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import { WashiTape } from "@/components/ui/WashiTape";
import Image from "next/image";

interface SceneProps {
  onNext: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Scene4StoryUs({ onNext }: SceneProps) {
  return (
    <motion.div
      key="scene-4"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, x: -50 }}
      className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        variants={containerVariants}
        className="w-full flex flex-col items-center"
      >
        <motion.div variants={itemVariants}>
          <PillTag>THE US NOW</PillTag>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative w-full aspect-square rounded-full overflow-hidden shadow-md my-8 bg-purple-50 border-4 border-white"
        >
          <WashiTape color="pink" />
          <Image
            src="/media/scene4.jpg"
            alt="The Us Now"
            fill
            className="object-cover"
            sizes="(max-width: 430px) 100vw, 400px"
            unoptimized={true}
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs text-pink-300 -z-10 bg-pink-100">
            photo-03.jpg
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-slate-600 leading-relaxed mb-8">
          Choosing you, and having you choose me back, was officially the best decision I've ever made. 
        </motion.p>

        <motion.div variants={itemVariants}>
          <CtaButton onClick={onNext}>And then...</CtaButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
