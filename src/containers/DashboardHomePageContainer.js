import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';

import { prefetch } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import { CUSTOMER_ROLE, PROVIDER_ROLE, AGENT_ROLE } from 'sly/constants/roles';
import { FAMILY_DASHBOARD_FAVORITES_PATH } from 'sly/constants/dashboardAppPaths';
import Role from 'sly/components/common/Role';

@prefetch('user', 'getUser', getUser => getUser({ id: 'me' }))

export default class DashboardHomePageContainer extends Component {
  static propTypes = {
    user: userPropType,
  };

  render() {
    const { user } = this.props;
    if (!user) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <Role is={CUSTOMER_ROLE}>
          <Redirect to={FAMILY_DASHBOARD_FAVORITES_PATH} />
        </Role>
        <Role is={PROVIDER_ROLE}>
          <Redirect to="/mydashboard" />
        </Role>
        <Role is={AGENT_ROLE}>
          <Redirect to="/mydashboard" />
        </Role>
      </Fragment>
    );
  }
}
