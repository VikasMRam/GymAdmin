/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useMemo } from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';

import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import {
  ARTICLES_RANGE_FOR_PAGINATION,
  getSearchItem,
  getTextForPagination,
} from 'sly/web/components/resourceCenter/helper';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { assetPath } from 'sly/web/components/themes';
import Image from 'sly/common/system/Image';
import Flex from 'sly/common/system/Flex';
import Block from 'sly/common/system/Block';
import Grid from 'sly/common/system/Grid';
import Pagination from 'sly/web/components/molecules/Pagination';
import Footer from 'sly/web/components/organisms/Footer';
import Header from 'sly/web/components/resourceCenter/components/Header';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';
import SubscribeEmail from 'sly/web/components/resourceCenter/components/SuscribeEmails';
import Helmet from 'sly/web/components/resourceCenter/components/Helmet';

const PaginationText = styled(Block)`
  text-align: center;
`;

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
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={assetPath('images/homebase/loader.svg')} />
      </Flex>
    );
  }

  return (
    <>
      <Helmet
        path={`/search/${searchBy}`}
        title={`Expert resources on ${searchBy}`}
        shortDescription={
          `Read articles written by industry experts on ${searchBy} , senior living,  assisted living, senior lifestyles and more on Seniorly.`
        }
      />

      <Header />

      <Block
        marginX="m"
        sx$tablet={{ width: 'col8', marginX: 'auto' }}
        sx$laptop={{ width: 'col12' }}
      >
        <Block
          marginTop="l"
          marginBottom={!articlesCount ? 'xxl' : 'l'}
          font="title-l"
          sx$tablet={{ marginTop: 'xxl', marginBottom: !articlesCount ? 'xxxl' : 'xxl' }}
          sx$laptop={{ marginBottom: !articlesCount && '15rem' }}
        >
          {
            articlesCount
              ? `${articlesCount} result${articlesCount > 1 ? 's' : ''} for “${searchBy}”`
              : `No results for “${searchBy}”`
          }
        </Block>

        {!!articles?.length && (
          <>
            <Grid
              marginBottom="xxl"
              justifyContent="center"
              gridTemplateColumns="col4"
              gridRowGap="m"
              sx$tablet={{
                gridTemplateColumns: 'col4 col4',
                gridColumnGap: 'l',
                gridRowGap: 'l',
              }}
              sx$laptop={{
                gridTemplateColumns: 'col4 col4 col4',
              }}
            >
              {articles.map(({
                  id,
                  mainTopic,
                  tagsList,
                  title,
                  shortDescription,
                  mainImg,
                  slug,
                }) => (
                  <ArticlePreview
                    {...{
                      alternativeText: mainImg?.alternativeText,
                      title,
                      shortDescription,
                      path: mainImg?.path,
                      topic: mainTopic,
                      tagsList,
                      to: `${RESOURCE_CENTER_PATH}/${mainTopic.slug}/${slug}`,
                      key: id,
                    }}
                  />
              ))}
            </Grid>

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
