import Biography from '@Sections/Biography/Biography';
import Footer from '@Sections/Footer/Footer';
import Grid from '@Sections/Grid/Grid';
import HairMenu from '@Sections/HairMenu/HairMenu';
import Hero, { HeroProps } from '@Sections/Hero/Hero';
import ImageSection from '@Sections/Image/Image';
import Text from '@Sections/Text/Text';
import TextImage from '@Sections/TextImage/TextImage';
import YoutubeVideo from '@Sections/YoutubeVideo/YoutubeVideo';
import {
  BiographyRecord,
  FooterRecord,
  GridRecord,
  HairMenuRecord,
  ImageRecord,
  TextImageRecord,
  TextRecord,
  YoutubeVideoRecord,
} from 'lib/graphql';
import React from 'react';

export default function PageSection({
  sectionProps,
  firstSection,
}: {
  sectionProps: any;
  firstSection: any;
}) {
  if (sectionProps.__typename === 'HeroRecord') {
    return (
      <Hero {...(sectionProps as HeroProps)} firstSection={firstSection} />
    );
  } else if (sectionProps.__typename === 'TextImageRecord') {
    return <TextImage {...(sectionProps as TextImageRecord)} />;
  } else if (sectionProps.__typename === 'ImageRecord') {
    return <ImageSection {...(sectionProps as ImageRecord)} />;
  } else if (sectionProps.__typename === 'TextRecord') {
    return <Text {...(sectionProps as TextRecord)} />;
  } else if (sectionProps.__typename === 'YoutubeVideoRecord') {
    return <YoutubeVideo {...(sectionProps as YoutubeVideoRecord)} />;
  } else if (sectionProps.__typename === 'GridRecord') {
    return <Grid {...(sectionProps as GridRecord)} />;
  } else if (sectionProps.__typename === 'HairMenuRecord') {
    return <HairMenu {...(sectionProps as HairMenuRecord)} />;
  } else if (sectionProps.__typename === 'BiographyRecord') {
    return <Biography {...(sectionProps as BiographyRecord)} />;
  } else if (sectionProps.__typename === 'FooterRecord') {
    return <Footer {...(sectionProps as FooterRecord)} />;
  }
  return <></>;
}
