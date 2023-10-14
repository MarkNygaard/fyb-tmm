import classNames from 'clsx';
import { FileField, ResponsiveImage } from 'lib/graphql';
import React from 'react';
import { Image } from 'react-datocms';

export function GridImage(props: any) {
  return (
    <div
      className={classNames(
        'relative flex shrink-0 self-center overflow-hidden object-fill',
        {
          'h-52': props.height === 'Small',
          'h-96': props.height === 'Medium',
          'h-132': props.height === 'Large',
        },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        data={
          (props.section.image as FileField).responsiveImage as ResponsiveImage
        }
        layout='fill'
        objectFit='cover'
        objectPosition='50% 50%'
      />
    </div>
  );
}
