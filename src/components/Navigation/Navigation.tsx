import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { BsInstagram, BsFacebook } from 'react-icons/bs';

let clamp = (number: any, min: any, max: any) =>
  Math.min(Math.max(number, min), max);

function useBoundedScroll(bounds: any) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bounds],
    [0, 1]
  );

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds));
    });
  }, [bounds, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export default function Navigation({ page, introPage }: any) {
  let { scrollYBoundedProgress } = useBoundedScroll(300);
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  );

  return (
    <motion.div
      style={{
        height: useTransform(scrollYBoundedProgressThrottled, [0, 1], [95, 65]),
        backgroundColor: useMotionTemplate`rgb(0 0 0 / ${useTransform(
          scrollYBoundedProgressThrottled,
          [0, 1],
          [0.5, 0.2]
        )})`,
      }}
      className='absolute z-20 flex w-full items-center justify-between bg-black/30 px-16 shadow-sm backdrop-blur-sm xl:px-28'
    >
      <div className='flex items-center space-x-4'>
        <a
          target='_blank'
          rel='noopener norefferer noreferrer'
          href='https://www.instagram.com/fakeyourbeautycph/'
          className='text-3xl text-gray-300 hover:text-white'
        >
          <BsInstagram />
        </a>
        <a
          target='_blank'
          rel='noopener norefferer noreferrer'
          href='https://www.facebook.com/profile.php?id=100087142441016'
          className='text-3xl text-gray-300 hover:text-white'
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
