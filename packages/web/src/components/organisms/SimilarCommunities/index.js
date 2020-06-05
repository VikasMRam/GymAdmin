import React from 'react';
import styled from 'styled-components';
import { arrayOf, func, object } from 'prop-types';

import pad from 'sly/web/components/helpers/pad';
import { community as communityPropType } from 'sly/web/propTypes/community';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import { Link } from 'sly/web/components/atoms';

const PaddedLink = pad(styled(Link)`
  display: block;
`, 'xLarge');

const SimilarCommunities = ({ communities, onCommunityClick, communityStyle, getEvent }) => {
  const { layout = 'column', imageSize = 'regular', showDescription = false } = communityStyle;

  return (
    <>
      {communities.map((community, index) => (
        <PaddedLink key={community.id} to={community.url} onClick={onCommunityClick} event={getEvent(community, index)}>
          <CommunityTile community={community} layout={layout} imageSize={imageSize} noGallery showDescription={showDescription} showSeeMoreButtonOnHover event={getEvent(community, index)}/>
        </PaddedLink>
      ))}
    </>
  );
};

SimilarCommunities.propTypes = {
  communities: arrayOf(communityPropType).isRequired,
  onCommunityClick: func,
  getEvent: func,
  communityStyle: object,
};

SimilarCommunities.defaultProps = {
  onCommunityClick: () => {},
  getEvent: () => {},
};


export default SimilarCommunities;
