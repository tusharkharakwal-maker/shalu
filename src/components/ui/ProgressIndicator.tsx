import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface ProgressIndicatorProps {
  currentScene: number;
  totalScenes: number;
}

export function ProgressIndicator({
  currentScene,
  totalScenes,
}: ProgressIndicatorProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 pt-5 pb-6 bg-gradient-to-b from-white via-white/80 to-transparent flex items-start justify-center pointer-events-none">
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: totalScenes }).map((_, index) => {
          const isActive = index <= currentScene;
          return (
            <Heart
              key={index}
              className={cn(
                "w-2.5 h-2.5 transition-all duration-500 ease-out",
                isActive
                  ? "fill-primary text-primary scale-110"
                  : "fill-transparent text-primary/30"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
