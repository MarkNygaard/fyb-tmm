import React from 'react';

import Alert from './Alert';

export default function Layout({
  children,
  preview,
}: {
  preview: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ WebkitTapHighlightColor: 'transparent' }}>
      {preview ? <Alert preview={preview} /> : null}
      {children}
    </div>
  );
}
