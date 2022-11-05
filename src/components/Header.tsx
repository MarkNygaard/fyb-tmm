import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { RiCloseLine, RiMenuFill } from 'react-icons/ri';

import MobileMenu from './Navigation/MobileMenu';
import Navigation from './Navigation/Navigation';

export default function Header({ introPage, page }: any) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <nav className='relative flex'>
      <div className='hidden lg:flex'>
        <Navigation introPage={introPage} page={page} />
      </div>
      <div className='fixed z-30 flex p-8 text-3xl lg:hidden'>
        <button onClick={() => setMenuIsOpen(!menuIsOpen)}>
          <span className='sr-only'>Open main menu</span>
          {!menuIsOpen ? <RiMenuFill className='rotate-90' /> : <RiCloseLine />}
        </button>
      </div>
      <AnimatePresence>
        {menuIsOpen && (
          <MobileMenu page={page} onClose={() => setMenuIsOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
}
