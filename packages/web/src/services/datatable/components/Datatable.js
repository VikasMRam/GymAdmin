import { Component } from 'react';
import { func, object, string, shape, bool } from 'prop-types';

import { withRouter } from 'react-router';
import { prefetch } from 'sly/web/services/api';
import datatableColumnsProptype from 'sly/common/propTypes/datatableColumns';
import {
  makeQuerystringFilters,
  parseQuerystringFilters,
  simpleQSObjectify,
  simpleQStringify,
} from 'sly/web/services/datatable/helpers';

@prefetch('datatable', 'getDatatable', (req, { id }) => req({ id }))
@withRouter

export default class Datatable extends Component {
  static propTypes = {
    children: func,
    datatable: shape({ columns: datatableColumnsProptype }),
    sectionFilters: object,
    status: object,
    location: shape({ search: string }),
    history: object,
  };

  state = parseQuerystringFilters(this.props.location.search);

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (prevProps.location.search !== location.search) {
      const state = parseQuerystringFilters(location.search);
      this.setState(state);
    }
  }

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
    const filter = filters.find(({
      column: columnName,
      operator: operatorName,
    }) => column === columnName && operator === operatorName);
    return filter;
  };

  addFilter = (newFilter = {}) => {
    const { filters, logicalOperator } = this.state;
    const state = { filters: [...filters, newFilter], logicalOperator };
    this.setFilters(state);
  };

  onFilterChange = (filter, newFilter) => {
    const { filters, logicalOperator } = this.state;
    const index = filters.indexOf(filter);

    const state = {
      filters: [
        ...filters.slice(0, index),
        newFilter,
        ...filters.slice(index + 1),
      ],
      logicalOperator,
      'page-number': 0,
    };

    this.setFilters(state);
  };

  onFilterRemove = (filter) => {
    const { filters, logicalOperator } = this.state;
    const index = filters.indexOf(filter);
    const next = {
      filters: [...filters.slice(0, index), ...filters.slice(index + 1)],
      logicalOperator,
      'page-number': 0,
    };
    this.setFilters(next);
  };

  onLogicalOperatorChange = (logicalOperator) => {
    const { filters } = this.state;
    this.setFilters({ filters, logicalOperator, 'page-number': 0 });
  };

  clearFilters = () => {
    this.setFilters({ filters: [], logicalOperator: 'and', 'page-number': 0 });
  };

  setFilters = (state) => {
    const { location, history } = this.props;
    const qs = state.filters.length
      ? simpleQStringify(makeQuerystringFilters(state))
      : '';
    history.push(`${location.pathname}${qs}`);
  };

  render() {
    const {
      datatable,
      status,
      sectionFilters,
      location,
    } = this.props;

    const {
      addFilter,
      doSearch,
      onFilterChange,
      onFilterRemove,
      onLogicalOperatorChange,
      getFilter,
      clearFilters,
    } = this;

    const columns = datatable
      ? datatable.columns
      : [];

    const query = simpleQSObjectify(makeQuerystringFilters(this.state, sectionFilters, true));
    const basePath = `${location.pathname}${simpleQStringify(makeQuerystringFilters(this.state))}`;

    return this.props.children({
      addFilter,
      doSearch,
      onFilterChange,
      onFilterRemove,
      onLogicalOperatorChange,
      getFilter,
      clearFilters,

      columns,
      hasFinished: status.datatable.hasFinished,
      filterState: this.state,
      numberOfFilters: this.state.filters.length,
      basePath,
      query,
    });
  }
}
