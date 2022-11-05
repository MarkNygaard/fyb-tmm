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
          duration: 0.6,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.6,
          ease: [0.36, 0.66, 0.04, 1],
          delay: 0.4,
        },
      }}
      className='fixed inset-0 top-0 z-20 h-screen bg-black/75 md:hidden'
      open={true}
      onClose={onClose}
    >
      <Dialog.Panel
        as={motion.div}
        initial={{ y: '-110vh', opacity: 1 }}
        animate={{
          y: 0,
          transition: { duration: 1, ease: [0.8, 0, 0.1, 1] },
        }}
        exit={{
          y: '-100%',
          transition: {
            duration: 1,
            ease: [0.36, 0.66, 0.04, 1],
          },
        }}
        className='flex h-screen w-5/6 flex-col bg-[#B99976] shadow-2xl md:w-3/12 xl:w-2/12'
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              x: {
                bounce: 0,
                duration: 0.4,
                ease: [0.36, 0.66, 0.04, 1],
                delay: 2,
              },
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              x: {
                bounce: 0,
                duration: 0.4,
                ease: [0.36, 0.66, 0.04, 1],
                delay: 2,
              },
            },
          }}
          className='w-full space-y-1 px-8 pt-24 pb-3'
        >
          {page.content?.map((navigation: any) => {
            return (
              navigation.navigationId && (
                <button onClick={onClose} className='flex flex-col'>
                  <a
                    key={navigation.id}
                    href={'#' + navigation.navigationId}
                    className='block py-2 px-4 text-2xl font-normal text-[#664229] hover:text-[#987554]'
                  >
                    {navigation.navigationId}
                  </a>
                </button>
              )
            );
          })}
        </motion.div>
      </Dialog.Panel>
    </Dialog>
  );
}