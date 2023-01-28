import Header from 'components/Header';
import Layout from 'components/Layout';
import PageSection from 'components/PageSection';
import { AnimatePresence, motion } from 'framer-motion';
import { sdk } from 'lib/datocms';
import { FileField, PageBySlugDocument, ResponsiveImage } from 'lib/graphql';
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

  // Colors
  const primaryColor = `--color-primary: ${page.primaryColor.red}, ${page.primaryColor.green}, ${page.primaryColor.blue};`;
  const secondaryColor = `--color-secondary: ${page.secondaryColor.red}, ${page.secondaryColor.green}, ${page.secondaryColor.blue};`;
  const accentColor = `--color-accent: ${page.accentColor.red}, ${page.accentColor.green}, ${page.accentColor.blue};`;
  const leftColor = `--color-left: ${introPage.leftColor.red}, ${introPage.leftColor.green}, ${introPage.leftColor.blue};`;
  const rightColor = `--color-right: ${introPage.rightColor.red}, ${introPage.rightColor.green}, ${introPage.rightColor.blue};`;

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
          <Head>
            {renderMetaTags(metaTags)}
            <style>
              :root{' '}
              {`{${primaryColor} ${secondaryColor}  ${accentColor} ${leftColor} ${rightColor}}`}
            </style>
          </Head>
          <Header introPage={introPage} page={page} />

          {/* MOBILE START HERE */}

          <motion.div
            className='fixed inset-0 z-40 h-screen flex-col lg:hidden'
            initial={{ x: 0 }}
            animate={{ x: '-100vw' }}
            transition={{ duration: 1.6, ease: [0.8, 0, 0.1, 1], delay: 0.6 }}
          >
            {page.slug === introPage.leftLink.slug ? (
              <>
                <motion.div
                  className='relative flex items-center justify-center bg-skin-left'
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
                    className='relative flex aspect-square w-40 items-center justify-center overflow-hidden rounded-full bg-skin-right text-5xl font-bold uppercase shadow-2xl translate-z-0 lg:w-64'
                  >
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                      data={
                        (introPage.leftLogo as FileField)
                          .responsiveImage as ResponsiveImage
                      }
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
                  className='bg-skin-right'
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
                  className='bg-skin-left'
                ></motion.div>
                <motion.div
                  className='flex items-center justify-center bg-skin-right'
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
                    className='relative flex aspect-square w-40 items-center justify-center overflow-hidden rounded-full bg-skin-right text-5xl font-bold uppercase shadow-2xl translate-z-0 lg:w-64'
                  >
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                      data={
                        (introPage.rightLogo as FileField)
                          .responsiveImage as ResponsiveImage
                      }
                      layout='fill'
                      lazyLoad={false}
                      className='aspect-square'
                      priority
                    />
                  </motion.div>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* MOBILE STOP HERE */}

          <motion.div className='bg-skin-primary'>
            <AnimatePresence>
              {page.content?.map((section: unknown, i: any) => {
                return (
                  <PageSection key={i} sectionProps={section} page={page} />
                );
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
