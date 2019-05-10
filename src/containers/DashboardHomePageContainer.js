import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';

import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import { CUSTOMER_ROLE, PROVIDER_ROLE, AGENT_ROLE } from 'sly/constants/roles';
import { FAMILY_DASHBOARD_FAVORITES_PATH, FAMILY_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import Role from 'sly/components/common/Role';

const DashboardHomePageContainer = () => (
  <Fragment>
    <Role is={CUSTOMER_ROLE}>
      <Redirect to={FAMILY_DASHBOARD_FAVORITES_PATH} />
    </Role>
    <Role is={PROVIDER_ROLE}>
      <RefreshRedirect to="/mydashboard" />
    </Role>
    <Role is={AGENT_ROLE}>
      <Redirect to={FAMILY_DASHBOARD_FAMILIES_PATH} />
    </Role>
  </Fragment>
);

export default DashboardHomePageContainer;
