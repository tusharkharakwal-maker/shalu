import { cn } from "@/lib/utils";

interface WashiTapeProps {
  className?: string;
  color?: "purple" | "pink" | "yellow";
}

export function WashiTape({ className, color = "purple" }: WashiTapeProps) {
  const colorStyles = {
    purple: "bg-purple-200/80 text-purple-300",
    pink: "bg-pink-200/80 text-pink-300",
    yellow: "bg-amber-100/80 text-amber-200"
  };

  return (
    <div 
      className={cn(
        "absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rotate-[-2deg] z-10 shadow-sm backdrop-blur-sm",
        colorStyles[color],
        className
      )}
      style={{
        clipPath: "polygon(2% 0, 98% 0, 100% 10%, 99% 20%, 100% 30%, 98% 40%, 100% 50%, 99% 60%, 100% 70%, 98% 80%, 100% 90%, 98% 100%, 2% 100%, 0 90%, 2% 80%, 0 70%, 1% 60%, 0 50%, 2% 40%, 0 30%, 1% 20%, 0 10%)",
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, currentColor 4px, currentColor 8px)"
      }}
    />
  );
}
