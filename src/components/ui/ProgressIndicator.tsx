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
    <div className="absolute top-4 left-0 right-0 z-50 flex items-center justify-center gap-1.5 pointer-events-none">
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
  );
}
