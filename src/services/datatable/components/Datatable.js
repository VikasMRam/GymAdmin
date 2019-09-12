import { Component } from 'react';
import { func } from 'prop-types';

import { prefetch } from 'sly/services/newApi';

@prefetch('datatable', 'getDatatable', (req, { id }) => req({ id }))

export default class Datatable extends Component {
  static propTypes = {
    children: func,
  };

  render() {
    return this.props.children(this.props);
  }
}
