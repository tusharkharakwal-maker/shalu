"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { RotateCcw } from "lucide-react";
import Image from "next/image";

interface SceneProps {
  onNext: () => void;
}

const letterText = `I'm not always great with words, so I made you this instead — a little page just for you, for a day that's just about you.

I still think about that evening on 21st May — when I nervously asked if you wanted to watch Thunderbolts with me, and you said yes like it was no big deal. It was a big deal. That was the day everything started, even if neither of us knew it yet.

And then 16th January — the day we stopped being "just friends who watch movies together" and became us. Best decision I've made.

It's been almost a year now, Chodu Mal, and somehow you've become the person I tell everything to — the good days and the hard ones. This year hasn't been easy for me, health-wise, and there were moments I didn't know how to carry. You never once let me carry them alone. That means more than I know how to say — so I'm saying it here instead: thank you. For staying. For showing up. For being you.

You're my Shakalaka Boom Boom, my Chodu, my favourite person to annoy and be annoyed by — and I don't want that to change.

Happy Girlfriend's Day. Here's to a lot more movie dates, more inside jokes, and more us.`;

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 20); // ms per character

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 text-left">
      {displayedText}
    </div>
  );
}

export function Scene10Letter({ onNext }: SceneProps) {
  return (
    <div className="w-full h-full flex flex-col items-center p-6 py-10 overflow-y-auto no-scrollbar">
      <PillTag>♡ A LETTER, JUST FOR YOU</PillTag>
      
      <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-white shadow-md my-4 flex-shrink-0">
        <Image
          src="/media/photo-01.jpg"
          alt="Us"
          fill
          className="object-cover"
          sizes="64px"
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
        <div className="absolute inset-0 bg-pink-100 -z-10" />
      </div>

      <div className="w-full bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50 mb-8 mt-4">
        <h3 className="font-script text-3xl text-primary mb-4 text-left">My darling,</h3>
        
        <TypewriterText text={letterText} />
        
        <motion.div 
          className="mt-6 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (letterText.length * 0.02) + 0.5 }}
        >
          <p className="font-script text-2xl text-primary">Yours, always,</p>
          <p className="font-script text-3xl text-slate-800 font-bold mt-1">Tushar</p>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (letterText.length * 0.02) + 1.5 }}
        onClick={onNext}
        className="flex items-center gap-2 text-primary font-medium hover:text-pink-600 transition-colors bg-white/50 px-5 py-2.5 rounded-full shadow-sm"
      >
        <RotateCcw className="w-4 h-4" />
        Read it again
      </motion.button>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (letterText.length * 0.02) + 2 }}
        className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline"
        onClick={() => window.close()}
      >
        Close
      </motion.button>
    </div>
  );
}
