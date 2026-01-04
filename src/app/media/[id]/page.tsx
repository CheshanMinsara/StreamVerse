import Image from "next/image";
import { notFound } from "next/navigation";
import { mediaData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import StreamPlayer from "@/components/media/stream-player";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface MediaPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MediaPageProps) {
  const media = mediaData.find((item) => item.id === params.id);
  if (!media) {
    return { title: "Not Found" };
  }
  return {
    title: `${media.title} | StreamVerse`,
    description: media.description,
  };
}

export default function MediaPage({ params }: MediaPageProps) {
  const media = mediaData.find((item) => item.id === params.id);

  if (!media) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Link>
        </Button>
        <div className="grid md:grid-cols-3 lg:grid-cols-[1fr,2fr] gap-8 md:gap-12">
          <div className="aspect-[2/3] md:aspect-auto relative rounded-lg overflow-hidden shadow-2xl shadow-black/30">
            <Image
              src={media.posterUrl}
              alt={`Poster for ${media.title}`}
              width={500}
              height={750}
              className="w-full h-full object-cover"
              data-ai-hint={media.posterHint}
            />
          </div>
          <div className="flex flex-col">
            <Badge variant="outline" className="w-fit mb-4">{media.type}</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
              {media.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-prose">
              {media.description}
            </p>
            <div className="mt-auto flex gap-4">
              <StreamPlayer title={media.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return mediaData.map((media) => ({
    id: media.id,
  }));
}
