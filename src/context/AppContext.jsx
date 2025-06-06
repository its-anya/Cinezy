// src/context/AppContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getImageUrl as tmdbGetImageUrl } from '../services/tmdbApi';
import api from '../services/tmdbApi'; // For fetching API configuration

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [apiConfig, setApiConfig] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  useEffect(() => {
    api
      .get('/configuration')
      .then((res) => {
        setApiConfig(res.data);
        setLoadingConfig(false);
      })
      .catch((err) => {
        console.error('Failed to fetch TMDB config:', err);
        // Fallback config (less ideal but good for dev if API fails)
        setApiConfig({
          images: {
            base_url: 'http://image.tmdb.org/t/p/',
            secure_base_url: 'https://image.tmdb.org/t/p/',
            backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
            poster_sizes: [
              'w92',
              'w154',
              'w185',
              'w342',
              'w500',
              'w780',
              'original',
            ],
            profile_sizes: ['w45', 'w185', 'h632', 'original'],
          },
        });
        setLoadingConfig(false);
      });
  }, []);

  const getImageUrl = (path, size = 'w500') => {
    if (!apiConfig || !path) {
      // Return a placeholder or null if config not loaded or path is missing
      return 'https://placehold.co/500x750';
    }
    // Ensure size is valid, otherwise use a default
    const SIZES = [
      ...(apiConfig.images.poster_sizes || []),
      ...(apiConfig.images.backdrop_sizes || []),
    ];
    const chosenSize = SIZES.includes(size) ? size : 'original';

    return `${apiConfig.images.secure_base_url}${chosenSize}${path}`;
  };

  return (
    <AppContext.Provider value={{ apiConfig, loadingConfig, getImageUrl }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
