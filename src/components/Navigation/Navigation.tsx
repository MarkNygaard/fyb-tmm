import { motion, useMotionValue, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { BsInstagram, BsFacebook } from 'react-icons/bs';

export default function Navigation({ page, introPage }: any) {
  const { scrollY } = useScroll();
  const height = useMotionValue(95);

  useEffect(() => {
    return scrollY.onChange((current) => {
      const previous = scrollY.getPrevious();
      const diff = current - previous;
      const newHeight = height.get() - diff;

      height.set(Math.min(Math.max(newHeight, 65), 95));
    });
  }, [height, scrollY]);

  return (
    <motion.div
      style={{ height }}
      className='absolute z-20 flex w-full items-center justify-between bg-black/30 px-16 shadow-sm backdrop-blur-sm xl:px-28'
    >
      <div className='flex items-center space-x-4'>
        <a
          target='_blank'
          rel='noopener norefferer noreferrer'
          href='https://www.instagram.com/fakeyourbeautycph/'
          className='text-3xl text-gray-300'
        >
          <BsInstagram />
        </a>
        <a
          target='_blank'
          rel='noopener norefferer noreferrer'
          href='https://www.facebook.com/profile.php?id=100087142441016'
          className='text-3xl text-gray-300'
        >
          <BsFacebook />
        </a>
      </div>
      <div className='flex'>
        {page.content?.map((navigation: any) => {
          return navigation.navigationId ? (
            <Link
              key={navigation.id}
              href={'#' + navigation.navigationId}
              className='block py-2 px-4 text-xl font-light uppercase text-gray-300 opacity-100 hover:text-white'
            >
              {navigation.navigationId}
            </Link>
          ) : null;
        })}
      </div>
    </motion.div>
  );
}
