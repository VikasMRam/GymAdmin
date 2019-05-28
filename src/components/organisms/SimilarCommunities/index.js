import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import border from 'sly/components/helpers/border';
import borderRadius from 'sly/components/helpers/borderRadius';
import pad from 'sly/components/helpers/pad';
import CommunityTile from 'sly/components/organisms/CommunityTile';
import Link from 'sly/components/atoms/Link';

const PaddedLink = pad(styled(Link)`
  display: block;
`, 'xLarge');

const ShadowCommunityTile = borderRadius(border(CommunityTile, 'regular', 'grey', 'stroke'));

const SimilarCommunity = ({ similarProperties }) => {
  const components = similarProperties.map(similarProperty => (
    <PaddedLink key={similarProperty.id} to={similarProperty.url}>
      <ShadowCommunityTile community={similarProperty} layout="column" imageSize="regular" noGallery showDescription showSeeMoreButtonOnHover />
    </PaddedLink>
  ));
  return <div>{components}</div>;
};

SimilarCommunity.propTypes = {
  similarProperties: arrayOf(object).isRequired,
};

export default SimilarCommunity;
