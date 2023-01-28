import CustomHeading from '@Sections/CustomHeading/CustomHeading';
import RtImage from '@Sections/RtImage/RtImage';
import classNames from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { FileField, ResponsiveImage, TextImageRecord } from 'lib/graphql';
import React, { useEffect } from 'react';
import { Image, StructuredText } from 'react-datocms';
import { useInView } from 'react-intersection-observer';

export type StackModule<T> = Omit<T, 'title' | '__typename'>;
export type TextImageProps = StackModule<TextImageRecord>;

export default function TextImage({
  navigationId,
  backgroundColor,
  fadeIn,
  content,
  imageLocation,
  imageStyle,
  image,
}: TextImageProps) {
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
      id={navigationId!}
      className={classNames('py-20 px-2 md:px-10', {
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
          className={classNames('prose max-w-none grow py-4 px-3 md:px-4', {
            'prose-invert text-gray-200': backgroundColor === true,
          })}
        >
          <StructuredText
            data={content as any}
            renderBlock={({ record }) => {
              if (
                record.__typename === 'RtImageRecord' &&
                (record as any).image &&
                (record as any).image?.responsiveImage
              ) {
                return <RtImage record={record} />;
              } else if (record.__typename === 'CustomHeadingRecord') {
                return <CustomHeading record={record} />;
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
                }
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
