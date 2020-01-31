import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import { Redirect, generatePath } from 'react-router';

import { prefetch, withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import communityPropType from 'sly/propTypes/community';
import notePropType from 'sly/propTypes/note';
import {
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  SUMMARY,
  MESSAGES, ACTIVITY,
} from 'sly/constants/dashboardAppPaths';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardCommunitiesDetailsPage from 'sly/components/pages/DashboardCommunitiesDetailsPage';
import { normJsonApi } from 'sly/services/helpers/jsonApi';
import withBreakpoint from 'sly/components/helpers/breakpoint';

@withUser
@withBreakpoint
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardCommunitiesDetailsPageContainer extends Component {
  static propTypes = {
    user: userPropType.isRequired,
    community: communityPropType,
    communities: arrayOf(communityPropType),
    selectedConversation: conversationPropType,
    match: object,
    status: object,
    history: object,
    breakpoint: object,
    updateCommunity: func.isRequired,
    createNote: func.isRequired,
    updateNote: func.isRequired,
    getCommunities: func.isRequired,
    getNotes: func.isRequired,
    invalidateCommunities: func,
    invalidateConversations: func,
  };

  state = {
    selectedConversation: null,
    communitiesWithSameContacts: null,
    isEditStatusDetailsMode: false,
  };

  getNotes = () => {
    const { community, getNotes } = this.props;
    const params = {
      'filter[commentable_id]': community.id,
    };
    return getNotes(params)
      .then((data) => { this.setState({ rawNotes: data.body.data }); return data; })
      .then(resp => normJsonApi(resp))
      .then(data => this.setState({ notes: data }));
  };

  goToMessagesTab = () => {
    const { history, community } = this.props;
    const { id } = community;
    const path = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: MESSAGES });
    history.push(path);
  };

  render() {
    const {
      onRejectSuccess, onAddNote, onEditNote,
    } = this;

    const {
      community,
      match,
      status,
      user,
      breakpoint,
    } = this.props;

    const { selectedConversation, communitiesWithSameContacts, notes, isEditStatusDetailsMode } = this.state;

    const currentTab = match.params.tab || SUMMARY;
    if (breakpoint && community && currentTab === SUMMARY && breakpoint.atLeastLaptop()) {
      const activityPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, {
        id: community.id,
        tab: ACTIVITY,
      });
      return <Redirect to={activityPath} />;
    }

    const { result: rawCommunity, meta, refetch: refetchCommunity } = status.community;
    const { hasFinished: communityHasFinished } = status.community;
    // since it's using conditional prefetch, in initial stage communities key won't be there
    return (
      <NotificationController>
        {({ notifyError, notifyInfo }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardCommunitiesDetailsPage
                notifyError={notifyError}
                notifyInfo={notifyInfo}
                communities={communitiesWithSameContacts || []}
                community={community}
                rawCommunity={rawCommunity}
                currentTab={match.params.tab || SUMMARY}
                showModal={show}
                hideModal={hide}
                meta={meta}
                onRejectSuccess={() => onRejectSuccess(hide)}
                refetchCommunity={refetchCommunity}
                refetchNotes={this.getNotes}
                onAddNote={onAddNote}
                onEditNote={onEditNote}
                notes={notes || []}
                noteIsLoading={!notes}
                communityIsLoading={!communityHasFinished}
                goToFamilyDetails={this.goToFamilyDetails}
                goToMessagesTab={this.goToMessagesTab}
                refetchConversations={this.refetchConversations}
                user={user}
                conversation={selectedConversation}
                setSelectedConversation={this.setSelectedConversation}
                onAcceptClick={() => this.handleAcceptClick(show, hide, notifyError)}
                onEditStatusDetailsClick={this.toggleEditStatusDetailsMode}
                onStatusChange={this.toggleEditStatusDetailsMode}
                isEditStatusDetailsMode={isEditStatusDetailsMode}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
