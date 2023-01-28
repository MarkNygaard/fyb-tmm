import { FileField, ResponsiveImage } from 'lib/graphql';
import React from 'react';
import { Image } from 'react-datocms';

export default function RtImage({ record }: any) {
  return (
    <div className='flex justify-center'>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        data={(record.image as FileField).responsiveImage as ResponsiveImage}
      />
    </div>
  );
}
