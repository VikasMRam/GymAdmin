import React from 'react';
import styled from 'styled-components';
import { arrayOf, func, object } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityTile from 'sly/components/organisms/CommunityTile';
import { Link } from 'sly/components/atoms';

const PaddedLink = pad(styled(Link)`
  display: block;
`, 'xLarge');

const SimilarCommunities = ({ communities, onCommunityClick, communityStyle }) => {
  const { layout = 'column', imageSize = 'regular', showDescription = false } = communityStyle;
  return (
    <div>
      {communities.map((community, index) => (
        <PaddedLink key={community.id} to={community.url} onClick={() => onCommunityClick && onCommunityClick(index, community.id)}>
          <CommunityTile community={community} layout={layout} imageSize={imageSize} noGallery showDescription={showDescription} showSeeMoreButtonOnHover />
        </PaddedLink>
      ))}
    </div>
  );
};

SimilarCommunities.propTypes = {
  communities: arrayOf(communityPropType).isRequired,
  onCommunityClick: func,
  communityStyle: object,
};

export default SimilarCommunities;
