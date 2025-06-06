import React from 'react';
import { PlayIcon, PlusIcon } from '@heroicons/react/24/outline';

const MediaActions = ({ onPlayStream, onPlayTrailer, hasStreamUrl }) => {
  return (
    <div className="flex items-center justify-start gap-2 md:gap-4 lg:mt-4 overflow-x-auto no-scrollbar">
      <button
        onClick={onPlayStream}
        className="bg-brand-orange text-white px-3 py-2 md:px-6 md:py-2.5 rounded-md font-semibold flex items-center space-x-1 md:space-x-2 hover:opacity-90 transition-opacity text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        disabled={!hasStreamUrl}
      >
        <PlayIcon className="w-4 h-4 md:w-5 md:h-5" />
        <span>Watch</span>
      </button>
      
      {onPlayTrailer && (
        <button
          onClick={onPlayTrailer}
          className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 md:px-6 md:py-2.5 rounded-md font-semibold flex items-center space-x-1 md:space-x-2 hover:bg-white/30 transition-colors text-sm md:text-base flex-shrink-0"
        >
          <PlayIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span>Trailer</span>
        </button>
      )}
      
      <button
        className="bg-white/10 backdrop-blur-sm text-white px-3 py-2 md:px-6 md:py-2.5 rounded-md font-semibold flex items-center space-x-1 md:space-x-2 hover:bg-white/20 transition-colors text-sm md:text-base flex-shrink-0"
        onClick={() => alert('Add to watchlist (not implemented)')}
      >
        <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
        <span>Watchlist</span>
      </button>
    </div>
  );
};

export default MediaActions;