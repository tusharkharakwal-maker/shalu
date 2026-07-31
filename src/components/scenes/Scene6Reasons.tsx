"use client";

import { motion, Variants } from "framer-motion";
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
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export function Scene6Reasons({ onNext }: SceneProps) {
  return (
    <motion.div
      key="scene-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
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
        className="grid grid-cols-2 gap-3 w-full max-w-[340px] mb-8"
      >
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-2xl p-4 shadow-sm border border-purple-50 flex flex-col items-center justify-center aspect-square gap-3 hover:shadow-md transition-shadow"
            >
              <div className={`p-2 rounded-full bg-pink-50 ${reason.color}`}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <p className="text-[11px] font-bold text-slate-700 leading-tight">
                {reason.text}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <CtaButton onClick={onNext}>A little nickname corner</CtaButton>
      </motion.div>
    </motion.div>
  );
}
