import React from 'react';
import { object, bool, func, string } from 'prop-types';
import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { size, palette } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import pad from 'sly/components/helpers/pad';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import { Link, Box, Heading, Hr, Icon, Tag, Block } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';
import CommunityRating from 'sly/components/molecules/CommunityRating';
import CommunityPricing from 'sly/components/molecules/CommunityPricing';
import { isBrowser } from 'sly/config';
import PlusBadge from 'sly/components/molecules/PlusBadge';
import { tocPaths } from 'sly/services/helpers/url';
import stateCareTypes from 'sly/constants/stateCareTypes';
import careTypesMap from 'sly/constants/careTypesMap';
import { phoneFormatter } from 'sly/services/helpers/phone';

const StyledHeading = pad(Heading, 'regular');
StyledHeading.displayName = 'StyledHeading';

const StyledTag = styled(Tag)`
  margin-right: ${size('spacing.regular')};
  text-transform: uppercase;
  margin-top: ${size('spacing.regular')};
`;

StyledTag.displayName = 'StyledTag';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  > *:first-child {
    margin-bottom: ${size('spacing.medium')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    align-items: center;
    > *:first-child {
      margin-bottom: 0;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
`;

const StyledIcon = styled(Icon)`
  margin-left: ${size('spacing.small')};
  vertical-align: text-top;
`;

const TooltipContent = styled(ReactTooltip)`
  padding: ${size('spacing.regular')};
  color: ${palette('white', 'base')} !important;
  background-color: ${palette('slate', 'base')} !important;
  border-radius: ${size('spacing.tiny')};
  font-size: ${size('text.caption')};

  &.place-top {
    &:after {
      border-top-color: ${palette('slate', 'base')} !important;
    }
  }
`;

const PricingRatingWrapper = mobileOnly(styled.div`
  display: grid;
`, css`
  grid-template-rows: 1fr 1fr;
  grid-gap: ${size('spacing.xLarge')};
`, css`
  grid-template-columns: min-content 1fr;
  grid-gap: ${size('spacing.massive')};
`);

const PaddedPricingRatingWrapper = pad(PricingRatingWrapper, 'large');

const residentialCareTypes = [
  'Residential Care',
  'Residential Care Homes',
  'Residential Homes for the Aged',
  'Residential Care facilities',
  'Residential Care Home',
];
const rcStates = ['ID', 'OR'];
const ASSISTED_LIVING = 'Assisted Living';
const SMALL_COMMUNITY = 'up to 20 Beds';

const getCareTypes = (state, careTypes, communitySize) => {
  const updatedCareTypes = [];

  careTypes.forEach((careType) => {
    const tocBc = tocPaths([careType]);
    const extraCareTypes = careTypesMap[careType];

    if (extraCareTypes) {
      extraCareTypes.forEach((extraCareType) => {
        const hasCareType = stateCareTypes[state].includes(extraCareType);
        const isResidentialCare = careType === ASSISTED_LIVING && residentialCareTypes.includes(extraCareType);
        const isNotExists = !updatedCareTypes.find(data => data.name === extraCareType);

        if (hasCareType && isNotExists) {
          if ((isResidentialCare && (rcStates.includes(state) || communitySize === SMALL_COMMUNITY)) || !isResidentialCare) {
            updatedCareTypes.push({ name: extraCareType, path: tocBc.path });
          }
        }
      });
    } else if (stateCareTypes[state].includes(careType)) {
      updatedCareTypes.push({ name: careType, path: tocBc.path });
    }
  });

  return updatedCareTypes;
};

const getPricingAndRating = (startingRate, reviewsValue, numReviews, goToReviews) => {
  const Wrapper = startingRate > 0 ? PaddedPricingRatingWrapper : PricingRatingWrapper;
  return (
    <>
      <Hr />
      <Wrapper>
        {startingRate > 0 && <CommunityPricing description="Estimated pricing starts at" price={startingRate} />}
        {reviewsValue > 0 && <CommunityRating description="Average rating" numReviewsPalette="slate" rating={reviewsValue} numReviews={numReviews} goToReviews={goToReviews} />}
      </Wrapper>
      {startingRate > 0 &&
        <Block size="caption" palette="grey">
          * Pricing varies depening on senior living room type and care service needs.
        </Block>
      }
    </>
  );
};

const CommunitySummary = ({
  community, innerRef, isAdmin, onConciergeNumberClicked, className,
  onFavouriteClick, isFavorited, onShareClick, goToReviews, searchParams,
}) => {
  const {
    address, name, startingRate, propRatings, propInfo, twilioNumber,
  } = community;
  const {
    line1, line2, city, state, zip,
  } = address;
  const {
    communityPhone, plusCommunity, plusCategory, typeCare, communitySize,
  } = propInfo;
  const { reviewsValue, numReviews } = propRatings;
  const formattedAddress = `${line1}, ${line2}, ${city},
    ${state}
    ${zip}`
    .replace(/\s/g, ' ')
    .replace(/, ,/g, ', ');
  let conciergeNumber = communityPhone;

  if (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) {
    [conciergeNumber] = twilioNumber.numbers;
  }
  if (!conciergeNumber) {
    conciergeNumber = '8558664515';
  }

  const favIcon = isFavorited ? 'favourite-light' : 'favourite-empty';
  const careTypes = getCareTypes(state, typeCare, communitySize);

  return (
    <Box ref={innerRef} className={className}>
      <StyledHeading level="hero" size="title">
        {name}
        {isAdmin &&
          <Link
            to={`/mydashboard#/mydashboard/communities/${community.id}/about`}
          >
            &nbsp;(Edit)
          </Link>
        }
      </StyledHeading>
      <Heading weight="regular" level="subtitle" size="body" palette="grey">{formattedAddress}</Heading>

      {
        careTypes.map(careType =>
          (
            <Link
              key={careType.path}
              to={`${careType.path}/${searchParams.state}/${searchParams.city}`}
              target="_blank"
              event={{
                category: 'care-type-tags',
                action: 'tag-click',
                label: careType.name,
              }}
            >
              <StyledTag key={careType.name}>{careType.name}</StyledTag>
            </Link>),
        )
      }

      {plusCommunity &&
        <PlusBadge plusCategory={plusCategory} />
      }
      <Hr />
      <Wrapper>
        <div>
          For pricing and availability, call&nbsp;
          <Link href={`tel:${conciergeNumber}`} onClick={onConciergeNumberClicked}>
            {phoneFormatter(conciergeNumber, true)}
          </Link>
          <StyledIcon palette="slate" variation="dark" icon="help" size="caption" data-tip data-for="phone" />
          {isBrowser &&
            <TooltipContent id="phone" place="top" effect="solid" multiline>
              This phone number will connect you to the concierge team at Seniorly.
            </TooltipContent>
          }
        </div>
        <div>
          <StyledIconButton ghost transparent icon="share" onClick={onShareClick}>
            Share
          </StyledIconButton>
          <StyledIconButton ghost transparent icon={favIcon} onClick={onFavouriteClick}>
            Save
          </StyledIconButton>
        </div>
      </Wrapper>
      {(startingRate || reviewsValue) > 0 && getPricingAndRating(startingRate, reviewsValue, numReviews, goToReviews)}
    </Box>
  );
};

CommunitySummary.propTypes = {
  community: communityPropType.isRequired,
  innerRef: object,
  isAdmin: bool,
  onConciergeNumberClicked: func,
  className: string,
  onFavouriteClick: func,
  onShareClick: func,
  goToReviews: func,
  isFavorited: bool,
  searchParams: object,
};

export default CommunitySummary;
