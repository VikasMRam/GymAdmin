import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, func, array } from 'prop-types';

import { size } from 'sly/components/themes';
import CommunitySATAcknowledgement from 'sly/components/organisms/CommunitySATAcknowledgement/index';
import Hr from 'sly/components/atoms/Hr/index';
import Heading from 'sly/components/atoms/Heading/index';
import SimilarCommunityNearbyTile from 'sly/components/molecules/SimilarCommunityNearbyTile/index';

const CommunitySATAcknowledgementWrapper = styled.div`
  margin-top: ${size('spacing.xxxLarge')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.xxxLarge')};
  margin-bottom: ${size('spacing.xxxLarge')};
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.xLarge')};
`;

const SimilarCommunityTileWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: initial;
  }
`;

const SimilarCommunitiesWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: grid;
    grid-gap: 1.500rem;
    grid-template-columns: repeat(auto-fit, 252px);
  }
`;

const CommunitySATConfirmationPopup = ({
  onButtonClick, similarCommunities,
}) => {
  const similarCommunitiesComponent = similarCommunities.map(community => (
    <SimilarCommunityTileWrapper key={community.id}>
      <SimilarCommunityNearbyTile
        image={community.imageUrl}
        name={community.name}
        estimatedRate={community.estimated || 0}
        startingRate={community.startingRate}
        reviewsValue={community.reviewsValue}
        numReviews={community.numReviews}
      />
    </SimilarCommunityTileWrapper>
  ));

  return (
    <Fragment>
      <CommunitySATAcknowledgementWrapper>
        <CommunitySATAcknowledgement onButtonClick={onButtonClick} />
      </CommunitySATAcknowledgementWrapper>
      <StyledHr />
      <StyledHeading level="title">Explore communities nearby</StyledHeading>
      <SimilarCommunitiesWrapper>{similarCommunitiesComponent}</SimilarCommunitiesWrapper>
    </Fragment>
  );
};

CommunitySATConfirmationPopup.propTypes = {
  communityName: string.isRequired,
  communityImageUrl: string.isRequired,
  appointmentText: string.isRequired,
  onButtonClick: func.isRequired,
  similarCommunities: array.isRequired,
};

export default CommunitySATConfirmationPopup;

