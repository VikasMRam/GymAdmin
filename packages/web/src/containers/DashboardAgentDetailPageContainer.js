import React, { Component } from 'react';
import { object, shape, arrayOf, func } from 'prop-types';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import DashboardAgentDetailPage from 'sly/web/components/pages/DashboardAgentDetailPage';
import { withUser, prefetch, query } from 'sly/web/services/api';
import userPropType from 'sly/web/propTypes/user';
import { adminAgentPropType } from 'sly/web/propTypes/agent';
import notePropType from 'sly/web/propTypes/note';
import SlyEvent from 'sly/web/services/helpers/events';
import { AGENT_DETAILS } from 'sly/web/constants/dashboardAppPaths';
import { NOTE_COMMENTABLE_TYPE_AGENT } from 'sly/web/constants/notes';
import { NOTE_RESOURCE_TYPE } from 'sly/web/constants/resourceTypes';
@withUser
@query('createNote', 'createNote')
@query('updateNote', 'updateNote')
@prefetch('agent', 'getAgent', (req, { match }) => {
  const agentId = match.params.id;
  return req({ id: agentId });
})
@prefetch('notes', 'getNotes', (req, { match }) => {
  const agentId = match.params.id;
  return req({ 'filter[agent]': agentId });
})
export default class DashboardAgentDetailPageContainer extends Component {
  static propTypes = {
    user: userPropType,
    agent: adminAgentPropType.isRequired,
    status: shape({
      user: object,
      agents: object,
    }),
    notes: arrayOf(notePropType),
    location: object,
    match: object,
    createNote: func.isRequired,
    updateNote: func.isRequired,
  };

  state = {
    selectedConversation: null,
  };

  onAddNote = (data, notifyError, notifyInfo, hideModal) => {
    const {
      createNote, agent, status,
    } = this.props;
    const { id } = agent;
    const { note } = data;
    const payload = {
      type: NOTE_RESOURCE_TYPE,
      attributes: {
        commentableID: id,
        commentableType: NOTE_COMMENTABLE_TYPE_AGENT,
        body: note,
      },
    };

    SlyEvent.getInstance().sendEvent({
      category: 'agentDetails',
      action: 'add-note',
      label: 'submit',
      value: '',
    });
    const notePromise = () => createNote(payload);
    const getNotesPromise = status.notes.refetch;

    return notePromise()
      .then(getNotesPromise)
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
          category: 'agentDetails',
          action: 'add-note',
          label: 'error',
          value: '',
        });
      });
  };

  onEditNote = (data, note, notifyError, notifyInfo, hideModal) => {
    const {
      updateNote, status,
    } = this.props;
    const { result: rawNotes  } = status.notes;
    const { id } = note;
    const oldNote = rawNotes.find(n => n.id === id);
    const { note: newNoteBody } = data;
    const payload = immutable.wrap(pick(oldNote, ['id', 'type', 'attributes.body']))
      .set('attributes.body', newNoteBody)
      .value();

    SlyEvent.getInstance().sendEvent({
      category: 'agentDetails',
      action: 'edit-note',
      label: 'submit',
      value: id,
    });
    const notePromise = () => updateNote({ id }, payload);
    const getNotesPromise = status.notes.refetch;

    return notePromise()
      .then(getNotesPromise)
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
          category: 'agentDetails',
          action: 'edit-note',
          label: 'error',
          value: id,
        });
      });
  };

  setSelectedConversation = (conversation) => {
    this.setState({ selectedConversation: conversation });
  };

  render() {
    const { user, agent, notes, status, location, match } = this.props;
    const { selectedConversation } = this.state;
    const { hasFinished: agentHasFinished, result: rawAgent  } = status.agent;
    const { hasFinished: userHasFinished } = status.user;
    const { hasFinished: notesHasFinished } = status.notes;
    const isLoading = !(userHasFinished && agentHasFinished && notesHasFinished);
    const currentTab = match.params.tab || AGENT_DETAILS;
    return (
      <DashboardAgentDetailPage
        user={user}
        agent={agent}
        notes={notes || []}
        onAddNote={this.onAddNote}
        onEditNote={this.onEditNote}
        rawAgent={rawAgent}
        isLoading={isLoading}
        currentTab={currentTab}
        location={location}
        selectedConversation={selectedConversation}
        setSelectedConversation={this.setSelectedConversation}
      />
    );
  }
}

