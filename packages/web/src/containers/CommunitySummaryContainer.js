import React, { Component } from 'react';
import { bool, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import SlyEvent from 'sly/web/services/helpers/events';
import { USER_SAVE_DELETE_STATUS } from 'sly/web/constants/userSave';
import { prefetch } from 'sly/web/services/api';
import { COMMUNITY_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import {
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS,
} from 'sly/web/constants/notifications';
import CommunitySummary from 'sly/web/components/organisms/CommunitySummary';

@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}))

export default class CommunitySummaryContainer extends Component {
  static typeHydrationId = 'CommunitySummaryContainer';
  static propTypes = {
    community: object.isRequired,
    isAdmin: bool,
    history: object,
    match: object,
  };

  sendEvent = (action, category) =>
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: this.props.community.id,
    });

  conciergeNumberClicked = () => {
    this.sendEvent('click', 'conciergeNumberClicked');
  };

  communityNumberClicked = () => {
    this.sendEvent('click', 'communityNumberClicked');
  };

  goToReviews = () => {
    this.sendEvent('click', 'viewReviews');
  };


  render() {
    const { community, isAdmin, className, match } = this.props;

    return (
      <CommunitySummary
        community={community}
        isAdmin={isAdmin}
        onConciergeNumberClicked={this.conciergeNumberClicked}
        onCommunityNumberClicked={this.communityNumberClicked}
        goToReviews={this.goToReviews}
        className={className}
        searchParams={match.params}

      />
    );
  }
}
