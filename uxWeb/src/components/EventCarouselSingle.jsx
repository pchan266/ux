import { useRef, useEffect, useState } from "react";
import EventCard from "./EventCard";
import "../styles/events.css";

export default function EventCarousel({ cardNum, events = [] }) {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const initialCenterOffsetRef = useRef(0);

  const [scrollX, setScrollX] = useState(0);

  const cardWidth = 825;
  const gap = 100;
  const cardPlusGap = cardWidth + gap;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateCenterOffset = () => {
      
      const index = 2;
      const containerWidth = container.offsetWidth;
      const centerOffset =
        cardPlusGap * index - (containerWidth - cardWidth) / 2;

      container.scrollLeft = centerOffset;
      initialCenterOffsetRef.current = centerOffset;
      setScrollX(centerOffset);
    };

    updateCenterOffset();

    const resizeObserver = new ResizeObserver(updateCenterOffset);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    scrollLeft.current = containerRef.current.scrollLeft;
    containerRef.current.style.scrollBehavior = "auto";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    hasDragged.current = true;
    const delta = startX.current - e.pageX;
    containerRef.current.scrollLeft = scrollLeft.current + delta;
    setScrollX(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    document.body.style.userSelect = "auto";
    if (!hasDragged.current) return;

    const container = containerRef.current;
    container.style.scrollBehavior = "smooth";

    const deltaScroll = container.scrollLeft - initialCenterOffsetRef.current;
    let index = 2 + Math.round(deltaScroll / cardPlusGap);

    const totalCards = cardNum + 2;
    const firstSnappableIndex = 1;
    const lastSnappableIndex = totalCards;
    index = Math.max(firstSnappableIndex, Math.min(lastSnappableIndex, index));

    const containerWidth = container.offsetWidth;
    const centerOffset =
      cardPlusGap * index - (containerWidth - cardWidth) / 2;

    container.scrollTo({ left: centerOffset, behavior: "smooth" });
    setScrollX(centerOffset);
  };

  const handleScroll = () => {
    setScrollX(containerRef.current.scrollLeft);
  };

  const getBlurForCard = (index) => {
    if (!containerRef.current) return "blur(0px)";
    const containerWidth = containerRef.current.offsetWidth;
    const centerX = scrollX + containerWidth / 2;

    const cardCenter =
      (index + 1) * cardPlusGap - gap / 2 + cardWidth / 2; 

    const distance = Math.abs(centerX - cardCenter);
    const maxDistance = containerWidth / 2 + cardPlusGap;
    const blur = Math.min((distance / maxDistance) * 4, 4); 

    return `blur(${blur.toFixed(2)}px)`;
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-24 pointer-events-none z-10"></div>

      <div
        ref={containerRef}
        className="flex gap-[100px] overflow-x-scroll py-6 no-scrollbar cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onScroll={handleScroll}
      >
        <div className="shrink-0 w-[825px] h-[486px]" />
        {[...Array(cardNum)].map((_, index) => (
          <div
            key={index}
            className="shrink-0 w-[825px] h-[486px] transition-all duration-200"
            style={{
              filter: getBlurForCard(index),
            }}
          >
            <EventCard type="upcoming" eventData={events[index]} />
          </div>
        ))}
        <div className="shrink-0 w-[825px] h-[486px]" />
      </div>
    </div>
  );
}
