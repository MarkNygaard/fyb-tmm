import Header from 'components/Header';
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
  Image,
  QueryListenerOptions,
  renderMetaTags,
  useQuerySubscription,
} from 'react-datocms';

export default function Page({
  subscription,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { data } = useQuerySubscription(subscription);
  const { site, page, introPage } = data;
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
          <Header introPage={introPage} page={page} />

          <motion.div
            className='fixed inset-0 z-40 h-screen flex-col lg:hidden'
            initial={{ x: 0 }}
            animate={{ x: '-100vw' }}
            transition={{ duration: 1.6, ease: [0.8, 0, 0.1, 1], delay: 0.6 }}
          >
            {page.slug === introPage.leftLink.slug ? (
              <>
                <motion.div
                  className='relative flex items-center justify-center bg-[#B99976]'
                  initial={{
                    height: '50%',
                  }}
                  animate={{
                    height: '100%',
                    transition: {
                      duration: 0.6,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                >
                  <motion.div
                    initial={{
                      opacity: 1,
                    }}
                    animate={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.36, 0.66, 0.04, 1],
                      delay: 1.6,
                    }}
                    className='relative flex aspect-square w-1/2 items-center justify-center overflow-hidden rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl translate-z-0 lg:h-2/5'
                  >
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                      data={introPage.leftLogo.responsiveImage}
                      layout='fill'
                      lazyLoad={false}
                      className='aspect-square'
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ height: '50%' }}
                  animate={{
                    height: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                  className='bg-[#3d1e1c]'
                ></motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ height: '50%' }}
                  animate={{
                    height: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                  className='bg-[#B99976]'
                ></motion.div>
                <motion.div
                  className='flex items-center justify-center bg-[#3d1e1c]'
                  initial={{
                    height: '50%',
                  }}
                  animate={{
                    height: '100%',
                    transition: {
                      duration: 0.6,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                >
                  <motion.div
                    initial={{
                      opacity: 1,
                    }}
                    animate={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.36, 0.66, 0.04, 1],
                      delay: 1.6,
                    }}
                    className={`relative flex aspect-square w-1/2 cursor-pointer flex-col items-center justify-center space-y-4 rounded-full bg-[url("https://www.datocms-assets.com/84152/1667597978-fake-your-beauty.jpg")] text-5xl font-bold uppercase text-[#280503] shadow-2xl lg:h-2/5`}
                  />
                </motion.div>
              </>
            )}
          </motion.div>
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
