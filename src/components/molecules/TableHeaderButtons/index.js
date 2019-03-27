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

// Button Text removal inspired from https://css-tricks.com/snippets/css/remove-button-text-in-ie7/
const SortButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
  text-indent: -9000px; 
  text-transform: capitalize;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    text-indent: 0; 
    text-transform: none;
  }
`;

const FilterButton = styled(IconButton)`
  text-indent: -9000px; 
  text-transform: capitalize;
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('spacing.regular')};
    text-indent: 0; 
    text-transform: none;
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
      <SearchButton icon="search" ghost borderPalette="slate" palette="slate" iconPalette="slate" />
      <SearchTextInput type="search" placeholder="Type to filter by name" />
      <RightSideButtons>
        <SortButton icon="sort" ghost borderPalette="slate" palette="slate" iconPalette="slate">Sort</SortButton>
        <FilterButton icon="filter" ghost borderPalette="slate" palette="slate" iconPalette="slate">Filter</FilterButton>
        <ColumnsButton icon="column" ghost borderPalette="slate" palette="slate" iconPalette="slate">Columns</ColumnsButton>
      </RightSideButtons>
    </Wrappper>
  );
};

export default TableHeaderButtons;
