import React, { Component } from 'react';
import { object, arrayOf, func } from 'prop-types';
import { Redirect, generatePath } from 'react-router';

import { prefetch, withUser } from 'sly/services/api';
import userPropType from 'sly/propTypes/user';
import communityPropType from 'sly/propTypes/community';
import {
  ADMIN_DASHBOARD_COMMUNITIES_DETAIL_PATH,
  SUMMARY,
  PROFILE,
} from 'sly/constants/dashboardAppPaths';
import DashboardCommunitiesDetailsPage from 'sly/components/pages/DashboardCommunitiesDetailsPage';
import withBreakpoint from 'sly/components/helpers/breakpoint';
import withNotification from 'sly/controllers/withNotification';
import withModal from 'sly/controllers/withModal';

@withNotification
@withModal
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
    match: object,
    status: object,
    history: object,
    breakpoint: object,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
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
      notifyError,
      notifyInfo,
      hideModal,
      showModal,
    } = this.props;

    const currentTab = match.params.tab || SUMMARY;
    if (breakpoint && community && currentTab === SUMMARY && breakpoint.atLeastLaptop()) {
      const activityPath = generatePath(ADMIN_DASHBOARD_COMMUNITIES_DETAIL_PATH, {
        id: community.id,
        tab: PROFILE,
      });
      return <Redirect to={activityPath} />;
    }

    const { hasFinished: communityHasFinished } = status.community;
    // since it's using conditional prefetch, in initial stage communities key won't be there
    return (
      <DashboardCommunitiesDetailsPage
        notifyError={notifyError}
        notifyInfo={notifyInfo}
        community={community}
        currentTab={match.params.tab || SUMMARY}
        showModal={showModal}
        hideModal={hideModal}
        onRejectSuccess={() => onRejectSuccess(hideModal)}
        onAddNote={onAddNote}
        onEditNote={onEditNote}
        communityIsLoading={!communityHasFinished}
        goToFamilyDetails={this.goToFamilyDetails}
        goToMessagesTab={this.goToMessagesTab}
        refetchConversations={this.refetchConversations}
        user={user}
        setSelectedConversation={this.setSelectedConversation}
        onAcceptClick={() => this.handleAcceptClick(showModal, hideModal, notifyError)}
        onEditStatusDetailsClick={this.toggleEditStatusDetailsMode}
        onStatusChange={this.toggleEditStatusDetailsMode}
      />
    );
  }
}
