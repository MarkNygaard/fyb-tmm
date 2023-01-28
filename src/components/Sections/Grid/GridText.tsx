import Text, { TextProps } from '@Sections/Text/Text';
import classNames from 'clsx';
import React from 'react';

export function GridText(props: any) {
  return (
    <div
      className={classNames(
        'flex justify-center overflow-hidden bg-skin-accent',
        {
          'h-52': props.height === 'Small',
          'h-96': props.height === 'Medium',
          'h-132': props.height === 'Large',
        }
      )}
    >
      <Text {...(props.section as TextProps)} />
    </div>
  );
}
