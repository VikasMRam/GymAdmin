import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { Redirect, generatePath } from 'react-router';

import { withUser, prefetch, query, invalidateRequests } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import clientPropType from 'sly/propTypes/client';
import notePropType from 'sly/propTypes/note';
import {
  AGENT_DASHBOARD_FAMILIES_PATH,
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  FAMILY_DETAILS,
  SUMMARY,
  MESSAGES, ACTIVITY,
} from 'sly/constants/dashboardAppPaths';
import { NOTE_COMMENTABLE_TYPE_CLIENT } from 'sly/constants/notes';
import { NOTE_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardMyFamiliesDetailsPage from 'sly/components/pages/DashboardMyFamiliesDetailsPage';
import SlyEvent from 'sly/services/helpers/events';
import { CONVERSATION_PARTICIPANT_TYPE_CLIENT } from 'sly/constants/conversations';
import withBreakpoint from 'sly/components/helpers/breakpoint';

@withUser

@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))

@prefetch('notes', 'getNotes', (req, { match }) => req({
  'filter[commentable_id]': match.params.id,
}))

@query('updateClient', 'updateClient')

@query('createNote', 'createNote')

@query('updateNote', 'updateNote')

@connect(null, (dispatch, { api }) => ({
  invalidateClients: () => dispatch(invalidateRequests(api.getClients)),
}))

@prefetch('clientConversations', 'getConversations', (req, { match }) => req({
  'filter[client]': match.params.id,
}))

@prefetch('conversations', 'getConversations', (req, { match }) => req({
  'filter[participant_id]': match.params.id,
  'filter[participant_type]': CONVERSATION_PARTICIPANT_TYPE_CLIENT,
}))

@withBreakpoint

export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    user: userPropType.isRequired,
    client: clientPropType,
    conversations: arrayOf(conversationPropType),
    clientConversations: arrayOf(conversationPropType),
    match: object,
    status: object,
    history: object,
    breakpoint: object,
    updateClient: func.isRequired,
    createNote: func.isRequired,
    updateNote: func.isRequired,
    notes: arrayOf(notePropType),
    invalidateClients: func,
  };

  state = {
    selectedConversation: null,
  }

  onRejectSuccess = (hide) => {
    const { history } = this.props;
    hide();
    history.push(generatePath(AGENT_DASHBOARD_FAMILIES_PATH));
  };

  onAddNote = (data, notifyError, notifyInfo, hideModal) => {
    const {
      createNote, client, status, invalidateClients,
    } = this.props;
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

    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'add-note',
      label: 'submit',
      value: '',
    });
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
        SlyEvent.getInstance().sendEvent({
          category: 'fdetails',
          action: 'add-note',
          label: 'error',
          value: '',
        });
      });
  };

  onEditNote = (data, note, notifyError, notifyInfo, hideModal) => {
    const {
      updateNote, status, invalidateClients,
    } = this.props;
    const { result: rawNotes } = status.notes;
    const { id } = note;
    const oldNote = rawNotes.find(n => n.id === id);
    const { note: newNoteBody } = data;
    const payload = immutable(pick(oldNote, ['id', 'type', 'attributes.body']))
      .set('attributes.body', newNoteBody)
      .value();

    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'edit-note',
      label: 'submit',
      value: id,
    });
    const notePromise = () => updateNote({ id }, payload);
    const getNotesPromise = () => status.notes.refetch();

    return notePromise()
      .then(getNotesPromise)
      .then(invalidateClients)
      .then(() => {
        hideModal();
        notifyInfo('Note successfully edited');
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to edit note. Please try again.');
        SlyEvent.getInstance().sendEvent({
          category: 'fdetails',
          action: 'edit-note',
          label: 'error',
          value: id,
        });
      });
  };

  getHasConversationFinished = () => {
    const { status } = this.props;
    const { hasFinished: userHasFinished } = status.user;
    const { hasFinished: conversationsHasFinished } = status.conversations;
    const { hasFinished: clientConversationsHasFinished } = status.clientConversations;
    const { hasFinished: clientHasFinished } = status.client;

    return userHasFinished && conversationsHasFinished && clientConversationsHasFinished && clientHasFinished;
  };

  goToFamilyDetails = () => {
    const { history, client } = this.props;
    const { id } = client;
    const path = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: FAMILY_DETAILS });
    history.push(path);
  };

  goToMessagesTab = () => {
    const { history, client } = this.props;
    const { id } = client;
    const path = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: MESSAGES });
    history.push(path);
  };

  refetchConversations = () => {
    const { status } = this.props;
    status.conversations.refetch();
    status.clientConversations.refetch();
  };

  onMessagesTabConversationClick = (conversation) => {
    this.setState({ selectedConversation: conversation });
  }

  render() {
    const {
      onRejectSuccess, onAddNote, onEditNote,
    } = this;

    const {
      client,
      match,
      status,
      notes,
      user,
      conversations,
      clientConversations,
      breakpoint,
    } = this.props;

    const { selectedConversation } = this.state;

    const currentTab = match.params.tab || SUMMARY;
    if (breakpoint && client && currentTab === SUMMARY && breakpoint.atLeastLaptop()) {
      const activityPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, {
        id: client.id,
        tab: ACTIVITY,
      });
      return <Redirect to={activityPath} />;
    }

    const { result: rawClient, meta } = status.client;
    const { hasFinished: clientHasFinished } = status.client;
    const { hasFinished: noteHasFinished } = status.notes;
    const hasConversationFinished = this.getHasConversationFinished();
    let allConversions = [];
    if (hasConversationFinished) {
      allConversions = conversations.concat(clientConversations);
    }
    return (
      <NotificationController>
        {({ notifyError, notifyInfo }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardMyFamiliesDetailsPage
                notifyError={notifyError}
                notifyInfo={notifyInfo}
                client={client}
                rawClient={rawClient}
                currentTab={match.params.tab || SUMMARY}
                showModal={show}
                hideModal={hide}
                meta={meta}
                onRejectSuccess={() => onRejectSuccess(hide)}
                refetchClient={status.client.refetch}
                refetchNotes={status.notes.refetch}
                onAddNote={onAddNote}
                onEditNote={onEditNote}
                notes={notes}
                noteIsLoading={!noteHasFinished}
                clientIsLoading={!clientHasFinished}
                goToFamilyDetails={this.goToFamilyDetails}
                goToMessagesTab={this.goToMessagesTab}
                refetchConversations={this.refetchConversations}
                user={user}
                conversation={selectedConversation}
                conversations={allConversions}
                onMessagesTabConversationClick={this.onMessagesTabConversationClick}
                hasConversationFinished={hasConversationFinished}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
