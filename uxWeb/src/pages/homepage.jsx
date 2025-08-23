import "../styles/header.css"
import "../styles/footer.css"
import "../styles/homepage.css"
import { ArrowUpRight, Mail, Instagram, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"
import EventCarousel from "../components/EventCarouselSingle"
import MobileEventCarousel from "../components/EventCarouselMobile"
import LinkButton from "../components/LinkButton"
import AOS from "aos"
import "aos/dist/aos.css"
import CustomCursor from "../components/customCursor"

export default function homepage() {
  const [showCreativityText, setShowCreativityText] = useState(false);
  const [showEmpathyText, setShowEmpathyText] = useState(false);
  const [showCuriosityText, setShowCuriosityText] = useState(false);
  const [showInclusivityText, setShowInclusivityText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      })
      

      const checkMobile = () => {
          if (typeof window !== "undefined") {
          const width = window.innerWidth;
          setIsMobile(width <= 1024); 
          }
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
  }, []);


  return (
    <div>
      <CustomCursor />
      {/* Hero Section */}
      <section className="hero">
       
        {/* Hero Content */}
        <div className="container-homepage">
          <div className="hero-content" data-aos="fade-right">
            <div className="hero-top">
              <h1 className="hero-title">
                Queen's
                <br />
                UX Club
              </h1>
              <div href="#" className="join-btn">
                Join <ArrowUpRight style={{ width: "2rem", height: "2rem", marginBottom: "0.2rem" }} />
              </div>
            </div>
            <div className="hero-body">
              <div className="hero-text">
                <p>
                Queen's UX (User Experience) Club is a community for students of all backgrounds,
                 disciplines, and skill levels to explore, learn, and grow in user experience. 
                 We aim to connect curious minds through collaborative events, workshops, and 
                 projects that inspire better design for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision">
        {/* vision stars */}

        {/* vision content */}
        <div className="container-homepage">
          <div className="vision-content" data-aos="fade-left">
          <h2 className="vision-title">Vision</h2>
          <p className="vision-text">
            To be the leading student-driven community at Queen's University that inspires innovation and shapes the
            future of user experience by empowering the next generation of empathetic, creative, and interdisciplinary
            UX leaders.
          </p>
          </div>
        </div>
      </section>


      {/* Core Values Section */}
      <section className="values">
        <div className="container-values">
          <div className="values-content" data-aos="fade-right">
          <h2 className="values-title">
            Core Values
          </h2>

          <div className="values-grid">
            <div className="card value-card creativity" onClick={() => setShowCreativityText(!showCreativityText)}>
            <h3 className="value-title">Creativity</h3>
             { showCreativityText ? (
              <p className="value-description">
              We believe great design begins with imagination. Whether we’re prototyping, 
              brainstorming, or running a workshop, we encourage bold ideas and fresh thinking 
              in everything we do.
              </p>
            ) : (
              <>
                <img src="creativity.svg" alt="" />
              </>
              )
            }
            </div>

            <div className="card value-card empathy" onClick={() => setShowEmpathyText(!showEmpathyText)}>

              <h3 className="value-title">Empathy</h3>
              { showEmpathyText ? (
              <p className="value-description">
              At the heart of UX is understanding people. We approach every project, 
              conversation, and challenge with empathy, striving to design with, not just for, 
              our users and peers.
              </p>
            ) : (
              <>
              <img src="empathy.svg" alt="" />
              </>
            )
            }
            </div>

            <div className="card value-card curiosity" onClick={() => setShowCuriosityText(!showCuriosityText)}>

              <h3 className="value-title">Curiosity</h3>
              { showCuriosityText ? (
              <p className="value-description">
              We’re driven by questions and the desire to keep learning. 
              From exploring new tools to diving into complex design problems, 
              we foster a culture of exploration and growth.
              </p>
            ) : (
              <>
              <img src="curiosity.svg" alt="" />
              </>
            )
            }
            </div>

            <div className="card value-card inclusivity" onClick={() => setShowInclusivityText(!showInclusivityText)}>
              
              <h3 className="value-title">Inclusivity</h3>
              { showInclusivityText ? (
              <p className="value-description">
              We welcome students of all backgrounds, disciplines, and experience levels, 
              creating a safe and supportive space where everyone’s voice matters. 
              By embracing diverse perspectives, we design more thoughtful and accessible experiences.
              </p>
            ) : (
              <>
              <img src="inclusivity.svg" alt="" />
              </>
            )
            }
            </div>
          </div>
          <a href="#" className="meet-team-btn">
            Meet Our Team <ArrowUpRight style={{ width: "2rem", height: "2rem", marginBottom: "0.2rem" }} />
          </a>
          </div>

        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events">
        <div className="container-events justify-center overflow-x-visible">
          <div className="upcoming-events-title-container">
          <h2 className="upcoming-events-title">
            Upcoming Events
          </h2>
          </div>

          <div className="events-carousel-wrapper-homepage">
            <div className="events-carousel-hmpg-inner">
            {isMobile ? <MobileEventCarousel cardNum={5} /> : <EventCarousel cardNum={5} />}
            </div>
          </div>
          <LinkButton arrowStyle="up" className="events-btn-homepage" path="/events">See All Events</LinkButton>
        </div>
      </section>

      {/* stars */}
      <div className="stars">
        <img src="../hm_tr.svg" className="hm_tr" alt="" />
        <img src="../hm_bl.svg" className="hm_bl" alt="" />
      </div>

    </div>
  )
}
