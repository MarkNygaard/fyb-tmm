import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

export function LeftSide({ page }: any) {
  const [hoverStateLeft, setHoverStateLeft] = useState(false);

  const animate =
    page.slug !== 'the-motley-monkey'
      ? {
          width: hoverStateLeft ? '10%' : '0%',
          minWidth: '100px',
          transition: {
            duration: hoverStateLeft ? 0.4 : 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        }
      : {
          width: '100%',
          transition: {
            duration: hoverStateLeft ? 0.4 : 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        };

  return (
    <motion.div
      initial={{
        width: '50%',
      }}
      animate={animate}
      className='flex h-full w-full min-w-[100px] items-center bg-[#B99976] px-2'
    >
      {page.slug === 'the-motley-monkey' ? (
        <motion.div className='flex h-full w-full flex-1 items-center justify-center'>
          <motion.div
            initial={{
              height: hoverStateLeft ? '4rem' : '35rem',
              width: hoverStateLeft ? '4rem' : '35rem',
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
            className='relative flex items-center justify-center overflow-hidden rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl'
          >
            <Image
              src='https://www.datocms-assets.com/84152/1667243680-tmm-logo-400x400.png?auto=format&w=500'
              layout='fill'
              alt='logo'
            />
          </motion.div>
        </motion.div>
      ) : (
        <Link href='/the-motley-monkey'>
          <motion.div
            onHoverStart={() => setHoverStateLeft(true)}
            onHoverEnd={() => setHoverStateLeft(false)}
            className='flex-start flex h-full w-full flex-none cursor-pointer items-center justify-center'
          >
            <motion.div
              initial={{
                height: hoverStateLeft ? '4rem' : '35rem',
                width: hoverStateLeft ? '4rem' : '35rem',
              }}
              animate={{
                height: '4rem',
                width: '4rem',
                marginLeft: hoverStateLeft ? '0.5rem' : '0',
              }}
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className='relative flex flex-none overflow-hidden rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl'
            >
              <Image
                src='https://www.datocms-assets.com/84152/1667243680-tmm-logo-400x400.png?auto=format&w=500'
                layout='fill'
                alt='logo'
              />
            </motion.div>
            <motion.div
              className='flex w-full items-end text-5xl text-[#664229]'
              initial={{
                opacity: 0,
                width: '0%',
              }}
              animate={{
                opacity: hoverStateLeft ? 1 : 0,
                width: hoverStateLeft ? '100%' : '0%',
                paddingLeft: hoverStateLeft ? '0.5rem' : '0',
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
      )}
      {page.slug === 'the-motley-monkey' ? (
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
              delay: hoverStateLeft ? 1.6 : 2.2,
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
      ) : null}
    </motion.div>
  );
}
