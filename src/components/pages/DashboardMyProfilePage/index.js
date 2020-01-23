import React from 'react';
import { string } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import PartnerAgentProfileFormController from 'sly/containers/PartnerAgentProfileFormController';
import BannerNotificationController from 'sly/controllers/BannerNotificationController';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import pad from 'sly/components/helpers/pad';

const PaddedBannerNotification = pad(BannerNotification);

const DashboardMyProfilePage = ({ title, warningMessage, agentId }) => {
  return (
    <DashboardPageTemplate activeMenuItem={title}>
      <BannerNotificationController>
        {({ messages, notifySuccess }) => (
          <>
            {messages.map(message => <PaddedBannerNotification key={message.id}>{message.content}</PaddedBannerNotification>)}
            {warningMessage && <PaddedBannerNotification palette="warning">{warningMessage}</PaddedBannerNotification>}
            <PartnerAgentProfileFormController title={title} agentId={agentId} notifySuccess={notifySuccess} />
          </>
        )}
      </BannerNotificationController>
    </DashboardPageTemplate>
  );
};

DashboardMyProfilePage.propTypes = {
  title: string.isRequired,
  warningMessage: string,
  agentId: string,
};

export default DashboardMyProfilePage;
