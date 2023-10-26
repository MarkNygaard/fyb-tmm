'use client';

import CustomHeading from '@Sections/CustomHeading/CustomHeading';
import RtImage from '@Sections/RtImage/RtImage';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { CustomHeadingRecord, RtImageRecord, TextRecord } from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import React from 'react';
import { StructuredText } from 'react-datocms';

export default function Text({
  id,
  navigationId,
  headerTitle = false,
  backgroundColor,
  fullWidth = false,
  fadeIn,
  content,
}: TextRecord) {
  const { ref, animation } = useAnimatedSectionInView({
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
          <div className='mx-auto border-b-2 border-skin-primary xl:w-3/4'>
            <div className='m-0 mx-auto w-full max-w-2xl pb-6 text-4xl font-bold text-skin-accent'>
              {navigationId}
            </div>
          </div>
        </div>
      )}

      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? animation : { opacity: 1 }}
        className='prose prose-h2:text-4xl prose-h2:text-skin-accent prose-p:text-gray-300 prose-strong:text-skin-accent sm:w-full'
      >
        <StructuredText
          data={content as any}
          renderBlock={({ record }) => {
            if (record.__typename === 'RtImageRecord') {
              return <RtImage {...(record as RtImageRecord)} />;
            } else if (record.__typename === 'CustomHeadingRecord') {
              return <CustomHeading {...(record as CustomHeadingRecord)} />;
            }
            return null;
          }}
        />
      </motion.div>
    </div>
  );
}
