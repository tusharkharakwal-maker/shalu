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

export function Scene3StoryStart({ onNext }: SceneProps) {
  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="min-h-full w-full flex flex-col items-center justify-center p-8 py-14 text-center"
      >
        <motion.div variants={itemVariants}>
          <PillTag>♡ ALL OUR ADVENTURES</PillTag>
        </motion.div>

        <motion.div variants={itemVariants} className="text-xs font-bold tracking-widest text-slate-400 mb-4">
          COUNTLESS MEMORIES
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-slate-800 mb-6 leading-tight">
          From coffee runs to all our random dates ☕
        </motion.h2>

        <motion.div variants={itemVariants} className="w-full aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg mb-6 bg-pink-50 border-4 border-white">
          <WashiTape color="purple" />
          <Image
            src="/media/photo-02.jpg"
            alt="Random dates"
            fill
            className="object-cover"
            sizes="(max-width: 430px) 100vw, 400px"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs text-pink-300 -z-10 bg-pink-100">
            photo-02.jpg
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-slate-600 leading-relaxed mb-8">
          Whether we're exploring new places or just doing absolutely nothing together, every single date with you is my new favorite memory. I wouldn't trade our random adventures for anything.
        </motion.p>

        <motion.div variants={itemVariants}>
          <CtaButton onClick={onNext}>Keep going</CtaButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
