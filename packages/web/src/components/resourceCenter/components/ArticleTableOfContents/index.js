import React from 'react';
import { array } from 'prop-types';

import Block from 'sly/common/system/Block';
import Link from 'sly/common/system/Link';
import { sx, space } from 'sly/common/system/sx';

const TableOfContents = ({ subtitlesData }) => (
  <Block
    border="box"
    padding="l m l l"
    pad="l"
    mx="auto"
    width={sx`calc(100% - ${space('gutter')} * 2)`}
    sx$tablet={{ padding: 'xl',  width: 'col6', marginBottom: 'xl' }}
    sx$laptop={{ width: 'col8' }}
  >
    <Block
      marginBottom="l"
      font="title-l"
      sx$tablet={{ marginBottom: 'xl' }}
    >
      Table of Contents
    </Block>
    {subtitlesData.map((item, index) => (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        // eslint-disable-next-line react/no-array-index-key
        key={`${item.value}-${index}`}
        font="body-l"
        display="block"
        mb="m"
        sx={{
          ':last-child': {
            marginBottom: 0,
          },
        }}
        onClick={() => item.ref.current.scrollIntoView({ behavior: 'smooth' })}
      >
        {item.value}
      </Link>
      ))}
  </Block>
);

TableOfContents.propTypes = {
  subtitlesData: array,
};

export default TableOfContents;
