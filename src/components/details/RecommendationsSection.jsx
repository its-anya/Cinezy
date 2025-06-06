import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import MovieCard from '../MovieCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const RecommendationsSection = ({ items, mediaType, title }) => {
  return (
    <section className="container mx-2 md:mx-auto lg:mx-auto px-4 md:px-8 lg:px-12 py-5 md:py-6">
      <div className="flex justify-between items-center mt-4 mb-4">
        <h2 className="text-2xl md:text-3xl -ml-4 font-semibold">
          {title}
        </h2>
        <div className="items-center gap-2 hidden md:flex lg:flex">
          <button 
            className="recommendations-prev bg-brand-card rounded-full p-2 hover:bg-brand-card/80 transition-colors" 
            aria-label="Previous recommendations"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button 
            className="recommendations-next bg-brand-card rounded-full p-2 hover:bg-brand-card/80 transition-colors" 
            aria-label="Next recommendations"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, FreeMode]}
        navigation={{ 
          prevEl: ".recommendations-prev", 
          nextEl: ".recommendations-next" 
        }}   
        freeMode={true}
        spaceBetween={16}
        slidesPerView={"auto"}
        className="!-mx-4 px-4 recommendations-swiper"
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className="!w-[150px] sm:!w-[160px] md:!w-[180px]"
          >
            <MovieCard
              item={item}
              mediaType={item.media_type || mediaType}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RecommendationsSection;