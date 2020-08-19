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

    // eslint-disable-next-line no-empty
    if (!isBrowser) {
    }
    const showZillowProfileAd = shouldShowZillowProfileAd(community);
    const isSellerAgentCtaCommunity = getIsSellerAgentCTA(community);

    // let requestSent = false;
    if (showZillowProfileAd) {
      const buttonProps = {
        to: 'https://www.zillow.com/offers/?t=seniorly-0220',
        buttonTo: 'https://www.zillow.com/offers/?t=seniorly-0220',
      };
      const title = 'Selling a home to pay the cost of senior living?';
      const subtitle = 'Our partner Zillow will make you an instant offer.';
      return (<GetSellerAgentInfo
        {...buttonProps}
        community={community}
        title={title}
        subtitle={subtitle}
        completedCTA={completedCTA}
        isZillowAd={showZillowProfileAd}
      />);
    } else if (isSellerAgentCtaCommunity) {
      const title = 'Is selling your home part of your senior living plan?';
      const subtitle = 'We can connect you to the top seller agents.';
      return (<GetSellerAgentInfo
        {...buttonProps}
        community={community}
        title={title}
        subtitle={subtitle}
        completedCTA={completedCTA}
        isZillowAd={showZillowProfileAd}
      />);
    }
    return (<GetCommunityPricingAndAvailability
      community={community}
      completedAssessment={completedCTA}
      {...buttonProps}
    />);
  }
}
