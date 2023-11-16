'use client';

import { useActiveSectionContext } from 'context/ActiveSectionContext';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useBreakpoint } from './useBreakpoint';

export function useAnimatedSectionInView({
  navigationId,
}: {
  navigationId: string;
}) {
  const { isBelowXl } = useBreakpoint('xl');
  const threshold = isBelowXl ? 0.05 : 0.2;

  const { ref, inView } = useInView({
    threshold: threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();
  const fadeInAnimation = useAnimation();
  const slideInAnimation = useAnimation();

  useEffect(() => {
    if (inView) {
      fadeInAnimation.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
        },
      });
      slideInAnimation.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
        },
      });
    }
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(navigationId!);
    }
  }, [
    inView,
    fadeInAnimation,
    slideInAnimation,
    navigationId,
    setActiveSection,
    timeOfLastClick,
  ]);

  return {
    fadeInAnimation,
    slideInAnimation,
    ref,
  };
}
