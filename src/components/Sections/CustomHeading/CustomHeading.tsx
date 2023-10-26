import { CustomHeadingRecord } from 'lib/graphql';
import React from 'react';

export default function CustomHeading({
  id,
  title,
  subtitle,
}: CustomHeadingRecord) {
  return (
    <div key={id}>
      <p className='m-0 text-4xl font-bold text-gray-200'>{title}</p>
      <p className='mb-10 mt-0 block text-6xl font-medium text-yellow-200'>
        {subtitle}
      </p>
    </div>
  );
}
