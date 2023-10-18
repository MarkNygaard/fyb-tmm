'use client';

import clsx from 'clsx';
import SvgRenderer from 'components/SvgRenderer';
import { useActiveSectionContext } from 'context/ActiveSectionContext';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import { PageModelContentField } from 'lib/graphql';
import Link from 'next/link';
import { useEffect } from 'react';

let clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

function useBoundedScroll(bounds: number) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bounds],
    [0, 1],
  );

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds));
    });
  }, [bounds, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export default function DesktopNavigation({ socialMediaLinks, content }: any) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  let { scrollYBoundedProgress } = useBoundedScroll(300);
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1],
  );

  return (
    <div className='hidden w-full md:sticky md:top-0 md:z-40 md:flex'>
      <motion.div
        style={{
          height: useTransform(
            scrollYBoundedProgressThrottled,
            [0, 1],
            [95, 65],
          ),
          backgroundColor: useMotionTemplate`rgb(0 0 0 / ${useTransform(
            scrollYBoundedProgressThrottled,
            [0, 1],
            [0.5, 0.2],
          )})`,
        }}
        className='absolute z-20 flex w-full items-center justify-between bg-black/30 px-6 lg:px-16 shadow-sm backdrop-blur-sm xl:px-28'
        id='nav'
      >
        <div className='flex items-center space-x-4'>
          {socialMediaLinks.map((links: any) => {
            return (
              <Link
                key={links.id}
                aria-label='social-link'
                target='_blank'
                rel='noopener norefferer noreferrer'
                href={links.url}
                className='text-gray-300 hover:text-white'
              >
                <SvgRenderer url={links.icon.url} />
              </Link>
            );
          })}
        </div>
        <div className='flex space-x-2'>
          {content?.map((Section: PageModelContentField) => {
            const navigationIdNoSpace = Section.navigationId?.replace(
              /\s/g,
              '',
            );

            return (
              Section.navigationId && (
                <Link
                  key={Section.id}
                  href={'#' + navigationIdNoSpace}
                  onClick={() => {
                    setActiveSection(Section.navigationId as string);
                    setTimeOfLastClick(Date.now());
                  }}
                  className={clsx(
                    'flex relative px-2 lg:px-3 py-1 lg:py-2 lg:text-lg uppercase opacity-100  xl:px-4 xl:text-xl',
                    {
                      'font-light text-gray-300 hover:text-white':
                        Section.navigationId !== activeSection,
                    },
                    {
                      'font-base text-skin-accent':
                        Section.navigationId === activeSection,
                    },
                  )}
                >
                  {Section.navigationId}
                  {Section.navigationId === activeSection && (
                    <motion.span
                      className='bg-gray-300/10 rounded-full absolute inset-0 -z-10'
                      layoutId='activeSection'
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              )
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}