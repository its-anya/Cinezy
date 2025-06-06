// src/components/CastCard/CastCard.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext';
// import placeholderAvatar from '../../assets/placeholder-avatar.png'; // Add a placeholder avatar image

const CastCard = ({ actor }) => {
  const { getImageUrl } = useAppContext();

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
  };

  return (
    <div className="flex flex-col items-center text-center w-full">
      <div className="size-20 md:size-28 rounded-full overflow-hidden mb-2 shadow-lg border-2 border-gray-700">
        <img
          src={getImageUrl(actor.profile_path, 'w185')}
          alt={actor.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <h4 className="text-sm md:text-base font-semibold text-white truncate w-full">
        {actor.name}
      </h4>
      <p className="text-xs md:text-sm text-brand-text-secondary truncate w-full">
        {actor.character}
      </p>
    </div>
  );
};

export default CastCard;
