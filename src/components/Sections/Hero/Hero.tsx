'use client';

import { Button } from '@ui/Button/Button';
import classNames from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FileField,
  HeroRecord,
  PageRecord,
  ResponsiveImage,
} from 'lib/graphql';
import { useSectionInView } from 'lib/hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-datocms';
import { SlArrowDown } from 'react-icons/sl';

export type StackModule<T> = Omit<T, 'title' | '__typename'>;
export type HeroProps = StackModule<HeroRecord>;
export type PageProps = StackModule<PageRecord>;

export default function Hero({
  navigationId,
  image,
  backgroundImage,
  buttonLink,
  buttonText,
  firstSection,
}: any) {
  const { ref } = useSectionInView({ navigationId: navigationId as string });
  const [isVisible, setIsVisible] = useState(false);
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  });

  const listenToScroll = () => {
    let heightToShowFrom = 600;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToShowFrom) {
      setIsVisible(true);
    } else {
      isVisible && setIsVisible(false);
    }
  };

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      className={classNames(
        'grid grid-cols-1 grid-rows-6 md:grid-cols-6 xl:grid-cols-12',
      )}
    >
      {backgroundImage && (
        <div className='relative col-start-1 col-end-2 row-start-1 row-end-7 h-screen w-full md:col-end-7 xl:col-end-13'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={
              (backgroundImage as FileField).responsiveImage as ResponsiveImage
            }
            layout='fill'
            objectFit='cover'
            objectPosition='50% 50%'
            priority
            className='opacity-30'
          />
        </div>
      )}
      {image && (
        <div className='relative col-start-1 col-end-2 row-start-2 row-end-4 md:col-start-3 md:col-end-5 lg:row-start-2 lg:row-end-5 md:row-end-5 xl:col-start-6 xl:col-end-8 xl:row-start-2 xl:row-end-5'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={(image as FileField).responsiveImage as ResponsiveImage}
            layout='fill'
            objectFit='contain'
            objectPosition='50% 50%'
            priority
          />
        </div>
      )}
      <div className='relative col-start-1 col-end-2 row-start-4 row-end-5 lg:row-start-5 md:row-end-6 mt-8 flex items-center justify-center md:col-start-3 md:col-end-5 xl:col-start-6 xl:col-end-8 xl:row-start-5 xl:row-end-6'>
        <a href={buttonLink!} target='_blank' rel='noreferrer'>
          <Button label={buttonText} />
        </a>
      </div>
      <Link
        href={'#' + firstSection}
        className='relative col-start-1 col-end-2 row-start-6 row-end-7 flex items-center justify-center text-4xl text-gray-300 md:col-end-7 xl:col-end-13'
      >
        <button className='active:bg-gray-300/20 rounded-full p-2'>
          <SlArrowDown />
        </button>
      </Link>
      <AnimatePresence>
        {isVisible && (
          <a href={buttonLink!} target='_blank' rel='noreferrer'>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed bottom-14 right-20 z-50 hidden lg:flex'
            >
              <Button width='small' label={buttonText} />
            </motion.div>
          </a>
        )}
      </AnimatePresence>
    </div>
  );
}
