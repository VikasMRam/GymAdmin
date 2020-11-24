import React, { useCallback, memo } from 'react';
import { func, number } from 'prop-types';

import Link from 'sly/common/components/atoms/Link';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import coordPropType from 'sly/common/propTypes/coordPropType';

const ListCommunityTile = memo(({ community, setHoveredCommunity, index }) => {
  const onMouseEnter = useCallback(() => setHoveredCommunity(community), [community]);
  const onMouseLeave = useCallback(() => setHoveredCommunity(null), []);
  return (
    <Link
      key={community.id}
      to={community.url}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      event={{
        category: 'SearchPage',
        action: 'communityClick',
        label: index,
        value: community.id,
      }}
      block
    >
      <CommunityTile
        noGallery
        community={community}
        margin="0 xLarge xLarge"
        layout="column"
        index={index}
        shadowOnHoverBlur="large"
        shadowOnHoverVOffset="small"
        shadowOnHoverPalette="black.base"
        shadowOnHoverPaletteOpacity="10"
      />
    </Link>
  );
});

ListCommunityTile.propTypes = {
  community: coordPropType,
  setHoveredCommunity: func,
  index: number,
};

export default ListCommunityTile;
