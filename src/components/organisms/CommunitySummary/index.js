import React from 'react';
import { object, bool, func, string } from 'prop-types';
import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { AVAILABLE_TAGS, PERSONAL_CARE_HOME, ASSISTED_LIVING, PERSONAL_CARE_HOME_STATES, CONTINUING_CARE_RETIREMENT_COMMUNITY, CCRC } from 'sly/constants/tags';
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

const getCareTypes = (state, careTypes) => {
  const updatedCareTypes = [];

  careTypes.forEach((careType) => {
    const tocBc = tocPaths([careType]);

    if (AVAILABLE_TAGS.includes(careType)) {
      const isPersonalCareHome = PERSONAL_CARE_HOME_STATES.includes(state) && careType === ASSISTED_LIVING;
      let tag = careType;

      if (isPersonalCareHome) {
        tag = PERSONAL_CARE_HOME;
      } else if (careType === CONTINUING_CARE_RETIREMENT_COMMUNITY) {
        tag = CCRC;
      }

      updatedCareTypes.push({ tag, path: tocBc.path });
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
        {reviewsValue > 0 && <CommunityRating description="Average rating" numReviewsPalette="slate" numReviewsVariation="base" rating={reviewsValue} numReviews={numReviews} goToReviews={goToReviews} />}
      </Wrapper>
      {startingRate > 0 &&
        <Block size="caption" palette="grey">
          * Pricing varies depending on senior living room type and care service needs.
        </Block>
      }
    </>
  );
};

const CommunitySummary = ({
  community, innerRef, isAdmin, onConciergeNumberClicked, onCommunityNumberClicked, className,
  onFavouriteClick, isFavorited, onShareClick, goToReviews, searchParams,
}) => {
  const {
    address, name, startingRate, propRatings, propInfo, twilioNumber,
  } = community;
  const {
    line1, line2, city, state, zip,
  } = address;
  const {
    communityPhone, plusCommunity, plusCategory, typeCare,
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
  const careTypes = getCareTypes(state, typeCare);

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
                label: careType.tag,
              }}
            >
              <StyledTag key={careType.tag}>{careType.tag}</StyledTag>
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
          <StyledIcon palette="slate" variation="dark" icon="help" size="caption" data-tip data-for="conciergePhone" />
          {isBrowser &&
            <TooltipContent id="conciergePhone" place="top" effect="solid" multiline>
              This phone number will connect you to the concierge team at Seniorly.
            </TooltipContent>
          }
          <br/>
          <br/>
          To connect directly, call&nbsp;
          <Link href={`tel:${communityPhone}`} onClick={onCommunityNumberClicked}>
            {phoneFormatter(communityPhone, true)}
          </Link>
          <StyledIcon palette="slate" variation="dark" icon="help" size="caption" data-tip data-for="phone" />
          {isBrowser &&
          <TooltipContent id="phone" place="top" effect="solid" multiline>
            This phone number will connect you to the community.
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
