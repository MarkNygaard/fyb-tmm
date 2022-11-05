import Layout from 'components/Layout';
import { motion } from 'framer-motion';
import { sdk } from 'lib/datocms';
import { HomePageDocument } from 'lib/graphql';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Image } from 'react-datocms';
import {
  QueryListenerOptions,
  renderMetaTags,
  useQuerySubscription,
} from 'react-datocms';

export default function Home({
  subscription,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    data: { site, introPage },
  } = useQuerySubscription(subscription);
  const metaTags = introPage.seo.concat(site.favicon);

  return (
    <Layout preview={subscription.enabled ?? false}>
      <Head>{renderMetaTags(metaTags)}</Head>
      <div className='grid h-screen w-screen grid-flow-row md:grid-flow-col'>
        <div className='relative flex h-full w-full items-center justify-center bg-[#B99976]'>
          <Link href={introPage.leftLink?.slug}>
            {introPage.leftLogoType === 'Image' ? (
              <motion.div
                whileHover={{
                  scale: 1.1,
                }}
                className='relative flex aspect-square w-1/2 cursor-pointer flex-col items-center justify-center space-y-4 overflow-hidden rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl translate-z-0 md:w-2/5'
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  data={introPage.leftLogo.responsiveImage}
                  layout='fill'
                />
              </motion.div>
            ) : (
              <motion.div
                whileHover={{
                  scale: 1.1,
                }}
                className='relative flex aspect-square w-1/2 cursor-pointer flex-col items-center justify-center space-y-4 rounded-full bg-[url("http://www.fyb.dk/img/baggrtilered.jpg")] text-5xl font-bold uppercase text-[#280503] shadow-2xl md:w-2/5'
              />
            )}
          </Link>
        </div>
        <div className='relative flex h-full w-full items-center justify-center bg-[#3d1e1c]'>
          <Link href={introPage.rightLink?.slug}>
            {introPage.rightLogoType === 'Image' ? (
              <motion.div
                whileHover={{
                  scale: 1.1,
                }}
                className='relative flex aspect-square w-1/2 cursor-pointer flex-col items-center justify-center space-y-4 overflow-hidden rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl translate-z-0 md:w-2/5'
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  data={introPage.rightLogo.responsiveImage}
                  layout='fill'
                />
              </motion.div>
            ) : (
              <motion.div
                whileHover={{
                  scale: 1.1,
                }}
                className={`relative flex aspect-square w-1/2 cursor-pointer flex-col items-center justify-center space-y-4 rounded-full bg-[url("https://www.datocms-assets.com/84152/1667597978-fake-your-beauty.jpg")] text-5xl font-bold uppercase text-[#280503] shadow-2xl md:w-2/5`}
              />
            )}
            {/* {introPage.righstLogo.responsiveImage.src} */}
          </Link>
        </div>
      </div>
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
