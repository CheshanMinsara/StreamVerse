"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import { MediaResult } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";
import { motion } from "framer-motion";

interface MediaCardProps {
  media: MediaResult;
}

export default function MediaCard({ media }: MediaCardProps) {
  const title = media.title || media.name || 'Untitled';
  const type = media.media_type === 'movie' ? 'Movie' : 'TV Show';
  const href = `/media/${media.id}?type=${media.media_type}`;

  return (
    <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
    <Link href={href} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-accent/20 border-0 bg-card">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            {media.poster_path ? (
              <Image
                src={getImageUrl(media.poster_path)}
                alt={`Poster for ${title}`}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.6vw"
              />
            ) : (
              <div className="w-full h-full bg-card flex items-center justify-center">
                  <span className="text-sm text-muted-foreground text-center p-2">No Poster Available</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-white/80 transform-gpu scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-2">
         <h3 className="font-headline text-base font-bold text-foreground truncate">{title}</h3>
         <p className="text-xs text-muted-foreground">{type}</p>
      </div>
    </Link>
    </motion.div>
  );
}