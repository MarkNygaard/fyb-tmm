import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';

export function RightSide({ page }: any) {
  const [hoverStateRight, setHoverStateRight] = useState(false);

  const animate =
    page.slug === 'the-motley-monkey'
      ? {
          width: hoverStateRight ? '10%' : '0%',
          minWidth: '100px',
          transition: {
            duration: hoverStateRight ? 0.4 : 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        }
      : {
          width: '100%',
          transition: {
            duration: hoverStateRight ? 0.4 : 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        };

  return (
    <motion.div
      initial={{
        width: '50%',
      }}
      animate={animate}
      className='flex h-full min-w-[100px] bg-[#3d1e1c] px-2'
    >
      {page.slug !== 'the-motley-monkey' ? (
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
              delay: hoverStateRight ? 1.6 : 2.2,
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
      ) : null}
      {page.slug !== 'the-motley-monkey' ? (
        <motion.div className='flex h-full w-full flex-1 items-center justify-center'>
          <motion.div
            initial={{
              height: hoverStateRight ? '4rem' : '35rem',
              width: hoverStateRight ? '4rem' : '35rem',
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
            className='flex items-center justify-center rounded-full bg-[url("http://www.fyb.dk/img/baggrtilered.jpg")] text-5xl font-bold uppercase text-[#280503] shadow-2xl'
          />
        </motion.div>
      ) : (
        <Link href='/fake-your-beauty'>
          <motion.div
            onHoverStart={() => setHoverStateRight(true)}
            onHoverEnd={() => setHoverStateRight(false)}
            className='flex h-full w-full flex-1 cursor-pointer items-center justify-center'
          >
            <motion.div
              className='flex w-full items-end text-5xl text-[#280503]'
              initial={{
                opacity: 0,
                width: '0%',
              }}
              animate={{
                opacity: hoverStateRight ? 1 : 0,
                width: hoverStateRight ? '100%' : '0%',
                paddingLeft: hoverStateRight ? '0.5rem' : '0',
              }}
              transition={{
                duration: 0.4,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              <BiLeftArrowAlt />
            </motion.div>
            <motion.div
              initial={{
                height: hoverStateRight ? '4rem' : '35rem',
                width: hoverStateRight ? '4rem' : '35rem',
              }}
              animate={{
                height: '4rem',
                width: '4rem',
                marginRight: hoverStateRight ? '0.5rem' : '0',
              }}
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className='flex flex-none rounded-full bg-[url("http://www.fyb.dk/img/baggrtilered.jpg")] text-5xl font-bold uppercase text-[#280503] shadow-2xl'
            />
          </motion.div>
        </Link>
      )}
    </motion.div>
  );
}
