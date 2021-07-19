/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import styled from 'styled-components';

import { RESOURCE_CENTER_PATH } from 'sly/web/dashboard/dashboardAppPaths';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { assetPath } from 'sly/web/components/themes';
import { sx, layout, space } from 'sly/common/system/sx';
import Block from 'sly/common/system/Block';
import Grid from 'sly/common/system/Grid';
import Flex from 'sly/common/system/Flex';
import Heading from 'sly/common/system/Heading';
import Link from 'sly/common/system/Link';
import Image from 'sly/common/system/Image';
import Header from 'sly/web/resourceCenter/components/Header';
import Footer from 'sly/web/components/organisms/Footer';
import Helmet from 'sly/web/resourceCenter/components/Helmet';
import { withHydration } from 'sly/web/services/partialHydration';
import loadable from '@loadable/component';

const ArticlesListByTopic = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkArticlesListByTopic" */ 'sly/web/resourceCenter/components/ArticlesListByTopic'));
const ArticlesList = loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkArticlesList" */ 'sly/web/resourceCenter/components/ArticlesList'));
const SubscribeEmail = withHydration(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "chunkSubscribeEmail" */ 'sly/web/resourceCenter/components/SuscribeEmails'));


const ExploreTopicInfo = styled(Block)`
  ${sx({ border: 'round' })}
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
  z-index: 1;
`;

const StyledLink = styled(Link)`
  & {
    position: relative;

    &:hover::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 ${space('xxs')} ${space('m')} 0 rgba(0, 0, 0, 0.3);
    }
  }
`;

const HomePage = () => {
  const { requestInfo } = usePrefetch('getResourceCenterMainInfo');

  const { requestInfo: { result: topicRes, hasFinished: requestByTopicHasFinished } } = usePrefetch('getTopic');

  if (!requestInfo.hasFinished || !requestByTopicHasFinished) {
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
        sx$tablet={{ paddingY: 'xxxl', paddingX: sx`calc((100% - ${layout('col8')}) / 2)` }}
        sx$laptop={{ paddingX: sx`calc((100% - ${layout('col12')}) / 2)` }}
      >
        <Heading font="title-xxl" pad="l">
          Seniorly Resource Center
        </Heading>

        <Block maxWidth="col8" font="body-l">
          Learn how to navigate senior living, from what to look for in a community, how to finance, move in tips and
          more.
        </Block>
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
        font="title-l"
        marginBottom="l"
        marginX="m"
        sx$tablet={{ width: 'col8', marginX: 'auto' }}
        sx$laptop={{ width: 'col12' }}
      >
        Explore Topics
      </Block>

      <Grid
        sx={{
          justifyContent: 'center',
          marginX: 'auto',
          marginBottom: 'xxl',
          paddingX: 'm',
          gridTemplateColumns: 'minmax(auto, 20.5rem)',
          gridRowGap: 'm',
        }}
        sx$tablet={{
          gridTemplateColumns: sx`repeat(2, ${layout('col4')})`,
          gridTemplateRows: 'repeat(3, 17rem)',
          gridColumnGap: 'l',
          gridRowGap: 'l',
          marginBottom: 'xxxl',
          paddingX: 0,
        }}
        sx$laptop={{
          gridTemplateColumns: sx`repeat(2, ${layout('col6')})`,
        }}
      >
        {topicRes?.map(({ slug, name, description, img }) => (
          <StyledLink
            key={slug}
            to={`${RESOURCE_CENTER_PATH}/${slug}`}
          >
            <Block border="round" overflow="hidden" height="100%">
              <Image
                sx$laptop={{ paddingTop: '56.25%' }}
                path={img?.path}
                alt={`${name} image`}
                sources={[328, 504]}
                sizes="(max-width: 1079px) 328px, 504px"
                aspectRatio="7:6"
              />
              <ExploreTopicInfo
                border="box"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                width="100%"
                height="100%"
                padding="l"
              >
                <Block font="title-m" color="white.base" marginBottom="s">{name}</Block>
                <Block font="body-m" color="white.base">{description}</Block>
              </ExploreTopicInfo>
            </Block>
          </StyledLink>
          ))}
      </Grid>

      <SubscribeEmail />

      <Footer />
    </>
  );
};

HomePage.displayName = 'ResourceCenterHomePage';

export default HomePage;
