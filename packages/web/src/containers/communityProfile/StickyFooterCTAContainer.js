import React, { Component } from 'react';
import { bool, object, func } from 'prop-types';
import { withRouter } from 'react-router';

import communityPropType from 'sly/common/propTypes/community';
import { isBrowser } from 'sly/web/config';
import { getIsActiveAdult } from 'sly/web/services/helpers/community';
import { shouldShowZillowProfileAd } from 'sly/web/services/helpers/adtiles';
import CommunityStickyFooter from 'sly/web/components/organisms/CommunityStickyFooter';
import SlyEvent from 'sly/web/services/helpers/events';
import { EXTERNAL_LINK_CLICK } from 'sly/web/services/api/constants';
import { query } from 'sly/web/services/api';

@withRouter
@query('createAction', 'createUuidAction')
export default class StickyFooterCTAContainer extends Component {
  static typeHydrationId = 'StickyCTAContainer';
  static propTypes = {
    community: communityPropType,
    buttonProps: object,
    completedCTA: bool,
    createAction: func,
  };

  handleZillowClick = () => {
    const { createAction, community = {}, location: { pathname } } = this.props;
    const action = 'click';
    SlyEvent.getInstance().sendEvent({
      category: 'footer-ZillowAd',
      action,
      label: community.id,
    });
    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: EXTERNAL_LINK_CLICK,
        actionPage: pathname,
        actionInfo: {
          target: 'https://www.zillow.com/offers/?t=seniorly-0220',
          source: 'footerCTA',
          slug: community.id,
        },
      },
    });
  };

  render() {
    const { community = {}, completedCTA } = this.props;
    let { buttonProps } = this.props;
    if (!isBrowser) {
    }
    const showZillowProfileAd = shouldShowZillowProfileAd(community);
    const isSellerAgentCtaCommunity = getIsActiveAdult(community);

    let isActiveAdult = false;
    if (showZillowProfileAd) {
      buttonProps = {
        to: 'https://www.zillow.com/offers/?t=seniorly-0220',
        buttonTo: 'https://www.zillow.com/offers/?t=seniorly-0220',
        onClick: this.handleZillowClick,
      };
    } else if (isSellerAgentCtaCommunity) {
      isActiveAdult = true;
    }
    return (<CommunityStickyFooter
      community={community}
      locTrack="sticky-footer"
      isAlreadyPricingRequested={completedCTA}
      isActiveAdult={isActiveAdult}
      isZillowAd={showZillowProfileAd}
      {...buttonProps}
      {...this.props}
    />);
  }
}
