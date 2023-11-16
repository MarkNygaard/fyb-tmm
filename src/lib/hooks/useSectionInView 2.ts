'use client';

import { useActiveSectionContext } from 'context/ActiveSectionContext';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useBreakpoint } from './useBreakpoint';

export function useSectionInView({ navigationId }: { navigationId: string }) {
  const { isBelowXl } = useBreakpoint('xl');
  const threshold = isBelowXl ? 0.05 : 0.4;

  const { ref, inView } = useInView({
    threshold: threshold,
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
