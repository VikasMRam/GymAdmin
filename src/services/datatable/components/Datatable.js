import { Component } from 'react';
import { func, object, string, shape, bool } from 'prop-types';
import { withRouter } from 'react-router';

import { prefetch } from 'sly/services/newApi';
import datatableColumnsProptype from 'sly/propTypes/datatableColumns';
import { makeQuerystringFilters, parseQuerystringFilters, simpleQStringify } from 'sly/services/datatable/helpers';

@prefetch('datatable', 'getDatatable', (req, { id }) => req({ id }))

@withRouter

export default class Datatable extends Component {
  static propTypes = {
    children: func,
    datatable: shape({ columns: datatableColumnsProptype }),
    sectionFilters: object,
    status: object,
    location: shape({ search: string }),
  };

  state = {
    filters: [],
    logicalOperator: 'and',
  };

  doSearch = (column, operator, value) => {
    const filter = this.getFilter(column, operator);
    if (filter) {
      if (value === '') {
        this.onFilterRemove(filter);
      } else {
        this.onFilterChange(filter, {
          ...filter,
          value,
        });
      }
    } else {
      this.addFilter({
        column,
        operator,
        value,
      });
    }
  };

  getFilter = (column, operator) => {
    const { filters } = this.state;
    return filters.find(({ column: columnName, operator: operatorName }) => column === columnName && operator === operatorName);
  };

  addFilter = (newFilter = {}) => {
    const { filters, logicalOperator } = this.state;
    this.setState({ filters: [...filters, newFilter], logicalOperator });
  };

  onFilterChange = (filter, newFilter) => {
    const { filters, logicalOperator } = this.state;
    const index = filters.indexOf(filter);
    this.setState({
      filters: [
        ...filters.slice(0, index),
        newFilter,
        ...filters.slice(index + 1),
      ],
      logicalOperator,
    });
  };

  onFilterRemove = (filter) => {
    const { filters, logicalOperator } = this.state;
    const index = filters.indexOf(filter);
    const next = [...filters.slice(0, index), ...filters.slice(index + 1)];
    this.setState({ filters: next, logicalOperator });
  };

  onLogicalOperatorChange = (logicalOperator) => {
    const { filters } = this.state;
    this.setState({ filters, logicalOperator });
  };

  render() {
    const { datatable, status, sectionFilters } = this.props;

    const {
      addFilter,
      doSearch,
      onFilterChange,
      onFilterRemove,
      onLogicalOperatorChange,
      getFilter,
    } = this;

    const columns = datatable
      ? datatable.columns
      : [];

    return this.props.children({
      addFilter,
      doSearch,
      onFilterChange,
      onFilterRemove,
      onLogicalOperatorChange,
      getFilter,

      columns,
      hasFinished: status.datatable.hasFinished,
      filterState: this.state,
      query: makeQuerystringFilters(this.state, sectionFilters),
    });
  }
}
