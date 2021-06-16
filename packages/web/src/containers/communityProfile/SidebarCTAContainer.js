import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { object, bool, func } from 'prop-types';

import { getIsSellerAgentCTA } from 'sly/web/services/helpers/community';
import { shouldShowZillowProfileAd } from 'sly/web/services/helpers/adtiles';
import SlyEvent from 'sly/web/services/helpers/events';
import { useQuery } from 'sly/web/services/api';
import { EXTERNAL_LINK_CLICK } from 'sly/web/services/api/constants';
import GetSellerAgentInfo from 'sly/web/components/organisms/GetSellerAgentInfo';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';

const SidebarCTAContainer = ({ community, buttonProps, completedCTA, children }) => {
  const { pathname } = useLocation();

  const createAction = useQuery('createUuidAction');

  const showZillowProfileAd = useMemo(() => shouldShowZillowProfileAd(community), [community]);
  const isSellerAgentCtaCommunity = useMemo(() => getIsSellerAgentCTA(community), [community]);

  const handleZillowClick = useCallback(() => {
    SlyEvent.getInstance().sendEvent({
      category: 'sidebar-ZillowAd',
      action: 'click',
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
  }, [community]);

  if (showZillowProfileAd) {
    const buttonProps = {
      to: 'https://www.zillow.com/offers/?t=seniorly-0220',
      buttonTo: 'https://www.zillow.com/offers/?t=seniorly-0220',
      onClick: handleZillowClick,
    };
    const title = 'Selling a home to pay the cost of senior living?';
    const subtitle =
      'Our partner Zillow will make you an instant offer.';
    return (
      <GetSellerAgentInfo
        {...buttonProps}
        community={community}
        title={title}
        subtitle={subtitle}
        completedCTA={completedCTA}
        isZillowAd={showZillowProfileAd}
      >
        {children}
      </GetSellerAgentInfo>
    );
  } else if (isSellerAgentCtaCommunity) {
    const title =
      'Is selling your home part of your senior living plan?';
    const subtitle = 'We can connect you to the top selling agents.';
    return (
      <GetSellerAgentInfo
        {...buttonProps}
        community={community}
        title={title}
        subtitle={subtitle}
        completedCTA={completedCTA}
        isZillowAd={showZillowProfileAd}
      >
        {children}
      </GetSellerAgentInfo>
    );
  }

  return (
    <GetCommunityPricingAndAvailability
      community={community}
      completedAssessment={completedCTA}
      {...buttonProps}
    >
      {children}
    </GetCommunityPricingAndAvailability>
  );
};

SidebarCTAContainer.propTypes = {
  buttonProps: object,
  community: object,
  completedCTA: bool,
  createAction: func,
};

SidebarCTAContainer.defaultProps = {
  community: {},
};

SidebarCTAContainer.typeHydrationId = 'SidebarCTAContainer';

export default SidebarCTAContainer;
