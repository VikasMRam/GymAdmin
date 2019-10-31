import React, { Component } from 'react';
import EntityReviews from 'sly/components/organisms/EntityReviews';
import SlyEvent from 'sly/services/helpers/events';
import { community as communityPropType } from 'sly/propTypes/community';

export default class CommunityReviewsContainer extends Component {
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
