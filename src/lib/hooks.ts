'use client';

import { useActiveSectionContext } from 'context/ActiveSectionContext';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function useSectionInView({ navigationId }: { navigationId: string }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(navigationId!);
    }
  }, [inView, setActiveSection, navigationId, timeOfLastClick]);

  return {
    ref,
  };
}

export function useAnimatedSectionInView({
  navigationId,
}: {
  navigationId: string;
}) {
  const { ref, inView } = useInView({
    threshold: 0.4,
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
