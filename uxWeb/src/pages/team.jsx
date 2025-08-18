import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import MemberCard from "../components/MemberCard";
import MiniNavbar from "../components/MiniNavbar";
import CustomCursor from "../components/customCursor";
import "../styles/team.css";


function Team() {
    const [selected, setSelected] = useState("cofounders");
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        })
    }, [])

    const navOptions = [
        {label: "Co-Founders", value: "cofounders"},
        {label: "Sponsorships", value: "sponsorships"},
        {label: "Marketing", value: "marketing"},
        {label: "Events", value: "events"},
        {label: "Hackathon", value: "hackathon"},
        {label: "Website", value: "website"}
    ];

    const teamData = {
        cofounders: [
            {name: "Alice", role: "Executive", image: "/image-url-here"},
            {name: "John", role: "Executive", image: "/image-url-here"},
            {name: "Holly", role: "Executive", image: "/image-url-here"},
            {name: "Gabe", role: "Executive", image: "/image-url-here"}
        ],
        sponsorships: [
            {name: "Eli", role: "Director", image: "/image-url-here"},
            {name: "Fay", role: "Executive", image: "/image-url-here"},
            {name: "John", role: "Executive", image: "/image-url-here"},
            {name: "Holly", role: "Executive", image: "/image-url-here"},
        ],
        marketing: [
            {name: "Eli", role: "Director", image: "/image-url-here"},
            {name: "Fay", role: "Executive", image: "/image-url-here"},
            {name: "John", role: "Executive", image: "/image-url-here"},
            {name: "Holly", role: "Executive", image: "/image-url-here"},
            {name: "Holly", role: "Executive", image: "/image-url-here"},
            {name: "Holly", role: "Executive", image: "/image-url-here"}
        ],
        events: [
            {name: "Eli", role: "Director", image: "/image-url-here"},
            {name: "Fay", role: "Executive", image: "/image-url-here"},
            {name: "John", role: "Executive", image: "/image-url-here"},
            {name: "Holly", role: "Executive", image: "/image-url-here"},
        ],
        hackathon: [
            {name: "Eli", role: "Director", image: "/image-url-here"},
            {name: "Fay", role: "Executive", image: "/image-url-here"},
            {name: "John", role: "Executive", image: "/image-url-here"},
            {name: "Holly", role: "Executive", image: "/image-url-here"},
        ],
        website: [
            {name: "Alice", role: "Executive", image: "/image-url-here"},
            {name: "John", role: "Executive", image: "/image-url-here"},
            {name: "Holly", role: "Executive", image: "/image-url-here"},
            {name: "Gabe", role: "Executive", image: "/image-url-here"}
        ]


    }
    
    const director = teamData[selected].find((member) => member.role === "Director");

    return (
        <div className="pb-[10%]"> 
        <CustomCursor />
            <section className="mb-[33px] " data-aos="fade-right">
                <h1 className="">Our Team</h1>
                <p className="red-text">Meet the amazing people behind QUX</p>
                <MiniNavbar options={navOptions} selected={selected} setSelected={setSelected} width="750px"/>
            </section>
            <section className="mt-[33px] flex flex-col items-center gap-[66.93px]" data-aos="fade-up">
                {director && <MemberCard name={director.name} role={director.role}/>}

                <div className={`executive-row ${teamData[selected].length == 4 ? "w-[50%]" : "w-[65%]"} ${!director ? "mt-[5%]" : ""}`}>
                    {teamData[selected].map((member, index) => (
                        member.role != "Director" && <MemberCard name={member.name} role={member.role}/>            
                    ))}
                </div>

            </section>
        </div>
    )
}

export default Team;