import React, { Component } from 'react';
import { object, func, arrayOf, bool } from 'prop-types';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { Redirect, generatePath } from 'react-router';
import { parse } from 'query-string';

import { withUser, prefetch, query, invalidateRequests, connectApi } from 'sly/web/services/api';
import userPropType from 'sly/common/propTypes/user';
import conversationPropType from 'sly/common/propTypes/conversation/conversation';
import clientPropType from 'sly/common/propTypes/client';
import notePropType from 'sly/common/propTypes/note';
import {
  AGENT_DASHBOARD_FAMILIES_PATH,
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  FAMILY_DETAILS,
  SUMMARY,
  MESSAGES, ACTIVITY,
} from 'sly/web/constants/dashboardAppPaths';
import { FAMILY_STAGE_ORDERED } from 'sly/web/constants/familyDetails';
import { NOTE_COMMENTABLE_TYPE_CLIENT } from 'sly/web/constants/notes';
import { NOTE_RESOURCE_TYPE } from 'sly/web/constants/resourceTypes';
import SlyEvent from 'sly/web/services/helpers/events';
import withBreakpoint from 'sly/web/components/helpers/breakpoint';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';
import AcceptAndContactFamilyContainer from 'sly/web/containers/AcceptAndContactFamilyContainer';
import DashboardMyFamiliesDetailsPage from 'sly/web/components/pages/DashboardMyFamiliesDetailsPage';
import withNotification from 'sly/web/controllers/withNotification';
import withModal from 'sly/web/controllers/withModal';
import { getDetailedPaginationData } from 'sly/web/services/helpers/pagination';

const mapStateToProps = (state, { conversations }) => ({
  selectedConversation: conversations && conversations.length === 1 ? conversations[0] : null,
});

@withNotification
@withModal
@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))
@prefetch('notes', 'getNotes', (req, { match, location }) => req({
  ...parse(location.search),
  'filter[client]': match.params.id,
}))
@query('updateClient', 'updateClient')
@query('createNote', 'createNote')
@query('updateNote', 'updateNote')
@query('getClients', 'getClients')
@withBreakpoint
@withUser

@connectApi(mapStateToProps, {
  invalidateNotes:
    () => invalidateRequests('getNotes'),
  invalidateClients:
    () => invalidateRequests('getClients'),
  invalidateConversations:
    () => invalidateRequests('getConversations'),
})


export default class DashboardMyFamiliesDetailsPageContainer extends Component {
  static propTypes = {
    user: userPropType.isRequired,
    client: clientPropType,
    clients: arrayOf(clientPropType),
    selectedConversation: conversationPropType,
    match: object,
    status: object,
    history: object,
    breakpoint: object,
    updateClient: func.isRequired,
    createNote: func.isRequired,
    updateNote: func.isRequired,
    getClients: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    isModalOpen: bool.isRequired,
    notes: arrayOf(notePropType),
    invalidateClients: func,
    invalidateConversations: func,
    invalidateNotes: func,
  };

  state = {
    selectedConversation: null,
    conversationsList: null,
    clientsWithSameContacts: null,
    isEditStatusDetailsMode: false,
  };

  componentDidUpdate() {
    if (!this.checkDuplicatesInProgress && this.props.client && this.state.clientsWithSameContacts === null) {
      const { client, getClients } = this.props;
      const params = {
        exp: 'or',
        'filter[email]': client.clientInfo.email,
        'filter[phone]': client.clientInfo.phoneNumber,
      };
      this.checkDuplicatesInProgress = true;
      getClients(params)
        .then(resp => normJsonApi(resp))
        .then((data) => {
          this.setState({ clientsWithSameContacts: data });
          this.checkDuplicatesInProgress = false;
        });
    }
  }

  onRejectSuccess = (hide) => {
    const { history } = this.props;
    hide();
    history.push(generatePath(AGENT_DASHBOARD_FAMILIES_PATH));
  };

