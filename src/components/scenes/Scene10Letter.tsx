"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { RotateCcw, Flower2, Heart } from "lucide-react";
import Image from "next/image";

interface SceneProps {
  onNext: () => void;
}

function TypewriterLine({ text, delay }: { text: string; delay: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <p className="text-slate-700 leading-relaxed min-h-[1.5em]">{displayedText}</p>;
}

export function Scene10Letter({ onNext }: SceneProps) {
  const letterLines = [
    "I'm better with actions than with words, so I made you a little page instead — a song, our pictures, and a few things I mean with my whole heart.",
    "",
    "Thank you for being the calm in my chaos even though sometimes you shout like an elephant who lost it's mind lol. For the late-night talks, the terrible puns, and the way we get back together after all those silly fights.",
    "",
    "Thank you for being their with me whenever i need you and specially now when the times are probably hard for me. THANK YOU!!!",
    "",
    "I hope today feels soft and warm and completely yours. I hope you feel even a fraction of how much you're adored. and I hope you always know — even on the days I forget to say it — I choose you, every single time.",
    "",
    "I love you more than words can say.",
  ];

  return (
    <motion.div
      key="scene-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col items-center p-6 text-center overflow-y-auto no-scrollbar relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 mb-4"
      >
        <PillTag>A LETTER, JUST FOR YOU</PillTag>
        <h2 className="font-script text-4xl text-purple-600 mt-2">
          Dear Chodu Mal,
        </h2>
      </motion.div>

      {/* Top Divider */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full flex items-center justify-center gap-2 text-purple-300 mb-6 px-4"
      >
        <Flower2 size={14} />
        <div className="flex-1 border-t-2 border-dashed border-purple-200" />
        <Flower2 size={14} />
      </motion.div>

      <div className="text-left w-full px-2">
        {letterLines.map((line, idx) => (
          <TypewriterLine key={idx} text={line} delay={1 + idx * 2.5} />
        ))}
      </div>

      {/* Bottom Divider */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 14 }}
        className="w-full flex items-center justify-center gap-2 text-pink-300 mt-8 mb-6 px-4"
      >
        <Heart size={14} className="fill-pink-300" />
        <div className="flex-1 border-t-2 border-dashed border-purple-200" />
        <Flower2 size={14} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 14.5 }}
        className="text-left w-full pl-2 mb-10"
      >
        <p className="font-script text-2xl text-purple-600 mb-2">yours, completely,</p>
        <p className="text-xs font-bold tracking-widest text-purple-400 uppercase">— TUSHAR</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 15 }}
        onClick={onNext}
        className="flex items-center gap-2 text-purple-600 font-medium hover:text-pink-600 transition-colors bg-white/50 px-5 py-2.5 rounded-full shadow-sm border border-purple-100 mb-4"
      >
        <RotateCcw className="w-4 h-4" />
        Read it again
      </motion.button>
      
    </motion.div>
  );
}
