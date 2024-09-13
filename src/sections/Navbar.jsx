import React from 'react';
import { navLinks } from '../constants/index.js';

const NavItems = ({ handleNavClick }) => {
  return (
    <div>
      <ul className='nav-ul'>
        {navLinks.map(({id, href, name}) => (
          <li key={id} className='nav-li'>
            <a
              href={href}
              className='nav-li_a'
              onClick={() => handleNavClick(name.toLowerCase())} // Call handleNavClick when clicked
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Navbar = ({ handleNavClick }) => {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-black/90'>
      <div className='max-w-7xl mx-auto'>
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className='text-neutral-400 font-bold text-xl hover:text-white transition-colors'>
            Max
          </a>

          <nav className='sm:flex hidden'>
            <NavItems handleNavClick={handleNavClick} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
