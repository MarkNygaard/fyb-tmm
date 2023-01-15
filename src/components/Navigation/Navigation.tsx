import { motion, useMotionValue, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Image } from 'react-datocms';
import { BsInstagram, BsFacebook } from 'react-icons/bs';

export default function Navigation({ page, introPage }: any) {
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

  return (
    <>
      <div className='absolute top-20 z-10 h-20 w-full bg-black opacity-30' />
      <div className='absolute top-24 z-20 flex w-full justify-between bg-transparent px-16 xl:px-28'>
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
      </div>
    </>
  );
}
