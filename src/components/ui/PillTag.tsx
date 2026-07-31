import { cn } from "@/lib/utils";

interface PillTagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PillTag({ children, className, ...props }: PillTagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-primary bg-primary-light/50 border border-primary/10 shadow-sm uppercase mb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
