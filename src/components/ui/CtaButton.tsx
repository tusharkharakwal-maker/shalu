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
        "inline-flex items-center justify-center gap-2 rounded-full bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-md backdrop-blur-sm transition-colors hover:bg-white border border-white/50",
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight className="h-4 w-4 opacity-70" />}
    </motion.button>
  );
}
