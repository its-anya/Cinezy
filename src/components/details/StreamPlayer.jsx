import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { STREAMING_PROVIDERS } from '../../services/streamingApi';

const StreamPlayer = ({
  mediaType,
  title,
  streamEmbedUrl,
  seasons,
  selectedSeason,
  selectedEpisode,
  onSeasonChange,
  onEpisodeChange,
  episodesForSelectedSeason,
  onClose,
  onError,
  onProviderChange,
  selectedProvider,
}) => {
  mediaType = mediaType === 'anime' ? 'tv' : mediaType;
  return (
    <section id="video-player-section" className="container mx-auto md:px-8 lg:px-12 py-8 md:py-12">
     <div className="flex justify-between items-center p-4 bg-black/50">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full"
          aria-label="Close player"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {mediaType === "tv" && seasons?.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-brand-card rounded-lg">
          <div>
            <label
              htmlFor="season-select"
              className="block text-sm font-medium text-brand-text-secondary mb-1"
            >
              Season:
            </label>
            <select
              id="season-select"
              value={selectedSeason}
              onChange={(e) => {
                onSeasonChange(Number(e.target.value));
                onEpisodeChange(1);
              }}
              className="bg-zinc-700 border border-zinc-600 text-white text-sm rounded-lg focus:ring-brand-yellow focus:border-brand-yellow block w-full p-2.5"
            >
              {seasons
                .filter((s) => s.season_number > 0 && s.episode_count > 0)
                .map((season) => (
                  <option key={season.id} value={season.season_number}>
                    {season.name || `Season ${season.season_number}`} (
                    {season.episode_count} ep.)
                  </option>
                ))}
            </select>
          </div>
          {episodesForSelectedSeason.length > 0 && (
            <div>
              <label
                htmlFor="episode-select"
                className="block text-sm font-medium text-brand-text-secondary mb-1"
              >
                Episode:
              </label>
              <select
                id="episode-select"
                value={selectedEpisode}
                onChange={(e) => onEpisodeChange(Number(e.target.value))}
                className="bg-zinc-700 border border-zinc-600 text-white text-sm rounded-lg focus:ring-brand-yellow focus:border-brand-yellow block w-full p-2.5"
              >
                {episodesForSelectedSeason.map((epNum) => (
                  <option key={epNum} value={epNum}>
                    Episode {epNum}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      
      <div className="aspect-video flex flex-col bg-black rounded-lg overflow-hidden shadow-2xl">
        <div className="flex-1 relative">
        {streamEmbedUrl && (
          <iframe
            id="video-iframe"
            key={streamEmbedUrl}
            src={streamEmbedUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen"
            referrerPolicy="origin"
            loading="eager"
          />
        )}
        </div>
      </div>

      {/* Server buttons like hikashow */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {STREAMING_PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onProviderChange(provider.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedProvider === provider.id
                ? "bg-red-600 text-white"
                : "bg-zinc-800 hover:bg-zinc-700 text-white"
            }`}
          >
            {provider.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default StreamPlayer;