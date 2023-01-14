import classNames from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';
import { Image } from 'react-datocms';

export default function Header({ details }: any) {
  return (
    <div
      id={details.navigationId}
      className={classNames(
        'flex flex-col items-center bg-[#1e262b] px-2 pt-36 md:px-10'
      )}
    >
      <div className='relative h-44 w-5/6 md:w-2/3'>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          data={details.image?.responsiveImage}
          layout='fill'
          objectFit='contain'
          objectPosition='50% 50%'
          priority
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className='mt-8 bg-[#be965a] py-4 px-7 text-lg font-light text-white'
      >
        <a href={details.buttonLink} target='_blank' rel='noreferrer'>
          {details.buttonText}
        </a>
      </motion.button>
    </div>
  );
}
