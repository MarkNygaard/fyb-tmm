import { motion, useMotionValue, useScroll } from 'framer-motion';
import { useEffect } from 'react';

export function Navigation({ content }: any) {
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
  const show = { opacity: 1, width: '100%' };

  return (
    <div>
      <motion.div
        initial={{
          height: '100vh',
        }}
        animate={{
          height: '4rem',
        }}
        transition={{
          duration: 1.6,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 1.6,
        }}
        className='fixed inset-x-0 z-10 flex shadow backdrop-blur-md'
      >
        <motion.div
          initial={{
            width: '50%',
          }}
          animate={{
            width: '100%',
          }}
          transition={{
            duration: 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className='flex h-full w-full items-center bg-[#B99976]'
        >
          <div className='mx-2 flex h-full w-full flex-1 items-center justify-center'>
            <motion.div
              initial={{
                height: '35rem',
                width: '35rem',
                scale: 1.1,
              }}
              animate={{
                height: '3rem',
                width: '3rem',
                scale: 1,
              }}
              transition={{
                duration: 1.6,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 1.6,
              }}
              className='flex items-center justify-center rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl'
            >
              <motion.div
                initial={{
                  opacity: 1,
                }}
                animate={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 1.2,
                }}
                className='flex flex-col items-center justify-center'
              >
                <p>Enter</p>
                <p>The Motley Monkey</p>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{
              width: '0%',
            }}
            animate={{
              width: '100%',
            }}
            transition={{
              duration: 1.6,
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
                delay: 3.2,
              }}
              className='flex w-full items-center justify-center'
            >
              {content?.map((navigation: any) => {
                return navigation.navigationId ? (
                  <a
                    key={navigation.id}
                    href={'#' + navigation.navigationId}
                    className='block py-2 px-4 text-lg font-medium text-[#664229] hover:text-[#987554]'
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
          animate={{
            width: '0%',
            minWidth: '100px',
          }}
          transition={{
            duration: 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          whileHover={show}
          className='h-full min-w-[100px] bg-[#280503]'
        >
          <div className='flex h-full w-full items-center justify-center'>
            <motion.div
              className='w-0 opacity-0'
              initial={{ opacity: 0, width: '0%' }}
            >
              GO TO FAKE YOUR BEAUTY
            </motion.div>
            <motion.div
              initial={{
                height: '35rem',
                width: '35rem',
              }}
              animate={{
                height: '3rem',
                width: '3rem',
              }}
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className='rounded-full bg-[#3d1e1c] text-5xl font-bold uppercase text-[#280503] shadow-2xl'
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
