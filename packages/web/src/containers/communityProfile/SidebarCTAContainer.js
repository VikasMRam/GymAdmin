import React, { Component } from 'react';
import { object, bool } from 'prop-types';

import communityPropType from 'sly/common/propTypes/community';
import { isBrowser } from 'sly/web/config';
import { Button } from 'sly/web/components/atoms';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import { getIsActiveAdult, getIsSellerAgentCTA } from 'sly/web/services/helpers/community';
import { shouldShowZillowProfileAd } from 'sly/web/services/helpers/adtiles';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';
import GetSellerAgentInfo from 'sly/web/components/organisms/GetSellerAgentInfo';

export default class SidebarCTAContainer extends Component {
  static typeHydrationId = 'SidebarCTAContainer';
  static propTypes = {
    community: communityPropType,
    buttonProps: object,
    completedCTA: bool,
  };

  render() {
    const { community = {}, buttonProps, completedCTA } = this.props;

    if (!isBrowser) {
    }
    // console.log('SQ func',shouldShowZillowProfileAd);
    const showZillowProfileAd = shouldShowZillowProfileAd(community);
    const isSellerAgentCtaCommunity = getIsSellerAgentCTA(community);

    // let requestSent = false;
    // if (ackCTA && community) {
    //   //check if cta was already made
    //   if (isCtaRecorded(type, community.id)) {
    //     ctaText = "Request Sent";
    //     requestSent = true;
    //   }
    // }
    if (showZillowProfileAd) {
      let buttonProps = {
        to: 'https://www.zillow.com/offers/?t=seniorly-0220',
        buttonTo: 'https://www.zillow.com/offers/?t=seniorly-0220',
      };
      const title = "Selling a home to pay the cost of senior living?";
      const subtitle = "Our partner Zillow will make you an instant offer.";
      return ( <GetSellerAgentInfo {...buttonProps}
                                   community={community}
                                   title={title} subtitle={subtitle} isZillowAd={true}
              />) ;
    } else if (isSellerAgentCtaCommunity) {
      const title = "Is selling your home part of your senior living plan?";
      const subtitle = "We can connect you to the top seller agents.";
      return (<GetSellerAgentInfo {...buttonProps}
                                  community={community}
                                  title={title} subtitle={subtitle} /> );
    } else {
      return (<GetCommunityPricingAndAvailability
        community={community}
        completedAssessment={completedCTA}
        {...buttonProps}
      />);
    }

  }
}
