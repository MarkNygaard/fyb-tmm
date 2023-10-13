'use client';

import React from 'react';

export default function ColorThemeRegistry({
  primaryColor,
  secondaryColor,
  accentColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}) {
  return (
    <style>:root {`{${primaryColor} ${secondaryColor}  ${accentColor}}`}</style>
  );
}
