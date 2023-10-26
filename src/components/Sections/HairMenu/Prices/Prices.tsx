import classNames from 'clsx';
import { PriceRecord } from 'lib/graphql';
import React from 'react';
import { StructuredText } from 'react-datocms';

type PricesProps = PriceRecord & { arrayLength: number };

export default function Prices({
  treatment,
  description,
  price,
  from,
  arrayLength,
}: PricesProps) {
  return (
    <div
      className={classNames('m-4 flex flex-col bg-skin-secondary p-5', {
        'lg:min-h-[250px]': arrayLength > 1,
      })}
    >
      <div className='font-medium text-skin-accent'>{treatment}</div>
      <div className='flex h-full w-full justify-center'>
        <div
          className={classNames(
            'prose flex-1 py-2 text-base prose-p:text-gray-200',
            {
              'h-full items-center justify-center font-thin lg:max-w-[655px] lg:py-6 lg:font-light xl:max-w-[800px] xl:py-8':
                arrayLength === 1,
              'font-thin': arrayLength > 1,
            },
          )}
        >
          <StructuredText data={description as any} />
        </div>
      </div>
      {price && (
        <div className='flex justify-end pt-4 text-xl text-skin-accent'>
          {from === true ? 'fra' : null} {price} kr.
        </div>
      )}
    </div>
  );
}
