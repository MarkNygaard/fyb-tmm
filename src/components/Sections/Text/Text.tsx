import CustomHeading from '@Sections/CustomHeading/CustomHeading';
import classNames from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { Image, StructuredText } from 'react-datocms';
import { useInView } from 'react-intersection-observer';

export default function Text({ details }: any) {
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
      className='align-center flex items-center justify-center overflow-hidden px-4 py-10 md:px-10'
    >
      <motion.div
        initial={details.fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={details.fadeIn ? animation : { opacity: 1 }}
        className={classNames(
          'prose prose-h2:text-4xl prose-h2:text-skin-accent prose-p:text-gray-300 prose-strong:text-skin-accent sm:w-full',
          {
            'prose-invert': details.backgroundColor === true,
            'prose-gray': details.backgroundColor === false,
          }
        )}
      >
        <StructuredText
          data={details.content}
          renderBlock={({ record }) => {
            if (
              record.__typename === 'RtImageRecord' &&
              (record as any).rtImage &&
              (record as any).rtImage?.responsiveImage
            ) {
              return (
                <div className='flex justify-center'>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image
                    data={(record.rtImage as any).responsiveImage as any}
                  />
                </div>
              );
            } else if (record.__typename === 'CustomHeadingRecord') {
              return <CustomHeading record={record}></CustomHeading>;
            }
            return null;
          }}
        />
      </motion.div>
    </div>
  );
}
