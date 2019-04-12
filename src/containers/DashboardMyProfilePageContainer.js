import React, { Component } from 'react';
import { object } from 'prop-types';
import { Redirect } from 'react-router-dom';

import DashboardMyProfilePage from 'sly/components/pages/DashboardMyProfilePage';
import { prefetch } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';

const incompleteInfoWarning = 'Please enter the incomplete fields below to complete your account.';

@prefetch('user', 'getUser', getUser => getUser({ id: 'me' }))
class DashboardMyProfilePageContainer extends Component {
  static propTypes = {
    user: userPropType,
    api: object,
  }

  render() {
    const { user, api } = this.props;
    const { getUser } = api;
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
      <DashboardMyProfilePage user={user} getUser={getUser} warningMessage={warningMessage} />
    );
  }
}

export default DashboardMyProfilePageContainer;
