import { useParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import { useExplore } from "../hooks/useExplore";
import { useEffect } from "react";

const ExplorePage = () => {
  const { query } = useParams();
  const {
    page,
    setPage,
    activeGenre,
    setActiveGenre,
    genres,
    data = { results: [], total_pages: 0 },
    loading,
    error,
  } = useExplore(query); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  console.log("data in Explore Page", data.results)

  // Show loading state
  if (loading && !data?.results?.length) {
    return (
      <div className="container mx-auto p-4 py-6 min-h-screen text-white pb-16">
        <div className="text-center min-h-[550px] flex items-center justify-center w-full">
          <p className="text-lg animate-pulse m-4 flex items-center gap-2">
            <Spinner />
            Loading {query === 'movie' ? 'Movies' : query === 'anime' ? 'Anime' : 'TV Shows'}...
          </p>
        </div>
      </div>
    );
  }


  // Show error state
  if (error) {
    return (
      <div className="container mx-auto p-4 py-6 min-h-screen text-white pb-16">
        <div className="text-center min-h-[250px] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Content</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Filter out duplicate genres by ID
  const uniqueGenres = genres?.filter((genre, index, self) => 
    index === self.findIndex((g) => g.id === genre.id)
  ) || [];

  return (
    <div className="container mx-auto p-4 py-6 min-h-screen text-white pb-16">
      <h1 className="text-2xl font-bold mb-4 text-left text-gray-200">
        {query === "movie" ? "Movies" : query === "anime" ? "Anime" : "TV Shows"}
      </h1>
      
      {/* Genre Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {uniqueGenres?.map((genre) => (
          <div key={genre.id} className="flex-shrink-0">
            <button
              className={`text-sm bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-md font-semibold mb-2 w-fit text-left text-gray-200 transition-all whitespace-nowrap overflow-hidden text-ellipsis max-w-xs cursor-pointer hover:bg-zinc-700 ${
                activeGenre === genre.id
                  ? "bg-zinc-900/80 box-border border-yellow-500 text-yellow-400"
                  : ""
              }`}
              onClick={() => setActiveGenre(genre.id)}
              disabled={loading}
            >
              {genre.name}
            </button>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="mt-4">
        <div className="flex sm:flex-row justify-between items-center sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-200">
              {uniqueGenres?.find((g) => g.id === activeGenre)?.name || 'Popular'}
            </h2>
          </div>
          
          {data?.total_pages > 0 && (
            <div className="flex items-center space-x-2 bg-zinc-900/50 rounded-lg p-2">
              <span className="text-sm text-gray-300 min-w-[88px]">
                Page {page} of {Math.min(500, data.total_pages)}
              </span>
              <div className="h-5 w-px bg-zinc-700 mx-1"></div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1 || loading}
                  className="p-1.5 rounded-md hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!data?.total_pages || page >= Math.min(500, data.total_pages) || loading}
                  className="p-1.5 rounded-md hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-zinc-800 rounded-lg h-60 md:h-50 animate-pulse"></div>
            ))}
          </div>
        ) : data?.results?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.results.map((item) => (
              <MovieCard key={item.id} item={item} mediaType={query} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No results found. Try a different genre or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
