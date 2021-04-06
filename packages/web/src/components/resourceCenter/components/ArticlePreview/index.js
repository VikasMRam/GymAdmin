import React from 'react';
import styled from 'styled-components';
import { array, bool, object, string } from 'prop-types';

import { getStylesForEllipsisText } from 'sly/web/components/resourceCenter/helper';
import { space } from 'sly/common/system/sx';
import theme from 'sly/common/system/theme';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import Image from 'sly/common/system/Image';
import Heading from 'sly/common/system/Heading';
import Link from 'sly/common/system/Link';
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
      box-shadow: 0 ${space('xxs')} ${space('m')} 0 rgba(0, 0, 0, 0.1);
    }
  }
`;

const ArticlePreview = ({
  smallSizeOnPhone,
  path,
  alternativeText,
  title,
  topic,
  tagsList,
  shortDescription,
  to,
  customStyles,
}) => (
  <Flex
    as={StyledLink}
    to={to}
    sx={customStyles}
    flexDirection="column"
    border="box"
    width={smallSizeOnPhone ? '17.5rem' : '20.5rem'}
    height={smallSizeOnPhone ? '29.375rem' : '32.875rem'}
    overflow="hidden"
    marginX="auto"
    sx$tablet={{
      marginX: 0,
      width: smallSizeOnPhone && '20.5rem',
      height: smallSizeOnPhone && '32.875rem',
    }}
  >
    <Block
      height={smallSizeOnPhone ? '11.625rem' : '13.625rem'}
      width="100%"
      overflow="hidden"
      sx$tablet={{ height: smallSizeOnPhone && '13.625rem' }}
    >
      <Image
        path={path}
        alt={alternativeText}
        aspectRatio="3:2"
        sources={[...(smallSizeOnPhone ? [280] : []), 328]}
        sizes={
          smallSizeOnPhone
            ? `(max-width: ${parseFloat(theme.breakpoint.tablet) - 1}px) 280px, 328px`
            : '328px'
        }
      />
    </Block>

    <Block display="flex" flexDirection="column" flexGrow="1" padding="l">
      <Heading
        font="title-m"
        color="slate.base"
        pad="m"
        sx={getStylesForEllipsisText(3)}
      >
        {title}
      </Heading>

      <Block color="slate.base" sx={getStylesForEllipsisText(4)}>
        {shortDescription}
      </Block>

      <ArticleTags topic={topic} tagsList={tagsList} />
    </Block>

  </Flex>
);

ArticlePreview.displayName = 'ResourceCenterArticlePreview';
ArticlePreview.propTypes = {
  smallSizeOnPhone: bool,
  path: string,
  alternativeText: string,
  title: string,
  topic: object,
  tagsList: array,
  shortDescription: string,
  to: string,
  customStyles: object,
};

export default ArticlePreview;
