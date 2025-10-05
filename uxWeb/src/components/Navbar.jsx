import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Navbar() {
    return (
        <div className="navbar-home">
            <div className="logo">
                <a href="/" className="logo">
                    <img src="../Logo.svg" alt="UX" className="ux-logo"/>
                </a>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/team">Our Team</Link>
                <Link to="/events">Events</Link>
                <Link to="/hackathon">Designathon</Link>
                <Link to="/sponsorship">Sponsorship</Link>
                <Link to="/projects">Projects</Link>
            </div>
            <Link to="mailto:queensuxclub@gmail.com">
            <a className="contact-btn">
                Contact
            </a>
            </Link>
        </div>
    )
}
