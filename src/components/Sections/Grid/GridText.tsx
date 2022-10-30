import React from 'react';
import classNames from 'clsx';
import Text from '@Sections/Text/Text';

export function GridText(props: any) {
  return (
    <div
      className={classNames('flex justify-center overflow-hidden bg-gray-300', {
        'h-52': props.details.height === 'Small',
        'h-96': props.details.height === 'Medium',
        'h-132': props.details.height === 'Large',
      })}
    >
      <Text details={props.section} />
    </div>
  );
}
