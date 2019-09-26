import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, bool, func } from 'prop-types';
import dayjs from 'dayjs';

import { size, palette } from 'sly/components/themes';
import { Heading, Badge, Icon, Block, Span } from 'sly/components/atoms';
import cursor from 'sly/components/helpers/cursor';
import Stage from 'sly/components/molecules/Stage';
import { adminAgentPropType } from 'sly/propTypes/agent';

const Wrapper = styled.div`
  border: ${size('border.regular')} solid ${palette('grey', 'stroke')};
  border-radius: ${size('border.xxLarge')};
`;

const TopWrapper = styled.div`
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    padding: ${size('spacing.xLarge')};
  }
`;

const BottomWrapper = styled.div`
  border-top: ${size('border.regular')} solid ${palette('grey', 'stroke')};
  padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')}) ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')}) ${size('spacing.xLarge')};
  }
`;

const SmallScreenSection = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const BigScreenSection = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
  }
`;

const MobileAgentNameHeading = styled(Heading)`

`;

const MobileSlyscoreSection = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledBadge = styled(Badge)`
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.small')};
  padding-top: ${size('spacing.small')};
  white-space: nowrap;
`;

const SlyScoreBadge = styled(StyledBadge)`
  margin-right: ${size('spacing.regular')};
`;
const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.small')};
`;

const IconBadgeSpan = styled(Span)`
  white-space: nowrap;
`;

const DetailsTable = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: ${size('spacing.large')};
  grid-row-gap: ${size('spacing.regular')};
`;

const BigScreenSlyScorebadge = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    height: fit-content;
    padding: ${size('spacing.small')} calc(${size('spacing', 'regular')} + ${size('spacing', 'small')}) ;
    background-color: ${palette('grey', 'stroke')};
    border: ${size('border.regular')} solid ${palette('grey', 'filler')};
    border-radius: ${size('border.xxLarge')};
    margin-right: ${size('spacing.large')};
  }
`;

const BottomActionBlock = cursor(styled(Block)`
  text-align: center;
`);

const ReferralSentAtWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    margin-left: auto;
  }
`;

function transformAgent(agent) {
  let workPhone = null;
  let cellPhone = null;
  let slyScoreValue = null;
  let name = null;
  let leadCount = null;
  const { name: businessName, info, contacts } = agent;
  if (info) {
    const { slyScore, displayName, last5DayLeadCount } = info;
    if (slyScore) {
      slyScoreValue = slyScore;
    }
    if (displayName) {
      name = displayName;
    }
    if (last5DayLeadCount) {
      leadCount = last5DayLeadCount;
    }
  }
  if (contacts && contacts.length > 0) {
    const [contact] = contacts;
    ({ workPhone } = contact);
    cellPhone = contact.mobilePhone;
  }
  const agentProps = {
    name,
    slyScore: slyScoreValue,
    businessName,
    workPhone,
    cellPhone,
    leadCount,
  };
  return agentProps;
}

const getReferralSentTimeText = (date) => {
  date = dayjs(date).utc();
  return date.format('M/D/YY, h:mmA');
};

const DashboardAdminReferralAgentTile = ({
  className, onClick, agent, isRecommended, bottomActionText, bottomActionOnClick, stage, referralSentAt,
}) => {
  const {
    name, slyScore, businessName, workPhone, cellPhone, leadCount,
  } = transformAgent(agent);
  return (
    <Wrapper className={className} onClick={onClick}>
      <TopWrapper>
        <BigScreenSlyScorebadge><Block weight="bold">{slyScore}</Block><Block weight="bold" palette="grey" size="tiny">SLY</Block></BigScreenSlyScorebadge>
        <SmallScreenSection>
          <MobileAgentNameHeading size="body">{name}</MobileAgentNameHeading>
          <MobileSlyscoreSection>
            <SlyScoreBadge palette="grey" variation="stroke"><IconBadgeSpan size="tiny">{slyScore} SLYSCORE</IconBadgeSpan></SlyScoreBadge>
            {isRecommended && <StyledBadge palette="green"><StyledIcon icon="checkmark-circle" palette="white" size="small" /><IconBadgeSpan palette="white" size="tiny">RECOMMENDED</IconBadgeSpan></StyledBadge>}
          </MobileSlyscoreSection>
        </SmallScreenSection>
        <DetailsTable>
          <BigScreenSection>
            <MobileAgentNameHeading size="body">{name}</MobileAgentNameHeading>
          </BigScreenSection>
          <BigScreenSection>
            {isRecommended && <StyledBadge palette="green"><StyledIcon icon="checkmark-circle" palette="white" size="small" /><IconBadgeSpan palette="white" size="tiny">RECOMMENDED</IconBadgeSpan></StyledBadge>}
          </BigScreenSection>
          {businessName && (
            <Fragment>
              <Span size="caption" palette="grey" variation="dark" >Business name</Span>
              <Span size="caption">{businessName}</Span>
            </Fragment>
          )}
          {workPhone && (
            <Fragment>
              <Span size="caption" palette="grey" variation="dark">Work phone</Span>
              <Span size="caption">{workPhone}</Span>
            </Fragment>
          )}
          {cellPhone && (
            <Fragment>
              <Span size="caption" palette="grey" variation="dark">Cell phone</Span>
              <Span size="caption">{cellPhone}</Span>
            </Fragment>
          )}
          {(leadCount !== undefined && leadCount !== null) && (
            <Fragment>
              <Span size="caption" palette="grey" variation="dark">Lead count</Span>
              <Span size="caption">{leadCount}</Span>
            </Fragment>
          )}
        </DetailsTable>
        {referralSentAt && <ReferralSentAtWrapper><Span palette="grey" variation="dark" size="tiny">Sent on {getReferralSentTimeText(referralSentAt)}</Span></ReferralSentAtWrapper>}
      </TopWrapper>
      {bottomActionText && bottomActionOnClick && (
        <BottomWrapper>
          <BottomActionBlock onClick={bottomActionOnClick} palette="primary">{bottomActionText}</BottomActionBlock>
        </BottomWrapper>
      )}
      {stage && (
        <BottomWrapper>
          <Stage stage={stage} />
        </BottomWrapper>
      )}
    </Wrapper>
  );
};

DashboardAdminReferralAgentTile.propTypes = {
  className: string,
  onClick: func,
  agent: adminAgentPropType.isRequired,
  isRecommended: bool,
  bottomActionText: string,
  bottomActionOnClick: func,
  stage: string,
  referralSentAt: string,
};

DashboardAdminReferralAgentTile.defaultProps = {
  isRecommended: false,
};

export default DashboardAdminReferralAgentTile;
