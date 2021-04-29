import React, { forwardRef } from 'react';
import { func, string } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { sx, space } from 'sly/common/system/sx';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import Block from 'sly/common/system/Block';

const Search = forwardRef(({ onCurrentLocation, title, ...props }, ref) => (
  <Block
    ref={ref}
    border="round"
    padding="l"
    marginBottom="l"
    background="viridian.lighter-90"
    width={sx`calc(100% - ${space('m')} * 2)`}
    sx$tablet={{
      padding: 'xl',
      width: 'col6',
      marginBottom: 'xl',
    }}
    sx$laptop={{
      width: 'col8',
    }}
    {...props}
  >
    <Block
      font="title-l"
      marginBottom={['s', 'l']}
    >
      {title}
    </Block>
    <SearchBoxContainer
      onCurrentLocation={onCurrentLocation}
      layout="header"
      width="100%"
      height={size('element.large')}
      padding={['regular', 0]}
      visibility="visible"
      include="community"
      placeholder="Search by city, zip, community name"
    />
  </Block>
));

Search.propTypes = {
  onCurrentLocation: func,
  title: string,
};
Search.displayName = 'Search';

export default Search;
