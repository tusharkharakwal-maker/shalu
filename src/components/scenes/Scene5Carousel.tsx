"use client";

import { useState, useCallback, useEffect } from "react";
import { PillTag } from "@/components/ui/PillTag";
import { CtaButton } from "@/components/ui/CtaButton";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

interface SceneProps {
  onNext: () => void;
}

const moments = [
  { id: 1, src: "/media/carousel-1.jpg", caption: "the day I realised you were my favourite hello." },
  { id: 2, src: "/media/carousel-2.jpg", caption: "a day of just doing nothing, perfectly." },
  { id: 3, src: "/media/carousel-3.jpg", caption: "when you laughed so hard you snorted." },
  { id: 4, src: "/media/carousel-4.jpg", caption: "another favourite memory of mine." },
  { id: 5, src: "/media/carousel-5.jpg", caption: "just us being us." },
];

export function Scene5Carousel({ onNext }: SceneProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-10">
      <div className="text-center px-8 mb-6">
        <PillTag>♡ OUR MOMENTS</PillTag>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">us, in a few frames</h2>
        <p className="font-script text-2xl text-primary">a handful of moments I'd relive on loop ♡</p>
      </div>

      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {moments.map((moment) => (
            <div key={moment.id} className="flex-[0_0_80%] min-w-0 pl-4 pr-2">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-lg bg-pink-50 border border-white/50">
                <Image
                  src={moment.src}
                  alt={moment.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 430px) 80vw, 300px"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs text-pink-300 -z-10 bg-pink-100">
                  {moment.src.split('/').pop()}
                </div>
                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 text-white">
                  <p className="text-sm font-medium">{moment.caption}</p>
                </div>
              </div>
            </div>
          ))}
          {/* Add a bit of right padding for the last item to snap well */}
          <div className="flex-[0_0_20%] min-w-0" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between w-full px-12">
        <div className="text-sm font-bold text-slate-400">
          {String(selectedIndex + 1).padStart(2, '0')} / {String(moments.length).padStart(2, '0')}
        </div>
        <div className="flex gap-1.5">
          {moments.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === selectedIndex ? "bg-primary w-4" : "bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <CtaButton onClick={onNext}>Why I adore you</CtaButton>
      </div>
    </div>
  );
}
