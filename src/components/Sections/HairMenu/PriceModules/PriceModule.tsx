import classNames from 'clsx';
import React from 'react';

import Prices from '../Prices/Prices';

export default function PriceModule({ content }: any) {
  return (
    <div className='text-lg font-bold text-skin-accent xl:pb-4'>
      <div className='flex justify-center py-2 text-4xl font-semibold text-skin-accent lg:py-4'>
        {content?.heading}
      </div>
      <div
        className={classNames(
          'mx-auto grid font-normal text-white md:w-full xl:w-3/4',
          {
            '': content?.prices.length === 1,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2':
              content?.prices.length === 2,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3':
              content?.prices.length === 3,
            'grid-cols-1 md:grid-cols-2': content?.prices.length > 3,
          }
        )}
      >
        {content?.prices.map((priceContent: any) => {
          return (
            <Prices
              key={priceContent.id}
              content={priceContent}
              arrayLength={content?.prices.length}
            />
          );
        })}
      </div>
    </div>
  );
}
