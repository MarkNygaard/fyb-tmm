'use client';

import classNames from 'clsx';
import { HairMenuRecord, PriceModuleRecord } from 'lib/graphql';
import { useSectionInView } from 'lib/hooks';
import React from 'react';

import PriceModule from './PriceModules/PriceModule';

export default function HairMenu({
  id,
  navigationId,
  fadeIn,
  priceModules,
}: HairMenuRecord) {
  const { ref } = useSectionInView({ navigationId: navigationId as string });
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      key={id}
      className={classNames(
        'align-center flex flex-col items-center justify-center overflow-hidden px-2 py-10 text-gray-200 md:px-10',
      )}
    >
      <div className='container space-y-2 xl:space-y-4'>
        {priceModules.map((module: PriceModuleRecord) => {
          return <PriceModule key={module.id} {...module} fadeIn={fadeIn} />;
        })}
      </div>
    </div>
  );
}
