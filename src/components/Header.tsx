'use client';

import { PageRecord } from 'lib/graphql';
import React from 'react';

import DesktopNavigation from './Navigation/DesktopNavigation';
import MobileNavigation from './Navigation/MobileNavigation';

export default function Header({ page }: any) {
  return (
    <>
      <DesktopNavigation {...(page as PageRecord)} />
      <MobileNavigation page={page} />
      {/* <div className='sticky top-0 z-30 flex w-full justify-end text-3xl text-white md:hidden'>
        <MobileMenu page={page} />
      </div> */}
    </>
  );
}
