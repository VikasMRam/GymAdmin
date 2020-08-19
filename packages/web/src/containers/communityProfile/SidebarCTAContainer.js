import React, { Component } from 'react';
import { object, bool, func } from 'prop-types';
import { withRouter } from 'react-router';

import communityPropType from 'sly/common/propTypes/community';
import { isBrowser } from 'sly/web/config';
import { Button } from 'sly/web/components/atoms';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import { getIsActiveAdult, getIsSellerAgentCTA } from 'sly/web/services/helpers/community';
import { shouldShowZillowProfileAd } from 'sly/web/services/helpers/adtiles';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';
import GetSellerAgentInfo from 'sly/web/components/organisms/GetSellerAgentInfo';
import SlyEvent from 'sly/web/services/helpers/events';
import { query } from 'sly/web/services/api';
import { EXTERNAL_LINK_CLICK } from 'sly/web/services/api/constants';

@withRouter
@query('createAction', 'createUuidAction')

export default class SidebarCTAContainer extends Component {
  static typeHydrationId = 'SidebarCTAContainer';
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
      category: 'sidebar-ZillowAd',
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
          source: 'sidebarCTA',
          slug: community.id,
        },
      },
    });
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
        onClick: this.handleZillowClick,
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
