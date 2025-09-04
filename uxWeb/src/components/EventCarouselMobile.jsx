import { useRef, useEffect, useState } from "react";
import EventCard from "./EventCardMobile";
import "../styles/events.css";

export default function EventCarousel({ cardNum, events = [] }) {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [scrollX, setScrollX] = useState(0);

  const cardWidth = 300;
  const gap = 25;
  const cardPlusGap = cardWidth + gap;

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.scrollBehavior = "auto";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = startX.current - e.pageX;
    containerRef.current.scrollLeft = scrollLeft.current + delta;
    setScrollX(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.userSelect = "auto";
  };

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollX(containerRef.current.scrollLeft);
    }
  };



  return (
    <div id="mobile-carousel" className="relative w-full overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-24 pointer-events-none z-10"></div>

      <div
        ref={containerRef}
        className="flex gap-[25px] overflow-x-scroll py-6 no-scrollbar cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onScroll={handleScroll}
      >
        
        {[...Array(cardNum)].map((_, index) => (
          <div
            key={index}
            className="shrink-0 w-[300px] h-[555px] transition-all duration-200"
          >
            <EventCard eventData={events[index]} />
          </div>
        ))}
        
      </div>
    </div>
  );
}
