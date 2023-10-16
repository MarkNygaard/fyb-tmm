import { AnimatePresence, useAnimation } from 'framer-motion';
import { motion } from 'framer-motion';
import { PageRecord } from 'lib/graphql';
import React, { useState } from 'react';

import MobileMenu from './Navigation/MobileMenu';
import Navigation from './Navigation/Navigation';

const path01Variants = {
  open: { d: 'M1.5 0L1.5 20' },
  closed: { d: 'M1.5 0L1.5 0' },
};
const path02Variants = {
  open: { d: 'M11.5 0L11.5 20' },
  closed: { d: 'M11.5 0L11.5 0' },
};
const path03Variants = {
  open: { d: 'M22.5 0L22.5 20' },
  closed: { d: 'M22.5 0L22.5 0' },
};
const removeFromDom = {
  remove: { display: 'none' },
  add: { display: 'block' },
};

export default function Header({ page }: any) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  const path03Controls = useAnimation();
  const button = useAnimation();

  const onClick = async () => {
    setMenuIsOpen(!menuIsOpen);
    if (!menuIsOpen) {
      await path03Controls.start(path03Variants.closed);
      await path02Controls.start(path02Variants.closed);
      await path01Controls.start(path01Variants.closed);
      button.start(removeFromDom.remove);
    } else {
      await button.start(removeFromDom.add);
      await path03Controls.start(path03Variants.open);
      await path02Controls.start(path02Variants.open);
      path01Controls.start(path01Variants.open);
    }
  };

  return (
    <>
      <div className='hidden w-full md:sticky md:top-0 md:z-40 md:flex'>
        <Navigation {...(page as PageRecord)} />
      </div>

      <div className='sticky top-0 z-30 flex w-full justify-end text-3xl text-white md:hidden'>
        <motion.button
          aria-label='menu'
          className='absolute m-6 p-2 rounded-full active:bg-gray-300/20'
          onClick={onClick}
          animate={button}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <motion.path
              {...path01Variants.open}
              animate={path01Controls}
              transition={{ duration: 0.2 }}
              stroke='#FFFFFF'
            />
            <motion.path
              {...path02Variants.open}
              animate={path02Controls}
              transition={{ duration: 0.2 }}
              stroke='#FFFFFF'
            />
            <motion.path
              {...path03Variants.open}
              animate={path03Controls}
              transition={{ duration: 0.2 }}
              stroke='#FFFFFF'
            />
          </svg>
        </motion.button>
      </div>
      <AnimatePresence>
        {menuIsOpen && <MobileMenu page={page} onClose={onClick} />}
      </AnimatePresence>
    </>
  );
}
