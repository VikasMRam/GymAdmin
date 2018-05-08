import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import { size } from 'sly/components/themes';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';

const SimilarCommunityTileDiv = styled.div`
  padding-bottom: ${size('spacing.large')};
  padding-right: ${size('spacing.regular')};
  padding-left: ${size('spacing.large')};
`;

const SimilarCommunity = ({ similarProperties }) => {
  const components = similarProperties.map((similarProperty) => {
    return (
      <SimilarCommunityTileDiv key={similarProperty.id}>
        <SimilarCommunityTile similarProperty={similarProperty} />
      </SimilarCommunityTileDiv>
    );
  });
  return <div>{components}</div>;
};

SimilarCommunity.propTypes = {
  similarProperties: arrayOf(object).isRequired,
};

export default SimilarCommunity;
