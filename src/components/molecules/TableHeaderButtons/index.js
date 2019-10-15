import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { object, string, func } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import Input from 'sly/components/atoms/Input';
import IconButton from 'sly/components/molecules/IconButton';
import DatatableFilters from 'sly/components/organisms/DatatableFilters';
import PopoverPortal from 'sly/components/molecules/PopoverPortal';
import ButtonLink from 'sly/components/molecules/ButtonLink';

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
  margin-right: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col4')};
  }
`;

const SortButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
`;

const FilterButton = styled(IconButton)`
  ${ifProp('filtered', css`
    border-color: ${palette('primary.filler')};
    background: ${palette('primary.background')};
  `)}
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

// eslint-disable-next-line react/prop-types
const Filters = ({ datatable, meta = {} }) => {
  const autocompleteFilters = meta.autocomplete_filters || {};
  const filteredCount = meta.filtered_count || 0;
  const filtered = datatable.numberOfFilters > 0;
  const filterTitle = `Filters ${filtered ? ` (${datatable.numberOfFilters})` : ''}`;
  const filterSubtitle = `${filteredCount} Results`;
  const clearButton = (
    <ButtonLink
      palette="primary"
      weight="medium"
      size="caption"
      onClick={datatable.clearFilters}
    >
      Clear filters
    </ButtonLink>
  );
  const filterButton = (
    <FilterButton
      icon="filter"
      ghost
      borderPalette="slate"
      palette="slate"
      iconPalette="slate"
      hideTextInMobile
      filtered={filtered}
    >
      {filterTitle}
    </FilterButton>
  );

  return (
    <Fragment>
      {isFilterable(datatable) && (
        <PopoverPortal headerButton={clearButton} title={filterTitle} subtitle={filterSubtitle} button={filterButton}>
          <DatatableFilters datatable={datatable} autocompleteFilters={autocompleteFilters} />
        </PopoverPortal>
      )}
    </Fragment>
  );
};

const TableHeaderButtons = ({
  onColumnButtonClick, onSearchTextKeyUp, onSortButtonClick, datatable, className, meta, value, modelConfig,
}) => (
  <Wrappper className={className}>
    {/* <SearchButton icon="search" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile /> */}
    {datatable
      ? (
        <SearchTextInput
          type="search"
          size="button"
          placeholder={`Type to filter by ${modelConfig.defaultSearchField}`}
          value={(datatable.getFilter(modelConfig.defaultSearchField, 'cs') || {}).value || ''}
          onChange={({ target }) => datatable.doSearch(modelConfig.defaultSearchField, 'cs', target.value)} // FIXME: Read default operator from dsf type
        />
      )
      : <SearchTextInput type="search" placeholder="Type to filter by name" value={value} onChange={onSearchTextKeyUp} />
    }
    {onSortButtonClick && <SortButton onClick={onSortButtonClick} icon="sort" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Sort</SortButton>}
    {datatable && <Filters datatable={datatable} meta={meta} />}
    {onColumnButtonClick && <ColumnsButton onClick={onColumnButtonClick} icon="column" ghost borderPalette="slate" palette="slate" iconPalette="slate" hideTextInMobile>Columns</ColumnsButton>}
  </Wrappper>
);

TableHeaderButtons.propTypes = {
  meta: object,
  datatable: object,
  onColumnButtonClick: func,
  className: string,
  onSortButtonClick: func,
  onSearchTextKeyUp: func,
  value: string,
  modelConfig: object,
};

export default TableHeaderButtons;
