'use client';

import StructuredText from '@ui/StructuredText/StructuredText';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { TextRecord } from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import React from 'react';

export default function Text({
  id,
  navigationId,
  headerTitle = false,
  backgroundColor,
  fullWidth = false,
  fadeIn,
  content,
}: TextRecord) {
  const { ref, fadeInAnimation, slideInAnimation } = useAnimatedSectionInView({
    navigationId: navigationId as string,
  });
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      key={id}
      className={clsx(
        'align-center flex flex-col items-center justify-center overflow-hidden px-4 py-10 md:px-10',
        {
          'bg-skin-secondary': backgroundColor === true,
        },
        {
          'min-h-[50vh]': fullWidth === true,
          'container mx-auto': fullWidth === false,
        },
      )}
    >
      {headerTitle && (
        <div className='container pb-6'>
          <motion.div
            initial={fadeIn ? { opacity: 0, y: 50 } : { opacity: 1 }}
            animate={fadeIn ? fadeInAnimation : { opacity: 1 }}
            className='m-0 mx-auto w-full max-w-2xl pb-6 text-4xl font-bold text-gray-400'
          >
            {navigationId}
          </motion.div>
          <div className='mx-auto w-full max-w-2xl'>
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={slideInAnimation}
              className='h-[1px] w-28 bg-skin-accent'
            ></motion.div>
          </div>
        </div>
      )}

      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? fadeInAnimation : { opacity: 1 }}
        className='prose prose-h2:text-4xl prose-h2:text-skin-accent prose-p:text-gray-300 prose-strong:text-skin-accent sm:w-full'
      >
        <StructuredText content={content} />
      </motion.div>
    </div>
  );
}
