import { motion, useMotionValue, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Image } from 'react-datocms';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

export function Navigation({ page, introPage }: any) {
  const { scrollY } = useScroll();
  const height = useMotionValue(80);

  useEffect(() => {
    return scrollY.onChange((current) => {
      const previous = scrollY.getPrevious();
      const diff = current - previous;
      const newHeight = height.get() - diff;

      height.set(Math.min(Math.max(newHeight, 50), 80));
    });
  }, [height, scrollY]);

  const [hoverState, setHoverState] = useState(false);

  const animateLeft =
    page.slug === introPage.leftLink.slug
      ? {
          width: '100%',
          transition: {
            duration: hoverState ? 0.4 : 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        }
      : {
          width: hoverState ? '10%' : '0%',
          minWidth: '100px',
          transition: {
            duration: hoverState ? 0.4 : 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        };

  const animateRight =
    page.slug === introPage.rightLink.slug
      ? {
          width: '100%',
          transition: {
            duration: hoverState ? 0.4 : 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        }
      : {
          width: hoverState ? '10%' : '0%',
          minWidth: '100px',
          transition: {
            duration: hoverState ? 0.4 : 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        };

  return (
    <div>
      <motion.div
        initial={{
          height: '100vh',
        }}
        animate={{
          height: '5rem',
        }}
        transition={{
          duration: 0.6,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 1.6,
        }}
        className='fixed inset-x-0 z-10 flex shadow backdrop-blur-md'
      >
        {page.slug === introPage.leftLink.slug ? (
          <>
            <motion.div
              initial={{
                width: '50%',
              }}
              animate={animateLeft}
              className='flex h-full w-full min-w-[100px] items-center bg-[#B99976] px-2'
              onHoverEnd={() => setHoverState(false)}
            >
              <motion.div className='flex h-full w-full flex-1 items-center justify-center'>
                <motion.div
                  initial={{
                    scale: 1.1,
                  }}
                  animate={{
                    height: '4rem',
                    width: '4rem',
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 1.6,
                  }}
                  className='relative flex aspect-square h-1/2 items-center justify-center overflow-hidden rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl translate-z-0 lg:h-2/5'
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image
                    data={introPage.leftLogo.responsiveImage}
                    layout='fill'
                    lazyLoad={false}
                    className='aspect-square'
                  />
                </motion.div>
              </motion.div>
              <motion.div
                initial={{
                  width: '0%',
                }}
                animate={{
                  width: '100%',
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 1.6,
                }}
                className='flex w-full items-center justify-center'
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: hoverState ? 1.6 : 2.2,
                  }}
                  className='flex w-full items-center justify-center'
                >
                  {page.content?.map((navigation: any) => {
                    return navigation.navigationId ? (
                      <a
                        key={navigation.id}
                        href={'#' + navigation.navigationId}
                        className='block py-2 px-4 text-xl font-medium text-[#664229] hover:text-[#987554]'
                      >
                        {navigation.navigationId}
                      </a>
                    ) : null;
                  })}
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{
                width: '50%',
              }}
              animate={animateRight}
              className='flex h-full min-w-[100px] bg-[#3d1e1c] px-2'
              onHoverEnd={() => setHoverState(false)}
            >
              <Link href='/fake-your-beauty'>
                <motion.div
                  onHoverStart={() => setHoverState(true)}
                  onHoverEnd={() => setHoverState(false)}
                  className='flex h-full w-full flex-1 cursor-pointer items-center justify-center'
                >
                  <motion.div
                    className='flex w-full items-end text-5xl text-[#280503]'
                    initial={{
                      opacity: 0,
                      width: '0%',
                    }}
                    animate={{
                      opacity: hoverState ? 1 : 0,
                      width: hoverState ? '100%' : '0%',
                      paddingLeft: hoverState ? '0.5rem' : '0',
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                  >
                    <BiLeftArrowAlt />
                  </motion.div>
                  <motion.div
                    animate={{
                      height: '4rem',
                      width: '4rem',
                      marginRight: hoverState ? '0.5rem' : '0',
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                    className='flex aspect-square h-1/2 flex-none rounded-full bg-[url("http://www.fyb.dk/img/baggrtilered.jpg")] text-5xl font-bold uppercase text-[#280503] shadow-2xl lg:h-2/5'
                  />
                </motion.div>
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              initial={{
                width: '50%',
              }}
              animate={animateLeft}
              className='flex h-full w-full min-w-[100px] items-center bg-[#B99976] px-2'
              onHoverEnd={() => setHoverState(false)}
            >
              <Link href='/the-motley-monkey'>
                <motion.div
                  onHoverStart={() => setHoverState(true)}
                  onHoverEnd={() => setHoverState(false)}
                  className='flex-start flex h-full w-full flex-none cursor-pointer items-center justify-center'
                >
                  <motion.div
                    animate={{
                      height: '4rem',
                      width: '4rem',
                      marginLeft: hoverState ? '0.5rem' : '0',
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                    className='relative flex aspect-square h-1/2 flex-none overflow-hidden rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl translate-z-0 lg:h-2/5'
                  >
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                      data={introPage.leftLogo.responsiveImage}
                      layout='fill'
                      lazyLoad={false}
                      className='aspect-square'
                    />
                  </motion.div>
                  <motion.div
                    className='flex w-full items-end text-5xl text-[#664229]'
                    initial={{
                      opacity: 0,
                      width: '0%',
                    }}
                    animate={{
                      opacity: hoverState ? 1 : 0,
                      width: hoverState ? '100%' : '0%',
                      marginRight: hoverState ? '0.5rem' : '0',
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                  >
                    <BiRightArrowAlt />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
            <motion.div
              initial={{
                width: '50%',
              }}
              animate={animateRight}
              className='flex h-full min-w-[100px] bg-[#3d1e1c] px-2'
              onHoverEnd={() => setHoverState(false)}
            >
              <motion.div
                initial={{
                  width: '0%',
                }}
                animate={{
                  width: '100%',
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 1.6,
                }}
                className='flex w-full items-center justify-center'
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: hoverState ? 1.6 : 2.2,
                  }}
                  className='flex w-full items-center justify-center'
                >
                  {page.content?.map((navigation: any) => {
                    return navigation.navigationId ? (
                      <a
                        key={navigation.id}
                        href={'#' + navigation.navigationId}
                        className='block py-2 px-4 text-xl font-medium text-gray-200 hover:text-gray-300'
                      >
                        {navigation.navigationId}
                      </a>
                    ) : null;
                  })}
                </motion.div>
              </motion.div>
              <motion.div className='flex h-full w-full flex-1 items-center justify-center'>
                <motion.div
                  initial={{
                    scale: 1.1,
                  }}
                  animate={{
                    height: '4rem',
                    width: '4rem',
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 1.6,
                  }}
                  className='flex aspect-square h-1/2 items-center justify-center rounded-full bg-[url("http://www.fyb.dk/img/baggrtilered.jpg")] text-5xl font-bold uppercase text-[#280503] shadow-2xl lg:h-2/5'
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
