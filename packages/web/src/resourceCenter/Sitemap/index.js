import React from 'react';
import styled from 'styled-components';

import { host } from 'sly/web/config';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import { assetPath } from 'sly/web/components/themes';
import { RESOURCE_CENTER_PATH } from 'sly/web/dashboard/dashboardAppPaths';
import Footer from 'sly/web/components/organisms/Footer';
import { sx, sx$tablet, space, layout } from 'sly/common/system/sx';
import Image from 'sly/common/system/Image';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Block';
import Link from 'sly/common/system/Link';
import Heading from 'sly/common/system/Heading';
import Header from 'sly/web/resourceCenter/components/Header';

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: ${space('xs')};

  &:hover {
    text-decoration: underline;
  }

  ${sx$tablet({ width: sx`calc((100% - ${space('l')}) / 2)` })}
`;

const getTitle = () => {
  const humanizePath = RESOURCE_CENTER_PATH.replace(/\//g, '').replace(/-/g, ' ');
  return humanizePath.charAt(0).toUpperCase() + humanizePath.slice(1);
};

const Sitemap = () => {
  const { requestInfo: { result: topics, hasFinished: requestByTopicsHasFinished } } = usePrefetch('getTopic');
  const { requestInfo: { result: articles, hasFinished: requestByArticlesHasFinished } } = usePrefetch('getArticlesForSitemap');

  if (!requestByArticlesHasFinished || !requestByTopicsHasFinished) {
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
      <Header />

      <Block
        width={sx`calc(100% - (${space('m')} * 2))`}
        marginX="m"
        sx$tablet={{
          width: 'col8', marginX: sx`calc((100% - ${layout('col8')}) / 2)`,
        }}
        sx$laptop={{
          width: 'col12', marginX: sx`calc((100% - ${layout('col12')}) / 2)`,
        }}
      >
        <Block
          marginTop="l"
          font="body-m"
        >
          <Link to="/">Home</Link>
          {' / '}
          <Link to="/sitemap">Sitemap</Link>
          {' / '}
          <span>{getTitle()}</span>
        </Block>

        <Heading font="title-xl" marginY="l">{getTitle()} links</Heading>

        <Block
          marginBottom="m"
        >
          <StyledLink to={`${host}${RESOURCE_CENTER_PATH}`} key="resource-center-home-page">
            {`${getTitle()} home page`}
          </StyledLink>
        </Block>

        <Block
          marginBottom="m"
          sx$tablet={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          {
            topics?.map(({ slug, name }) =>
              <StyledLink to={`${RESOURCE_CENTER_PATH}/${slug}`} key={slug}>{name}</StyledLink>)
          }
        </Block>

        <Block
          marginBottom="m"
          sx$tablet={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          {articles?.map(({ slug, id, title, mainTopic }) => (
            <StyledLink to={`${RESOURCE_CENTER_PATH}/${mainTopic.slug}/${slug}`} key={id}>{title}</StyledLink>
          ))}
        </Block>

      </Block>

      <Footer />
    </>
  );
};

export default Sitemap;
