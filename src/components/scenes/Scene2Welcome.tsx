"use client";

import { motion } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import Image from "next/image";

interface SceneProps {
  onNext: () => void;
}

export function Scene2Welcome({ onNext }: SceneProps) {
  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar">
      <motion.div
        key="scene-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        className="min-h-full w-full flex flex-col items-center justify-center p-6 py-14 text-center"
      >
        <div className="w-24 h-24 mb-6 relative rounded-full p-1 bg-gradient-to-tr from-pink-300 to-purple-300 shadow-lg shadow-purple-200">
          <div className="w-full h-full relative rounded-full overflow-hidden border-2 border-white bg-pink-50">
            <Image
              src="/media/photo-01.jpg"
              alt="Us"
              fill
              className="object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PillTag>FOR MY FAVOURITE CHODU</PillTag>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-3xl font-bold text-indigo-950 mb-1"
        >
          Happy Girlfriend's Day
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="font-script text-3xl text-purple-500 mb-6"
        >
          love you, always ♡
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-[13px] leading-relaxed text-indigo-900/80 mb-6 max-w-[280px]"
        >
          Today is all about you. I built this tiny corner of the internet to say what I don't say often enough — that you make ordinary days feel special and worth living for. Just go through, my love.
        </motion.p>

        <MusicPlayer />

        {/* Decorative Stickers (placeholders) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex gap-4 justify-center items-center mb-10 mt-2"
        >
          <div className="w-16 h-16 bg-white rounded-xl shadow-sm rotate-[-6deg] p-1 border border-purple-50">
            <div className="w-full h-full bg-pink-100 rounded-lg"></div>
          </div>
          <div className="w-16 h-16 bg-white rounded-xl shadow-sm p-1 border border-purple-50">
            <div className="w-full h-full bg-pink-100 rounded-lg"></div>
          </div>
          <div className="w-16 h-16 bg-white rounded-xl shadow-sm rotate-[6deg] p-1 border border-purple-50">
            <div className="w-full h-full bg-pink-100 rounded-lg"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-auto"
        >
          <CtaButton onClick={onNext}>
            SEE OUR LITTLE ALBUM
          </CtaButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
