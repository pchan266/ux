import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import CustomCursor from "../components/customCursor"
import "../styles/hackathon.css"

export default function hackathon() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <div className="page-container-hackathon">
          <CustomCursor />

      {/* Hero Section */}
      <section className="hero-section-hackathon" data-aos="fade-right">
        <div className="container-hackathon">
          <div className="hero-grid-hk">

            <div className="hero-content-hk">
              <h1 className="hero-title-hk">
                Designathon 2025
              </h1>
              <p className="hero-subtitle-hk">December 3rd-5th, 2025 | In Person | Kingston, ON</p>
              <a>Applications open soon!</a>
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

      {/* Sponsor Section */}
      <section className="content-section-hackathon" data-aos="fade-up">
        <div className="container-hackathon">
          <div className="section-content-hk">
            <h2 className="section-title-hk">Sponsor the launch of design packed weekend</h2>

            <div className="section-text-hk">
              <p>
              Thanks to the generous support of our sponsors and partners, our Designathon 
              is able to provide participants with a meaningful space to collaborate and grow. 
              Their contributions power the creativity, innovation, and memorable moments that 
              define our Designathon experience.
              </p>
            </div>

            <button className="sponsor-btn-hk">Become a Sponsor →</button>
          </div>
        </div> 
      </section>
    </div>
  )
}
