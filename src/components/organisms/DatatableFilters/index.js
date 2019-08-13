import React, { Component } from 'react';
import { string, number, oneOfType, arrayOf, shape } from 'prop-types';

import datatableProptype from 'sly/propTypes/datatable';
import DatatableFilterRow from 'sly/components/organisms/DatatableFilterRow';
import Button from 'sly/components/atoms/Button';

const Wrapper = 'div';

export default class DatatableFilters extends Component {
  static propTypes = {
    onChange: func,
    filters: filtersProptype.isRequired,
    datatable: datatableProptype,
  };

  render() {
    const { filters, datatable } = this.props;
    return (
      <Wrapper>
        {filters.map(filter => (
          <DatatableFilterRow
            onChange={this.onFilterChange}
            filters={filters}
            filter={filter}
            datatable={datatable}
          />
        ))}
        <Button onClick={this.addFilter} />
      </Wrapper>
    );
  }
}
