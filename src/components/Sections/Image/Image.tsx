'use client';

import classNames from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { FileField, ImageRecord, ResponsiveImage } from 'lib/graphql';
import React, { useEffect } from 'react';
import { Image } from 'react-datocms';
import { useInView } from 'react-intersection-observer';

export type StackModule<T> = Omit<T, 'title' | '__typename'>;
export type ImageProps = StackModule<ImageRecord>;

export default function ImageSection({
  navigationId,
  backgroundColor,
  fadeIn,
  image,
}: ImageProps) {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      });
    }
  }, [inView, animation]);

  return (
    <div
      ref={ref}
      id={navigationId!}
      className={classNames('px-2 py-20 md:px-10', {
        'bg-skin-secondary': backgroundColor === true,
      })}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? animation : { opacity: 1 }}
        className='flex justify-center'
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image data={(image as FileField).responsiveImage as ResponsiveImage} />
      </motion.div>
    </div>
  );
}
