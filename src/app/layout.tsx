import Header from 'components/Header';
import queryDatoCMS from 'lib/datocms';
import { HomePageDocument } from 'lib/graphql';

import '../styles/globals.css';
import ColorThemeRegistry from 'lib/registry';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await queryDatoCMS(HomePageDocument);

  // Colors
  const primaryColor = data.page?.primaryColor
    ? `--color-primary: ${data.page.primaryColor.red}, ${data.page.primaryColor.green}, ${data.page.primaryColor.blue};`
    : '';
  const secondaryColor = data.page?.secondaryColor
    ? `--color-secondary: ${data.page.secondaryColor.red}, ${data.page.secondaryColor.green}, ${data.page.secondaryColor.blue};`
    : '';
  const accentColor = data.page?.accentColor
    ? `--color-accent: ${data.page.accentColor.red}, ${data.page.accentColor.green}, ${data.page.accentColor.blue};`
    : '';

  return (
    <html lang='en'>
      <ColorThemeRegistry
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        accentColor={accentColor}
      >
        <body style={{ WebkitTapHighlightColor: 'transparent' }}>
          <Header page={data.page} />
          {children}
        </body>
      </ColorThemeRegistry>
    </html>
  );
}
