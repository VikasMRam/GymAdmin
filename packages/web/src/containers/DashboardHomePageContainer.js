import React from 'react';
import { generatePath } from 'react-router';
import { Redirect } from 'react-router-dom';

import RefreshRedirect from 'sly/web/components/common/RefreshRedirect';
import { CUSTOMER_ROLE, PROVIDER_OD_ROLE, AGENT_ND_ROLE } from 'sly/common/constants/roles';
import { FAMILY_DASHBOARD_FAVORITES_PATH, AGENT_DASHBOARD_FAMILIES_PATH } from 'sly/web/constants/dashboardAppPaths';
import Role from 'sly/web/components/common/Role';

const DashboardHomePageContainer = () => (
  <>
    <Role is={CUSTOMER_ROLE}>
      <Redirect to={FAMILY_DASHBOARD_FAVORITES_PATH} />
    </Role>
    <Role is={PROVIDER_OD_ROLE}>
      <RefreshRedirect to="/mydashboard" />
    </Role>
    <Role is={AGENT_ND_ROLE}>
      <Redirect to={generatePath(AGENT_DASHBOARD_FAMILIES_PATH)} />
    </Role>
  </>
);

export default DashboardHomePageContainer;
