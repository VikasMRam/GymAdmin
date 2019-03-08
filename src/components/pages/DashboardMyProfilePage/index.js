import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardProfileUserDetailsFormContainer from 'sly/containers/DashboardProfileUserDetailsFormContainer';
import DashboardAddPasswordFormContainer from 'sly/containers/DashboardAddPasswordFormContainer';

const ProfileUserDetailsFormWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const DashboardMyProfilePage = () => (
  <DashboardPageTemplate>
    <ProfileUserDetailsFormWrapper>
      <DashboardProfileUserDetailsFormContainer />
    </ProfileUserDetailsFormWrapper>
    <DashboardAddPasswordFormContainer />
  </DashboardPageTemplate>
);

export default DashboardMyProfilePage;
