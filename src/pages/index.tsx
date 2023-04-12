import Header from 'components/Header';
import Layout from 'components/Layout';
import PageSection from 'components/PageSection';
import { AnimatePresence, motion } from 'framer-motion';
import { sdk } from 'lib/datocms';
import { HomePageDocument } from 'lib/graphql';
import type { InferGetStaticPropsType } from 'next';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import {
  QueryListenerOptions,
  renderMetaTags,
  useQuerySubscription,
} from 'react-datocms';

export default function Home({
  subscription,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    data: { site, page },
  } = useQuerySubscription(subscription);
  const metaTags = page.seo.concat(site.favicon);

  // Colors
  const primaryColor = `--color-primary: ${page.primaryColor.red}, ${page.primaryColor.green}, ${page.primaryColor.blue};`;
  const secondaryColor = `--color-secondary: ${page.secondaryColor.red}, ${page.secondaryColor.green}, ${page.secondaryColor.blue};`;
  const accentColor = `--color-accent: ${page.accentColor.red}, ${page.accentColor.green}, ${page.accentColor.blue};`;

  return (
    <Layout preview={subscription.enabled ?? false}>
          <Head>
            {renderMetaTags(metaTags)}
            <style>
              :root{' '}
              {`{${primaryColor} ${secondaryColor}  ${accentColor}}`}
            </style>
          </Head>
          <Header page={page} />
          <motion.div className='bg-skin-primary'>
            <AnimatePresence>
              {page.content?.map((section: unknown, i: any) => {
                return (
                  <PageSection key={i} sectionProps={section} page={page} />
                );
              })}
            </AnimatePresence>
          </motion.div>
    </Layout>
  );
}

export const getStaticProps = async ({ preview }: GetStaticPropsContext) => {
  const subscription: QueryListenerOptions<any, any> = preview
    ? {
        query: HomePageDocument.loc?.source.body!,
        initialData: await sdk.HomePage(),
        token: process.env.DATOCMS_API_TOKEN!,
        environment: process.env.DATOCMS_ENVIRONMENT || undefined,
        enabled: true,
      }
    : {
        enabled: false,
        query: HomePageDocument.loc?.source.body!,
        initialData: await sdk.HomePage(),
      };

  return {
    props: {
      subscription,
    },
  };
};
