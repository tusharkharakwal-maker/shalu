"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import Image from "next/image";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("-:--");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "-:--";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audioEl = document.getElementById("bg-music") as HTMLAudioElement;
    if (audioEl) {
      audioRef.current = audioEl;
      
      // Initialize state based on current audio element
      setIsPlaying(!audioEl.paused);
      if (audioEl.duration) {
        setDuration(formatTime(audioEl.duration));
        setCurrentTime(formatTime(audioEl.currentTime));
        setProgress((audioEl.currentTime / audioEl.duration) * 100);
      }

      const handleTimeUpdate = () => {
        const current = audioEl.currentTime;
        const total = audioEl.duration;
        setCurrentTime(formatTime(current));
        if (total) {
          setProgress((current / total) * 100);
        }
      };

      const handleLoadedMetadata = () => {
        setDuration(formatTime(audioEl.duration));
      };

      const handleEnded = () => {
        setProgress(0);
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audioEl.addEventListener("timeupdate", handleTimeUpdate);
      audioEl.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioEl.addEventListener("ended", handleEnded);
      audioEl.addEventListener("play", handlePlay);
      audioEl.addEventListener("pause", handlePause);

      return () => {
        audioEl.removeEventListener("timeupdate", handleTimeUpdate);
        audioEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioEl.removeEventListener("ended", handleEnded);
        audioEl.removeEventListener("play", handlePlay);
        audioEl.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className="w-full max-w-[320px] mx-auto bg-white rounded-[2rem] p-4 flex items-center gap-4 shadow-md border border-purple-100 mt-4 mb-6"
    >
      <div className="w-20 h-20 relative rounded-2xl overflow-hidden bg-pink-50 flex-shrink-0 border border-purple-50 shadow-sm">
        <Image 
          src="/media/album-art.jpg" 
          alt="Album Art" 
          fill 
          className="object-cover" 
          unoptimized={true}
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-w-0 text-left">
        <h4 className="text-base font-bold text-slate-800 truncate">I Wanna Be Yours</h4>
        <p className="text-xs font-bold text-primary tracking-widest uppercase truncate mt-0.5">Arctic Monkeys</p>
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-primary-light rounded-full mt-3 relative overflow-hidden">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-primary rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[10px] text-slate-400 font-medium">{currentTime}</span>
          <span className="text-[10px] text-slate-400 font-medium">{duration}</span>
        </div>
      </div>

      <button 
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm text-white hover:bg-purple-500 transition-colors active:scale-95"
      >
        {isPlaying ? (
          <Pause size={20} className="fill-white" />
        ) : (
          <Play size={20} className="fill-white ml-1" />
        )}
      </button>
    </motion.div>
  );
}
