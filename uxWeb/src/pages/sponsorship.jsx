import CustomCursor from "../components/customCursor"
import "../styles/sponsorship.css"

export default function Sponsor() {
    return (
        <>
            <CustomCursor />
            <section className="sponsors-hero section">
                <div className="container-sponsors">
                    <h1 className="sponsors-title">Sponsors</h1>
                    <p className="sponsors-subtitle">Thank you to all of our sponsors who support our team</p>
                    <a href="#" className="btn-become">
                        Become a Sponsor
                        <span className="arrow">↗</span>
                    </a>
                </div>
            </section>
            <section className="why-sponsor section">
                <div className="container-sponsors">

                    <div className="whyspons-content">
                        <h2 className="section-title">Why Become a Sponsor?</h2>
                        <p className="whyspons-subtitle">Partnering with us means more than just placing your logo on a banner.</p>
                    </div>

                    <div className="benefits-grid">
                        <div className="benefit-card boost">

                            <h3 className="benefit-title">Boost Brand Visibility</h3>
                        </div>

                        <div className="benefit-card impact">

                            <h3 className="benefit-title">Make an Impact</h3>
                        </div>

                        <div className="benefit-card connections">

                            <h3 className="benefit-title">Build Connections</h3>
                        </div>
                    </div>
                </div>
            </section>
            <section className="partnership section">
                <div className="container-sponsors">
                    <h2 className="section-title">Ready to Partner With Us?</h2>
                    <div className="partnership-content">
                        <p className="partnership-text">
                            Sponsoring us means joining a mission-driven initiative that brings people together and creates real impact.
                            Your support helps us grow, reach more people, and deliver meaningful experiences to our community. We offer
                            flexible sponsorship options designed to match your goals and highlight your brand in thoughtful, effective
                            ways.
                        </p>
                        <p className="partnership-cta">Take the first step toward a valuable and rewarding partnership.</p>
                        <a href="#" className="btn-become">
                            Sponsorship Package
                            <span className="arrow">↗</span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}