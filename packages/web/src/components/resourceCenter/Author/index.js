/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import Helmet from 'react-helmet';
import 'isomorphic-fetch';
import { object } from 'prop-types';
import styled, { css } from 'styled-components';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { withDisplay, withBorder, startingWith } from 'sly/common/components/helpers';
import { getKey, size } from 'sly/common/components/themes';
import Paragraph from 'sly/common/components/atoms/Paragraph';
import Heading from 'sly/common/components/atoms/Heading';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Footer from 'sly/web/components/organisms/Footer';
import Header from 'sly/web/components/resourceCenter/Header';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';
import { Hr, Link, Block } from 'sly/common/components/atoms';
import { withRedirectTo } from 'sly/common/services/redirectTo';
import { RESOURCE_CENTER_PATH } from "sly/web/constants/dashboardAppPaths";
import { assetPath } from "sly/web/components/themes";

const headingStyles = css`
  line-height: ${size('lineHeight.displayS')};
  margin: ${size('spacing.l')} 0 ${size('spacing.m')};
  ${startingWith('tablet', css({ marginTop: size('spacing.xxL'), marginBottom: size('spacing.l') }))}
  ${startingWith('laptop', css({ marginTop: 0 }))}
`;

const LoaderWrapper = styled(Block)(withDisplay);

const ImgWrapper = styled(Block)(withBorder);

const paragraphStyles = css`
  font-size: 1.125rem;
  line-height: 1.78;
`;

const Author = ({ match, redirectTo }) => {
  const { slug } = match.params;

  const { requestInfo } = usePrefetch('getAuthor', req => req({ slug: slug.replace(/\+/g, '%2b') }));

  if (requestInfo.hasFinished && !requestInfo?.result?.length) {
    redirectTo(RESOURCE_CENTER_PATH);
    return null;
  }

  if (!requestInfo.hasFinished) return (
    <LoaderWrapper
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ResponsiveImage src={assetPath('images/homebase/loader.svg')} />
    </LoaderWrapper>
  );

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
              {requestInfo?.result?.[0]?.fullDescription}
            </Paragraph>
          </div>
        </Block>
      </Block>

      <Block marginY="xxl" startingWithTablet={{ marginY: 'xxxl' }}>
        <Hr size="large" />
      </Block>

      <Block
        marginX="m"
        startingWithTablet={{
          width: size('layout.col8'),
          marginY: 'xxl',
          marginX: 'auto',
        }}
        startingWithLaptop={{ width: size('layout.col12') }}
      >
        <Heading size="title" font="title-large">
          {`${requestInfo?.result?.[0]?.firstName}'s article${requestInfo?.result?.[0]?.articles?.length > 1 ? 's' : ''}`}
        </Heading>

        <Block
          marginY="l"
          marginX="auto"
          startingWithTablet={{
            display: 'grid',
            gridTemplateColumns: `${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')}`,
            columnGap: size('spacing.l'),
            rowGap: size('spacing.l'),
          }}
          startingWithLaptop={{
            gridTemplateColumns: `${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')} ${getKey('sizes.layout.col4')}`,
          }}
        >
          {requestInfo?.result?.[0]?.articles?.map(({
              title,
              shortDescription,
              mainImg: { url, alternativeText },
              slug,
              topic,
              id,
            }) => (
              <Link to={`/resources/articles/${topic.toLowerCase().replace(/_/g, '-')}/${slug}`} key={id}>
                <ArticlePreview{...{ alternativeText, title, shortDescription, url, topic }} />
              </Link>
            ))}
        </Block>
      </Block>

      <Footer />
    </>
  );
};

Author.displayName = 'Author';
Author.propTypes = {
  match: object,
  location: object,
};

export default withRedirectTo(Author);
