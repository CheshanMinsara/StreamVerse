import { Clapperboard } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="relative">
        <Clapperboard className="h-24 w-24 animate-spin text-accent" style={{ animationDuration: '3s' }}/>
      </div>
    </div>
  );
}
