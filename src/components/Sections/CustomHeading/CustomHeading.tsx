import React from 'react';

export default function CustomHeading({ record }: any) {
  return (
    <div>
      <p className='m-0 text-4xl font-bold text-gray-200'>{record.title}</p>
      <p className='mb-10 mt-0 block text-6xl font-medium text-yellow-200'>
        {record.subtitle}
      </p>
    </div>
  );
}
