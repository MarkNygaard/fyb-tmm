import classNames from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { BiographyRecord, FileField, ResponsiveImage } from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import React, { useState } from 'react';
import { Image, StructuredText } from 'react-datocms';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import useMeasure from 'react-use-measure';

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

  const [fullText, setFullText] = useState<boolean>(false);
  let [ref2, { height }] = useMeasure();

  return (
    <div
      ref={ref}
      id={navigationId!}
      className={classNames(
        'align-center flex flex-col items-center justify-center overflow-hidden px-2 md:py-10 text-gray-200 md:px-10',
      )}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? animation : { opacity: 1 }}
        className='container flex flex-col px-1 lg:grid lg:grid-cols-bio lg:grid-rows-bio'
      >
        <div className='grid grid-rows-2 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4'>
          <div className='aspect-square row-start-1 row-end-3 col-start-1 col-end-2 relative w-4/5 md:w-1/2 lg:w-full mx-auto lg:aspect-auto'>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              className='rounded-full lg:rounded-none border-8 lg:border-0 border-skin-primary'
              data={(image as FileField).responsiveImage as ResponsiveImage}
              layout='fill'
              objectFit='cover'
              objectPosition='50% 50%'
            />
          </div>
          <div className='bg-skin-secondary row-span-1 row-start-2 col-start-1 col-end-2 row-end-3 h-full w-full lg:hidden'></div>
        </div>
        <div className='flex flex-col justify-center bg-skin-secondary pt-2 md:pt-4 md:pb-6 lg:grid lg:col-start-2 lg:col-end-6 lg:row-start-2 lg:row-end-5 lg:grid-rows-bioText lg:grid-cols-bioText'>
          <AnimatePresence>
            <motion.div
              animate={{
                height: height || 'auto',
                transition: { duration: 0.8 },
              }}
              className='lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-4'
            >
              <div
                ref={ref2}
                className={`${
                  !fullText && 'line-clamp-8'
                } leading-[30px] lg:leading-7 md:line-clamp-none max-w-none prose px-2 md:px-4 font-thin md:font-light prose-h3:text-skin-accent prose-p:text-gray-200 prose-a:text-skin-accent prose-strong:text-gray-200 lg:p-0`}
              >
                <StructuredText data={bioDescription as any} />
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => setFullText(!fullText)}
            className='rounded-full aspect-square md:hidden text-gray-400 text-3xl mx-auto p-2 mb-2 active:bg-gray-300/20'
          >
            {fullText ? <AiOutlineUp /> : <AiOutlineDown />}
          </button>
        </div>
        <div></div>
      </motion.div>
    </div>
  );
}
