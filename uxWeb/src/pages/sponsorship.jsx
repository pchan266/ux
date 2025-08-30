import CustomCursor from "../components/customCursor"
import "../styles/sponsorship.css"

export default function Sponsor() {
    return (
        <div>
            <CustomCursor />
            <section className="sponsors-hero">
                <div className="container-sponsors" data-aos="fade-right">
                    <h1 className="sponsors-title">Sponsors</h1>
                    <p className="red-text">Thank you to all of our sponsors who support our team</p>
                    <a href="#" className="btn">
                        Become a Sponsor
                        <span className="arrow">↗</span>
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

                             <img src="creativity.svg" alt="" />
                        </div>

                        <div className="benefit-card impact">

                            <h3 className="benefit-title">Make an Impact</h3>

                            <img src="empathy.svg" alt="" />
                        </div>

                        <div className="benefit-card connections">

                            <h3 className="benefit-title">Build Connections</h3>

                            <img src="curiosity.svg" alt="" />
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
                        <p className="partnership-cta mt-6">Take the first step toward a valuable and rewarding partnership.</p>
                        
                        <a href="#" className="btn absolute bottom-0">
                            Sponsorship Package
                            <span className="arrow">↗</span>
                        </a>
                    </div>
                    
                </div>
            </section>
        </div>
    )
}