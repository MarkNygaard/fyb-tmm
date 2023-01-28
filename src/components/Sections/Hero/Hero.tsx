import classNames from 'clsx';
import { motion } from 'framer-motion';
import { HeroRecord, PageRecord } from 'lib/graphql';
import Link from 'next/link';
import React from 'react';
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
  content,
}: any) {
  return (
    <div
      id={navigationId!}
      className={classNames(
        'grid grid-cols-1 grid-rows-6 md:grid-cols-6 xl:grid-cols-12'
      )}
    >
      {backgroundImage && (
        <div className='relative col-start-1 col-end-2 row-start-1 row-end-7 h-screen w-full md:col-end-7 xl:col-end-13'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={backgroundImage?.responsiveImage!}
            layout='fill'
            objectFit='cover'
            objectPosition='50% 50%'
            priority
            className='opacity-30'
          />
        </div>
      )}
      {image && (
        <div className='relative col-start-1 col-end-2 row-start-2 row-end-4 md:col-start-2 md:col-end-3 md:row-end-3 xl:col-start-6 xl:col-end-8 xl:row-start-2 xl:row-end-5'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={image?.responsiveImage!}
            layout='fill'
            objectFit='contain'
            objectPosition='50% 50%'
            priority
          />
        </div>
      )}
      <div className='relative col-start-1 col-end-2 row-start-4 row-end-5 flex items-center justify-center md:col-start-2 md:col-end-5 md:justify-start xl:col-start-6 xl:col-end-8 xl:row-start-5 xl:row-end-6 xl:justify-center'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className='mt-8 bg-skin-accent py-4 px-8 text-lg font-light text-white xl:py-6 xl:px-16'
        >
          <a href={buttonLink!} target='_blank' rel='noreferrer'>
            {buttonText}
          </a>
        </motion.button>
      </div>
      <Link
        href={'#' + content[1].navigationId}
        className='relative col-start-1 col-end-2 row-start-6 row-end-7 flex items-center justify-center text-4xl text-gray-300 md:col-end-7 xl:col-end-13'
      >
        <SlArrowDown />
      </Link>
    </div>
  );
}
