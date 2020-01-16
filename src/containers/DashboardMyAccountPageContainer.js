import React, { Component } from 'react';
import { object } from 'prop-types';

import DashboardMyAccountPage from 'sly/components/pages/DashboardMyAccountPage';
import { withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';

@withUser
export default class DashboardMyAccountPageContainer extends Component {
  static propTypes = {
    user: userPropType,
    location: object,
  };

  render() {
    const { user } = this.props;

    return (
      <DashboardMyAccountPage user={user} />
    );
  }
}

