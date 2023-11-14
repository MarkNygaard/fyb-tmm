'use client';

import classNames from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { BiographyRecord, FileField, ResponsiveImage } from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import React, { useState } from 'react';
import { Image, StructuredText } from 'react-datocms';
import { AiOutlineDownCircle, AiOutlineUpCircle } from 'react-icons/ai';
import useMeasure from 'react-use-measure';

export default function Biography({
  id,
  navigationId,
  fadeIn,
  bioDescription,
  image,
}: BiographyRecord) {
  const { ref, fadeInAnimation } = useAnimatedSectionInView({
    navigationId: navigationId as string,
  });

  const [fullText, setFullText] = useState<boolean>(false);
  let [ref2, { height }] = useMeasure();
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      key={id}
      className={classNames(
        'align-center flex flex-col items-center justify-center overflow-hidden px-2 text-gray-200 md:px-10 md:py-10',
      )}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? fadeInAnimation : { opacity: 1 }}
        className='container flex flex-col px-1 xl:grid xl:grid-cols-bio xl:grid-rows-bio'
      >
        <div className='grid grid-rows-2 xl:col-start-1 xl:col-end-3 xl:row-start-1 xl:row-end-4'>
          <div className='relative col-start-1 col-end-2 row-start-1 row-end-3 mx-auto aspect-square w-4/5 md:w-1/2 xl:aspect-auto xl:w-full'>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              className='rounded-full border-8 border-skin-primary xl:rounded-none xl:border-0'
              data={(image as FileField).responsiveImage as ResponsiveImage}
              layout='fill'
              objectFit='cover'
              objectPosition='50% 50%'
            />
          </div>
          <div className='col-start-1 col-end-2 row-span-1 row-start-2 row-end-3 h-full w-full bg-skin-secondary xl:hidden'></div>
        </div>
        <div className='flex flex-col justify-center bg-skin-secondary pt-2 md:pb-6 md:pt-4 xl:col-start-2 xl:col-end-6 xl:row-start-2 xl:row-end-5 xl:grid xl:grid-cols-bioText xl:grid-rows-bioText'>
          <AnimatePresence>
            <motion.div
              animate={{
                height: height || 'auto',
                transition: { duration: 0.8 },
              }}
              className='xl:col-start-2 xl:col-end-3 xl:row-start-2 xl:row-end-4'
            >
              <div
                ref={ref2}
                className={`${
                  !fullText && 'line-clamp-8'
                } prose max-w-none px-2 font-thin leading-[30px] prose-h3:text-skin-accent prose-p:text-gray-200 prose-a:text-skin-accent prose-strong:text-gray-200 md:line-clamp-none md:px-4 md:font-light lg:px-6 xl:p-0 xl:leading-7`}
              >
                <StructuredText data={bioDescription as any} />
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => setFullText(!fullText)}
            className='mx-auto mb-2 aspect-square rounded-full p-2 text-3xl text-gray-400 active:bg-gray-300/20 md:hidden'
          >
            {fullText ? <AiOutlineUpCircle /> : <AiOutlineDownCircle />}
          </button>
        </div>
        <div></div>
      </motion.div>
    </div>
  );
}
