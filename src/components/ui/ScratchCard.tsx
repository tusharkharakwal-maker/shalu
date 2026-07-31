"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchCardProps {
  children: React.ReactNode;
  onReveal?: () => void;
  revealThreshold?: number; // 0-100 percentage
}

export function ScratchCard({
  children,
  onReveal,
  revealThreshold = 60,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Fill with soft gray overlay
      ctx.fillStyle = "#e5e7eb"; // tailwind gray-200
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text
      ctx.font = "20px 'Quicksand', sans-serif";
      ctx.fillStyle = "#9ca3af"; // tailwind gray-400
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("scratch me ♡", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isRevealed]); // re-run if it was not revealed and somehow needs resize, but usually we just remove canvas once revealed

  const calculateScratchedPercentage = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const pixels = ctx.getImageData(0, 0, width, height).data;
    let transparentPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }
    const totalPixels = width * height;
    return (transparentPixels / totalPixels) * 100;
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check percentage every few frames to save performance
    if (Math.random() > 0.8) {
      const percentage = calculateScratchedPercentage(ctx, canvas.width, canvas.height);
      if (percentage > revealThreshold) {
        setIsRevealed(true);
        if (onReveal) onReveal();
      }
    }
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    scratch(e);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDrawing) {
      scratch(e);
      // Prevent scrolling while scratching
      if (e.cancelable) e.preventDefault();
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    // We need non-passive event listeners for touchmove to prevent scrolling
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const touchMoveHandler = (e: TouchEvent) => {
      if (isDrawing && e.cancelable) {
        e.preventDefault();
      }
    };
    
    canvas.addEventListener('touchmove', touchMoveHandler, { passive: false });
    return () => canvas.removeEventListener('touchmove', touchMoveHandler);
  }, [isDrawing]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full rounded-2xl overflow-hidden glass-panel"
    >
      {/* Content to reveal */}
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
        {children}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1.2, 1], opacity: 1 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              {/* Confetti/sparkle effect placeholder */}
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-100/50 via-transparent to-transparent opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Canvas Overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-pointer touch-none z-10"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        />
      )}
    </div>
  );
}
