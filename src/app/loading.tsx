import { Clapperboard } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-4">
        <Clapperboard className="h-16 w-16 text-accent animate-logo-spin" />
        <h1 className="text-2xl font-headline font-bold text-foreground animate-fade-in animate-title-pulse">
          StreamVerse
        </h1>
      </div>
    </div>
  );
}
