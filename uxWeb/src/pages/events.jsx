import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import PrevEventCarousel from "../components/EventCarouselDouble";
import MobileEventCarousel from "../components/EventCarouselMobile";
import UpcomingEventCarousel from "../components/EventCarouselSingle";
import MiniNavbar from "../components/MiniNavbar";
import CustomCursor from "../components/customCursor";
import eventsData from "../data/events.json";
import "../styles/events.css";


export default function Events () {
    const [selected, setSelected] = useState("events")
    const [isMobile, setIsMobile] = useState(false);

    // Parse events and categorize by date
    const parseEvents = () => {
        const today = new Date();
        const upcoming = [];
        const previous = [];

        eventsData.events.forEach(event => {
            const eventDate = new Date(event.date);
            if (eventDate >= today) {
                upcoming.push(event);
            } else {
                previous.push(event);
            }
        });

        // Sort upcoming events by date (earliest first)
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
        // Sort previous events by date (most recent first)
        previous.sort((a, b) => new Date(b.date) - new Date(a.date));

        return { upcoming, previous };
    };

    const { upcoming, previous } = parseEvents();

    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
        })

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

    const navOptions = [
        {label: "Events", value: "events"},
        {label: "Workshops", value: "workshops"}
    ];

    return (
        <div className="min-h-[1330px] overflow-x-hidden" id="hero"  >
            <title>Events - Queen's UX Club</title>
            <CustomCursor />
            <section className="mb-[33px]" data-aos="fade-right">
                <h1>Events and Workshops</h1>
                <p className="red-text">Explore opportunities to learn UX research and design</p>
                <MiniNavbar options={navOptions} selected={selected} setSelected={setSelected}/>
            </section>
            
            <section data-aos="fade-left">
                <h2 className="event-category-title">Upcoming {selected[0].toUpperCase() + selected.slice(1)}</h2>
                <div className="flex items-center justify-center mt-[59px]">
                    {/* Temporarily hidden - show "Coming Soon" instead */}
                    {false && (isMobile ? (
                        <MobileEventCarousel cardNum={upcoming.length} events={upcoming} />
                    ) : (
                        <UpcomingEventCarousel cardNum={upcoming.length} events={upcoming} />
                    ))}
                    
                    {/* Coming Soon message */}
                    <div className="py-20 flex flex-col items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-4xl font-semibold text-gray-700 mb-4">Coming Soon</h3>
                            <p className="text-lg text-gray-500 max-w-md">
                                We're working on some exciting events and workshops. Stay tuned for updates!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-[5%]" data-aos="fade-up">
                <h2 className="event-category-title">Previous {selected[0].toUpperCase() + selected.slice(1)}</h2>
                <div className="flex items-center justify-center mt-[59px]">
                    {isMobile ? (
                        <MobileEventCarousel cardNum={previous.length} events={previous} />
                    ) : (
                        <PrevEventCarousel cardNum={previous.length} events={previous} />
                    )}
                </div>
            </section>
         

        </div> 
    )
}