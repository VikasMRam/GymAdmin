import { Component } from 'react';
import { func, object } from 'prop-types';

import { prefetch } from 'sly/services/newApi';
import datatableProptype from 'sly/propTypes/datatable';
import { makeQuerystringFilters } from 'sly/services/datatable/helpers';

@prefetch('datatable', 'getDatatable', (req, { id }) => req({ id }))

export default class Datatable extends Component {
  static propTypes = {
    children: func,
    datatable: datatableProptype,
    sectionFilters: object,
    status: object,
  };

  state = {
    filters: [],
    logicalOperator: 'and',
  };

  onChange = (filterState) => {
    this.setState(filterState);
  };

  render() {
    const { datatable, status, sectionFilters } = this.props;
    return this.props.children({
      datatable,
      hasFinished: status.datatable.hasFinished,
      filterState: this.state,
      query: makeQuerystringFilters(this.state, sectionFilters),
      onChange: this.onChange,
    });
  }
}
