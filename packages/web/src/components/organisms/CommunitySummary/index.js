import React from 'react';
import { object, bool, func, string } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { AVAILABLE_TAGS, PERSONAL_CARE_HOME, ASSISTED_LIVING, PERSONAL_CARE_HOME_STATES, CONTINUING_CARE_RETIREMENT_COMMUNITY, CCRC, ACTIVE_ADULT } from 'sly/web/constants/tags';
import { size, palette } from 'sly/common/components/themes';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { startingWith } from 'sly/common/components/helpers';
import pad from 'sly/web/components/helpers/pad';
import { Link, Box, Heading, Hr, Icon, Tag } from 'sly/web/components/atoms';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import { isBrowser } from 'sly/web/config';
import { tocPaths } from 'sly/web/services/helpers/url';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import ListItem from 'sly/web/components/molecules/ListItem';

const StyledHeading = pad(Heading, 'regular');
StyledHeading.displayName = 'StyledHeading';

const StyledTag = styled(Tag)`
  margin-right: ${size('spacing.regular')};
  text-transform: uppercase;
  margin-top: ${size('spacing.regular')};
`;

StyledTag.displayName = 'StyledTag';

const StyledIcon = styled(Icon)`
  margin-left: ${size('spacing.small')};
  vertical-align: text-top;
`;

const TooltipContent = styled(ReactTooltip)`
  padding: ${size('spacing.regular')}!important;
  color: ${palette('slate', 'base')}!important;
  background-color: ${palette('white', 'base')}!important;
  box-shadow: 0 0 ${size('spacing', 'large')} ${palette('slate', 'filler')}80;
`;

const CareTypeWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const OverlayTwoColumnListWrapper = styled.div`
  line-height: ${size('lineHeight.body')};
  margin-bottom: ${size('spacing.large')};
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${size('spacing.large')};

@media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: 50% 50%;
    grid-column-gap: ${size('layout.gutter')};
  }
`;

const MobileCommunityRating = styled(CommunityRating)`
  ${startingWith('laptop')} {
    display: none;
  }
`;

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


const CommunitySummary = ({
  community, innerRef, isAdmin, onConciergeNumberClicked, onCommunityNumberClicked, className,
  goToReviews, searchParams,
}) => {
  const {
    address, name, propRatings, propInfo, twilioNumber, partnerAgents,
  } = community;
  const {
    line1, line2, city, state, zip,
  } = address;
  const {
    communityPhone, typeCare, tier, typeOfHome, squareFeet, numBeds, numBaths, priceRange, garage,
  } = propInfo;
  const { reviewsValue, numReviews } = propRatings;
  const formattedAddress = `${line1}, ${line2}, ${city},
    ${state}
    ${zip}`
    .replace(/, null,/g, ',')
    .replace(/\s/g, ' ')
    .replace(/, ,/g, ', ');
  let conciergeNumber = communityPhone;

  if (twilioNumber && twilioNumber.numbers && twilioNumber.numbers.length) {
    [conciergeNumber] = twilioNumber.numbers;
  }
  if (!conciergeNumber) {
    conciergeNumber = '8558664515';
  }

  const careTypes = getCareTypes(state, typeCare);

  const partnerAgent = partnerAgents && partnerAgents.length > 0 ? partnerAgents[0] : null;

  return (
    <Box ref={innerRef} className={className}>
      <StyledHeading level="hero" size="title">
        {name}
        {isAdmin &&
          <Link
            to={`/dashboard/communities/${community.id}`}
          >
            &nbsp;(Edit)
          </Link>
        }
      </StyledHeading>
      <Heading weight="regular" level="subtitle" size="body" palette="grey">{formattedAddress}</Heading>

      <CareTypeWrapper>
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
      </CareTypeWrapper>
      {reviewsValue > 0 &&
        <MobileCommunityRating
          rating={reviewsValue}
          numReviews={numReviews}
          goToReviews={goToReviews}
        />
      }

      <Hr />
      {
        partnerAgent &&
          <>
            Call for help with pricing and availability
            <StyledIcon palette="slate" icon="help" size="caption" data-tip data-for="conciergePhone" />
            {isBrowser &&
            <TooltipContent id="conciergePhone" type="light" effect="solid" multiline>
              This phone number will connect you to the concierge team at Seniorly.
            </TooltipContent>
            }
            <br/>
            <Link href={`tel:${conciergeNumber}`} onClick={onConciergeNumberClicked}>
              {phoneFormatter(conciergeNumber, true)}
            </Link>
          </>
      }
      {
        tier === "4" && !partnerAgent && communityPhone &&
          <>
            Call to connect directly with the community
            <StyledIcon palette="slate" variation="dark" icon="help" size="caption" data-tip data-for="phone" />
            {isBrowser &&
            <TooltipContent id="phone" effect="solid" type="light" multiline>
              This phone number will connect you to the community.
            </TooltipContent>
            }
            <br/>
            <Link href={`tel:${communityPhone}`} onClick={onCommunityNumberClicked}>
              {phoneFormatter(communityPhone, true)}
            </Link>

          </>
      }

      {typeCare.includes(ACTIVE_ADULT) &&
        <>
          {tier === "4" && communityPhone && <Hr/>}
          <OverlayTwoColumnListWrapper>
            {priceRange &&
            <ListItem icon="money" iconPalette="grey" iconVariation="dark">
              <div>
                <strong> Price Range </strong>
                <br/>
                {priceRange}
              </div>
            </ListItem>
            }
            {typeOfHome &&
            <ListItem icon="community" iconPalette="grey" iconVariation="dark">
              <div>
                <strong> Home Type </strong>
                <br/>
                {typeOfHome}
              </div>
            </ListItem>
            }
            {squareFeet &&
            <ListItem icon="sq-ft" iconPalette="grey" iconVariation="dark">
              <div>
                <strong> Sq. Ft </strong>
                <br/>
                {squareFeet}
              </div>
            </ListItem>
            }
            {numBeds &&
            <ListItem icon="bed" iconPalette="grey" iconVariation="dark">
              <div>
                <strong> No. of Beds </strong>
                <br/>
                {numBeds}
              </div>
            </ListItem>
            }
            {numBaths &&
            <ListItem icon="bath" iconPalette="grey" iconVariation="dark">
              <div>
                <strong> No. of Baths </strong>
                <br/>
                {numBaths}
              </div>
            </ListItem>
            }
            {garage &&
            <ListItem icon="garage" iconPalette="grey" iconVariation="dark">
              <div>
                <strong> Garage </strong>
                <br/>
                {garage}
              </div>
            </ListItem>
            }
          </OverlayTwoColumnListWrapper>
        </>
      }
    </Box>
  );
};

CommunitySummary.propTypes = {
  community: communityPropType.isRequired,
  innerRef: object,
  isAdmin: bool,
  onConciergeNumberClicked: func,
  className: string,
  goToReviews: func,
  searchParams: object,
};

export default CommunitySummary;
