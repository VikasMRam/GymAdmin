import React, { Component } from 'react';
import produce from 'immer';

import { query } from 'sly/services/newApi';

@query('user', 'getUser', getUser => getUser({ id: 'me' }))

export default class DashboardTestPageContainer extends Component {
  state = {
    name: this.props.user.name,
  };

  nameChange = ev => this.setState({
    name: ev.target.value,
  });

  submit = () => {
    const { name } = this.state;
    const { status, api } = this.props;
    const { result } = status.user;
    api.updateUser({ id: result.id }, {
      data: produce(result, draft => {
        draft.attributes.name = name;
      }),
    });
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
      </div>
    );
  }
}
