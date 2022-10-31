import Layout from 'components/Layout';
import PageSection from 'components/PageSection';
import { AnimatePresence, motion } from 'framer-motion';
import { sdk } from 'lib/datocms';
import { PageBySlugDocument } from 'lib/graphql';
import type { InferGetStaticPropsType } from 'next';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  QueryListenerOptions,
  renderMetaTags,
  useQuerySubscription,
} from 'react-datocms';

import { Navigation } from '../components/Navigation/Navigation';

export default function Page({
  subscription,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { data } = useQuerySubscription(subscription);
  const { site, page } = data;
  const metaTags = page?.seo.concat(site.favicon);

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={subscription.enabled ?? false}>
      {router.isFallback ? (
        <h1 className='m-12 text-center text-6xl font-semibold leading-tight tracking-tighter dark:text-gray-300 md:text-left md:text-7xl md:leading-none lg:text-8xl'>
          Loading…
        </h1>
      ) : (
        <>
          <Head>{renderMetaTags(metaTags)}</Head>
          <Navigation page={page}></Navigation>
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 1.6,
            }}
          >
            <AnimatePresence>
              {page.content?.map((section: any, i: any) => {
                return <PageSection key={i} details={section} />;
              })}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await sdk
      .AllPagesSlugs()
      .then((data) => data.allPages.map((page: any) => `/${page.slug}`)),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext<{ slug: string }>) => {
  const graphqlRequest = {
    query: PageBySlugDocument.loc?.source.body!,
    initialData: await sdk.PageBySlug({ slug: params?.slug ?? '' }),
    preview,
    variables: {
      slug: params?.slug,
    },
  };

  const subscription: QueryListenerOptions<any, any> = preview
    ? {
        ...graphqlRequest,
        token: process.env.DATOCMS_API_TOKEN!,
        enabled: true,
      }
    : {
        ...graphqlRequest,
        enabled: false,
      };

  return {
    props: {
      subscription,
    },
  };
};
