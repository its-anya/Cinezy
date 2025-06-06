import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchGenres,
  fetchGenreMovies,
  fetchGenreTVShows,
  fetchAnimeTV,
} from '../services/tmdbApi';

const defaultGenres = {
  movie: 28,
  tv: 10759,
  anime: 16,
};

const isValidGenre = (genreId, genresList) => genresList.some((g) => g.id === genreId);

export const useExplore = (query = 'movie') => {
  const [page, setPage] = useState(1);
  const [activeGenre, setActiveGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [data, setData] = useState({ results: [], total_pages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const requestId = useRef(0);
  const isInitializingGenres = useRef(false); // Flag to prevent race conditions
  const currentQuery = useRef(query);

  // Get the default genre ID for the current query
  const getDefaultGenreId = (mediaType) => {
    if (mediaType === 'movie') return defaultGenres.movie;
    if (mediaType === 'anime') return defaultGenres.anime;
    return defaultGenres.tv;
  };

  // Handle query changes
  useEffect(() => {
    // Check if query actually changed
    const hasQueryChanged = currentQuery.current !== query;
    currentQuery.current = query;
    
    let isMounted = true;
    const thisRequest = ++requestId.current;
    const controller = new AbortController();
    const signal = controller.signal;

    const loadInitialData = async () => {
      // Set flag to prevent second effect from running during initialization
      isInitializingGenres.current = true;
      
      setLoading(true);
      setError(null);
      setPage(1);
      setData({ results: [], total_pages: 0 });
      setActiveGenre(null); // Reset active genre first

      try {
        // 1. First fetch genres
        const mediaType = query === 'anime' ? 'tv' : query;
        const genresRes = await fetchGenres(mediaType, { signal });
        
        if (!isMounted || thisRequest !== requestId.current) return;
        
        const fetchedGenres = genresRes.data.genres || [];
        setGenres(fetchedGenres);

        if (fetchedGenres.length === 0) {
          setError('No genres found.');
          setLoading(false);
          isInitializingGenres.current = false;
          return;
        }

        // 2. Determine which genre to select
        const defaultGenreId = getDefaultGenreId(query);
        const selectedGenreId = isValidGenre(defaultGenreId, fetchedGenres)
          ? defaultGenreId
          : fetchedGenres[0].id;

        // 3. Fetch data for the selected genre directly here
        let dataRes;
        if (query === 'movie') {
          dataRes = await fetchGenreMovies(selectedGenreId, 1, signal);
        } else if (query === 'anime') {
          dataRes = await fetchAnimeTV(selectedGenreId, 1, signal);
        } else {
          dataRes = await fetchGenreTVShows(selectedGenreId, 1, signal);
        }

        if (!isMounted || thisRequest !== requestId.current) return;

        // 4. Set both the data and active genre together
        setData({
          results: dataRes.data.results || [],
          total_pages: Math.min(dataRes.data.total_pages || 1, 500),
        });
        setActiveGenre(selectedGenreId);

      } catch (err) {
        if (!signal.aborted && isMounted && thisRequest === requestId.current) {
          setError(err.response?.data?.status_message || 'Failed to load data');
          setData({ results: [], total_pages: 0 });
        }
      } finally {
        if (isMounted && thisRequest === requestId.current) {
          setLoading(false);
          isInitializingGenres.current = false; // Reset flag
        }
      }
    };

    // Only run if query changed or it's the initial load
    if (hasQueryChanged || activeGenre === null) {
      loadInitialData();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [query]);

  // Handle data fetching when activeGenre or page changes (but NOT during initialization)
  useEffect(() => {
    // Skip if no active genre, or if we're initializing genres, or if it's page 1 and we just set the genre
    if (!activeGenre || isInitializingGenres.current) return;

    let isMounted = true;
    const thisRequest = ++requestId.current;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let res;
        console.log("Fetching data for activeGenre:", activeGenre, "page:", page, "query:", query);
        
        if (query === 'movie') {
          res = await fetchGenreMovies(activeGenre, page, signal);
        } else if (query === 'anime') {
          res = await fetchAnimeTV(activeGenre, page, signal);
        } else {
          res = await fetchGenreTVShows(activeGenre, page, signal);
        }

        if (!isMounted || thisRequest !== requestId.current) return;

        setData({
          results: res.data.results || [],
          total_pages: Math.min(res.data.total_pages || 1, 500),
        });
      } catch (err) {
        if (!signal.aborted && isMounted && thisRequest === requestId.current) {
          setError(err.response?.data?.status_message || 'Failed to fetch data');
          setData({ results: [], total_pages: 0 });
        }
      } finally {
        if (isMounted && thisRequest === requestId.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [activeGenre, page, query]);

  // Handle genre change
  const handleGenreChange = useCallback((genreId) => {
    if (genreId === activeGenre) return;
    setPage(1);
    setActiveGenre(genreId);
  }, [activeGenre]);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    if (newPage < 1 || newPage > (data.total_pages || 1)) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data.total_pages]);

  return {
    page,
    setPage: handlePageChange,
    activeGenre,
    setActiveGenre: handleGenreChange,
    genres,
    data,
    loading,
    error,
  };
};