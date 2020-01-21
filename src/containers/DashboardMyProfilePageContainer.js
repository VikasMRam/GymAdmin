import React, { Component } from 'react';
import { object } from 'prop-types';

import DashboardMyProfilePage from 'sly/components/pages/DashboardMyProfilePage';
import { withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';

@withUser
export default class DashboardMyProfilePageContainer extends Component {
  static propTypes = {
    user: userPropType,
    location: object,
  };

  render() {
    const { user } = this.props;

    return (
      <DashboardMyProfilePage user={user} title="My Profile" />
    );
  }
}

