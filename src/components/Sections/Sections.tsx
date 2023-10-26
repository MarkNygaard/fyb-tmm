import Biography from '@Sections/Biography/Biography';
import Footer from '@Sections/Footer/Footer';
import Grid from '@Sections/Grid/Grid';
import HairMenu from '@Sections/HairMenu/HairMenu';
import Hero from '@Sections/Hero/Hero';
import ImageSection from '@Sections/Image/Image';
import Text from '@Sections/Text/Text';
import TextImage from '@Sections/TextImage/TextImage';
import YoutubeVideo from '@Sections/YoutubeVideo/YoutubeVideo';
import { PageModelContentField } from 'lib/graphql';
import React from 'react';

type Props = {
  sections: Array<PageModelContentField>;
  firstSection: string | null | undefined;
};

export default function Sections({ sections, firstSection }: Props) {
  return (
    <>
      {sections.map((section) => {
        switch (section.__typename) {
          case 'HeroRecord':
            return <Hero {...section} firstSection={firstSection} />;
          case 'TextImageRecord':
            return <TextImage {...section} />;
          case 'ImageRecord':
            return <ImageSection {...section} />;
          case 'TextRecord':
            return <Text {...section} />;
          case 'YoutubeVideoRecord':
            return <YoutubeVideo {...section} />;
          case 'GridRecord':
            return <Grid {...section} />;
          case 'HairMenuRecord':
            return <HairMenu {...section} />;
          case 'BiographyRecord':
            return <Biography {...section} />;
          case 'FooterRecord':
            return <Footer {...section} />;
          default:
            return <></>;
        }
      })}
    </>
  );
}
