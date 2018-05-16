import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import { size } from 'sly/components/themes';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import Link from 'sly/components/atoms/Link';

const SimilarCommunityTileDiv = styled.div`
  padding-bottom: ${size('spacing.large')};
`;

const SimilarCommunity = ({ similarProperties }) => {
  const components = similarProperties.map((similarProperty) => {
    return (
      <Link key={similarProperty.id} to={similarProperty.url}>
        <SimilarCommunityTileDiv>
          <SimilarCommunityTile similarProperty={similarProperty} />
        </SimilarCommunityTileDiv>
      </Link>
    );
  });
  return <div>{components}</div>;
};

SimilarCommunity.propTypes = {
  similarProperties: arrayOf(object).isRequired,
};

export default SimilarCommunity;
