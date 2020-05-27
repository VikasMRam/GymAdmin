import React, { Component } from 'react';
import { object, arrayOf, func } from 'prop-types';
import { Redirect, generatePath, matchPath } from 'react-router';
import { connect } from 'react-redux';
import get from 'lodash/get';
import diff from 'deep-diff';

import { getRelationship, prefetch, query, withUser } from 'sly/web/services/api';
import userPropType from 'sly/web/propTypes/user';
import communityPropType from 'sly/web/propTypes/community';
import {
  DASHBOARD_COMMUNITIES_DETAIL_PATH,
  SUMMARY,
  PROFILE,
  DASHBOARD_COMMUNITIES_DETAIL_EDIT_PATH, ADMIN_DASHBOARD_AGENT_DETAILS_PATH,
} from 'sly/web/constants/dashboardAppPaths';
import DashboardCommunityDetailsPage from 'sly/web/components/pages/DashboardCommunityDetailsPage';
import withBreakpoint from 'sly/web/components/helpers/breakpoint';
import withNotification from 'sly/web/controllers/withNotification';
import withModal from 'sly/web/controllers/withModal';
import { EditContext } from 'sly/web/services/edits';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/web/constants/roles';

const editEntities = require('sly/web/services/edits/constants');

@withNotification
@withModal
@withUser
@withBreakpoint
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))
@connect((state, { status }) => ({
  suggestedEdits: (getRelationship(state, status.community.result, 'suggestedEdits') || []),
}))
export default class DashboardCommunityDetailsPageContainer extends Component {
  static propTypes = {
    user: userPropType,
    community: communityPropType,
    communities: arrayOf(communityPropType),
    match: object,
    location: object,
    status: object,
    history: object,
    breakpoint: object,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    suggestedEdits: arrayOf(object),
  };

  currentEdit(config) {


    const { suggestedEdits, user } = this.props;

    if (!suggestedEdits.length || suggestedEdits[0].attributes.status !== 'Initialized') {
      return null;
    }

    return this.processEdit(suggestedEdits[0], config, user);

  }

  selectEdit(config) {
    const { suggestedEdits, user, location } = this.props;
    // eslint-disable-next-line no-bitwise
    const editMatch = matchPath(location.pathname, {
      path: DASHBOARD_COMMUNITIES_DETAIL_EDIT_PATH,
      exact: false,
      strict: true,
    });


    // if we have an editId param, the show that migration,
    // otherwise the last one of the user, so this works for
    // the community form and for the view in the edits tab
    let filteredEdits;
    if (!userIs(user, PLATFORM_ADMIN_ROLE)) {
      const filter = editMatch?.params?.editId
        ? edit => edit.id === editMatch.params.editId
        : edit => edit.relationships.createdBy.data.id === user.id;
      filteredEdits = suggestedEdits.filter(filter);
    } else {
      filteredEdits = suggestedEdits;
    }

    if (!filteredEdits.length) {
      return null;
    }

    return this.processEdit(suggestedEdits[0], config, user);
  }

  processEdit(selectedEdit, config, user) {
    const isPendingForAdmin = userIs(user, PLATFORM_ADMIN_ROLE) && selectedEdit.attributes.status === 'Initialized';

    // we don't want array inspection, so we bail
    const prefilter = path => Array
      .isArray(get(selectedEdit.attributes?.change, path));

    const changes = diff(
      selectedEdit.attributes?.preChange,
      selectedEdit.attributes?.change,
      prefilter,
  ) || [];

    // the values of the diff (lhs, rhs) are used when viewing the
    // edit in the edits tab, the keys of the diff (path in changes[path])
    // are used to know where there is a change across all the forms
    return {
      id: selectedEdit.id,
      ...selectedEdit.attributes,
      isPendingForAdmin,
      changes: changes.reduce((changes, change) => {
        const path = change.path.join('.');
        if (config.blacklist.includes(path)) {
          return changes;
        }
        changes[path] = {
          ...change,
          path,
        };
        return changes;
      }, {}),
    };
  }

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
      suggestedEdits,
    } = this.props;

    const currentTab = match.params.tab || SUMMARY;
    if (breakpoint && community && currentTab === SUMMARY && breakpoint.atLeastLaptop()) {
      const activityPath = generatePath(DASHBOARD_COMMUNITIES_DETAIL_PATH, {
        id: community.id,
        tab: PROFILE,
      });
      return <Redirect to={activityPath} />;
    }

    const entityType = 'community';
    const editConfig = editEntities[entityType];
    const currentEdit = this.currentEdit(editConfig);
    const selectedEdit = this.selectEdit(editConfig);
    const editContext = {
      suggestedEdits,
      entityType,
      currentEdit,
      selectedEdit,
      editConfig,
    };

    const { hasFinished: communityHasFinished } = status.community;
    // since it's using conditional prefetch, in initial stage communities key won't be there
    return (
      <EditContext.Provider value={editContext}>
        <DashboardCommunityDetailsPage
          notifyError={notifyError}
          notifyInfo={notifyInfo}
          community={community}
          currentEdit={currentEdit}
          suggestedEdits={suggestedEdits}
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
      </EditContext.Provider>
    );
  }
}
