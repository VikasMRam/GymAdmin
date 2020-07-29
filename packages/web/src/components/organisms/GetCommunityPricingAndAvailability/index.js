import React from 'react';
import { string, func } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Button, Heading, Box } from 'sly/web/components/atoms';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';

const StyledButton = fullWidth(Button);

const PaddedHeading = pad(Heading, 'large');

const PaddedCommunityPricing = pad(CommunityPricing, 'large');

const PaddedCommunityRating = pad(CommunityRating);

const onClickEvent = id => ({ action: 'click-gcp-button-sidebar', category: 'PricingWizard', label: id });

const GetCommunityPricingAndAvailability = ({ community: { id, startingRate, rates, propRatings: { reviewsValue, numReviews } }, buttonTo, onClick }) => (
  <Box>
    <PaddedHeading level="title" size="subtitle">Get Pricing and Availability</PaddedHeading>
    {startingRate > 0 && <PaddedCommunityPricing id={id} estimated={rates !== 'Provided'} price={startingRate} />}
    {reviewsValue > 0 && <PaddedCommunityRating rating={reviewsValue} numReviews={numReviews} />}
    <StyledButton to={buttonTo} onClick={onClick} event={onClickEvent(id)}>
      Get Detailed Pricing
    </StyledButton>
  </Box>
);

GetCommunityPricingAndAvailability.propTypes = {
  community: communityPropType,
  buttonTo: string,
  onClick: func,
};

export default GetCommunityPricingAndAvailability;
