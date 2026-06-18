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
        {label: "Co-Chairs", value: "cochairs"},
        {label: "Website", value: "website"},
        {label: "Sponsorships", value: "sponsorships"},
        {label: "Marketing", value: "marketing"},
        {label: "Events", value: "events"},
        {label: "Hackathon", value: "hackathon"}, 
        {label: "Founders", value: "cofounders"},
        
    ];

    const teamData = {
        cofounders: [
            {name: "Renee Kim", role: "", image: "./headshots/cofounders/Renee.jpg"},
            {name: "Amanda Zhu", role: "", image: "/headshots/cofounders/IMG_8919.JPG"},
            {name: "Amanda Li", role: "", image: "/headshots/cofounders/Amanda.jpg"},
            {name: "Noah Yu", role: "", image: "/headshots/cofounders/Noah.jpg"}
        ],
        cochairs: [
            {name: "Phoebe Chan", role: "", image: "/headshots/cochairs/Phoebe_Chan.jpg"},
            {name: "Shillisa Chapagain", role: "", image: "/headshots/cochairs/Shillisa_Chapagain.jpg"},
            {name: "Tracy Chan", role: "", image: "/headshots/cochairs/Tracy_Chan.jpg"},
        ],
        sponsorships: [
            {name: "Basma Azeem", role: "Director", image: "/headshots/sponsorship/Basma_Azeem.jpg"},

        ],
        marketing: [
            {name: "Ron Prrenjasi", role: "Director", image: "/headshots/marketing/Ron_Prrenjasi.jpg"},
            {name: "Aun Ali", role: "Executive", image: "/headshots/marketing/Aun_Ali.jpeg"},
            {name: "Riya Bangera", role: "Executive", image: "/headshots/marketing/Riya_Bangera.jpg"},
            {name: "Sophie Liang", role: "Executive", image: "/headshots/marketing/Sophie_Liang.jpg"},
            {name: "Kristina Vela", role: "Executive", image: "/headshots/marketing/Kristina_Vela.jpg"},

        ],
        events: [
            {name: "Jennifer Li", role: "Director", image: "/headshots/events/Jennifer_Li.jpg"},
            {name: "Bill Tran", role: "Executive", image: "/headshots/events/Bill_Tran.jpg"},
            {name: "Sydney Robinson", role: "Executive", image: "/headshots/events/Sydney_Robinson.jpeg"},
            {name: "Nilaya Rimal", role: "Executive", image: "/headshots/events/Nilaya_Rimal.jpeg"},
        ],
        hackathon: [
            {name: "Rounika Saxena", role: "Director", image: "/headshots/hackathon/rounika_saxena.jpeg"},
            {name: "Darryl Brown", role: "Executive", image: "/headshots/hackathon/Darryl_Brown.jpeg"},
            {name: "Gopika Batra", role: "Executive", image: "/headshots/hackathon/Gopika_Batra.jpeg"},
            {name: "Henrique Sponchiado", role: "Executive", image: "/headshots/hackathon/Henrique_Silverio_Sponchiado.jpg"},
            {name: "Kayla Burzese", role: "Executive", image: "/headshots/hackathon/Kayla_Burzese.PNG"}
        ],
        website: [
            {name: "Augustine Osezua", role: "Director", image: "/headshots/website/Augustine_Osezua.jpeg"},
            {name: "Aryaman Bhatia", role: "Executive", image: "/headshots/website/Aryaman_Bhatia.JPG"},
            {name: "Ivan Fang", role: "Executive", image: "/headshots/website/Ivan_Fang.jpg"},
            {name: "Mariana Gonzalez", role: "Executive", image: "/headshots/website/Mariana_Gonzalez.jpeg"}
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
