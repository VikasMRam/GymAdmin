import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import DashboardMyProfilePage from 'sly/components/pages/DashboardMyProfilePage';
import { query } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';

const incompleteInfoWarning = 'Please enter the incomplete fields below to complete your account.';

@query('user', 'getUser', getUser => getUser({ id: 'me' }))
class DashboardMyProfilePageContainer extends Component {
  static propTypes = {
    user: userPropType,
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return <Redirect to="/" />;
    }
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

export default DashboardMyProfilePageContainer;
