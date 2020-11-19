import React, { forwardRef } from 'react';

import communityPropType from 'sly/common/propTypes/community';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';

const MapCommunityTile = forwardRef(({ community, ...props }, ref) => (
  <CommunityTile
    ref={ref}
    community={community}
    lat={community.latitude}
    lng={community.longitude}
    type="map"
    layout="column"
    shadowBlur="small"
    shadowSpread="tiny"
    shadowVOffset="small"
    noGallery
    startingWithAll={{
      zIndex: 1000,
      position: 'absolute',
      transform: 'translate(-50%)',
      bottom: '8px',
      left: '50%',
      width: 'calc(100% - 16px)',
    }}
    startingWithTablet={{
      bottom: '12px',
      width: 'calc(100% - 48px)',
      maxWidth: '680px',
    }}
    startingWithLaptop={{
      width: '344px',
      bottom: 'unset',
    }}
    {...props}
  />
));

MapCommunityTile.propTypes = {
  community: communityPropType,
};

export default MapCommunityTile;
