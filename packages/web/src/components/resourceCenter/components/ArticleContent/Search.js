import React, { forwardRef } from 'react';

import { size } from 'sly/common/components/themes';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import { sx, space } from 'sly/common/system/sx';
import Block from 'sly/common/system/Block';

const Search = forwardRef(({ onCurrentLocation, ...props }, ref) => (
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
      marginBottom: 'xl'
    }}
    sx$laptop={{
      width: 'col8',
      margin: 'm 0 xxl',
    }}
    {...props}
  >
    <Block
      font="title-l"
      marginBottom={['s', 'l']}
    >
      Find assisted living communities near you
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

Search.displayName = 'Search';

export default Search;
