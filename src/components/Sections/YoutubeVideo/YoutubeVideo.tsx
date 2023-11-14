'use client';

import classNames from 'clsx';
import { motion } from 'framer-motion';
import { YoutubeVideoRecord } from 'lib/graphql';
import { useAnimatedSectionInView } from 'lib/hooks';
import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function YoutubeVideo({
  id,
  navigationId,
  backgroundColor,
  fadeIn,
  link,
}: YoutubeVideoRecord) {
  const { ref, fadeInAnimation } = useAnimatedSectionInView({
    navigationId: navigationId as string,
  });
  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  return (
    <div
      ref={ref}
      id={navigationIdNoSpace!}
      key={id}
      className={classNames('flex justify-center px-2 py-10 md:px-10', {
        'bg-skin-secondary': backgroundColor === true,
      })}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? fadeInAnimation : { opacity: 1 }}
        className='mx-auto w-full max-w-4xl py-8'
      >
        <div
          className={classNames('shadow-x1 rounded-lg  p-2 md:p-4', {
            'bg-skin-primary': backgroundColor === true,
            'bg-skin-secondary': backgroundColor === false,
          })}
        >
          <LiteYouTubeEmbed id={link?.providerUid!} title='Play' />
        </div>
      </motion.div>
    </div>
  );
}
