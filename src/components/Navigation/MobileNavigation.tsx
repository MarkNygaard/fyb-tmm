'use client';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import SvgRenderer from 'components/SvgRenderer';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { LinkRecord, PageModelContentField } from 'lib/graphql';
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

let cache = new Map();

function set(el: HTMLElement, styles: Record<string, string>) {
  let originalStyles: Record<string, string> = {};

  Object.entries(styles).forEach(([key, value]: [string, string]) => {
    originalStyles[key] = el.style[key as any];
    el.style[key as any] = value;
  });

  cache.set(el, originalStyles);
}

function reset(el: HTMLElement, prop?: keyof CSSStyleDeclaration) {
  let originalStyles = cache.get(el);

  if (prop) {
    el.style.setProperty(
      prop.toString(),
      originalStyles[prop as string] as string,
    );
  } else {
    Object.entries(originalStyles).forEach(([key, value]) => {
      originalStyles[key as keyof CSSStyleDeclaration] = el.style[
        key as keyof CSSStyleDeclaration
      ] as string;
      el.style.setProperty(key as string, value as string);
    });
  }
}

type MobileNavigationProps = {
  content: Array<PageModelContentField>;
  socialMediaLinks: Array<LinkRecord>;
};

export default function MobileNavigation({
  content,
  socialMediaLinks,
}: MobileNavigationProps) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const path01Controls = useAnimation();
  const path02Controls = useAnimation();
  const path03Controls = useAnimation();
  const button = useAnimation();

  const [disabled, setDisabled] = useState<boolean>(false);

  const onClick = async () => {
    setMenuIsOpen(!menuIsOpen);
    if (!menuIsOpen) {
      setDisabled(true);
      await path03Controls.start(path03Variants.closed);
      await path02Controls.start(path02Variants.closed);
      await path01Controls.start(path01Variants.closed);
      button.start(removeFromDom.remove);
    } else {
      await button.start(removeFromDom.add);
      await path03Controls.start(path03Variants.open);
      await path02Controls.start(path02Variants.open);
      path01Controls.start(path01Variants.open);
      setDisabled(false);
    }
  };

  return (
    <>
      <div className='sticky top-0 z-50 flex w-full justify-end text-3xl text-white md:hidden'>
        <motion.button
          disabled={disabled}
          aria-label='menu'
          className='translate-z-50 absolute z-50 m-6 rounded-full p-2 active:bg-gray-300/20'
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
                variants={{
                  open: {
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  },
                  closed: {
                    opacity: 0,
                    transition: {
                      duration: 0.3,
                      ease: [0.36, 0.66, 0.04, 1],
                      delay: 0.5,
                    },
                  },
                }}
                initial='closed'
                animate='open'
                exit='closed'
                onAnimationStart={(variant) => {
                  if (variant === 'open') {
                    set(document.body, { overflow: 'hidden' });
                  } else {
                    reset(document.body, 'overflow');
                  }
                }}
                onAnimationComplete={(variant) => {
                  if (variant === 'closed') {
                    reset(document.body);
                  }
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
                  <div className='flex h-full flex-col justify-between'>
                    <motion.div
                      className='absolute flex w-full justify-end text-3xl text-white lg:hidden'
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
                        className='z-50 m-6 rounded-full p-2 focus:outline-none active:bg-gray-200/20'
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
                      {content?.map(
                        (navigation: PageModelContentField, i: any) => {
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
                                    <span className='rounded-full px-4 py-2 active:bg-gray-200/20'>
                                      {navigation.navigationId}
                                    </span>
                                  </Link>
                                </NavigationMenu.Link>
                              </motion.div>
                            )
                          );
                        },
                      )}
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
                        {socialMediaLinks.map((links: LinkRecord) => {
                          return (
                            <NavigationMenu.Link key={links.id} asChild>
                              <Link
                                aria-label='social-link'
                                target='_blank'
                                rel='noopener norefferer noreferrer'
                                href={links.url as string}
                                className='flex grow justify-center text-base text-white'
                              >
                                <SvgRenderer url={links.icon?.url as string} />
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
