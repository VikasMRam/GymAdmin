import React from 'react';
import { string } from 'prop-types';

import { community as communityPropType } from 'sly/web/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Button, Heading, Box, Block } from 'sly/web/components/atoms';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';

const StyledButton = fullWidth(Button);

const PaddedButton = pad(StyledButton, 'large');

const PaddedHeading = pad(Heading);

const PaddedCommunityPricing = pad(CommunityPricing);
PaddedCommunityPricing.displayName = 'PaddedCommunityPricing';

const PaddedCommunityRating = pad(CommunityRating);
PaddedCommunityRating.displayName = 'PaddedCommunityRating';

const getButton = (startingRate, props = {}) => startingRate > 0 ? <PaddedButton {...props} /> : <StyledButton {...props} />;

const onClickEvent = (id) => {
  return { action:'click-gcp-button-sidebar', category:'PricingWizard' , label:id }
};

const GetCommunityPricingAndAvailability = ({ community: { id, startingRate, propRatings: { reviewsValue, numReviews } }, buttonTo }) => (
  <Box>
    <PaddedHeading level="title" size="subtitle">Get Pricing and Availability</PaddedHeading>
    {startingRate > 0 && <PaddedCommunityPricing description="Estimated pricing starts at" price={startingRate} />}
    {reviewsValue > 0 && <PaddedCommunityRating description="Average rating" numReviewsPalette="slate" rating={reviewsValue} numReviews={numReviews} />}
    {getButton(startingRate, { to: buttonTo, children: 'Get Detailed Pricing', event: onClickEvent(id) })}
    {startingRate > 0 &&
      <Block size="caption" palette="grey">
        * Pricing varies depending on senior living room type and care service needs.
      </Block>
    }
  </Box>
);

GetCommunityPricingAndAvailability.propTypes = {
  community: communityPropType,
  buttonTo: string,
};

export default GetCommunityPricingAndAvailability;
