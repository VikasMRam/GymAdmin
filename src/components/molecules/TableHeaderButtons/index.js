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

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col4')};
  }
`;

const RightSideButtons = styled.div`
  margin-left: auto;
  display: flex;
`;

const SortButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
`;

const FilterButton = styled(IconButton)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('spacing.regular')};
  }
`;

const ColumnsButton = styled(IconButton)`
  display: none;
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
  }
`;
const TableHeaderButtons = () => {
  return (
    <Wrappper>
      <SearchButton icon="search" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile />
      <SearchTextInput type="search" placeholder="Type to filter by name" />
      <RightSideButtons>
        <SortButton icon="sort" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Sort</SortButton>
        <FilterButton icon="filter" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Filter</FilterButton>
        <ColumnsButton icon="column" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Columns</ColumnsButton>
      </RightSideButtons>
    </Wrappper>
  );
};

export default TableHeaderButtons;
