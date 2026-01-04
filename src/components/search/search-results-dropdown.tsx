
import { MediaResult } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface SearchResultsDropdownProps {
  results: MediaResult[];
  query: string;
  onClose: () => void;
}

export default function SearchResultsDropdown({ results, query, onClose }: SearchResultsDropdownProps) {
  const getReleaseYear = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  }

  return (
    <div className="absolute top-full mt-2 w-full md:w-96 rounded-md border bg-popover text-popover-foreground shadow-lg z-50">
      <ScrollArea className="max-h-96">
        <div className="p-2">
          {results.map((item) => (
            <Link 
              key={item.id}
              href={`/media/${item.id}?type=${item.media_type}`}
              onClick={onClose}
              className="block p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-16 rounded-sm overflow-hidden flex-shrink-0">
                  {item.poster_path ? (
                    <Image
                      src={getImageUrl(item.poster_path, 'w92')}
                      alt={item.title || item.name || ''}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center text-xs text-muted-foreground">
                      No Art
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{item.title || item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {getReleaseYear(item.release_date || item.first_air_date)} &middot; {item.media_type === 'movie' ? 'Movie' : 'TV'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-2">
        <Button asChild variant="ghost" className="w-full justify-center" onClick={onClose}>
          <Link href={`/search?q=${encodeURIComponent(query)}`}>
            View all results
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

// Add types for props to MediaResult for release_date and first_air_date
declare module '@/lib/types' {
    interface MediaResult {
        release_date?: string;
        first_air_date?: string;
    }
}
