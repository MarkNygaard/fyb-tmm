'use client';

import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

export default function ServerStylesheet({
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
  useServerInsertedHTML(() => {
    if (typeof window === 'undefined') {
      return (
        <style>
          :root {`{${primaryColor} ${secondaryColor}  ${accentColor}}`}
        </style>
      );
    }
  });

  return <>{children}</>;
}
