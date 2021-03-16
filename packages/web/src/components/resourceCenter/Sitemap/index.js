import React from 'react';
import styled from 'styled-components';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { topics } from 'sly/web/components/resourceCenter/helper';
import { urlize } from 'sly/web/services/helpers/url';
import { startingWith, withDisplay } from 'sly/common/components/helpers';
import { assetPath } from 'sly/web/components/themes';
import { getKey, size } from 'sly/common/components/themes';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import Footer from 'sly/web/components/organisms/Footer';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import Header from 'sly/web/components/resourceCenter/components/Header';

const LoaderWrapper = styled(Block)(withDisplay);

const BreadCrumbsTitle = styled(Block)(withDisplay);

const StyledLink = styled(Link)`
  display: block;
  word-break: break-word;
  margin-bottom: ${size('spacing.xs')};
  
  &:hover {
    text-decoration: underline;
  }
  
  ${startingWith('tablet', { width: `calc((100% - ${getKey('sizes.spacing.l')}) / 2)` })}
`;

const getTitle = () => {
  const humanizePath = RESOURCE_CENTER_PATH.replace(/\//g, '').replace(/-/g, ' ');
  return humanizePath.charAt(0).toUpperCase() + humanizePath.slice(1);
};

const Sitemap = () => {
  const { requestInfo } = usePrefetch('getArticlesForSitemap');

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
      <Header />

      <Block
        width={`calc(100% - (${getKey('sizes.spacing.m')} * 2))`}
        marginX="m"
        startingWithTablet={{
          width: size('layout.col8'), marginX: `calc((100% - ${getKey('sizes.layout.col8')}) / 2)`,
        }}
        startingWithLaptop={{
          width: size('layout.col12'), marginX: `calc((100% - ${getKey('sizes.layout.col12')}) / 2)`,
        }}
      >
        <Block
          marginTop="l"
        >
          <Link font="body-regular" to="/">Home</Link>
          {' / '}
          <Link font="body-regular" to="/sitemap">Sitemap</Link>
          {' / '}
          <BreadCrumbsTitle display="inline" font="body-regular">{getTitle()}</BreadCrumbsTitle>
        </Block>

        <Block font="title-xlarge" marginY="l">{getTitle()} links</Block>

        <Block
          marginBottom="m"
          startingWithTablet={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          {topics.map(({ to, value }) => <StyledLink to={to} key={value}>{value}</StyledLink>)}
        </Block>

        <Block
          marginBottom="m"
          startingWithTablet={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          {requestInfo?.result.map(({ slug, id, title, topic }) => (
            <StyledLink to={`${RESOURCE_CENTER_PATH}/${urlize(topic)}/${slug}`} key={id}>{title}</StyledLink>
          ))}
        </Block>

      </Block>

      <Footer />
    </>
  );
};

export default Sitemap;
