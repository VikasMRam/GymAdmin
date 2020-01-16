import React, { Component } from 'react';
import { object } from 'prop-types';

import DashboardMyProfilePage from 'sly/components/pages/DashboardMyProfilePage';
import DashboardMyAccountPage from 'sly/components/pages/DashboardMyAccountPage';
import { withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import { AGENT_DASHBOARD_ACCOUNT_PATH } from 'sly/constants/dashboardAppPaths';
import { userIs } from 'sly/services/helpers/role';
import { AGENT_ADMIN_ROLE } from 'sly/constants/roles';

const incompleteInfoWarning = 'Please enter the incomplete fields below to complete your account.';

@withUser

export default class DashboardMyProfilePageContainer extends Component {
  static propTypes = {
    user: userPropType,
    location: object,
  };

  render() {
    const { user, location } = this.props;
    const { email, hasPasswordSet } = user;
    const showIncompleteWarning = !email || !hasPasswordSet;
    let warningMessage = null;
    let title = 'My Profile';
    if (location.pathname === AGENT_DASHBOARD_ACCOUNT_PATH) {
      title = 'My Account';
    }
    if (showIncompleteWarning) {
      warningMessage = incompleteInfoWarning;
    }
    if (userIs(user, AGENT_ADMIN_ROLE)) {
      return <DashboardMyAccountPage user={user} title={title} warningMessage={warningMessage} />;
    }
    return <DashboardMyProfilePage user={user} title={title} warningMessage={warningMessage} />;
  }
}

