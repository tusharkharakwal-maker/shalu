"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import { WashiTape } from "@/components/ui/WashiTape";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SceneProps {
  onNext: () => void;
}

const carouselItems = [
  { image: "/media/carousel-1.jpg", caption: "beautiful as always" },
  { image: "/media/carousel-2.jpg", caption: "our first official twinning" },
  { image: "/media/carousel-3.jpg", caption: "my favourite smile" },
  { image: "/media/carousel-4.jpg", caption: "just being with you" },
  { image: "/media/carousel-5.jpg", caption: "♡us♡" }
];

export function Scene5Carousel({ onNext }: SceneProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [emblaApi]);

  return (
    <motion.div
      key="scene-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full h-full flex flex-col items-center justify-center py-8 text-center overflow-x-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6"
      >
        <PillTag>OUR MOMENTS</PillTag>
        <h2 className="text-3xl font-bold text-indigo-950 mb-1">
          us, in a few frames
        </h2>
        <p className="font-script text-2xl text-purple-500 mb-6">
          a handful of moments I'd relive on loop ♡
        </p>
      </motion.div>

      {/* Carousel Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full relative mb-8 px-4"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className="relative flex-[0_0_80%] min-w-0 pl-2 pr-2 py-4"
              >
                {/* Polaroid Card */}
                <div
                  className={`bg-white p-3 pb-8 rounded-xl shadow-md border border-purple-50 transition-transform duration-300 relative ${index === selectedIndex ? "scale-100 rotate-0 shadow-lg shadow-purple-200/50" : "scale-95 rotate-[-2deg] opacity-70"
                    }`}
                >
                  <WashiTape color={index % 2 === 0 ? "purple" : "pink"} />
                  <div className="relative w-full aspect-[4/5] bg-pink-50 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.caption}
                      fill
                      className="object-cover"
                      sizes="(max-width: 430px) 80vw, 300px"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                  <p className="font-script text-2xl text-purple-600 mt-4 h-6">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full left-0 flex justify-between px-2 pointer-events-none z-10">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-purple-400 pointer-events-auto border border-purple-50 hover:text-purple-600 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-purple-400 pointer-events-auto border border-purple-50 hover:text-purple-600 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>

      {/* Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-2 mb-8"
      >
        {carouselItems.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === selectedIndex ? "bg-purple-500 w-4" : "bg-purple-200"
              }`}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-6 mt-auto"
      >
        <CtaButton onClick={onNext}>
          WHY I ADORE YOU
        </CtaButton>
      </motion.div>
    </motion.div>
  );
}
