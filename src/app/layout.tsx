import CustomColor from 'components/CustomColor/CustomColor';
import Header from 'components/Header';
import ActiveSectionContextProvider from 'context/ActiveSectionContext';
import queryDatoCMS from 'lib/datocms';
import { CustomColorDocument, HomePageDocument } from 'lib/graphql';
import { draftMode } from 'next/headers';

import '../styles/globals.css';

export const metadata = {
  viewport: {
    width: 'device-width',
    viewportFit: 'cover',
    initialScale: 1,
    maximumScale: 1,
  },
  appleMobileWebAppStatusBarStyle: {
    blackTranslucent: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();
  const data = await queryDatoCMS(HomePageDocument, {}, isEnabled);
  const colors = await queryDatoCMS(CustomColorDocument, {}, isEnabled);

  // Colors
  const primaryColor = colors.layout?.primaryColor
    ? `--color-primary: ${colors.layout.primaryColor.red}, ${colors.layout.primaryColor.green}, ${colors.layout.primaryColor.blue};`
    : '';
  const secondaryColor = colors.layout?.secondaryColor
    ? `--color-secondary: ${colors.layout.secondaryColor.red}, ${colors.layout.secondaryColor.green}, ${colors.layout.secondaryColor.blue};`
    : '';
  const accentColor = colors.layout?.accentColor
    ? `--color-accent: ${colors.layout.accentColor.red}, ${colors.layout.accentColor.green}, ${colors.layout.accentColor.blue};`
    : '';

  return (
    <html
      lang='en'
      className='scroll-pt-0 scroll-smooth bg-[#1E262B] md:scroll-pt-12 lg:scroll-pt-20 xl:scroll-pt-16'
    >
      <CustomColor
        primary={primaryColor}
        secondary={secondaryColor}
        accent={accentColor}
      />
      <ActiveSectionContextProvider>
        <body
          style={{ WebkitTapHighlightColor: 'transparent' }}
          className='pb-safe-bottom'
        >
          <Header page={data.page} />
          {children}
        </body>
      </ActiveSectionContextProvider>
    </html>
  );
}
