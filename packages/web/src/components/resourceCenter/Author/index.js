/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import { object } from 'prop-types';
import styled, { css } from 'styled-components';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { withBorder, startingWith } from 'sly/common/components/helpers';
import { Block } from 'sly/common/components/atoms';
import { size } from 'sly/common/components/themes';
import Paragraph from 'sly/common/components/atoms/Paragraph';
import Heading from 'sly/common/components/atoms/Heading';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Footer from 'sly/web/components/organisms/Footer';
import ErrorPage from 'sly/web/components/pages/Error';
import Header from 'sly/web/components/resourceCenter/Header';

const headingStyles = css`
  line-height: ${size('lineHeight.displayS')};
  margin: ${size('spacing.l')} 0 ${size('spacing.m')};
  ${startingWith('tablet', css({ marginTop: size('spacing.xxL'), marginBottom: size('spacing.l') }))}
  ${startingWith('laptop', css({ marginTop: 0 }))}
`;

const ImgWrapper = styled(Block)(withBorder);

const paragraphStyles = css`
  font-size: 1.125rem;
  line-height: 1.78;
`;

const Author = ({ match }) => {
  const { fullName } = match.params;

  const { requestInfo } = usePrefetch('getAuthor', req => req({ fullName: fullName.replace(/-/g, ' ') }));

  if (!requestInfo?.result?.length) return <ErrorPage errorCode={404} />;

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
              // TODO: fix when the CMS starts giving the correct path
              src={`http://localhost:1337${requestInfo?.result?.[0]?.img?.url}`}
              alt={requestInfo?.result?.[0]?.img?.alternativeText}
            />
          </ImgWrapper>
          <div>
            <Heading size="hero" font="title-xxlarge" css={headingStyles}>
              {requestInfo?.result?.[0]?.fullName}
            </Heading>
            <Paragraph css={paragraphStyles}>
              {requestInfo?.result?.[0]?.about}
            </Paragraph>
          </div>
        </Block>
      </Block>

      <Footer />
    </>
  );
};

Author.displayName = 'Author';
Author.propTypes = {
  match: object,
};

export default Author;
