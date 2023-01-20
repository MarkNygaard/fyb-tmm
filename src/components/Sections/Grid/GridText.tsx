import Text from '@Sections/Text/Text';
import classNames from 'clsx';
import React from 'react';

export function GridText(props: any) {
  return (
    <div
      className={classNames(
        'flex justify-center overflow-hidden bg-skin-accent',
        {
          'h-52': props.details.height === 'Small',
          'h-96': props.details.height === 'Medium',
          'h-132': props.details.height === 'Large',
        }
      )}
    >
      <Text details={props.section} />
    </div>
  );
}
