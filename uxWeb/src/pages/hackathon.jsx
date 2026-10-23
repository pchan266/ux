import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight, Image, PlayCircle } from "lucide-react";
import { useEffect } from "react";
import CustomCursor from "../components/customCursor";
import EventImageGallery from "../components/EventImageGallery";
import { designathons } from "../data/designathons";
import "../styles/events.css";
import "../styles/hackathon.css";

const designathon2026 = {
  year: 2026,
  dates: "November 6–8, 2026",
  registrationUrl: "https://forms.gle/2D7B5cSdXZahVs8x8",
  timeline: [
    { date: "October 21–30", items: ["Registration open", "Create teams of up to 4"] },
    { date: "November 4", items: ["Deadline to sign up for mentorship sessions"] },
    { date: "November 6", items: ["6 PM — Opening ceremony"] },
    { date: "November 7", items: ["9 AM–5 PM — Virtual mentorship sessions", "Full day — Work on projects"] },
    { date: "November 8", items: ["6 PM — Closing ceremony"] },
  ],
};

const AVATAR_COLOURS = ["#A3280C", "#657F95", "#D53302", "#8FB1BE", "#FCC560", "#A0CBAD"];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Hackathon() {
  const designathon = designathons.find((event) => event.year === 2025);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <div className="page-container-hackathon">
      <title>Designathon - Queen&apos;s UX Club</title>
          <CustomCursor />

      {/* Featured Designathon 2026: registration and timeline */}
      <section className="designathon-2026" aria-labelledby="designathon-2026-title">
        <div className="designathon-2026-inner">
          <div className="designathon-2026-intro">
            <p className="designathon-2026-eyebrow">QUEEN'S UX CLUB × FIGMA AT QUEEN'S</p>
            <h1 id="designathon-2026-title">Design-a-thon <span>2026</span></h1>
            <p className="designathon-2026-dates">November 6–8, 2026</p>
            <p className="designathon-2026-description">
              Spend a weekend designing and prototyping creative digital products.
              Get mentorship from UX professionals, build a project for your portfolio,
              and enjoy prizes and food!
            </p>
            <div className="designathon-2026-actions">
              <a className="designathon-2026-cta" href={designathon2026.registrationUrl} target="_blank" rel="noopener noreferrer">
                Sign up now <ArrowUpRight size={21} aria-hidden="true" />
              </a>
              <span>Registration: October 21–30 · Teams of up to 4</span>
            </div>
          </div>
          <div className="designathon-2026-timeline">
            <h2>Event timeline</h2>
            <div className="designathon-2026-timeline-grid">
              {designathon2026.timeline.map(({ date, items }) => (
                <div className="designathon-2026-milestone" key={date}>
                  <h3>{date}</h3>
                  <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="designathon-2026-more">More details, projects, and results will be added after the event.</p>
          </div>
        </div>
      </section>

      {/* The Place for All Designers Section */}
      <section className="content-section-hackathon" data-aos="fade-left">
        <div className="container-hackathon">
          <div className="section-content-hk">
            <h2 className="section-title-hk">The Place for All Designers</h2>

            <div className="section-text-hk">
              <p>
              Our Designathon is a UI/UX-focused hackathon that challenges participants to 
              solve real-world problems through creative design. Unlike traditional hackathons 
              that emphasize coding, the Designathon puts user experience and interface design 
              at the forefront. Over a set time period, teams will brainstorm, wireframe, and 
              prototype innovative digital solutions based on a given theme or prompt. 
              It’s a great opportunity for beginners and experienced designers alike to 
              showcase their skills, learn from mentors, and collaborate in a fast-paced, 
              creative environment. Whether you're passionate about design or just getting started, 
              the Designathon is a fun and impactful way to grow your skills and build your portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2025 archive: retained unchanged until 2026 results are ready */}
      <section className="content-section-hackathon designathon-archive" data-aos="fade-up">
        <div className="container-hackathon">
          <div className="section-content-hk">
            <p className="archive-eyebrow">Annual archive · {designathon.year}</p>
            <h2 className="section-title-hk archive-title">Theme: {designathon.theme}</h2>
            <p className="section-text-hk">{designathon.summary}</p>

            <div className="archive-stats">
              <span>{designathon.participantCount} participants</span>
              <span>{designathon.prizeTotal} in prizes</span>
              <span>{designathon.projects.length + designathon.winners.length} projects</span>
            </div>

            <h3 className="archive-heading">{designathon.year} winners</h3>
            <div className="archive-grid winners-grid">
              {designathon.winners.map((winner, index) => (
                <a
                  href={winner.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`archive-card winner-card-hk ${index === 1 ? "place-2" : ""}`}
                  key={winner.title}
                >
                  {winner.imageGallery ? (
                    <EventImageGallery
                      images={winner.imageGallery}
                      frameClassName="winner-media-frame"
                    />
                  ) : winner.videoUrl ? (
                    <div className="winner-media-placeholder">
                      <PlayCircle size={22} strokeWidth={1.5} />
                      <span>Watch the demo video</span>
                    </div>
                  ) : (
                    <div className="winner-media-placeholder">
                      <Image size={22} strokeWidth={1.5} />
                      <span>Project media coming soon</span>
                    </div>
                  )}
                  <small>{winner.place}</small>
                  <h4>{winner.title}</h4>
                  <p>{winner.description}</p>
                  <span>{winner.team.join(" · ")}</span>
                </a>
              ))}
            </div>

            <div className="archive-heading-row">
              <h3 className="archive-heading">More projects</h3>
              <a href={designathon.galleryUrl} target="_blank" rel="noreferrer">
                See other projects on Devpost <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="archive-grid project-grid-hk">
              {designathon.projects.map((project) => (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="archive-card project-card-hk"
                  key={project.title}
                >
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                </a>
              ))}
            </div>

            <h3 className="archive-heading">Meet the mentors</h3>
            <p className="section-text-hk">
              UX researchers, product designers, and industry professionals supported
              participants with questions and real-world advice.
            </p>
            <div className="mentor-list-hk">
              {designathon.mentors.map((mentor, index) => (
                <article key={mentor.name}>
                  <div
                    className="mentor-avatar"
                    style={{ background: AVATAR_COLOURS[index % AVATAR_COLOURS.length] }}
                  >
                    {getInitials(mentor.name)}
                  </div>
                  <div className="mentor-info">
                    <strong>{mentor.name}</strong>
                    <span>{mentor.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="content-section-hackathon" data-aos="fade-up">
        <div className="container-hackathon">
          <div className="section-content-hk h-100">
            <h2 className="section-title-hk">Sponsor the launch of a design-packed weekend</h2>

            <div className="section-text-hk">
              <p className="mb-20">
              Thanks to the generous support of our sponsors and partners, our Designathon 
              is able to provide participants with a meaningful space to collaborate and grow. 
              Their contributions power the creativity, innovation, and memorable moments that 
              define our Designathon experience.
              </p>
            </div>
            <a href="mailto:quxspons@gmail.com" className="btn">
              Become a Sponsor
              <ArrowUpRight style={{ width: "2rem", height: "2rem", marginBottom: "0.2rem" }} />
            </a>
          </div>
        </div> 
      </section>
    </div>
  )
}
