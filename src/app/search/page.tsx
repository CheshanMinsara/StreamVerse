import Catalog from "@/components/media/catalog";
import Header from "@/components/layout/header";
import { searchMedia } from "@/lib/tmdb";
import PaginationControls from "@/components/media/pagination-controls";
import { Suspense } from "react";
import Loading from "../loading";

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

async function SearchResults({ query, page }: { query: string, page: number }) {
    const searchResults = await searchMedia(query, page);

    return (
        <>
            <Catalog media={searchResults.results} />
            <PaginationControls
                currentPage={page}
                totalPages={searchResults.total_pages}
                basePath={`/search`}
                queryParams={{ q: query }}
            />
        </>
    )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchQuery = searchParams.q || "";
  const page = Number(searchParams.page) || 1;

  if (!searchQuery) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="font-headline text-3xl md:text-4xl font-bold mb-4">Search for Movies and TV Shows</h1>
            <p className="text-muted-foreground">Use the search bar above to find your favorite content.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
         <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">Search Results for "{searchQuery}"</h1>
         <Suspense fallback={<Loading />}>
            <SearchResults query={searchQuery} page={page} />
         </Suspense>
      </div>
    </>
  );
}
