import React, { Component } from 'react';
import { object } from 'prop-types';

import DashboardMyProfilePage from 'sly/components/pages/DashboardMyProfilePage';
import { withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import { AGENT_DASHBOARD_ACCOUNT_PATH } from 'sly/constants/dashboardAppPaths';

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
    return (
      <DashboardMyProfilePage user={user} title={title} warningMessage={warningMessage} />
    );
  }
}

