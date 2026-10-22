import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useMemo } from "react";
import MobileEventCarousel from "../components/EventCarouselMobile";
import UpcomingEventCarousel from "../components/EventCarouselSingle";
import CustomCursor from "../components/customCursor";
import "../styles/events.css";
import Carousel from "../components/PrevEventCarousel";
import EventCard from "../components/EventCard";

export default function Events() {
  const selected = "events";
  const [isMobile, setIsMobile] = useState(false);

  const [upcoming, setUpcoming] = useState([]);
  const [previous, setPrevious] = useState([]);

  // Parse events and categorize by date
  const parseEvents = (data) => {
    const today = new Date();
    const upcomingArr = [];
    const previousArr = [];

    data.forEach((event) => {
      const eventDate = new Date(event.date);
      if (eventDate >= today) {
        upcomingArr.push(event);
      } else {
        previousArr.push(event);
      }
    });

    // Sort upcoming events by date (earliest first)
    upcomingArr.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Sort previous events by date (most recent first)
    previousArr.sort((a, b) => new Date(b.date) - new Date(a.date));

    setUpcoming(upcomingArr);
    setPrevious(previousArr);
  };

  useEffect(() => {
    let active = true;

    fetch("/api/events")
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (active) parseEvents(data.events ?? []);
      })
      .catch((error) => {
        console.error("Could not load events", error);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const checkMobile = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setIsMobile(width <= 1000);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sortedEvents = useMemo(() => {
    if (!previous || previous.length === 0) return [];
    return [...previous].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [previous]);

  return (
    <div className="min-h-[1330px] overflow-x-clip" id="hero">
      <title>Events - Queen's UX Club</title>
      <CustomCursor />
      <section className="mb-[33px]" data-aos="fade-right">
        <h1>Events and Workshops</h1>
        <p className="red-text">
          Explore opportunities to learn UX research and design
        </p>
      </section>

      <section data-aos="fade-left">
        <h2 className="event-category-title">
          Upcoming {selected[0].toUpperCase() + selected.slice(1)}
        </h2>
        <div className="flex items-center justify-center mt-[59px]">
          {upcoming.length > 0 &&
            (isMobile ? (
              <MobileEventCarousel
                cardNum={upcoming.length}
                events={upcoming}
              />
            ) : (
              <UpcomingEventCarousel
                cardNum={upcoming.length}
                events={upcoming}
              />
            ))}

          {/* Coming Soon message */}
          {upcoming.length > 0 ? null : (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="text-center">
                <h3 className="text-4xl font-semibold text-gray-700 mb-4">
                  Coming Soon
                </h3>
                <p className="text-lg text-gray-500 max-w-md">
                  We're working on some exciting events and workshops. Stay
                  tuned for updates!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="pb-[5%]" data-aos="fade-up">
        <h2 className="event-category-title">
          Previous {selected[0].toUpperCase() + selected.slice(1)}
        </h2>
        <div className="flex items-center justify-center mt-[59px]">
          {isMobile ? (
            <MobileEventCarousel cardNum={previous.length} events={previous} />
          ) : (
            <Carousel visibleItemsCount={3} withIndicator isInfinite>
              {sortedEvents.map((event, index) => (
                <div
                  key={`${event.id || event.title}-${index}`}
                  className="px-4 py-6 h-[42rem]"
                >
                  <EventCard type="previous" eventData={event} />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </section>
    </div>
  );
}
