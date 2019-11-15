import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { Redirect, generatePath } from 'react-router';
import { branch } from 'recompose';

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
import { FAMILY_STAGE_ORDERED } from 'sly/constants/familyDetails';
import { NOTE_COMMENTABLE_TYPE_CLIENT } from 'sly/constants/notes';
import { NOTE_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import SlyEvent from 'sly/services/helpers/events';
import withBreakpoint from 'sly/components/helpers/breakpoint';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import AcceptAndContactFamilyContainer from 'sly/containers/AcceptAndContactFamilyContainer';
import DashboardMyFamiliesDetailsPage from 'sly/components/pages/DashboardMyFamiliesDetailsPage';

const mapStateToProps = (state, { conversations }) => ({
  selectedConversation: conversations && conversations.length === 1 ? conversations[0] : null,
});

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

@prefetch('conversations', 'getConversations', (req, { match }) => req({
  'filter[client]': match.params.id,
}))

@branch(
  props => props.client,
  prefetch('clients', 'getClients',
    (perform, props) => perform({
      exp: 'or',
      'filter[email]': props.client.clientInfo.email,
      'filter[phone]': props.client.clientInfo.phoneNumber,
    }))
)

@connect(mapStateToProps)

@withBreakpoint

@withUser

export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    user: userPropType.isRequired,
    client: clientPropType,
    clients: arrayOf(clientPropType),
    conversations: arrayOf(conversationPropType),
    selectedConversation: conversationPropType,
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
    conversationsList: null,
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

  handleAcceptClick = (showModal, hideModal, notifyError) => {
    const { client, status, updateClient, conversations } = this.props;
    const [conversation] = conversations;
    const { result: rawClient } = status.client;
    const { id } = client;
    const [contactStatus] = FAMILY_STAGE_ORDERED.Prospects;
    const newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.stage']))
      .set('attributes.stage', contactStatus)
      .value();

    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: 'accept-lead',
      value: '',
    });
    return updateClient({ id }, newClient)
      .then(() => {
        showModal((
          <AcceptAndContactFamilyContainer
            client={client}
            onCancel={hideModal}
            refetchConversations={status.conversations.refetch}
            conversation={conversation}
          />), null, 'noPadding', false);
        status.client.refetch();
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to update stage. Please try again.');
      });
  };

  getHasConversationFinished = () => {
    const { status } = this.props;
    const { hasFinished: userHasFinished } = status.user;
    const { hasFinished: conversationsHasFinished } = status.conversations;
    const { hasFinished: clientHasFinished } = status.client;

    return userHasFinished && conversationsHasFinished && clientHasFinished;
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

  setSelectedConversation = (conversation) => {
    this.setState({ selectedConversation: conversation });
  };

  static getDerivedStateFromProps(props, state) {
    const { conversations } = props;
    const selectedConversation = state.selectedConversation || props.selectedConversation;
    return {
      ...state,
      selectedConversation,
      conversationsList: conversations,
    };
  }

  render() {
    const {
      onRejectSuccess, onAddNote, onEditNote,
    } = this;

    const {
      client,
      clients,
      match,
      status,
      notes,
      user,
      breakpoint,
    } = this.props;

    const { selectedConversation, conversationsList } = this.state;

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
    // since it's using conditional prefetch, in initial stage clients key won't be there
    const { hasFinished: clientsHasFinished } = status.clients || {};
    const { hasFinished: noteHasFinished } = status.notes;

    return (
      <NotificationController>
        {({ notifyError, notifyInfo }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardMyFamiliesDetailsPage
                notifyError={notifyError}
                notifyInfo={notifyInfo}
                clients={clients}
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
                clientIsLoading={!clientHasFinished || !clientsHasFinished}
                goToFamilyDetails={this.goToFamilyDetails}
                goToMessagesTab={this.goToMessagesTab}
                refetchConversations={status.conversations.refetch}
                user={user}
                conversation={selectedConversation}
                conversations={conversationsList}
                setSelectedConversation={this.setSelectedConversation}
                hasConversationFinished={this.getHasConversationFinished() && conversationsList !== null}
                onAcceptClick={() => this.handleAcceptClick(show, hide, notifyError)}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
