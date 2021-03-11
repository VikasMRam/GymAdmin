import React from 'react';
import { string } from 'prop-types';
import styled, { css } from 'styled-components';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { getKey, size } from 'sly/common/components/themes';
import { urlize } from 'sly/web/services/helpers/url';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { getTextForPagination, ARTICLES_RANGE_FOR_PAGINATION } from "sly/web/components/resourceCenter/helper";
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import Pagination from 'sly/web/components/molecules/Pagination';
import Heading from 'sly/common/components/atoms/Heading';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';

const PaginationText = styled(Block)(
  css`
    text-align: center;
  `,
);

const AuthorArticles = ({ slug, firstName, pageNumber }) => {
  const { requestInfo: { result: articlesCount } } = usePrefetch(
    'getArticlesCount',
    req => req({ 'author.slug': slug.replace(/\+/g, '%2b') }),
  );

  const { requestInfo: { result: articlesList } } = usePrefetch(
    'getArticle',
    req => req({
      'author.slug': slug.replace(/\+/g, '%2b'),
      _start: pageNumber ? pageNumber * ARTICLES_RANGE_FOR_PAGINATION : 0,
      _limit: ARTICLES_RANGE_FOR_PAGINATION,
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
          {articlesCount ? `${firstName}'s article${articlesCount > 1 ? 's' : ''}` : `${firstName} has no articles yet`}
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
            tagsList,
            id,
          }) => (
            <Link to={`${RESOURCE_CENTER_PATH}/${urlize(topic)}/${slug}`} key={id}>
              <ArticlePreview{...{ alternativeText: mainImg?.alternativeText, title, shortDescription, url: mainImg?.url, topic, tagsList }} />
            </Link>
          ))}
         </Block>
      </Block>

      {articlesCount && (
        <Block marginX="auto" marginBottom="xxl" width="max-content">
          {articlesCount > ARTICLES_RANGE_FOR_PAGINATION && (
            <Pagination
              basePath={`${RESOURCE_CENTER_PATH}/author/${slug}`}
              pageParam="page-number"
              total={articlesCount / ARTICLES_RANGE_FOR_PAGINATION}
              current={+pageNumber || 0}
              range={ARTICLES_RANGE_FOR_PAGINATION}
            />
          )}

          <PaginationText marginTop="m">
            {getTextForPagination(pageNumber, articlesCount)}
          </PaginationText>
        </Block>
      )}
    </>
  );
};

AuthorArticles.propTypes = {
  slug: string,
  firstName: string,
  pageNumber: string,
};

export default AuthorArticles;
