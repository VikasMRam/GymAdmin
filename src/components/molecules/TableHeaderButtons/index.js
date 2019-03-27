import React from 'react';
import styled from 'styled-components';

import IconButton from '../IconButton';

import { size, palette } from 'sly/components/themes';
import Input from 'sly/components/atoms/Input';

const Wrappper = styled.div`
  display: flex;
  padding: ${size('spacing.regular')}; ${size('spacing.large')};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const SearchButton = styled(IconButton)`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    display: none;
  }
`;

const SearchTextInput = styled(Input)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    display: block;
    margin-right: ${size('spacing.large')};
  }
`;

const RightSideButtons = styled.div`
  margin-left: auto;
  display: flex;
`;

const SortButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
`;

const TableHeaderButtons = () => {
  return (
    <Wrappper>
      <SearchButton icon="search" ghost palette="slate" iconPalette="grey" />
      <SearchTextInput type="search" placeholder="Type to filter by name" />
      <RightSideButtons>
        <SortButton icon="sort" ghost iconPalette="grey" />
        <IconButton icon="filter" ghost iconPalette="grey" />
      </RightSideButtons>
    </Wrappper>
  );
};

export default TableHeaderButtons;
