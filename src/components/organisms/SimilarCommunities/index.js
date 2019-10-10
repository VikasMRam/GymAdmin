import React from 'react';
import styled from 'styled-components';
import { arrayOf, func, bool, string } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityTile from 'sly/components/organisms/CommunityTile';
import { Link } from 'sly/components/atoms';

const PaddedLink = pad(styled(Link)`
  display: block;
`, 'xLarge');

const SimilarCommunities = ({ communities, onCommunityClick, showDescription, imageSize, layout }) => (
  <div>
    {communities.map((community, index) => (
      <PaddedLink key={community.id} to={community.url} onClick={() => onCommunityClick && onCommunityClick(index, community.id)}>
        <CommunityTile community={community} layout={layout} imageSize={imageSize} noGallery showDescription={showDescription} showSeeMoreButtonOnHover />
      </PaddedLink>
    ))}
  </div>
);

SimilarCommunities.propTypes = {
  communities: arrayOf(communityPropType).isRequired,
  onCommunityClick: func,
  showDescription: bool,
  imageSize: string,
  layout: string,
};

SimilarCommunities.defaultProps = {
  showDescription: true,
  imageSize: 'regular',
  layout: 'column',
};

export default SimilarCommunities;
