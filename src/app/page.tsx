import Catalog from "@/components/media/catalog";
import Header from "@/components/layout/header";
import { getTrending, searchMedia, getPopularMovies, getPopularTvShows } from "@/lib/tmdb";
import { MediaResult } from "@/lib/types";
import Hero from "@/components/media/hero";

interface HomeProps {
  searchParams: {
    q?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const searchQuery = searchParams.q || "";
  let searchResults: MediaResult[] | null = null;

  if (searchQuery) {
    searchResults = await searchMedia(searchQuery);
  }

  const trending = await getTrending('day');
  const popularMovies = await getPopularMovies();
  const popularTvShows = await getPopularTvShows();
  const heroMedia = trending[0];

  return (
    <>
      <Header />
      <div className="flex flex-col">
        {searchQuery && searchResults ? (
          <div className="container mx-auto px-4 py-8">
             <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">Search Results for "{searchQuery}"</h1>
            <Catalog media={searchResults} />
          </div>
        ) : (
          <>
            <Hero media={heroMedia} />
            <div className="container mx-auto px-4 py-8 space-y-16">
              <Catalog title="Popular Movies" media={popularMovies} />
              <Catalog title="Popular TV Shows" media={popularTvShows} />
            </div>
          </>
        )}
      </div>
    </>
  );
}