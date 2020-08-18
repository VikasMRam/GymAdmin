import React, { Component } from 'react';
import { bool, object } from 'prop-types';

import communityPropType from 'sly/common/propTypes/community';
import { isBrowser } from 'sly/web/config';
import { Button } from 'sly/web/components/atoms';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import { getIsActiveAdult, getIsSellerAgentCTA } from 'sly/web/services/helpers/community';
import { shouldShowZillowProfileAd } from 'sly/web/services/helpers/adtiles';
import CommunityStickyFooter from 'sly/web/components/organisms/CommunityStickyFooter';
import GetSellerAgentInfo from 'sly/web/components/organisms/GetSellerAgentInfo';

export default class StickyFooterCTAContainer extends Component {
  static typeHydrationId = 'StickyCTAContainer';
  static propTypes = {
    community: communityPropType,
    buttonProps: object,
    completedCTA: bool,
  };

  render() {
    const { community = {}, buttonProps, completedCTA } = this.props;

    if (!isBrowser) {
    }
    const showZillowProfileAd = shouldShowZillowProfileAd(community);
    const isSellerAgentCtaCommunity = getIsActiveAdult(community);

    // let requestSent = false;
    // if (ackCTA && community) {
    //   //check if cta was already made
    //   if (isCtaRecorded(type, community.id)) {
    //     ctaText = "Request Sent";
    //     requestSent = true;
    //   }
    // }
    let isActiveAdult = false;
    if (showZillowProfileAd) {
      let buttonProps = {
        to: 'https://www.zillow.com/offers/?t=seniorly-0220',
        buttonTo: 'https://www.zillow.com/offers/?t=seniorly-0220',
      };
      const title = "Selling a home to pay the cost of senior living?";
      const subtitle = "Our partner Zillow will make you an instant offer.";
      return (<GetSellerAgentInfo {...buttonProps} community={community} title={title} subtitle={subtitle} isZillowAd={true} />) ;

    } else if (isSellerAgentCtaCommunity) {
      isActiveAdult=true;
    }

    return (<CommunityStickyFooter
      community={community}
      locTrack="sticky-footer"
      isAlreadyPricingRequested={completedCTA}
      isActiveAdult={isActiveAdult}
      {...buttonProps}
    />);

  }
}
