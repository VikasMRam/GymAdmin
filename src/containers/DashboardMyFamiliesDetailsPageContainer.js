import React, { Component } from 'react';
import { object, func } from 'prop-types';
import produce from 'immer';

import { prefetch, query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import { uuidAux as uuidAuxProps } from 'sly/propTypes/user';
import { FAMILY_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import { FAMILY_STATUS_ACTIVE } from 'sly/constants/familyDetails';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardMyFamiliesDetailsPage from 'sly/components/pages/DashboardMyFamiliesDetailsPage';

@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))

@prefetch('uuidAux', 'getUuidAux', (req, { client }) => req({
  id: client && client.uuidAux && client.uuidAux.id,
}))

@query('updateClient', 'updateClient')

export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    client: clientPropType,
    match: object,
    status: object,
    history: object,
    updateClient: func,
    uuidAux: uuidAuxProps,
  };

  onRejectSuccess = (hide) => {
    const { history } = this.props;
    hide();
    history.push(FAMILY_DASHBOARD_FAMILIES_PATH);
  };

  onUnPause = (notifyInfo, notifyError) => {
    const { updateClient, client, status } = this.props;
    const { id } = client;
    const { result: rawClient } = status.client;

    return updateClient({ id }, produce(rawClient, (draft) => {
      draft.attributes.status = FAMILY_STATUS_ACTIVE;
    }))
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
    const { client, match, status, uuidAux } = this.props;
    const { result: rawClient, meta } = status.client;
console.log(uuidAux);
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
                onRejectSuccess={() => onRejectSuccess(hide)}
                onUnPause={() => onUnPause(notifyInfo, notifyError)}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
