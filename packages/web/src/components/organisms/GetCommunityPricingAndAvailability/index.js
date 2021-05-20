import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { community as communityPropType } from 'sly/common/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Button, Heading, Box, Icon } from 'sly/common/components/atoms';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';

const StyledButton = fullWidth(styled(Button)`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-gap: ${size('spacing.medium')};
`);

const PaddedHeading = pad(Heading, 'large');

const PaddedCommunityPricing = pad(CommunityPricing, 'large');

const PaddedCommunityRating = pad(CommunityRating);

const onClickEvent = id => ({ action: 'click-gcp-button-sidebar', category: 'PricingWizard', label: id });

const GetCommunityPricingAndAvailability = ({ completedAssessment, community: { id, startingRate, rates, propRatings: { reviewsValue, numReviews } }, buttonTo, onClick }) => {
  return (
    <Box>
      <PaddedHeading level="title" size="subtitle">Get Pricing and Availability</PaddedHeading>
      {startingRate > 0 && <PaddedCommunityPricing id={id} estimated={rates !== 'Provided'} price={startingRate} />}
      {reviewsValue > 0 && <PaddedCommunityRating rating={reviewsValue} numReviews={numReviews} />}
      <StyledButton ghost={completedAssessment} to={buttonTo} onClick={onClick} event={onClickEvent(id)}>
        {completedAssessment && <Icon icon="tick" />}
        {completedAssessment ? 'Pricing Requested' : 'Get Pricing and Availability'}
      </StyledButton>
    </Box>
  );
};
GetCommunityPricingAndAvailability.propTypes = {
  community: communityPropType,
  buttonTo: string,
  onClick: func,
  completedAssessment: bool,
};

export default GetCommunityPricingAndAvailability;
