'use client';

import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  HomePageQuery,
  HomePageQueryVariables,
  PageModelContentField,
} from 'lib/graphql';
import { useQuerySubscription } from 'react-datocms/use-query-subscription';

import Sections from './Sections';

export default function RealTimeSections({
  initialData,
  token,
  query,
}: {
  readonly initialData: HomePageQuery;
  readonly query: TypedDocumentNode<HomePageQuery, HomePageQueryVariables>;
  readonly token: string;
}) {
  const { data } = useQuerySubscription({
    query,
    token,
    initialData,
    preview: true,
  });

  if (!data?.page) return <></>;

  return (
    <Sections
      sections={data.page.content as Array<PageModelContentField>}
      firstSection={data.page?.content[1]?.navigationId}
    />
  );
}
