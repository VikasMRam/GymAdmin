import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { connect } from 'react-redux';

import { prefetch, query, invalidateRequests } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import notePropType from 'sly/propTypes/note';
import { FAMILY_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import { FAMILY_STATUS_ACTIVE, NOTE_COMMENTABLE_TYPE_CLIENT } from 'sly/constants/familyDetails';
import { NOTE_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardMyFamiliesDetailsPage from 'sly/components/pages/DashboardMyFamiliesDetailsPage';

@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))

@prefetch('notes', 'getNotes', (req, { match }) => req({
  'filter[commentable_id]': match.params.id,
}))

@query('updateClient', 'updateClient')

@query('createNote', 'createNote')

@connect(null, (dispatch, { api }) => ({
  invalidateClients: () => dispatch(invalidateRequests(api.getClients)),
}))

export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    client: clientPropType,
    match: object,
    status: object,
    history: object,
    updateClient: func.isRequired,
    createNote: func.isRequired,
    notes: arrayOf(notePropType),
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
    const { createNote, client, status, invalidateClients } = this.props;
    const { id } = client;
    const { note } = data;
    const payload = {
      type: NOTE_RESOURCE_TYPE,
      attributes: {
        commentableID: id,
        commentableType: NOTE_COMMENTABLE_TYPE_CLIENT,
        body: note,
      },
    };
    const notePromise = () => createNote(payload);
    const getNotesPromise = () => status.notes.refetch();

    return notePromise()
      .then(getNotesPromise)
      .then(invalidateClients)
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
    const newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.status']))
      .set('attributes.status', FAMILY_STATUS_ACTIVE)
      .value();

    return updateClient({ id }, newClient);
  };

  render() {
    const { onRejectSuccess, onUnPause, onAddNote } = this;
    const {
      client, match, status, notes,
    } = this.props;
    const { result: rawClient, meta } = status.client;
    const { isLoading: clientIsLoading } = status.client;
    const { isLoading: noteIsLoading } = status.notes;

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
                refetchClient={status.client.refetch}
                refetchNotes={status.notes.refetch}
                onUnPause={() => onUnPause(notifyInfo, notifyError)}
                onAddNote={onAddNote}
                notes={notes}
                noteIsLoading={noteIsLoading}
                clientIsLoadig={clientIsLoading}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
