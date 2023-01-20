import classNames from 'clsx';
import React from 'react';
import { StructuredText } from 'react-datocms';

export default function Prices({ content, arrayLength }: any) {
  return (
    <div
      className={classNames('m-4 flex flex-col bg-skin-secondary p-5', {
        'min-h-[300px]': arrayLength > 1,
      })}
    >
      <div className='font-medium text-skin-accent'>{content?.treatment}</div>
      <div className='font- flex h-full w-full justify-center'>
        <div
          className={classNames(
            'prose flex-1 py-2 text-base prose-p:text-gray-200',
            {
              'h-full items-center justify-center font-light lg:max-w-[655px] lg:py-6 xl:max-w-[800px] xl:py-8':
                arrayLength === 1,
              'font-thin': arrayLength > 1,
            }
          )}
        >
          <StructuredText data={content?.description} />
        </div>
      </div>
      {content?.price && (
        <div className='flex justify-end pt-4 text-xl text-skin-accent'>
          {content?.from === true ? 'fra' : null} {content?.price} kr.
        </div>
      )}
    </div>
  );
}
