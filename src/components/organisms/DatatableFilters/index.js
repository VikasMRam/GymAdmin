import React, { Component } from 'react';
import { func, shape, arrayOf, oneOf } from 'prop-types';
import { css } from 'styled-components';

import { Box } from 'sly/components/atoms';
import { size } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import datatableProptype from 'sly/propTypes/datatable';
import filterProptype from 'sly/propTypes/datatableFilter';
import DatatableFilterRow from 'sly/components/organisms/DatatableFilterRow';
import ButtonLink from 'sly/components/molecules/ButtonLink';

const Wrapper = mobileOnly(Box, css`
 
`, css`
  display: table;
  width: 100%; 
  
  border-collapse: separate;
  border-spacing: ${size('spacing.regular')};
`);

export default class DatatableFilters extends Component {
  static propTypes = {
    onChange: func,
    filterState: shape({
      logicalOperator: oneOf(['and', 'or']),
      filters: arrayOf(filterProptype),
    }).isRequired,
    datatable: datatableProptype,
  };

  addFilter = () => {
    const { filterState, onChange } = this.props;
    const { filters, logicalOperator } = filterState;
    onChange({ filters: [...filters, {}], logicalOperator });
  };

  onFilterChange = (filter, newFilter) => {
    const { filterState, onChange } = this.props;
    const { filters, logicalOperator } = filterState;
    const index = filters.indexOf(filter);
    onChange({ filters: [...filters.slice(0, index), newFilter, ...filters.slice(index + 1)], logicalOperator });
  };

  onFilterRemove = (filter) => {
    const { onChange, filterState } = this.props;
    const { filters, logicalOperator } = filterState;
    const index = filters.indexOf(filter);
    const next = [...filters.slice(0, index), ...filters.slice(index + 1)];
    onChange({ filters: next, logicalOperator });
  };

  onLogicalOperatorChange = (logicalOperator) => {
    const { onChange, filterState } = this.props;
    const { filters } = filterState;
    onChange({ filters, logicalOperator });
  };

  render() {
    const { filterState, datatable } = this.props;
    const { filters, logicalOperator } = filterState;
    return (
      <Wrapper>
        {filters.map((filter, i) => (
          /* eslint-disable react/no-array-index-key */
          <DatatableFilterRow
            key={`${filter.column || i}_${i}`}
            index={i}
            onFilterChange={this.onFilterChange}
            onRemove={this.onFilterRemove}
            onLogicalOperatorChange={this.onLogicalOperatorChange}
            logicalOperator={logicalOperator}
            filter={filter}
            datatable={datatable}
          />
        ))}
        <ButtonLink
          icon="add"
          palette="slate"
          size="caption"
          onClick={this.addFilter}
        >
          Add filter
        </ButtonLink>
      </Wrapper>
    );
  }
}
