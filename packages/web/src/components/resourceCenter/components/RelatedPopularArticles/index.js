import React from 'react';
import { number } from 'prop-types';
import styled, { css } from 'styled-components';

import Block from 'sly/common/components/atoms/Block';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import ArticlePreview from 'sly/web/components/resourceCenter/components/ArticlePreview';
import Heading from 'sly/common/components/atoms/Heading';
import { getKey, size } from 'sly/common/components/themes';
import { startingWith, upTo, withDisplay } from 'sly/common/components/helpers';
import Link from "sly/common/components/atoms/Link";


const ArticlesWrapper = styled(Block)(
  withDisplay,
  css`
    ${startingWith('tablet', css`
      & > a:last-child {
        display: ${({ hideLastChildOnTablet }) => hideLastChildOnTablet && 'none'};
      }
    `)}
    
    ${startingWith('laptop', css`
      & > a:last-child {
        display: flex;
      }
    `)}
  `,
);

const subtitleStyles = css`
  margin: 0 auto ${getKey('sizes.spacing.l')};
  width: calc(100% - ${getKey('sizes.spacing.m')} * 2);
  ${startingWith('tablet', css({ width: size('layout.col8'), marginBottom: size('spacing.xl') }))}
  ${startingWith('laptop', css({ width: size('layout.col12') }))}
`;

const RelatedPopularArticles = ({ limit: _limit, topic, id: id_ne }) => {
  const { requestInfo } = usePrefetch('getArticle', req => req({
    topic,
    _sort: 'viewCount:DESC',
    _limit,
    id_ne,
  }));

  console.log('RelatedPopularArticles requestInfo', requestInfo);

  if ((requestInfo.hasFinished && !requestInfo?.result?.length) || !requestInfo.hasFinished) return null;

  return (
    <Block
      width="auto"
      marginX="auto"
      marginBottom="xxl"
      startingWithTablet={{ width: size('layout.col8'), marginBottom: 'xxxl' }}
      startingWithLaptop={{ width: size('layout.col12') }}
    >
      <Heading font="title-large" css={subtitleStyles}>You might also like</Heading>
      <ArticlesWrapper
        display="grid"
        width="100%"
        overflow="auto"
        paddingX="m"
        // startingWithTablet cannot replace main styles
        upToTablet={{
          gridTemplateColumns: '17.5rem 17.5rem 17.5rem',
          columnGap: size('spacing.m'),
        }}
        startingWithTablet={{
          paddingLeft: 0,
          paddingRight: 0,
          gridTemplateColumns: '20.5rem 20.5rem',
          columnGap: size('spacing.l'),
        }}
        startingWithLaptop={{ gridTemplateColumns: '20.5rem 20.5rem 20.5rem' }}
        hideLastChildOnTablet={requestInfo.result?.length > 2}
      >
        {requestInfo.result?.map(({
          mainImg: {
            url,
            alternativeText,
          },
          title,
          shortDescription,
          slug,
          topic,
          id,
        }) => (
          <Link to={`/resources/articles/${topic.toLowerCase().replace(/_/g, '-')}/${slug}`} key={id}>
            <ArticlePreview {...{
              smallSizeOnPhone: true,
              topic,
              url,
              alternativeText,
              title,
              shortDescription,
            }}
            />
          </Link>
        ))}
      </ArticlesWrapper>
    </Block>
  );
};

RelatedPopularArticles.propTypes = {
  limit: number,
};

export default RelatedPopularArticles;
