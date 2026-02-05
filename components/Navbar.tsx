import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Start', href: '/' },
    { name: 'Leistungen', href: '/#services' },
    { name: 'Über Mich', href: '/#about' },
    { name: 'Ablauf', href: '/#process' },
  ];

  // Determine navbar background logic
  // If not home, always solid. If home, transparent until scrolled or mobile menu open.
  const showSolidBackground = !isHome || isScrolled || isOpen;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 
      ${showSolidBackground ? 'bg-gray-50/95 backdrop-blur-md shadow-sm' : 'bg-transparent'} 
      ${isScrolled || isOpen ? 'py-2' : 'py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 408" className="h-10 w-auto bg-white p-1 rounded shadow-sm">
                <g fill="#22ad96" fillRule="evenodd">
                  <path d="m92 270-2 4v3l-4 8-2 8-2 3v2l2 1 1-1 1 1 2-1 2 1h30l1-2-2-2h-1l-1-2-5-5h-1l-3-3v-1h-1l-14-14Zm14-38-8 8-4 10 1 15 36 34 10-1 11-5 4-5 3-8-1-16-31-33-14-1Zm259-5h-14l-1 1-2-1h-4l-1 1v3l1 1v8l1 1v10l1 1v10h2l1-1 5-10 2-2v-2l3-4 1-4 2-2 4-8Zm-62 0v72h29l12-25-3-31-1-1v-13l-2-2Zm-41 0-1 1v34l-1 1v36h27l12-22v-49l-1-1Zm-131 0v2h1l1 2h1l2 2v1l2 1 2 2v1h1l1 2 2 2h1l1 2 2 1 1 2 2 2h1l4 5h1l2 2h2v-2l1-1v-2l1-1v-2l1-1v-2l2-4v-3l2-4v-4l2-1-1-1 1-1Z"/>
                  <path d="m133 352 419 3L344 40l-60 90h40l19-27 141 212-282 1 3-9-42-1Z"/>
                </g>
                <path d="m171 226-1 2 1-1 2 2v7l3 12v7l7 43 1 1h27l12-17v-9l-4-15v-8l-5-23h-42Zm147-89h-39l-60 89 8 49 35-49 55-84Z" fill="#de3e8d" fillRule="evenodd"/>
              </svg>
              <span className={`font-bold text-sm sm:text-lg md:text-xl tracking-tight transition-colors duration-300 ${showSolidBackground ? 'text-dark' : 'text-white'}`}>
                Sachverständigenbüro Michael Wienecke
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-teal-500 ${showSolidBackground ? 'text-gray-700' : 'text-gray-100 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="tel:+49123456789" 
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all group ${
                showSolidBackground 
                ? 'border-teal-500 text-teal-600 hover:bg-teal-50 hover:border-magenta hover:text-magenta' 
                : 'border-white text-white hover:bg-white hover:text-magenta hover:border-white'
              }`}
            >
              <Phone size={16} className={`transition-colors ${showSolidBackground ? 'text-magenta' : 'group-hover:text-magenta'}`} />
              <span>0123 456 789</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${showSolidBackground ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'} focus:outline-none`}
              aria-label="Hauptmenü öffnen"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-gray-50/95 backdrop-blur-md border-t border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-4 pointer-events-none h-0'
        }`}
      >
        <div className="px-4 pt-4 pb-8 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block px-4 py-4 text-base font-semibold text-gray-700 hover:text-teal-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100 hover:shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 mt-4 border-t border-gray-200">
             <a 
              href="tel:+49123456789" 
              className="flex items-center justify-center gap-3 px-6 py-4 bg-teal-500 text-white rounded-xl w-full font-bold shadow-lg hover:bg-teal-600 active:scale-[0.98] transition-all"
            >
              <Phone size={20} className="text-white" />
              0123 456 789 Anrufen
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;