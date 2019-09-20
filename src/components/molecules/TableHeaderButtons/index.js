import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { object, string, func, shape } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import Input from 'sly/components/atoms/Input';
import IconButton from 'sly/components/molecules/IconButton';
import filterStateProptype from 'sly/propTypes/filterState';
import DatatableFilters from 'sly/components/organisms/DatatableFilters';
import PopoverPortal from 'sly/components/molecules/PopoverPortal';
import { AGENT_DASHBOARD_FAMILIES_NEW_PATH } from 'sly/constants/dashboardAppPaths';

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
  onColumnButtonClick, onSortButtonClick, datatable, className, modelName,
}) => {
  const filterButton = (
    <FilterButton
      icon="filter"
      ghost
      borderPalette="slate"
      palette="slate"
      iconPalette="slate"
      hideTextInMobile
    >
      Filter
    </FilterButton>
  );

  return (
    <Wrappper className={className}>
      {/* <SearchButton icon="search" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile /> */}
      <AddNewButton icon="search" to={AGENT_DASHBOARD_FAMILIES_NEW_PATH}>Add {modelName}</AddNewButton>
      <SearchTextInput
        type="search"
        placeholder="Type to filter by name"
        value={(datatable.getFilter('name', 'cs') || {}).value || ''}
        onChange={({ target }) => datatable.doSearch('name', 'cs', target.value)}
      />
      {onSortButtonClick && <SortButton onClick={onSortButtonClick} icon="sort" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Sort</SortButton>}
      {isFilterable(datatable) && (
        <PopoverPortal button={filterButton}>
          <DatatableFilters datatable={datatable} />
        </PopoverPortal>
      )}
      {onColumnButtonClick && <ColumnsButton onClick={onColumnButtonClick} icon="column" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Columns</ColumnsButton>}
    </Wrappper>
  );
};

TableHeaderButtons.propTypes = {
  datatable: object,
  onColumnButtonClick: func,
  className: string,
  modelName: string,
  onSortButtonClick: func,
  onSearchTextKeyUp: func,
};

export default TableHeaderButtons;
