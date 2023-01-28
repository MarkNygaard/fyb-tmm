import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang='da'
      className='scroll-pt-0 scroll-smooth lg:scroll-pt-20 xl:scroll-pt-16'
    >
      <Head />
      <body className='pb-safe-bottom'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
