/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import styled, { css } from 'styled-components';

import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { getKey, size } from 'sly/common/components/themes';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { withBorder, withDisplay } from 'sly/common/components/helpers';
import { assetPath } from 'sly/web/components/themes';
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Header from 'sly/web/components/resourceCenter/components/Header';
import Footer from 'sly/web/components/organisms/Footer';
import Heading from 'sly/common/components/atoms/Heading';
import ArticlesListByTopic from 'sly/web/components/resourceCenter/components/ArticlesListByTopic';
import ArticlesList from 'sly/web/components/resourceCenter/components/ArticlesList';
import SubscribeEmail from 'sly/web/components/resourceCenter/components/SuscribeEmails';
import Helmet from 'sly/web/components/resourceCenter/components/Helmet';

const Description = styled(Block)`
  max-width: ${size('layout.col8')};
  font-size: 1.125rem;
  line-height: 1.8;
`;

const LoaderWrapper = styled(Block)(withDisplay);

const TopicsWrapper = styled(Block)(withDisplay);

const ExploreTopicInfo = styled(Block)(
  withDisplay,
  withBorder,
  css`
    position: absolute;
    top: 0;
    left: 0;
    border-radius: ${size('border.xxLarge')};
    overflow: hidden;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
  `,
);

const HomePage = () => {
  const { requestInfo } = usePrefetch('getResourceCenterMainInfo');

  const { requestInfo: { result: topicRes, hasFinished: requestByTopicHasFinished } } = usePrefetch('getTopic');

  if (!requestInfo.hasFinished || !requestByTopicHasFinished) {
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
      <Helmet
        title="Retirement Home Senior Living Resources & FAQs"
        shortDescription="What to know when looking for a nursing home or retirement community. Visit Seniorly’s
         education center for answers to questions about senior living."
      />

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
          articles={requestInfo.result?.featuredArticles}
        />
      </Block>


      {requestInfo.result?.mainTopics?.map(({ slug, name, id }) => (
        <Block marginBottom="xxl" key={id}>
          <ArticlesListByTopic
            limit={3}
            topic={slug}
            id={id}
            articlesTitle={name}
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
        Explore Topics
      </Block>

      <TopicsWrapper
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
        {topicRes?.map(({ slug, name, description, img }) => (
          <Link
            key={slug}
            to={`${RESOURCE_CENTER_PATH}/${slug}`}
            css={css({ position: 'relative', borderRadius: size('border.xxLarge'), overflow: 'hidden' })}
          >
            <ResponsiveImage
              css={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              src={img?.url}
              alt={`${name} img`}
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
              <Block font="title-medium" palette="white" marginBottom="s">{name}</Block>
              <Block font="body-regular" palette="white">{description}</Block>
            </ExploreTopicInfo>
          </Link>
          ))}
      </TopicsWrapper>

      <SubscribeEmail />

      <Footer />
    </>
  );
};

HomePage.displayName = 'ResourceCenterHomePage';

export default HomePage;
