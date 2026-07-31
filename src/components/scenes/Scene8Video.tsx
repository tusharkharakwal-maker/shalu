"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import { Play } from "lucide-react";

interface SceneProps {
  onNext: () => void;
}

export function Scene8Video({ onNext }: SceneProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 py-10">
      <div className="text-center mb-8">
        <PillTag>♡ RELIVE THIS</PillTag>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">a little moment, in motion</h2>
      </div>

      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="thumbnail"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl mb-6 cursor-pointer bg-slate-200 border-2 border-white"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail Placeholder */}
            <div className="absolute inset-0 bg-pink-100 flex items-center justify-center text-pink-300 text-sm">
              video-01-thumb.jpg
            </div>
            
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors hover:bg-black/30">
              <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse">
                <Play className="text-white fill-white w-8 h-8 ml-1" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[120%] -mx-10 aspect-[9/16] max-h-[60vh] bg-black shadow-2xl mb-6 relative z-50 rounded-lg overflow-hidden"
          >
            <video
              src="/media/video-01.mp4"
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
            />
            {/* Fallback placeholder if video missing */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center text-white/50 text-sm">
              video-01.mp4 placeholder
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-sm font-medium text-slate-500 mb-8 italic">
        "some moments are just better in motion."
      </p>

      <CtaButton onClick={onNext}>One last thing, wait for it</CtaButton>
    </div>
  );
}
