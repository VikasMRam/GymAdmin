import React, { useCallback, useMemo } from 'react';
import { array, bool, string } from 'prop-types';

import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import Block from 'sly/common/system/Block';
import Heading from 'sly/common/system/Heading';
import Grid from 'sly/common/system/Grid';
import Link from 'sly/common/system/Link';
import Chevron from 'sly/common/icons/Chevron';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';

const hideOnTabletStyles = {
  sx$tablet: { display: 'none' },
  sx$laptop: { display: 'flex' },
};

const ArticlesList = ({ topic, withRedirectToTopicPage, articlesTitle, articles }) => {
  const hrefToTopicPage = useMemo(() =>
    `${RESOURCE_CENTER_PATH}/${topic}`,
  [topic]);

  const getHrefToArticlePage = useCallback((slug, topic) =>
    `${RESOURCE_CENTER_PATH}/${topic}/${slug}`,
  []);

  return (
    <Block
      width="auto"
      marginX="auto"
      sx$tablet={{ width: 'col8' }}
      sx$laptop={{ width: 'col12' }}
    >
      <Block
        marginBottom="l"
        marginLeft="m"
        sx$tablet={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginLeft: 0,
        }}
      >
        <Heading
          font="title-l"
          maxWidth="max-content"
          marginBottom={[withRedirectToTopicPage && 'xs', '0px']}
        >
          {articlesTitle}
        </Heading>
        {withRedirectToTopicPage && (
          <Link
            display="block"
            font="body-l"
            sx$tablet={{ textAlign: 'end' }}
            to={hrefToTopicPage}
          >
            See all {articlesTitle}
            <Chevron verticalAlign="sub" rotation="90" />
          </Link>
        )}
      </Block>
      <Grid
        width="100%"
        overflow="auto"
        paddingX="m"
        gridTemplateColumns={`repeat(${articles?.length}, 17.5rem) 1px`}
        gridColumnGap="m"
        sx$tablet={{
          paddingLeft: 0,
          paddingRight: 0,
          gridTemplateColumns: '20.5rem 20.5rem',
          gridColumnGap: 'l',
          overflow: 'unset',
        }}
        sx$laptop={{ gridTemplateColumns: `repeat(${articles?.length}, 20.5rem)` }}
      >
        {articles?.map((
          {
            mainImg,
            title,
            shortDescription,
            slug,
            mainTopic,
            tagsList,
            id,
          },
          index,
        ) => (
          <ArticlePreview
            {...{
              smallSizeOnPhone: true,
              topic: mainTopic,
              path: mainImg?.path,
              alternativeText: mainImg?.alternativeText,
              title,
              shortDescription,
              tagsList,
              to: getHrefToArticlePage(slug, mainTopic.slug),
              key: id,
              ...(index > 1 && { customStyles: hideOnTabletStyles }),
            }}
          />
        ))}
        {articles?.length > 1 && <Block sx$tablet={{ display: 'none' }} />}
      </Grid>
    </Block>
  );
};

ArticlesList.propTypes = {
  topic: string,
  withRedirectToTopicPage: bool,
  articlesTitle: string,
  articles: array,
};

export default ArticlesList;
