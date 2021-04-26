import React, { useCallback, useMemo } from 'react';
import { bool, object } from 'prop-types';
import { useLocation } from 'react-router-dom';

import communityPropType from 'sly/common/propTypes/community';
import { getIsActiveAdult } from 'sly/web/services/helpers/community';
import { shouldShowZillowProfileAd } from 'sly/web/services/helpers/adtiles';
import SlyEvent from 'sly/web/services/helpers/events';
import { useQuery } from 'sly/web/services/api';
import { EXTERNAL_LINK_CLICK } from 'sly/web/services/api/constants';
import CommunityStickyFooter from 'sly/web/components/organisms/CommunityStickyFooter';

const StickyFooterCTAContainer = (props) => {
  const createAction = useQuery('createUuidAction');

  const { pathname } = useLocation();

  const { community, buttonProps, completedCTA } = props;

  const handleZillowClick = useCallback(() => {
    SlyEvent.getInstance().sendEvent({
      category: 'footer-ZillowAd',
      action: 'click',
      label: community.id,
    });
    return createAction({
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
  }, [community, createAction, pathname]);

  const showZillowProfileAd = useMemo(() => shouldShowZillowProfileAd(community), [community]);
  const isSellerAgentCtaCommunity = useMemo(() => getIsActiveAdult(community), [community]);

  return (
    <CommunityStickyFooter
      community={community}
      locTrack="sticky-footer"
      isAlreadyPricingRequested={completedCTA}
      isActiveAdult={!showZillowProfileAd && isSellerAgentCtaCommunity}
      isZillowAd={showZillowProfileAd}
      {...(
        showZillowProfileAd
          ? {
            to: 'https://www.zillow.com/offers/?t=seniorly-0220',
            buttonTo: 'https://www.zillow.com/offers/?t=seniorly-0220',
            onClick: handleZillowClick,
          }
          : buttonProps
      )}
      {...props}
    />
  );
};

StickyFooterCTAContainer.typeHydrationId = 'StickyCTAContainer';

StickyFooterCTAContainer.propTypes = {
  community: communityPropType,
  buttonProps: object,
  completedCTA: bool,
};

StickyFooterCTAContainer.defaultProps = {
  community: {},
  buttonProps: {},
};

export default StickyFooterCTAContainer;
