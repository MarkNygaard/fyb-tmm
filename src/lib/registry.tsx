'use client';

import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

export default function ColorThemeRegistry({
  children,
  primaryColor,
  secondaryColor,
  accentColor,
}: {
  children: React.ReactNode;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}) {
  useServerInsertedHTML(() => (
    <style>:root {`{${primaryColor} ${secondaryColor}  ${accentColor}}`}</style>
  ));

  return <div>{children}</div>;
}
