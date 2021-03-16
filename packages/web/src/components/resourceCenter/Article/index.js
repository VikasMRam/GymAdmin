/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useRef } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import 'isomorphic-fetch';
import { object } from 'prop-types';
import styled, { css } from 'styled-components';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { startingWith, withDisplay } from 'sly/common/components/helpers';
import { getKey, size } from 'sly/common/components/themes';
import { formatDate } from 'sly/web/services/helpers/date';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { urlize } from 'sly/web/services/helpers/url';
import { topics } from 'sly/web/components/resourceCenter/helper';
import { assetPath } from 'sly/web/components/themes';
import Block from 'sly/common/components/atoms/Block';
import Heading from 'sly/common/components/atoms/Heading';
import Hr from 'sly/common/components/atoms/Hr';
import Link from 'sly/common/components/atoms/Link';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Footer from 'sly/web/components/organisms/Footer';
import Header from 'sly/web/components/resourceCenter/components/Header';
import AuthorPreview from 'sly/web/components/resourceCenter/components/AuthorPreview';
import ArticleContent from 'sly/web/components/resourceCenter/components/ArticleContent';
import LinksBlock from 'sly/web/components/resourceCenter/components/ArticleLinksBlock';
import ArticlesListByTopic from 'sly/web/components/resourceCenter/components/ArticlesListByTopic';
import ArticleTags from 'sly/web/components/resourceCenter/components/ArticleTags';
import AddThis from 'sly/web/components/resourceCenter/components/AddThis';
import SubscribeEmail from 'sly/web/components/resourceCenter/components/SuscribeEmails';

const ArticleWrapper = styled(Block)(withDisplay);

const BreadCrumbsTitle = styled(Block)(withDisplay);

const LoaderWrapper = styled(Block)(withDisplay);

