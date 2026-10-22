import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import CustomCursor from "../components/customCursor"
import "../styles/sponsorship.css"


export default function Sponsor() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        })
    }, [])

    return (
        <>
        <title>Sponsorship - Queen's UX Club</title>
            <CustomCursor />
            <section className="sponsors-hero">
                <div className="container-sponsors" data-aos="fade-right">
                    <h1 className="sponsors-title">Sponsors</h1>
                    <p className="red-text">Thank you to all of our sponsors who support our team</p>
                    <a href="mailto:quxspons@gmail.com" className="btn">
                        Email Us
                        <ArrowUpRight style={{ width: "2rem", height: "2rem", marginBottom: "0.2rem" }} />
                    </a>
                </div>
            </section>
            <section className="why-sponsor section">
                <div className="container-sponsors" data-aos="fade-left">

                    <div className="whyspons-content">
                        <h2 className="whyspons-title">Why Become a Sponsor?</h2>
                        <p className="whyspons-subtitle">Partnering with us means more than just placing your logo on a banner.</p>
                    </div>

                    <div className="benefits-grid">
                        <div className="benefit-card boost">

                            <h3 className="benefit-title">Boost Brand Visibility</h3>
                            <p className="benefit-description">You will have access to the brightest minds in the Queen's UX community, and will capitalize on their talent early on.</p>

                             <img src="/creativity.svg" alt="" />
                        </div>

                        <div className="benefit-card impact">

                            <h3 className="benefit-title">Make an Impact</h3>
                            <p className="benefit-description">Influencing the Queen's UX community by providing UX opportunities to them.</p>

                            <img src="/empathy.svg" alt="" />
                        </div>

                        <div className="benefit-card connections">

                            <h3 className="benefit-title">Build Connections</h3>
                            <p className="benefit-description">We're on track for 2,500 followers by 2027, with 100+ event and 200+ designathon attendees this past year alone.</p>

                            <img src="/curiosity.svg" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="become-section">
                <div className="container-sponsors" data-aos="fade-up">
                    
                    <div className="become-content">
                        <h2 className="become-title">Ready to Partner With Us?</h2>
                        <p className="partnership-text">
                             Sponsoring us means joining a mission-driven initiative that brings people together
                             and creates real impact. Your support helps us grow, reach more people, and deliver 
                             meaningful experiences to our community. We offer flexible sponsorship options designed 
                             to match your goals and highlight your brand in thoughtful, effective ways.
                        </p>
                        <p className="partnership-cta mt-6 mb-10">Take the first step toward a valuable and rewarding partnership.</p>
                        
                        <a href="/documents/QUX-Sponsorship-Package.pdf" target="_blank" rel="noreferrer" className="btn">
                            See Sponsorship Package
                            <ArrowUpRight style={{ width: "2rem", height: "2rem", marginBottom: "0.2rem" }} />
                        </a>
                    </div>
                    
                </div>
            </section>
            <section className="contact-section">
                <div className="container-sponsors" data-aos="fade-up">
                    <div className="contact-content">
                        <h2 className="contact-title">Contact Us</h2>
                        <p className="contact-text">
                            If our mission resonates with you, get in touch with our co-chairs @{" "}
                            <a href="mailto:queensuxclub@gmail.com">queensuxclub@gmail.com</a>.
                            <br />
                            For designathon inquiries, please contact the designathon director @{" "}
                            <a href="mailto:quxdesignathon@gmail.com">quxdesignathon@gmail.com</a>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}