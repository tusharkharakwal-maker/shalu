import { cn } from "@/lib/utils";

interface PillTagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PillTag({ children, className, ...props }: PillTagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest text-primary bg-white border border-primary/20 shadow-sm uppercase mb-4 shadow-purple-500/10",
        className
      )}
      {...props}
    >
      <span className="mr-1.5 text-pink-400">♥</span>
      {children}
    </div>
  );
}
