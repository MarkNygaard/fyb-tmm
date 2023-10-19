import PageSection from 'components/PageSection';
import queryDatoCMS from 'lib/datocms';
import { HomePageDocument, PageModelContentField } from 'lib/graphql';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { toNextMetadata } from 'react-datocms';

export async function generateMetadata(): Promise<Metadata> {
  const data = await queryDatoCMS(HomePageDocument);

  return toNextMetadata(data?.page?.seo || []);
}

export default async function Home() {
  const { isEnabled } = draftMode();
  const data = await queryDatoCMS(HomePageDocument, {}, isEnabled);

  if (!data?.page) notFound();

  return (
    <>
      <div className='bg-skin-primary'>
        {data.page?.content?.map((section: unknown, i: any) => {
          return (
            <PageSection
              key={i}
              sectionProps={section as Array<PageModelContentField>}
              firstSection={data.page?.content[1]?.navigationId}
            />
          );
        })}
      </div>
    </>
  );
}
