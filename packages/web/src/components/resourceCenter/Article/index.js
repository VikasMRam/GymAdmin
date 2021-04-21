/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import 'isomorphic-fetch';
import { bool, object } from 'prop-types';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { formatDate } from 'sly/web/services/helpers/date';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { assetPath } from 'sly/web/components/themes';
import { cmsUrl } from 'sly/web/config';
import apiFetch from 'sly/web/services/api/apiFetch';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import Heading from 'sly/common/system/Heading';
import Span from 'sly/common/system/Span';
import Hr from 'sly/common/system/Hr';
import Link from 'sly/common/system/Link';
import Image from 'sly/common/system/Image';
import Footer from 'sly/web/components/organisms/Footer';
import Header from 'sly/web/components/resourceCenter/components/Header';
import AuthorPreview from 'sly/web/components/resourceCenter/components/AuthorPreview';
import ArticleContent from 'sly/web/components/resourceCenter/components/ArticleContent';
import ArticlesListByTopic from 'sly/web/components/resourceCenter/components/ArticlesListByTopic';
import ArticleTags from 'sly/web/components/resourceCenter/components/ArticleTags';
import AddThis from 'sly/web/components/resourceCenter/components/AddThis';
import SubscribeEmail from 'sly/web/components/resourceCenter/components/SuscribeEmails';
import Helmet from 'sly/web/components/resourceCenter/components/Helmet';

const BlockHr = ({ hideOnMobile }) => (
  <Hr
    marginX="m"
    marginY="l"
    display={hideOnMobile && 'none'}
    sx$tablet={{
      display: hideOnMobile && 'block',
      margin: 'xl 0',
      marginX: 'auto',
      width: ['col6', 'col8'],
    }}
  />
);

BlockHr.propTypes = {
  hideOnMobile: bool,
};

const ArticlePage = ({ match }) => {
  const articleRef = useRef(null);

  const { slug, topic } = match.params;

  const { requestInfo } = usePrefetch('getArticle', { slug_eq: slug, 'mainTopic.slug': topic });

  useEffect(() => {
    apiFetch(
      cmsUrl,
      '/articles/view-count',
      {
        method: 'POST',
        body: JSON.stringify({ slug }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .catch(() => {
        // TODO: add some behavior if error ??
        console.log('Resource center Article page: cannot update count of views');
      });
  }, []);

  if (requestInfo.hasFinished && !requestInfo?.result?.length) {
    return <Redirect to={RESOURCE_CENTER_PATH} />;
  }

  if (!requestInfo.hasFinished) {
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
        isArticlePage
        path={`/${requestInfo?.result?.[0]?.mainTopic.slug}/${requestInfo?.result?.[0]?.slug}`}
        {...requestInfo?.result?.[0]}
      />

      <Header />

      <Flex ref={articleRef} alignItems="center" flexDirection="column">
        <Block
          width="100%"
          paddingX="m"
          sx$tablet={{ width: 'col6', padding: 0 }}
          sx$laptop={{ width: 'col8' }}
        >
          {requestInfo?.result?.[0]?.mainTopic && requestInfo?.result?.[0]?.title && (
            <Block marginY="l">
              <Link font="body-s" to={RESOURCE_CENTER_PATH}>Resource Center</Link>
              {' / '}
              <Link font="body-s" to={`${RESOURCE_CENTER_PATH}/${requestInfo.result[0].mainTopic.slug}`}>
                {requestInfo.result[0].mainTopic.name}
              </Link>
              {' / '}
              <Span font="body-s">{requestInfo.result[0].title}</Span>
            </Block>
          )}
          <Heading font="title-xxl" mb="l">
            {requestInfo?.result?.[0]?.title}
          </Heading>

          <Block as="p" font="body-l" marginBottom="l">
            {requestInfo?.result?.[0]?.shortDescription}
          </Block>

          <Block font="body-s" marginBottom="l" color="slate.lighter-40">
            {`By ${requestInfo?.result?.[0]?.author?.fullName} ·  Updated ${formatDate(requestInfo?.result?.[0]?.updated_at, 'long')}`}
          </Block>

          <Block marginBottom="l" sx$tablet={{ marginBottom: 'xl' }}>
            <AddThis />
          </Block>
        </Block>

        <Block
          paddingX="m"
          marginBottom="l"
          width="100%"
          sx$tablet={{ width: 'col8', marginBottom: 'xl', padding: 0 }}
          sx$laptop={{ width: 'col10' }}
        >
          <Image
            path={requestInfo?.result?.[0]?.mainImg?.path}
            alt={requestInfo?.result?.[0]?.mainImg?.alternativeText}
            aspectRatio="3:2"
            sources={[
              288,
              393,
              680,
              695,
              856,
            ]}
            sizes="(max-width: 727px) 100vw, (max-width: 1079px) 680px, 856px"
          />
        </Block>

        <ArticleContent content={requestInfo?.result?.[0]?.content} />

      </Flex>

      <Block
        marginBottom="l"
        marginX="m"
        sx$tablet={{ marginBottom: 'xl', marginX: 'auto', width: 'col6' }}
        sx$laptop={{ width: 'col8' }}
      >
        <Block marginBottom="m" font="title-s-azo">Share this article</Block>
        <AddThis />
      </Block>

      <Block
        marginX="m"
        marginBottom="xl"
        sx$tablet={{ marginBottom: 0, marginX: 'auto', paddingBottom: 'm', width: 'col6' }}
        sx$laptop={{ width: 'col8' }}
      >
        <Block marginBottom="m" font="title-s-azo">Tags</Block>
        <ArticleTags topic={requestInfo?.result?.[0]?.mainTopic} tagsList={requestInfo?.result?.[0]?.tagsList} />
      </Block>

      <BlockHr hideOnMobile />

      {requestInfo?.result?.[0]?.author && (
        <Block
          marginX="m"
          sx$tablet={{ margin: '0 auto', width: 'col6' }}
          sx$laptop={{ width: 'col8' }}
        >
          <AuthorPreview
            path={requestInfo.result?.[0]?.author?.img?.path}
            shortDescription={requestInfo.result?.[0]?.author?.shortDescription}
            alternativeText={requestInfo.result?.[0]?.author?.img?.alternativeText}
            fullName={requestInfo.result?.[0]?.author?.fullName}
            firstName={requestInfo.result?.[0]?.author?.firstName}
            slug={requestInfo.result?.[0]?.author?.slug}
          />
        </Block>
      )}

      <BlockHr />

      <Block marginBottom="xxl" sx$tablet={{ marginBottom: 'xxxl', paddingTop: 'm' }}>
        <ArticlesListByTopic
          limit={3}
          topic={requestInfo.result?.[0]?.mainTopic.slug}
          id={requestInfo.result?.[0]?.id}
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
