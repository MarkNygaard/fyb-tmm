import classNames from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import PriceModule from './PriceModules/PriceModule';

export default function HairMenu({ details }: any) {
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
      id={details.navigationId}
      className={classNames(
        'align-center flex flex-col items-center justify-center overflow-hidden bg-[#1e262b] py-20 px-2 text-gray-200 md:px-10'
      )}
    >
      {/* <div className='pb-14 text-4xl font-bold text-[#c09a5d]'>
        {details.navigationId}
      </div> */}
      <motion.div
        initial={details.fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={details.fadeIn ? animation : { opacity: 1 }}
        className='container space-y-6'
      >
        {details.priceModules.map(({ module }: any) => {
          return <PriceModule key={module.id} content={module} />;
        })}
      </motion.div>
    </div>
  );
}
