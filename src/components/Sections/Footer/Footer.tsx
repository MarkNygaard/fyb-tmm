import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { StructuredText } from 'react-datocms';
import { useInView } from 'react-intersection-observer';

export default function Footer({ details }: any) {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });
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
  }, [inView, animation]);

  const center = {
    lat: details.location.latitude,
    lng: details.location.longitude,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY!,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div
      ref={ref}
      id={details?.navigationId}
      className='bg-[#1e262b] text-gray-300'
    >
      <div className='grid grid-cols-footer grid-rows-footerSmall md:grid-rows-footerMedium xl:grid-cols-footerLarge xl:grid-rows-footerLarge'>
        <div className='col-start-1 col-end-13 row-start-5 row-end-7 bg-[#252c31] xl:row-start-5 xl:row-end-7'></div>
        <div className='col-start-2 col-end-5 row-start-4 row-end-6 md:col-end-3 md:row-start-3 xl:row-start-2 xl:row-end-6'>
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
        <div className='col-start-2 col-end-3 row-start-3 row-end-4 md:col-start-4 md:col-end-5 xl:row-start-2 xl:row-end-3'>
          <div className='prose flex flex-col justify-center p-8 prose-p:text-gray-300 prose-strong:text-[#c09a5d]'>
            <StructuredText data={details.address} />
          </div>
        </div>
        <div className='col-start-4 col-end-5 row-start-3 row-end-4 md:row-start-4 md:row-end-5 xl:row-start-3 xl:row-end-5'>
          <div className='prose flex flex-col justify-center p-8 prose-p:text-gray-300 prose-strong:text-[#c09a5d]'>
            <StructuredText data={details.contact} />
          </div>
        </div>
        <div className='col-start-2 col-end-3 row-start-1 row-end-2 xl:col-start-5 xl:col-end-6 xl:row-start-2 xl:row-end-3'>
          <div className='prose flex flex-col justify-center p-8 prose-p:text-gray-300 prose-strong:text-[#c09a5d]'>
            <StructuredText data={details.openingHours} />
          </div>
        </div>
        <div className='col-start-4 col-end-5 row-start-1 row-end-2 xl:col-start-5 xl:col-end-6 xl:row-start-3 xl:row-end-5'>
          <div className='prose flex flex-col justify-center p-8 prose-p:text-gray-300 prose-strong:text-[#c09a5d]'>
            <StructuredText data={details.info} />
          </div>
        </div>
      </div>
      <div className='flex h-12 items-center justify-center bg-[#c09a5d] text-white'>
        &copy; {new Date().getFullYear()} Fake Your Beauty vs The Motley Monkey.
        All rights reserved.
      </div>
    </div>
  );
}
