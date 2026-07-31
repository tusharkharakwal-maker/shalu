"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import Image from "next/image";
import { ScratchCard } from "@/components/ui/ScratchCard";

interface SceneProps {
  onNext: () => void;
}

const reasons = [
  { image: "/cat1.png", text: "you feel like home" },
  { image: "/cat2.png", text: "your laugh is my favourite sound" },
  { image: "/cat3.png", text: "you make ordinary days magic" },
  { image: "/cat4.png", text: "you're my calm and my spark" },
  { image: "/cat5.png", text: "you make me want to be better" },
  { image: "/cat6.png", text: "it's you. it's always you." },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
};

export function Scene6Reasons({ onNext }: SceneProps) {
  const [scratched, setScratched] = useState<boolean[]>(Array(reasons.length).fill(false));

  const handleScratchComplete = (index: number) => {
    setScratched((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const handleScratchAll = () => {
    setScratched(Array(reasons.length).fill(true));
  };

  const allScratched = scratched.every(Boolean);

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar">
      <motion.div
        key="scene-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -50 }}
        className="min-h-full w-full flex flex-col items-center justify-center p-6 py-14 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PillTag>A LITTLE BOUQUET</PillTag>
          <h2 className="text-2xl font-bold text-indigo-950 mb-1">
            a bloom for every reason I adore you
          </h2>
          <div className="font-script text-2xl text-purple-500 mb-6">
            picked just for you ♡
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3 w-full max-w-[340px] mb-6"
        >
          {reasons.map((reason, index) => {
            const isScratched = scratched[index];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative bg-white rounded-2xl shadow-sm border border-purple-50 aspect-square hover:shadow-md transition-shadow overflow-hidden"
              >
                <ScratchCard
                  isRevealed={isScratched}
                  onScratchComplete={() => handleScratchComplete(index)}
                  finishPercent={40}
                  brushSize={25}
                >
                  {/* Reason content (Revealed) */}
                  <div className="flex flex-col items-center justify-center gap-2 p-2 w-full h-full bg-white">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <Image src={reason.image} alt="sticker" fill sizes="64px" className="object-contain drop-shadow-sm" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 leading-tight">
                      {reason.text}
                    </p>
                  </div>
                </ScratchCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Option to scratch all quickly */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-8 mb-4"
        >
          {!allScratched && (
            <button
              onClick={handleScratchAll}
              className="text-xs font-bold text-purple-500 hover:text-purple-600 active:scale-95 transition-all"
            >
              Reveal all at once ✨
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={allScratched ? { opacity: 1 } : { opacity: 0.3 }}
          className="transition-opacity duration-300"
        >
          <CtaButton onClick={onNext} disabled={!allScratched}>
            {allScratched ? "A little nickname corner" : "Scratch all to continue"}
          </CtaButton>
        </motion.div>
      </motion.div>
    </div>
  );
}


