import React, { Component } from 'react';
import { bool, object } from 'prop-types';

import { withRouter } from 'react-router';
import SlyEvent from 'sly/web/services/helpers/events';
import { prefetch } from 'sly/web/services/api';
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
