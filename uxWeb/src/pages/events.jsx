import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import PrevEventCarousel from "../components/EventCarouselDouble";
import MobileEventCarousel from "../components/EventCarouselMobile";
import UpcomingEventCarousel from "../components/EventCarouselSingle";
import MiniNavbar from "../components/MiniNavbar";
import CustomCursor from "../components/customCursor";
import "../styles/events.css";


export default function Events () {
    const [selected, setSelected] = useState("events")
    const [isMobile, setIsMobile] = useState(false);

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
                    
                    {isMobile ? (
                        <MobileEventCarousel cardNum={5} />
                    ) : (
                        <UpcomingEventCarousel cardNum={7} />
                    )}
                </div>
            </section>
            <section className="mb-[244px]" data-aos="fade-up">
                <h2 className="event-category-title">Previous {selected[0].toUpperCase() + selected.slice(1)}</h2>
                <div className="flex items-center justify-center mt-[59px]">
                    {isMobile ? (
                        <MobileEventCarousel cardNum={5} />
                    ) : (
                        <PrevEventCarousel cardNum={8} type="previous" />
                    )}
                </div>
            </section>
         

        </div> 
    )
}