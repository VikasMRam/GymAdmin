/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useMemo } from 'react';
import { object } from 'prop-types';
import styled, { css } from 'styled-components';
import Helmet from 'react-helmet';

import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import {
  ARTICLES_RANGE_FOR_PAGINATION,
  getSearchItem,
  getTextForPagination,
} from 'sly/web/components/resourceCenter/helper';
import { getKey, size } from 'sly/common/components/themes';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { assetPath } from 'sly/web/components/themes';
import { withDisplay } from 'sly/common/components/helpers';
import { urlize } from 'sly/web/services/helpers/url';
import Block from 'sly/web/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Pagination from 'sly/web/components/molecules/Pagination';
import Footer from 'sly/web/components/organisms/Footer';
import Header from 'sly/web/components/resourceCenter/components/Header';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';
import SubscribeEmail from 'sly/web/components/resourceCenter/components/SuscribeEmails';

const LoaderWrapper = styled(Block)(withDisplay);

const PaginationText = styled(Block)(
  css`
    text-align: center;
  `,
);

const Search = ({ match, location }) => {
  const { searchBy } = match.params;
  const { search } = location;

  const pageNumber = useMemo(() => getSearchItem(search, 'page-number') || 0, [location]);

  const { requestInfo: { result: articlesCount, hasFinished: requestByCountHasFinished } } = usePrefetch(
    'getArticlesCount',
    req => req({ stringWithDataFromRelations_contains: searchBy }),
  );

  const { requestInfo: { result: articles, hasFinished: requestByArticlesHasFinished } } = usePrefetch(
    'getArticle',
    req => req({
      stringWithDataFromRelations_contains: searchBy,
      _start: pageNumber ? pageNumber * ARTICLES_RANGE_FOR_PAGINATION : 0,
      _limit: ARTICLES_RANGE_FOR_PAGINATION,
    }),
  );

  if (!requestByArticlesHasFinished || !requestByCountHasFinished) {
    return (
      <LoaderWrapper
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ResponsiveImage src={assetPath('images/homebase/loader.svg')} />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <Helmet>
        /* todo: Unmock title */
        <title>Title</title>
        /* todo: Unmock description */
        <meta name="description" content="Description" />
      </Helmet>

      <Header />

      <Block
        marginX="m"
        startingWithTablet={{ width: size('layout.col8'), marginX: 'auto' }}
        startingWithLaptop={{ width: size('layout.col12') }}
      >
        <Block
          marginTop="l"
          marginBottom={!articlesCount ? 'xxl' : 'l'}
          font="title-large"
          startingWithTablet={{ marginTop: 'xxl', marginBottom: !articlesCount ? 'xxxl' : 'xxl' }}
          startingWithLaptop={{ marginBottom: !articlesCount && '15rem' }}
        >
          {
            articlesCount
              ? `${articlesCount} result${articlesCount > 1 ? 's' : ''} for “${searchBy}”`
              : `No results for “${searchBy}”`
          }
        </Block>

        {!!articles?.length && (
          <>
            <Block
              marginBottom="xxl"
              startingWithTablet={{
                display: 'grid',
                gridTemplateColumns: `${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')}`,
                columnGap: size('spacing.l'),
                rowGap: size('spacing.l'),
              }}
              startingWithLaptop={{
                gridTemplateColumns:
                  `${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')}`,
              }}
            >
              {articles.map(({
                  id,
                  topic,
                  tagsList,
                  title,
                  shortDescription,
                  mainImg,
                  slug,
                }) => (
                  <Link to={`${RESOURCE_CENTER_PATH}/${urlize(topic)}/${slug}`} key={id}>
                    <ArticlePreview
                      {...{
                        alternativeText: mainImg?.alternativeText,
                        title,
                        shortDescription,
                        url: mainImg?.url,
                        topic,
                        tagsList,
                      }}
                    />
                  </Link>
              ))}
            </Block>

            <Block marginX="auto" marginBottom="xxl" width="max-content">
              {articlesCount > ARTICLES_RANGE_FOR_PAGINATION && (
                <Pagination
                  basePath={`${RESOURCE_CENTER_PATH}/search/${searchBy}`}
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
          </>
        )}

      </Block>

      <SubscribeEmail />

      <Footer />
    </>
  );
};

Search.propTypes = {
  match: object,
  location: object,
};

export default Search;
