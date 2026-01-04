"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface StreamPlayerProps {
  title: string;
}

export default function StreamPlayer({ title }: StreamPlayerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
          <Play className="mr-2 h-5 w-5 fill-current" />
          Play
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80vw] p-0 border-0 bg-black">
        <div className="aspect-video w-full flex items-center justify-center bg-black rounded-lg overflow-hidden">
            <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4 text-accent animate-pulse" />
                <DialogHeader>
                <DialogTitle className="text-2xl font-headline text-white">Streaming {title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                    Your content is playing.
                </DialogDescription>
                </DialogHeader>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
