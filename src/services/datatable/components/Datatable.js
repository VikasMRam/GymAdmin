import { Component } from 'react';
import { func, object, shape } from 'prop-types';

import { prefetch } from 'sly/services/newApi';
import datatableColumnsProptype from 'sly/propTypes/datatableColumns';
import { makeQuerystringFilters } from 'sly/services/datatable/helpers';

@prefetch('datatable', 'getDatatable', (req, { id }) => req({ id }))

export default class Datatable extends Component {
  static propTypes = {
    children: func,
    datatable: shape({
        columns: datatableColumnsProptype
    }),
    sectionFilters: object,
    status: object,
  };

  state = {
    filters: [],
    logicalOperator: 'and',
  };

  addFilter = () => {
    const { filters, logicalOperator } = this.state;
    this.setState({ filters: [...filters, {}], logicalOperator });
  };

  onFilterChange = (filter, newFilter) => {
    const { filters, logicalOperator } = this.state;
    const index = filters.indexOf(filter);
    this.setState({ filters: [...filters.slice(0, index), newFilter, ...filters.slice(index + 1)], logicalOperator });
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
    const { addFilter, onFilterChange, onFilterRemove, onLogicalOperatorChange } = this;
    const columns = datatable
      ? datatable.columns
      : [];
    return this.props.children({
      addFilter,
      onFilterChange,
      onFilterRemove,
      onLogicalOperatorChange,
      columns,
      hasFinished: status.datatable.hasFinished,
      filterState: this.state,
      query: makeQuerystringFilters(this.state, sectionFilters),
    });
  }
}
