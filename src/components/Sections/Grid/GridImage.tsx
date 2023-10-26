import classNames from 'clsx';
import { GridImageRecord } from 'lib/graphql';
import React from 'react';
import { Image } from 'react-datocms';

type GridImageProps = GridImageRecord & { height: string };

export function GridImage({ image, height }: GridImageProps) {
  return (
    <div
      className={classNames(
        'relative flex shrink-0 self-center overflow-hidden object-fill',
        {
          'h-52': height === 'Small',
          'h-96': height === 'Medium',
          'h-132': height === 'Large',
        },
      )}
    >
      {image?.responsiveImage && (
        <>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            data={image.responsiveImage}
            layout='fill'
            objectFit='cover'
            objectPosition='50% 50%'
          />
        </>
      )}
    </div>
  );
}
