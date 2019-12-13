import React from 'react';
import { object, bool, func, string } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { AVAILABLE_TAGS, PERSONAL_CARE_HOME, ASSISTED_LIVING, PERSONAL_CARE_HOME_STATES } from 'sly/constants/tags';
import { size, palette } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import { Link, Box, Heading, Hr, Icon, Tag } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';
import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating';
import { isBrowser } from 'sly/config';
import PlusBadge from 'sly/components/molecules/PlusBadge';
import { tocPaths } from 'sly/services/helpers/url';
import { phoneFormatter } from 'sly/services/helpers/phone';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

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

const getCareTypes = (state, careTypes) => {
  const updatedCareTypes = [];

  careTypes.forEach((careType) => {
    const tocBc = tocPaths([careType]);

    if (AVAILABLE_TAGS.includes(careType)) {
      const isPersonalCareHome = PERSONAL_CARE_HOME_STATES.includes(state) && careType === ASSISTED_LIVING;
      const tag = isPersonalCareHome ? PERSONAL_CARE_HOME : careType;

      updatedCareTypes.push({ tag, path: tocBc.path });
    }
  });

  return updatedCareTypes;
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
  const { reviewsValue } = propRatings;
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
      <Hr />
      <CommunityPricingAndRating price={startingRate} rating={reviewsValue} goToReviews={goToReviews} />
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
