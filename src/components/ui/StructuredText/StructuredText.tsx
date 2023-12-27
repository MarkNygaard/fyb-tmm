import { CustomHeadingRecord, RtImageRecord } from 'lib/graphql';
import { StructuredText as DatoCMSText } from 'react-datocms/structured-text';

import CustomHeading from './Blocks/CustomHeading/CustomHeading';
import RtImage from './Blocks/RtImage/RtImage';

export default function StructuredText({ content }: { readonly content: any }) {
  return (
    <DatoCMSText
      data={content}
      renderBlock={({ record }) => {
        if (record.__typename === 'RtImageRecord') {
          return <RtImage {...(record as RtImageRecord)} />;
        } else if (record.__typename === 'CustomHeadingRecord') {
          return <CustomHeading {...(record as CustomHeadingRecord)} />;
        }
        return null;
      }}
    />
  );
}
