import classNames from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';
import { Image } from 'react-datocms';

export default function Hero({ details }: any) {
  return (
    <div
      id={details.navigationId}
      className={classNames(
        'grid grid-cols-1 grid-rows-6 md:grid-cols-6 xl:grid-cols-12'
      )}
    >
      {details.backgroundImage && (
        <div className='relative col-start-1 col-end-2 row-start-1 row-end-7 h-screen w-full bg-[#1e262b] md:col-end-7 xl:col-end-13'>
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
        <div className='relative col-start-1 col-end-2 row-start-2 row-end-4 md:col-start-2 md:col-end-3 md:row-end-3 md:w-2/3 xl:row-end-4 xl:h-2/3'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={details.image?.responsiveImage}
            layout='fill'
            objectFit='contain'
            objectPosition='50% 50%'
            priority
            className='opacity-60'
          />
        </div>
      )}
      <div className='relative col-start-1 col-end-2 row-start-4 row-end-5 flex items-center justify-center md:col-start-2 md:col-end-5 md:justify-start'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className='mt-8 bg-[#be965a] py-4 px-8 text-lg font-light text-white xl:py-6 xl:px-16'
        >
          <a href={details.buttonLink} target='_blank' rel='noreferrer'>
            {details.buttonText}
          </a>
        </motion.button>
      </div>
    </div>
  );
}
