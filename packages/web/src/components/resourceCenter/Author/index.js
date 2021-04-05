/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import { Redirect } from 'react-router-dom';
import 'isomorphic-fetch';
import { object } from 'prop-types';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { assetPath } from 'sly/web/components/themes';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import Heading from 'sly/common/system/Heading';
import Image from 'sly/common/system/Image';
import Hr from 'sly/common/system/Hr';
import Footer from 'sly/web/components/organisms/Footer';
import Header from 'sly/web/components/resourceCenter/components/Header';
import AuthorArticles from 'sly/web/components/resourceCenter/components/AuthorArticles';
import SubscribeEmail from 'sly/web/components/resourceCenter/components/SuscribeEmails';
import Helmet from 'sly/web/components/resourceCenter/components/Helmet';

const Author = ({ match, location }) => {
  const { slug } = match.params;

  const { requestInfo } = usePrefetch('getAuthor', req => req({ slug: slug.replace(/\+/g, '%2b') }));

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
        path={`/author/${requestInfo?.result?.[0]?.slug}`}
        title={requestInfo?.result?.[0].fullName}
        shortDescription={requestInfo?.result?.[0].shortDescription}
      />

      <Header />

      <Block
        margin="l m"
        sx$tablet={{
          width: 'col7',
          margin: 'xxl auto 0 auto',
        }}
        sx$laptop={{ width: 'col12' }}
      >
        <Block sx$laptop={{ display: 'flex' }}>
          <Block
            width="10rem"
            minWidth="10rem"
            height="10rem"
            minHeight="10rem"
            borderRadius="50%"
            overflow="hidden"
            sx$tablet={{
              width: '15rem',
              minWidth: '15rem',
              height: '15rem',
              minHeight: '15rem',
            }}
            sx$laptop={{ marginRight: '7.625rem' }}
          >
            <Image
              path={requestInfo?.result?.[0]?.img?.path}
              alt={requestInfo?.result?.[0]?.img?.alternativeText}
              aspectRatio="1:1"
              sources={[160, 240]}
              sizes="(max-width: 727px) 160px, 240px"
            />
          </Block>
          <div>
            <Heading
              font="title-xxl"
              margin="l 0 m"
              sx$tablet={{ marginTop: 'xxl', marginBottom: 'l' }}
              sx$laptop={{ marginTop: 0 }}
            >
              {requestInfo?.result?.[0]?.fullName}
            </Heading>
            <Block
              font="body-l"
              pad={['xxl', 'xxxl']}
              dangerouslySetInnerHTML={{
                __html: requestInfo?.result?.[0]?.fullDescription,
              }}
            />
          </div>
        </Block>
      </Block>

      <Hr />

      <AuthorArticles
        slug={slug}
        firstName={requestInfo?.result?.[0]?.firstName}
        pageNumber={location.search.split('=')[1]}
      />

      <SubscribeEmail />

      <Footer />
    </>
  );
};

Author.displayName = 'Author';
Author.propTypes = {
  match: object,
  location: object,
};

export default Author;
