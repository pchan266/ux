import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";

export default function Navbar() {
    const { pathname } = useLocation();
    const isActive = (path) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path);

    return (
        <div className="navbar-home">
            <div className="logo">
                <a href="/" className="logo">
                    <img src="/Logo.svg" alt="UX" className="ux-logo"/>
                </a>
            </div>
            <div className="nav-links">
                <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
                <Link to="/team" className={isActive("/team") ? "active" : ""}>Our Team</Link>
                <Link to="/events" className={isActive("/events") ? "active" : ""}>Events</Link>
                <Link to="/hackathon" className={isActive("/hackathon") ? "active" : ""}>Designathon</Link>
                <Link to="/sponsorship" className={isActive("/sponsorship") ? "active" : ""}>Sponsorship</Link>
                <Link to="/projects" className={isActive("/projects") ? "active" : ""}>Projects</Link>
            </div>
            <a href="mailto:queensuxclub@gmail.com" className="contact-btn">
                Contact
            </a>
        </div>
    )
}
