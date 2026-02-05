import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Footer from './components/Footer';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import AGB from './components/AGB';
import CookiePolicy from './components/CookiePolicy';
import CookieBanner from './components/CookieBanner';
import Certificates from './components/Certificates';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Process />
    </>
  );
}

// Wrapper for pages requiring top padding (all pages except Home)
const PageLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className="pt-20">
    {children}
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <ScrollToTop />
      <Navbar />
      <CookieBanner />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/zertifikate" element={<PageLayout><Certificates /></PageLayout>} />
          <Route path="/impressum" element={<PageLayout><Impressum /></PageLayout>} />
          <Route path="/datenschutz" element={<PageLayout><Datenschutz /></PageLayout>} />
          <Route path="/agb" element={<PageLayout><AGB /></PageLayout>} />
          <Route path="/cookies" element={<PageLayout><CookiePolicy /></PageLayout>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;