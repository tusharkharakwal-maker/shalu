"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";

interface SceneProps {
  onNext: () => void;
}

export function Scene1Cover({ onNext }: SceneProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onNext();
    }, 1200); // Wait for envelope open animation before moving to next scene
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer"
      onClick={!isOpen ? handleOpen : undefined}
    >
      <PillTag>♡ FOR MY TAKLI</PillTag>
      
      <div className="relative w-64 h-48 mt-8 mb-12">
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-pink-200 rounded-lg shadow-md" />
        
        {/* Card sliding up */}
        <motion.div 
          className="absolute inset-x-2 top-2 bottom-2 bg-white rounded flex items-center justify-center p-4 text-center shadow-sm"
          animate={{
            y: isOpen ? -80 : 0,
            opacity: isOpen ? 1 : 0.8
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="font-script text-3xl text-primary leading-tight">
            Happy Girlfriend's Day,<br/>my love
          </h1>
        </motion.div>

        {/* Envelope Front (Triangle flap) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-b-[120px] border-b-pink-300 drop-shadow-sm" />
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[120px] border-t-pink-100 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent drop-shadow-sm origin-top" 
               style={{ transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)', transition: 'transform 0.6s ease-in-out' }} />
        </div>
      </div>

      <AnimatePresence>
        {!isOpen && (
          <motion.p 
            exit={{ opacity: 0 }}
            className="text-sm text-slate-500 font-medium animate-pulse mt-8"
          >
            tap anywhere to begin ♡
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
