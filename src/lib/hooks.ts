import { useActiveSectionContext } from 'context/ActiveSectionContext';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function useSectionInView({ navigationId }: { navigationId: string }) {
  const { ref, inView } = useInView();
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
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(navigationId!);
    }
  }, [inView, animation, navigationId, setActiveSection, timeOfLastClick]);

  return {
    animation,
    ref,
  };
}
