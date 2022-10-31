import { motion } from 'framer-motion';

export function RightSide({ page }: any) {
  const animate =
    page.slug === 'the-motley-monkey'
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
              delay: 2.2,
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
            className='flex items-center justify-center rounded-full bg-[url("http://www.fyb.dk/img/baggrtilered.jpg")] text-5xl font-bold uppercase text-[#280503] shadow-2xl'
          />
        </motion.div>
      ) : (
        <motion.div className='flex h-full w-full flex-1 items-center justify-center'>
          <motion.div
            className='w-0 opacity-0'
            initial={{
              opacity: 0,
              width: '0%',
            }}
            whileHover={whileHover}
          >
            GO TO FAKE YOUR BEAUTY
          </motion.div>
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
            whileHover={whileHover}
            className='rounded-full bg-[url("http://www.fyb.dk/img/baggrtilered.jpg")] text-5xl font-bold uppercase text-[#280503] shadow-2xl'
          />
        </motion.div>
      )}
    </motion.div>
  );
}
