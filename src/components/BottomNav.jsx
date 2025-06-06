// src/components/BottomNav.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  FilmIcon, 
  TvIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

const navItems = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/explore/movie', label: 'Movies', icon: FilmIcon },
  { path: '/explore/tv', label: 'TV Shows', mobileLabel: 'TV', icon: TvIcon },
  { path: '/explore/anime', label: 'Anime', icon: SparklesIcon },
  { path: '/search', label: 'Search', icon: MagnifyingGlassIcon },
];

const BottomNav = () => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 360);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-1 left-0 right-0 bg-black/40 mx-auto w-[95%] md:w-[50%] border-t border-zinc-800 z-50 lg:hidden backdrop-blur-md rounded-full">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive: active }) =>
              `flex flex-col items-center justify-center p-2 flex-1 transition-colors ${
                isActive(item.path) 
                  ? 'text-yellow-500' 
                  : 'text-gray-300 hover:text-white'
              }`
            }
          >
            <item.icon className={`w-6 h-6 ${isActive(item.path) ? 'text-yellow-500' : ''}`} />
            <span className="text-xs mt-1 whitespace-nowrap">
              {isSmallScreen && item.mobileLabel ? item.mobileLabel : item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
