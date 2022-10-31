import { motion, useMotionValue, useScroll } from 'framer-motion';
import { useEffect } from 'react';

import { LeftSide } from './LeftSide';
import { RightSide } from './RightSide';

export function Navigation({ page }: any) {
  const { scrollY } = useScroll();
  const height = useMotionValue(80);

  useEffect(() => {
    return scrollY.onChange((current) => {
      const previous = scrollY.getPrevious();
      const diff = current - previous;
      const newHeight = height.get() - diff;

      height.set(Math.min(Math.max(newHeight, 50), 80));
    });
  }, [height, scrollY]);

  return (
    <div>
      <motion.div
        initial={{
          height: '100vh',
        }}
        animate={{
          height: '5rem',
        }}
        transition={{
          duration: 0.6,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 1.6,
        }}
        className='fixed inset-x-0 z-10 flex shadow backdrop-blur-md'
      >
        <LeftSide page={page}></LeftSide>
        <RightSide page={page}></RightSide>
      </motion.div>
    </div>
  );
}
