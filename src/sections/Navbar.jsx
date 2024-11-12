import React, { useState } from 'react';
import { navLinks } from '../constants/index.js';

const NavItems = ({ handleNavClick }) => {
  return (
    <div>
      <ul className='nav-ul'>
        {navLinks.map(({ id, href, name }) => (
          <li key={id} className='nav-li'>
            <a
              href={href}
              className='nav-li_a'
              onClick={() => handleNavClick(name.toLowerCase())}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Navbar = ({ handleNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if the mobile menu is open

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu open/close
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-black'>
      <div className='max-w-7xl mx-auto'>
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          {/* Logo or Name */}
          <a href="https://www.maximmccain.com/" className='text-neutral-400 font-bold text-xl hover:text-white transition-colors'>
            Max McCain
          </a>

          {/* Full Menu for Desktop */}
          <nav className='sm:flex hidden'>
            <NavItems handleNavClick={handleNavClick} />
          </nav>

          {/* Hamburger Menu for Mobile */}
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="text-neutral-400 focus:outline-none">
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-black/90">
          <div className='c-space'>
            <NavItems handleNavClick={handleNavClick} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
