import { Component } from 'react';
import { number, object, node } from 'prop-types';

import { query } from 'sly/services/newApi';

@query('user', 'getUser', getUser => getUser({ id: 'me' }))

class RoleContainer extends Component {
  static propTypes = {
    user: object,
    children: node,
    is: number.isRequired,
  };

  render() {
    const { children, user, is } = this.props;
    if (!user) {
      return null;
    }
    const { roleID } = user;
    /* eslint-disable-next-line no-bitwise */
    if (is & roleID) {
      return children;
    }
    return null;
  }
}

export default RoleContainer;
