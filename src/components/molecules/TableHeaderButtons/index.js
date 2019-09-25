import React from 'react';
import styled, { css } from 'styled-components';
import { object, string, func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import Input from 'sly/components/atoms/Input';
import IconButton from 'sly/components/molecules/IconButton';
import DatatableFilters from 'sly/components/organisms/DatatableFilters';
import PopoverPortal from 'sly/components/molecules/PopoverPortal';

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

const SearchTextInput = styled(Input)`

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    margin-right: ${size('spacing.large')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col4')};
  }
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
  onColumnButtonClick, onSortButtonClick, datatable, className, autocompleteFilters,
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
      <SearchTextInput
        type="search"
        placeholder="Type to filter by name"
        value={(datatable.getFilter('name', 'cs') || {}).value || ''}
        onChange={({ target }) => datatable.doSearch('name', 'cs', target.value)}
      />
      {onSortButtonClick && <SortButton onClick={onSortButtonClick} icon="sort" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Sort</SortButton>}
      {isFilterable(datatable) && (
        <PopoverPortal title="Filters" button={filterButton}>
          <DatatableFilters datatable={datatable} autocompleteFilters={autocompleteFilters} />
        </PopoverPortal>
      )}
      {onColumnButtonClick && <ColumnsButton onClick={onColumnButtonClick} icon="column" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Columns</ColumnsButton>}
    </Wrappper>
  );
};

TableHeaderButtons.propTypes = {
  autocompleteFilters: object,
  datatable: object,
  onColumnButtonClick: func,
  className: string,
  onSortButtonClick: func,
};

export default TableHeaderButtons;
