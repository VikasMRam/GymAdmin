import { Component } from 'react';
import { number, node } from 'prop-types';

import { withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import { userIs } from 'sly/services/helpers/role';

@withUser

class Role extends Component {
  static propTypes = {
    user: userPropType,
    children: node,
    is: number.isRequired,
  };

  render() {
    const { children, user, is: role } = this.props;
    if (!user) {
      return null;
    }
    if (userIs(user, role)) {
      return children;
    }
    return null;
  }
}

export default Role;
