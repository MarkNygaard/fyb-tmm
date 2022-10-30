import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function LeftNavigation({ details }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className='fixed w-full'>
        <div className='absolute right-0 top-0 z-10'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            className='mobile-menu-button m-4 inline-flex items-center justify-center text-5xl hover:text-gray-900 focus:outline-none focus:ring-offset-2'
          >
            <span className='sr-only'>Open main menu</span>
            {isOpen ? (
              <svg
                stroke='url(#grad1)'
                fill='url(#grad1)'
                stroke-width='0'
                viewBox='0 0 20 20'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <defs>
                  <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stop-color='#c084fc' stop-opacity='1' />
                    <stop offset='50%' stop-color='#fde047' stop-opacity='1' />
                    <stop offset='100%' stop-color='#93c5fd' stop-opacity='1' />
                  </linearGradient>
                </defs>
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            ) : (
              <svg
                stroke='url(#grad1)'
                fill='url(#grad1)'
                stroke-width='0'
                viewBox='0 0 20 20'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <defs>
                  <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stop-color='#c084fc' stop-opacity='1' />
                    <stop offset='50%' stop-color='#fde047' stop-opacity='1' />
                    <stop offset='100%' stop-color='#93c5fd' stop-opacity='1' />
                  </linearGradient>
                </defs>
                <path
                  fill-rule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            )}
          </button>
        </div>
        <div className={isOpen ? 'flex' : 'hidden'}>
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
                : { x: '280px', opacity: 0 }
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
        </div>
      </nav>
    </>
  );
}
