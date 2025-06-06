// src/components/SearchBar/SearchBar.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  searchMulti,
  getImageUrl as tmdbGetImageUrl,
} from '../services/tmdbApi';
import { useAppContext } from '../context/AppContext'; // If you use getImageUrl from context
import useDebounce from '../hooks/useDebounce'; // We'll create this custom hook

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500); // Debounce for 500ms
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);
  const { getImageUrl } = useAppContext(); // Or use tmdbGetImageUrl directly

  const fetchSearchResults = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      setIsDropdownOpen(false);
      return;
    }
    setIsLoading(true);
    setIsDropdownOpen(true);
    try {
      const response = await searchMulti(searchQuery, 1); // Fetch first page of multi-search
      // Filter out people, keep only movies and TV shows, and items with poster_path
      const filteredResults = response.data.results
        .filter(
          (item) =>
            (item.media_type === 'movie' || item.media_type === 'tv') &&
            item.poster_path
        )
        .slice(0, 7); // Show top 5-7 results
      setResults(filteredResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]); // Clear results on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSearchResults(debouncedQuery);
  }, [debouncedQuery, fetchSearchResults]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setIsDropdownOpen(false);
      setResults([]);
    } else {
      // fetchSearchResults will be called by the debouncedQuery useEffect
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    setIsDropdownOpen(false);
  };

  const handleResultClick = () => {
    setIsDropdownOpen(false);
    setQuery(''); // Optionally clear query after selection
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsDropdownOpen(false);
      navigate(`/search/${encodeURIComponent(query.trim())}`); // Navigate to a full search results page
      setQuery(''); // Clear query after submitting to full search page
    }
  };

  return (
    <div
      ref={searchContainerRef}
      className="relative w-full max-w-xs md:max-w-md lg:max-w-lg"
    >
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-brand-text-secondary" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() =>
            query.trim() && results.length > 0 && setIsDropdownOpen(true)
          } // Re-open if focused and has query/results
          placeholder="Search movies, TV shows..."
          className="block w-full pl-10 pr-10 py-2.5 border-transparent bg-brand-card rounded-full text-brand-text-primary placeholder-brand-text-secondary focus:ring-2 focus:ring-brand-yellow focus:border-transparent focus:outline-none text-sm"
        />
        {query && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-5 w-5 text-brand-text-secondary hover:text-brand-text-primary" />
          </button>
        )}
      </form>

      {isDropdownOpen && (query.trim() || isLoading) && (
        <div className="absolute z-50 mt-1 w-full bg-brand-card rounded-xl shadow-2xl overflow-hidden border border-zinc-700/50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-brand-text-secondary">
              Loading...
            </div>
          )}
          {!isLoading && results.length === 0 && query.trim() && (
            <div className="p-4 text-center text-brand-text-secondary">
              No results found for "{query}".
            </div>
          )}
          {!isLoading && results.length > 0 && (
            <ul>
              {results.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-zinc-700/50 last:border-b-0"
                >
                  <Link
                    to={`/${item.media_type}/${item.id}`}
                    onClick={handleResultClick}
                    className="flex items-center p-3 hover:bg-zinc-700/30 transition-colors duration-150"
                  >
                    <img
                      src={getImageUrl(item.poster_path, 'w92')} // Use a small poster size
                      alt={item.title || item.name}
                      className="w-10 h-15 object-cover rounded-sm mr-3 flex-shrink-0 bg-zinc-700"
                      onError={(e) => {
                        e.target.style.display =
                          'none'; /* Hide if image fails */
                      }}
                    />
                    <div className="flex-grow overflow-hidden">
                      <h4 className="text-sm font-semibold text-brand-text-primary truncate">
                        {item.title || item.name}
                      </h4>
                      <p className="text-xs text-brand-text-secondary">
                        {item.media_type === 'movie' ? 'Movie' : 'TV Show'}
                        {item.release_date &&
                          ` • ${new Date(item.release_date).getFullYear()}`}
                        {item.first_air_date &&
                          ` • ${new Date(item.first_air_date).getFullYear()}`}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
              {!isLoading && query.trim() && results.length > 0 && (
                <li className="border-t border-zinc-700/50">
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full text-left p-3 text-sm text-brand-yellow hover:bg-zinc-700/30 transition-colors"
                  >
                    See all results for "{query}"
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
