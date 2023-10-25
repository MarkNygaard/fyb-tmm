import Text from '@Sections/Text/Text';
import clsx from 'clsx';
import { TextRecord } from 'lib/graphql';
import React from 'react';

export function GridText(props: any) {
  return (
    <div
      className={clsx('flex justify-center overflow-hidden bg-skin-accent', {
        'h-52': props.height === 'Small',
        'h-96': props.height === 'Medium',
        'h-132': props.height === 'Large',
      })}
    >
      <Text {...(props.section as TextRecord)} />
    </div>
  );
}
