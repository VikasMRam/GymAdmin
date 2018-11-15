import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, func, array } from 'prop-types';

import { size } from 'sly/components/themes';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import HeaderController from 'sly/controllers/HeaderController';
import CommunitySATAcknowledgement from 'sly/components/organisms/CommunitySATAcknowledgement/index';
import Button from 'sly/components/atoms/Button/index';
import Hr from 'sly/components/atoms/Hr/index';
import Heading from 'sly/components/atoms/Heading/index';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile/index';

const CommunitySATAcknowledgementWrapper = styled.div`
  margin-top: ${size('spacing.xxxLarge')};
  margin-bottom: ${size('spacing.xLarge')};
  margin-left: auto;
  margin-right: auto;
`;

const TopContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledButton = styled(Button)`

`;

const StyledHr = styled(Hr)`
  margin: ${size('spacing.xxxLarge')} 0;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const SimilarCommunityTileWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const BookATourConfirmationPage = ({
  communityName, communityImageUrl, appointmentText, onButtonClick, similarCommunities,
}) => {
  const similarCommunitiesComponent = similarCommunities.map(community => (
    <SimilarCommunityTileWrapper key={community.id}><SimilarCommunityTile similarProperty={community} /></SimilarCommunityTileWrapper>
  ));
  return (
    <Fragment>
      <TemplateHeader><HeaderController /></TemplateHeader>
      <TemplateContent>
        <TopContentWrapper>
          <CommunitySATAcknowledgementWrapper>
            <CommunitySATAcknowledgement communityName={communityName} communityImageUrl={communityImageUrl} appointmentText={appointmentText} />
          </CommunitySATAcknowledgementWrapper>
          <StyledButton kind="jumbo" palette="primary" onClick={onButtonClick} >View Similar Communities</StyledButton>
        </TopContentWrapper>
        <StyledHr />
        <StyledHeading level="title">Explore Nearby Communities</StyledHeading>
        {similarCommunitiesComponent}
      </TemplateContent>
    </Fragment>
  );
};

BookATourConfirmationPage.propTypes = {
  communityName: string.isRequired,
  communityImageUrl: string.isRequired,
  appointmentText: string.isRequired,
  onButtonClick: func.isRequired,
  similarCommunities: array.isRequired,
};

export default BookATourConfirmationPage;
