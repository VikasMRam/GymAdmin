import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardProfileUserDetailsFormContainer from 'sly/containers/DashboardProfileUserDetailsFormContainer';
import DashboardAddPasswordFormContainer from 'sly/containers/DashboardAddPasswordFormContainer';
import DashboardChangePasswordFormContainer from 'sly/containers/DashboardChangePasswordFormContainer';
import userPropType from 'sly/propTypes/user';

const ProfileUserDetailsFormWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const DashboardMyProfilePage = ({ user }) => {
  const { hasPasswordSet } = user;
  return (
    <DashboardPageTemplate activeMenuItem="Profile">
      <ProfileUserDetailsFormWrapper>
        <DashboardProfileUserDetailsFormContainer />
      </ProfileUserDetailsFormWrapper>
      {hasPasswordSet ? <DashboardChangePasswordFormContainer /> : <DashboardAddPasswordFormContainer />}
    </DashboardPageTemplate>
  );
};

DashboardMyProfilePage.propTypes = {
  user: userPropType,
};

export default DashboardMyProfilePage;
