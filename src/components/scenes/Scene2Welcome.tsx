"use client";

import { motion } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import Image from "next/image";

interface SceneProps {
  onNext: () => void;
}

export function Scene2Welcome({ onNext }: SceneProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <PillTag>♡ FOR MY FAVOURITE PERSON</PillTag>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-white shadow-xl my-6 bg-pink-50"
      >
        <Image
          src="/media/photo-01.jpg"
          alt="Us"
          fill
          className="object-cover"
          sizes="160px"
          onError={(e) => {
            // Fallback if image doesn't exist yet
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Placeholder text visible if image fails/missing */}
        <div className="absolute inset-0 flex items-center justify-center text-xs text-pink-300 -z-10 bg-pink-100">
          photo-01.jpg
        </div>
      </motion.div>

      <motion.h1 
        className="text-4xl font-bold text-slate-800 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Happy Girlfriend's Day
      </motion.h1>
      
      <motion.p 
        className="font-script text-2xl text-primary mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        for you, always ♡
      </motion.p>

      <motion.p 
        className="text-slate-600 leading-relaxed mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        Today is all about you. I built this tiny corner of the internet to say what I don't say often enough — that you make ordinary days feel like the good kind of story. Stay a while, my love.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <CtaButton onClick={onNext}>See our story</CtaButton>
      </motion.div>
    </div>
  );
}
