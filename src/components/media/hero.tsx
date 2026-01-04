"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/tmdb";
import { MediaResult } from "@/lib/types";
import { PlayCircle, Info } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroProps {
  media: MediaResult;
}

export default function Hero({ media: initialMedia }: HeroProps) {
    const [media, setMedia] = useState(initialMedia);

    useEffect(() => {
        // This will only run on the client, after initial hydration
        setMedia(initialMedia);
    }, [initialMedia]);


  if (!media) return null;

  const title = media.title || media.name;
  const backdropUrl = getImageUrl(media.backdrop_path, "original");
  const href = `/media/${media.id}?type=${media.media_type}`;

  return (
    <div className="relative h-[50vh] md:h-[80vh] w-full">
        <AnimatePresence>
            <motion.div
                key={media.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="absolute inset-0"
            >
                {backdropUrl && (
                    <Image
                    src={backdropUrl}
                    alt={`Backdrop for ${title}`}
                    fill
                    className="object-cover object-center"
                    priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
            </motion.div>
       </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-end h-full container mx-auto px-4 pb-12 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
        >
          <h1 className="font-headline text-4xl md:text-6xl font-bold max-w-2xl text-white">
            {title}
          </h1>
          <p className="max-w-2xl mt-4 text-sm md:text-lg text-muted-foreground line-clamp-3">
            {media.overview}
          </p>
          <div className="flex gap-4 mt-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <Link href={href}>
                <PlayCircle className="mr-2 h-6 w-6" />
                Play
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-black/20 backdrop-blur-sm">
                <Link href={href}>
                    <Info className="mr-2 h-6 w-6" />
                    More Info
                </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}