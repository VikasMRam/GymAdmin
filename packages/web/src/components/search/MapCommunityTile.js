import React, { forwardRef } from 'react';
import { number } from 'prop-types';

import communityPropType from 'sly/common/propTypes/community';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import { Link } from 'sly/common/system';

const MapCommunityTile = forwardRef(({ community, index, ...props }, ref) => (
  <Link
    to={community.url}
    event={{
      category: 'search-map',
      action: 'mapClick',
      label: community.id,
      value: index,
    }}
    target="_blank"
    marginBottom="l"
    display="block"
    zIndex={10}
  >
    <CommunityTile
      ref={ref}
      index={index}
      community={community}
      type="map"
      layout="column"
      shadowBlur="regular"
      shadowVOffset="small"
      shadowPalette="black.base"
      shadowPaletteOpacity="20"
      position="absolute"
      sx={{
        zIndex: 1000,
        transform: 'translate(-50%)',
        bottom: '8px',
        left: '50%',
        width: 'calc(100% - 16px)',
        '@tablet': {
          bottom: '12px',
          width: 'calc(100% - 48px)',
          maxWidth: '680px',
        },
        '@laptop': {
          width: '344px',
          bottom: 'unset',
        },
      }}
      {...props}
    />
  </Link>
));

MapCommunityTile.propTypes = {
  community: communityPropType,
  index: number,
};

export default MapCommunityTile;
