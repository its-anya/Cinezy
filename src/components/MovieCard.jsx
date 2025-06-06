// src/components/MovieCard/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { StarIcon } from './icons';

const MovieCard = ({ item, mediaType }) => {
  const { getImageUrl } = useAppContext();
  const type = mediaType || item.media_type; // item.media_type comes from trending/multi-search

  if (!item) return null;

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevents future error triggers for this img
    e.target.src = 'https://placehold.co/400x600';
  };

  return (
    <Link to={`/${type}/${item.id}`} className="block group">
      <div className="relative aspect-[2/3] bg-brand-card rounded-lg overflow-hidden shadow-lg transform transition-all duration-300">
        <img
          src={getImageUrl(item.poster_path, 'w500')}
          alt={item.title || item.name}
          className="w-full h-full object-cover group-hover:scale-105 duration-300"
          onError={handleImageError}
          loading="lazy"
        />
        {item.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-brand-yellow text-black text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
            <StarIcon className="w-3 h-3" />
            <span>{item.vote_average.toFixed(1)}</span>
          </div>
        )}
        {/* Optional: Title overlay on hover, or always visible if design needs it */}
        <div className="absolute bottom-0 left-0 right-0 p-2 py-3 bg-gradient-to-t from-zinc-900/90 to-transparent">
          <h3 className="text-white text-sm font-semibold truncate group-hover:whitespace-normal group-hover:line-clamp-2">
            {item.title || item.name}
          </h3>
        </div>
      </div>
      {/* If you want title below the card instead of overlay */}
      {/* <h3 className="mt-2 text-sm font-medium text-brand-text-primary truncate group-hover:text-brand-yellow">
        {item.title || item.name}
      </h3>
      <p className="text-xs text-brand-text-secondary">
        {new Date(item.release_date || item.first_air_date).getFullYear()}
      </p> */}
    </Link>
  );
};

export default MovieCard;
