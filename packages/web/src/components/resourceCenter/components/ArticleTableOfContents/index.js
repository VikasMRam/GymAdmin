import React from 'react';
import { array } from 'prop-types';
import styled, { css } from 'styled-components';

import Block from 'sly/common/components/atoms/Block';
import Link from 'sly/common/components/atoms/Link';
import { getKey, size } from 'sly/common/components/themes';
import { withBorder } from 'sly/common/components/helpers';

const Wrapper = styled(Block)(withBorder);
const Item = styled(Link)(
  false,
  css`
    font-size: 1.125rem;
    line-height: ${size('spacing.xl')};
  `,
);

const TableOfContents = ({ subtitlesData, initialSubtitles }) => (
  <Wrapper
    border="regular"
    borderRadius="small"
    borderPalette="slate"
    borderVariation="lighter-90"
    paddingY="l"
    paddingRight="m"
    paddingLeft="l"
    marginBottom="l"
    width={`calc(100% - ${getKey('sizes.spacing.m')} * 2)`}
    startingWithTablet={{ padding: 'xl',  width: size('layout.col6'), marginBottom: 'xl' }}
    startingWithLaptop={{ width: size('layout.col8') }}
  >
    <Block
      marginBottom="l"
      font="title-large"
      startingWithTablet={{ marginBottom: 'xl' }}
    >
      Table of Contents
    </Block>
    {(subtitlesData.length ? subtitlesData : initialSubtitles)?.map((item, index) => (
      <Item
        key={`${item.subtitle}-${index}`}
        display="block"
        marginBottom={(subtitlesData.length ? subtitlesData : initialSubtitles).length - 1 !== index && getKey('sizes.spacing.m')}
        onClick={() => item.ref.current.scrollIntoView({ behavior: 'smooth' })}
      >
        {item.subtitle}
      </Item>
      ))}
  </Wrapper>
);

TableOfContents.propTypes = {
  initialSubtitles: array,
  subtitlesData: array,
};

export default TableOfContents;
