import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, array, func } from 'prop-types';

import { size } from 'sly/components/themes';
import CommunitySATAcknowledgement from 'sly/components/organisms/CommunitySATAcknowledgement/index';
import Hr from 'sly/components/atoms/Hr/index';
import Heading from 'sly/components/atoms/Heading/index';
import SimilarCommunityNearbyTile from 'sly/components/molecules/SimilarCommunityNearbyTile/index';
import { Link } from 'sly/components/atoms/index';

const CommunitySATAcknowledgementWrapper = styled.div`
  margin-bottom: ${size('spacing.xxxLarge')};
`;

const StyledHr = styled(Hr)`
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
  similarCommunititesHref, similarCommunities, type, onTileClick,
}) => {
  const similarCommunitiesComponent = similarCommunities.map(community => (
    <SimilarCommunityTileWrapper key={community.id}>
      <Link to={community.url} onClick={onTileClick}>
        <SimilarCommunityNearbyTile
          image={community.imageUrl}
          name={community.name}
          estimatedRate={community.estimated || 0}
          startingRate={community.startingRate}
          reviewsValue={community.reviewsValue}
          numReviews={community.numReviews}
        />
      </Link>
    </SimilarCommunityTileWrapper>
  ));

  return (
    <Fragment>
      <CommunitySATAcknowledgementWrapper>
        <CommunitySATAcknowledgement similarCommunititesHref={similarCommunititesHref} type={type} />
      </CommunitySATAcknowledgementWrapper>
      <StyledHr />
      <StyledHeading level="title">Explore communities nearby</StyledHeading>
      <SimilarCommunitiesWrapper>{similarCommunitiesComponent}</SimilarCommunitiesWrapper>
    </Fragment>
  );
};

CommunitySATConfirmationPopup.propTypes = {
  similarCommunititesHref: string.isRequired,
  similarCommunities: array.isRequired,
  onTileClick: func.isRequired,
  type: string,
};

export default CommunitySATConfirmationPopup;

