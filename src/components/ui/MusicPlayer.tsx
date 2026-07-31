"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

export function MusicPlayer() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className="w-full max-w-[280px] mx-auto bg-white rounded-3xl p-3 flex items-center gap-3 shadow-md border border-purple-100 mt-4 mb-6"
    >
      <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-pink-50 flex-shrink-0 border border-purple-50">
        {/* Placeholder album art, normally you'd use a real image */}
        <Image src="/media/photo-01.jpg" alt="Album" fill className="object-cover" />
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-w-0 text-left">
        <h4 className="text-sm font-bold text-slate-800 truncate">Our Song</h4>
        <p className="text-[10px] font-bold text-primary tracking-widest uppercase truncate mt-0.5">A track that's just us</p>
        
        {/* Fake progress bar */}
        <div className="w-full h-1.5 bg-primary-light rounded-full mt-2 relative">
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-primary rounded-full"></div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[9px] text-slate-400 font-medium">0:00</span>
          <span className="text-[9px] text-slate-400 font-medium">-:--</span>
        </div>
      </div>

      <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm text-white hover:bg-purple-500 transition-colors">
        <Play size={16} className="fill-white ml-1" />
      </button>
    </motion.div>
  );
}
