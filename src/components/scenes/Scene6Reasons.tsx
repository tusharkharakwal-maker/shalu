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
    <div className="w-full h-full flex flex-col items-center justify-center p-6 py-10 overflow-y-auto">
      <div className="text-center mb-8">
        <PillTag>♡ A LITTLE BOUQUET</PillTag>
        <h2 className="text-3xl font-bold text-slate-800 mb-2 leading-tight">a bloom for every reason I adore you</h2>
        <p className="font-script text-2xl text-primary">picked just for you ♡</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 gap-4 w-full mb-10"
      >
        {reasons.map((reason, idx) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50 flex flex-col items-center text-center gap-3"
            >
              <div className={`p-3 rounded-full bg-white shadow-sm ${reason.color}`}>
                <Icon size={24} className="stroke-[2.5]" />
              </div>
              <p className="text-sm font-medium text-slate-700 leading-snug">{reason.text}</p>
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
    </div>
  );
}
