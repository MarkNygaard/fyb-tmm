import React from 'react';

export type ConditionalWrapProps = {
  condition: boolean;
  wrap: (children: React.ReactElement) => React.ReactElement;
  children: React.ReactElement;
};

const ConditionalWrap: React.FC<ConditionalWrapProps> = ({
  condition,
  wrap,
  children,
}) => (condition ? React.cloneElement(wrap(children)) : children);

export { ConditionalWrap };
