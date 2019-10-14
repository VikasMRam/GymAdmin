import React from 'react';
import styled from 'styled-components';
import { object, arrayOf, func } from 'prop-types';

import border from 'sly/components/helpers/border';
import borderRadius from 'sly/components/helpers/borderRadius';
import pad from 'sly/components/helpers/pad';
import CommunityTile from 'sly/components/organisms/CommunityTile';
import Link from 'sly/components/atoms/Link';

const PaddedLink = pad(styled(Link)`
  display: block;
`, 'xLarge');

const ShadowCommunityTile = borderRadius(border(CommunityTile, 'regular', 'grey', 'stroke'));

const SimilarCommunity = ({ similarProperties, onSimilarCommunityClick, communityStyle }) => {
  const { layout = 'column', imageSize = 'regular', showDescription = false } = communityStyle;
  const components = similarProperties.map((similarProperty, index) => (
    <PaddedLink key={similarProperty.id} to={similarProperty.url} onClick={() => onSimilarCommunityClick(index, similarProperty.id)}>
      <ShadowCommunityTile community={similarProperty} layout={layout} imageSize={imageSize} showDescription={showDescription} noGallery showSeeMoreButtonOnHover />
    </PaddedLink>
  ));
  return <div>{components}</div>;
};

SimilarCommunity.propTypes = {
  similarProperties: arrayOf(object).isRequired,
  onSimilarCommunityClick: func.isRequired,
  communityStyle: object,
};

export default SimilarCommunity;
