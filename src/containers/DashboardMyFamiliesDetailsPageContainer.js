import React, { Component } from 'react';
import { object, func } from 'prop-types';
import produce from 'immer';

import { prefetch, query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import { FAMILY_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import { FAMILY_STATUS_ACTIVE } from 'sly/constants/familyDetails';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardMyFamiliesDetailsPage from 'sly/components/pages/DashboardMyFamiliesDetailsPage';

@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))

@query('updateClient', 'updateClient')

export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    client: clientPropType,
    match: object,
    status: object,
    history: object,
    updateClient: func,
  };

  onRejectSuccess = () => {
    const { history } = this.props;
    history.push(FAMILY_DASHBOARD_FAMILIES_PATH);
  };

  onUnPause = (notifyInfo, notifyError) => {
    const { updateClient, client, status } = this.props;
    const { id } = client;
    const { result: rawClient } = status.client;

    return updateClient({ id }, {
      data: produce(rawClient, (draft) => {
        draft.attributes.status = FAMILY_STATUS_ACTIVE;
      }),
    })
      .then(() => {
        notifyInfo('Family successfully unpaused');
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to unpause. Please try again.');
      });
  };

  render() {
    const { onRejectSuccess, onUnPause } = this;
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
                onRejectSuccess={onRejectSuccess}
                onUnPause={() => onUnPause(notifyInfo, notifyError)}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
