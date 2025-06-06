// src/pages/SearchResultsPage/SearchResultsPage.jsx
import React, {
  useEffect,
  useState, // Added useState for pagination if needed
} from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { searchMulti } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useAppContext } from '../../context/AppContext';

const SearchResultsPage = () => {
  const { query } = useParams();
  const { getImageUrl, loadingConfig } = useAppContext(); // Needed if MovieCard uses it
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  // Note: useFetch needs to be adapted if you want its params to change for pagination
  // For simplicity, this example fetches only the first page.
  // To implement pagination, you'd manage `currentPage` and re-trigger `useFetch` or a manual fetch.
  const { data, loading, error } = useFetch(
    searchMulti,
    decodeURIComponent(query),
    currentPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset to page 1 when query changes
    setCurrentPage(1);
  }, [query]);

  if (loadingConfig || loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-yellow"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 text-center text-red-500">
        Error loading search results: {error}
      </div>
    );
  }

  const results =
    data?.results?.filter(
      (item) =>
        (item.media_type === 'movie' || item.media_type === 'tv') &&
        item.poster_path
    ) || [];

  return (
    <div className="container mx-auto px-4 py-8 pt-24 md:pt-28 min-h-screen">
      {' '}
      {/* Added top padding for fixed header */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Search Results for:{' '}
        <span className="text-brand-yellow">{decodeURIComponent(query)}</span>
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {results.map((item) => (
            <MovieCard key={item.id} item={item} mediaType={item.media_type} />
          ))}
        </div>
      ) : (
        <p className="text-center text-brand-text-secondary text-lg">
          No movies or TV shows found matching your search.
        </p>
      )}
      {/* Basic Pagination Example (very simplified) */}
      {/* {data && data.total_pages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-brand-card rounded hover:bg-zinc-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {currentPage} of {data.total_pages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(data.total_pages, p + 1))}
            disabled={currentPage === data.total_pages}
            className="px-4 py-2 bg-brand-card rounded hover:bg-zinc-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )} */}
    </div>
  );
};

export default SearchResultsPage;
