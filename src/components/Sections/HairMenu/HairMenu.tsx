import classNames from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import PriceModule from './PriceModules/PriceModule';

export default function HairMenu({ details }: any) {
  const { ref, inView } = useInView({
    threshold: 0.2,
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
      id={details?.navigationId}
      className={classNames(
        'align-center flex flex-col items-center justify-center overflow-hidden py-10 px-2 text-gray-200 md:px-10'
      )}
    >
      <motion.div
        initial={details.fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={details.fadeIn ? animation : { opacity: 1 }}
        className='container space-y-2 xl:space-y-4'
      >
        {details.priceModules.map((module: any) => {
          return <PriceModule key={module.id} content={module} />;
        })}
      </motion.div>
    </div>
  );
}
