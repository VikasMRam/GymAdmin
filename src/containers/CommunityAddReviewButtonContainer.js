import React, { Component } from 'react';

import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';
import withModal from 'sly/controllers/withModal';
import Button from 'sly/components/atoms/Button';

@withModal
export default class CommunityAddReviewButtonContainer extends Component {
  static typeHydrationId = 'CommunityAddReviewButtonContainer';
  render() {
    const { showModal, ...otherProps } = this.props;

    return (
      <Button
        onClick={() =>
          showModal(<CommunityAddRatingFormContainer showModal={showModal} />)
        }
        {...otherProps}
      />
    );
  }
}
