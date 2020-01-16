import React from 'react';
import { string } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import PartnerAgentAccountFormController from 'sly/containers/PartnerAgentAccountFormController';
import BannerNotificationController from 'sly/controllers/BannerNotificationController';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import pad from 'sly/components/helpers/pad';

const PaddedBannerNotification = pad(BannerNotification);

const DashboardMyAccountPage = ({ title, warningMessage }) => {
  return (
    <DashboardPageTemplate activeMenuItem={title}>
      <BannerNotificationController>
        {({ messages, notifySuccess }) => (
          <>
            {messages.map(message => <PaddedBannerNotification key={message.id}>{message.content}</PaddedBannerNotification>)}
            {warningMessage && <PaddedBannerNotification palette="warning">{warningMessage}</PaddedBannerNotification>}
            <PartnerAgentAccountFormController title={title} notifySuccess={notifySuccess} />
          </>
        )}
      </BannerNotificationController>
    </DashboardPageTemplate>
  );
};

DashboardMyAccountPage.propTypes = {
  title: string.isRequired,
  warningMessage: string,
};

export default DashboardMyAccountPage;