  onAddNote = (data, notifyError, notifyInfo, hideModal) => {
    const {
      createNote,
      client,
      invalidateClients,
      invalidateNotes,
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

    return notePromise()
      .then(invalidateNotes)
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
      updateNote,
      invalidateClients,
      status,
      invalidateNotes,
    } = this.props;
    const rawNotes = status.notes.result;
    const { id } = note;
    const oldNote = rawNotes.find(n => n.id === id);
    const { note: newNoteBody } = data;
    const payload = immutable.wrap(pick(oldNote, ['id', 'type', 'attributes.body']))
      .set('attributes.body', newNoteBody)
      .value();

    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'edit-note',
      label: 'submit',
      value: id,
    });
    const notePromise = () => updateNote({ id }, payload);

    return notePromise()
      // .then(invalidateNotes)
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
    const { client, status, updateClient, invalidateConversations } = this.props;
    const { result: rawClient } = status.client;
    const { id } = client;
    const [contactStatus] = FAMILY_STAGE_ORDERED.Prospects;
    const newClient = immutable.wrap(pick(rawClient, ['id', 'type', 'attributes.stage']))
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
            refetchConversations={invalidateConversations}
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

  refetchClient = () => {
    const { status } = this.props;
    status.client.refetch();
  }

  static getDerivedStateFromProps(props, state) {
    const selectedConversation = state.selectedConversation || props.selectedConversation;
    return {
      ...state,
      selectedConversation,
    };
  }

  toggleEditStatusDetailsMode = () => {
    const { isEditStatusDetailsMode } = this.state;
    this.setState({
      isEditStatusDetailsMode: !isEditStatusDetailsMode,
    });
  };

  render() {
    const {
      onRejectSuccess, onAddNote, onEditNote,
    } = this;

    const {
      client,
      match,
      status,
      location,
      user,
      breakpoint,
      notes,
      notifyInfo,
      notifyError,
      showModal,
      hideModal,
      isModalOpen,
    } = this.props;

    const { selectedConversation, clientsWithSameContacts, isEditStatusDetailsMode } = this.state;

    const currentTab = match.params.tab || SUMMARY;
    if (breakpoint && client && currentTab === SUMMARY && breakpoint.atLeastLaptop()) {
      const activityPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, {
        id: client.id,
        tab: ACTIVITY,
      });
      return <Redirect to={activityPath} />;
    }

    // const notesPagination = getDetailedPaginationData(status.communities, 'communities')
    const { result: rawClient, meta } = status.client;
    const { hasFinished: clientHasFinished } = status.client;
    const { hasFinished: userHasFinished } = status.user;
    console.log('loading', clientHasFinished, status.client);
    // since it's using conditional prefetch, in initial stage clients key won't be there
    return (
      <DashboardMyFamiliesDetailsPage
        notifyError={notifyError}
        notifyInfo={notifyInfo}
        clients={clientsWithSameContacts || []}
        requestStatus={status}
        client={client}
        rawClient={rawClient}
        currentTab={match.params.tab || SUMMARY}
        showModal={showModal}
        hideModal={hideModal}
        isModalOpen={isModalOpen}
        meta={meta}
        onRejectSuccess={() => onRejectSuccess(hideModal)}
        refetchClient={this.refetchClient}
        refetchNotes={status.notes.refetch}
        onAddNote={onAddNote}
        onEditNote={onEditNote}
        notes={notes || []}
        notesPagination={getDetailedPaginationData(status.notes, 'notes')}
        noteIsLoading={!status.notes.hasFinished}
        basePath={location.pathname}
        isLoading={!clientHasFinished || !userHasFinished || !client}
        goToFamilyDetails={this.goToFamilyDetails}
        goToMessagesTab={this.goToMessagesTab}
        refetchConversations={this.refetchConversations}
        user={user || {}}
        conversation={selectedConversation}
        setSelectedConversation={this.setSelectedConversation}
        onAcceptClick={() => this.handleAcceptClick(showModal, hideModal, notifyError)}
        onEditStatusDetailsClick={this.toggleEditStatusDetailsMode}
        onStatusChange={this.toggleEditStatusDetailsMode}
        isEditStatusDetailsMode={isEditStatusDetailsMode}
      />
    );
  }
}
