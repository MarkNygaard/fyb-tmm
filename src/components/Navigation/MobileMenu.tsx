import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';

export default function MobileMenu({
  onClose,
  page,
}: {
  onClose: () => void;
  page: any;
}) {
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
        <motion.div
          className='absolute flex w-full justify-end p-8 text-3xl text-white lg:hidden'
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.6, ease: [0.8, 0, 0.1, 1], delay: 0.4 },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6,
              ease: [0.36, 0.66, 0.04, 1],
            },
          }}
        >
          <button onClick={onClose}>
            <span className='sr-only'>Open main menu</span>
            <RiCloseLine />
          </button>
        </motion.div>
        <div className='w-full space-y-1 px-8 pb-3 pt-24'>
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
                    className='block px-4 py-2 text-2xl font-normal text-white outline-none'
                    href={'#' + navigation.navigationId}
                    onClick={onClose}
                  >
                    {navigation.navigationId}
                  </a>
                </motion.div>
              )
            );
          })}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.2,
                delay: 0.64,
                type: 'spring',
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2,
                delay: 0.24,
                type: 'spring',
              },
            }}
            className='flex h-full w-full items-end'
          >
            <a
              target='_blank'
              rel='noopener norefferer noreferrer'
              href={page?.instagramUrl!}
              className='flex w-1/2 justify-center text-4xl text-white'
            >
              <BsInstagram />
            </a>
            <a
              target='_blank'
              rel='noopener norefferer noreferrer'
              href={page?.facebookUrl!}
              className='flex w-1/2 justify-center text-4xl text-white'
            >
              <BsFacebook />
            </a>
          </motion.div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
