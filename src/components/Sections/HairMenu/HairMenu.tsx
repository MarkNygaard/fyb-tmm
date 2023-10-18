'use client';

import classNames from 'clsx';
import { HairMenuRecord } from 'lib/graphql';
import { useSectionInView } from 'lib/hooks';
import React from 'react';

import PriceModule from './PriceModules/PriceModule';

export type StackModule<T> = Omit<T, 'title' | '__typename'>;
export type HairMenuProps = StackModule<HairMenuRecord>;

export default function HairMenu({
  navigationId,
  fadeIn,
  priceModules,
}: HairMenuProps) {
  const { ref } = useSectionInView({ navigationId: navigationId as string });
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      className={classNames(
        'align-center flex flex-col items-center justify-center overflow-hidden px-2 py-10 text-gray-200 md:px-10',
      )}
    >
      <div className='container space-y-2 xl:space-y-4'>
        {priceModules.map((module: any) => {
          return (
            <PriceModule key={module.id} content={module} fadeIn={fadeIn} />
          );
        })}
      </div>
    </div>
  );
}
