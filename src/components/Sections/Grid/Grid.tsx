import classNames from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import { GridRecord } from 'lib/graphql';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { GridImage } from './GridImage';
import { GridText } from './GridText';

export type StackModule<T> = Omit<T, 'title' | '__typename'>;
export type GridProps = StackModule<GridRecord>;

export default function Grid({
  navigationId,
  backgroundColor,
  fadeIn,
  mobileColumns,
  tabletColumns,
  desktopColumns,
  gap,
  fullWidth,
  sections,
  height,
}: GridProps) {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      });
    }
  }, [inView, animation]);

  return (
    <div
      ref={ref}
      id={navigationId!}
      className={classNames('flex justify-center py-20 px-0 md:px-10', {
        'bg-skin-secondary': backgroundColor === true,
      })}
    >
      <motion.div
        initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
        animate={fadeIn ? animation : { opacity: 1 }}
        className={classNames('grid', {
          [`grid-cols-${mobileColumns as string}`]: mobileColumns,
          [`md:grid-cols-${tabletColumns as string}`]: tabletColumns,
          [`xl:grid-cols-${desktopColumns as string}`]: desktopColumns,
          [`gap-${gap as string}`]: gap,
          'md:w-10/12': fullWidth === false,
        })}
      >
        {sections.map((section: any) => {
          return (
            <div
              key={section.id}
              className={classNames('relative', {
                [`order-${section.mobilePosition as string}`]:
                  section.mobilePosition,
                [`md:order-${section.tabletPosition as string}`]:
                  section.tabletPosition,
                [`xl:order-${section.desktopPosition as string}`]:
                  section.desktopPosition,
              })}
            >
              {section.__typename === 'GridImage' ? (
                <GridImage
                  key={section.id}
                  height={height}
                  section={section}
                ></GridImage>
              ) : section.__typename === 'GridText' ? (
                <GridText height={height} section={section}></GridText>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
