import { CustomHeadingRecord } from 'lib/graphql';
import React from 'react';

export default function CustomHeading({
  id,
  title,
  subtitle,
}: CustomHeadingRecord) {
  return (
    <div key={id}>
      <div className='m-0 text-2xl font-medium text-white'>{title}</div>
      <div className='mb-10 mt-0 block text-xl font-medium text-skin-accent'>
        {subtitle}
      </div>
    </div>
  );
}
