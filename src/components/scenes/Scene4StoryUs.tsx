"use client";

import { motion, Variants } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
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
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center overflow-y-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col items-center"
      >
        <motion.div variants={itemVariants}>
          <PillTag>♡ THE DAY WE BECAME US</PillTag>
        </motion.div>

        <motion.div variants={itemVariants} className="text-xs font-bold tracking-widest text-slate-400 mb-4">
          16 . 01 . 2026
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-slate-800 mb-6 leading-tight">
          The day we stopped being 'just friends who watch movies together'
        </motion.h2>

        <motion.div variants={itemVariants} className="w-full aspect-square relative rounded-xl overflow-hidden shadow-lg mb-6 bg-pink-50">
          <Image
            src="/media/photo-03.jpg"
            alt="Becoming us"
            fill
            className="object-cover"
            sizes="(max-width: 430px) 100vw, 400px"
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
          <CtaButton onClick={onNext}>Our moments</CtaButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
