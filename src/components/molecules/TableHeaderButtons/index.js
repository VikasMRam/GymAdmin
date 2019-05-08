import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

import { size } from 'sly/components/themes';
import Input from 'sly/components/atoms/Input';
import IconButton from 'sly/components/molecules/IconButton';

const Wrappper = styled.div`
  display: flex;
  padding: ${size('spacing.large')};
`;

// const SearchButton = styled(IconButton)`
//   @media screen and (min-width: ${size('breakpoint.mobile')}) {
//     display: none;
//   }
// `;

const SearchTextInput = styled(Input)`

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
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

const TableHeaderButtons = ({
  onColumnButtonClick, onSortButtonClick, onFilterButtonClick, className,
}) => (
  <Wrappper className={className}>
    {/* <SearchButton icon="search" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile /> */}
    <SearchTextInput type="search" placeholder="Type to filter by name" />
    <RightSideButtons>
      {onSortButtonClick && <SortButton onClick={onSortButtonClick} icon="sort" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Sort</SortButton>}
      {onFilterButtonClick && <FilterButton onClick={onFilterButtonClick} icon="filter" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Filter</FilterButton>}
      {onColumnButtonClick &&
        <ColumnsButton onClick={onColumnButtonClick} icon="column" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Columns</ColumnsButton>
      }
    </RightSideButtons>
  </Wrappper>
);

TableHeaderButtons.propTypes = {
  onColumnButtonClick: func,
  className: string,
  onSortButtonClick: func,
  onFilterButtonClick: func,
};

export default TableHeaderButtons;
