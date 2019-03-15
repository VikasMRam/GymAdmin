import React, { Component } from 'react';

import DashboardMyProfilePage from 'sly/components/pages/DashboardMyProfilePage';
import { query } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';

@query('user', 'getUser', getUser => getUser({ id: 'me' }))
class DashboardMyProfilePageContainer extends Component {
  static propTypes = {
    user: userPropType,
  }

  render() {
    const { user } = this.props;
    return (
      <DashboardMyProfilePage user={user} />
    );
  }
}

export default DashboardMyProfilePageContainer;
