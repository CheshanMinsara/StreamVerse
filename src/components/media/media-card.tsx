import Link from "next/link";
import Image from "next/image";
import { type Media } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

interface MediaCardProps {
  media: Media;
}

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <Link href={`/media/${media.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 border-0">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={media.posterUrl}
              alt={`Poster for ${media.title}`}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={media.posterHint}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.6vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-white/80 transform-gpu scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-headline text-base font-bold text-white truncate">{media.title}</h3>
                <p className="text-xs text-muted-foreground">{media.type}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
