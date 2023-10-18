'use client';

import classNames from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Prices from '../Prices/Prices';

export default function PriceModule({ content, fadeIn }: any) {
  const { ref, inView } = useInView({
    threshold: content.prices.length > 2 ? 0.2 : 0.5,
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
    <motion.div
      ref={ref}
      initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
      animate={fadeIn ? animation : { opacity: 1 }}
      className='text-lg font-bold text-skin-accent xl:pb-4'
    >
      <div className='flex justify-center py-2 text-4xl font-semibold text-skin-accent lg:py-4'>
        {content?.heading}
      </div>
      <div
        className={classNames(
          'mx-auto grid font-normal text-white md:w-full xl:w-3/4',
          {
            '': content?.prices.length === 1,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2':
              content?.prices.length === 2,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3':
              content?.prices.length === 3,
            'grid-cols-1 md:grid-cols-2': content?.prices.length > 3,
          },
        )}
      >
        {content?.prices.map((priceContent: any) => {
          return (
            <Prices
              key={priceContent.id}
              content={priceContent}
              arrayLength={content?.prices.length}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
