import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardProfileUserDetailsFormContainer from 'sly/containers/DashboardProfileUserDetailsFormContainer';
import DashboardAddPasswordFormContainer from 'sly/containers/DashboardAddPasswordFormContainer';
import DashboardChangePasswordFormContainer from 'sly/containers/DashboardChangePasswordFormContainer';
import userPropType from 'sly/propTypes/user';
import BannerNotificationController from 'sly/controllers/BannerNotificationController';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import pad from 'sly/components/helpers/pad';

const PaddedBannerNotification = pad(BannerNotification);

const ProfileUserDetailsFormWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const DashboardMyProfilePage = ({ user, warningMessage }) => {
  const { hasPasswordSet } = user;
  return (
    <DashboardPageTemplate activeMenuItem="My Profile">
      <BannerNotificationController>
        {({ messages, notifySuccess }) => (
          <>
            {messages.map(message => <PaddedBannerNotification key={message.id}>{message.content}</PaddedBannerNotification>)}
            {warningMessage && <PaddedBannerNotification palette="warning">{warningMessage}</PaddedBannerNotification>}
            <ProfileUserDetailsFormWrapper>
              <DashboardProfileUserDetailsFormContainer notifySuccess={notifySuccess} />
            </ProfileUserDetailsFormWrapper>
            {hasPasswordSet ? <DashboardChangePasswordFormContainer notifySuccess={notifySuccess} /> : <DashboardAddPasswordFormContainer notifySuccess={notifySuccess} />}
          </>
        )}
      </BannerNotificationController>
    </DashboardPageTemplate>
  );
};

DashboardMyProfilePage.propTypes = {
  user: userPropType,
  warningMessage: string,
};

export default DashboardMyProfilePage;
