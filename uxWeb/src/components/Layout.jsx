import Navbar from './Navbar.jsx'; 
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";


import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div >
      <ScrollToTop />
      <Navbar />
      <main >
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}