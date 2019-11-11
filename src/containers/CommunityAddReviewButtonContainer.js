import React, { Component } from 'react';

import withModal from 'sly/controllers/withModal';
import Button from 'sly/components/atoms/Button';
import loadable from "@loadable/component";

const CommunityAddRatingFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityAddRatingFormContainer" */'sly/containers/CommunityAddRatingFormContainer'));

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
