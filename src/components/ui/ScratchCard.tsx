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

    // Set canvas resolution to match pixel density for sharpness, 
    // but keep logic simple with bounding rect.
    const rect = container.getBoundingClientRect();
    // Use scale 1 for simplicity in mapping pointer events to canvas pixels
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    // 1. Draw Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#f9a8d4"); // pink-300
    gradient.addColorStop(0.5, "#d8b4fe"); // purple-300
    gradient.addColorStop(1, "#f472b6"); // pink-400
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
  }, []);

  const scratch = (x: number, y: number) => {
    const ctx = ctxRef.current;
    if (!ctx || isScratched) return;

    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkPercent = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || isScratched) return;

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    const totalPixels = pixels.length / 4;
    const stride = 10; // sample every 10th pixel

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

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isScratched) return;
    isDrawing.current = true;
    const canvas = e.currentTarget as HTMLCanvasElement;
    canvas.setPointerCapture(e.pointerId);
    const rect = canvas.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current || isScratched) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      scratch(e.clientX - rect.left, e.clientY - rect.top);
      frameCount.current++;
      if (frameCount.current % 5 === 0) {
        checkPercent();
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDrawing.current = false;
    const canvas = e.currentTarget as HTMLCanvasElement;
    canvas.releasePointerCapture(e.pointerId);
    checkPercent(); // Check one last time on release
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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-700 ease-in-out z-10 ${
          isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
}
