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

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(formatTime(current));
      if (total) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className="w-full max-w-[280px] mx-auto bg-white rounded-3xl p-3 flex items-center gap-3 shadow-md border border-purple-100 mt-4 mb-6"
    >
      <audio
        ref={audioRef}
        src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5f/37/be/5f37be34-5729-45b4-8ed1-5b7bd70b8a68/mzaf_17466306567367397119.plus.aac.p.m4a"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-pink-50 flex-shrink-0 border border-purple-50 shadow-sm">
        <Image 
          src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/69/9c/b5/699cb5d6-115c-ff73-9d26-e57ea4350d72/887828031795.png/100x100bb.jpg" 
          alt="Album Art" 
          fill 
          className="object-cover" 
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-w-0 text-left">
        <h4 className="text-sm font-bold text-slate-800 truncate">I Wanna Be Yours</h4>
        <p className="text-[10px] font-bold text-primary tracking-widest uppercase truncate mt-0.5">Arctic Monkeys</p>
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-primary-light rounded-full mt-2 relative overflow-hidden">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-primary rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[9px] text-slate-400 font-medium">{currentTime}</span>
          <span className="text-[9px] text-slate-400 font-medium">{duration}</span>
        </div>
      </div>

      <button 
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm text-white hover:bg-purple-500 transition-colors active:scale-95"
      >
        {isPlaying ? (
          <Pause size={16} className="fill-white" />
        ) : (
          <Play size={16} className="fill-white ml-1" />
        )}
      </button>
    </motion.div>
  );
}
