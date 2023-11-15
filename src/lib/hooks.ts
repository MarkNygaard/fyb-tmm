'use client';

import { useActiveSectionContext } from 'context/ActiveSectionContext';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import resolveConfig from 'tailwindcss/resolveConfig';
import { Config, ScreensConfig } from 'tailwindcss/types/config';

import tailwindConfig from '../../tailwind.config';

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
    threshold: 0.2,
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

const fullConfig = resolveConfig(tailwindConfig as unknown as Config);
const breakpoints = fullConfig?.theme?.screens || {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export function useBreakpoint<K extends string>(breakpointKey: K) {
  const breakpointValue = breakpoints[breakpointKey as keyof ScreensConfig];
  const bool = useMediaQuery({
    query: `(max-width: ${breakpointValue})`,
  });
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

  type KeyAbove = `isAbove${Capitalize<K>}`;
  type KeyBelow = `isBelow${Capitalize<K>}`;

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, '')),
    [`isAbove${capitalizedKey}`]: !bool,
    [`isBelow${capitalizedKey}`]: bool,
  } as Record<K, number> & Record<KeyAbove | KeyBelow, boolean>;
}
