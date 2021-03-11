import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Block, Input } from 'sly/web/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';
import { size } from 'sly/common/components/themes';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';


const ArticlesSearchContainer = () => {
  const { push } = useHistory();
  const { searchBy } = useParams();

  const [value, setValue] = useState(searchBy || '');

  const onSubmit = useCallback(() =>
    value.trim() &&
    push(`${RESOURCE_CENTER_PATH}/search/${value.trim()}`),
  [value]);

  return (
    <>
      <Input
        css={{
          height: '100%',
          width: 'auto',
          flexGrow: 1,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        placeholder="Search the blog"
        value={value}
        onChange={evt => setValue(evt.target.value)}
        onKeyDown={evt => evt.keyCode === 13 && onSubmit()}
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
          onClick={onSubmit}
        />
      </Block>
    </>
  );
};

export default ArticlesSearchContainer;
