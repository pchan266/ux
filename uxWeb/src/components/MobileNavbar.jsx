import { useState } from 'react';

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
                    <a href="/" className="mobile-logo-link">
                        <img src="../Logo.svg" alt="UX" className="mobile-ux-logo"/>
                    </a>
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
                            <img src="../Logo.svg" alt="UX" className="mobile-menu-ux-logo"/>
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
                        <a href="/team" onClick={closeMenu}>Our Team</a>
                        <a href="/events" onClick={closeMenu}>Events</a>
                        <a href="/hackathon" onClick={closeMenu}>Hackathon</a>
                        <a href="/sponsorship" onClick={closeMenu}>Sponsorship</a>
                        <a href="/projects" onClick={closeMenu}>Projects</a>
                    </nav>
                    
                    <div className="mobile-contact-section">
                        <a href="#" className="mobile-contact-btn" onClick={closeMenu}>
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
