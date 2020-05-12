import React, { Component } from 'react';
import { withRouter } from 'react-router';

import EntityReviews from 'sly/web/components/organisms/EntityReviews';
import SlyEvent from 'sly/web/services/helpers/events';
import { community as communityPropType } from 'sly/web/propTypes/community';
import { prefetch } from 'sly/web/services/api';

@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}))
export default class CommunityReviewsContainer extends Component {
  static typeHydrationId = 'CommunityReviewsContainer';
  static propTypes = {
    community: communityPropType,
  };

  onReviewLinkClicked = (name) => {
    SlyEvent.getInstance().sendEvent({
      action: 'click',
      category: 'externalReview',
      label: this.props.community.id,
      value: name,
    });
  };

  render() {
    const {
      community: { reviews, propRatings: { reviewsValue, ratingsArray } },
    } = this.props;

    return (
      <EntityReviews
        reviewsValue={reviewsValue}
        reviews={reviews || []}
        reviewRatings={ratingsArray || []}
        onReviewLinkClicked={this.onReviewLinkClicked}
      />
    );
  }
}
