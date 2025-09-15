import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import MemberCard from "../components/MemberCard";
import MiniNavbar from "../components/MiniNavbar";
import Dropdown from "../components/Dropdown";
import CustomCursor from "../components/customCursor";
import "../styles/team.css";


function Team() {
    const [selected, setSelected] = useState("cofounders");
    const [execCount, setExecCount] = useState(0)
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        })
    }, [])

    useEffect(() => {
        setExecCount(teamData[selected].filter(m => !m.role.endsWith("Director")).length);
    }, [selected])

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
            {name: "Renee Kim", role: "", image: "./headshots/cofounders/Renee.jpg"},
            {name: "Amanda Zhu", role: "", image: "/headshots/cofounders/IMG_8919.JPG"},
            {name: "Amanda Li", role: "", image: "/headshots/cofounders/Amanda.jpg"},
            {name: "Noah Yu", role: "", image: "/headshots/cofounders/Noah.jpeg"}
        ],
        sponsorships: [
            {name: "Jason Wu", role: "Director", image: "/headshots/sponsorship/Jason.jpeg"},
            {name: "Hayden Shalinksy", role: "Executive", image: "/headshots/sponsorship/Hayden.jpg"},
            {name: "Bianca Rotariu", role: "Executive", image: "/headshots/sponsorship/Bianca.jpg"},
            {name: "Ivan Bardziyan", role: "Executive", image: "/headshots/sponsorship/IvanBardziyanHeadshot.jpg"},
        ],
        marketing: [
            {name: "Gabriel Soler", role: "Director", image: "/headshots/marketing/Gabriel(Gabe)_Soler.png"},
            {name: "Cheuk Chi Chan", role: "Executive", image: "/headshots/marketing/Cheuk_Chi_Chan(Tracy).jpg"},
            {name: "Phoebe Chan", role: "Executive", image: "/headshots/marketing/Phoebe_Chan.jpeg"},
            {name: "Hailey Tien", role: "Executive", image: "/headshots/marketing/Hailey_Tien.jpeg"},
            {name: "Jack Chen", role: "Executive", image: "/headshots/marketing/Jack_Chen.jpg"},
            {name: "Karelle Ngakam Samashi", role: "Executive", image: "/headshots/marketing/Karelle_Ngakam_Samashi.jpg"}
        ],
        events: [
            {name: "Mabel Hong", role: "Director", image: "/headshots/events/Mabel.jpg"},
            {name: "Dr. Sina Azimi", role: "UX Research Director", image: "/headshots/events/Dr. Sina Azimi.jpg"},
            {name: "Lilyana Boraniev", role: "Research Executive", image: "/headshots/events/Lilyana.jpg"},
            {name: "Shillisa Chapagain", role: "Executive", image: "/headshots/events/Shallisa.jpg"},
            {name: "Simone Jiang", role: "Executive", image: "/headshots/events/Simone_.jpg"},
            {name: "Jason Chen", role: "Executive", image: "/headshots/events/Jason.jpg"},
        ],
        hackathon: [
            {name: "Teagan Wright", role: "Director", image: "/headshots/hackathon/Teagan.jpeg"},
            {name: "Katrina Jin", role: "Executive", image: "/headshots/hackathon/katrina.JPG"},
            {name: "Elrich Ka Lung Chen", role: "Executive", image: "/headshots/hackathon/elrich.jpg"},
            {name: "Manreet Gill", role: "Executive", image: "/headshots/hackathon/Manreet.jpeg"},
            {name: "Kevin Valencia", role: "Executive", image: "/headshots/hackathon/Kevin_Valencia.png"}
        ],
        website: [
            {name: "Keenan Yang", role: "Executive", image: "/headshots/website/Keenan.jpg"},
            {name: "Serena Sanchez", role: "Executive", image: "/headshots/website/Serena.png"},
            {name: "Daniel Vargas", role: "Executive", image: "/headshots/website/Daniel.jpg"},
            {name: "Mukitur Rahman", role: "Executive", image: "/headshots/website/Mukitur.jpg"}
        ]


    }
    

    return (
        <div className="pb-[10%]"> 
        <title>Our Team - Queen's UX Club</title>
        <CustomCursor />
            <section className="mb-[33px] " data-aos="fade-right">
                <h1 className="">Our Team</h1>
                <p className="red-text">Meet the amazing people behind QUX</p>
                <MiniNavbar options={navOptions} selected={selected} setSelected={setSelected} width="750px"/>
                <div className="mobile-dropdown">
                    <Dropdown options={navOptions} selected={selected} setSelected={setSelected} />
                </div>
            </section>
            <section className="mt-[70px] flex flex-col items-center gap-[66.93px]" data-aos="fade-up">
                {/* Desktop layout: Directors and Executives in separate rows */}
                <div className={` w-[40%] desktop-only`}>
                    {teamData[selected].map((director, index) => (
                            director.role.endsWith("Director") && <MemberCard key={index} name={director.name} role={director.role} headshot={director.image}/>            
                    ))}
                </div>

                <div className={`executive-row ${teamData[selected].length === 4 ? "w-[50%]" : "w-[65%]"} 
                ${execCount > 4 ? "max-w-[55%] min-[2000px]:max-w-[80%] flex flex-wrap-reverse justify-center " : ""} desktop-only`}>
                    {teamData[selected].map((member, index) => (
                        !member.role.endsWith("Director") && <MemberCard key={index} name={member.name} role={member.role} headshot={member.image}/>            
                    ))}
                </div>

                {/* iPad layout: All members in one row */}
                <div className="executive-row ipad-only w-full">
                    {teamData[selected].map((member, index) => (
                        <MemberCard key={index} name={member.name} role={member.role} headshot={member.image}/>            
                    ))}
                </div>

                {/* Mobile layout: All members in single column */}
                <div className="mobile-only w-full">
                    {teamData[selected].map((member, index) => (
                        <MemberCard key={index} name={member.name} role={member.role} headshot={member.image}/>            
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Team;