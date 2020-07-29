import React, { Component } from 'react';

import DashboardMyAccountPage from 'sly/web/components/pages/DashboardMyAccountPage';
import { withUser } from 'sly/web/services/api';
import userPropType from 'sly/common/propTypes/user';

const incompleteInfoWarning = 'Please enter the incomplete fields below to complete your account.';

@withUser
export default class DashboardMyAccountPageContainer extends Component {
  static propTypes = {
    user: userPropType,
  };

  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    const { email, hasPasswordSet } = user;
    const showIncompleteWarning = !email || !hasPasswordSet;
    let warningMessage = null;
    if (showIncompleteWarning) {
      warningMessage = incompleteInfoWarning;
    }
    return <DashboardMyAccountPage user={user} title="Account" warningMessage={warningMessage} />;
  }
}

