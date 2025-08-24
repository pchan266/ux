import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import CustomCursor from "../components/customCursor";
import "../styles/projects.css";



function Projects() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        })
    }, [])


    return (
        <div className="project-main-container"> 
        <CustomCursor />
            <section className="mb-[33px] " data-aos="fade-right">
                <h1 className="md:h-[75px]   h-[50px]">Projects</h1>
                <p className="red-text">Currently building...</p>
            </section>
            <section className="mt-[70px] flex flex-col items-center gap-[66.93px] overflow-hidden" data-aos="fade-up">
                    <img 
                        src="/projects-construction-stars.svg" 
                        alt="Construction stars" 
                        className="construction-stars"
                    />
            </section>
        </div>
    )
}

export default Projects;