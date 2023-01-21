import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import React from 'react';

export default function MobileMenu({ onClose, page }: any) {
  return (
    <Dialog
      as={motion.div}
      key='modal'
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
          delay: 0.5,
        },
      }}
      className='fixed inset-0 top-0 z-20 flex justify-end bg-black/75 h-screen-safe md:hidden'
      open={true}
      onClose={onClose}
    >
      <Dialog.Panel
        as={motion.div}
        initial={{ y: '-110vh', opacity: 1 }}
        animate={{
          y: 0,
          transition: { duration: 0.6, ease: [0.8, 0, 0.1, 1] },
        }}
        exit={{
          y: '-100%',
          transition: {
            duration: 0.6,
            ease: [0.36, 0.66, 0.04, 1],
            delay: 0.3,
          },
        }}
        className='flex h-screen w-5/6 flex-col justify-between bg-skin-accent shadow-2xl md:w-3/12 xl:w-2/12'
      >
        <div className='w-full space-y-1 px-8 pt-24 pb-3'>
          {page.content?.map((navigation: any, i: any) => {
            return (
              navigation.navigationId && (
                <motion.div
                  key={navigation.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 0.2,
                      delay: 0.4 + 0.04 * i,
                      type: 'spring',
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      delay: 0.04 * i,
                      type: 'spring',
                    },
                  }}
                >
                  <a
                    className='block py-2 px-4 text-2xl font-normal text-white outline-none'
                    href={'#' + navigation.navigationId}
                    onClick={onClose}
                  >
                    {navigation.navigationId}
                  </a>
                </motion.div>
              )
            );
          })}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
