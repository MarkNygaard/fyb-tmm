import { AnimatePresence } from 'framer-motion';
import { PageRecord } from 'lib/graphql';
import React, { useState } from 'react';
import { RiMenuFill } from 'react-icons/ri';

import MobileMenu from './Navigation/MobileMenu';
import Navigation from './Navigation/Navigation';

export default function Header({ page }: any) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className='hidden w-full md:sticky md:top-0 md:z-40 md:flex'>
        <Navigation {...(page as PageRecord)} />
      </div>
      <div className='sticky top-0 z-20 flex w-full justify-end text-3xl text-white md:hidden'>
        <button
          aria-label='menu'
          className='absolute m-6 p-2 rounded-full active:bg-gray-300/20'
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          <span className='sr-only'>Open main menu</span>
          {!menuIsOpen && <RiMenuFill className='rotate-90' />}
        </button>
      </div>
      <AnimatePresence>
        {menuIsOpen && (
          <MobileMenu page={page} onClose={() => setMenuIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
