import { RtImageRecord } from 'lib/graphql';
import React from 'react';
import { Image } from 'react-datocms';

export default function RtImage({ id, image }: RtImageRecord) {
  return (
    <div key={id} className='flex justify-center'>
      {image?.responsiveImage && (
        <>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image data={image.responsiveImage} />
        </>
      )}
    </div>
  );
}
