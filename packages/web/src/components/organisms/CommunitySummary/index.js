import React from 'react';
import { object, bool, func, string } from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { AVAILABLE_TAGS, PERSONAL_CARE_HOME, ASSISTED_LIVING, PERSONAL_CARE_HOME_STATES, CONTINUING_CARE_RETIREMENT_COMMUNITY, CCRC, ACTIVE_ADULT } from 'sly/web/constants/tags';
import { size, palette } from 'sly/common/components/themes';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { startingWith } from 'sly/common/components/helpers';
import { Block, Box, Heading, Icon, Hr, Link } from 'sly/common/components/atoms';
import { Tag } from 'sly/web/components/atoms';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import { isBrowser } from 'sly/web/config';
import { tocPaths } from 'sly/web/services/helpers/url';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import { showFafNumber, getFafNumber } from 'sly/web/services/helpers/community';
import ListItem from 'sly/web/components/molecules/ListItem';
import Span from 'sly/web/components/atoms/Span';

const StyledIcon = styled(Icon)`
  margin-left: ${size('spacing.small')};
  color: ${palette('slate.lighter-60')};
  vertical-align: text-top;
`;

const TooltipContent = styled(ReactTooltip)`
  padding: ${size('spacing.regular')}!important;
  color: ${palette('slate', 'base')}!important;
  background-color: ${palette('white', 'base')}!important;
  box-shadow: 0 0 ${size('spacing', 'large')} ${palette('slate', 'filler')}80;
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

const PhoneNumWrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: ${size('spacing.regular')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: 50% 50%;
    grid-column-gap: ${size('spacing.regular')};
  }
`;

const MobileCommunityRating = styled(CommunityRating)`
  margin-top: ${size('spacing.large')};
  ${startingWith('laptop', 'display: none;')}
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
    address, name, propRatings, propInfo, twilioNumber, partnerAgents, care,
  } = community;
  const {
    line1, line2, city, state, zip, zipcode
  } = address;
  const {
    communityPhone, typeCare, typeOfHome, squareFeet, numBeds, numBaths, priceRange, garage,
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

  const careTypes = care ? getCareTypes(state, care) : getCareTypes(state, typeCare);

  const partnerAgent = partnerAgents && partnerAgents.length > 0 ? partnerAgents[0] : null;

  const showFriendsFamilyNumber = showFafNumber(address);
  const fafn = getFafNumber(conciergeNumber, '1');

  return (
    <Box ref={innerRef} className={className}>
      <Heading
        level="hero"
        size="title"
        lineHeight="32px"
        pad="regular"
      >
        {name}
        {isAdmin &&
          <Link
            to={`/dashboard/communities/${community.id}`}
          >
            &nbsp;(Edit)
          </Link>
        }
      </Heading>

      <Heading
        weight="regular"
        level="title"
        size="body"
        palette="grey"
      >
        {formattedAddress}
      </Heading>

      <Block>
        {careTypes.map(careType => (
          <Tag
            key={careType.path}
            marginRight="regular"
            textTransform="uppercase"
          >
            <Link
              palette="white.base"
              to={`${careType.path}/${searchParams.state}/${searchParams.city}`}
              target="_blank"
              event={{
                category: 'care-type-tags',
                action: 'tag-click',
                label: careType.tag,
              }}
            >
              {careType.tag}
            </Link>
          </Tag>
        ))}
      </Block>

      {reviewsValue > 0 &&
        <MobileCommunityRating
          rating={reviewsValue}
          numReviews={numReviews}
          goToReviews={goToReviews}
        />
      }

      <Hr />
      <PhoneNumWrapper>
        {
          partnerAgent &&
            <div>
              <Span size="caption">For Pricing & Availability</Span>
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
            </div>

        }
        {
          communityPhone &&
          <div>
            <Span size="caption">For Friends & Family</Span>
            <StyledIcon palette="slate" icon="help" size="caption" data-tip data-for="fafPhone" />
            {isBrowser &&
            <TooltipContent id="fafPhone" type="light" effect="solid" multiline>
              This phone number may connect you to the community front desk.
            </TooltipContent>
            }
            <br/>
            <Link href={`tel:${communityPhone}`} onClick={onCommunityNumberClicked}>
              {phoneFormatter(communityPhone, true)}
            </Link>
          </div>

        }

      </PhoneNumWrapper>

      {care && care.includes(ACTIVE_ADULT) &&
        <>
          {communityPhone && <Hr/>}
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
