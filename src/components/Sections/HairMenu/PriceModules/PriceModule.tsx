'use client';

import classNames from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { PriceModuleRecord, PriceRecord } from 'lib/graphql';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Prices from '../Prices/Prices';

type PriceModuleProps = PriceModuleRecord & { fadeIn: boolean };

export default function PriceModule({
  prices,
  heading,
  fadeIn,
}: PriceModuleProps) {
  const { ref, inView } = useInView({
    threshold: prices.length > 2 ? 0.2 : 0.5,
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
        {heading}
      </div>
      <div
        className={classNames(
          'mx-auto grid font-normal text-white md:w-full xl:w-3/4',
          {
            '': prices.length === 1,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2':
              prices.length === 2,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3':
              prices.length === 3,
            'grid-cols-1 md:grid-cols-2': prices.length > 3,
          },
        )}
      >
        {prices.map((priceContent: PriceRecord) => {
          return (
            <Prices
              key={priceContent.id}
              {...priceContent}
              arrayLength={prices.length}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
