import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { object, string, func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import Input from 'sly/components/atoms/Input';
import IconButton from 'sly/components/molecules/IconButton';
import datatableProptype from 'sly/propTypes/datatable';
import filterStateProptype from 'sly/propTypes/filterState';
import DatatableFilters from 'sly/components/organisms/DatatableFilters';

const border = css`${size('border.regular')} solid ${palette('slate.stroke')}`;
const Wrappper = styled.div`
  display: flex;
  padding: ${size('spacing.large')};
  border-bottom: ${border};
  background-color: ${palette('white.base')};
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border-top: none;
    border-bottom: none;
    border-left: ${border};
    border-right: ${border};
  }
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

const AddNewButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
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

const isFilterable = datatable => datatable && datatable.columns.some(column => column.isFilterable);

const TableHeaderButtons = ({
  onColumnButtonClick, onAddNewButtonClick, onSortButtonClick, onSearchTextKeyUp, datatable, filterState, className, modelName,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <Wrappper className={className}>
      {/* <SearchButton icon="search" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile /> */}
      <AddNewButton icon="search" onClick={onAddNewButtonClick}>Add {modelName}</AddNewButton>
      <SearchTextInput type="search" placeholder="Type to filter by name" onKeyUp={onSearchTextKeyUp} />
      <RightSideButtons>
        {onSortButtonClick && <SortButton onClick={onSortButtonClick} icon="sort" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Sort</SortButton>}
        {isFilterable(datatable) && <FilterButton onClick={() => setShowFilter(!showFilter)} icon="filter" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Filter</FilterButton>}
        {onColumnButtonClick && <ColumnsButton onClick={onColumnButtonClick} icon="column" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Columns</ColumnsButton>}
      </RightSideButtons>
      {showFilter && <DatatableFilters datatable={datatable} filterState={filterState} />}
    </Wrappper>
  );
}

TableHeaderButtons.propTypes = {
  datatable: datatableProptype,
  filterState: filterStateProptype,
  onColumnButtonClick: func,
  className: string,
  modelName: string,
  onAddNewButtonClick: func,
  onSortButtonClick: func,
  onSearchTextKeyUp: func,
};

export default TableHeaderButtons;
