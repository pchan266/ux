import { useState } from "react";
import EventCard from "./EventCard";
import "../styles/events.css";

export default function EventCarouselDouble({ cardNum, events = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardWidth = 433;
  const gap = 100;
  const cardPlusGap = cardWidth + gap;
  const totalSlides = Math.max(0, cardNum - 2);

  const goToNext = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  };

  const goToPrevious = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const getBlurForCard = (index) => {
    if (index >= currentSlide && index <= currentSlide + 1) {
      return "blur(0px)";
    }
    
    // Cards that are partially visible (one before and one after) get blurred
    if (index === currentSlide - 1 || index === currentSlide + 2) {
      return "blur(4px)";
    }
    
    return "blur(8px)";
  };

  const getOpacityForCard = (index) => {
    // Cards that are fully visible
    if (index >= currentSlide && index <= currentSlide + 1) {
      return 1;
    }
    
    // Cards that are partially visible
    if (index === currentSlide - 1 || index === currentSlide + 2) {
      return 0.7;
    }
    
    // Cards that are not visible
    return 0.3;
  };

  return (
    <div className="relative w-full">
      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        disabled={currentSlide === 0}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${
          currentSlide === 0 ? 'opacity-0 cursor-not-allowed' : 'hover:scale-110'
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={goToNext}
        disabled={currentSlide === totalSlides}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${
          currentSlide === totalSlides ? 'opacity-0 cursor-not-allowed' : 'hover:scale-110'
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Carousel Container with Overflow Hidden */}
      <div className="overflow-hidden">
        <div className="flex justify-center">
          <div 
            className="flex gap-[100px] py-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentSlide * cardPlusGap}px + 50% - ${(cardWidth * 2 + gap) / 2}px))`
            }}
          >
            {[...Array(cardNum)].map((_, index) => (
              <div
                key={index}
                className="shrink-0 w-[433px] h-[559px] transition-all duration-500"
                style={{ 
                  filter: getBlurForCard(index),
                  opacity: getOpacityForCard(index)
                }}
              >
                <EventCard type="previous" eventData={events[index]} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      {totalSlides > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(cardNum)].map((_, index) => {
            const isActive = index >= currentSlide && index <= currentSlide + 1;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#A3280C] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}