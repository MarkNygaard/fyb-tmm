import React from 'react';
import classNames from 'clsx';
import { FileField } from 'lib/graphql';
import { Image } from 'react-datocms';

export function GridImage(props: any) {
  return (
    <div
      className={classNames(
        'relative flex shrink-0 self-center overflow-hidden object-fill',
        {
          'h-52': props.details.height === 'Small',
          'h-96': props.details.height === 'Medium',
          'h-132': props.details.height === 'Large',
        }
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        data={(props.section.image as FileField).responsiveImage as any}
        layout='fill'
        objectFit='cover'
        objectPosition='50% 50%'
      />
    </div>
  );
}
