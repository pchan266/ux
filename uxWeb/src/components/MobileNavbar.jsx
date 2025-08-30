import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';



export default function MobileNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="mobile-navbar">
            <div className="mobile-navbar-container">
                <div className="mobile-logo">
                    <Link to="/" className="mobile-logo-link">
                        <picture>
                            <source srcSet="../Logo.nofilter.svg" media="(max-width: 768px)" />
                            <img src='../Logo.svg' alt="UX" className="mobile-ux-logo" />
                        </picture>
                    </Link>
                </div>
                
                <button
                    className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
                <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
                    <div className="mobile-menu-header">
                        <div className="mobile-menu-logo">
                            <Link to="/" className="mobile-logo-link" onClick={closeMenu}>
                                <picture>
                                    <source srcSet="../Logo.nofilter.svg" media="(max-width: 768px)" />
                                    <img src='../Logo.svg' alt="UX" className="mobile-ux-logo" />
                                </picture>
                            </Link>
                        </div>
                        <button 
                            className="mobile-menu-close"
                            onClick={closeMenu}
                            aria-label="Close menu"
                        >
                            <span className="close-line"></span>
                            <span className="close-line"></span>
                        </button>
                    </div>
                    
                    <nav className="mobile-nav-links">
                        <Link to="/team" onClick={closeMenu}>Our Team</Link>
                        <Link to="/events" onClick={closeMenu}>Events</Link>
                        <Link to="/hackathon" onClick={closeMenu}>Hackathon</Link>
                        <Link to="/sponsorship" onClick={closeMenu}>Sponsorship</Link>
                        <Link to="/projects" onClick={closeMenu}>Projects</Link>
                    </nav>
                    
                    <div className="mobile-contact-section">
                        <Link to="#" className="mobile-contact-btn" onClick={closeMenu}>
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
