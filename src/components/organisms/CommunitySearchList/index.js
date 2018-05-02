import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import { size } from 'sly/components/themes';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';

const SimilarCommunityTileDiv = styled.div`
  padding-bottom: ${size('spacing.large')};
  padding-right: ${size('spacing.regular')};
  padding-left: ${size('spacing.regular')};
`;


const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.laptopLarge')};
  }
`;



const CommunitySearchList = ({ communityList }) => {
  const components = communityList.map((similarProperty) => {
    return (
      <SimilarCommunityTileDiv key={similarProperty.id}>
        <SimilarCommunityTile similarProperty={similarProperty} />
      </SimilarCommunityTileDiv>
    );
  });
  return (
    <SectionWrapper>{components}</SectionWrapper>
  );
};

CommunitySearchList.propTypes = {
  communityList: arrayOf(object).isRequired,

};

export default CommunitySearchList;
