"use client";

import { useEffect, useRef, useState } from "react";

interface ScratchCardProps {
  children: React.ReactNode;
  onScratchComplete?: () => void;
  brushSize?: number;
  finishPercent?: number;
  isRevealed?: boolean;
}

export function ScratchCard({
  children,
  onScratchComplete,
  brushSize = 25,
  finishPercent = 40,
  isRevealed = false,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameCount = useRef(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (isRevealed && !isScratched) {
      setIsScratched(true);
      if (onScratchComplete) onScratchComplete();
    }
  }, [isRevealed, isScratched, onScratchComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Use ResizeObserver to ensure canvas size matches actual layout size
    // to avoid misalignment after framer-motion animations
    const observer = new ResizeObserver(() => {
      if (isScratched || ctxRef.current) return; // Only init once
      
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = rect.width;
      canvas.height = rect.height;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctxRef.current = ctx;

      // 1. Draw Background Gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#f9a8d4"); 
      gradient.addColorStop(0.5, "#d8b4fe"); 
      gradient.addColorStop(1, "#f472b6"); 
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Diagonal Stripes
      ctx.lineWidth = 16;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      for (let i = -canvas.height; i < canvas.width; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + canvas.height, canvas.height);
        ctx.stroke();
      }

      // 3. Draw Center Circle
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2 - 8, 18, 0, Math.PI * 2);
      ctx.fill();

      // 4. Draw Heart and Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 10px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SCRATCH", canvas.width / 2, canvas.height / 2 + 15);
      ctx.font = "16px sans-serif";
      ctx.fillText("♡", canvas.width / 2, canvas.height / 2 - 6);

      // Set composition mode to erase for future strokes
      ctx.globalCompositeOperation = "destination-out";
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [isScratched]);

  // Prevent scrolling on mobile devices when touching the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const preventScroll = (e: TouchEvent) => {
      if (!isScratched) {
        e.preventDefault();
      }
    };

    // Must use native event listener to set passive: false
    canvas.addEventListener("touchmove", preventScroll, { passive: false });
    return () => canvas.removeEventListener("touchmove", preventScroll);
  }, [isScratched]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || isScratched) return;

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize * 2;

    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    } else {
      ctx.moveTo(x, y);
    }
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPointRef.current = { x, y };

    frameCount.current++;
    if (frameCount.current % 5 === 0) {
      checkPercent();
    }
  };

  const checkPercent = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || isScratched) return;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    const totalPixels = pixels.length / 4;
    const stride = 10; 

    for (let i = 3; i < pixels.length; i += 4 * stride) {
      if (pixels[i] < 128) {
        transparentPixels++;
      }
    }

    const percent = (transparentPixels / (totalPixels / stride)) * 100;
    
    if (percent > finishPercent) {
      setIsScratched(true);
      if (onScratchComplete) onScratchComplete();
    }
  };

  const handleStart = (clientX: number, clientY: number) => {
    if (isScratched) return;
    isDrawing.current = true;
    lastPointRef.current = null;
    scratch(clientX, clientY);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDrawing.current || isScratched) return;
    scratch(clientX, clientY);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    lastPointRef.current = null;
    checkPercent(); 
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full select-none"
      style={{ touchAction: "none" }}
    >
      {/* Content underneath */}
      <div 
        className={`w-full h-full transition-all duration-700 ease-out ${
          isScratched ? "opacity-100 scale-100 filter-none" : "opacity-40 scale-95 blur-[2px]"
        }`}
      >
        {children}
      </div>

      {/* Canvas Overlay */}
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
        className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-700 ease-in-out z-10 ${
          isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
}

