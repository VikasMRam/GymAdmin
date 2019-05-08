import React, { Component } from 'react';

import DashboardMyProfilePage from 'sly/components/pages/DashboardMyProfilePage';
import { withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';

const incompleteInfoWarning = 'Please enter the incomplete fields below to complete your account.';

@withUser

export default class DashboardMyProfilePageContainer extends Component {
  static propTypes = {
    user: userPropType,
  };

  render() {
    const { user } = this.props;
    const { email, hasPasswordSet } = user;
    const showIncompleteWarning = !email || !hasPasswordSet;
    let warningMessage = null;
    if (showIncompleteWarning) {
      warningMessage = incompleteInfoWarning;
    }
    return (
      <DashboardMyProfilePage user={user} warningMessage={warningMessage} />
    );
  }
}

