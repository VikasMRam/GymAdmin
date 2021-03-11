import React, { useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { array, bool, string } from 'prop-types';

import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { size } from 'sly/common/components/themes';
import { startingWith, withDisplay } from 'sly/common/components/helpers';
import { urlize } from 'sly/web/services/helpers/url';
import { topics } from 'sly/web/components/resourceCenter/helper';
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import Icon from 'sly/common/components/atoms/Icon';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';

const ArticlePreviewWrapper = styled(Link)`
  ${startingWith('tablet', css`
    display: ${({ hideOnTablet }) => hideOnTablet && 'none'};
  `)}

  ${startingWith('laptop', css`
    display: flex;
  `)}
`;

const ArticlesWrapper = styled(Block)(withDisplay);

const RedirectToTopicLink = styled(Link)`
  display: block;
  font-size: 1.125rem;
  line-height: ${size('lineHeight.subtitle')};
  ${startingWith('tablet', css({ textAlign: 'end' }))}
`;

const IconWrapper = styled.span`
  vertical-align: sub;
`;

const Title = styled(Block)(
  css`
    max-width: max-content;
  `,
);

const ArticlesList = ({ topic, withRedirectToTopicPage, articlesTitle, articles }) => {
  const hrefToTopicPage = useMemo(() =>
    `${RESOURCE_CENTER_PATH}/topic/${urlize(topic)}`,
  [topic]);

  const getHrefToArticlePage = useCallback((slug, topic) =>
    `${RESOURCE_CENTER_PATH}/${urlize(topic)}/${slug}`,
  []);

  return (
    <Block
      width="auto"
      marginX="auto"
      startingWithTablet={{ width: size('layout.col8') }}
      startingWithLaptop={{ width: size('layout.col12') }}
    >
      <Block
        marginBottom="l"
        upToTablet={{ marginLeft: 'm' }}
        startingWithTablet={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginLeft: 0,
        }}
      >
        <Title
          font="title-large"
          upToTablet={{ marginBottom: withRedirectToTopicPage && 'xs' }}
        >
          {articlesTitle}
        </Title>
        {withRedirectToTopicPage && (
          <RedirectToTopicLink to={hrefToTopicPage}>
            <span>
              {`See all ${topics.find(({ label }) => label === topic).value} `}
              <IconWrapper><Icon icon="chevron" size="caption" /></IconWrapper>
            </span>
          </RedirectToTopicLink>
        )}
      </Block>
      <ArticlesWrapper
        display="grid"
        width="100%"
        overflow="auto"
        paddingX="m"
        upToTablet={{
          gridTemplateColumns: '17.5rem 17.5rem 17.5rem 1px',
          columnGap: size('spacing.m'),
        }}
        startingWithTablet={{
          paddingLeft: 0,
          paddingRight: 0,
          gridTemplateColumns: '20.5rem 20.5rem',
          columnGap: size('spacing.l'),
        }}
        startingWithLaptop={{ gridTemplateColumns: '20.5rem 20.5rem 20.5rem' }}
      >
        {articles.map((
          {
            mainImg,
            title,
            shortDescription,
            slug,
            topic,
            tagsList,
            id,
          },
          index,
        ) => (
          <ArticlePreviewWrapper
            to={getHrefToArticlePage(slug, topic)}
            key={id}
            hideOnTablet={index > 1}
          >
            <ArticlePreview {...{
              smallSizeOnPhone: true,
              topic,
              url: mainImg?.url,
              alternativeText: mainImg?.alternativeText,
              title,
              shortDescription,
              tagsList,
            }}
            />
          </ArticlePreviewWrapper>
        ))}
        <Block startingWithTablet={{ display: 'none' }} />
      </ArticlesWrapper>
    </Block>
  );
};

ArticlesList.propTypes = {
  topic: string,
  withRedirectToTopicPage: bool,
  articlesTitle: string,
  articles: array,
};

export default ArticlesList;
