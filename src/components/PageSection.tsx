import Biography from '@Sections/Biography/Biography';
import Footer from '@Sections/Footer/Footer';
import Grid from '@Sections/Grid/Grid';
import HairMenu from '@Sections/HairMenu/HairMenu';
import Hero from '@Sections/Hero/Hero';
import ImageRecord from '@Sections/Image/Image';
import Text from '@Sections/Text/Text';
import TextImage from '@Sections/TextImage/TextImage';
import YoutubeVideo from '@Sections/YoutubeVideo/YoutubeVideo';
import React from 'react';

export default function PageSection({ details, page }: any) {
  if (details.__typename === 'HeroRecord') {
    return <Hero details={details} page={page} />;
  } else if (details.__typename === 'TextImageRecord') {
    return <TextImage details={details} />;
  } else if (details.__typename === 'ImageRecord') {
    return <ImageRecord details={details} />;
  } else if (details.__typename === 'TextRecord') {
    return <Text details={details} />;
  } else if (details.__typename === 'YoutubeVideoRecord') {
    return <YoutubeVideo details={details} />;
  } else if (details.__typename === 'GridRecord') {
    return <Grid details={details} />;
  } else if (details.__typename === 'HairMenuRecord') {
    return <HairMenu details={details} />;
  } else if (details.__typename === 'BiographyRecord') {
    return <Biography details={details} />;
  } else if (details.__typename === 'FooterRecord') {
    return <Footer details={details} />;
  }
  return <></>;
}
