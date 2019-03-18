import { Component } from 'react';
import { number, node } from 'prop-types';

import { query } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';

@query('user', 'getUser', getUser => getUser({ id: 'me' }))

class Role extends Component {
  static propTypes = {
    user: userPropType,
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

export default Role;
