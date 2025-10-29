import Navbar from './Navbar.jsx'; 
import MobileNavbar from './MobileNavbar.jsx';
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <link rel="icon" href="ux.png" />
      <ScrollToTop />
      <Navbar />
      <MobileNavbar />
      <main className="flex-1">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}
