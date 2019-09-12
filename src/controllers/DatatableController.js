import React from 'react';

import datatableProptype from 'sly/propTypes/datatable';
import { prefetch } from 'sly/services/newApi';
import DatatableFilters from 'sly/components/organisms/DatatableFilters';


@prefetch('datatable', 'getDatatables', (req, { datatableId }) => req({ id: datatableId }))

export default class DatatableController extends React.Component {
  propTypes = {
    datatable: datatableProptype,
  };

  state = {};

  onChange = (filterState) => {
    this.setState(filterState);
  };

  render() {
    const { datatable } = this.props;
    return (
      <DatatableFilters
        datatable={datatable}
        onChange={this.onChange}
        filterState={this.state}
      />
    );
  }
}
