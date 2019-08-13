import React, { Component } from 'react';
import { func, arrayOf } from 'prop-types';

import datatableProptype from 'sly/propTypes/datatable';
import filterProptype from 'sly/propTypes/datatableFilter';
import DatatableFilterRow from 'sly/components/organisms/DatatableFilterRow';
import Button from 'sly/components/atoms/Button';

const Wrapper = 'div';

export default class DatatableFilters extends Component {
  static propTypes = {
    onChange: func,
    filters: arrayOf(filterProptype).isRequired,
    datatable: datatableProptype,
  };

  addFilter = () => {
    const { filters, onChange } = this.props;
    onChange([...filters, {}]);
  };

  onFilterChange = (filter, newFilter) => {
    const { filters, onChange } = this.props;
    const index = filters.indexOf(filter);
    onChange([...filters.slice(0, index), newFilter, ...filters.slice(index + 1)]);
  };

  onFilterRemove = (filter) => {
    const { filters, onChange } = this.props;
    const index = filters.indexOf(filter);
    const next = [...filters.slice(0, index), ...filters.slice(index + 1)];
    onChange(next);
  };

  render() {
    const { filters, datatable } = this.props;
    return (
      <Wrapper>
        {filters.map((filter, i) => (
          <DatatableFilterRow
            key={`${filter.column || i}_${i}`}
            onChange={this.onFilterChange}
            onRemove={this.onFilterRemove}
            filters={filters}
            filter={filter}
            datatable={datatable}
          />
        ))}
        <Button ghost transparent onClick={this.addFilter}>Add filter</Button>
      </Wrapper>
    );
  }
}
