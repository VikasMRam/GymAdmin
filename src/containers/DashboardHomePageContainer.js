import React, { Component } from 'react';
import { query } from 'sly/services/newApi';

@query('user', 'getUser', getUser => getUser({ userId: 'me' }))

export default class DashboardHomePageContainer extends Component {
  render() {
    const { user } = this.props
    return (
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    );
  }
}
