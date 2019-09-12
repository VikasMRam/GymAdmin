import { Component } from 'react';
import { func } from 'prop-types';

import { prefetch } from 'sly/services/newApi';
import datatableProptype from 'sly/propTypes/datatable';

@prefetch('datatable', 'getDatatable', (req, { id }) => req({ id }))

export default class Datatable extends Component {
  static propTypes = {
    children: func,
    datatable: datatableProptype,
  };

  state = {
    filters: [],
    logicalOperator: 'and',
  };

  onChange = (filterState) => {
    this.setState(filterState);
  };


  render() {
    const { datatable } = this.props;
    return this.props.children({
      datatable,
      filterState: this.state,
      onChange: this.onChange,
    });
  }
}
