import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import MemberCard from "../components/MemberCard";
import MiniNavbar from "../components/MiniNavbar";
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
        // Refresh AOS after dynamic content changes to avoid elements staying faded
        // Small timeout lets the DOM update before AOS recalculates
        setTimeout(() => {
            try { AOS.refreshHard(); } catch {}
        }, 0);
    }, [selected])

    // Compute balanced executive rows, max 4 per row, extras on last row
    const getExecutiveRows = (members) => {
        const execs = members.filter(m => !m.role.endsWith("Director"));
        const n = execs.length;
        if (n === 0) return [];
        const maxPerRow = 4;
        const rows = Math.ceil(n / maxPerRow);
        if (rows <= 1) return [execs];
        const base = Math.floor(n / rows);
        const extra = n % rows;
        const sizes = Array.from({ length: rows }, (_, i) => base + (i >= rows - extra ? 1 : 0));
        const chunks = [];
        let idx = 0;
        for (const size of sizes) {
            chunks.push(execs.slice(idx, idx + size));
            idx += size;
        }
        return chunks;
    }

    

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
            {name: "Noah Yu", role: "", image: "/headshots/cofounders/Noah.jpg"}
        ],
        sponsorships: [
            {name: "Jason Wu", role: "Director", image: "/headshots/sponsorship/Jason.jpg"},
            {name: "Hayden Shalinksy", role: "Executive", image: "/headshots/sponsorship/Hayden.jpg"},
            {name: "Bianca Rotariu", role: "Executive", image: "/headshots/sponsorship/Bianca.jpg"},
            {name: "Ivan Bardziyan", role: "Executive", image: "/headshots/sponsorship/IvanBardziyanHeadshot.jpg"},
        ],
        marketing: [
            {name: "Gabriel Soler", role: "Director", image: "/headshots/marketing/Gabriel(Gabe)_Soler.jpg"},
            {name: "Cheuk Chi Chan", role: "Executive", image: "/headshots/marketing/Cheuk_Chi_Chan(Tracy).jpg"},
            {name: "Phoebe Chan", role: "Executive", image: "/headshots/marketing/Phoebe_Chan.jpg"},
            {name: "Hailey Tien", role: "Executive", image: "/headshots/marketing/Hailey_Tien.jpg"},
            {name: "Jack Chen", role: "Executive", image: "/headshots/marketing/Jack_Chen.jpg"},
            {name: "Karelle Ngakam Samashi", role: "Executive", image: "/headshots/marketing/Karelle_Ngakam_Samashi.jpg"},
            {name: "Ron Prrenjasi", role: "Executive", image: "/headshots/marketing/Ron Prrenjasi.jpg"},
            {name: "Latha Suvarna", role: "Executive", image: "/headshots/marketing/Latha Suvarna.jpg"}
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
            {name: "Teagan Wright", role: "Director", image: "/headshots/hackathon/Teagan.jpg"},
            {name: "Katrina Jin", role: "Executive", image: "/headshots/hackathon/katrina.JPG"},
            {name: "Manreet Gill", role: "Executive", image: "/headshots/hackathon/Manreet.jpg"},
            {name: "Kevin Valencia", role: "Executive", image: "/headshots/hackathon/Kevin_Valencia.jpg"},
            {name: "Anah Merchant", role: "Executive", image: "/headshots/hackathon/Anah Merchant.jpg"}
        ],
        website: [
            {name: "Keenan Yang", role: "Executive", image: "/headshots/website/Keenan.jpg"},
            {name: "Serena Sanchez", role: "Executive", image: "/headshots/website/Serena.jpg"},
            {name: "Daniel Vargas", role: "Executive", image: "/headshots/website/Daniel.jpg"},
            {name: "Mukitur Rahman", role: "Executive", image: "/headshots/website/Mukitur.jpg"}
        ]


    }
    

    // Preload all team headshots once to avoid flicker when switching
    useEffect(() => {
        const urls = new Set();
        Object.values(teamData).forEach(list => {
            list.forEach(m => urls.add(m.image));
        });
        urls.forEach((url) => {
            const img = new Image();
            img.decoding = 'async';
            img.src = url;
            if (img.decode) {
                img.decode().catch(() => {});
            }
        });
    }, []);

    // Derive layout metrics for responsive vertical spacing based on rows
    const execRows = getExecutiveRows(teamData[selected]);
    const directorCount = teamData[selected].filter(m => m.role.endsWith("Director")).length;
    const totalRows = (directorCount > 0 ? 1 : 0) + (execRows.length || 0);
    const lgMinHClass = totalRows <= 1
        ? 'lg:min-h-[70vh] 2xl:min-h-[45vh]'
        : totalRows >= 2
        ? 'lg:min-h-[80vh] 2xl:min-h-[60vh] 2xl:mb-[5rem]'
        : 'lg:min-h-0';
    const justifyClass = totalRows >= 3 ? 'justify-start' : 'justify-center';

    return (
        <div className="pb-[10%] lg:pb-0 min-h-full flex flex-col"> 
        <title>Our Team - Queen's UX Club</title>
        <CustomCursor />
            <section className="mb-[60px] " data-aos="fade-right">
                <h1 className="">Our Team</h1>
                <p className="red-text">Meet the amazing people behind QUX</p>
                <MiniNavbar options={navOptions} selected={selected} setSelected={setSelected} width="750px"/>
                <div className="mobile-dropdown">
                    <Dropdown options={navOptions} selected={selected} setSelected={setSelected} />
                </div>
            </section>
            <section className={`mt-[70px] lg:mt-0 flex-1 flex flex-col ${justifyClass} items-center gap-[66.93px] ${lgMinHClass}`} data-aos="fade-up">
                {/* Desktop layout: Directors and Executives in separate rows */}
                <div className={` w-[40%] desktop-only`}>
                    {teamData[selected].map((director, index) => (
                            director.role.endsWith("Director") && <MemberCard key={index} name={director.name} role={director.role} headshot={director.image}/>            
                    ))}
                </div>

                {execRows.map((row, rIndex) => (
                    <div key={rIndex} className={"executive-row desktop-only w-full"}>
                        {row.map((member, index) => (
                            <MemberCard key={`${rIndex}-${index}`} name={member.name} role={member.role} headshot={member.image}/>
                        ))}
                    </div>
                ))}

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
