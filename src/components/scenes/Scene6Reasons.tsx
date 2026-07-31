"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import { Heart, Sparkles, Home, Star, Smile, Flame } from "lucide-react";

interface SceneProps {
  onNext: () => void;
}

const reasons = [
  { icon: Home, text: "you feel like home", color: "text-rose-400" },
  { icon: Smile, text: "your laugh is my favourite sound", color: "text-amber-400" },
  { icon: Sparkles, text: "you make ordinary days magic", color: "text-purple-400" },
  { icon: Flame, text: "you're my calm and my spark", color: "text-orange-400" },
  { icon: Star, text: "you make me want to be better", color: "text-blue-400" },
  { icon: Heart, text: "it's you. it's always you.", color: "text-pink-500" },
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

  const handleScratch = (index: number) => {
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
            const Icon = reason.icon;
            const isScratched = scratched[index];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                onClick={() => !isScratched && handleScratch(index)}
                className="relative bg-white rounded-2xl shadow-sm border border-purple-50 flex flex-col items-center justify-center aspect-square gap-3 hover:shadow-md transition-shadow cursor-pointer overflow-hidden select-none"
              >
                {/* Reason content (Revealed) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={isScratched ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                  transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.1 }}
                  className="flex flex-col items-center justify-center gap-3 p-4 w-full h-full"
                >
                  <div className={`p-2 rounded-full bg-pink-50 ${reason.color}`}>
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                  <p className="text-[11px] font-bold text-slate-700 leading-tight">
                    {reason.text}
                  </p>
                </motion.div>

                {/* Scratchable silver/pink cover overlay */}
                <AnimatePresence>
                  {!isScratched && (
                    <motion.div
                      key="cover"
                      initial={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 1.15,
                        rotate: index % 2 === 0 ? 5 : -5,
                        filter: "blur(4px)",
                        transition: { duration: 0.35, ease: "easeInOut" }
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-pink-400 flex flex-col items-center justify-center z-10 p-4"
                    >
                      {/* Scratch ticket diagonal stripes texture */}
                      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,rgba(255,255,255,0.4)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_75%,transparent_75%,transparent)] bg-[length:16px_16px]" />
                      
                      <motion.div 
                        className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1 shadow-inner z-20"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      >
                        <Heart className="text-white fill-white" size={14} />
                      </motion.div>
                      <span className="text-[9px] text-white font-extrabold tracking-widest uppercase z-20">
                        Scratch ♡
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
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

