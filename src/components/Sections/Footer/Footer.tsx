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
    <div ref={ref} id={navigationId!} className='pt-10 text-gray-300'>
      <div className='grid grid-cols-1 grid-rows-footerSmall md:grid-cols-footerMedium md:grid-rows-footerMedium lg:grid-rows-footerLarge xl:grid-cols-footerLarge xl:grid-rows-footerXLarge'>
        <div className='col-start-1 col-end-2 row-start-6 row-end-[8] bg-skin-secondary md:col-start-1 md:col-end-13 md:row-start-4 md:row-end-7 xl:row-start-5 xl:row-end-7'></div>
        <div className='col-start-1 col-end-2 row-start-5 row-end-7 px-4 md:col-start-2 md:col-end-5 md:row-start-3 md:row-end-5 md:px-0 lg:col-end-3 lg:row-start-3 lg:row-end-6 xl:row-start-2 xl:row-end-6'>
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
        <div className='col-start-1 col-end-1 row-start-4 row-end-5 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 lg:col-start-4 lg:col-end-5 lg:row-start-3 lg:row-end-4 xl:row-start-2 xl:row-end-3'>
          <div className='prose flex flex-col justify-center p-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:p-8'>
            <StructuredText data={address as any} />
          </div>
        </div>
        <div className='row-start-3 row-end-4 md:col-start-4 md:col-end-5 md:row-start-2 md:row-end-3 lg:row-start-4 lg:row-end-5 xl:row-start-3 xl:row-end-5'>
          <div className='prose flex flex-col justify-center p-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:p-8'>
            <StructuredText data={contact as any} />
          </div>
        </div>
        <div className='row-start-1 row-end-2 md:col-start-2 md:col-end-3 md:row-end-2 lg:row-start-2 lg:row-end-3 xl:col-start-5 xl:col-end-6 xl:row-start-2 xl:row-end-3'>
          <div className='prose flex flex-col justify-center p-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:p-8'>
            <StructuredText data={openingHours as any} />
          </div>
        </div>
        <div className='row-start-2 row-end-3 md:col-start-4 md:col-end-5 md:row-start-1 md:row-end-2 lg:row-start-2 lg:row-end-3 xl:col-start-5 xl:col-end-6 xl:row-start-3 xl:row-end-5'>
          <div className='prose flex flex-col justify-center p-4 prose-p:text-gray-300 prose-a:text-gray-300 prose-strong:text-skin-accent md:p-8'>
            <StructuredText data={info as any} />
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
