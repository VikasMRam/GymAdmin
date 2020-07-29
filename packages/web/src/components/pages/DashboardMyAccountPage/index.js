import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/common/components/themes';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import DashboardProfileUserDetailsFormContainer from 'sly/web/containers/DashboardProfileUserDetailsFormContainer';
import DashboardAddPasswordFormContainer from 'sly/web/containers/DashboardAddPasswordFormContainer';
import DashboardChangePasswordFormContainer from 'sly/web/containers/DashboardChangePasswordFormContainer';
import userPropType from 'sly/common/propTypes/user';
import BannerNotificationController from 'sly/web/controllers/BannerNotificationController';
import BannerNotification from 'sly/web/components/molecules/BannerNotification';
import pad from 'sly/web/components/helpers/pad';

const PaddedBannerNotification = pad(BannerNotification);

const ProfileUserDetailsFormWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const DashboardMyAccountPage = ({ user, title, warningMessage }) => {
  const { hasPasswordSet } = user;
  return (
    <DashboardPageTemplate activeMenuItem={title}>
      <BannerNotificationController>
        {({ messages, notifySuccess }) => (
          <>
            {messages.map(message => <PaddedBannerNotification key={message.id}>{message.content}</PaddedBannerNotification>)}
            {warningMessage && <PaddedBannerNotification palette="warning">{warningMessage}</PaddedBannerNotification>}
            <ProfileUserDetailsFormWrapper>
              <DashboardProfileUserDetailsFormContainer title={title} notifySuccess={notifySuccess} />
            </ProfileUserDetailsFormWrapper>
            {hasPasswordSet ? <DashboardChangePasswordFormContainer notifySuccess={notifySuccess} /> : <DashboardAddPasswordFormContainer notifySuccess={notifySuccess} />}
          </>
        )}
      </BannerNotificationController>
    </DashboardPageTemplate>
  );
};

DashboardMyAccountPage.propTypes = {
  user: userPropType,
  title: string.isRequired,
  warningMessage: string,
};

export default DashboardMyAccountPage;
