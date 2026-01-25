import { Children, useMemo, useState, useEffect, useRef } from "react";

/**
 * Carousel Component
 * Fixed version: Uses Tailwind CSS to resolve build errors and maintains 
 * the "2 Full + 2 Partial" Figma layout logic.
 */
const Carousel = ({
  children,
  visibleItemsCount = 1, // how many items to show
  isInfinite, // is it an infinite loop?
  withIndicator // show dots?
}) => {
  const indicatorContainerRef = useRef(null);
  
  // Track if a transition is currently happening to prevent button spamming
  const [timeoutInProgress, setTimeoutInProgress] = useState(false);
  
  // A ref to ensure the "Initial Load Jump" only happens once
  const hasInitialized = useRef(false);

  /**
   * Calculate original items count
   */
  const originalItemsLength = useMemo(() => Children.count(children), [children]);

  /**
   * Determine if we should treat this as a repeating/infinite carousel
   */
  const isRepeating = useMemo(
    () => isInfinite && originalItemsLength > visibleItemsCount,
    [children, isInfinite, visibleItemsCount, originalItemsLength]
  );

  /**
   * Current Index state
   */
  const [currentIndex, setCurrentIndex] = useState(
    isRepeating ? visibleItemsCount : 0
  );

  /**
   * Transition state (disabled during jumps to create the infinite illusion)
   */
  const [isTransitionEnabled, setTransitionEnabled] = useState(true);

  /**
   * Swipe state
   */
  const [touchPosition, setTouchPosition] = useState(null);

  /**
   * FIX: INITIALIZATION
   * When the component first gets data, we need to snap to the correct index.
   * We disable transition for this jump to make it instant.
   */
  useEffect(() => {
    if (isRepeating && !hasInitialized.current) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(visibleItemsCount);
      }
      hasInitialized.current = true;
    }
  }, [isRepeating, visibleItemsCount, currentIndex]);

  /**
   * SAFETY WATCHER: The "Freeze" Fix.
   * If the button timeout clears but we are still sitting at a loop boundary,
   * we manually force the swap here to recover the loop.
   * * UPDATED: Now checks for `visibleItemsCount - 1` (tightened left boundary)
   * to avoid running out of clones.
   */
  useEffect(() => {
    if (isRepeating && !timeoutInProgress) {
      if (currentIndex <= visibleItemsCount - 1) {
        setTransitionEnabled(false);
        setCurrentIndex(currentIndex + originalItemsLength);
      } else if (currentIndex >= originalItemsLength + visibleItemsCount) {
        setTransitionEnabled(false);
        setCurrentIndex(currentIndex - originalItemsLength);
      }
    }
  }, [timeoutInProgress, currentIndex, isRepeating, originalItemsLength, visibleItemsCount]);

  /**
   * FIX: TRANSITION TOGGLE
   * Ensures transition is re-enabled after a jump
   */
  useEffect(() => {
    if (isRepeating) {
      // Check if we are at a "Jump Destination" (Real Start or Real End)
      // The Real Start is `visibleItemsCount`.
      // The Real End is `visibleItemsCount + originalItemsLength - 1`.
      // We simply check if we are within the valid "Real" range after a potential jump.
      // Actually, we just need to re-enable transition if it was disabled.
      if (!isTransitionEnabled) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTransitionEnabled(true);
            });
        });
      }
    }
  }, [currentIndex, isRepeating, isTransitionEnabled]);

  /**
   * Indicator dot scroll sync
   */
  useEffect(() => {
    if (withIndicator && indicatorContainerRef.current) {
      const active = indicatorContainerRef.current.querySelector(".dots-active");
      if (active) {
        let index = active.getAttribute("data-index");
        if (index !== null && indicatorContainerRef.current.scrollTo) {
          indicatorContainerRef.current.scrollTo({
            left: ((Number(index) - 2) / 5) * 50,
            behavior: "smooth"
          });
        }
      }
    }
  }, [withIndicator, currentIndex]);

  /**
   * Move forward
   */
  const nextItem = () => {
    if (timeoutInProgress) return;

    // We are on the edge if we are at the last Real Item.
    // Last Real Item index = visibleItemsCount + originalItemsLength - 1.
    const isOnEdgeForward = isRepeating 
      ? currentIndex >= originalItemsLength + visibleItemsCount - 1
      : currentIndex >= originalItemsLength - visibleItemsCount;

    if (isOnEdgeForward) {
        setTimeoutInProgress(true);
        setTimeout(() => setTimeoutInProgress(false), 300);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  /**
   * Move backward
   */
  const previousItem = () => {
    if (timeoutInProgress) return;

    // We are on the edge if we are at the first Real Item.
    // First Real Item index = visibleItemsCount.
    const isOnEdgeBack = isRepeating ? currentIndex <= visibleItemsCount : currentIndex === 0;

    if (isOnEdgeBack) {
        setTimeoutInProgress(true);
        setTimeout(() => setTimeoutInProgress(false), 300);
    }

    setCurrentIndex((prev) => prev - 1);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;
    if (touchDown === null) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) nextItem();
    if (diff < -5) previousItem();
    setTouchPosition(null);
  };

  /**
   * The "Magic" jump logic for infinite scrolling
   */
  const handleTransitionEnd = () => {
    if (isRepeating) {
      // Loop Left: If we hit the clone (or past it), jump to the real item at the end.
      // We loop at `visibleItemsCount - 1` (The first clone) instead of 0
      // because Index 0 runs out of buffer space with the -0.5 offset.
      if (currentIndex <= visibleItemsCount - 1) {
        setTransitionEnabled(false);
        setCurrentIndex(currentIndex + originalItemsLength);
      } 
      // Loop Right: If we hit the start of the post-clones, jump to real start.
      else if (currentIndex >= originalItemsLength + visibleItemsCount) {
        setTransitionEnabled(false);
        setCurrentIndex(currentIndex - originalItemsLength);
      }
    }
    setTimeoutInProgress(false);
  };

  /**
   * Clones for the infinite loop effect
   */
  const extraPreviousItems = useMemo(() => {
    let output = [];
    const childrenArray = Children.toArray(children);
    for (let index = 0; index < visibleItemsCount; index++) {
      output.push(childrenArray[originalItemsLength - 1 - index]);
    }
    output.reverse();
    return output;
  }, [children, originalItemsLength, visibleItemsCount]);

  const extraNextItems = useMemo(() => {
    let output = [];
    const childrenArray = Children.toArray(children);
    for (let index = 0; index < visibleItemsCount; index++) {
      output.push(childrenArray[index]);
    }
    return output;
  }, [children, visibleItemsCount]);

  /**
   * Dot Pagination Logic
   */
  const renderDots = useMemo(() => {
    let output = [];
    const localShow = isRepeating ? visibleItemsCount : 0;
    const localLength = isRepeating ? originalItemsLength : Math.ceil(originalItemsLength / visibleItemsCount);
    
    const calculatedActiveIndex =
      currentIndex - localShow < 0
        ? (originalItemsLength + (currentIndex - localShow)) % originalItemsLength
        : (currentIndex - localShow) % originalItemsLength;

    for (let index = 0; index < localLength; index++) {
      const isActive = Math.abs(calculatedActiveIndex - index) < 0.1;
      output.push(
        <div 
          key={index} 
          data-index={index} 
          className={`transition-all duration-200 rounded-full ${isActive ? 'w-3 h-1.5 bg-gray-600 dots-active' : 'w-1.5 h-1.5 bg-gray-300'}`}
        />
      );
    }
    return output;
  }, [currentIndex, isRepeating, originalItemsLength, visibleItemsCount]);

  const isNextButtonVisible = isRepeating || currentIndex < originalItemsLength - visibleItemsCount;
  const isPrevButtonVisible = isRepeating || currentIndex > 0;

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full relative py-5 group">
        {isPrevButtonVisible && (
          <button
            onClick={previousItem}
            disabled={timeoutInProgress}
            className="absolute left-2.5 z-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
             <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
          </button>
        )}
        
        <div
          className="overflow-hidden w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className="flex will-change-transform"
            style={{
              /* THE FIGMA FIX: Subtracting 0.5 creates the partial card offset on edges */
              transform: `translateX(-${(currentIndex - 0.5) * (100 / visibleItemsCount)}%)`,
              transition: !isTransitionEnabled ? "none" : "all 250ms cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {isRepeating && extraPreviousItems.map((item, idx) => (
               <div key={`extra-prev-${idx}`} className="shrink-0 grow-0" style={{ width: `calc(100% / ${visibleItemsCount})` }}>
                 {item}
               </div>
            ))}
            {Children.map(children, (item, idx) => (
               <div key={`child-${idx}`} className="shrink-0 grow-0" style={{ width: `calc(100% / ${visibleItemsCount})` }}>
                 {item}
               </div>
            ))}
            {isRepeating && extraNextItems.map((item, idx) => (
               <div key={`extra-next-${idx}`} className="shrink-0 grow-0" style={{ width: `calc(100% / ${visibleItemsCount})` }}>
                 {item}
               </div>
            ))}
          </div>
        </div>

        {isNextButtonVisible && (
          <button
            onClick={nextItem}
            disabled={timeoutInProgress}
            className="absolute right-2.5 z-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {withIndicator && (
        <div ref={indicatorContainerRef} className="flex justify-center items-center gap-2 mt-5 h-4 overflow-hidden max-w-[100px] mx-auto">
          {renderDots}
        </div>
      )}
    </div>
  );
};

export default Carousel;