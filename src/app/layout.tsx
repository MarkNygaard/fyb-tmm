import Header from 'components/Header';
import queryDatoCMS from 'lib/datocms';
import { HomePageDocument } from 'lib/graphql';

import '../styles/globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await queryDatoCMS(HomePageDocument);

  return (
    <html lang='en'>
      <body style={{ WebkitTapHighlightColor: 'transparent' }}>
        <Header page={data.page} />
        {children}
      </body>
    </html>
  );
}
