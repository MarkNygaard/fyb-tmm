import { motion } from 'framer-motion';

export function RightSide({ page }: any) {
  const animate =
    page.slug === 'the-motley-monkey'
      ? {
          width: '0%',
          minWidth: '100px',
        }
      : {
          width: '100%',
        };

  const whileHover =
    page.slug === 'the-motly-monley'
      ? {
          opacity: 1,
          width: '100%',
        }
      : {};

  return (
    <motion.div
      initial={{
        width: '50%',
      }}
      animate={animate}
      transition={{
        duration: 1.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      whileHover={whileHover}
      className='flex h-full min-w-[100px] bg-[url("http://www.fyb.dk/img/baggrtilered.jpg")] px-2'
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
            {page.content?.map((navigation: any) => {
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
      ) : null}
      <div className='flex h-full w-full flex-1 items-center justify-center'>
        {page.slug !== 'the-motley-monkey' ? (
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
            className='flex items-center justify-center rounded-full bg-[#3d1e1c] text-5xl font-bold uppercase text-[#280503] shadow-2xl'
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
              <p>Fake Your Beauty</p>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <motion.div
              className='w-0 opacity-0'
              initial={{
                opacity: 0,
                width: '0%',
              }}
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
          </>
        )}
      </div>
    </motion.div>
  );
}
