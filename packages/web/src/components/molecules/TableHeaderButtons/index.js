import React from 'react';
import styled, { css } from 'styled-components';
import { object, string, func } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/common/components/themes';
import { Input, Block } from 'sly/web/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';
import DatatableFilters from 'sly/web/components/organisms/DatatableFilters';
import PopoverPortal from 'sly/web/components/molecules/PopoverPortal';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';

const Wrapper = styled(Block)`
  display: flex;
`;

Wrapper.defaultProps = {
  padding: 'large',
  borderBottom: 'regular',
  background: 'white',
};

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
const Filters = ({ datatable, meta = {} }) => { /* eslint-disable react/prop-types */
  if (!isFilterable(datatable)) {
    return null;
  }

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
    <PopoverPortal headerButton={clearButton} title={filterTitle} subtitle={filterSubtitle} button={filterButton}>
      <DatatableFilters datatable={datatable} autocompleteFilters={autocompleteFilters} />
    </PopoverPortal>
  );
};

const TableHeaderButtons = ({
  onColumnButtonClick, onSearchTextKeyUp, onSortButtonClick, datatable, className, meta, value, modelConfig,
}) => (
  <Wrapper className={className}>
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
  </Wrapper>
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
