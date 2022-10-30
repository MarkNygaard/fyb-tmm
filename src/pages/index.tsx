import React from 'react';
import Head from 'next/head';

import Layout from 'components/Layout';
import { Button } from '@ui/Button';

import { sdk } from 'lib/datocms';
import { HomePageDocument } from 'lib/graphql';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import {
  useQuerySubscription,
  renderMetaTags,
  QueryListenerOptions,
} from 'react-datocms';
import PageSection from 'components/PageSection';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Home({
  subscription,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    data: { site, page },
  } = useQuerySubscription(subscription);
  const metaTags = page.seo.concat(site.favicon);

  return (
    <Layout preview={subscription.enabled ?? false}>
      <Head>{renderMetaTags(metaTags)}</Head>

      {page.content?.map((content: any, i: any) => {
        return <PageSection key={i} details={content} />;
      })}

      <div className='grid h-screen w-screen grid-cols-2'>
        <motion.div className='flex w-full items-center justify-center bg-[#B99976]'>
          <Link href='/the-motley-monkey'>
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              className='flex h-[35rem] w-[35rem] cursor-pointer flex-col items-center justify-center space-y-4 rounded-full bg-[#987554] text-5xl font-bold uppercase text-[#B99976] shadow-2xl'
            >
              <p>Enter</p>
              <p>The Motley Monkey</p>
            </motion.div>
          </Link>
        </motion.div>
        <div className='full flex w-full items-center justify-center bg-[url("http://www.fyb.dk/img/baggrtilered.jpg")]'>
          <Link href='/fake-your-beauty'>
            <motion.div
              whileHover={{
                scale: 1.1,
              }}
              className='flex h-[35rem] w-[35rem] cursor-pointer flex-col items-center justify-center space-y-4 rounded-full bg-[#3d1e1c] text-5xl font-bold uppercase text-[#280503] shadow-2xl'
            >
              <p>Enter</p>
              <p>Fake Your Beauty</p>
            </motion.div>
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