const ArticlePage = ({ match }) => {
  const articleRef = useRef(null);

  const { slug, topic } = match.params;

  const { requestInfo } = usePrefetch(
    'getArticle',
    req => req({ slug_eq: slug, topic_eq: topics.find(({ value }) => urlize(value) === topic)?.label || '' }));

  if (requestInfo.hasFinished && !requestInfo?.result?.length) {
    return <Redirect to={RESOURCE_CENTER_PATH} />;
  }

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

      <ArticleWrapper ref={articleRef} display="flex" alignItems="center" flexDirection="column">

        <Block
          width="100%"
          paddingX="m"
          startingWithTablet={{ width: size('layout.col6'), padding: 0 }}
          startingWithLaptop={{ width: size('layout.col8') }}
        >
          {requestInfo?.result?.[0]?.topic && requestInfo?.result?.[0]?.title && (
            <Block
              marginTop="l"
              marginBottom="xs"
            >
              <Link font="body-small" to={RESOURCE_CENTER_PATH}>Resource Center</Link>
              {' / '}
              <Link font="body-small" to={topics.find(({ label }) => label === requestInfo.result[0].topic).to}>
                {topics.find(({ label }) => label === requestInfo.result[0].topic)?.value}
              </Link>
              {' / '}
              <BreadCrumbsTitle display="inline" font="body-small">{requestInfo.result[0].title}</BreadCrumbsTitle>
            </Block>
          )}
          <Heading
            font="title-xxlarge"
            css={`
              margin-bottom: ${size('spacing.l')};
              ${startingWith('laptop', css({ marginBottom: size('spacing.xl') }))}
            `}
            size="hero"
          >
            {requestInfo?.result?.[0]?.title}
          </Heading>

          <Block as="p" font="body-large" marginBottom="l">
            {requestInfo?.result?.[0]?.shortDescription}
          </Block>

          <Block font="body-small" marginBottom="l" palette="grey">
            {`By ${requestInfo?.result?.[0]?.author?.fullName} ·  Updated ${formatDate(requestInfo?.result?.[0]?.updated_at, 'long')}`}
          </Block>

          <Block marginBottom="l" startingWithTablet={{ marginBottom: 'xl' }}>
            <AddThis />
          </Block>

        </Block>

        <Block
          paddingX="m"
          marginBottom="l"
          width="100%"
          startingWithTablet={{ width: size('layout.col8'), marginBottom: size('layout.xl'), padding: 0 }}
          startingWithLaptop={{ width: size('layout.col10') }}
        >
          <ResponsiveImage
            css={{ width: '100%', height: 'auto' }}
            src={requestInfo?.result?.[0]?.mainImg?.url}
            alt={requestInfo?.result?.[0]?.mainImg?.alternativeText}
          />
        </Block>

        <ArticleContent content={requestInfo?.result?.[0]?.content} />

      </ArticleWrapper>

      {!!requestInfo?.result?.[0]?.linkBlockList?.length &&
        <Block
          marginY="l"
          marginX="m"
          startingWithTablet={{ marginY: 'xl', marginX: 'auto', width: size('layout.col6') }}
          startingWithLaptop={{ width: size('layout.col8') }}
        >
          <LinksBlock
            title={requestInfo?.result?.[0]?.linkBlockTitle}
            description={requestInfo?.result?.[0]?.linkBlockDescription}
            links={requestInfo?.result?.[0]?.linkBlockList}
          />
        </Block>
      }

      <Block
        marginBottom="l"
        marginX="m"
        startingWithTablet={{ marginBottom: 'xl', marginX: 'auto', width: size('layout.col6') }}
        startingWithLaptop={{ width: size('layout.col8') }}
      >
        <Block marginBottom="m">Share this article</Block>
        <AddThis />
      </Block>

      <Block
        marginX="m"
        upToTablet={{ marginBottom: 'xl' }}
        startingWithTablet={{ marginX: 'auto', paddingBottom: 'm', width: size('layout.col6') }}
        startingWithLaptop={{ width: size('layout.col8') }}
      >
        <Block marginBottom="m">Tags</Block>
        <ArticleTags topic={requestInfo?.result?.[0]?.topic} tagsList={requestInfo?.result?.[0]?.tagsList} />
      </Block>

      <Block
        upToTablet={{ display: 'none' }}
        startingWithTablet={{ paddingY: 'xl', marginX: 'auto', width: size('layout.col6') }}
        startingWithLaptop={{ width: size('layout.col8') }}
      >
        <Hr size="large" />
      </Block>

      <Block
        marginX="m"
        startingWithTablet={{ margin: '0 auto', width: size('layout.col6') }}
        startingWithLaptop={{ width: size('layout.col8') }}
      >
        <AuthorPreview
          url={requestInfo?.result?.[0]?.author.img?.url}
          shortDescription={requestInfo?.result?.[0]?.author.shortDescription}
          alternativeText={requestInfo?.result?.[0]?.author.img?.alternativeText}
          fullName={requestInfo?.result?.[0]?.author.fullName}
          firstName={requestInfo?.result?.[0]?.author.firstName}
          slug={requestInfo?.result?.[0]?.author.slug}
        />
      </Block>

      <Block
        margin="xl"
        marginX="auto"
        width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
        startingWithTablet={{ width: size('layout.col6'),  marginY: 'xxl', marginX: 'auto' }}
        startingWithLaptop={{ width: size('layout.col8') }}
      >
        <Hr size="large" />
      </Block>

      <Block marginBottom="xxl" startingWithTablet={{ marginBottom: 'xxxl' }}>
        <ArticlesListByTopic
          limit={3}
          topic={requestInfo?.result?.[0]?.topic}
          id={requestInfo?.result?.[0]?.id}
          articlesTitle="You might also like"
        />
      </Block>

      <SubscribeEmail />

      <Footer />
    </>
  );
};

ArticlePage.displayName = 'ResourceCenterArticlePage';

ArticlePage.propTypes = {
  match: object,
};

export default ArticlePage;
