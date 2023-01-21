import Layout from 'components/Layout';
import { motion } from 'framer-motion';
import { sdk } from 'lib/datocms';
import { HomePageDocument } from 'lib/graphql';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Image, StructuredText } from 'react-datocms';
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

  // Colors
  const leftColor = `--color-left: ${introPage.leftColor.red}, ${introPage.leftColor.green}, ${introPage.leftColor.blue};`;
  const rightColor = `--color-right: ${introPage.rightColor.red}, ${introPage.rightColor.green}, ${introPage.rightColor.blue};`;

  return (
    <Layout preview={subscription.enabled ?? false}>
      <Head>
        {renderMetaTags(metaTags)}
        <style>:root {`{${leftColor} ${rightColor}}`}</style>
      </Head>
      <div className='grid h-screen w-screen grid-flow-row lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-5'>
        <div className='col-start-1 col-end-2 row-start-1 row-end-6 hidden h-full w-full bg-skin-left lg:flex' />
        <div className='col-start-2 col-end-3 row-start-1 row-end-6 hidden h-full w-full bg-skin-right lg:flex' />
        <div className='relative flex h-full w-full items-center justify-center bg-skin-left lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4'>
          {/* <Link href={introPage.leftLink?.slug}> */}
          <a href='http://www.fyb.dk/'>
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              className='relative flex aspect-square w-40 cursor-pointer flex-col items-center justify-center space-y-4 overflow-hidden rounded-full text-5xl font-bold shadow-2xl translate-z-0 lg:w-64 xl:w-96'
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={introPage.leftLogo.responsiveImage}
                layout='fill'
                objectFit='cover'
                objectPosition='50% 50%'
                priority
              />
            </motion.div>
          </a>
          {/* </Link> */}
        </div>
        <div className='relative flex h-full w-full items-center justify-center bg-skin-right lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-4'>
          <Link href={introPage.rightLink?.slug}>
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              className='relative flex aspect-square w-40 cursor-pointer flex-col items-center justify-center space-y-4 overflow-hidden rounded-full text-5xl font-bold shadow-2xl translate-z-0 lg:w-64 xl:w-96'
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                data={introPage.rightLogo.responsiveImage}
                layout='fill'
                priority
              />
            </motion.div>
          </Link>
        </div>
        {introPage.leftShowIntro && (
          <div className='col-start-1 col-end-2 row-start-4 row-end-6 hidden h-full w-full items-start justify-center lg:flex'>
            <div className='prose prose-zinc w-3/5 rounded-md bg-white/40 p-4 shadow-lg lg:p-8 2xl:w-2/5 2xl:p-12'>
              <StructuredText data={introPage.leftIntro} />
            </div>
          </div>
        )}
        {introPage.rightShowIntro && (
          <div className='col-start-2 col-end-3 row-start-4 row-end-6 hidden h-full w-full items-start justify-center lg:flex'>
            <div className='prose prose-zinc w-3/5 rounded-md bg-white/40 p-4 shadow-lg lg:p-8 2xl:w-2/5 2xl:p-12'>
              <StructuredText data={introPage.rightIntro} />
            </div>
          </div>
        )}
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
