import Header from 'components/Header';
import Layout from 'components/Layout';
import PageSection from 'components/PageSection';
import { AnimatePresence, motion } from 'framer-motion';
import queryDatoCMS from 'lib/datocms';
import { HomePageDocument } from 'lib/graphql';
import { Metadata } from 'next';
import Head from 'next/head';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { toNextMetadata } from 'react-datocms';

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const data = await queryDatoCMS(HomePageDocument, {}, isEnabled);

  return toNextMetadata(data?.page?.seo || []);
}

export default async function Home() {
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(HomePageDocument, {}, isEnabled);

  if (!data?.page) notFound();

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
    <Layout preview={isEnabled ?? false}>
      <Head>
        <style>
          :root {`{${primaryColor} ${secondaryColor}  ${accentColor}}`}
        </style>
      </Head>
      <Header page={data.page} />
      <motion.div className='bg-skin-primary'>
        <AnimatePresence>
          {data.page?.content?.map((section: unknown, i: any) => {
            return (
              <PageSection key={i} sectionProps={section} page={data.page} />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
}
