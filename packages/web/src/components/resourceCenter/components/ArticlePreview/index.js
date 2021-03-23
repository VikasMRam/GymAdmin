import React from 'react';
import styled  from 'styled-components';
import { array, bool, object, string } from 'prop-types';

import { withBorder, withDisplay } from 'sly/common/components/helpers';
import { size } from 'sly/common/components/themes';
import { getStylesForEllipsisText } from 'sly/web/components/resourceCenter/helper';
import Block from 'sly/common/components/atoms/Block';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Heading from 'sly/common/components/atoms/Heading';
import Link from 'sly/common/components/atoms/Link';
import ArticleTags from 'sly/web/components/resourceCenter/components/ArticleTags';

const StyledLink = styled(Link)`
  & {
    position: relative;

    &:hover::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 ${size('spacing.xxs')} ${size('spacing.m')} 0 rgba(0, 0, 0, 0.1);
    }
  }
`;

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
  to,
  customStyles,
}) => (
  <StyledLink to={to} css={customStyles}>
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
      upToTablet={{ marginX: 'auto' }}
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
          css={getStylesForEllipsisText(3, {
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
  </StyledLink>
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
  to: string,
  customStyles: string,
};

export default ArticlePreview;
