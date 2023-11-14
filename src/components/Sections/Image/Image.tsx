'use client';

import classNames from 'clsx';
import { motion } from 'framer-motion';
import { ImageRecord, ResponsiveImage } from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import React from 'react';
import { Image } from 'react-datocms';

export default function ImageSection({
  id,
  navigationId,
  backgroundColor,
  fadeIn,
  image,
}: ImageRecord) {
  const { ref, fadeInAnimation } = useAnimatedSectionInView({
    navigationId: navigationId as string,
  });
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      key={id}
      className={classNames('px-2 py-20 md:px-10', {
        'bg-skin-secondary': backgroundColor === true,
      })}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? fadeInAnimation : { opacity: 1 }}
        className='flex justify-center'
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image data={image?.responsiveImage as ResponsiveImage} />
      </motion.div>
    </div>
  );
}
