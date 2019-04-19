import React, { Component } from 'react';
import { object } from 'prop-types';

import { prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardMyFamiliesDetailsPage from 'sly/components/pages/DashboardMyFamiliesDetailsPage';

@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    client: clientPropType,
    match: object,
    status: object,
  };

  render() {
    const { client, match, status } = this.props;
    const { result: rawClient, meta } = status.client;

    return (
      <NotificationController>
        {({ notifyError, notifyInfo }) => (
          <ModalController>
            {({
              show,
              hide,
            }) => (
              <DashboardMyFamiliesDetailsPage
                notifyError={notifyError}
                notifyInfo={notifyInfo}
                client={client}
                rawClient={rawClient}
                currentTab={match.params.tab}
                showModal={show}
                hideModal={hide}
                meta={meta}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}