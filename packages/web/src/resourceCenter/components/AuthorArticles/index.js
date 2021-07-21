import React from 'react';
import { string } from 'prop-types';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { RESOURCE_CENTER_PATH } from 'sly/web/dashboard/dashboardAppPaths';
import { getTextForPagination, ARTICLES_RANGE_FOR_PAGINATION } from "sly/web/resourceCenter/helper";
import { sx, layout } from 'sly/common/system/sx';
import Block from 'sly/common/system/Block';
import Grid from 'sly/common/system/Grid';
import Heading from 'sly/common/system/Heading';
import Pagination from 'sly/web/components/molecules/Pagination';
import ArticlePreview from 'sly/web/resourceCenter/components/ArticlePreview';

const AuthorArticles = ({ slug, firstName, pageNumber }) => {
  const { requestInfo: { result: articlesCount } } = usePrefetch('getArticlesCount', {
    'author.slug': slug.replace(/\+/g, '%2b'),
  });

  const { requestInfo: { result: articlesList } } = usePrefetch('getArticle', {
    'author.slug': slug.replace(/\+/g, '%2b'),
    _start: pageNumber ? pageNumber * ARTICLES_RANGE_FOR_PAGINATION : 0,
    _limit: ARTICLES_RANGE_FOR_PAGINATION,
  });

  return (
    <>
      <Block
        margin="xl m"
        sx$tablet={{
          width: 'col8',
          margin: 'xxl auto',
        }}
        sx$laptop={{ width: 'col12' }}
      >
        <Heading font="title-l" pad="xl">
          {articlesCount ? `${firstName}'s article${articlesCount > 1 ? 's' : ''}` : `${firstName} has no articles yet`}
        </Heading>

        <Grid
          margin="l auto"
          justifyContent="center"
          sx={{ gridTemplateColumns: 'col4', gridRowGap: 'm' }}
          sx$tablet={{
            gridTemplateColumns: sx`repeat(2, ${layout('col4')})`,
            gridColumnGap: 'l',
            gridRowGap: 'l',
          }}
          sx$laptop={{
            gridTemplateColumns: sx`repeat(3, ${layout('col4')})`,
          }}
        >
          {articlesList?.map(({
            title,
            shortDescription,
            mainImg,
            slug,
            mainTopic,
            tagsList,
            id,
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

          <Block marginTop="m" textAlign="center">
            {getTextForPagination(pageNumber, articlesCount)}
          </Block>
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
