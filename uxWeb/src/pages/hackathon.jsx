import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CustomCursor from "../components/customCursor";
import { designathons } from "../data/designathons";
import "../styles/hackathon.css";


export default function Hackathon() {
  const designathon = designathons[0];

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

      {/* Hero Section */}
      <section className="hero-section-hackathon" data-aos="fade-right">
        <div className="container-hackathon">
          <div className="hero-grid-hk">

            <div className="hero-content-hk">
              <h1 className="hero-title-hk">
                Designathon 2025
              </h1>
              <p className="hero-subtitle-hk">November 15th - 22nd 2025 | Online</p>
              <a href={designathon.devpostUrl} target="_blank" rel="noreferrer">
                View the 2025 Designathon on Devpost
              </a>
            </div>

            <div className="hero-image-container-hk">
              <img
                src="../Group 7.svg"
                alt="Decorative geometric shapes"
                className="hero-image-hk"
              />
            </div>
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

      {/* Annual Archive Section */}
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

            <h3 className="archive-heading">2025 winners</h3>
            <div className="archive-grid winners-grid">
              {designathon.winners.map((winner) => (
                <a href={winner.url} target="_blank" rel="noreferrer" className="archive-card winner-card-hk" key={winner.title}>
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
                See other projects at the Devpost <ArrowUpRight size={18} />
              </a>
            </div>

            <h3 className="archive-heading">Meet the mentors</h3>
            <p className="section-text-hk">
              UX researchers, product designers, and industry professionals supported
              participants with questions and real-world advice.
            </p>
            <div className="mentor-list-hk">
              {designathon.mentors.map((mentor) => (
                <article key={mentor.name}>
                  <strong>{mentor.name}</strong>
                  <span>{mentor.role}</span>
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
            <Link to="mailto:quxspons@gmail.com">
              <div className="btn">Become a Sponsor 
              <ArrowUpRight style={{ width: "2rem", height: "2rem", marginBottom: "0.2rem" }} />
              </div>
            </Link>
          </div>
        </div> 
      </section>
    </div>
  )
}
