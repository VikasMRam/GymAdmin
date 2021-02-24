import React from 'react';
import { string } from 'prop-types';
import styled, { css } from 'styled-components';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { getKey, size } from 'sly/common/components/themes';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';
import Heading from 'sly/common/components/atoms/Heading';
import Pagination from 'sly/web/components/molecules/Pagination';

const ARTICLES_RANGE = 18;

const PaginationText = styled(Block)(
  css`
    text-align: center;
  `,
);

const getTextForPagination = (pageNumber, articlesCount) => {
  let start;
  let end;

  if (pageNumber) {
    start = pageNumber * ARTICLES_RANGE + 1;
  } else start = 1;
  if ((articlesCount < ARTICLES_RANGE) || (pageNumber * ARTICLES_RANGE) + ARTICLES_RANGE >= articlesCount) {
    end = articlesCount;
  }
  if ((pageNumber * ARTICLES_RANGE) + ARTICLES_RANGE < articlesCount) {
    end = (pageNumber * ARTICLES_RANGE) + ARTICLES_RANGE;
  }
  if ((ARTICLES_RANGE < articlesCount) && !pageNumber) {
    end = ARTICLES_RANGE;
  }

  return `${start} – ${end} of ${articlesCount} results`;
};

const AuthorArticles = ({ slug, firstName, pageNumber }) => {
  const { requestInfo: { result: articlesCount } } = usePrefetch(
    'getArticlesCount',
    req => req({ 'author.slug': slug.replace(/\+/g, '%2b') }),
  );

  const { requestInfo: { result: articlesList } } = usePrefetch(
    'getArticle',
    req => req({
      'author.slug': slug.replace(/\+/g, '%2b'),
      _start: pageNumber ? pageNumber * ARTICLES_RANGE : 0,
      _limit: ARTICLES_RANGE,
    }),
  );

  return (
    <>
      <Block
        marginX="m"
        startingWithTablet={{
          width: size('layout.col8'),
          marginY: 'xxl',
          marginX: 'auto',
        }}
        startingWithLaptop={{ width: size('layout.col12') }}
      >
        <Heading size="title" font="title-large">
          {`${firstName}'s article${articlesCount > 1 ? 's' : ''}`}
        </Heading>

         <Block
          marginY="l"
          marginX="auto"
          startingWithTablet={{
            display: 'grid',
            gridTemplateColumns: `${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')}`,
            columnGap: size('spacing.l'),
            rowGap: size('spacing.l'),
          }}
          startingWithLaptop={{
            gridTemplateColumns: `${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')}`,
          }}
         >
          {articlesList?.map(({
            title,
            shortDescription,
            mainImg,
            slug,
            topic,
            id,
          }) => (
            <Link to={`/resources/articles/${topic.toLowerCase().replace(/_/g, '-')}/${slug}`} key={id}>
              <ArticlePreview{...{ alternativeText: mainImg?.alternativeText, title, shortDescription, url: mainImg?.url, topic }} />
            </Link>
          ))}
         </Block>
      </Block>

      <Block marginX="auto" marginBottom="xxl" width="max-content">
        <Pagination
          basePath={`${RESOURCE_CENTER_PATH}/author/${slug}`}
          pageParam="page-number"
          total={articlesCount / ARTICLES_RANGE}
          current={+pageNumber || 0}
          range={ARTICLES_RANGE}
        />

        <PaginationText marginTop="m">
          {getTextForPagination(pageNumber, articlesCount)}
        </PaginationText>
      </Block>
    </>
  );
};

AuthorArticles.propTypes = {
  slug: string,
  firstName: string,
  pageNumber: string,
};

export default AuthorArticles;
