import { useState, useMemo, useEffect } from "react";
import EventCard from "./EventCard";
import "../styles/events.css";

export default function EventCarouselDouble({ cardNum, events = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const cardWidth = 433;
  const gap = 100;
  const cardPlusGap = cardWidth + gap;
  
  // Sort events by date (earliest first)
  const sortedEvents = useMemo(() => {
    if (events.length === 0) return [];
    
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events]);

  const originalEventCount = sortedEvents.length;
  
  // Create a large enough array to avoid boundary issues
  // We'll use a much larger array and use modulo to create infinite effect
  const displayEvents = useMemo(() => {
    if (sortedEvents.length === 0) return [];
    
    // Create a large array (10 copies) to ensure we never hit boundaries
    const copies = 10;
    const extendedEvents = [];
    
    for (let i = 0; i < copies; i++) {
      extendedEvents.push(...sortedEvents);
    }
    
    return extendedEvents;
  }, [sortedEvents]);

  const totalDisplayEvents = displayEvents.length;
  
  // Calculate the starting position (middle of the large array)
  const startPosition = Math.floor(totalDisplayEvents / 2);

  useEffect(() => {
    // Set initial position to the middle of the large array
    if (originalEventCount > 0) {
      setCurrentSlide(startPosition);
    }
  }, [startPosition, originalEventCount]);

  // Periodic reset to keep the carousel within reasonable bounds
  useEffect(() => {
    const resetInterval = setInterval(() => {
      setCurrentSlide(prev => {
        // If we're too far from the center, reset to center
        const center = Math.floor(totalDisplayEvents / 2);
        const distanceFromCenter = Math.abs(prev - center);
        
        // If we're more than 3 original sets away from center, reset
        if (distanceFromCenter > originalEventCount * 3) {
          return center;
        }
        
        return prev;
      });
    }, 30000); // Reset every 30 seconds if needed

    return () => clearInterval(resetInterval);
  }, [totalDisplayEvents, originalEventCount]);

  const goToNext = () => {
    setCurrentSlide(prev => prev + 1);
  };

  const goToPrevious = () => {
    setCurrentSlide(prev => prev - 1);
  };

  const goToSlide = (slideIndex) => {
    // Convert original event index to display array index
    // Find the closest position in the display array that corresponds to this slide
    const targetPosition = startPosition + slideIndex;
    setCurrentSlide(targetPosition);
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

  // Calculate which original event is currently visible for dots
  const getCurrentEventIndex = () => {
    return currentSlide % originalEventCount;
  };

  // Don't render if we don't have events
  if (sortedEvents.length === 0) {
    return <div className="relative w-full h-[559px] flex items-center justify-center">
      <p className="text-gray-500">No events available</p>
    </div>;
  }

  return (
    <div className="relative w-full">
      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
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
            {displayEvents.map((event, index) => (
              <div
                key={`${event.title}-${event.date}-${index}`}
                className="shrink-0 w-[433px] h-[559px] transition-all duration-500 select-none"
                style={{ 
                  filter: getBlurForCard(index),
                  opacity: getOpacityForCard(index)
                }}
              >
                <EventCard type="previous" eventData={event} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      {sortedEvents.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {sortedEvents.map((_, index) => {
            const currentEventIndex = getCurrentEventIndex();
            const isActive = index === currentEventIndex || index === (currentEventIndex + 1) % originalEventCount;
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