import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function LeftNavigation({ details }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className='fixed w-full'>
        <div className='absolute z-10'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            className='mobile-menu-button m-4 inline-flex items-center justify-center text-5xl text-[#B99976] hover:text-[#987554] focus:outline-none focus:ring-offset-2'
          >
            <span className='sr-only'>Open main menu</span>
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
        <div className={isOpen ? 'flex w-full' : 'hidden'}>
          <motion.div
            animate={
              isOpen
                ? {
                    x: 0,
                    opacity: 1,
                    transition: {
                      x: { type: 'spring', bounce: 0, duration: 0.4 },
                    },
                  }
                : { x: '-280px', opacity: 0 }
            }
            className='flex h-screen w-full flex-col bg-white shadow-2xl md:w-3/12 xl:w-2/12'
          >
            <div className='w-full space-y-1 bg-white px-3 pt-12 pb-3'>
              {details.content?.map((navigation: any) => {
                return navigation.navigationId ? (
                  <div
                    key={navigation.id}
                    className='rounded hover:bg-gray-100'
                  >
                    <a
                      href={'#' + navigation.navigationId}
                      onClick={() => setIsOpen(!isOpen)}
                      className='text-md block py-2 px-2 font-medium text-gray-600 hover:text-gray-900'
                    >
                      {navigation.navigationId}
                    </a>
                  </div>
                ) : null;
              })}
            </div>
            <div className='mt-auto bg-white px-3 pb-3'>
              <div className='text-semibold w-full rounded-md bg-slate-500 p-2 text-center text-xl text-white outline-none ring-slate-300 transition duration-100 hover:bg-slate-600 focus-visible:ring active:bg-slate-700'>
                <Link href='https://salonbook.one/?fakeyourbeauty#/'>
                  <a target='_blank' rel='noreferrer'>
                    BOOK TID
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={
              isOpen
                ? {
                    x: 0,
                    opacity: 0.1,
                    transition: { delay: 0.3 },
                  }
                : { opacity: 0 }
            }
            className='grow bg-black opacity-10'
            onClick={() => setIsOpen(!isOpen)}
          ></motion.div>
        </div>
      </nav>
    </>
  );
}
