/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import Helmet from 'react-helmet';
import styled, { css } from 'styled-components';
import { isObject } from 'lodash';

import { getKey, size } from 'sly/common/components/themes';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { withBorder, withDisplay } from 'sly/common/components/helpers';
import { assetPath } from 'sly/web/components/themes';
import { topics } from 'sly/web/components/resourceCenter/helper';
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Header from 'sly/web/components/resourceCenter/components/Header';
import Footer from 'sly/web/components/organisms/Footer';
import Heading from 'sly/common/components/atoms/Heading';
import ArticlesListByTopic from 'sly/web/components/resourceCenter/components/ArticlesListByTopic';
import ArticlesList from 'sly/web/components/resourceCenter/components/ArticlesList';

const Description = styled(Block)`
  max-width: ${size('layout.col8')};
  font-size: 1.125rem;
  line-height: 1.8;
`;

const LoaderWrapper = styled(Block)(withDisplay);

const Grid = styled(Block)(withDisplay);

const ExploreTopicInfo = styled(Block)(
  withDisplay,
  withBorder,
  css`
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
  `,
);

const HomePage = () => {
  const { requestInfo } = usePrefetch('getResourceCenterMainInfo');

  if (!requestInfo.hasFinished) {
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
        paddingY="xxl"
        paddingX="m"
        marginBottom="xxl"
        background="harvest.lighter-90"
        startingWithTablet={{ paddingY: 'xxxl', paddingX: `calc((100% - ${getKey('sizes.layout.col8')}) / 2)` }}
        startingWithLaptop={{ paddingX: `calc((100% - ${getKey('sizes.layout.col12')}) / 2)` }}
      >
        <Heading font="title-xxlarge" pad="l">
          Seniorly Resource Center
        </Heading>

        <Description>
          Learn how to navigate senior living, from what to look for in a community, how to finance, move in tips and
          more.
        </Description>
      </Block>

      <Block marginBottom="xxl">
        <ArticlesList
          articlesTitle="Featured Articles"
          articles={[...Object.values(requestInfo.result?.featuredArticles).filter(item => isObject(item))]}
        />
      </Block>

      {requestInfo.result?.mainTopics.map(({ value, id }) => (
        <Block marginBottom="xxl" key={id}>
          <ArticlesListByTopic
            limit={3}
            topic={value}
            id={id}
            articlesTitle={(topics.find(({ label }) => label === value)).value}
            withRedirectToTopicPage
          />
        </Block>
      ))}

      <Block
        font="title-large"
        marginBottom="l"
        marginX="m"
        startingWithTablet={{ width: size('layout.col8'), marginX: 'auto' }}
        startingWithLaptop={{ width: size('layout.col12') }}
      >
        Featured Articles
      </Block>

      <Grid
        display="grid"
        justifyContent="center"
        marginX="auto"
        marginBottom="xxl"
        upToTablet={{
          gridTemplateColumns: `calc(100% - ${getKey('sizes.spacing.m')} * 2)`,
          gridTemplateRows: `repeat(6, ${getKey('sizes.picture.xLarge.height')})`,
          rowGap: size('spacing.m'),
        }}
        startingWithTablet={{
          gridTemplateColumns: `repeat(2, ${getKey('sizes.layout.col4')})`,
          gridTemplateRows: `repeat(3, ${getKey('sizes.picture.xLarge.height')})`,
          columnGap: size('spacing.l'),
          rowGap: size('spacing.l'),
          marginBottom: 'xxxl',
        }}
        startingWithLaptop={{
          gridTemplateColumns: `repeat(2, ${getKey('sizes.layout.col6')})`,
        }}
      >
        {/* TODO: Add descriptions for topics */}
        {topics.map(({ label, value, to, description = 'Housing for people with disabilities or for adults who cannot or choose not to live independently' }) => (
          <Link key={label} to={to} css={{ position: 'relative' }}>
            <ResponsiveImage
              css={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              // src={} TODO: Pass image src
              alt={`${value} img`}
            />
            <ExploreTopicInfo
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              border="regular"
              borderRadius="small"
              width="100%"
              height="100%"
              padding="l"
            >
              <Block font="title-medium" palette="white" marginBottom="s">{value}</Block>
              <Block font="body-regular" palette="white">{description}</Block>
            </ExploreTopicInfo>
          </Link>
          ))}
      </Grid>

      <Footer />
    </>
  );
};

HomePage.displayName = 'ResourceCenterHomePage';

export default HomePage;
