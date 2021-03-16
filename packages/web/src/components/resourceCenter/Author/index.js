/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import 'isomorphic-fetch';
import { object } from 'prop-types';
import styled, { css } from 'styled-components';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { withDisplay, withBorder, startingWith } from 'sly/common/components/helpers';
import { size } from 'sly/common/components/themes';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { assetPath } from 'sly/web/components/themes';
import Heading from 'sly/common/components/atoms/Heading';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Footer from 'sly/web/components/organisms/Footer';
import Header from 'sly/web/components/resourceCenter/components/Header';
import Hr from 'sly/common/components/atoms/Hr';
import Block from 'sly/common/components/atoms/Block';
import AuthorArticles from 'sly/web/components/resourceCenter/components/AuthorArticles';
import SubscribeEmail from 'sly/web/components/resourceCenter/components/SuscribeEmails';

const headingStyles = css`
  line-height: ${size('lineHeight.displayS')};
  margin: ${size('spacing.l')} 0 ${size('spacing.m')};
  ${startingWith('tablet', css({ marginTop: size('spacing.xxL'), marginBottom: size('spacing.l') }))}
  ${startingWith('laptop', css({ marginTop: 0 }))}
`;

const LoaderWrapper = styled(Block)(withDisplay);

const ImgWrapper = styled(Block)(withBorder);

const Description = styled(Block)(
  css`
  font-size: 1.125rem;
  line-height: 1.78;
`,
);

const Author = ({ match, location }) => {
  const { slug } = match.params;

  const { requestInfo } = usePrefetch('getAuthor', req => req({ slug: slug.replace(/\+/g, '%2b') }));

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

      <Block
        marginY="l"
        marginX="m"
        startingWithTablet={{
          width: size('tabletLayout.col7'),
          marginY: 'xxl',
          marginX: 'auto',
        }}
        startingWithLaptop={{ width: size('layout.col12') }}
      >
        <Block startingWithLaptop={{ display: 'flex' }}>
          <ImgWrapper
            width="10rem"
            minWidth="10rem"
            height="10rem"
            minHeight="10rem"
            borderRadius="50%"
            overflow="hidden"
            startingWithTablet={{
              width: '15rem',
              minWidth: '15rem',
              height: '15rem',
              minHeight: '15rem',
            }}
            startingWithLaptop={{ marginRight: '7.625rem' }}
          >
            <ResponsiveImage
              css={{ objectFit: 'cover', width: '100%', height: '100%' }}
              src={requestInfo?.result?.[0]?.img?.url}
              alt={requestInfo?.result?.[0]?.img?.alternativeText}
            />
          </ImgWrapper>
          <div>
            <Heading size="hero" font="title-xxlarge" css={headingStyles}>
              {requestInfo?.result?.[0]?.fullName}
            </Heading>
            <Description
              dangerouslySetInnerHTML={{ __html: requestInfo?.result?.[0]?.fullDescription }}
            />
          </div>
        </Block>
      </Block>

      <Block marginY="xxl" startingWithTablet={{ marginY: 'xxxl' }}>
        <Hr size="large" />
      </Block>

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
