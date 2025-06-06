// src/pages/HomePage/HomePage.jsx
import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import CategoryFilter from '../components/CategoryFilter';
import Header from '../components/Header';
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
} from '../services/tmdbApi';

const HomePage = ({onMenuClick}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="pb-16 md:pb-4">
      <Header onMenuClick={onMenuClick}/>
      <HeroBanner />
      <div className="px-2 md:px-4 lg:px-6">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        {(activeCategory === 'all' || activeCategory === 'movie') && (
          <ContentRow
            title="Trending Movies"
            fetchFunction={fetchTrending}
            apiParams={['movie', 'day']}
            mediaType="movie"
          />
        )}
        {(activeCategory === 'all' || activeCategory === 'tv') && (
          <ContentRow
            title="Trending Shows"
            fetchFunction={fetchTrending}
            apiParams={['tv', 'day']}
            mediaType="tv"
          />
        )}
        {(activeCategory === 'all' || activeCategory === 'movie') && (
          <ContentRow
            title="Popular Movies"
            fetchFunction={fetchPopular}
            apiParams={['movie']}
            mediaType="movie"
          />
        )}
        {(activeCategory === 'all' || activeCategory === 'tv') && (
          <ContentRow
            title="Top Rated TV Shows"
            fetchFunction={fetchTopRated}
            apiParams={['tv']}
            mediaType="tv"
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
