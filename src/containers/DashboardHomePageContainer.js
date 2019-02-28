import React, { Component } from 'react';

import { query, withApi } from 'sly/services/newApi';

@query('user', 'getUser', getUser => getUser({ userId: 'me' }))

@query('communities', 'getSearchResources', search => search({
  city: 'san-francisco',
  state: 'california',
  toc: 'assisted-living',
}))

class DashboardTestPageContainer extends Component {
  state = {
    name: this.props.user.attributes.name,
  };

  nameChange = ev => this.setState({
    name: ev.target.value,
  });

  submit = () => {
    const { name } = this.state;
    const { user, produce, api } = this.props;
    api.updateUser({ userId: user.id }, produce(user, draft => {
      draft.attributes.name = name;
    }));
  };

  render() {
    const { name } = this.state;
    const { user, communities } = this.props;
    return (
      <div>
        <h2>Example of post data</h2>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
        <input onChange={this.nameChange} type="text" value={name} />
        <button onClick={this.submit}>send</button>
        <h2>Example of ssr data</h2>
        <pre>
          {JSON.stringify(communities, null, 2)}
        </pre>
      </div>
    );
  }
}

export default withApi(DashboardTestPageContainer);
