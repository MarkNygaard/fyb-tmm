import Biography, { BiographyProps } from '@Sections/Biography/Biography';
import Footer, { FooterProps } from '@Sections/Footer/Footer';
import Grid, { GridProps } from '@Sections/Grid/Grid';
import HairMenu, { HairMenuProps } from '@Sections/HairMenu/HairMenu';
import Hero, { HeroProps } from '@Sections/Hero/Hero';
import ImageSection, { ImageProps } from '@Sections/Image/Image';
import Text, { TextProps } from '@Sections/Text/Text';
import TextImage, { TextImageProps } from '@Sections/TextImage/TextImage';
import YoutubeVideo, {
  YoutubeVideoProps,
} from '@Sections/YoutubeVideo/YoutubeVideo';
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
    return <TextImage {...(sectionProps as TextImageProps)} />;
  } else if (sectionProps.__typename === 'ImageRecord') {
    return <ImageSection {...(sectionProps as ImageProps)} />;
  } else if (sectionProps.__typename === 'TextRecord') {
    return <Text {...(sectionProps as TextProps)} />;
  } else if (sectionProps.__typename === 'YoutubeVideoRecord') {
    return <YoutubeVideo {...(sectionProps as YoutubeVideoProps)} />;
  } else if (sectionProps.__typename === 'GridRecord') {
    return <Grid {...(sectionProps as GridProps)} />;
  } else if (sectionProps.__typename === 'HairMenuRecord') {
    return <HairMenu {...(sectionProps as HairMenuProps)} />;
  } else if (sectionProps.__typename === 'BiographyRecord') {
    return <Biography {...(sectionProps as BiographyProps)} />;
  } else if (sectionProps.__typename === 'FooterRecord') {
    return <Footer {...(sectionProps as FooterProps)} />;
  }
  return <></>;
}
