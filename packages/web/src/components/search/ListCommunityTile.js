import React, { useCallback, memo } from 'react';
import { func, number } from 'prop-types';

import { Link } from 'sly/common/system';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import coordPropType from 'sly/common/propTypes/coordPropType';
import SlyEvent from 'sly/web/services/helpers/events';

const eventCategory = 'search-list';
const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
  category: eventCategory,
  action,
  label,
  value,
});

const ListCommunityTile = memo(({ community, setHoveredCommunity, index }) => {
  const onMouseEnter = useCallback(() => sendEvent('list-hover', community.name, index) || setHoveredCommunity(community), [community]);
  const onMouseLeave = useCallback(() => setHoveredCommunity(null), []);
  return (
    <Link
      key={community.id}
      to={community.url}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      target="_blank"
      sx={{ '&:hover': { textDecoration: 'unset' } }}
      event={{
        category: eventCategory,
        action: 'community-click',
        label: index,
        value: community.id,
      }}
      block
    >
      <CommunityTile
        community={community}
        margin="0 l l"
        layout="column"
        index={index}
        sx={{
          '&:hover': {
            boxShadow: 'rgb(0 0 0 / 6%) 0px 0.25rem 1rem',
          },
        }}
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
