"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CtaButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  showArrow?: boolean;
}

export function CtaButton({
  children,
  className,
  showArrow = true,
  ...props
}: CtaButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50 uppercase tracking-wide",
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight className="h-4 w-4" strokeWidth={3} />}
    </motion.button>
  );
}
