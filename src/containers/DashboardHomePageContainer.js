import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import { CUSTOMER_ROLE, PROVIDER_OD_ROLE, AGENT_ND_ROLE } from 'sly/constants/roles';
import { FAMILY_DASHBOARD_FAVORITES_PATH, AGENT_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import Role from 'sly/components/common/Role';

const DashboardHomePageContainer = () => (
  <Fragment>
    <Role is={CUSTOMER_ROLE}>
      <Redirect to={FAMILY_DASHBOARD_FAVORITES_PATH} />
    </Role>
    <Role is={PROVIDER_OD_ROLE}>
      <RefreshRedirect to="/mydashboard" />
    </Role>
    <Role is={AGENT_ND_ROLE}>
      <Redirect to={AGENT_DASHBOARD_FAMILIES_PATH} />
    </Role>
  </Fragment>
);

export default DashboardHomePageContainer;
