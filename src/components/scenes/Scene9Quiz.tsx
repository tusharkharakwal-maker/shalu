"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import { HeartCrack, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface SceneProps {
  onNext: () => void;
}

const questions = [
  {
    id: 1,
    question: "What movie did we watch on our first date?",
    options: ["Spider-Man", "Thunderbolts", "Dune: Part Two", "Deadpool & Wolverine"],
    correct: 1, // index 1 is Thunderbolts
  },
  {
    id: 2,
    question: "When did we officially become a couple?",
    options: ["14 Feb 2026", "21 May 2025", "16 Jan 2026", "01 Jan 2026"],
    correct: 2, // 16 Jan 2026
  },
  {
    id: 3,
    question: "Which is NOT one of my nicknames for you?",
    options: ["Takli", "Chodu", "Chodu Mal", "Babu"],
    correct: 3, // Babu
  }
];

export function Scene9Quiz({ onNext }: SceneProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const isCompleted = currentQ >= questions.length;

  const handleOptionClick = (optIndex: number) => {
    if (showFeedback) return;
    
    setSelectedOpt(optIndex);
    setShowFeedback(true);
    
    if (optIndex === questions[currentQ].correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOpt(null);
      setCurrentQ(q => q + 1);
    }, 2000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 py-10">
      <div className="text-center mb-8">
        <PillTag>♡ JUST FOR FUN</PillTag>
        <h2 className="text-3xl font-bold text-slate-800">how well do you know us?</h2>
      </div>

      <div className="w-full flex-1 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm"
            >
              <h3 className="text-xl font-bold text-slate-700 mb-6 text-center">
                {questions[currentQ].question}
              </h3>
              
              <div className="flex flex-col gap-3">
                {questions[currentQ].options.map((opt, idx) => {
                  const isSelected = selectedOpt === idx;
                  const isCorrect = idx === questions[currentQ].correct;
                  
                  let btnStateClass = "bg-white text-slate-700 hover:bg-slate-50";
                  if (showFeedback) {
                    if (isCorrect) btnStateClass = "bg-green-100 text-green-700 border-green-300";
                    else if (isSelected) btnStateClass = "bg-red-100 text-red-700 border-red-300";
                    else btnStateClass = "bg-slate-100 text-slate-400 opacity-50";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showFeedback}
                      onClick={() => handleOptionClick(idx)}
                      className={cn(
                        "w-full p-4 rounded-xl shadow-sm border border-transparent font-medium transition-all text-left flex items-center justify-between",
                        btnStateClass
                      )}
                    >
                      <span>{opt}</span>
                      {showFeedback && isSelected && isCorrect && <Heart className="w-5 h-5 fill-green-500 text-green-500" />}
                      {showFeedback && isSelected && !isCorrect && <HeartCrack className="w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback text below */}
              <div className="h-12 mt-6 flex items-center justify-center text-center">
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-script text-2xl text-primary"
                    >
                      {selectedOpt === questions[currentQ].correct 
                        ? "you know us so well 🥹" 
                        : "aww, close — it's still us either way ♡"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h3 className="text-4xl font-script text-primary mb-4">
                Score doesn't matter.
              </h3>
              <p className="text-lg text-slate-700 mb-10 font-medium">
                We're the only answer that counts. ♡
              </p>
              
              <CtaButton onClick={onNext}>Read my letter</CtaButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
