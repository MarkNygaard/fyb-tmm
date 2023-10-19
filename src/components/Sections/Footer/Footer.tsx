'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { FooterRecord } from 'lib/graphql';
import { useSectionInView } from 'lib/hooks';
import React from 'react';
import { StructuredText } from 'react-datocms';

export type StackModule<T> = Omit<T, 'title' | '__typename'>;
export type FooterProps = StackModule<FooterRecord>;

export default function Footer({
  location,
  navigationId,
  address,
  openingHours,
  info,
  contact,
}: FooterProps) {
  const { ref } = useSectionInView({
    navigationId: navigationId as string,
  });

  const navigationIdNoSpace = navigationId?.replace(/\s/g, '');

  const center = {
    lat: location?.latitude,
    lng: location?.longitude,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div ref={ref} id={navigationIdNoSpace!} className='pt-10 text-gray-300'>
      <div className='flex flex-col md:items-center pb-4 xl:pb-8'>
        <div className='prose flex flex-col justify-center p-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:pb-8'>
          <StructuredText data={openingHours as any} />
        </div>
        <div className='prose flex flex-col justify-center p-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:pb-8'>
          <StructuredText data={info as any} />
        </div>
      </div>
      <div className='grid grid-cols-1 grid-rows-3'>
        <div className='col-start-1 col-end-2 row-start-1 row-end-4 container mx-auto px-4 md:px-10 xl:px-0'>
          <div className='xl:w-3/4 mx-auto'>
            <div className='md:mx-4 h-60 md:h-80 xl:h-96'>
              <GoogleMap
                center={center}
                zoom={17}
                mapContainerStyle={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0.375rem',
                }}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                <Marker position={center} />
              </GoogleMap>
            </div>
          </div>
        </div>
        <div className='col-start-1 col-end-2 row-start-3 row-end-4 bg-skin-secondary'></div>
      </div>
      <div className='bg-skin-secondary md:flex md:px-10 xl:pb-16 md:py-8 lg:py-16 p-4'>
        <div className='container mx-auto'>
          <div className='mx-auto xl:w-3/4'>
            <div className='md:mx-4 flex justify-center flex-col md:flex-row'>
              <div className='prose flex flex-col justify-center pb-8 py-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:w-1/2'>
                <StructuredText data={contact as any} />
              </div>
              <div className='prose flex flex-col justify-center pb-8 py-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:w-1/2'>
                <StructuredText data={address as any} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex h-12 items-center justify-center bg-skin-accent text-xs text-white md:text-base'>
        &copy; {new Date().getFullYear()} The Motley Monkey. All rights
        reserved.
      </div>
    </div>
  );
}
