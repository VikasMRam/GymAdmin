import React, { Component } from 'react';
import { object } from 'prop-types';

import { withUser } from 'sly/services/newApi';
import DashboardMessageDetailsPage from 'sly/components/pages/DashboardMessageDetailsPage';
import { FAMILY_DASHBOARD_MESSAGES_PATH, AGENT_DASHBOARD_MESSAGES_PATH } from 'sly/constants/dashboardAppPaths';
import userPropType from 'sly/propTypes/user';
import { userIs } from 'sly/services/helpers/role';
import { CUSTOMER_ROLE, AGENT_ND_ROLE } from 'sly/constants/roles';

@withUser
export default class DashboardMessageDetailsPageContainer extends Component {
  static propTypes = {
    match: object,
    history: object,
    user: userPropType,
  };

  onBackClick = () => {
    const { user, history } = this.props;
    if (userIs(user, CUSTOMER_ROLE)) {
      history.push(FAMILY_DASHBOARD_MESSAGES_PATH);
    } else  if (userIs(user, AGENT_ND_ROLE)) {
      history.push(AGENT_DASHBOARD_MESSAGES_PATH);
    }
  }

  render() {
    const { match } = this.props;

    return (
      <DashboardMessageDetailsPage
        conversationId={match.params.id}
        onBackClick={this.onBackClick}
      />
    );
  }
}
