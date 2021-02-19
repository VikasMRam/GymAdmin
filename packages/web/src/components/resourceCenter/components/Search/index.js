import React from 'react';

import { Block, Input } from 'sly/web/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';
import { size } from 'sly/common/components/themes';

const ArticlesSearchContainer = () => {
  return (
    <>
      <Input
        css={{ height: '100%', width: 'auto', flexGrow: 1 }}
        placeholder="Search the blog"
        onFocus={() => { /** TODO */ }}
        onBlur={() => { /** TODO */ }}
        onKeyDown={() => { /** TODO */ }}
        onChange={() => { /** TODO */ }}
      />
      <Block
        upToLaptop={{ width: size('element.large'), height: size('element.large') }}
        startingWithLaptop={{ width: size('element.xLarge'), height: size('element.button') }}
      >
        <IconButton
          icon="search"
          snap="left"
          border="0"
          css={{ height: '100%', width: '100%', padding: 0 }}
          onClick={() => { /** TODO */ }}
        />
      </Block>
    </>
  );
};

export default ArticlesSearchContainer;
