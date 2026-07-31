"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";

import { Scene1Cover } from "@/components/scenes/Scene1Cover";
import { Scene2Welcome } from "@/components/scenes/Scene2Welcome";
import { Scene3StoryStart } from "@/components/scenes/Scene3StoryStart";
import { Scene4StoryUs } from "@/components/scenes/Scene4StoryUs";
import { Scene5Carousel } from "@/components/scenes/Scene5Carousel";
import { Scene6Reasons } from "@/components/scenes/Scene6Reasons";
import { Scene8Video } from "@/components/scenes/Scene8Video";
import { Scene10Letter } from "@/components/scenes/Scene10Letter";

const TOTAL_SCENES = 8;
const SWIPE_CONFIDENCE_THRESHOLD = 15000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function StoryContainer() {
  const [sceneIndex, setSceneIndex] = useState(0);

  const paginate = (newDirection: number) => {
    setSceneIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) return 0;
      if (nextIndex >= TOTAL_SCENES) nextIndex = 0; // Loop back to start from Scene10
      return nextIndex;
    });
  };

  const handleNext = () => paginate(1);
  const handlePrev = () => paginate(-1);

  const scenes = [
    <Scene1Cover key="s1" onNext={handleNext} />,
    <Scene2Welcome key="s2" onNext={handleNext} />,
    <Scene3StoryStart key="s3" onNext={handleNext} />,
    <Scene4StoryUs key="s4" onNext={handleNext} />,
    <Scene5Carousel key="s5" onNext={handleNext} />,
    <Scene6Reasons key="s6" onNext={handleNext} />,
    <Scene8Video key="s8" onNext={handleNext} />,
    <Scene10Letter key="s10" onNext={handleNext} />,
  ];

  return (
    <div className="relative w-full h-full flex flex-col">
      <ProgressIndicator currentScene={sceneIndex} totalScenes={TOTAL_SCENES} />
      
      {/* Container for scenes (swipe disabled) */}
      <motion.div
        className="flex-1 relative w-full h-full outline-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {scenes[sceneIndex]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <audio
        id="bg-music"
        loop
        src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5f/37/be/5f37be34-5729-45b4-8ed1-5b7bd70b8a68/mzaf_17466306567367397119.plus.aac.p.m4a"
      />
    </div>
  );
}
