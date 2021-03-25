import React, { useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { array, bool, string } from 'prop-types';

import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { size } from 'sly/common/components/themes';
import { startingWith, withDisplay } from 'sly/common/components/helpers';
import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import Icon from 'sly/common/components/atoms/Icon';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';

const hideOnTabletStyles = css`
  ${startingWith('tablet', css`
    display: none;
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
    `${RESOURCE_CENTER_PATH}/${topic}`,
  [topic]);

  const getHrefToArticlePage = useCallback((slug, topic) =>
    `${RESOURCE_CENTER_PATH}/${topic}/${slug}`,
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
              {`See all ${articlesTitle} `}
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
          overflow: 'unset',
        }}
        startingWithLaptop={{ gridTemplateColumns: '20.5rem 20.5rem 20.5rem' }}
      >
        {articles?.map((
          {
            mainImg,
            title,
            shortDescription,
            slug,
            mainTopic,
            tagsList,
            id,
          },
          index,
        ) => (
          <ArticlePreview
            {...{
              smallSizeOnPhone: true,
              topic: mainTopic,
              url: mainImg?.url,
              alternativeText: mainImg?.alternativeText,
              title,
              shortDescription,
              tagsList,
              to: getHrefToArticlePage(slug, mainTopic.slug),
              key: id,
              ...(index > 1 && { customStyles: hideOnTabletStyles }),
            }}
          />
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
