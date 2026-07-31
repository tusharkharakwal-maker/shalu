"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";

interface SceneProps {
  onNext: () => void;
}

export function Scene1Cover({ onNext }: SceneProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-6 cursor-pointer"
      onClick={handleOpen}
    >
      <PillTag>DEAR TANTI</PillTag>

      <motion.div
        className="relative w-64 h-48 mt-8 mb-12"
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      >
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-pink-200 rounded-lg shadow-md" />

        {/* Card sliding up */}
        <motion.div
          className="absolute inset-x-2 top-2 bottom-2"
          animate={{
            y: isOpen ? -80 : 0,
            opacity: isOpen ? 1 : 0.8
          }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {/* Inner hover animation for the card itself */}
          <motion.div
            className="w-full h-full bg-white rounded flex items-center justify-center p-4 text-center shadow-sm"
            animate={isOpen ? { y: [0, -5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.8 }}
          >
            <h1 className="font-script text-3xl text-primary leading-tight">
              Happy Girlfriend's Day,<br />
            </h1>
          </motion.div>
        </motion.div>

        {/* Envelope Front (Triangle flap) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-b-[120px] border-b-pink-300 drop-shadow-sm" />
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[120px] border-t-pink-100 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent drop-shadow-sm origin-top"
            style={{ transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)', transition: 'transform 0.6s ease-in-out' }} />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.p
            key="hint"
            exit={{ opacity: 0 }}
            className="text-sm text-slate-500 font-medium animate-pulse mt-8 h-10"
          >
            tap anywhere to open ♡
          </motion.p>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 h-10"
          >
            <CtaButton onClick={onNext}>Read more</CtaButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
