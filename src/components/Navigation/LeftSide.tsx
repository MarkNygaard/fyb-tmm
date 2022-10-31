import { motion } from 'framer-motion';
import Image from 'next/image';

export function LeftSide({ page }: any) {
  const animate =
    page.slug !== 'the-motley-monkey'
      ? {
          width: '0%',
          minWidth: '100px',
          transition: {
            duration: 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        }
      : {
          width: '100%',
          transition: {
            duration: 1.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          },
        };

  const whileHover = {
    opacity: 1,
    width: '50%',
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
      delay: 1.6,
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
              height: '35rem',
              width: '35rem',
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
        <motion.div
          whileHover={whileHover}
          className='flex h-full w-full items-center justify-center'
        >
          <motion.div
            initial={{
              height: '35rem',
              width: '35rem',
            }}
            animate={{
              height: '4rem',
              width: '4rem',
            }}
            transition={{
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className='relative overflow-hidden rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl'
          >
            <Image
              src='https://www.datocms-assets.com/84152/1667243680-tmm-logo-400x400.png?auto=format&w=500'
              layout='fill'
              alt='logo'
            />
          </motion.div>
          <motion.div
            className='w-0 opacity-0'
            initial={{
              opacity: 0,
              width: '0%',
            }}
            whileHover={whileHover}
          >
            GO TO THE MOTLEY MONKEY
          </motion.div>
        </motion.div>
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
              delay: 2.2,
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
