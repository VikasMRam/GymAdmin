import React, { Component } from 'react';
import { query } from 'sly/services/newApi';

@query('user', 'getUser', getUser => getUser({ userId: 'me' }))

@query('communities', 'getSearchResources', search => search({
  city: 'san-francisco',
  state: 'california',
  toc: 'assisted-living',
}))

export default class DashboardHomePageContainer extends Component {
  render() {
    const { user, communities } = this.props;
    return (
      <div>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
        <pre>
          {JSON.stringify(communities, null, 2)}
        </pre>
      </div>
    );
  }
}
