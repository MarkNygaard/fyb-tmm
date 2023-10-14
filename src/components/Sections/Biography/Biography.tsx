import classNames from 'clsx';
import { motion } from 'framer-motion';
import { BiographyRecord, FileField, ResponsiveImage } from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import React from 'react';
import { Image, StructuredText } from 'react-datocms';

export type StackModule<T> = Omit<T, 'title' | '__typename'>;
export type BiographyProps = StackModule<BiographyRecord>;

export default function Biography({
  navigationId,
  fadeIn,
  bioDescription,
  image,
}: BiographyProps) {
  const { ref, animation } = useAnimatedSectionInView({
    navigationId: navigationId as string,
  });

  return (
    <div
      ref={ref}
      id={navigationId!}
      className={classNames(
        'align-center flex flex-col items-center justify-center overflow-hidden px-2 py-10 text-gray-200 md:px-10',
      )}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? animation : { opacity: 1 }}
        className='container grid grid-cols-bio grid-rows-bio'
      >
        <div className='col-start-1 col-end-6 row-start-2 row-end-5 ml-2 grid grid-cols-bioText grid-rows-bioTextMobile items-center justify-center bg-skin-secondary lg:col-start-2 lg:grid-rows-bioText'>
          <div className='prose col-start-1 col-end-4 row-start-3 row-end-5 max-w-none p-3 font-light prose-h3:text-skin-accent prose-p:text-gray-200 prose-a:text-skin-accent prose-strong:text-gray-200 md:col-start-2 md:col-end-3 md:row-end-4 md:px-0 lg:row-start-2'>
            <StructuredText data={bioDescription as any} />
          </div>
        </div>
        <div className='relative col-start-1 col-end-5 row-start-1 row-end-3 lg:col-end-3 lg:row-end-4'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={(image as FileField).responsiveImage as ResponsiveImage}
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
