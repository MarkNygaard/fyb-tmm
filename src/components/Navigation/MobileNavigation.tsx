'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import SvgRenderer from 'components/SvgRenderer';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';

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

export default function MobileNavigation({ content, socialMediaLinks }: any) {
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
      <div className='sticky top-0 z-50 flex w-full justify-end text-3xl text-white md:hidden'>
        <motion.button
          aria-label='menu'
          className='absolute m-6 p-2 rounded-full active:bg-gray-300/20 z-50 translate-z-50'
          onClick={onClick}
          animate={button}
        >
          <span className='sr-only'>Open menu</span>
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
        <AnimatePresence>
          {menuIsOpen && (
            <>
              <motion.div
                onClick={onClick}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: [0.36, 0.66, 0.04, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    ease: [0.36, 0.66, 0.04, 1],
                    delay: 0.5,
                  },
                }}
                className='fixed inset-0 bg-black/50'
              />
              <NavigationMenu.Root
                key='mobileNavigation'
                orientation='vertical'
                asChild
              >
                <motion.div
                  initial={{ y: '-110vh', opacity: 1 }}
                  animate={{
                    y: 0,
                    transition: { duration: 0.6, ease: [0.8, 0, 0.1, 1] },
                  }}
                  exit={{
                    y: '-100%',
                    transition: {
                      duration: 0.6,
                      ease: [0.36, 0.66, 0.04, 1],
                      delay: 0.3,
                    },
                  }}
                  className='absolute h-screen w-5/6 bg-skin-accent shadow-2xl'
                >
                  <div className='flex flex-col justify-between h-full'>
                    <motion.div
                      className='flex absolute w-full justify-end text-3xl text-white lg:hidden'
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          ease: [0.8, 0, 0.1, 1],
                          delay: 0.4,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.36, 0.66, 0.04, 1],
                        },
                      }}
                    >
                      <motion.button
                        initial={{ opacity: 0, y: '-4vh' }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                            delay: 0.4,
                          },
                        }}
                        className='focus:outline-none m-6 p-2 rounded-full active:bg-gray-200/20 z-50'
                        onClick={onClick}
                      >
                        <span className='sr-only'>Close menu</span>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M3.00006 21.0607L21 3.06064'
                            stroke='#FFFFFF'
                          />
                          <path
                            d='M3.06061 2.99999L21.0606 21'
                            stroke='#FFFFFF'
                          />
                        </svg>
                      </motion.button>
                    </motion.div>
                    <NavigationMenu.List className='w-full space-y-1 px-8 pb-3 pt-24'>
                      {content?.map((navigation: any, i: any) => {
                        const navigationIdNoSpace =
                          navigation.navigationId?.replace(/\s/g, '');

                        return (
                          navigation.navigationId && (
                            <motion.div
                              key={navigation.id}
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: {
                                  duration: 0.2,
                                  delay: 0.4 + 0.04 * i,
                                  type: 'spring',
                                },
                              }}
                              exit={{
                                opacity: 0,
                                transition: {
                                  duration: 0.2,
                                  delay: 0.04 * i,
                                  type: 'spring',
                                },
                              }}
                            >
                              <NavigationMenu.Link asChild>
                                <Link
                                  className='block px-4 py-2 text-2xl font-normal text-white outline-none '
                                  href={'#' + navigationIdNoSpace}
                                  onClick={onClick}
                                >
                                  <span className='active:bg-gray-200/20 rounded-full py-2 px-4'>
                                    {navigation.navigationId}
                                  </span>
                                </Link>
                              </NavigationMenu.Link>
                            </motion.div>
                          )
                        );
                      })}
                    </NavigationMenu.List>
                    <NavigationMenu.List asChild>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: {
                            duration: 0.2,
                            delay: 0.64,
                            type: 'spring',
                          },
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            duration: 0.2,
                            delay: 0.24,
                            type: 'spring',
                          },
                        }}
                        className='flex w-full items-end pb-6'
                      >
                        {socialMediaLinks.map((links: any) => {
                          return (
                            <NavigationMenu.Link key={links.id} asChild>
                              <Link
                                aria-label='social-link'
                                target='_blank'
                                rel='noopener norefferer noreferrer'
                                href={links.url}
                                className='flex grow justify-center text-4xl text-white'
                              >
                                <SvgRenderer url={links.icon.url} />
                              </Link>
                            </NavigationMenu.Link>
                          );
                        })}
                      </motion.div>
                    </NavigationMenu.List>
                  </div>
                  <NavigationMenu.Viewport />
                </motion.div>
              </NavigationMenu.Root>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
