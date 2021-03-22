import React from 'react';
import styled from 'styled-components';
import { array, bool, object, string } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';
import { withBorder, withDisplay } from 'sly/common/components/helpers';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Heading from 'sly/common/components/atoms/Heading';
import { getKey, size } from 'sly/common/components/themes';
import ArticleTags from 'sly/web/components/resourceCenter/components/ArticleTags';

const getStylesForEllipsisText = (maxRowQty, styles = {}) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: maxRowQty,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  ...styles,
});

const Wrapper = styled(Block)(withBorder, withDisplay);
const TextWrapper = styled(Block)(withDisplay);

const ArticlePreview = ({
  smallSizeOnPhone,
  url,
  alternativeText,
  title,
  topic,
  tagsList,
  shortDescription,
}) => (
  <Wrapper
    display="flex"
    flexDirection="column"
    border="regular"
    borderRadius="small"
    borderPalette="slate"
    borderVariation="lighter-90"
    width={smallSizeOnPhone ? '17.5rem' : '20.5rem'}
    height={smallSizeOnPhone ? '29.375rem' : '32.875rem'}
    overflow="hidden"
    upToTablet={{ margin: `0 auto ${getKey('sizes.spacing.m')}` }}
    startingWithTablet={{ width: smallSizeOnPhone && '20.5rem', height: smallSizeOnPhone && '32.875rem' }}
  >
    <Block
      height={smallSizeOnPhone ? '11.625rem' : '13.625rem'}
      width="100%"
      overflow="hidden"
      startingWithTablet={{ height: smallSizeOnPhone && '13.625rem' }}
    >
      <ResponsiveImage
        css={{ objectFit: 'cover', width: '100%', height: '100%' }}
        src={url}
        alt={alternativeText}
      />
    </Block>

    <TextWrapper display="flex" flexDirection="column" flexGrow="1" padding="l">
      <Heading
        size="subtitle"
        css={getStylesForEllipsisText(2, {
          fontSize: size('text.displayS'),
          lineHeight: size('lineHeight.title'),
        })}
      >
        {title}
      </Heading>

      <Block
        css={getStylesForEllipsisText(4)}
      >
        {shortDescription}
      </Block>

      <ArticleTags topic={topic} tagsList={tagsList} />
    </TextWrapper>

  </Wrapper>
);

ArticlePreview.displayName = 'ResourceCenterArticlePreview';
ArticlePreview.propTypes = {
  smallSizeOnPhone: bool,
  url: string,
  alternativeText: string,
  title: string,
  topic: object,
  tagsList: array,
  shortDescription: string,
};

export default ArticlePreview;
