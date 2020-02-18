import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import { Redirect, generatePath } from 'react-router';

import { prefetch, withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import communityPropType from 'sly/propTypes/community';
import {
  ADMIN_DASHBOARD_COMMUNITIES_DETAIL_PATH,
  SUMMARY,
  PROFILE,
} from 'sly/constants/dashboardAppPaths';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardCommunitiesDetailsPage from 'sly/components/pages/DashboardCommunitiesDetailsPage';
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
    match: object,
    status: object,
    history: object,
    breakpoint: object,
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
      <NotificationController>
        {({ notifyError, notifyInfo }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardCommunitiesDetailsPage
                notifyError={notifyError}
                notifyInfo={notifyInfo}
                community={community}
                currentTab={match.params.tab || SUMMARY}
                showModal={show}
                hideModal={hide}
                onRejectSuccess={() => onRejectSuccess(hide)}
                onAddNote={onAddNote}
                onEditNote={onEditNote}
                communityIsLoading={!communityHasFinished}
                goToFamilyDetails={this.goToFamilyDetails}
                goToMessagesTab={this.goToMessagesTab}
                refetchConversations={this.refetchConversations}
                user={user}
                setSelectedConversation={this.setSelectedConversation}
                onAcceptClick={() => this.handleAcceptClick(show, hide, notifyError)}
                onEditStatusDetailsClick={this.toggleEditStatusDetailsMode}
                onStatusChange={this.toggleEditStatusDetailsMode}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
