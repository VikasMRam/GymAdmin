import React from 'react';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardProfileUserDetailsFormContainer from 'sly/containers/DashboardProfileUserDetailsFormContainer';
import DashboardAddPasswordFormContainer from 'sly/containers/DashboardAddPasswordFormContainer';

const DashboardMyProfilePage = () => (
  <DashboardPageTemplate>
    <DashboardProfileUserDetailsFormContainer />
    <DashboardAddPasswordFormContainer />
  </DashboardPageTemplate>
);

export default DashboardMyProfilePage;
