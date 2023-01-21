import classNames from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';
import { Image } from 'react-datocms';
import { SlArrowDown } from 'react-icons/sl';

export default function Hero({ details }: any) {
  return (
    <div
      id={details.navigationId}
      className={classNames(
        'grid grid-cols-1 grid-rows-6 md:grid-cols-6 xl:grid-cols-12'
      )}
    >
      {details.backgroundImage && (
        <div className='relative col-start-1 col-end-2 row-start-1 row-end-7 h-screen w-full md:col-end-7 xl:col-end-13'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={details.backgroundImage?.responsiveImage}
            layout='fill'
            objectFit='cover'
            objectPosition='50% 50%'
            priority
            className='opacity-30'
          />
        </div>
      )}
      {details.image && (
        <div className='relative col-start-1 col-end-2 row-start-2 row-end-4 md:col-start-2 md:col-end-3 md:row-end-3 xl:col-start-6 xl:col-end-8 xl:row-start-2 xl:row-end-5 xl:opacity-50'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={details.image?.responsiveImage}
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
          <a href={details.buttonLink} target='_blank' rel='noreferrer'>
            {details.buttonText}
          </a>
        </motion.button>
      </div>
      <div className='relative col-start-1 col-end-2 row-start-6 row-end-7 hidden items-center justify-center text-4xl text-gray-300 md:col-end-7 lg:flex xl:col-end-13'>
        <SlArrowDown />
      </div>
    </div>
  );
}
