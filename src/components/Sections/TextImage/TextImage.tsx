'use client';

import CustomHeading from '@Sections/CustomHeading/CustomHeading';
import RtImage from '@Sections/RtImage/RtImage';
import classNames from 'clsx';
import { motion } from 'framer-motion';
import {
  CustomHeadingRecord,
  FileField,
  ResponsiveImage,
  RtImageRecord,
  TextImageRecord,
} from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import React from 'react';
import { Image, StructuredText } from 'react-datocms';

export default function TextImage({
  id,
  navigationId,
  backgroundColor,
  fadeIn,
  content,
  imageLocation,
  imageStyle,
  image,
}: TextImageRecord) {
  const { ref, animation } = useAnimatedSectionInView({
    navigationId: navigationId as string,
  });
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      key={id}
      className={classNames('px-2 py-20 md:px-10', {
        'bg-skin-secondary': backgroundColor === true,
      })}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? animation : { opacity: 1 }}
        className={classNames('mx-auto flex max-w-6xl flex-col md:flex-row', {
          'flex-col-reverse md:flex-row-reverse': imageLocation === 'LEFT',
        })}
      >
        <article
          className={classNames('prose max-w-none grow px-3 py-4 md:px-4', {
            'prose-invert text-gray-200': backgroundColor === true,
          })}
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
        </article>
        {((image as FileField).responsiveImage as ResponsiveImage) ? (
          <div className='mx-auto md:mb-auto'>
            <div
              className={classNames(
                'relative aspect-square grow px-3 md:h-96 md:p-4',
                {
                  'rounded-full': imageStyle === 'Round',
                  'rounded-xl': imageStyle === 'Rounded Corners',
                },
              )}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={(image as FileField).responsiveImage as ResponsiveImage}
              />
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
