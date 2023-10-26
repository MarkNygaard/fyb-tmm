import Text from '@Sections/Text/Text';
import clsx from 'clsx';
import { TextRecord } from 'lib/graphql';
import React from 'react';

type GridTextProps = { section: TextRecord; height: string };

export function GridText({ section, height }: GridTextProps) {
  return (
    <div
      className={clsx('flex justify-center overflow-hidden bg-skin-accent', {
        'h-52': height === 'Small',
        'h-96': height === 'Medium',
        'h-132': height === 'Large',
      })}
    >
      <Text {...section} />
    </div>
  );
}
