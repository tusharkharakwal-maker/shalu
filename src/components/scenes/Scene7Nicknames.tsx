"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import { ScratchCard } from "@/components/ui/ScratchCard";

interface SceneProps {
  onNext: () => void;
}

const nicknames = [
  "Takli",
  "Chodu",
  "Chodu Mal",
  "Shakalaka Boom Boom"
];

export function Scene7Nicknames({ onNext }: SceneProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleReveal = () => {
    setRevealedCount(prev => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 py-10 overflow-y-auto">
      <div className="text-center mb-10">
        <PillTag>♡ ONLY YOU KNOW THESE</PillTag>
        <h2 className="text-3xl font-bold text-slate-800 mb-2 leading-tight">the names only I get to call you</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mb-10 aspect-square">
        {nicknames.map((nickname, idx) => (
          <ScratchCard key={idx} onScratchComplete={handleReveal} finishPercent={50}>
            <p className="font-script text-3xl font-bold text-primary leading-tight transform -rotate-6">
              {nickname}
            </p>
          </ScratchCard>
        ))}
      </div>

      <div className="h-16 flex items-center justify-center">
        <AnimatePresence>
          {revealedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CtaButton onClick={onNext}>One more thing</CtaButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
