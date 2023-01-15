import classNames from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { Image, StructuredText } from 'react-datocms';
import { useInView } from 'react-intersection-observer';

export default function Biography({ details }: any) {
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
      id={details?.navigationId}
      className={classNames(
        'align-center flex flex-col items-center justify-center overflow-hidden bg-[#1e262b] py-10 px-2 pt-32 text-gray-200 md:px-10'
      )}
    >
      <motion.div
        initial={details.fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={details.fadeIn ? animation : { opacity: 1 }}
        className='container grid grid-cols-bio grid-rows-bio'
      >
        <div className='col-start-2 col-end-6 row-start-2 row-end-5 grid grid-cols-bioText grid-rows-bioText items-center justify-center bg-[#252c31]'>
          <div className='prose col-start-2 col-end-3 row-start-3 row-end-4 max-w-none font-light prose-p:text-gray-200 lg:row-start-2'>
            <StructuredText data={details?.bioDescription} />
          </div>
        </div>
        <div className='relative col-start-1 col-end-5 row-start-1 row-end-3 lg:col-end-3 lg:row-end-4'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={details.image?.responsiveImage}
            layout='fill'
            objectFit='cover'
            objectPosition='50% 50%'
          />
        </div>
        <div></div>
      </motion.div>
    </div>
  );
}
