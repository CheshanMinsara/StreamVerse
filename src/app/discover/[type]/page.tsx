import Catalog from "@/components/media/catalog";
import Header from "@/components/layout/header";
import { getPopularMovies, getPopularTvShows } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import PaginationControls from "@/components/media/pagination-controls";

interface DiscoverPageProps {
  params: {
    type: 'movie' | 'tv';
  };
  searchParams: {
    page?: string;
  }
}

export async function generateMetadata({ params }: DiscoverPageProps) {
    const { type } = params;
    const title = type === 'movie' ? 'Movies' : 'TV Shows';
    return {
      title: `Discover ${title} | StreamVerse`,
      description: `Browse popular ${title}.`,
    };
}

export default async function DiscoverPage({ params, searchParams }: DiscoverPageProps) {
  const { type } = params;
  if (type !== 'movie' && type !== 'tv') {
    notFound();
  }

  const page = Number(searchParams.page) || 1;
  const data = type === 'movie' ? await getPopularMovies(page) : await getPopularTvShows(page);
  const title = type === 'movie' ? 'Popular Movies' : 'Popular TV Shows';

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">{title}</h1>
        <Catalog media={data.results} />
        <PaginationControls 
            currentPage={page}
            totalPages={data.total_pages}
            basePath={`/discover/${type}`}
        />
      </div>
    </>
  );
}
