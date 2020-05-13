import React, { Component } from 'react';

import withModal from 'sly/web/controllers/withModal';
import Button from 'sly/web/components/atoms/Button';
import loadable from "@loadable/component";

const CommunityAddRatingFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityAddRatingFormContainer" */'sly/web/containers/CommunityAddRatingFormContainer'));

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
