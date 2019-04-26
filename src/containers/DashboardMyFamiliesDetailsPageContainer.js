import React, { Component } from 'react';
import { object, func } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { connect } from 'react-redux';

import { prefetch, query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import { FAMILY_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import { FAMILY_STATUS_ACTIVE, NOTE_COMMENTABLE_TYPE_CLIENT } from 'sly/constants/familyDetails';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardMyFamiliesDetailsPage from 'sly/components/pages/DashboardMyFamiliesDetailsPage';

@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))

@query('updateClient', 'updateClient')

@query('createNote', 'createNote')

export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    client: clientPropType,
    match: object,
    status: object,
    history: object,
    updateClient: func,
    createNote: func,
  };

  onRejectSuccess = (hide) => {
    const { history } = this.props;
    hide();
    history.push(FAMILY_DASHBOARD_FAMILIES_PATH);
  };

  onUnPause = (notifyInfo, notifyError) => {
    const { setStatusToActive } = this;

    return setStatusToActive()
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

  onAddNote = (data, notifyError, notifyInfo, hideModal) => {
    const { setStatusToActive } = this;
    const { createNote, client } = this.props;
    const { id } = client;
    const { note } = data;
    const payload = {
      type: 'Note',
      attributes: {
        commentableID: id,
        commentableType: NOTE_COMMENTABLE_TYPE_CLIENT,
        body: note,
      },
    };
    const notePromise = () => createNote(payload);

    return setStatusToActive()
      .then(notePromise)
      .then(() => {
        hideModal();
        notifyInfo('Note successfully added');
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to add note. Please try again.');
      });
  };

  setStatusToActive = () => {
    const { updateClient, client, status } = this.props;
    const { id } = client;
    const { result: rawClient } = status.client;
    const newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.status', 'attributes.stage']))
      .set('attributes.status', FAMILY_STATUS_ACTIVE)
      .value();

    return updateClient({ id }, newClient);
  };

  render() {
    const { onRejectSuccess, onUnPause, onAddNote } = this;
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
                onRejectSuccess={() => onRejectSuccess(hide)}
                onUnPause={() => onUnPause(notifyInfo, notifyError)}
                onAddNote={onAddNote}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
